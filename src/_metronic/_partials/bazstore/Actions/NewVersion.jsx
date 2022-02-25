import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import { findAppsxUser, getCatalogueApps, registerNewVersion } from '../../../../app/modules/Network/Services'
import { shallowEqual, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { ModalProgressBar } from "../../controls";
import { toAbsoluteUrl } from "../../../_helpers";
import SVG from "react-inlinesvg";
import { VerificationCodeDialog } from '../../../../app/modules/UserProfile/components/VerificationCodeCard'

import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent
} from "@material-ui/core";


const useStylesLayout = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350,
    },
    select: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    div: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

export function NewVersion({ openNewVersion, setOpenNewVersion, ambient }) {

    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const classesLayout = useStylesLayout();
    const [catalogue, setCatalogue] = useState(0)
    const [catalogueAppsxUser, setCatalogueAppsxUser] = useState([]);
    const [openMFA, setOpenMFA] = useState(false)
    const [dialogMFA, setDialogMFA] = useState(<></>)


    const initialValues = {
        version: "",
        description: "",
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
        setOpenNewVersion(false);
    }

    useEffect(getCatalogue, [])

    function getCatalogue() {
        setloading(true);
        setTimeout(() => {
            try {
                getAppsxUser();
                setloading(false);

            } catch (Exception) {
                setloading(false);
            }

        }, 500);
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
                        setMsjError(<FormattedMessage id="APP.BAZSTORE.APPXUSER.MESSAGES.ALERT.ERROR" />)
                        setCatalogueAppsxUser([])
                    }
                },
                    (error) => {
                        setMsjError(<FormattedMessage id="APP.BAZSTORE.APPXUSER.MESSAGES.ALERT.ERROR" />)
                        setCatalogueAppsxUser([])
                    }
                )
        } catch (Exception) {
            setMsjError(<FormattedMessage id="APP.BAZSTORE.APPXUSER.MESSAGES.ALERT.ERROR" />)
            setCatalogueAppsxUser([])
        }

    }

    function handleSave(values, setStatus, setSubmitting) {
        setSubmitting(true)
        setloading(true);
        setisError(false);

        setTimeout(() => {
            try {
                registerNewVersion(ambient, user.accessToken, values.version, values.description, catalogue)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)
                            setOpenNewVersion(false);
                        } else {
                            setMsjError(result.resultado)
                            setloading(false);
                            setisError(true);
                            setSubmitting(false)
                        }
                    },
                        (error) => {
                            setMsjError(<FormattedMessage id="APP.BAZSTORE.NEWVERSION.MESSAGES.ALERT.ERROR" />)
                            setloading(false);
                            setisError(true);
                            setSubmitting(false)
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.NEWVERSION.MESSAGES.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
                setSubmitting(false)
            }
        }, 1000);

    };

    const handleChange = catalog => event => {
        setCatalogue(event.target.value)
    };

    const SchemaNewVersion = Yup.object().shape({
        version: Yup.number()
            .min(1, <FormattedMessage id="APP.YUP.REQUIRED.VERSION.MINIMUM" />)
            .required(<FormattedMessage id="APP.YUP.REQUIRED.VERSION" />)
        ,
        description: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.DESCRIPTION_VERSION" />)
    });


    const formik = useFormik({
        initialValues,
        validationSchema: SchemaNewVersion,
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


    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }
        return "";
    };

    return (<>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openNewVersion}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                <FormattedMessage id="GLOBAL.WORD.BAZSTORE.NEW.VERSION" />
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
                            <div className={classesLayout.container}>
                                <TextField
                                    min="1"
                                    type="number"
                                    label={<FormattedMessage id="APP.TEXTFIELD.VERSION" />}
                                    id="version"
                                    className={`form-control form-control-md  ${classesLayout.textField} ${getInputClasses("version"
                                    )}`}
                                    name="version"
                                    {...formik.getFieldProps("version")}
                                />

                                {formik.touched.version &&
                                    formik.errors.version ? (
                                        <div className={`invalid-feedback ${classesLayout.div} `}>
                                            {formik.errors.version}
                                        </div>
                                    ) : null}
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={classesLayout.container}>
                                <TextField
                                    type="text"
                                    label={<FormattedMessage id="APP.TEXTFIELD.DESCRIPTION_VERSION" />}
                                    multiline
                                    rows={2}
                                    id="description"
                                    className={`form-control form-control-md ${classesLayout.textField} ${getInputClasses(
                                        "description"
                                    )}`}
                                    name="description"
                                    {...formik.getFieldProps("description")}
                                />
                                {formik.touched.description &&
                                    formik.errors.description ? (
                                        <div className={`invalid-feedback ${classesLayout.div} `}>
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                    <DialogActions>
                        {catalogue > 0 &&
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