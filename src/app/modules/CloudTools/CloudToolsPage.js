import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { BazstorePage } from "./pages/BazstorePage";


export default function CloudToolsPage() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/cloudtools"
        to="/cloudtools/bazstore"
      />
      {/* bazstore */}
      <ContentRoute path="/cloudtools/bazstore" component={BazstorePage} />
    </Switch>
  );
}