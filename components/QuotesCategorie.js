import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./App.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("favorites.db");
import * as categories from "./../assets/categories.js";

import Zitat from "./Zitat.js";
import Quotes from "../assets/Quotes.js";

class QuotesCategorie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, favorites: [], fetchedData: false };
    this.fetchData();
  }
  setCount = (number) => {
    this.setState({ count: number }, this.favorite);
  };
  favorite = () => {
    if (this.props.route.params.categorie === categories.FAVORITES) {
      this.setState({ favorite: true });
      return;
    }
    const id = parseInt(
      Quotes[this.props.route.params.categorie][this.state.count]["key"]
    );
    if (this.state.favorites.find((ele) => ele.id === id)) {
      this.setState({ favorite: true });
    } else {
      this.setState({ favorite: false });
    }
  };
  // gets the data for the goals out of the database
  fetchData = () => {
    console.log("Fetching data for favorites...");
    const sql =
      this.props.route.params.categorie === categories.FAVORITES
        ? "SELECT * FROM favorites"
        : "SELECT id FROM favorites WHERE categorie = ?";
    const values =
      this.props.route.params.categorie === categories.FAVORITES
        ? null
        : [this.props.route.params.categorie];
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        values,
        (txObj, { rows: { _array } }) => {
          this.setState(
            { favorites: _array, fetchedData: true },
            this.favorite
          );
        },
        (txObj, error) => console.error(error)
      );
    });
  };
  componentDidUpdate() {
    this.setHeaderHeart();
  }
  setHeaderHeart = () => {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonTopBar}
              onPress={() => {
                const categorie = this.props.route.params.categorie;
                const sql = this.state.favorite
                  ? "DELETE FROM favorites WHERE id=?"
                  : "INSERT INTO favorites (id, categorie) VALUES (?, ?) ";
                const key =
                  this.props.route.params.categorie === categories.FAVORITES
                    ? this.state.favorites[this.state.count].id
                    : Quotes[categorie][this.state.count]["key"];
                const values = this.state.favorite ? [key] : [key, categorie];

                db.transaction((tx) => {
                  tx.executeSql(
                    sql,
                    values,
                    // success
                    async () => {
                      if (
                        this.props.route.params.categorie ===
                        categories.FAVORITES
                      ) {
                        if (this.state.count === 0)
                          this.setCount(this.state.favorites.length - 2);
                        else this.setCount(this.state.count - 1);
                      }
                      this.fetchData();
                    },
                    // error
                    (txObj, error) => {
                      console.log(error);
                    }
                  );
                });
              }}
            >
              <Ionicons
                name={this.state.favorite ? "heart" : "heart-outline"}
                size={25}
                color={colors.PrimaryTextColor}
                style={styles.padding}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  };
  componentDidMount() {
    this.setHeaderHeart();
    this.props.navigation.setOptions({
      title: this.props.route.params.categorie,
      headerLeft: () => {
        return (
          <View style={styles.margin}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={colors.PrimaryTextColor}
                style={styles.padding}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }
  render() {
    if (this.props.route.params.categorie === categories.FAVORITES) {
      if (this.state.favorites.length <= this.state.count) return null;
      if (this.state.favorites.length === 0) return null;
      const quote = Quotes[
        this.state.favorites[this.state.count].categorie
      ].find((quote) => {
        return quote["key"] === this.state.favorites[this.state.count].id + "";
      });
      return (
        <View style={[styles.margin, styles.flexContainer, styles.spaceAround]}>
          <Zitat {...quote} />
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => {
              if (this.state.count + 1 === this.state.favorites.length)
                this.setCount(0);
              else this.setCount(this.state.count + 1);
            }}
          >
            <Text style={styles.primaryButtonText}>Nächstes Zitat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonPrimary, { marginTop: 30 }]}
            onPress={() => {
              if (this.state.count === 0)
                this.setCount(this.state.favorites.length - 1);
              else this.setCount(this.state.count - 1);
            }}
          >
            <Text style={styles.primaryButtonText}>Vorheriges Zitat</Text>
          </TouchableOpacity>
        </View>
      );
    } else
      return (
        <View style={[styles.margin, styles.flexContainer, styles.spaceAround]}>
          <Zitat
            {...Quotes[this.props.route.params.categorie][this.state.count]}
          />
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => {
              if (
                this.state.count + 1 ===
                Quotes[this.props.route.params.categorie].length
              )
                this.setCount(0);
              else this.setCount(this.state.count + 1);
            }}
          >
            <Text style={styles.primaryButtonText}>Nächstes Zitat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonPrimary, { marginTop: 30 }]}
            onPress={() => {
              if (this.state.count === 0)
                this.setCount(
                  Quotes[this.props.route.params.categorie].length - 1
                );
              else this.setCount(this.state.count - 1);
            }}
          >
            <Text style={styles.primaryButtonText}>Vorheriges Zitat</Text>
          </TouchableOpacity>
        </View>
      );
  }
}

export default QuotesCategorie;
