import React, { useState, useEffect } from "react";
import { Notice } from "../controls";
import { FormattedMessage } from "react-intl";
import { DropDownAmbient } from '../../../app/modules/CyCMovil/Dropdowns/Dropdown'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { NewApp } from './Actions/NewApp'
import { NewVersion } from './Actions/NewVersion'
import { AssignAplication } from "./Actions/AssignAplication"
import { CheckVersions } from "./Actions/CheckVersions"
import { AssignVersion } from "./Actions/AssignVersion"
import { DialogAutorized } from "./Actions/DialogAutorized"
import { shallowEqual, useSelector } from "react-redux";
import { bazstore } from '../../../app/modules/Network/Services'

const useStylesButton = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

function findOpsxUser(user) {
    return fetch(bazstore + "/opsxuser?us=" + user.id, {
        headers: {
            'Authorization': "Bearer " + user.accessToken
        }
    }
    )
}

export function Demo1Bazstore() {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [ambient, setAmbient] = React.useState({ hostname: "devcycmovil", port: 8383, protocol: "http", text: "Dev Local" })
    const classesButton = useStylesButton();
    const [state, setState] = React.useState({
        ambient: null
    });

    const [openNewApp, setOpenNewApp] = React.useState(false);
    const [openNewVersion, setOpenNewVersion] = React.useState(false);
    const [openCheckVersions, setOpenCheckVersions] = React.useState(false);
    const [openAssignAplication, setOpenAssignAplication] = React.useState(false);
    const [openAssignVersion, setOpenAssignVersion] = React.useState(false);
    const [openDialogAutorized, setOpenDialogAutorized] = useState(false);
    const [opsxUser, setOpsxuser] = useState([])

    useEffect(getOpsxUser, [])

    function handleChangeAmbient(server) {
        //const { hostname, port, protocol, text } = server
        setState({
            ...state,
            [ambient]: server,
        });
        setAmbient(server)

        document.getElementById("root").click();

    }

    function validarOpsxUser(idOpcion) {
        if (opsxUser !== undefined && opsxUser.length > 0) {
            return opsxUser.find(x => x === idOpcion)
        } else {
            return false
        }

    }

    function newApp() {
        if (validarOpsxUser(1)) {
            setOpenNewApp(true)
        }
        else {
            setOpenDialogAutorized(true)
        }
    }

    function newVersion() {
        if (validarOpsxUser(2)) {
            setOpenNewVersion(true)
        }
        else {
            setOpenDialogAutorized(true)
        }
    }

    function assignAplication() {
        if (validarOpsxUser(3)) {
            setOpenAssignAplication(true)
        }
        else {
            setOpenDialogAutorized(true)
        }
    }

    function checkVersions() {
        if (validarOpsxUser(4)) {
            setOpenCheckVersions(true);
        }
        else {
            setOpenDialogAutorized(true)
        }
    }

    function assignVersion() {
        if (validarOpsxUser(5)) {
            setOpenAssignVersion(true);
        }
        else {
            setOpenDialogAutorized(true)
        }
    }


    const images = [
        {
            url: '/media/bazstore/devops2.jpg',
            title: <FormattedMessage id="GLOBAL.WORD.BAZSTORE.NEW.APP" />,
            width: '100%',
            onClick: newApp
        },
        {
            url: '/media/bazstore/devops2.jpg',
            title: <FormattedMessage id="GLOBAL.WORD.BAZSTORE.NEW.VERSION" />,
            width: '100%',
            onClick: newVersion
        },
        {
            url: '/media/bazstore/devops2.jpg',
            title: <FormattedMessage id="GLOBAL.WORD.BAZSTORE.NEW.ASSIGN.APPLICATION" />,
            width: '100%',
            onClick: assignAplication
        },
        {
            url: '/media/bazstore/devops2.jpg',
            title: <FormattedMessage id="GLOBAL.WORD.BAZSTORE.CHECK.VERSIONS" />,
            width: '100%',
            onClick: checkVersions
        },
        {
            url: '/media/bazstore/devops2.jpg',
            title: <FormattedMessage id="GLOBAL.WORD.BAZSTORE.ASSIGN.VERSION" />,
            width: '100%',
            onClick: assignVersion
        },
    ];

    function getOpsxUser() {
        setTimeout(() => {
            try {
                findOpsxUser(user)
                    .then(res => res.json())
                    .then((result) => {
                        if (result?.httpstatus.includes("OK")) {
                            if(result?.resultados){
                            if (result?.resultados[0]) {
                                if (result?.resultados[0]?.bazstore?.opciones?.length > 0) {
                                    setOpsxuser(result.resultados[0].bazstore.opciones)
                                }
                            }
                        } else {
                        }
                    }
                    },
                        (error) => {
                        }
                    )
            } catch (Exception) {
            }
        }, 350);
    }


    return (<>

        <Notice icon="flaticon-home font-primary">
            <span>
                <FormattedMessage id="APP.NOTICES.BAZSTORE" />
            </span>
        </Notice>
        <form className="card card-custom">
            <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder text-dark">
                    <FormattedMessage id="GLOBAL.WORD.BAZSTORE" />
                </h3>
                <div className="card-toolbar">
                    <DropDownAmbient handleChange={handleChangeAmbient}></DropDownAmbient>
                </div>
            </div>
            <div className="card-body pt-2">
                <div className={classesButton.root}>
                    <Grid container spacing={3}>
                        {images.map(image => (
                            <Grid key={Math.random()} item xs={4}>
                                <ButtonBase
                                    focusRipple
                                    key={image.title}
                                    className={classesButton.image}
                                    focusVisibleClassName={classesButton.focusVisible}
                                    style={{
                                        width: image.width,
                                    }}
                                    spacing={2}
                                    onClick={image.onClick}
                                >
                                    <span
                                        className={classesButton.imageSrc}
                                        style={{
                                            backgroundImage: `url(${image.url})`,
                                        }}
                                    />
                                    <span className={classesButton.imageBackdrop} />
                                    <span className={classesButton.imageButton}>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classesButton.imageTitle}
                                        >
                                            {image.title}
                                            <span className={classesButton.imageMarked} />
                                        </Typography>
                                    </span>
                                </ButtonBase>
                            </Grid>
                        ))}

                    </Grid>
                </div>
            </div>
        </form>
        {openNewApp && <NewApp openNewApp={openNewApp} setOpenNewApp={setOpenNewApp} ambient={ambient} />}
        {openNewVersion && <NewVersion openNewVersion={openNewVersion} setOpenNewVersion={setOpenNewVersion} ambient={ambient} />}
        {openAssignAplication && <AssignAplication openAssignAplication={openAssignAplication} setOpenAssignAplication={setOpenAssignAplication} ambient={ambient} />}
        {openCheckVersions && <CheckVersions openCheckVersions={openCheckVersions} setOpenCheckVersions={setOpenCheckVersions} ambient={ambient} />}
        {openAssignVersion && <AssignVersion openAssignVersion={openAssignVersion} setOpenAssignVersion={setOpenAssignVersion} ambient={ambient} />}
        {openDialogAutorized && <DialogAutorized openDialogAutorized={openDialogAutorized} setOpenDialogAutorized={setOpenDialogAutorized} />}
    </>);
}
