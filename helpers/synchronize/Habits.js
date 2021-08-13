import * as SQLite from "expo-sqlite";
import Parse, { User } from "parse/react-native";

const habits = SQLite.openDatabase("habits.db");

export const saveHabits = async (_array, currentUser) => {
  let count = 0;
  for (let i = 0; i < _array.length; i++) {
    const habit = _array[i];
    let Habit = new Parse.Object("Habit");
    if (habit.object_id) {
      let query = new Parse.Query("Habit");
      query.equalTo("objectId", habit.object_id + "");
      const result = await query.find();
      const version = result[0].get("version");
      if (habit.version <= version) continue;
      Habit.set("objectId", habit.object_id + "");
    }
    if (!habit.object_id && habit.deleted) continue;
    Habit.set("version", habit.version);
    Habit.set("deleted", habit.deleted);
    Habit.set("user", currentUser);
    Habit.set("icon", habit.icon);
    Habit.set("intervall", habit.intervall);
    Habit.set("name", habit.name);
    Habit.set("priority", habit.priority);
    Habit.set("repetitions", habit.repetitions);
    Habit.set("queue", habit.queue);
    try {
      const savedHabit = await Habit.save();
      count++;
      console.log("Saved ", habit.name);
      habits.transaction((tx) => {
        tx.executeSql(
          "UPDATE habits SET object_id = ? WHERE id = ?",
          [savedHabit.id, habit.id],
          () => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log("Error when saving ", habit.name, " ", error);
    }
  }
  try {
    let query = new Parse.Query("Habit");
    query.equalTo("user", currentUser);
    let queryResults = await query.find();
    return factorInHabits(queryResults, count);
  } catch (error) {
    console.error(error);
  }
};

export const factorInHabits = async (array, count) => {
  for (let i = 0; i < array.length; i++) {
    const habit = array[i];
    habits.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits WHERE object_id = ?",
        [habit.id],
        (txObj, { rows: { _array } }) => {
          if (_array.length === 0) {
            habits.transaction((tx) => {
              tx.executeSql(
                "INSERT INTO habits (name, priority, intervall, repetitions, icon, queue, object_id, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                [
                  habit.get("name"),
                  habit.get("priority"),
                  habit.get("intervall"),
                  habit.get("repetitions"),
                  habit.get("icon"),
                  habit.get("queue"),
                  habit.id,
                  habit.get("version"),
                ],
                () => {
                  count++;
                  console.log("Inserted ", habit.get("name"));
                },
                (txObj, error) => {
                  console.log(
                    "Error inserting ",
                    habit.get("name"),
                    ":",
                    error
                  );
                }
              );
            });
          } else {
            if (_array[0].version < habit.get("version"))
              habits.transaction((tx) => {
                tx.executeSql(
                  "UPDATE habits SET name=?, intervall=?, priority=?, repetitions=?, icon=?, queue=?, version=?, deleted=? WHERE object_id=?",
                  [
                    habit.get("name"),
                    habit.get("intervall"),
                    habit.get("priority"),
                    habit.get("repetitions"),
                    habit.get("icon"),
                    habit.get("queue"),
                    habit.get("version"),
                    habit.get("deleted"),
                    habit.id,
                  ],
                  () => {
                    count++;
                    console.log("Updated ", habit.get("name"));
                  },
                  (txObj, error) => {
                    console.log(
                      "Error updating ",
                      habit.get("name"),
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
