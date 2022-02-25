import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import { findAppsxUser, getRegionsChange, getPlateChange, getManagementChange, getCatalogueVersions, getCatalogueApps } from '../../../../app/modules/Network/Services'
import { shallowEqual, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { ModalProgressBar } from "../../controls";
import { toAbsoluteUrl } from "../../../_helpers";
import SVG from "react-inlinesvg";
import { v4 as uuidv4 } from 'uuid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { DefaultTable } from '../../../../app/modules/CyCMovil/Tables/DefaultTable'

import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent
} from "@material-ui/core";
import { TabContainer } from "react-bootstrap";

const useStylesLayout = makeStyles(theme => ({
    select: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

export function CheckVersions({ openCheckVersions, setOpenCheckVersions, ambient }) {

    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const classesLayout = useStylesLayout();
    const [catalogue, setCatalogue] = useState(undefined)
    const [version, setVersion] = useState(undefined)
    const [catalogueAppsxUser, setCatalogueAppsxUser] = useState([]);
    const [catalogueVersions, setCatalogueVersions] = useState([]);
    const [value, setValue] = useState(0);
    const [managementData, setManagementData] = useState(undefined);
    const [regionData, setRegionData] = useState(undefined);
    const [plateData, setPlateData] = useState(undefined);

    const initialValues = {
        device: 0
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
        setOpenCheckVersions(false);
    }

    function handleChangeTabs(event, newValue) {
        setValue(newValue);
    }

    function handleSave(values, setStatus, setSubmitting) {

    }

    const handleChange = catalog => event => {
        setCatalogue(catalogueAppsxUser.find(x => x.aplicacion === Number.parseInt(event.target.value)))
        setCatalogueVersions([])
    };

    const handleChangeVersion = ver => event => {
        setVersion(event?.target?.value)
        getChanges(event?.target?.value)
    };

    function getCatalogue() {
        setloading(true);
        setTimeout(() => {
            try {
                getAppsxUser();
                setloading(false);

            } catch (Exception) {
                setloading(false);
            }

        }, 300);
    }
    useEffect(getCatalogue, [])


    const getVersions = () => {

        setTimeout(() => {
            try {
                let aux = [];
                getCatalogueVersions(ambient, user.accessToken, catalogue.idDispositivo)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {

                            if (result?.resultados?.bazstore?.versiones?.length > 0) {
                                result.resultados.bazstore.versiones.map((version => {
                                    if (version?.aplicacion?.aplicacion === catalogue.aplicacion) {
                                        aux.push(version)
                                    }
                                    return true;
                                }))
                                aux = aux.sort((a, b) => (Number.parseInt(a.version) < Number.parseInt(b.version)) ? 1 : -1)

                                aux.push(
                                    { "versionId": 0, "version": 0, "descripcion": "NA", "aplicacion": { "aplicacion": 0 } }
                                )
                                setCatalogueVersions(aux);
                                if (aux?.length > 0) {
                                    setVersion(aux[0].version)
                                    getChanges(aux[0].versionId)
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
                            setMsjError(<FormattedMessage id="APP.BAZSTORE.GETVERSIONS.ALERT.ERROR" />)
                            setloading(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.GETVERSIONS.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
            }
        }, 300);
    }

    const getChanges = (versionId) => {
        setTimeout(() => {
            try {
                setManagementData(undefined);
                setRegionData(undefined);
                setPlateData(undefined);
                if (versionId > 0) {
                    managementChange(versionId);
                    regionsChange(versionId);
                    plateChange(versionId);
                }
            } catch (Exception) {
            }

        }, 300);
    }
    const managementChange = (versionId) => {
        try {

            let aux = [];
            getManagementChange(ambient, user.accessToken)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpStatus === "OK") {
                        if (result?.resultados?.bazstore?.cambios?.length > 0) {
                            let auxTemp = result.resultados.bazstore.cambios.filter(x => x.version.versionId === Number.parseInt(versionId));

                            auxTemp.map((cambio => {
                                cambio.paises = cambio.gerencia.region.pais.pais
                                cambio.regiones = cambio.gerencia.region.region;
                                cambio.gerencia = cambio.gerencia.gerencia
                                cambio.version = cambio.version.version
                                aux.push(cambio)
                                return true;
                            }));

                            if (aux.length > 0) {
                                const table = {
                                    name: "management",
                                    data: aux
                                }
                                setManagementData(table);
                            }
                        }
                    }
                }
                )
        } catch (Exception) {
            setMsjError(<FormattedMessage id="APP.BAZSTORE.MANAGEMENTCHANGE.MESSAGES.ALERT.ERROR" />)

        }
    }

    const regionsChange = (versionId) => {
        try {
            let aux = [];
            getRegionsChange(ambient, user.accessToken)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpStatus === "OK") {
                        if (result?.resultados?.bazstore?.cambios?.length > 0) {
                            let auxTemp = result.resultados.bazstore.cambios.filter(x => x.version.versionId === Number.parseInt(versionId));

                            auxTemp.map((cambio => {
                                cambio.paises = cambio.region.pais.pais
                                cambio.region = cambio.region.region
                                cambio.version = cambio.version.version
                                aux.push(cambio)
                                return true;
                            }));

                            if (aux.length > 0) {
                                const table = {
                                    name: "regions",
                                    data: aux
                                }
                                setRegionData(table);
                            }
                        }
                    }
                }
                )
        } catch (Exception) {
            setMsjError(<FormattedMessage id="APP.BAZSTORE.REGIONSCHANGE.MESSAGES.ALERT.ERROR" />)

        }
    }

    const plateChange = (versionId) => {
        try {
            let aux = [];
            getPlateChange(ambient, user.accessToken)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpStatus === "OK") {
                        if (result?.resultados?.bazstore?.cambios?.length > 0) {
                            let auxTemp = result.resultados.bazstore.cambios.filter(x => x.version.versionId === Number.parseInt(versionId));
                            auxTemp.map((cambio => {
                                cambio.version = cambio.version.version;
                                aux.push(cambio)
                                return true;
                            }));
                            if (aux.length > 0) {
                                const table = {
                                    name: "plate",
                                    data: aux
                                }
                                setPlateData(table);
                            }
                        }
                    }
                }
                )
        } catch (Exception) {
            setMsjError(<FormattedMessage id="APP.BAZSTORE.PLATECHANGE.MESSAGES.ALERT.ERROR" />)
        }
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
                                                                    app.idDispositivo = 1
                                                                }
                                                                else if (idDevice === 2) {
                                                                    app.dispositivo = "iPad"
                                                                    app.idDispositivo = 2
                                                                }
                                                                else {
                                                                    app.dispositivo = "Android"
                                                                    app.idDispositivo = 3
                                                                }

                                                                aux.push(app)
                                                            }
                                                            return true;
                                                        }))
                                                    }
                                                }
                                                if (arrDevice.length === ix && catalogueAppsxUser.length === 0) {
                                                    aux = aux.sort((a, b) => (Number.parseInt(a.aplicacion) > Number.parseInt(b.aplicacion)) ? 1 : -1)
                                                    setCatalogueAppsxUser(aux)
                                                    aux.push(
                                                        { "aplicacion": 0, "nombre": "APP", "descripcion": "NA", "dispositivo": "N" }
                                                    )
                                                    if (aux?.length > 0) {
                                                        setCatalogue(aux[0])
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

    if (catalogue !== undefined && catalogue.aplicacion > 0 && catalogueVersions.length === 0) {
        getVersions(catalogue)
    }

    if (regionData !== undefined) {
        Object.keys(regionData.data).forEach(function (key) {
            delete regionData.data[key].version
        });
    }

    if (managementData !== undefined) {
        Object.keys(managementData.data).forEach(function (key) {
            delete managementData.data[key].version
        });
    }

    if (plateData !== undefined) {
        Object.keys(plateData.data).forEach(function (key) {
            delete plateData.data[key].version
        });
    }


    const SchemaCheckVersions = Yup.object().shape({

    });


    const formik = useFormik({
        initialValues,
        validationSchema: SchemaCheckVersions,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            handleSave(values, setStatus, setSubmitting);

        },
        onReset: (values, { resetForm }) => {
            resetForm();
        },
    });

    return (<>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openCheckVersions}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                <FormattedMessage id="GLOBAL.WORD.BAZSTORE.CHECK.VERSIONS" />
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
                            <InputLabel htmlFor="name-native" className={classesLayout.select}><FormattedMessage id="GLOBAL.WORD.APPLICATION" /></InputLabel>
                            <NativeSelect
                                value={catalogue?.aplicacion !== undefined ? catalogue.aplicacion : 0}
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
                            <InputLabel htmlFor="name-native" className={classesLayout.select}><FormattedMessage id="GLOBAL.WORD.VERSION" /></InputLabel>
                            <NativeSelect
                                value={version}
                                onChange={handleChangeVersion('version')}
                                name="version"
                                input={<Input id="name-native"
                                    className={classesLayout.select} />}
                            >
                                {catalogueVersions.map((version) => {
                                    return <option key={`op${uuidv4()}`}
                                        value={version.versionId}
                                        data-tag={version.descripcion.toString()}
                                    >{`${version.version} `}</option>
                                })}
                            </NativeSelect>

                        </Grid>

                        <Grid item xs={12}>
                            <Tabs
                                value={value}
                                onChange={handleChangeTabs}
                                indicatorColor="secondary"
                                textColor="inherit"
                                centered
                            >
                                <Tab label={<FormattedMessage id="GLOBAL.WORD.REGION" />} />
                                <Tab label={<FormattedMessage id="GLOBAL.WORD.MANAGEMENT" />} />
                                <Tab label={<FormattedMessage id="GLOBAL.WORD.PLATE" />} />
                            </Tabs>

                            {value === 0 && regionData !== undefined && <TabContainer><DefaultTable key={regionData.name} data={regionData} />  </TabContainer>}
                            {value === 1 && managementData !== undefined && <TabContainer><DefaultTable key={managementData.name} data={managementData} />  </TabContainer>}
                            {value === 2 && plateData !== undefined && <TabContainer><DefaultTable key={plateData.name} data={plateData} />  </TabContainer>}
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
    </>
    )
}