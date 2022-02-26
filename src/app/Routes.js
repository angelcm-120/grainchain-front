import React from "react";
import { Switch, Route } from "react-router-dom";
import { Bombillos } from "./modules/Auth";

export function Routes() {
  return (
    <Switch>
      <Route>
        <Bombillos />
      </Route>
    </Switch>
  );
}
