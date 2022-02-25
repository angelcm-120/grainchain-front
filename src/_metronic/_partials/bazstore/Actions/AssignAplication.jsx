import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { ModalProgressBar } from "../../controls";
import { toAbsoluteUrl } from "../../../_helpers";
import SVG from "react-inlinesvg";
import { getCatalogueApps, getJob, registerJobXAplication, findAppsxUser } from '../../../../app/modules/Network/Services'
import { VerificationCodeDialog } from '../../../../app/modules/UserProfile/components/VerificationCodeCard'

import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent
} from "@material-ui/core";



const useStylesLayout = makeStyles(theme => ({
    select: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

export function AssignAplication({ openAssignAplication, setOpenAssignAplication, ambient }) {

    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const classesLayout = useStylesLayout();
    const [catalogue, setCatalogue] = useState(0);
    const [job, setJob] = useState(0);
    const [catalogueAppsxUser, setCatalogueAppsxUser] = useState([]);
    const [jobPosition, setJobPosition] = useState([]);
    const [openMFA, setOpenMFA] = useState(false)
    const [dialogMFA, setDialogMFA] = useState(<></>)

    const initialValues = {
    };


    const arrDevice = [
        1,
        2,
        3
    ];

    let appsxUser = [];

    const fullWidth = true
    const maxWidth = "sm"
    function handleClose() {
        setOpenAssignAplication(false);
    }

    useEffect(getCatalogue, [])

    function getCatalogue() {
        setloading(true);
        setTimeout(() => {
            try {
                getAppsxUser();
                getJobPosition();
                setloading(false);

            } catch (Exception) {
                setloading(false);
            }

        }, 500);
    }


    const getJobPosition = () => {
        setloading(true);
        setisError(false);
        let aux = [];
        setTimeout(() => {
            try {
                getJob(ambient, user.accessToken)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {


                            if (result?.resultados?.bazstore?.puestos?.length > 0) {
                                aux = result.resultados.bazstore.puestos;
                                aux = aux.sort((a, b) => (Number.parseInt(a.puesto) > Number.parseInt(b.puesto)) ? 1 : -1)
                                setJobPosition(aux);
                                aux.push(
                                    { "puesto": 0, "descripcion": "NA" }
                                )
                                if (aux?.length > 0) {
                                    setJob(aux[0].puesto)
                                }
                            }
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)
                        } else {
                            setMsjError(result.resultado)
                            setloading(false);
                            setisError(true);
                        }
                    },
                        (error) => {
                            setMsjError("APP.BAZSTORE.ASSIGNAPLICATION.GETJOBPOSITION.ALERT.ERROR")
                            setloading(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNAPLICATION.GETJOBPOSITION.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
            }
        }, 1000);
    }


    const getAppsxUser = () => {
        try {
            findAppsxUser(user)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpstatus.includes("OK")) {
                        if (result?.resultados[0]?.apps?.length > 0) {
                            appsxUser = result.resultados[0].apps;
                            if (appsxUser.length > 0) {
                                let aux = [];
                                let ix = 1;

                                arrDevice.map((idDevice => {
                                    getCatalogueApps(ambient, user.accessToken, idDevice)
                                        .then(res => res.json())
                                        .then((result) => {
                                            if (result.httpStatus.includes("OK")) {
                                                if (result?.resultados) {
                                                    if (result?.resultados?.bazstore?.aplicaciones?.length > 0) {
                                                        result.resultados.bazstore.aplicaciones.map((app => {
                                                            if (appsxUser.find(x => x.fiApp === app.aplicacion)) {
                                                                if (idDevice === 1) {
                                                                    app.dispositivo = "iPhone"
                                                                }
                                                                else if (idDevice === 2) {
                                                                    app.dispositivo = "iPad"
                                                                }
                                                                else {
                                                                    app.dispositivo = "Android"
                                                                }

                                                                aux.push(app)
                                                            }
                                                            return true;
                                                        }))
                                                    }
                                                }
                                                if (arrDevice.length === ix) {
                                                    aux = aux.sort((a, b) => (Number.parseInt(a.aplicacion) > Number.parseInt(b.aplicacion)) ? 1 : -1)
                                                    setCatalogueAppsxUser(aux)
                                                    aux.push(
                                                        { "aplicacion": 0, "nombre": "APP", "descripcion": "NA", "dispositivo": "N" }
                                                    )
                                                    if (aux?.length > 0) {
                                                        setCatalogue(aux[0].aplicacion)
                                                    }
                                                    return true;
                                                }
                                                else {
                                                    ix += 1
                                                }

                                            }
                                        },
                                            (error) => {
                                                setCatalogueAppsxUser([])
                                                return false;
                                            }
                                        )
                                    return true;
                                }))

                            }
                        }

                    } else {
                        setMsjError("APP.BAZSTORE.NEWVERSION.APPXUSER.MESSAGES.ALERT.ERROR")
                        setCatalogueAppsxUser([])
                    }
                },
                    (error) => {
                        setMsjError("APP.BAZSTORE.NEWVERSION.APPXUSER.MESSAGES.ALERT.ERROR")
                        setCatalogueAppsxUser([])
                    }
                )
        } catch (Exception) {
            setMsjError("APP.BAZSTORE.NEWVERSION.APPXUSER.MESSAGES.ALERT.ERROR")
            setCatalogueAppsxUser([])
        }

    }

    function handleSave(values, setStatus, setSubmitting) {
        setSubmitting(true)
        setloading(true);
        setisError(false);

        setTimeout(() => {
            try {
                registerJobXAplication(ambient, user.accessToken, job, catalogue)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)
                            setOpenAssignAplication(false);
                        } else {
                            setMsjError(result.resultado)
                            setloading(false);
                            setisError(true);
                            setSubmitting(false)
                        }
                    },
                        (error) => {
                            setMsjError("APP.BAZSTORE.ASSIGNAPLICATION.REGISTERJOBXAPP.MESSAGES.ALERT.ERROR")
                            setloading(false);
                            setisError(true);
                            setSubmitting(false)
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNAPLICATION.REGISTERJOBXAPP.MESSAGES.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
                setSubmitting(false)
            }
        }, 1000);
    };

    const handleChange = catalog => event => {
        setCatalogue(event.target.value)
    };

    const handleChangeJob = job => event => {
        setJob(event.target.value)
    };

    const SchemaAssignAplication = Yup.object().shape({

    });

    const formik = useFormik({
        initialValues,
        validationSchema: SchemaAssignAplication,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setOpenMFA(true)
            setDialogMFA(
                <VerificationCodeDialog
                    handleCloseParent={
                        function handleClose(){
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)
                            setSubmitting(false)
                            setDialogMFA(<></>)
                        }
                    }
                    handleCompleteParent={
                        function handleComplete() {
                            handleSave(values, setStatus, setSubmitting);
                        }
                    }
                    />
            )
        },
        onReset: (values, { resetForm }) => {
            resetForm();
        },
    });

    return (<>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openAssignAplication}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                <FormattedMessage id="GLOBAL.WORD.ASSIGN_APPLICATION_POSITION" />
                {loading && <ModalProgressBar />}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    {/* begin::Alert */}
                    {isError && (
                        <Grid container spacing={1}>
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
                        </Grid>
                    )}
                    {/* end::Alert */}

                    <Grid container spacing={1}>
                        <Grid item xs={12} >
                            <InputLabel htmlFor="name-native" className={classesLayout.select}><FormattedMessage id="APP.NATIVESELECT.APPLICATION" /></InputLabel>
                            <NativeSelect
                                value={catalogue}
                                onChange={handleChange('catalogue')}
                                name="catalogue"
                                input={<Input id="name-native"
                                    className={classesLayout.select} />}
                            >
                                {catalogueAppsxUser.map((app) => {
                                    return <option key={`op${app.aplicacion}`}
                                        value={app.aplicacion}
                                        data-tag={app.nombre.toString()}
                                    >{`[${app.aplicacion}] ${app.nombre} (${app.dispositivo}) `}</option>
                                })}
                            </NativeSelect>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="name-native" className={classesLayout.select}><FormattedMessage id="APP.NATIVESELECT.JOB" /></InputLabel>
                            <NativeSelect
                                value={job}
                                onChange={handleChangeJob('job')}
                                name="job"
                                input={<Input id="name-native"
                                    className={classesLayout.select} />}
                            >
                                {jobPosition.map((job) => {
                                    return <option key={`op${job.puesto}`}
                                        value={job.puesto}
                                        data-tag={job.descripcion.toString()}
                                    >{`[${job.puesto}] ${job.descripcion}`}</option>
                                })}
                            </NativeSelect>
                        </Grid>
                    </Grid>
                    <br />
                    <DialogActions>
                        {catalogue > 0 && job > 0 &&
                            <button
                                id="btnSave"
                                type="submit"
                                className="btn btn-sm btn-success mr-2"
                                disabled={
                                    formik.isSubmitting || (formik.touched && !formik.isValid)
                                }
                            >
                                <FormattedMessage id="APP.BUTTON.SAVE_CHANGES" />
                                {formik.isSubmitting}
                            </button>

                        }
                        <Button onClick={handleClose} color="primary" type="button">
                            <FormattedMessage id="GLOBAL.WORD.CLOSE" />
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
        {openMFA && dialogMFA}
    </>
    )
}