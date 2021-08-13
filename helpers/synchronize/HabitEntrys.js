import * as SQLite from "expo-sqlite";
import Parse, { User } from "parse/react-native";

const habits = SQLite.openDatabase("habits.db");

export const saveHabitChecks = async (_array, currentUser) => {
  let count = 0;
  for (let i = 0; i < _array.length; i++) {
    const habit_entry = _array[i];
    let Habit_Entry = new Parse.Object("Habit_Entry");
    if (habit_entry.object_id === null) {
      alert("Something went wrong. Please try again.");
      return;
    }
    if (habit_entry.object_id_check) {
      let query = new Parse.Query("Habit_Entry");
      query.equalTo("objectId", habit_entry.object_id_check + "");
      const result = await query.find();
      const version = result[0].get("version");
      if (habit_entry.version <= version) continue;
      Habit_Entry.set("objectId", habit_entry.object_id_check + "");
    }
    let Habit = new Parse.Object("Habit");
    Habit.set("objectId", habit_entry.object_id);
    Habit_Entry.set("deleted", habit_entry.deleted);
    Habit_Entry.set("user", currentUser);
    Habit_Entry.set("habit", Habit);
    Habit_Entry.set("date", habit_entry.date);
    try {
      const savedHabitEntry = await Habit_Entry.save();
      console.log("Saved Habit Entry. ");
      count++;
      habits.transaction((tx) => {
        tx.executeSql(
          "UPDATE checkHabits SET object_id_check = ? WHERE id = ?",
          [savedHabitEntry.id, habit_entry.id],
          () => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log("Error when saving ", habit_entry.name, " Entry ", error);
    }
  }
  try {
    let query = new Parse.Query("Habit_Entry");
    query.equalTo("user", currentUser);
    let queryResults = await query.find();
    return await factorInHabitEntrys(queryResults, count);
  } catch (error) {
    console.error(error);
  }
};

const factorInHabitEntrys = async (array, count) => {
  for (let i = 0; i < array.length; i++) {
    const habit_entry = array[i];
    habits.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM checkHabits WHERE object_id_check = ?",
        [habit_entry.id],
        (txObj, { rows: { _array } }) => {
          if (_array.length === 0) {
            if (!habit_entry.get("deleted"))
              habits.transaction((tx) => {
                tx.executeSql(
                  "SELECT id FROM habits WHERE object_id = ?",
                  [habit_entry.get("habit").id],
                  (txObj, { rows: { _array } }) => {
                    if (_array.length === 0) {
                      alert(
                        "Something went wrong with the Habit Entrys. Please try again."
                      );
                      return;
                    }
                    tx.executeSql(
                      "INSERT INTO checkHabits (habit_id, date, object_id_check, version) VALUES (?, ?, ?, ?);",
                      [
                        _array[0].id,
                        habit_entry.get("date"),
                        habit_entry.id,
                        habit_entry.get("version"),
                      ],
                      () => {
                        count++;
                        console.log("Inserted ", habit_entry.id);
                      },
                      (txObj, error) => {
                        console.log(
                          "Error inserting ",
                          habit_entry.id,
                          ":",
                          error
                        );
                      }
                    );
                  }
                );
              });
          } else {
            if (_array[0].version < habit_entry.get("version"))
              habits.transaction((tx) => {
                tx.executeSql(
                  "SELECT id FROM habits WHERE object_id = ?",
                  [habit_entry.get("habit").id],
                  (txObj, { rows: { _array } }) => {
                    if (_array.length === 0) {
                      alert(
                        "Something went wrong with the Habit Entrys. Please try again."
                      );
                      return;
                    }
                    tx.executeSql(
                      "UPDATE checkHabits SET date=?, habit_id=?, version=?, deleted=? WHERE object_id_check=?",
                      [
                        habit_entry.get("date"),
                        _array[0].id,
                        habit_entry.get("version"),
                        habit_entry.get("deleted"),
                        habit_entry.id,
                      ],
                      () => {
                        count++;
                        console.log("Updated ", habit_entry.id);
                      },
                      (txObj, error) => {
                        console.log(
                          "Error updating ",
                          habit_entry.id,
                          ":",
                          error
                        );
                      }
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
