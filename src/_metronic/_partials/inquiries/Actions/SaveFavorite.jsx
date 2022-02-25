import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../controls";
import { FormattedMessage } from "react-intl";
import { getSaveQuery } from '../../../../app/modules/Network/Services'
import { shallowEqual, useSelector } from "react-redux";
import { toAbsoluteUrl } from "../../../_helpers";
import SVG from "react-inlinesvg";

import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { format } from "date-fns";



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


export default function SaveFavorite({ openAddFavorites, handleCloseAddFavorites, db, query }) {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [isError, setisError] = useState(false);
    const classesLayout = useStylesLayout();
    const [msjError, setMsjError] = useState(false);

    const [loading, setloading] = useState(false);

    const initialValues = {
        title: "",
        description: ""
    };

    const Schema = Yup.object().shape({
        title: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.TITLE" />),
        description: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.DESCRIPTION" />)
    });


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Schema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            saveQuery(values, setStatus, setSubmitting);
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


    function saveQuery(values, setStatus, setSubmitting) {
        setloading(true);
        setisError(false);
        setSubmitting(true);
        setTimeout(() => {
            try {
                const fecha = new Date();
                const fechaFormato = format(fecha, "yyyy/MM/dd");
                getSaveQuery(user, db, values.title, values.description, fechaFormato, query)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpstatus === "OK") {
                            setloading(false);
                            setSubmitting(false);
                            setisError(false);
                            setMsjError(undefined)
                            handleCloseAddFavorites()
                        } else {
                            setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                            setloading(false);
                            setSubmitting(false);
                            setisError(true);
                        }
                    },
                        (error) => {
                            setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                            setloading(false);
                            setSubmitting(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                setloading(false);
                setSubmitting(false);
                setisError(true);
            }


        }, 1000);
    };


    return (
        <Dialog
            open={openAddFavorites}
            maxWidth="sm"
            onClose={handleCloseAddFavorites}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <FormattedMessage id="GLOBAL.WORD.INQUIRIES" />
                {loading && <ModalProgressBar />}
            </DialogTitle>
            <DialogContent>
                <form id="form2" className="card card-custom" onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
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
                            <div className={classesLayout.container}>
                                <TextField
                                    label={<FormattedMessage id="APP.TEXTFIELD.TITLE" />}
                                    id="title"
                                    className={`form-control form-control-md  ${classesLayout.textField} ${getInputClasses("title"
                                    )}`}
                                    name="title"
                                    {...formik.getFieldProps("title")}
                                />

                                {formik.touched.title &&
                                    formik.errors.title ? (
                                        <div className={`invalid-feedback ${classesLayout.div} `}>
                                            {formik.errors.title}
                                        </div>
                                    ) : null}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classesLayout.container}>
                                <TextField
                                    label={<FormattedMessage id="APP.TEXTFIELD.DESCRIPTION" />}
                                    id="description"
                                    className={`form-control form-control-md  ${classesLayout.textField} ${getInputClasses("description"
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
                    <DialogActions>
                        <Button id="btnSave"
                            type="submit"
                            disabled={
                                formik.isSubmitting || (formik.touched && !formik.isValid)
                            }
                            color="primary"  >
                            <FormattedMessage id="APP.BUTTON.SAVE_CHANGES" />
                        </Button>
                        <Button onClick={handleCloseAddFavorites} color="default" autoFocus>
                            <FormattedMessage id="GLOBAL.WORD.CLOSE" />
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>

        </Dialog>
    )
}