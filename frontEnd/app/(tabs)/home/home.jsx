import Profile from "../../../components/Profile";
import Action from "../../../components/Action";
import { StatusBar } from "expo-status-bar";
import React from "react";

const home = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <Profile />
      <Action />
    </>
  );
};

export default home;
