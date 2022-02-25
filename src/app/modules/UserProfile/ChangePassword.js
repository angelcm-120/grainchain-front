/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import SVG from "react-inlinesvg";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import { updatePassword } from "../Auth/_redux/authCrud";
import userTableMock from "../../modules/Auth/__mocks__/userTableMock";
import { FormattedMessage } from "react-intl";
import {emailObj,sendEmail} from '../Email/Client'
 

function ChangePassword(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState(false);
  const [msjError, setMsjError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => {}, [user]);


  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    setisError(false); 
    setTimeout(() => {       
      updatePassword(user.email,values.currentPassword, values.password, user.accessToken)
          .then(res => res.json())
          .then((result) => {
            if (result.httpstatus === "OK") {
              setloading(false);
              setSubmitting(false);
              setisError(false); 
              userTableMock.pop(userTableMock.find(user=> user.username=== result.resultados.username ))
              userTableMock.push(result.resultados);
              const updatedUser = Object.assign(user, {
                password: values.password,
              });
              // user for update preparation
              dispatch(props.setUser(updatedUser));
              setMsjError(undefined)

              var emailAux={...emailObj}
              emailAux.to=result.resultados.email
              emailAux.body="Tu contraseña ha sido actualizada.<br><br> Si no has sido tu favor de reportarlo al equipo de Cloud y DevOps.<br>"
              sendEmail(emailAux,result.resultados.accessToken) 
            } else {
              setMsjError(result.descripcion)
              setloading(false);
              setSubmitting(false);
              setisError(true); 
            } 
          }, 
            (error) => {
              setloading(false);
              setSubmitting(false);
              setisError(true);
            }
          ) 
    }, 1000);
  };
  // UI Helpers
  const initialValues = {
    currentPassword: "",
    password: "",
    cPassword: "",
  };
  const Schema = Yup.object().shape({
    currentPassword: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.PASSWORD" />),
    password: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.NEWPASSWORD" />),
    cPassword: Yup.string()
      .required(<FormattedMessage id="APP.YUP.REQUIRED.VERIFYPASSWORD" />)
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          <FormattedMessage id="APP.YUP.MISMATCH.PASSWORD" />
        ),
      }),
  });
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <form className="card card-custom" onSubmit={formik.handleSubmit}>
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
          <FormattedMessage id="APP.LABEL.CHANGE_PASSWORD" />
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
          <FormattedMessage id="APP.LABEL.CHANGE_PASSWORD2" />
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-success mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
             <FormattedMessage id="APP.BUTTON.SAVE_CHANGES" />
            {formik.isSubmitting}
          </button>
          <Link
            to="/user-profile/personal-information"
            className="btn btn-secondary"
          >
            <FormattedMessage id="APP.BUTTON.CANCEL" />
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        <div className="card-body">
          {/* begin::Alert */}
          {isError && (
            <div
              className="alert alert-custom alert-light-danger fade show mb-10"
              role="alert"
            >
              <div className="alert-icon">
                <span className="svg-icon svg-icon-3x svg-icon-danger">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}
                  ></SVG>{" "}
                </span>
              </div>
              <div className="alert-text font-weight-bold">   
                <FormattedMessage id={`${msjError}`} />                             
              </div>
              <div className="alert-close" onClick={() => setisError(false)}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="ki ki-close"></i>
                  </span>
                </button>
              </div>
            </div>
          )}
          {/* end::Alert */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
            <FormattedMessage id="APP.LABEL.CURRENT_PASSWORD" />
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder=""
                className={`form-control form-control-lg form-control-solid mb-2 ${getInputClasses(
                  "currentPassword"
                )}`}
                name="currentPassword"
                {...formik.getFieldProps("currentPassword")}
              />
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <div className="invalid-feedback">
                  {formik.errors.currentPassword}
                </div>
              ) : null}
              {/* 
               <a href="#" className="text-sm font-weight-bold">
                Forgot password ?
              </a>*/}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
            <FormattedMessage id="APP.LABEL.NEW_PASSWORD" />
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder=""
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
            <FormattedMessage id="APP.LABEL.VERIFY_PASSWORD" />
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder=""
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "cPassword"
                )}`}
                name="cPassword"
                {...formik.getFieldProps("cPassword")}
              />
              {formik.touched.cPassword && formik.errors.cPassword ? (
                <div className="invalid-feedback">
                  {formik.errors.cPassword}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(ChangePassword);
