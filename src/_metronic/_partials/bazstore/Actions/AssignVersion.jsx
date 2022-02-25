import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import { findAppsxUser, getCatalogueApps, registerAssignVersion, getCountries, getRegions, getManagement, getCatalogueVersions } from '../../../../app/modules/Network/Services'
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
import { DatePicker } from '../../../../app/modules/CyCMovil/Datepickers/Datepicker'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { isEqual } from "lodash";
import TextField from '@material-ui/core/TextField';
import { format } from "date-fns";
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Select from '@material-ui/core/Select';
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
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350,
    },
    select: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    div: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    datePicker: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    radio: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    formLabel: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    selectAltura: {
        height: '100%',
        width: '200px',
        itemSize: 35,
    }
}));


const countrys = [
    {
        name: "Mexico",
        flag: toAbsoluteUrl("/media/svg/flags/021-mexico.svg"),
    },
    {
        name: "Guatemala",
        flag: toAbsoluteUrl("/media/svg/flags/098-guatemala.svg"),
    }
    ,
    {
        name: "Honduras",
        flag: toAbsoluteUrl("/media/svg/flags/024-honduras.svg"),
    },
    {
        name: "Peru",
        flag: toAbsoluteUrl("/media/svg/flags/188-peru.svg"),
    },
    {
        name: "Panama",
        flag: toAbsoluteUrl("/media/svg/flags/106-panama.svg"),
    },
    {
        name: "El Salvador",
        flag: toAbsoluteUrl("/media/svg/flags/015-el-salvador.svg"),
    },
];


export function AssignVersion({ openAssignVersion, setOpenAssignVersion, ambient }) {

    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const classesLayout = useStylesLayout();
    const [catalogue, setCatalogue] = useState(undefined)
    const [version, setVersion] = useState(undefined)
    const [country, setCountry] = useState(undefined)
    const [filterRegions, setFilterRegions] = useState(undefined)
    const [catalogueAppsxUser, setCatalogueAppsxUser] = useState([]);
    const [catalogueVersions, setCatalogueVersions] = useState([]);
    const [catalogueCountries, setCatalogueCountries] = useState([]);
    const [catalogueRegions, setCatalogueRegions] = useState([]);
    const [catalogueManagement, setCatalogueManagement] = useState([]);
    const [valueRadio, setValueRadio] = useState('region');
    const fecha = new Date();
    const fechaFormato = format(fecha, "yyyy-MM-dd");
    const [dateDistr, setDateDistr] = useState(fechaFormato);
    const [regionSelec, setRegionSelec] = useState([]);
    const [managementSelec, setManagementSelec] = useState([]);
    const [openMFA, setOpenMFA] = useState(false)
    const [dialogMFA, setDialogMFA] = useState(<></>)

    const initialValues = {
        plate: "",
        device: 0,
        region: 0,
        management: 0,
        typeAssignment: "",

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
        setOpenAssignVersion(false);
    }

    function handleChangeRadio(event) {
        setFilterRegions(undefined)
        if (formik?.errors?.plate !== undefined) {
            delete formik.touched["plate"]
            delete formik.errors["plate"]
            formik.setSubmitting(false)
        }
        setValueRadio(event.target.value);
        if (isEqual(event.target.value, "gerencia") || isEqual(event.target.value, "regional")) {
            setRegionSelec([])
            setManagementSelec([])
            setCatalogueManagement([])
        }
    }

    const handleChangeCatalogue = catalog => event => {
        setCatalogue(catalogueAppsxUser.find(x => x.aplicacion === Number.parseInt(event.target.value)))
        setCatalogueVersions([])
    };

    const handleChangeVersion = ver => event => {
        setVersion(event?.target?.value)
    };

    const handleChange = dat => event => {
        setDateDistr(event.target.value)
    };

    function handleListItemClick(event, index) {
        setCountry(catalogueCountries[index].pais)
        getCatalogueRegions(catalogueCountries[index].pais)
    }

    function handleChangeMultiple(event) {
        const { options } = event.target;
        const value = [];

        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                if (isEqual(valueRadio, "gerencia")) {
                    getCatalogueManagement(country, catalogueRegions.find(x => isEqual(x.nombreRegion, options[i].value)))
                }
                value.push(options[i].value);
            }
        }
        setRegionSelec(value);
    }

    function handleChangeMultipleManagement(event) {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setManagementSelec(value);
    }

    function handleChangeTextField(event) {
        let aux = event.target.value.split(",");
        const value = [];
        aux.map((idRegion => {
            let region = catalogueRegions.find(x => x.region === Number.parseInt(idRegion))
            if (region?.nombreRegion !== undefined) {
                value.push(region.nombreRegion);
            }
            return true;
        }))
        setRegionSelec(value);
        setFilterRegions(event.target.value)
    }


    function registerAssignV(ambient, accessToken, valueRadio, plate, dateDistr, version, region, management) {
        try {
            registerAssignVersion(ambient, accessToken, valueRadio, plate, dateDistr, version, region, management)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpStatus === "OK") {

                    } else {
                        setMsjError(result.resultado)
                        setisError(true);
                    }
                }, (error) => {
                    setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.REGISTERASSIGNVERSION.MESSAGES.ALERT.ERROR" />)
                    setisError(true);
                }
                )
        } catch (Exception) {
            setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.REGISTERASSIGNVERSION.MESSAGES.ALERT.ERROR" />)
            setisError(true);
        }
    }


    function handleSave(values, setStatus, setSubmitting) {
        setSubmitting(true)
        setloading(true);
        setisError(false);
        switch (valueRadio) {

            case "region":
                if (regionSelec.length > 0 && dateDistr !== undefined && version > 0) {
                    const auxRegion = [];
                    regionSelec.map((nombreRegion => {
                        auxRegion.push(catalogueRegions.find(x => isEqual(x.nombreRegion, nombreRegion)).region)
                        return true;
                    }));

                    if (auxRegion.length > 0) {
                        auxRegion.map((idRegion => {
                            registerAssignV(ambient, user.accessToken, valueRadio, values.plate, dateDistr, version, idRegion, values.management)
                            return true;
                        }))

                        if (!isError) {
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)
                            setOpenAssignVersion(false);
                        }
                    }
                }

                break;
            case "gerencia":
                if (managementSelec.length > 0 && dateDistr !== undefined && version > 0) {
                    const auxManagement = [];
                    managementSelec.map((nombreManagement => {
                        auxManagement.push(catalogueManagement.find(x => isEqual(x.nombreGerencia, nombreManagement)))
                        return true;
                    }));

                    if (auxManagement.length > 0) {
                        auxManagement.map((management => {
                            registerAssignV(ambient, user.accessToken, valueRadio, values.plate, dateDistr, version, management.region.region, management.gerencia)
                            return true;
                        }))
                        if (!isError) {
                            setloading(false);
                            setisError(false);
                            setMsjError(undefined)
                            setOpenAssignVersion(false);
                        }
                    }
                }
                break
            case "placa":
                if (values.plate.length > 0) {
                    let plates = values.plate.split(",");
                    plates.map(plate => {
                        registerAssignV(ambient, user.accessToken, valueRadio, plate.trim(), dateDistr, version, values.region, values.management)
                        return true;
                    })
                    if (!isError) {
                        setloading(false);
                        setisError(false);
                        setMsjError(undefined)
                        setOpenAssignVersion(false);
                    }
                }
                break;
            default:
                break;
        }
    }



    function getCatalogue() {
        setloading(true);
        setTimeout(() => {
            try {
                getAppsxUser();
                getCatalogueCountries();
                setloading(false);
            } catch (Exception) {
                setloading(false);
            }
        }, 300);
    }
    useEffect(getCatalogue, [])

    function Row(props) {
        const { index, style } = props;
        return (
            <ListItem button onClick={event => handleListItemClick(event, index)} style={style} key={catalogueCountries[index].pais}>
                <ListItemIcon>
                    <img
                        className="h-25px w-25px rounded"
                        src={countrys[index].flag}
                        alt={countrys[index].name}
                    />
                    <InputLabel htmlFor="name-native" className={classesLayout.select}>  {countrys[index].name}</InputLabel>
                </ListItemIcon>
            </ListItem>
        );
    }

    Row.propTypes = {
        index: PropTypes.number,
        style: PropTypes.object,
    };


    const getCatalogueCountries = () => {
        setTimeout(() => {
            try {
                getCountries(ambient, user.accessToken)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            if (result?.resultados?.bazstore?.paises?.length > 0) {
                                setCatalogueCountries(result.resultados.bazstore.paises)
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
                            setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.GETCOUNTRIES.ALERT.ERROR" />)
                            setloading(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.GETCOUNTRIES.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
            }
        }, 300);
    }

    const getCatalogueRegions = (country) => {
        setTimeout(() => {
            try {
                getRegions(ambient, user.accessToken, country)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            if (result?.resultados?.bazstore?.regiones?.length > 0) {
                                setCatalogueRegions(result.resultados.bazstore.regiones)
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
                            setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.GETREGIONS.ALERT.ERROR" />)
                            setloading(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.GETREGIONS.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
            }
        }, 300);
    }

    const getCatalogueManagement = (country, region) => {
        setTimeout(() => {
            try {
                getManagement(ambient, user.accessToken, country, region.region)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            if (result?.resultados?.bazstore?.gerencias?.length > 0) {
                                setCatalogueManagement(result.resultados.bazstore.gerencias)
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
                            setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.GETMANAGEMENT.ALERT.ERROR" />)
                            setloading(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError(<FormattedMessage id="APP.BAZSTORE.ASSIGNVERSION.GETMANAGEMENT.ALERT.ERROR" />)
                setloading(false);
                setisError(true);
            }
        }, 300);
    }



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
                                    setVersion(aux[0].versionId)
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

    const SchemaCheckVersions = Yup.object().shape({
        plate: isEqual(valueRadio, "placa") && Yup.string()
            .matches("[0-9, ]+$", "El carácter ingresado no es válido.")
            .min(1, <FormattedMessage id="APP.YUP.REQUIRED.PLATE.MINIMUM" />)
            .required(<FormattedMessage id="APP.YUP.REQUIRED.PLATE" />)
    });
    const SchemaCheckVersionsDefault = Yup.object().shape({
    });

    const formik = useFormik({
        initialValues,
        validationSchema: isEqual(valueRadio, "placa") ? SchemaCheckVersions : SchemaCheckVersionsDefault,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setOpenMFA(true)
            setDialogMFA(
                <VerificationCodeDialog
                    handleCloseParent={
                        function handleClose() {
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
            open={openAssignVersion}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">
                <FormattedMessage id="GLOBAL.WORD.BAZSTORE.ASSIGN.VERSION" />
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
                                onChange={handleChangeCatalogue('catalogue')}
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
                            {dateDistr !== undefined && <DatePicker display={<FormattedMessage id="GLOBAL.WORD.START_DATE" />} default_date={dateDistr} handleChange={handleChange} />}

                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel component="legend" className={classesLayout.formLabel} ><FormattedMessage id="GLOBAL.WORD.TYPE_ASSIGNMENT" /></FormLabel>
                            <RadioGroup aria-label="position" name="position" value={valueRadio} onChange={handleChangeRadio} row className={classesLayout.radio}>
                                <FormControlLabel
                                    value="region"
                                    control={<Radio color="primary" />}
                                    label={<FormattedMessage id="GLOBAL.WORD.REGION" />}
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="gerencia"
                                    control={<Radio color="primary" />}
                                    label={<FormattedMessage id="GLOBAL.WORD.MANAGEMENT" />}
                                    labelPlacement="end"
                                />

                                <FormControlLabel
                                    value="placa"
                                    control={<Radio color="primary" />}
                                    label={<FormattedMessage id="GLOBAL.WORD.PLATE" />}
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            {<div className={classesLayout.container}>
                                {(isEqual(valueRadio, "placa")) && <TextField
                                    label={<FormattedMessage id="GLOBAL.WORD.PLATE" />}
                                    id="plate"
                                    className={`form-control form-control-md  ${classesLayout.textField} ${getInputClasses("plate"
                                    )}`}
                                    name="plate"
                                    {...formik.getFieldProps("plate")}
                                />
                                }

                                {(isEqual(valueRadio, "placa")) && formik.touched.plate &&
                                    formik.errors.plate ? (
                                        <div className={`invalid-feedback ${classesLayout.div} `}>
                                            {formik.errors.plate}
                                        </div>
                                    ) : null}
                            </div>}

                        </Grid>

                        <Grid item xs={4}>
                            {<div className={classesLayout.container}>
                                {catalogueCountries.length > 0 && (isEqual(valueRadio, "region") || isEqual(valueRadio, "gerencia")) &&
                                    <>
                                        <ListSubheader>Paises</ListSubheader>
                                        <FixedSizeList height={220} width={140} itemSize={35} itemCount={catalogueCountries.length}>
                                            {Row}
                                        </FixedSizeList>
                                    </>
                                }
                            </div>}
                        </Grid>
                        <Grid item xs={4}>
                            {<div className={classesLayout.container} >
                                {catalogueCountries.length > 0 && catalogueRegions.length > 0 && (isEqual(valueRadio, "region") || isEqual(valueRadio, "gerencia")) &&
                                    <>
                                        <ListSubheader>Region</ListSubheader>
                                        {isEqual(valueRadio, "region") && <Input id="component-simple" placeholder="Filtro" value={filterRegions} onChange={handleChangeTextField} />}
                                        <Select
                                            className={classesLayout.selectAltura}
                                            multiple
                                            native
                                            value={regionSelec}
                                            onChange={handleChangeMultiple}
                                            inputProps={{
                                                id: 'select-multiple-native',
                                            }}
                                        >
                                            {catalogueRegions.map(region => (
                                                <option key={region.region} value={region.nombreRegion}>
                                                    {region.nombreRegion}
                                                </option>
                                            ))}
                                        </Select>
                                    </>
                                }
                            </div>}
                        </Grid>
                        <Grid item xs={4}>
                            {<div className={classesLayout.container}>
                                {catalogueCountries.length > 0 && catalogueRegions.length > 0 && catalogueManagement.length > 0 && isEqual(valueRadio, "gerencia") &&
                                    <>
                                        <ListSubheader>Gerencia</ListSubheader>
                                        <Select
                                            height={250}
                                            multiple
                                            native
                                            value={managementSelec}
                                            onChange={handleChangeMultipleManagement}
                                            inputProps={{
                                                id: 'select-multiple-native',
                                            }}
                                        >
                                            {catalogueManagement.map(management => (
                                                <option key={management.gerencia} value={management.nombreGerencia}>
                                                    {management.nombreGerencia}
                                                </option>
                                            ))}
                                        </Select>
                                    </>
                                }
                            </div>}
                        </Grid>
                    </Grid>
                    <br />
                    <DialogActions>
                        {catalogue !== undefined && version > 0 && dateDistr !== undefined &&
                            ((isEqual(valueRadio, "region") && regionSelec.length > 0) || (isEqual(valueRadio, "gerencia") && managementSelec.length > 0) || (isEqual(valueRadio, "placa"))) &&
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