import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Notice } from "../controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";
import { getValuestoRestart, applyRestartValues } from '../../../app/modules/Network/Services'
import { DropDownAmbient } from '../../../app/modules/CyCMovil/Dropdowns/Dropdown'

import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText
} from "@material-ui/core";
import { shallowEqual, useSelector } from "react-redux";
import { emailObj, sendEmail } from '../../../app/modules/Email/Client'
 
export function Demo1RestartValues() {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [ambient, setAmbient] = React.useState({ hostname: "devcycmovil", port: 8383, protocol: "http", text: "Dev Local" })
    const [state, setState] = React.useState({
        ambient: null
    });
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const [employee, setEmployee] = useState("");
    const [amount, setAmount] = useState(0.00);
    const [gestion, setGestion] = useState(undefined);
    const [applyVisible, setApplyVisible] = useState(false);
    const [openApply, setOpenApply] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openNotFound, setOpenNotFound] = React.useState(false);

    function handleClickApply() {
        setOpenApply(true);
    }

    function handleCloseApply() {
        setOpenApply(false);
    }

    function handleCloseSuccess() {
        setOpenSuccess(false);
    }

    function handleCloseNotFound() {
        setOpenNotFound(false);
    }


    function handleChangeAmbient(server) {
        //const { hostname, port, protocol, text } = server
        setState({
            ...state,
            [ambient]: server,
        });
        setAmbient(server)

        document.getElementById("root").click();
    }

    const applyRestartValue = () => {
        setOpenApply(false);
        setloading(true);
        setisError(false);

        setTimeout(() => {
            applyRestartValues(ambient, gestion, user.accessToken)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpStatus === "OK") {

                        var emailAux = { ...emailObj }
                        emailAux.to = "bazcobranza@bancoazteca.com"
                        emailAux.body = "Se informa que se ha aplicado un renicio de valores al empleado:<strong>" + employee + "</strong> por la cantidad de: <strong>$" + amount + "</strong>.<br>Usuario que aplica reinicio de valor:<strong>" + user.email + "</strong><br> Si no has sido tu favor de reportarlo al equipo de Cloud y DevOps.<br>"
                        sendEmail(emailAux, user.accessToken)

                        setApplyVisible(false);
                        setloading(false);
                        setisError(false);
                        setGestion(undefined)
                        setAmount(0.00)
                        setOpenSuccess(true)
                    } else {
                        setMsjError(<FormattedMessage id="APP.RESTARTVALUES.MESSAGES.ERROR.BODY" />)
                        setApplyVisible(false);
                        setloading(false);
                        setisError(true);
                        setGestion(undefined)
                        setOpenSuccess(false)
                    }
                },
                    (error) => {
                        setMsjError(<FormattedMessage id="APP.RESTARTVALUES.MESSAGES.ERROR.BODY" />)
                        setApplyVisible(false);
                        setloading(false);
                        setisError(true);
                        setGestion(undefined)
                        setOpenSuccess(false)
                    }
                )
        }, 1000);
    }

    const findValues = (values, setStatus, setSubmitting) => {
        setloading(true);
        setisError(false);
        setTimeout(() => {

            getValuestoRestart(ambient,values.employee, user.accessToken)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpStatus === "OK") {
                        setloading(false);
                        setSubmitting(false);
                        setisError(false);
                        setMsjError(undefined)
                        if (result?.resultados?.rendimientos?.tienda?.gestionesTienda?.length > 0) {
                            let amountAux = 0.00
                            result.resultados.rendimientos.tienda.gestionesTienda.forEach(gestion => {
                                amountAux += Number.parseInt(gestion.fiImporte)
                            });
                            setAmount((Math.round(amountAux * 100) / 100).toFixed(2))
                            setApplyVisible(true);
                            setGestion(result.resultados.rendimientos.tienda.gestionesTienda)
                            setEmployee(values.employee)
                        } else {
                            setApplyVisible(false);
                            setGestion(undefined)
                            setOpenNotFound(true);
                            setEmployee("")
                        }
                    } else {
                        setApplyVisible(false);
                        setMsjError(result.descripcion)
                        setloading(false);
                        setSubmitting(false);
                        setisError(true);
                        setGestion(undefined)
                        setEmployee("")
                    }
                },
                    (error) => {
                        setApplyVisible(false);
                        setloading(false);
                        setSubmitting(false);
                        setisError(true);
                        setGestion(undefined)
                        setEmployee("")
                    }
                )
        }, 200);
    };


    const initialValues = {
        employee: "",
        amount: amount
    };

    const Schema = Yup.object().shape({
        employee: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.EMPLOYEE" />)
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
            findValues(values, setStatus, setSubmitting);
        },
        onReset: (values, { resetForm }) => {
            resetForm();
        },
    });

    return (<>
        <Notice icon="flaticon-home font-primary">
            <span>
                <FormattedMessage id="APP.NOTICES.RESTART_VALUES" />
            </span>
        </Notice>
        <form className="card card-custom" onSubmit={formik.handleSubmit}>
            {loading && <ModalProgressBar />}
            <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder text-dark">
                    <FormattedMessage id="GLOBAL.WORD.VALUERESTART" />
                </h3>
                <div className="card-toolbar">
                <DropDownAmbient handleChange={handleChangeAmbient}></DropDownAmbient>
                    <button
                        id="btnFind"
                        type="submit"
                        className="btn btn-sm btn-success mr-2"
                        disabled={
                            formik.isSubmitting || (formik.touched && !formik.isValid)
                        }
                        hidden={applyVisible}
                    >
                        <FormattedMessage id="APP.BUTTON.FIND" />
                        {formik.isSubmitting}
                    </button>

                    <button
                        id="btnApply"
                        type="button"
                        className="btn btn-sm btn-danger mr-2"
                        disabled={
                            formik.isSubmitting || (formik.touched && !formik.isValid)
                        }
                        hidden={!applyVisible}
                        onClick={handleClickApply}
                    >
                        <FormattedMessage id="APP.BUTTON.APPLY" />
                        {formik.isSubmitting}
                    </button>
                    <Link
                        to="/home"
                        className="btn btn-sm btn-secondary"
                        hidden={!applyVisible}
                    >
                        <FormattedMessage id="APP.BUTTON.CANCEL" />
                    </Link>
                    <Dialog
                        open={openApply}
                        onClose={handleCloseApply}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {<FormattedMessage id="APP.RESTARTVALUES.MESSAGES.ALERT.TITLE" />}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <FormattedMessage id="APP.RESTARTVALUES.MESSAGES.ALERT.BODY" />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={applyRestartValue} color="primary">
                                <FormattedMessage id="APP.BUTTON.OK" />
                            </Button>
                            <Button onClick={handleCloseApply} color="default" autoFocus>
                                <FormattedMessage id="APP.BUTTON.CANCEL" />
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openSuccess}
                        onClose={handleCloseSuccess}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {<FormattedMessage id="GLOBAL.WORD.VALUERESTART" />}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <FormattedMessage id="APP.RESTARTVALUES.MESSAGES.SUCCESS.BODY" />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSuccess} color="primary">
                                <FormattedMessage id="APP.BUTTON.OK" />
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openNotFound}
                        onClose={handleCloseNotFound}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {<FormattedMessage id="GLOBAL.WORD.VALUERESTART" />}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <FormattedMessage id="APP.RESTARTVALUES.MESSAGES.INFO.VALUESNOTFOUND" />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNotFound} color="primary">
                                <FormattedMessage id="APP.BUTTON.OK" />
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className="card-body pt-2">
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
                            {msjError}
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
                    <label className="col-xl-1 col-md-1 col-form-label text-alert">
                        <FormattedMessage id="APP.LABEL.EMPLOYEE" />:
                    </label>
                    <div className="col-md-2 col-xl-2">
                        <input
                            type="number"
                            placeholder="001035"
                            className={`form-control form-control-md form-control-solid mb-2 ${getInputClasses(
                                "employee"
                            )}`}
                            name="employee"
                            {...formik.getFieldProps("employee")}
                        />
                        {formik.touched.employee &&
                            formik.errors.employee ? (
                                <div className="invalid-feedback">
                                    {formik.errors.employee}
                                </div>
                            ) : null}
                    </div>

                    <label className="col-xl-1 col-md-1 col-form-label text-alert">
                        <FormattedMessage id="APP.LABEL.AMOUNT" />:
                    </label>
                    <div className="col-md-2 col-xl-2">
                        <input
                            type="number"
                            placeholder="001035"
                            className={`form-control form-control-md form-control-solid mb-2 ${getInputClasses(
                                "amount"
                            )}`}
                            name="amount"
                            {...formik.getFieldProps("amount")}
                            value={amount}
                            disabled
                        />
                        {formik.touched.amount &&
                            formik.errors.amount ? (
                                <div className="invalid-feedback">
                                    {formik.errors.amount}
                                </div>
                            ) : null}
                    </div>
                </div>
            </div>
        </form>
    </>);
}
