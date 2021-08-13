import * as SQLite from "expo-sqlite";
import Parse, { User } from "parse/react-native";

const aktivities = SQLite.openDatabase("aktivitys.db");

export const saveAktivities = async (_array, currentUser) => {
  let count = 0;
  for (let i = 0; i < _array.length; i++) {
    const aktivity = _array[i];
    let Aktivity = new Parse.Object("Aktivity");
    if (aktivity.object_id) {
      let query = new Parse.Query("Aktivity");
      query.equalTo("objectId", aktivity.object_id + "");
      const result = await query.find();
      const version = result[0].get("version");
      if (aktivity.version <= version) continue;
      Aktivity.set("objectId", aktivity.object_id + "");
    }
    Aktivity.set("version", aktivity.version);
    Aktivity.set("deleted", aktivity.deleted);
    Aktivity.set("user", currentUser);
    Aktivity.set("icon", aktivity.icon);
    Aktivity.set("name", aktivity.name);
    Aktivity.set("id", aktivity.id);
    Aktivity.set("color", aktivity.color);
    try {
      const savedAktivity = await Aktivity.save();
      count++;
      console.log("Saved ", aktivity.name);
      aktivities.transaction((tx) => {
        tx.executeSql(
          "UPDATE activities SET object_id = ? WHERE id = ?",
          [savedAktivity.id, aktivity.id],
          () => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log("Error when saving ", aktivity.name, " ", error);
    }
  }
  try {
    let query = new Parse.Query("Aktivity");
    query.equalTo("user", currentUser);
    let queryResults = await query.find();
    return await factorInAktivitys(queryResults, count);
  } catch (error) {
    console.error(error);
  }
};

const factorInAktivitys = async (array, count) => {
  for (let i = 0; i < array.length; i++) {
    const aktivity = array[i];
    aktivities.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities WHERE object_id = ?",
        [aktivity.id],
        (txObj, { rows: { _array } }) => {
          if (_array.length === 0) {
            if (!aktivity.get("deleted"))
              aktivities.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO activities (name, icon, color, object_id, version) VALUES (?, ?, ?, ?, ?);",
                  [
                    aktivity.get("name"),
                    aktivity.get("icon"),
                    aktivity.get("color"),
                    aktivity.id,
                    aktivity.get("version"),
                  ],
                  () => {
                    count++;
                    console.log("Inserted ", aktivity.get("name"));
                  },
                  (txObj, error) => {
                    console.log(
                      "Error inserting ",
                      aktivity.get("name"),
                      ":",
                      error
                    );
                  }
                );
              });
          } else {
            if (_array[0].version < aktivity.get("version"))
              aktivities.transaction((tx) => {
                tx.executeSql(
                  "UPDATE activities SET name=?, icon=?, color=?, version=?, deleted=? WHERE object_id=?",
                  [
                    aktivity.get("name"),
                    aktivity.get("icon"),
                    aktivity.get("color"),
                    aktivity.get("version"),
                    aktivity.get("deleted"),
                    aktivity.id,
                  ],
                  () => {
                    count++;
                    console.log("Updated ", aktivity.get("name"));
                  },
                  (txObj, error) => {
                    console.log(
                      "Error updating ",
                      aktivity.get("name"),
                      ":",
                      error
                    );
                  }
                );
              });
          }
        }
      );
    });
  }
  return count;
};
