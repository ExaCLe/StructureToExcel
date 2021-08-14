import * as SQLite from "expo-sqlite";
import Parse, { User } from "parse/react-native";

const goals = SQLite.openDatabase("goals.db");

export const saveGoals = async (_array, currentUser) => {
  let count = 0;
  for (let i = 0; i < _array.length; i++) {
    const goal = _array[i];
    let Goal = new Parse.Object("Goal");
    if (goal.object_id) {
      let query = new Parse.Query("Goal");
      query.equalTo("objectId", goal.object_id + "");
      const result = await query.find();
      const version = result[0].get("version");
      if (goal.version <= version) continue;
      Goal.set("objectId", goal.object_id + "");
    }
    Goal.set("version", goal.version);
    Goal.set("deleted", goal.deleted);
    Goal.set("user", currentUser);
    Goal.set("icon", goal.icon);
    Goal.set("intervall", goal.intervall);
    Goal.set("name", goal.name);
    Goal.set("priority", goal.priority);
    Goal.set("repetitions", goal.repetitions);
    Goal.set("time", goal.time);
    Goal.set("act_id", goal.act_id);
    Goal.set("archive", goal.archive);
    Goal.set("progress", goal.progress);
    Goal.set("archive", goal.archive);
    try {
      const savedGoal = await Goal.save();
      count++;
      console.log("Saved ", goal.name);
      goals.transaction((tx) => {
        tx.executeSql(
          "UPDATE goals SET object_id = ? WHERE id = ?",
          [savedGoal.id, goal.id],
          () => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log("Error when saving ", goal.name, " ", error);
    }
  }
  try {
    let query = new Parse.Query("Goal");
    query.equalTo("user", currentUser);
    let queryResults = await query.find();
    return await facotrInGoals(queryResults, count);
  } catch (error) {
    console.error(error);
  }
};

const facotrInGoals = async (array, count) => {
  for (let i = 0; i < array.length; i++) {
    const goal = array[i];
    goals.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goals WHERE object_id = ?",
        [goal.id],
        (txObj, { rows: { _array } }) => {
          console.log(_array);
          if (_array.length === 0) {
            count++;
            goals.transaction((tx) => {
              tx.executeSql(
                "INSERT INTO goals (name, priority, intervall, repetitions, icon, time, progress, act_id, object_id, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [
                  goal.get("name"),
                  goal.get("priority"),
                  goal.get("intervall"),
                  goal.get("repetitions"),
                  goal.get("icon"),
                  goal.get("time"),
                  goal.get("progress"),
                  goal.get("act_id"),
                  goal.id,
                  goal.get("version"),
                ],
                () => {
                  console.log("Inserted ", goal.get("name"));
                },
                (txObj, error) => {
                  console.log("Error inserting ", goal.get("name"), ":", error);
                }
              );
            });
          } else {
            if (_array[0].version < goal.get("version")) {
              count++;
              goals.transaction((tx) => {
                tx.executeSql(
                  "UPDATE goals SET name=?, intervall=?, priority=?, repetitions=?, icon=?, progress=?, time=?, act_id=?, version=?, deleted=? WHERE object_id=?",
                  [
                    goal.get("name"),
                    goal.get("intervall"),
                    goal.get("priority"),
                    goal.get("repetitions"),
                    goal.get("icon"),
                    goal.get("progress"),
                    goal.get("time"),
                    goal.get("act_id"),
                    goal.get("version"),
                    goal.get("deleted"),
                    goal.id,
                  ],
                  () => {
                    console.log("Updated ", goal.get("name"));
                  },
                  (txObj, error) => {
                    console.log(
                      "Error updating ",
                      goal.get("name"),
                      ":",
                      error
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
