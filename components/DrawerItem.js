import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import argonTheme from "../constants/Theme";

const DrawerItem = (props) => {
  const renderIcon = (head, expand) => {
    const { title, focused } = props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      case "Elements":
        return (
          <Icon
            name="map-big"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Profile":
        return (
          <Icon
            name="chart-pie-35"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.WARNING}
          />
        );
      case "Account":
        return (
          <Icon
            name="calendar-date"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.INFO}
          />
        );
      case "Logout":
        return (
          <Icon
            name="engine-start"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.INFO}
          />
        );

      default:
        return (
          <Icon
            name={head ? "spaceship" : "diamond"}
            family="ArgonExtra"
            size={head ? 16 : 13}
            color={
              head
                ? expand
                  ? argonTheme.COLORS.WARNING
                  : argonTheme.COLORS.INFO
                : argonTheme.COLORS.PRIMARY
            }
          />
        );
    }
  };

  const { focused, title, navigation, child } = props;
  const [expand, setExpand] = useState(false);

  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null,
  ];

  return (
    <>
      {child ? (
        <>
          <TouchableOpacity
            style={{ height: 60 }}
            onPress={() => setExpand(!expand)}
          >
            <Block flex row style={containerStyles}>
              <Block middle flex={0.1} style={{ marginRight: 5 }}>
                {renderIcon(true, expand)}
              </Block>
              <Block row center flex={0.9}>
                <Text
                  size={15}
                  bold={focused ? true : false}
                  color={focused ? "white" : "rgba(0,0,0,0.5)"}
                >
                  {title}
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>
          {expand &&
            child.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ height: 65 }}
                  onPress={() =>
                    navigation.navigate("Home", { title: "Article" })
                  }
                >
                  <Block flex row style={containerStyles}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                      {renderIcon()}
                    </Block>
                    <Block row center flex={0.9}>
                      <Text
                        size={15}
                        bold={focused ? true : false}
                        color={focused ? "white" : "rgba(0,0,0,0.5)"}
                      >
                        {item.title}
                      </Text>
                    </Block>
                  </Block>
                </TouchableOpacity>
              );
            })}
        </>
      ) : (
        <TouchableOpacity
          style={{ height: 60 }}
          onPress={() =>
            title == "Profile"
              ? navigation.navigate("Profile")
              : navigation.navigate("Home")
          }
        >
          <Block flex row style={containerStyles}>
            <Block middle flex={0.1} style={{ marginRight: 5 }}>
              {renderIcon()}
            </Block>
            <Block row center flex={0.9}>
              <Text
                size={15}
                bold={focused ? true : false}
                color={focused ? "white" : "rgba(0,0,0,0.5)"}
              >
                {title}
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
