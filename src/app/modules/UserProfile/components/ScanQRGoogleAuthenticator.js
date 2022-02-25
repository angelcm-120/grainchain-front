import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { FormattedMessage } from "react-intl";

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

export default function ScanQRGoogleAuthenticator({ qr }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <span className="svg-icon menu-icon">
                        <SVG src={toAbsoluteUrl("/media/svg/logos/google-play-store.svg")} />
                    </span>
                }
                title={<FormattedMessage id="APP.MFA_MANAGEMENT.GOOGLE_TITLE" />}
                subheader={<FormattedMessage id="APP.MFA_MANAGEMENT.GOOGLE_SUBTITLE" />}
            />
            <img
                className={classes.media}
                src={qr}
                alt="Google Authenticator"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <FormattedMessage id="APP.MFA_MANAGEMENT.DESCRIPTION_1" />
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <FormattedMessage id="APP.MFA_MANAGEMENT.DESCRIPTION_2" />
                </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
        </Card>
    );
}