import React, { useState } from "react";
import { Notice } from "../controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../controls";
import { toAbsoluteUrl } from "../../_helpers";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";
import { getBinnacle, getBinnacles } from '../../../app/modules/Network/Services'
import { shallowEqual, useSelector } from "react-redux";
import { DropDownAmbient } from '../../../app/modules/CyCMovil/Dropdowns/Dropdown'
import { BinnacleTable } from '../../../app/modules/CyCMovil/Tables/BinnacleTable'

import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText
} from "@material-ui/core";



export function Demo1Binnacles() {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [employee, setEmployee] = useState(false);
    const [openNotFound, setOpenNotFound] = React.useState(false);
    const [msjError, setMsjError] = useState(false);
    const [ambient, setAmbient] = React.useState({ hostname: "devcycmovil", port: 8383, protocol: "http", text: "Dev Local" })

    const [state, setState] = React.useState({
        ambient: null
    });
    const [results, setResults] = useState(undefined);


    const initialValues = {
        employee: "",
    };

    function handleChangeAmbient(server) {
        //const { hostname, port, protocol, text } = server        
        setState({
            ...state,
            [ambient]: server,
        });
        setAmbient(server)
        setResults(undefined)

        document.getElementById("root").click();
    }

    const tables = []
    const table = {
        name: "",
        data: undefined
    }


    const downloadBinnacle = event => {
        setloading(true);
        if (event) {
            try {
                getBinnacle(ambient, user.accessToken, employee, event.target.id)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)


                            if (result?.resultados?.rendimientos?.bitacora?.datos?.length > 0) {

                                var binaryData = [];
                                binaryData.push(Buffer.from(result.resultados.rendimientos.bitacora.datos, "base64"));
                                const url = window.URL.createObjectURL(new Blob(binaryData, { type: "application/gzip" }))
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', 'employee.gzip');
                                document.body.appendChild(link);
                                link.click();
                            }


                        } else {
                            setMsjError("APP.BINNACLES.MESSAGES.ALERT.ERRORDOWNLOAD")
                            setloading(false);
                            setisError(true);
                        }
                    },
                        (error) => {
                            setMsjError("Ocurrió un error al descargar la bitácora para el empleado.")
                            setMsjError("APP.BINNACLES.MESSAGES.ALERT.ERRORDOWNLOAD")
                            setResults(undefined)
                            setloading(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError("APP.BINNACLES.MESSAGES.ALERT.ERRORDOWNLOAD")
                setResults(undefined)
                setloading(false);
                setisError(true);
            }
        }

        event.preventDefault();
    };


    const binnacles = (values, setStatus, setSubmitting) => {
        setResults(undefined)
        setloading(true);
        setisError(false);
        setTimeout(() => {
            try {
                setEmployee(values.employee)
                getBinnacles(ambient, user.accessToken, values.employee)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {

                            setloading(false);
                            setSubmitting(false);
                            setisError(false);
                            setMsjError(undefined)

                            if (result?.httpStatus.includes("OK")) {
                                if (result?.resultados?.rendimientos?.bitacora?.fechas?.length > 0) {
                                    setResults(result.resultados.rendimientos)
                                }
                            }

                        } else {
                            setMsjError("APP.BINNACLES.MESSAGES.ALERT.ERRORQUERY")
                            setloading(false);
                            setSubmitting(false);
                            setisError(true);
                        }
                    },
                        (error) => {
                            setEmployee(undefined)
                            setMsjError("APP.BINNACLES.MESSAGES.ALERT.ERRORQUERY")
                            setResults(undefined)
                            setloading(false);
                            setSubmitting(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError("APP.BINNACLES.MESSAGES.ALERT.ERRORQUERY")
                setEmployee(undefined)
                setResults(undefined)
                setloading(false);
                setSubmitting(false);
                setisError(true);
            }
        }, 1000);
    };


    const Schema = Yup.object().shape({
        employee: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.EMPLOYEE" />)
    });

    const formik = useFormik({
        initialValues,
        validationSchema: Schema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            binnacles(values, setStatus, setSubmitting);
        },
        onReset: (values, { resetForm }) => {
            resetForm();
        },
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


    function handleCloseNotFound() {
        setOpenNotFound(false);
    }

    if (results !== undefined) {

        Object.keys(results).forEach(function (key) {
            const auxTable = { ...table }
            auxTable.name = key
            auxTable.data = results[key]
            tables.push(auxTable)

        });
    }


    return (<>
        <Notice icon="flaticon-home font-primary">
            <span>
                <FormattedMessage id="APP.NOTICES.BINNACLES" />
            </span>
        </Notice>
        <form className="card card-custom" onSubmit={formik.handleSubmit}>
            {loading && <ModalProgressBar />}
            <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder text-dark">
                    <FormattedMessage id="GLOBAL.WORD.BINNACLES" />
                </h3>
                <div className="card-toolbar">
                    <button
                        id="btnFind"
                        type="submit"
                        className="btn btn-sm btn-success mr-2"
                        disabled={
                            formik.isSubmitting || (formik.touched && !formik.isValid)
                        }
                    >
                        <FormattedMessage id="APP.BUTTON.FIND" />
                        {formik.isSubmitting}
                    </button>
                    <DropDownAmbient handleChange={handleChangeAmbient}></DropDownAmbient>
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
                            <FormattedMessage id={msjError} />
                        </div>
                        <div className="alert-close" onClick={() => { }}>
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

                {/* begin::binnacle */}
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

                </div>
                {/* end::tinymce */}


                {/* begin::results */}
                <div className="form-group row">
                    {!isError && results !== undefined &&
                        tables.map((table => {
                            return <BinnacleTable key={table.name} data={table} downloadBinnacle={downloadBinnacle} />
                        }))
                    }
                </div>
                {/* end::results */}
            </div>
        </form>
    </>);
}
