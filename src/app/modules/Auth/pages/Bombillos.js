/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout"
import BombillosContent from "./TablaBombillos";
import { FormattedMessage } from "react-intl";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

export function Bombillos() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Bombillos*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/devops.jpg")})`
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/logoGrainChain.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  <FormattedMessage id="Test del bombillo" />
                </h3>
              </div>
              {/* end:: Aside content */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/* begin::Content body */}
            <div className="">
              <Switch>
                <ContentRoute path="/grainchain/bombillos" component={BombillosContent} />
                <ContentRoute path="/" component={BombillosContent} />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div
              className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Bombillos*/}
      </div>
    </>
  );
}
