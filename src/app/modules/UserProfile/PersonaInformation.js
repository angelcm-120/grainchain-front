import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import { updateInfoPersonal } from "../Auth/_redux/authCrud";
import userTableMock from "../../modules/Auth/__mocks__/userTableMock";
import { FormattedMessage} from "react-intl";
import {emailObj,sendEmail} from '../Email/Client'

function PersonaInformation(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState(false);
  const [msjError, setMsjError] = useState(false);
  const [pic, setPic] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => {
    if (user.pic) {
      setPic(user.pic);
    }
  }, [user]);
  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    setisError(false);
    setTimeout(() => {
      // Do request to your server for user update, we just imitate user update there, For example:
      updateInfoPersonal(user.email, values.firstname, values.lastname, values.companyName, values.phone, values.website,user.accessToken)
        .then(res => res.json())
        .then((result) => {
          if (result.httpstatus === "OK") {
            setloading(false);
            setSubmitting(false);
            setisError(false);

            userTableMock.pop(userTableMock.find(user => user.username === result.resultados.username))
            userTableMock.push(result.resultados);

            const updatedUser = Object.assign(user, {
              email: values.email,
              firstname: values.firstname,
              lastname: values.lastname,
              companyName: values.companyName,
              phone: values.phone,
              website: values.website,
            });
            // user for update preparation
            dispatch(props.setUser(updatedUser));
            setMsjError(undefined)

            var emailAux={...emailObj}
            emailAux.to=result.resultados.email
            emailAux.body="Tu información personal ha sido actualizada.<br><br> Si no has sido tu favor de reportarlo al equipo de Cloud y DevOps.<br>"
            sendEmail(emailAux,result.resultados.accessToken)

          } else {
            setMsjError(result.descripcion)
            setloading(false);
            setSubmitting(false);
            setisError(true);

          }

        },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            setloading(false);
            setSubmitting(false);
            setisError(true);
          }
        )

      // update(updatedUser)
      //  .then(()) => {
      //    setloading(false);
      //  })
      //  .catch((error) => {
      //    setloading(false);
      //    setSubmitting(false);
      //    setStatus(error);
      // });
    }, 1000);
  };
  // UI Helpers
  const initialValues = {
    pic: user.pic,
    firstname: user.firstname,
    lastname: user.lastname,
    companyName: user.companyName,
    phone: user.phone,
    email: user.email,
    website: user.website,
  };
  const Schema = Yup.object().shape({
    pic: Yup.string(),
    firstname: Yup.string().required(<FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD"/>),
    lastname: Yup.string().required(<FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD"/>),
    companyName: Yup.string().required(<FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD"/>),
    phone: Yup.string().required(<FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD"/>),
    email: Yup.string()
      .email("Wrong email format")
      .required(<FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD"/>),
    website: Yup.string().required(<FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD"/>),
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
  const getUserPic = () => {
    if (!pic) {
      return "none";
    }

    return `url(${pic})`;
  }; 
  return (
    <form
      className="card card-custom card-stretch"
      onSubmit={formik.handleSubmit}
    >
      {loading && <ModalProgressBar />}
      {isError && msjError!== undefined && <p>msjError</p>}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
          <FormattedMessage id="APP.LABEL.PERSONAL_INFORMATION"/>
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
          <FormattedMessage id="APP.LABEL.UPDATE_PERSONAL_INFORMATION"/>
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
        {/* begin::Body */}
        <div className="card-body">
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6"> <FormattedMessage id="APP.LABEL.USER_INFO"/></h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label"> <FormattedMessage id="APP.LABEL.AVATAR"/></label>
            <div className="col-lg-9 col-xl-6">
              <div
                className="image-input image-input-outline"
                id="kt_profile_avatar"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(
                    "/media/users/blank.png"
                  )}`,
                }}
              >
                
                <div
                  className="image-input-wrapper"
                  style={{ backgroundImage: `${getUserPic()}` }}
                />
                {/*
                <label
                  className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                  data-action="change"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="Change avatar"
                >
                  <i className="fa fa-pen icon-sm text-muted"></i>
                  <input
                    type="file"
                    // name="pic"
                    accept=".png, .jpg, .jpeg"
                  // {...formik.getFieldProps("pic")}
                  />
                  <input type="hidden" name="profile_avatar_remove" />
                </label>
                <span
                  className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                  data-action="cancel"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="Cancel avatar"
                >
                  <i className="ki ki-bold-close icon-xs text-muted"></i>
                </span>
                <span
                  onClick={removePic}
                  className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                  data-action="remove"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="Remove avatar"
                >
                  <i className="ki ki-bold-close icon-xs text-muted"></i>
                </span>*/}
              </div>
              {/*<span className="form-text text-muted">
                Allowed file types: png, jpg, jpeg.
              </span>*/}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
            <FormattedMessage id="APP.LABEL.FIRST_NAME"/>
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="First name"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "firstname"
                )}`}
                name="firstname"
                {...formik.getFieldProps("firstname")}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="invalid-feedback">
                  {formik.errors.firstname}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
            <FormattedMessage id="APP.LABEL.LAST_NAME"/>
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Last name"
                className={`form-control form-control-lg form-control-solid ${getInputClasses("lastname")}`}
                name="lastname"
                {...formik.getFieldProps("lastname")}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="invalid-feedback">{formik.errors.lastname}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
            <FormattedMessage id="APP.LABEL.COMPANY_NAME"/>
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Company name"
                className={`form-control form-control-lg form-control-solid ${getInputClasses("companyName")}`}
                name="companyName"
                {...formik.getFieldProps("companyName")}

              />
              {formik.touched.companyName && formik.errors.companyName ? (
                <div className="invalid-feedback">{formik.errors.companyName}</div>
              ) : null}
            {/*  <span className="form-text text-muted">
                If you want your invoices addressed to a company. Leave blank to
                use your full name.
              </span>*/}
            </div>
          </div>
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mt-10 mb-6"><FormattedMessage id="APP.LABEL.CONTACT_INFO"/></h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
            <FormattedMessage id="APP.LABEL.CONTACT_PHONE"/>
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="+1(123)112-11-11"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "phone"
                  )}`}
                  name="phone"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : null}
              </div>
              <span className="form-text text-muted">
                {/* We'll never share your phone with anyone else.*/}
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
            <FormattedMessage id="APP.LABEL.EMAIL_ADDRESS"/>
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
            <FormattedMessage id="APP.LABEL.COMPANY_SITE"/>
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="http://localhost:9001"
                className={`form-control form-control-lg form-control-solid ${getInputClasses("website")}`}
                name="website"
                {...formik.getFieldProps("website")}
              />
              {formik.touched.website && formik.errors.website ? (
                <div className="invalid-feedback">{formik.errors.website}</div>
              ) : null}

            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(PersonaInformation);
