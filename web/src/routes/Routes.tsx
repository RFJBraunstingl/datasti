import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../components/landing_page/LandingPageVersion2";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignIn/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import CreateContainerForm from "../components/CreateContainerForm";
import DataVis from "../components/DataVis";

function Routes() {
  return (
    <Switch>
      <Route path="/register">
        <SignUp />
      </Route>
      <Route path="/login">
        <SignIn />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/create-new-container">
        <CreateContainerForm />
      </Route>
      <Route path="/vis/:container" component={DataVis} />
      <Route path="/">
        <LandingPage />
      </Route>
    </Switch>
  );
}

export default Routes;
