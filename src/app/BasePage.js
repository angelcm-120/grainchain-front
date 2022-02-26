import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { SandboxPage } from "./pages/SandboxPage";

/*import {RestartValuesPage} from "./pages/RestartValuesPage";
import {InquiriesPage} from "./pages/InquiriesPage";
import {BinnaclePage} from "./pages/BinnaclePage";*/


const DevelopPage = lazy(() =>
  import("./modules/Develop/DevelopPage")
);

const CloudToolsPage = lazy(() =>
  import("./modules/CloudTools/CloudToolsPage")
);

const DocumentPage = lazy(() =>
  import("./modules/Document/DocumentPage")
);
const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/grainchain/bombillos" to="/home" />
        }
        <ContentRoute path="/home" component={HomePage} />
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <ContentRoute path="/sandbox" component={SandboxPage} />
        <Route path="/develop" component={DevelopPage} />
        <Route path="/cloudtools" component={CloudToolsPage} />
        <Route path="/document" component={DocumentPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
} 