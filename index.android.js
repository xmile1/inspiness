import React, { Component } from "react";
import { View, StatusBar, AppRegistry, AsyncStorage } from "react-native";
import { Icon, Text } from "native-base";
import { TabNavigator, NavigationActions } from "react-navigation";

import Header from "./components/Header";
import Home from "./components/Home";
import Favoris from "./components/Favoris";

const Tabs = TabNavigator(
  {
    Accueil: { screen: Home },
    Favoris: { screen: Favoris }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: false,
      showLabel: true,
      activeTintColor: "#0FBAB7",
      inactiveTintColor: "#0FBAB7",
      labelStyle: {
        fontSize: 14,
        fontFamily: "Oswald-Bold",
        color: "#FF520F"
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: "#FF520F"
      },
      style: {
        backgroundColor: "#FFF",
        padding: 0,
        margin: 0
      }
    }
  }
);

const navigateAction = NavigationActions.navigate({
  routeName: "Favoris",
  params: {},

  // navigate can have a nested navigate action that will be run inside the child router
  action: NavigationActions.navigate({ routeName: "Favoris" })
});

export default class App extends Component {
  state = { favoris: null };

  refresh = async () => {
    try {
      let value = await AsyncStorage.getItem("quoteDB");
      let listOfTasks = (await JSON.parse(value)) || [];
      if (value !== null) {
        // if favoris exist
        console.log("value: " + typeof listOfTasks);
        this.setState({ favoris: listOfTasks });
      }
      console.log("working", this.state);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <Header />
        <Tabs
          onNavigationStateChange={(prevState, currentState) => {
            this.refresh();
          }}
          screenProps={{ favoris: this.state.favoris, refresh: this.refresh }}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("inspiness", () => App);
