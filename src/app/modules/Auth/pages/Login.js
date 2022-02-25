import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { loginCycMovil } from "../_redux/authCrud";
import userTableMock from "../../../modules/Auth/__mocks__/userTableMock";
import { emailObj, sendEmail } from '../../Email/Client'
import {VerificationCodeCard} from '../../UserProfile/components/VerificationCodeCard'

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(undefined)
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const authorize_login = (result) => {
    disableLoading();

    userTableMock.pop(userTableMock.find(user => user.username === result.resultados.username))
    userTableMock.push(result.resultados);

    if (!result?.resultados?.mfa_enabled) {
      var emailAux = { ...emailObj }
      emailAux.to = result.resultados.email
      emailAux.body = "Se detecta un acceso desde su cuenta: <br><br><strong>" + emailAux.to + "</strong><br><br> Si no has sido tu favor de reportarlo al equipo de Cloud y DevOps.<br>"
      sendEmail(emailAux, result.resultados.accessToken)
    }



  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        loginCycMovil(values.email, values.password)
          .then(res => res.json())
          .then((results) => {
            if (results.httpstatus === "OK") {
              authorize_login(results)
              if (results?.resultados?.mfa_enabled) {
                setResult(results)
              }
              else {
                props.login(results.resultados.accessToken);
              }
            } else {
              disableLoading();
              setSubmitting(false);
              setStatus(
                intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_LOGIN",
                })
              );
            }

          },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
              disableLoading();
              setSubmitting(false);
              setStatus(
                intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_LOGIN",
                })
              );
            }
          )
      }, 1000);
    },
  });

  function handleComplete() {
    if (result?.resultados?.accessToken) {
      var emailAux = { ...emailObj }
      emailAux.to = result.resultados.email
      emailAux.body = "Se detecta un acceso desde su cuenta: <br><br><strong>" + emailAux.to + "</strong><br><br>Con autenticación de MFA. <br> Si no has sido tu favor de reportarlo al equipo de Cloud y DevOps.<br>"
      sendEmail(emailAux, result.resultados.accessToken)
      props.login(result.resultados.accessToken);
    }
    else {
      setResult(undefined)
    }
  }

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          <FormattedMessage id="AUTH.ENTER.USPWD" />
        </p>
      </div>
      {/* end::Head */}

      {result === undefined && !result?.resultados?.mfa_enabled &&
        <form
          onSubmit={formik.handleSubmit}
          className="form fv-plugins-bootstrap fv-plugins-framework"
        >
          {formik.status && (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">
                {formik.status}
              </div>
            </div>
          )}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder={intl.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
              type="email"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "email"
              )}`}
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.email}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder={intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
              type="password"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "password"
              )}`}
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.password}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
            <Link
              to="/auth/forgot-password"
              className="text-dark-50 text-hover-primary my-3 mr-2"
              id="kt_login_forgot"
            >
              <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
            </Link>
            <button
              id="kt_login_signin_submit"
              type="submit"
              disabled={formik.isSubmitting}
              className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
            >
              <span><FormattedMessage id="AUTH.GENERAL.SIGNIN_BUTTON" /></span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>
          </div>
        </form>

      }
      {result !== undefined && result?.resultados?.mfa_enabled && <VerificationCodeCard handleComplete={handleComplete} userParent={result?.resultados}></VerificationCodeCard>}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
