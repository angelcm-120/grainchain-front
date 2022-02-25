import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import { registerNewApp } from '../../../../app/modules/Network/Services'
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


export function NewApp({ openNewApp, setOpenNewApp, ambient }) {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const classesLayout = useStylesLayout();
    const [device, setDevice] = useState(3)
    const [openMFA, setOpenMFA] = useState(false)
    const [dialogMFA, setDialogMFA] = useState(<></>)

    const initialValues = {
        name: "",
        description: "",
    };

    const fullWidth = true
    const maxWidth = "sm"
    function handleClose() {
        setOpenNewApp(false);
    }
 

    function handleSave(values, setStatus, setSubmitting) {
        setSubmitting(true)
        setloading(true);
        setisError(false);

        setTimeout(() => {
            try {
                registerNewApp(ambient, user.accessToken, device, values.name, values.description)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)
                            setOpenNewApp(false);
                        } else {
                            setMsjError(result.resultado)
                            setloading(false);
                            setisError(true);
                            setSubmitting(false)
                        }
                    },
                        (error) => {
                            setMsjError(<FormattedMessage id="APP.BAZSTORE.NEWAPP.REGISTERNEWAPP.MESSAGES.ALERT.ERROR" />)
                            setloading(false);
                            setisError(true);
                            setSubmitting(false)
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.NEWAPP.REGISTERNEWAPP.MESSAGES.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
                setSubmitting(false)
            }
        }, 1000);
    }

    const handleChange = devic => event => {
        setDevice(event.target.value)
    };

    const SchemaNewApp = Yup.object().shape({
        name: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.NAME" />),
        description: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.DESCRIPTION" />)

    });

    const formik = useFormik({
        initialValues,
        validationSchema: SchemaNewApp,
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
            open={openNewApp}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                <FormattedMessage id="GLOBAL.WORD.BAZSTORE.NEW.APP" />
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
                            <InputLabel htmlFor="name-native" className={classesLayout.select}><FormattedMessage id="APP.NATIVESELECT.DEVICE" /></InputLabel>
                            <NativeSelect
                                value={device}
                                onChange={handleChange('device')}
                                name="device"
                                input={<Input id="name-native"
                                    className={classesLayout.select} />}
                            >
                                <optgroup label="IOS">
                                    <option value="1">Iphone</option>
                                    <option value="2">Ipad</option>
                                </optgroup>
                                <optgroup label="Android">
                                    <option value="3">PAX</option>
                                </optgroup>
                            </NativeSelect>

                        </Grid>
                        <Grid item xs={12}>
                            <div className={classesLayout.container}>
                                <TextField
                                    label={<FormattedMessage id="APP.TEXTFIELD.NAME_NEW_APPLICATION" />}
                                    id="name"
                                    className={`form-control form-control-md  ${classesLayout.textField} ${getInputClasses("name"
                                    )}`}
                                    name="name"
                                    {...formik.getFieldProps("name")}
                                />

                                {formik.touched.name &&
                                    formik.errors.name ? (
                                        <div className={`invalid-feedback ${classesLayout.div} `}>
                                            {formik.errors.name}
                                        </div>
                                    ) : null}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classesLayout.container}>
                                <TextField
                                    type="text"
                                    label={<FormattedMessage id="APP.TEXTFIELD.DESCRIPTION_APPLICATION" />}
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
                        {device > 0 &&
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