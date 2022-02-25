import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, shallowEqual } from "react-redux";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { FormattedMessage } from "react-intl";
import { verifyR2FA } from '../../../modules/Network/Services'
import { v4 as uuidv4 } from 'uuid';
import { ModalProgressBar } from '../../../../_metronic/_partials/controls';
import {
    Dialog, 
    DialogContent
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%"
    },
    media: {
        Width: 75,
        height: 150,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


function VerificationCodeCard({ handleComplete, userParent }) {
    const classes = useStyles();
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [lasToken, setLastToken] = useState(undefined)
    function handleChange(event) {
        if (event?.target?.value?.length === 6 && lasToken !== event.target.value) {
            verifyCode(event.target.value)
        }
    }


    function verifyCode(token) {
        setTimeout(() => {
            try {
                verifyR2FA(user !== undefined ? user : userParent, token)
                    .then(res => res.json())
                    .then((result) => {

                        if (result.httpstatus === "OK") {
                            setLastToken(token)
                            handleComplete()
                        }
                    },
                        (error) => {

                        }
                    )
            } catch (Exception) {

            }
        }, 250);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <span className="svg-icon menu-icon">
                        <SVG src={toAbsoluteUrl("/media/svg/logos/google-play-store.svg")} />
                    </span>
                }
                title={<FormattedMessage id="APP.MFA_MANAGEMENT.GOOGLE_TITLE" />}
                subheader={<FormattedMessage id="APP.MFA_MANAGEMENT.ENTER_CODE" />}
            />

            <CardContent>
                <div className="form-group row">
                    <label className={userParent === undefined ? "col-xl-3 col-sm-3 col-form-label text-alert" : "col-xl-6 col-sm-6 col-form-label text-alert"} >
                        <FormattedMessage id="APP.LABEL.MFA_CODE" />
                    </label>
                    <div className={userParent === undefined ? "col-md-3 col-xl-3" : "col-md-6 col-xl-6"}>
                        <input
                            type="number"
                            placeholder=""
                            className={`form-control form-control-xs form-control-solid`}
                            id={`mfa_code_${uuidv4()} `}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {userParent === undefined && <><Typography variant="body2" color="textSecondary" component="p">
                    <FormattedMessage id="APP.MFA_MANAGEMENT.DESCRIPTION_1" />
                </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <FormattedMessage id="APP.MFA_MANAGEMENT.DESCRIPTION_2" />
                    </Typography></>}

            </CardContent>
        </Card>
    );
}

function VerificationCodeDialog({ handleCompleteParent,handleCloseParent} ) {
    const classes = useStyles();
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [lasToken, setLastToken] = useState(undefined)
    const [openDialog, setOpenDialog] = useState(true)
    const [loading, setloading] = useState(false);
    const fullWidth = true
    const maxWidth = "sm"

    function handleChange(event) {
        if (event?.target?.value?.length === 6 && lasToken !== event.target.value) {
            verifyCode(event.target.value)
        }
    }

    function handleClose() {        
        setOpenDialog(false);
        if (handleCloseParent!==undefined){
            handleCloseParent();
        }        
    }

    function verifyCode(token) {
        setloading(true)
        setTimeout(() => {
            try {
                verifyR2FA(user, token)
                    .then(res => res.json())
                    .then((result) => {

                        if (result.httpstatus === "OK") {
                            setloading(false)
                            handleClose()
                            setLastToken(token)
                            if (handleCompleteParent!==undefined){
                                handleCompleteParent()
                            }
                        }
                        else{
                            setloading(false)
                        }
                    },
                        (error) => {
                            setloading(false)
                        }
                    )
            } catch (Exception) {
                setloading(false)
            }
        }, 250);
    };

    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        > 
            <DialogContent>
            {loading && <ModalProgressBar />}
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <span className="svg-icon menu-icon">
                                <SVG src={toAbsoluteUrl("/media/svg/logos/google-play-store.svg")} />
                            </span>
                        }
                        title={<FormattedMessage id="APP.MFA_MANAGEMENT.GOOGLE_TITLE" />}
                        subheader={<FormattedMessage id="APP.MFA_MANAGEMENT.ENTER_CODE" />}
                    />

                    <CardContent>
                        <div className="form-group row">
                            <label className="col-xl-3 col-sm-3 col-form-label text-alert" >
                                <FormattedMessage id="APP.LABEL.MFA_CODE" />
                            </label>
                            <div className="col-md-3 col-xl-3" >
                                <input
                                    type="number"
                                    placeholder=""
                                    className={`form-control form-control-xs form-control-solid`}
                                    id={`mfa_code_${uuidv4()} `}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {<><Typography variant="body2" color="textSecondary" component="p">
                            <FormattedMessage id="APP.MFA_MANAGEMENT.DESCRIPTION_1" />
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="APP.MFA_MANAGEMENT.DESCRIPTION_2" />
                            </Typography></>}

                    </CardContent>
                </Card>
            </DialogContent> 
        </Dialog>

    );
}

export { VerificationCodeCard, VerificationCodeDialog } 
