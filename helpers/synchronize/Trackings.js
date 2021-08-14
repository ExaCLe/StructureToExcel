import * as SQLite from "expo-sqlite";
import Parse, { User } from "parse/react-native";

const aktivities = SQLite.openDatabase("aktivitys.db");

export const saveTrackings = async (_array, currentUser) => {
  let count = 0;
  for (let i = 0; i < _array.length; i++) {
    const tracking = _array[i];
    let Tracking = new Parse.Object("Tracking");
    if (tracking.object_id === null) {
      alert("Something went wrong. Please try again.");
      return;
    }
    if (tracking.object_id_tracking) {
      let query = new Parse.Query("Tracking");
      query.equalTo("objectId", tracking.object_id_tracking + "");
      const result = await query.find();
      const version = result[0].get("version");
      if (tracking.version <= version) continue;
      Tracking.set("objectId", tracking.object_id_tracking + "");
    }
    let Aktivity = new Parse.Object("Aktivity");
    Aktivity.set("objectId", tracking.object_id);
    Tracking.set("deleted", tracking.deleted);
    Tracking.set("user", currentUser);
    Tracking.set("aktivity", Aktivity);
    Tracking.set("start_time", tracking.start_time);
    Tracking.set("end_time", tracking.end_time);
    Tracking.set("duration_s", tracking.duration_s);
    Tracking.set("version", tracking.version);
    try {
      const savedTracking = await Tracking.save();
      count++;
      console.log("Saved Tracking Entry. ");
      aktivities.transaction((tx) => {
        tx.executeSql(
          "UPDATE trackings SET object_id_tracking = ? WHERE id = ?",
          [savedTracking.id, tracking.id],
          () => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log("Error when saving ", tracking.name, " Entry ", error);
    }
  }
  try {
    let query = new Parse.Query("Tracking");
    query.equalTo("user", currentUser);
    let queryResults = await query.find();
    return await factorInTrackings(queryResults, count);
  } catch (error) {
    console.error(error);
  }
};

const factorInTrackings = async (array, count) => {
  for (let i = 0; i < array.length; i++) {
    const tracking = array[i];
    aktivities.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM trackings WHERE object_id_tracking = ?",
        [tracking.id],
        (txObj, { rows: { _array } }) => {
          if (_array.length === 0) {
            if (!tracking.get("deleted"))
              aktivities.transaction((tx) => {
                tx.executeSql(
                  "SELECT id FROM activities WHERE object_id = ?",
                  [tracking.get("aktivity").id],
                  (txObj, { rows: { _array } }) => {
                    if (_array.length === 0) {
                      alert(
                        "Something went wrong with the trackings. Please try again."
                      );
                      return;
                    }
                    count++;
                    tx.executeSql(
                      "INSERT INTO trackings (act_id, start_time, end_time, duration_s, object_id_tracking, version) VALUES (?, ?, ?, ?, ?, ?);",
                      [
                        _array[0].id,
                        tracking.get("start_time"),
                        tracking.get("end_time"),
                        tracking.get("duration_s"),
                        tracking.id,
                        tracking.get("version"),
                      ],
                      () => {
                        console.log("Inserted ", tracking.id);
                      },
                      (txObj, error) => {
                        console.log(
                          "Error inserting ",
                          tracking.id,
                          ":",
                          error
                        );
                      }
                    );
                  }
                );
              });
          } else {
            if (_array[0].version < tracking.get("version")) {
              count++;
              aktivities.transaction((tx) => {
                tx.executeSql(
                  "SELECT id FROM activities WHERE object_id = ?",
                  [tracking.get("aktivity").id],
                  (txObj, { rows: { _array } }) => {
                    if (_array.length === 0) {
                      alert(
                        "Something went wrong with the trackings. Please try again."
                      );
                      return;
                    }
                    tx.executeSql(
                      "UPDATE trackings SET act_id=?, start_time=?, end_time=?, duration_s=?, version=?, deleted=? WHERE object_id_tracking=?",
                      [
                        _array[0].id,
                        tracking.get("start_time"),
                        tracking.get("end_time"),
                        tracking.get("duration_s"),
                        tracking.get("version"),
                        tracking.get("deleted"),
                        tracking.id,
                      ],
                      () => {
                        count++;
                        console.log("Updated ", tracking.id);
                      },
                      (txObj, error) => {
                        console.log("Error updating ", tracking.id, ":", error);
                      }
                    );
                  }
                );
              });
            }
          }
        }
      );
    });
  }
  return count;
};
