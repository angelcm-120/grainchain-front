/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import SVG from "react-inlinesvg";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import userTableMock from "../Auth/__mocks__/userTableMock";
import { FormattedMessage } from "react-intl";
import { emailObj, sendEmail } from '../Email/Client'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import GoogleAuthenticatorCard from './components/GoogleAuthenticatorCard'
import ScanQRGoogleAuthenticator from './components/ScanQRGoogleAuthenticator'
import {VerificationCodeCard} from './components/VerificationCodeCard'
import { getQR2FA, enableMFA, disableMFA } from '../../modules/Network/Services'


const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [<FormattedMessage id="APP.MFA_MANAGEMENT.DOWNLOAD" />, <FormattedMessage id="APP.MFA_MANAGEMENT.SCAN_QR" />, <FormattedMessage id="APP.MFA_MANAGEMENT.ENTER_CODE" />, <FormattedMessage id="APP.MFA_MANAGEMENT.ENTER_CODE" />];
}

function getStepContent(step, qr, handleComplete) {
  switch (step) {
    case 0:
      return <GoogleAuthenticatorCard />
    case 1:
      return <ScanQRGoogleAuthenticator qr={qr} />;
    case 2:
      return <VerificationCodeCard id="code1" handleComplete={handleComplete} />;
    case 3:
      return <VerificationCodeCard id="code2" handleComplete={handleComplete} />;
    default:
      return 'Unknown step';
  }
}


function EnableMFA(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState(false);
  const [msjError, setMsjError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [qr, setQR] = useState(undefined)



  const enable2FA = (values, setStatus, setSubmitting) => {
    setloading(true);
    setisError(false);
    setTimeout(() => {
      enableMFA(user)
        .then(res => res.json())
        .then((result) => {
          if (result.httpstatus === "OK") {
            setloading(false);
            setSubmitting(false);
            setisError(false);
            userTableMock.pop(userTableMock.find(user => user.username === result.resultados.username))
            userTableMock.push(result.resultados);
            const updatedUser = Object.assign(user, {
              mfa_enabled: true,
            });
            // user for update preparation
            dispatch(props.setUser(updatedUser));
            setMsjError(undefined)

            var emailAux = { ...emailObj }
            emailAux.to = result.resultados.email
            emailAux.body = "Felicidades, se ha habilitado MFA para tu cuenta.<br>"
            sendEmail(emailAux, result.resultados.accessToken)
            handleReset()
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



  const disable2FA = () => {
    setloading(true);
    setisError(false);
    setTimeout(() => {
      disableMFA(user)
        .then(res => res.json())
        .then((result) => {
          if (result.httpstatus === "OK") {
            setloading(false);

            setisError(false);
            userTableMock.pop(userTableMock.find(user => user.username === result.resultados.username))
            userTableMock.push(result.resultados);
            const updatedUser = Object.assign(user, {
              mfa_enabled: false,
            });
            // user for update preparation
            dispatch(props.setUser(updatedUser));
            setMsjError(undefined)

            var emailAux = { ...emailObj }
            emailAux.to = result.resultados.email
            emailAux.body = "Lamentamos tu desición, se ha deshabilitado el MFA para tu cuenta, recuerda que en cualquier momento puedes volver a activarlo.<br>"
            sendEmail(emailAux, result.resultados.accessToken)
            handleReset()
          } else {
            setMsjError(result.descripcion)
            setloading(false);
            setisError(true);
          }
        },
          (error) => {
            setloading(false);
            setisError(true);
          }
        )
    }, 1000);
  };

  function getQR(values, setStatus, setSubmitting) {
    setTimeout(() => {
      try {
        getQR2FA(user)
          .then(res => res.json())
          .then((result) => {
            if (result.httpstatus === "OK" && result?.resultados) {
              setQR(result?.resultados)
            } else {
              setQR(undefined)
            }
          },
            (error) => {
              setQR(undefined)
            }
          )
      } catch (Exception) {
        setQR(undefined)
      }
    }, 500);
  };
  useEffect(getQR, [])

  function totalSteps() {
    return getSteps().length;
  }

  function isStepOptional(step) {
    return step === 1;
  }


  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  function skippedSteps() {
    return skipped.size;
  }

  function completedSteps() {
    return completed.size;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps() - skippedSteps();
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
        // find the first step that has been completed
        steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = step => () => {
    setActiveStep(step);
  };

  function handleComplete() {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  }

  function handleDisable() {
    disable2FA()
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function isStepComplete(step) {
    return completed.has(step);
  }



  const initialValues = {

  };
  const Schema = Yup.object().shape({

  });

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      if (allStepsCompleted()) {
        enable2FA(values, setStatus, setSubmitting);
      }
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
            <FormattedMessage id="APP.LABEL.ENABLE_MFA" /> {user.mfa_enabled && <FormattedMessage id="GLOBAL.WORD.MFA_IS_ENABLE" />}
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            <FormattedMessage id="APP.LABEL.ENABLE_MFA2" />
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-success mr-2"
            disabled={allStepsCompleted() ? false : true || formik.isSubmitting}
            hidden={user.mfa_enabled}
          >
            <FormattedMessage id="APP.BUTTON.SAVE_CHANGES" />
            {formik.isSubmitting}
          </button>
          <button
            to="/user-profile/personal-information"
            className="btn btn-secondary"
            onClick={handleReset}
            hidden={user.mfa_enabled}
          >
            <FormattedMessage id="APP.BUTTON.CANCEL" />
          </button>
          <button
            to="/user-profile/personal-information"
            className="btn btn-secondary"
            onClick={handleDisable}
            hidden={!user.mfa_enabled}
          >
            <FormattedMessage id="APP.BUTTON.DISABLE" />
          </button>
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
          {!user.mfa_enabled && <div className="form-group row">
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const buttonProps = {};
                if (isStepOptional(index)) {
                  buttonProps.optional = <Typography variant="caption"><FormattedMessage id="GLOBAL.WORD.OPTIONAL" /></Typography>;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepButton
                      onClick={handleStep(index)}
                      completed={isStepComplete(index)}
                      {...buttonProps}
                    >
                      {label}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <></>
              ) : (
                  <div>
                    <div className={classes.instructions}>{getStepContent(activeStep, qr, handleComplete)}</div>
                    <div>
                      <button disabled={activeStep === 0} onClick={handleBack} className="btn btn-secondary mr-2">
                        <FormattedMessage id="GLOBAL.WORD.BACK" />
                      </button>
                      <button
                        variant="contained"
                        className="btn btn-success mr-2"
                        onClick={handleNext}
                      >
                        <FormattedMessage id="GLOBAL.WORD.NEXT" />
                      </button>
                      {isStepOptional(activeStep) && !completed.has(activeStep) && (
                        <button
                          variant="contained"
                          className="btn btn-success mr-2"
                          onClick={handleSkip}
                          hidden={true}
                        >
                          <FormattedMessage id="GLOBAL.WORD.SKIP" />
                        </button>
                      )}

                      {activeStep !== steps.length &&
                        (completed.has(activeStep) ? (
                          <Typography variant="caption" className={classes.completed}>
                            <FormattedMessage id="GLOBAL.WORD.STEP" /> {activeStep + 1} <FormattedMessage id="GLOBAL.WORD._ALREADY_COMPLETED" />
                          </Typography>
                        ) : (
                            <button variant="contained" color="primary" onClick={handleComplete} className="btn btn-success mr-2"
                              hidden={(activeStep === 2 || activeStep === 3) ? true : false}
                            >
                              {completedSteps() === totalSteps() - 1 ? <FormattedMessage id="GLOBAL.WORD.FINISH" /> : <FormattedMessage id="GLOBAL.WORD.COMPLETE_STEP" />}
                            </button>
                          ))}
                    </div>
                  </div>
                )}
            </div>
          </div>}

        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(EnableMFA);
