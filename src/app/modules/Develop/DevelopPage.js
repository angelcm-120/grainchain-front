import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { RestartValuesPage } from "./pages/RestartValuesPage";
import { InquiriesPage } from "./pages/InquiriesPage";
import { BinnaclePage } from "./pages/BinnaclePage";
import { ContractsPage } from "./pages/ContractsPage";
import { MicroServicesPage } from "./pages/MicroServicesPage";

export default function DevelopPage() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/develop"
        to="/develop/binnacle"
      />
      {/* restartvalues */}
      <ContentRoute path="/develop/restartvalues" component={RestartValuesPage} />

      {/* inquiries */}
      <ContentRoute path="/develop/inquiries" component={InquiriesPage} />

      {/* binnacle */}
      <ContentRoute path="/develop/binnacle" component={BinnaclePage} />

      {/* microservices */}
      <ContentRoute path="/develop/microservices" component={MicroServicesPage} />
      
      {/* contracts */}
      <ContentRoute path="/develop/contracts" component={ContractsPage} />
    </Switch>
  );
}
