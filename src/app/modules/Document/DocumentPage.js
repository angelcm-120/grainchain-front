import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { ArchitectureDev } from "./pages/Architectures/ArchitectureDevPage";  
import { ArchitectureInt } from "./pages/Architectures/ArchitectureIntPage";  
import { ArchitectureQA } from "./pages/Architectures/ArchitectureQAPage";  
import { ArchitectureCDMX } from "./pages/Architectures/ArchitectureCDMXPage";  
import { ArchitectureKIO } from "./pages/Architectures/ArchitectureKIOPage";  
import { ArchitectureCICD } from "./pages/CICD/ArchitectureCICDPage";  
import { SonarQubeCICD } from "./pages/SonarQube/SonarQubePage";  
import { APIControlErrores } from "./pages/Apis/APISControlErroresPage";  
import { APIConvencionNombrado } from "./pages/Apis/APISConvencionNombradoPage";  

export default function DocumentPage() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/document"
        to="/document/architectures/develop"
      />
      {/* architecture/develop */}
      <ContentRoute path="/document/architectures/arch_develop" component={ArchitectureDev} />
      <ContentRoute path="/document/architectures/arch_integration" component={ArchitectureInt} />
      <ContentRoute path="/document/architectures/arch_qa" component={ArchitectureQA} />
      <ContentRoute path="/document/architectures/arch_cdmx" component={ArchitectureCDMX} />
      <ContentRoute path="/document/architectures/arch_kio" component={ArchitectureKIO} />
      <ContentRoute path="/document/arch_cicd/arch_cicd" component={ArchitectureCICD} />
      <ContentRoute path="/document/sonarqube_cicd/manual" component={SonarQubeCICD} />
      <ContentRoute path="/document/apis_docs/controlerrores" component={APIControlErrores} />
      <ContentRoute path="/document/apis_docs/convencionnombrados" component={APIConvencionNombrado} />
      

    </Switch>
  );
}
