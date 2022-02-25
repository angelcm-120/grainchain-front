import React, { useState, useEffect } from "react";
import { Notice } from "../controls";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { ModalProgressBar } from "../controls";
import { makeStyles } from "@material-ui/core/styles";
import { toAbsoluteUrl } from "../../_helpers";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";
import { getServices, getmethods, getmethodDetail, getInfoServiceEdit, setServiceUpdateInfo, getServicesAdmin, getInfoServiceAdd, addNewService, setServiceAddInfo, setMethodUpdateInfo } from "../../../app/modules/Network/Services";
import { shallowEqual, useSelector } from "react-redux";
import { ServicesTable } from "../../../app/modules/CyCMovil/Tables/ServicesTable";
import { Dialog, DialogTitle, Button, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { VerificationCodeDialog } from "../../../app/modules/UserProfile/components/VerificationCodeCard";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Demo1Contracts() {
	const useStyles = makeStyles((theme) => ({
		root_textfield: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: "100%",
			},
		},
		root_grid: {
			backgroundColor: theme.palette.background.paper,
			color: "#000000",
		},
		root_grid_sec: {
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.secondary,
		},
		formControl: {
			margin: theme.spacing(1),
			maxWidth: "100%",
			minWidth: "100%",
		},
		formControlS: {
			margin: theme.spacing(1),
			maxWidth: 500,
			minWidth: 400,
		},
		root: {
			flexGrow: 1,
		},
		container: {
			display: "flex",
			flexWrap: "wrap",
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			marginTop: theme.spacing(1),
		},
		action: {
			width: "20px",
		},
		requiredText: {
			marginLeft: theme.spacing(1),
			marginTop: theme.spacing(0),
		},
		dense: {
			marginTop: theme.spacing(2),
		},
		menu: {
			width: 200,
		},
		fab: {
			margin: theme.spacing(1),
		},
		fab2: {
			margin: theme.spacing(0),
		},
		extendedIcon: {
			marginRight: theme.spacing(1),
		},
		slowBottom: {
			marginBottom: theme.spacing(0),
		},
		slowTop: {
			marginTop: theme.spacing(0),
		},
		highTop: {
			marginTop: theme.spacing(3),
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
		demo: {
			backgroundColor: theme.palette.background.paper,
		},
		margin: {
			margin: theme.spacing(1),
		},
		textFieldPass: {
			width: "100%",
		},
		divider: {
			marginBottom: theme.spacing(2),
		},
		font: {
			marginBottom: theme.spacing(-1),
		},
		font2: {
			fontSize: 13,
		},
	}));
	const useStyles2 = makeStyles((theme) => ({
		root: {
			width: "100%",
			"& > * + *": {
				marginTop: theme.spacing(2),
			},
		},
	}));
	const classes2 = useStyles2();
	const classes = useStyles();
	const user = useSelector((state) => state.auth.user, shallowEqual);
	const [loading, setloading] = useState(false);
	const [isError, setisError] = useState(false);
	const [services, setServicios] = useState(undefined);
	const [service, setService] = useState(undefined);
	const [serviceEditInfo, setServiceEditInfo] = useState(undefined);
	const [methods, setMethods] = useState(undefined);
	const [method, setMethod] = useState(undefined);
	const [methodDetail, setMethodDetail] = useState(undefined);
	const [arquitecturas, setArquitecturas] = useState(undefined);
	const [methodEditInfo, setMethodEditInfo] = useState(undefined);
	const [msjError, setMsjError] = useState(undefined);
	const [openMethods, setOpenMethods] = React.useState(false);
	const [openMethod, setOpenMethod] = React.useState(false);
	const [openServiceEditForm, setOpenServiceEditForm] = React.useState(false);
	const [openServiceAddForm, setOpenServiceAddForm] = React.useState(false);
	const [openServiceEditInfo, setOpenServiceEditInfo] = React.useState(false);
	const [openMetodoEditInfo, setOpenMetodoEditInfo] = React.useState(false);
	const [openMetodoAddInfo, setOpenMetodoAddInfo] = React.useState(false);
	const fullWidth = true;
	const maxWidth = "md";
	const maxWidthLG = "lg";
	const [openMFA, setOpenMFA] = useState(false);
	const [dialogMFA, setDialogMFA] = useState(<></>);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [openDialogErr, setOpenDialogErr] = React.useState(false);
	const [openDialogYaEx, setOpenDialogYaEx] = React.useState(false);
	const [openDialogErrArq, setOpenDialogErrArq] = React.useState(false);
	const [headersList, setHeadersList] = React.useState([]);
	const [parametersList, setParametersList] = React.useState([]);
	const [responsesList, setResponsesList] = React.useState([]);
	const [openHeadersItemList, setOpenHeadersItemList] = React.useState(false);
	const [openParametersItemList, setOpenParametersItemList] = React.useState(false);
	const [openResponsesItemList, setOpenResponsesItemList] = React.useState(false);
	const [openAddHeaderForm, setOpenAddHeaderForm] = React.useState(false);
	const [openAddParameterForm, setOpenAddParameterForm] = React.useState(false);
	const [openAddResponseForm, setOpenAddResponseForm] = React.useState(false);
	const [openDialogErrYaExiste, setOpenDialogErrYaExiste] = React.useState(false);
	const [openDialogErrNoValido, setOpenDialogErrNoValido] = React.useState(false);


	function handleCloseMethods() {
		setService(undefined);
		setMethods(undefined);
		setOpenMethods(false);
	}

	function handleCloseMethod() {
		setMethodDetail(undefined);
		setMethod(undefined);
		setOpenMethod(false);
	}

	function handleCloseServiceEditForm() {
		setOpenServiceEditForm(false);
	}

	function handleCloseServiceAddForm() {
		setOpenServiceAddForm(false);
	}

	function handleCloseServiceEditInfo() {
		setOpenServiceEditInfo(false);
	}

	function handleCloseMetodoEditInfo() {
		setOpenMetodoEditInfo(false);
	}

	function handleCloseHeaderForm() {
		setOpenAddHeaderForm(false);
	}

	function handleCloseParameterForm() {
		setOpenAddParameterForm(false);
	}

	function handleCloseResponseForm() {
		setOpenAddResponseForm(false);
	}

	function handleCloseMetodoAddInfo() {
		setOpenMetodoAddInfo(false);
	}

	const handleClickDialog = () => {
		setOpenDialog(true);
	};

	const handleClickDialogErrYaExiste = () => {
		setOpenDialogErrYaExiste(true);
	};

	const handleClickDialogErrNoValido = () => {
		setOpenDialogErrNoValido(true);
	};

	const handleCloseDialog = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialog(false);
	};

	const handleClickDialogErr = () => {
		setOpenDialogErr(true);
	};

	const handleCloseDialogErr = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogErr(false);
	};

	const handleClickDialogYaEx = () => {
		setOpenDialogYaEx(true);
	};

	const handleCloseDialogYaEx = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogYaEx(false);
	};

	const handleClickDialogErrArq = () => {
		setOpenDialogErrArq(true);
	};

	const handleCloseDialogErrArq = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogErrArq(false);
	};

	const handleCloseDialogErrYaExiste = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogErrYaExiste(false);
	};

	const handleCloseDialogErrNoValido = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogErrNoValido(false);
	};

	const getDetailService = (event) => {
		const service = services.servicios.find((x) => x.fiIdServicio === Number.parseInt(event.target.id));
		if (service?.fiIdServicio) {
			setService(service);
			getMethodsxService(service.fiIdServicio);
		}
	};

	const getDetailMethod = (event) => {
		const method = methods.find((x) => x.fiIdMetodo === Number.parseInt(event.target.id));
		if (method?.fiIdServicio && method?.fiIdMetodo) {
			setMethod(method);
			getMethod(method.fiIdServicio, method.fiIdMetodo);
		}
	};

	const getMethodEditInfo = (event) => {
		let ids = event.target.id.split("|");
		let met = serviceEditInfo.Metodos.find((x) => x.fiIdServicio === Number.parseInt(ids[0]) && x.fiIdMetodo === Number.parseInt(ids[1]));
		if (met?.fiIdServicio && met?.fiIdMetodo) {
			setMethodEdit(met);
		}
	};

	const getMethod = (service, method) => {
		setloading(true);
		setTimeout(() => {
			try {
				getmethodDetail(service, method, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados) {
									setMethodDetail(result?.resultados);
									setOpenMethod(true);
								}
							} else {
								setMethodDetail(undefined);
							}
						},
						(error) => {
							setloading(false);
							setMethodDetail(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				setMethodDetail(undefined);
			}
		}, 500);
	};

	const getMethodsxService = (service) => {
		setloading(true);
		setTimeout(() => {
			try {
				getmethods(service, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados?.Metodos.length > 0) {
									setMethods(result?.resultados?.Metodos);
									setOpenMethods(true);
								}
							} else {
								return setMethods(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setMethods(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setMethods(undefined);
			}
		}, 500);
	};

	const getServicesxUser = () => {
		setServicios(undefined);
		setloading(true);
		setisError(false);
		setTimeout(() => {
			try {
				if (user.roles === 1) {
					getServicesAdmin(user)
						.then((res) => res.json())
						.then(
							(result) => {
								if (result.httpstatus.includes("OK")) {
									setloading(false);
									setisError(false);
									setMsjError(undefined);
									if (result?.resultados?.servicios?.length > 0) {
										setServicios(result.resultados);
									}
								} else {
									setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
									setloading(false);
									setisError(true);
								}
							},
							(error) => {
								setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
								setServicios(undefined);
								setloading(false);
								setisError(true);
							}
						);
				} else {
					getServices(user)
						.then((res) => res.json())
						.then(
							(result) => {
								if (result.httpstatus.includes("OK")) {
									setloading(false);
									setisError(false);
									setMsjError(undefined);
									if (result?.resultados?.servicios?.length > 0) {
										setServicios(result.resultados);
									}
								} else {
									setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
									setloading(false);
									setisError(true);
								}
							},
							(error) => {
								setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
								setServicios(undefined);
								setloading(false);
								setisError(true);
							}
						);
				}
			} catch (Exception) {
				setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
				setServicios(undefined);
				setloading(false);
				setisError(true);
			}
		}, 500);
	};

	const getServiceEditInfo = (service) => {
		setloading(true);
		setTimeout(() => {
			try {
				getInfoServiceEdit(service, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados) {
									setServiceEditInfo(result?.resultados);
									setOpenServiceEditForm(true);
								}
							} else {
								setServiceEditInfo(undefined);
							}
						},
						(error) => {
							setloading(false);
							setServiceEditInfo(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				setServiceEditInfo(undefined);
			}
		}, 500);
	};

	const setServiceInfoUpdate = (values, setStatus, setSubmitting) => {
		setloading(true);
		setTimeout(() => {
			try {
				setServiceUpdateInfo(values, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								handleCloseMetodoEditInfo(false);
								handleCloseServiceEditForm(false);
								handleCloseServiceEditInfo(false);
								getServicesxUser();
								getServiceEditInfo(values.fiIdServicio);
								setSubmitting(false);
								handleClickDialog();
							} else {
								handleClickDialogErr();
								return setServiceEditInfo(undefined);
							}
						},
						(error) => {
							setloading(false);
							handleClickDialogErr();
							return setServiceEditInfo(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				handleClickDialogErr();
				return setServiceEditInfo(undefined);
			}
		}, 500);
	};

	const setMethodInfoUpdate = (values, setStatus, setSubmitting) => {
		setloading(true);
		setTimeout(() => {
			try {
				setMethodUpdateInfo(values, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								handleCloseMetodoEditInfo(false);
								handleCloseServiceEditForm(false);
								handleCloseServiceEditInfo(false);
								getServicesxUser();
								getServiceEditInfo(values.fiIdServicio);
								setSubmitting(false);
								handleClickDialog();
							} else {
								handleClickDialogErr();
								return setServiceEditInfo(undefined);
							}
						},
						(error) => {
							setloading(false);
							handleClickDialogErr();
							return setServiceEditInfo(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				handleClickDialogErr();
				return setServiceEditInfo(undefined);
			}
		}, 500);
	};

	const setMethodInfoAdd = (values, setStatus, setSubmitting) => {
		setloading(true);
		setTimeout(() => {
			try {
				setServiceAddInfo(values, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								handleCloseMetodoAddInfo(false);
								handleCloseServiceEditForm(false);
								handleCloseServiceEditInfo(false);
								getServicesxUser();
								getServiceEditInfo(values.fiIdServicio);
								setSubmitting(false);
								handleClickDialog();
							} else {
								handleClickDialogErr();
								return setServiceEditInfo(undefined);
							}
						},
						(error) => {
							setloading(false);
							handleClickDialogErr();
							return setServiceEditInfo(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				handleClickDialogErr();
				return setServiceEditInfo(undefined);
			}
		}, 500);
	};

	const getArquitecturas = () => {
		setloading(true);
		setTimeout(() => {
			try {
				getInfoServiceAdd(user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados) {
									setArquitecturas(result?.resultados);
									if (result?.resultados.length > 0) {
										formikAddService.values.fiIdArquitectura = result?.resultados[0].fiIdArquitectura;
										setOpenServiceAddForm(true);
									} else {
										handleClickDialogErrArq();
									}
								} else {
									handleClickDialogErrArq();
								}
							} else {
								setArquitecturas(undefined);
							}
						},
						(error) => {
							setloading(false);
							setArquitecturas(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				setArquitecturas(undefined);
			}
		}, 500);
	};

	const setServiceAdd = (values, setStatus, setSubmitting) => {
		setloading(true);
		setTimeout(() => {
			try {
				addNewService(values, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								handleCloseServiceAddForm(false);
								getServicesxUser();
								handleClickDialog();
							} else if (result.httpstatus.includes("Ya existente.")) {
								handleClickDialogYaEx();
								return setServiceEditInfo(undefined);
							} else {
								handleCloseServiceAddForm(false);
								handleClickDialogErr();
								return setServiceEditInfo(undefined);
							}
						},
						(error) => {
							setloading(false);
							handleClickDialogErr();
							return setServiceEditInfo(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				handleClickDialogErr();
				return setServiceEditInfo(undefined);
			}
		}, 500);
	};

	const setMethodEdit = (methodInfo) => {
		formikEditMethod.values.fcNombreMetodo = methodInfo.fcNombreMetodo;
		formikEditMethod.values.fcDescripcion = methodInfo.fcDescripcion;
		formikEditMethod.values.fcMetodo = methodInfo.fcMetodo;
		formikEditMethod.values.fcPath = methodInfo.fcPath;
		formikEditMethod.values.fcJsonSchema = methodInfo.fcJsonSchema;
		formikEditMethod.values.fcGrafico = methodInfo.fcGrafico;

		setMethodEditInfo(methodInfo);
		setHeadersList(methodInfo.Headers);
		setParametersList(methodInfo.Parametros);
		setResponsesList(methodInfo.Respuestas);
		setOpenMetodoEditInfo(true);
	};

	useEffect(getServicesxUser, []);

	function addSrv(event) {
		getArquitecturas();
	}

	function addMtd(event) {
		formikAddMethod.values.fcNombreMetodo = "";
		formikAddMethod.values.fcDescripcion = "";
		formikAddMethod.values.fcMetodo = "GET";
		formikAddMethod.values.fcPath = "";
		formikAddMethod.values.fcJsonSchema = "";
		formikAddMethod.values.fcGrafico = "";
		setHeadersList([]);
		setParametersList([]);
		setResponsesList([]);
		setOpenMetodoAddInfo(true);
	}

	const editService = (event) => {
		const srv = document.getElementById("editBtnService").value;
		getServiceEditInfo(srv);
	};

	const table = {
		name: "",
		data: undefined,
	};

	if (services !== undefined) {
		Object.keys(services?.servicios).forEach(function(key) {
			services.servicios[key].fiIdDepartamento = services.arquitecturas.find((x) => x.fiIdArquitectura === services.servicios[key].fiIdArquitectura).fiIdDepartamento;
			services.servicios[key].fcArquitectura = services.arquitecturas.find((x) => x.fiIdArquitectura === services.servicios[key].fiIdArquitectura).fcArquitectura;
			services.servicios[key].fcDepartamento = services.departamentos.find((x) => x.fiIdDepartamento === services.servicios[key].fiIdDepartamento).fcDepartamento;
			services.servicios[key].fcResponsable = services.departamentos.find((x) => x.fiIdDepartamento === services.servicios[key].fiIdDepartamento).fcResponsable;
			services.servicios[key].fcContacto = services.departamentos.find((x) => x.fiIdDepartamento === services.servicios[key].fiIdDepartamento).fcEmailGrupo;
			services.servicios[key].fdFecCertificacion = services.servicios[key].fdFecCertificacion.toString().replace("T00:00:00", "");
			services.servicios[key].check = "check";
		});

		table.name = "services";
		table.data = JSON.parse(JSON.stringify(services.servicios));
		Object.keys(table.data).forEach(function(key) {
			delete table.data[key].fcDescripcion;
			delete table.data[key].fiIdArquitectura;
			delete table.data[key].fiIdDepartamento;
			delete table.data[key].fcContextPath;
			delete table.data[key].fcProtocoloDev;
			delete table.data[key].fcHostDev;
			delete table.data[key].fcProtocoloProd;
			delete table.data[key].fcHostProd;
			delete table.data[key].fcActuador;
			delete table.data[key].fcSwaggerDoc;
			delete table.data[key].fcProtocoloDevCNBV;
			delete table.data[key].fcHostDevCNBV;
			delete table.data[key].fcProtocoloIntCNBV;
			delete table.data[key].fcHostIntCNBV;
			delete table.data[key].fcProtocoloQACNBV;
			delete table.data[key].fcHostQACNBV;
		});
	}

	const tableURL = {
		name: "",
		data: undefined,
	};

	const tableMethods = {
		name: "",
		data: undefined,
	};
	const tableHeaders = {
		name: "",
		data: undefined,
	};
	const tableParams = {
		name: "",
		data: undefined,
	};
	const tableResponse = {
		name: "",
		data: undefined,
	};
	const tableJsonSchema = {
		name: "",
		data: undefined,
	};

	const tableGraphic = {
		name: "",
		data: undefined,
	};
	if (methods !== undefined) {
		tableMethods.name = "Methods";
		tableMethods.data = JSON.parse(JSON.stringify(methods));
		Object.keys(tableMethods.data).forEach(function(key) {
			delete tableMethods.data[key].fiIdServicio;
			delete tableMethods.data[key].fcJsonSchema;
			delete tableMethods.data[key].fcGrafico;
		});

		const urls = [
			{
				info: "Desarrollo Local",
				url: `${service.fcProtocoloDev}://${service.fcHostDev}/${service.fcContextPath} `,
			},
			{
				info: "CNBV Dev",
				url: `${service.fcProtocoloDevCNBV}://${service.fcHostDevCNBV}/${service.fcContextPath} `,
			},
			{
				info: "CNBV Int",
				url: `${service.fcProtocoloIntCNBV}://${service.fcHostIntCNBV}/${service.fcContextPath} `,
			},
			{
				info: "CNBV QA",
				url: `${service.fcProtocoloQACNBV}://${service.fcHostQACNBV}/${service.fcContextPath} `,
			},
			{
				info: "Producción",
				url: `${service.fcProtocoloProd}://${service.fcHostProd}/${service.fcContextPath} `,
			},
			{
				info: "Actuator",
				url: `${service.fcProtocoloDev}://${service.fcHostDev}/${service.fcActuador} `,
			},
			{
				info: "Swagger Doc",
				url: `${service.fcProtocoloDev}://${service.fcHostDev}/${service.fcSwaggerDoc} `,
			},
		];

		tableURL.name = "URLS";
		tableURL.data = urls;
	}

	const tableURLMethod = {
		name: "",
		data: undefined,
	};

	if (methodDetail !== undefined) {
		tableHeaders.name = "Headers";
		tableHeaders.data = JSON.parse(JSON.stringify(methodDetail.Headers));

		Object.keys(tableHeaders.data).forEach(function(key) {
			delete tableHeaders.data[key].fiIdHeader;
			delete tableHeaders.data[key].fiIdServicio;
			delete tableHeaders.data[key].fiIdMetodo;
			delete tableHeaders.data[key].fiStatus;
			delete tableHeaders.data[key]._id;
		});

		tableParams.name = "Parametros";
		tableParams.data = JSON.parse(JSON.stringify(methodDetail.Parametros));
		Object.keys(tableParams.data).forEach(function(key) {
			delete tableParams.data[key].fiIdParametro;
			delete tableParams.data[key].fiIdServicio;
			delete tableParams.data[key].fiIdMetodo;
			delete tableParams.data[key]._id;
		});

		tableResponse.name = "Respuestas";
		tableResponse.data = methodDetail.Respuestas;
		tableResponse.data = JSON.parse(JSON.stringify(methodDetail.Respuestas));
		Object.keys(tableResponse.data).forEach(function(key) {
			delete tableResponse.data[key].fiIdRespuesta;
			delete tableResponse.data[key].fiIdServicio;
			delete tableResponse.data[key].fiIdMetodo;
			delete tableResponse.data[key]._id;
		});

		const urls = [
			{
				info: "Desarrollo Local",
				url: `${service.fcProtocoloDev}://${service.fcHostDev}/${service.fcContextPath}${method?.fcPath} `,
			},
			{
				info: "CNBV Dev",
				url: `${service.fcProtocoloDevCNBV}://${service.fcHostDevCNBV}/${service.fcContextPath}${method?.fcPath} `,
			},
			{
				info: "CNBV Int",
				url: `${service.fcProtocoloIntCNBV}://${service.fcHostIntCNBV}/${service.fcContextPath}${method?.fcPath} `,
			},
			{
				info: "CNBV QA",
				url: `${service.fcProtocoloQACNBV}://${service.fcHostQACNBV}/${service.fcContextPath}${method?.fcPath} `,
			},
			{
				info: "Producción",
				url: `${service.fcProtocoloProd}://${service.fcHostProd}/${service.fcContextPath}${method?.fcPath} `,
			},
			{
				info: "Metodo",
				url: `${method?.fcMetodo}  `,
			},
		];

		tableURLMethod.name = "URLS";
		tableURLMethod.data = urls;

		tableJsonSchema.name = "JsonSchema";
		tableJsonSchema.data = [
			{
				JsonSchema: method.fcJsonSchema,
			},
		];

		tableGraphic.name = "Gráfico";
		tableGraphic.data = [
			{
				Gráfico: method.fcGrafico,
			},
		];
	}

	const tableGeneralInfoServiceEdit = {
		name: "",
		data: undefined,
	};

	const tableMetodosEdit = {
		name: "",
		data: undefined,
	};

	if (serviceEditInfo !== undefined) {
		tableGeneralInfoServiceEdit.name = "Información General del Servicio";

		const urls = [
			{
				info: "fcNombre",
				data: `${serviceEditInfo.fcNombre}`,
			},
			{
				info: "fcDescripcion",
				data: `${serviceEditInfo.fcDescripcion}`,
			},
			{
				info: "fiStatus",
				data: `${serviceEditInfo.fiStatus}`,
			},
			{
				info: "fcFolioCertificacion",
				data: `${serviceEditInfo.fcFolioCertificacion}`,
			},
			{
				info: "fdFecCertificacion",
				data: `${serviceEditInfo.fdFecCertificacion}`,
			},
			{
				info: "fcContextPath",
				data: `${serviceEditInfo.fcContextPath}`,
			},
			{
				info: "fcProtocoloDev",
				data: `${serviceEditInfo.fcProtocoloDev}`,
			},
			{
				info: "fcHostDev",
				data: `${serviceEditInfo.fcHostDev}`,
			},
			{
				info: "fcProtocoloProd",
				data: `${serviceEditInfo.fcProtocoloProd}`,
			},
			{
				info: "fcHostProd",
				data: `${serviceEditInfo.fcHostProd}`,
			},
			{
				info: "fcActuador",
				data: `${serviceEditInfo.fcActuador}`,
			},
			{
				info: "fcSwaggerDoc",
				data: `${serviceEditInfo.fcSwaggerDoc}`,
			},
			{
				info: "fcProtocoloDevCNBV",
				data: `${serviceEditInfo.fcProtocoloDevCNBV}`,
			},
			{
				info: "fcHostDevCNBV",
				data: `${serviceEditInfo.fcHostDevCNBV}`,
			},
			{
				info: "fcProtocoloIntCNBV",
				data: `${serviceEditInfo.fcProtocoloIntCNBV}`,
			},
			{
				info: "fcHostIntCNBV",
				data: `${serviceEditInfo.fcHostIntCNBV}`,
			},
			{
				info: "fcProtocoloQACNBV",
				data: `${serviceEditInfo.fcProtocoloQACNBV}`,
			},
			{
				info: "fcHostQACNBV",
				data: `${serviceEditInfo.fcHostQACNBV}`,
			},
		];
		tableGeneralInfoServiceEdit.data = urls;

		tableMetodosEdit.name = "Tabla de Métodos para editar";
		tableMetodosEdit.data = JSON.parse(JSON.stringify(serviceEditInfo.Metodos));

		Object.keys(tableMetodosEdit.data).forEach(function(key) {
			tableMetodosEdit.data[key].check = "checkM";
			delete tableMetodosEdit.data[key]._id;
			delete tableMetodosEdit.data[key].fcJsonSchema;
			delete tableMetodosEdit.data[key].fcGrafico;
			delete tableMetodosEdit.data[key].Headers;
			delete tableMetodosEdit.data[key].Parametros;
			delete tableMetodosEdit.data[key].Respuestas;
			delete tableMetodosEdit.data[key].fiOrden;
		});
	}

	function handleOnClickEditInfoService(_id) {
		formikEditService.values._id = _id;
		formikEditService.values.fiIdServicio = serviceEditInfo.fiIdServicio;
		formikEditService.values.fcNombre = serviceEditInfo.fcNombre;
		formikEditService.values.fcDescripcion = serviceEditInfo.fcDescripcion;
		formikEditService.values.fiStatus = serviceEditInfo.fiStatus;
		formikEditService.values.fcFolioCertificacion = serviceEditInfo.fcFolioCertificacion;
		formikEditService.values.fdFecCertificacion = serviceEditInfo.fdFecCertificacion;
		formikEditService.values.fcContextPath = serviceEditInfo.fcContextPath;
		formikEditService.values.fcProtocoloDev = serviceEditInfo.fcProtocoloDev;
		formikEditService.values.fcHostDev = serviceEditInfo.fcHostDev;
		formikEditService.values.fcProtocoloProd = serviceEditInfo.fcProtocoloProd;
		formikEditService.values.fcHostProd = serviceEditInfo.fcHostProd;
		formikEditService.values.fcActuador = serviceEditInfo.fcActuador;
		formikEditService.values.fcSwaggerDoc = serviceEditInfo.fcSwaggerDoc;
		formikEditService.values.fcProtocoloDevCNBV = serviceEditInfo.fcProtocoloDevCNBV;
		formikEditService.values.fcHostDevCNBV = serviceEditInfo.fcHostDevCNBV;
		formikEditService.values.fcProtocoloIntCNBV = serviceEditInfo.fcProtocoloIntCNBV;
		formikEditService.values.fcHostIntCNBV = serviceEditInfo.fcHostIntCNBV;
		formikEditService.values.fcProtocoloQACNBV = serviceEditInfo.fcProtocoloQACNBV;
		formikEditService.values.fcHostQACNBV = serviceEditInfo.fcHostQACNBV;

		setOpenServiceEditInfo(true);
	}

	const initialValues = {
		_id: "",
		fiIdServicio: "",
		fcNombre: "",
		fcDescripcion: "",
		fiStatus: false,
		fcFolioCertificacion: "",
		fdFecCertificacion: "",
		fcContextPath: "",
		fcProtocoloDev: "",
		fcHostDev: "",
		fcProtocoloProd: "",
		fcHostProd: "",
		fcActuador: "",
		fcSwaggerDoc: "",
		fcProtocoloDevCNBV: "",
		fcHostDevCNBV: "",
		fcProtocoloIntCNBV: "",
		fcHostIntCNBV: "",
		fcProtocoloQACNBV: "",
		fcArquitectura: "",
		fcHostQACNBV: "",
	};

	const Schema = Yup.object().shape({});
	
// requerimientos de formulario de edición de un contrato
	const SchemaEditService = Yup.object().shape({
		fcNombre: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcDescripcion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fiStatus: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcFolioCertificacion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fdFecCertificacion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcContextPath: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloDev: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostDev: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloProd: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostProd: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcActuador: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcSwaggerDoc: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloDevCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostDevCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloIntCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostIntCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloQACNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostQACNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
	});

	const SchemaAddService = Yup.object().shape({
		fcNombre: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcDescripcion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fiStatus: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcFolioCertificacion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fdFecCertificacion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcContextPath: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloDev: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostDev: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloProd: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostProd: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcActuador: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcSwaggerDoc: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloDevCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostDevCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloIntCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostIntCNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcProtocoloQACNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fiIdArquitectura: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcHostQACNBV: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
	});

	const SchemaMethod = Yup.object().shape({
		fcNombreMetodo: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcDescripcion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcMetodo: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcPath: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
	});

	const SchemaAddHeader = Yup.object().shape({
		fcHeader: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcValorHeader: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcEjemploHeader: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcDescripcionHeader: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fiStatusHeader: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
	});

	const SchemaAddParameter = Yup.object().shape({
		fcNombreParameter: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcDescripcionParameter: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcTipoParameter: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcEjemploParameter: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fiStatusParameter: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
	});

	const SchemaAddResponse = Yup.object().shape({
		fcCodigoResponse: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcDescripcionResponse: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcEjemploResponse: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fiStatusResponse: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: Schema,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			getServicesxUser();
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const getInputClassesEditService = (fieldname) => {
		if (formikEditService.touched[fieldname] && formikEditService.errors[fieldname]) {
			return "is-invalid";
		}

		if (formikEditService.touched[fieldname] && !formikEditService.errors[fieldname]) {
			return "is-valid";
		}

		return "";
	};

	const getInputClassesAddService = (fieldname) => {
		if (formikAddService.touched[fieldname] && formikAddService.errors[fieldname]) {
			return "is-invalid";
		}

		if (formikAddService.touched[fieldname] && !formikAddService.errors[fieldname]) {
			return "is-valid";
		}

		return "";
	};

	const getInputClassesEditMethod = (fieldname) => {
		if (formikEditMethod.touched[fieldname] && formikEditMethod.errors[fieldname]) {
			return "is-invalid";
		}

		if (formikEditMethod.touched[fieldname] && !formikEditMethod.errors[fieldname]) {
			return "is-valid";
		}

		return "";
	};

	const getInputClassesAddHeader = (fieldname) => {
		if (formikAddHeader.touched[fieldname] && formikAddHeader.errors[fieldname]) {
			return "is-invalid";
		}

		if (formikAddHeader.touched[fieldname] && !formikAddHeader.errors[fieldname]) {
			return "is-valid";
		}

		return "";
	};

	const getInputClassesAddParameter = (fieldname) => {
		if (formikAddParameter.touched[fieldname] && formikAddParameter.errors[fieldname]) {
			return "is-invalid";
		}

		if (formikAddParameter.touched[fieldname] && !formikAddParameter.errors[fieldname]) {
			return "is-valid";
		}

		return "";
	};

	const getInputClassesAddResponse = (fieldname) => {
		if (formikAddResponse.touched[fieldname] && formikAddResponse.errors[fieldname]) {
			return "is-invalid";
		}

		if (formikAddResponse.touched[fieldname] && !formikAddResponse.errors[fieldname]) {
			return "is-valid";
		}

		return "";
	};

	const formikEditService = useFormik({
		initialValues,
		validationSchema: SchemaEditService,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={function handleComplete() {
						setMsjError(undefined);
						setSubmitting(false);
						setServiceInfoUpdate(values, setStatus, setSubmitting);
						setDialogMFA(<></>);
					}}
					handleCloseParent={function handleCloses() {
						setDialogMFA(<></>);
					}}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const formikAddService = useFormik({
		initialValues,
		validationSchema: SchemaAddService,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={function handleComplete() {
						setMsjError(undefined);
						setSubmitting(false);
						setServiceAdd(values, setStatus, setSubmitting);
						setDialogMFA(<></>);
					}}
					handleCloseParent={function handleCloses() {
						setDialogMFA(<></>);
					}}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const formikEditMethod = useFormik({
		initialValues,
		validationSchema: SchemaMethod,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			const updatedMethod = {
				"fiIdMetodo": methodEditInfo.fiIdMetodo,
        "fiIdServicio": methodEditInfo.fiIdServicio,
        "fcNombreMetodo": values.fcNombreMetodo,
        "fcDescripcion": values.fcDescripcion,
        "fcMetodo": values.fcMetodo,
        "fcPath": values.fcPath,
        "fiOrden": methodEditInfo.fiOrden,
        "fcJsonSchema": values.fcJsonSchema,
        "fcGrafico": values.fcGrafico,
        "Headers": headersList,
        "Parametros": parametersList,
        "Respuestas": responsesList,
			}

			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={function handleComplete() {
						setMsjError(undefined);
						setSubmitting(false);
						setMethodInfoUpdate(updatedMethod, setStatus, setSubmitting);
						setDialogMFA(<></>);
					}}
					handleCloseParent={function handleCloses() {
						setDialogMFA(<></>);
					}}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const formikAddMethod = useFormik({
		initialValues,
		validationSchema: SchemaMethod,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			let bandera = false;
			const NewMethod = {
				"fiIdMetodo": maxIdMethod(serviceEditInfo),
        "fiIdServicio": serviceEditInfo.fiIdServicio,
        "fcNombreMetodo": values.fcNombreMetodo,
        "fcDescripcion": values.fcDescripcion,
        "fcMetodo": values.fcMetodo,
        "fcPath": values.fcPath,
        "fiOrden": maxIdMethod(serviceEditInfo),
        "fcJsonSchema": values.fcJsonSchema,
        "fcGrafico": values.fcGrafico,
        "Headers": headersList,
        "Parametros": parametersList,
        "Respuestas": responsesList,
			}

			for(let i = 0; i < serviceEditInfo.Metodos.length; i++) {
				if(serviceEditInfo.Metodos[i].fcNombreMetodo === values.fcNombreMetodo && serviceEditInfo.Metodos[i].fcPath === values.fcPath && serviceEditInfo.Metodos[i].fcMetodo === values.fcMetodo) {
					bandera = true;
				}
			}

			if(values.fcNombreMetodo.includes(" ") || values.fcPath.includes(" ")) {
				handleClickDialogErrNoValido();
			} else if(bandera) {
				handleClickDialogErrYaExiste();
			} else {
				setOpenMFA(true);
				setDialogMFA(
					<VerificationCodeDialog
						handleCompleteParent={function handleComplete() {
							setMsjError(undefined);
							setSubmitting(false);
							setMethodInfoAdd(NewMethod, setStatus, setSubmitting);
							setDialogMFA(<></>);
						}}
						handleCloseParent={function handleCloses() {
							setDialogMFA(<></>);
						}}
					/>
				);
			}
			
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	function maxIdHeaders(headers) {
		let aux = 0;
		if(headers.length > 0) {
			aux = headers[0].fiIdHeader;
			for(let i = 1; i < headers.length; i++) {
				if(headers[i].fiIdHeader > aux) {
					aux = headers[i].fiIdHeader;
				}
			}
		}
		return aux + 1;
	}

	function maxIdParameters(parameters) {
		let aux = 0;
		if(parameters.length > 0) {
			aux = parameters[0].fiIdParametro;
			for(let i = 1; i < parameters.length; i++) {
				if(parameters[i].fiIdParametro > aux) {
					aux = parameters[i].fiIdParametro;
				}
			}
		}
		return aux + 1;
	}

	function maxIdResponses(responses) {
		let aux = 0;
		if(responses.length > 0) {
			aux = responses[0].fiIdRespuesta;
			for(let i = 1; i < responses.length; i++) {
				if(responses[i].fiIdRespuesta > aux) {
					aux = responses[i].fiIdRespuesta;
				}
			}
		}
		return aux + 1;
	}

	function maxIdMethod(servs) {
		let aux = 0;
		if(servs.Metodos.length > 0) {
			aux = servs.Metodos[0].fiIdMetodo;
			for(let i = 1; i < servs.Metodos.length; i++) {
				if(servs.Metodos[i].fiIdMetodo > aux) {
					aux = servs.Metodos[i].fiIdMetodo;
				}
			}
		}
		return aux + 1;
	}

	const formikAddHeader = useFormik({
		initialValues,
		validationSchema: SchemaAddHeader,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={function handleComplete() {
						setMsjError(undefined);
						setSubmitting(false);

						const comp = headersList.find((x) => x.fcHeader === values.fcHeader);
				
						if(values.fcHeader.includes(" ")) {
							handleClickDialogErrNoValido();
						} else if(comp !== undefined) {
							handleClickDialogErrYaExiste();
						} else {

							let temp = {};
							
							if(openMetodoAddInfo) {
								temp = {
									"fiIdHeader": maxIdHeaders(headersList),
									"fiIdServicio": serviceEditInfo.fiIdServicio,
									"fiIdMetodo": maxIdMethod(serviceEditInfo),
									"fcHeader": values.fcHeader,
									"fcValor": values.fcValorHeader,
									"fcEjemplo": values.fcEjemploHeader,
									"fcDescripcion": values.fcDescripcionHeader,
									"fiStatus": values.fiStatusHeader,
								}
							} else {
								temp = {
									"fiIdHeader": maxIdHeaders(headersList),
									"fiIdServicio": methodEditInfo.fiIdServicio,
									"fiIdMetodo": methodEditInfo.fiIdMetodo,
									"fcHeader": values.fcHeader,
									"fcValor": values.fcValorHeader,
									"fcEjemplo": values.fcEjemploHeader,
									"fcDescripcion": values.fcDescripcionHeader,
									"fiStatus": values.fiStatusHeader,
								}
							}
							
							setHeadersList([...headersList, temp]);
							handleCloseHeaderForm();
						}
						setDialogMFA(<></>);
					}}
					handleCloseParent={function handleCloses() {
						setDialogMFA(<></>);
					}}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const formikAddParameter = useFormik({
		initialValues,
		validationSchema: SchemaAddParameter,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={function handleComplete() {
						setMsjError(undefined);
						setSubmitting(false);

						const comp = parametersList.find((x) => x.fcNombre === values.fcNombreParameter);
				
						if(values.fcNombreParameter.includes(" ")) {
							handleClickDialogErrNoValido();
						} else if(comp !== undefined) {
							handleClickDialogErrYaExiste();
						} else {
							let temp = {};
							if(openMetodoAddInfo) {
								temp = {
									"fiIdParametro": maxIdParameters(parametersList),
									"fiIdServicio": serviceEditInfo.fiIdServicio,
									"fiIdMetodo": maxIdMethod(serviceEditInfo),
									"fcNombre": values.fcNombreParameter,
									"fcDescripcion": values.fcDescripcionParameter,
									"fcTipo": values.fcTipoParameter,
									"fcEjemplo": values.fcEjemploParameter,
								}
							} else {
								temp = {
									"fiIdParametro": maxIdParameters(parametersList),
									"fiIdServicio": methodEditInfo.fiIdServicio,
									"fiIdMetodo": methodEditInfo.fiIdMetodo,
									"fcNombre": values.fcNombreParameter,
									"fcDescripcion": values.fcDescripcionParameter,
									"fcTipo": values.fcTipoParameter,
									"fcEjemplo": values.fcEjemploParameter,
								}
							}
							setParametersList([...parametersList, temp]);
							handleCloseParameterForm();
						}
						setDialogMFA(<></>);
					}}
					handleCloseParent={function handleCloses() {
						setDialogMFA(<></>);
					}}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const formikAddResponse = useFormik({
		initialValues,
		validationSchema: SchemaAddResponse,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={function handleComplete() {
						setMsjError(undefined);
						setSubmitting(false);

						const comp = responsesList.find((x) => x.fcCodigo === values.fcCodigoResponse);
				
						if(values.fcCodigoResponse.includes(" ")) {
							handleClickDialogErrNoValido();
						} else if(comp !== undefined) {
							handleClickDialogErrYaExiste();
						} else {
							let temp = {};
							if(openMetodoAddInfo) {
								temp = {
									"fiIdRespuesta": maxIdResponses(responsesList),
									"fiIdServicio": serviceEditInfo.fiIdServicio,
									"fiIdMetodo": maxIdMethod(serviceEditInfo),
									"fcCodigo": values.fcCodigoResponse,
									"fcDescripcion": values.fcDescripcionResponse,
									"fcEjemplo": values.fcEjemploResponse,
									"fiStatus": values.fiStatusResponse,
								}
							} else {
								temp = {
									"fiIdRespuesta": maxIdResponses(responsesList),
									"fiIdServicio": methodEditInfo.fiIdServicio,
									"fiIdMetodo": methodEditInfo.fiIdMetodo,
									"fcCodigo": values.fcCodigoResponse,
									"fcDescripcion": values.fcDescripcionResponse,
									"fcEjemplo": values.fcEjemploResponse,
									"fiStatus": values.fiStatusResponse,
								}
							}
							setResponsesList([...responsesList, temp]);
							handleCloseResponseForm();
						}
						setDialogMFA(<></>);
					}}
					handleCloseParent={function handleCloses() {
						setDialogMFA(<></>);
					}}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const handleClickListHeaders = () => {
    setOpenHeadersItemList(!openHeadersItemList);
  };

	const handleClickListParameters = () => {
    setOpenParametersItemList(!openParametersItemList);
  };

	const handleClickListResponses = () => {
    setOpenResponsesItemList(!openResponsesItemList);
  };

	const handleClickAddHeader = () => {
		formikAddHeader.values.fcHeader = "";
		formikAddHeader.values.fcValorHeader = "";
		formikAddHeader.values.fcEjemploHeader = "";
		formikAddHeader.values.fcDescripcionHeader = "";
		formikAddHeader.values.fiStatusHeader = true;
    setOpenAddHeaderForm(true);
  };

	const handleClickAddParameter = () => {
		formikAddParameter.values.fcNombreParameter = "";
		formikAddParameter.values.fcDescripcionParameter = "";
		formikAddParameter.values.fcTipoParameter = "";
		formikAddParameter.values.fcEjemploParameter = "";
		formikAddParameter.values.fiStatusParameter = true;
    setOpenAddParameterForm(true);
  };

	const handleClickAddResponse = () => {
		formikAddResponse.values.fcCodigoResponse = "";
		formikAddResponse.values.fcDescripcionResponse = "";
		formikAddResponse.values.fcEjemploResponse = "";
		formikAddResponse.values.fiStatusResponse = true;
    setOpenAddResponseForm(true);
  };

	const deleteHeader = (indexItem) => {
		setOpenMFA(true);
		setDialogMFA(
			<VerificationCodeDialog
				handleCompleteParent={
					function handleComplete() {
						setHeadersList((prevState) => prevState.filter((second, index) => index !== indexItem));
					}
				}
				handleCloseParent={
					function handleCloses(){
						setDialogMFA(<></>);
					}
				}
			/>
		);
	};

	const deleteParameter = (indexItem) => {
		setOpenMFA(true);
		setDialogMFA(
			<VerificationCodeDialog
				handleCompleteParent={
					function handleComplete() {
						setParametersList((prevState) => prevState.filter((second, index) => index !== indexItem));
					}
				}
				handleCloseParent={
					function handleCloses(){
						setDialogMFA(<></>);
					}
				}
			/>
		);
	};

	const deleteResponse = (indexItem) => {
		setOpenMFA(true);
		setDialogMFA(
			<VerificationCodeDialog
				handleCompleteParent={
					function handleComplete() {
						setResponsesList((prevState) => prevState.filter((second, index) => index !== indexItem));
					}
				}
				handleCloseParent={
					function handleCloses(){
						setDialogMFA(<></>);
					}
				}
			/>
		);
	};

	return (
		<>
			<div className={classes2.root}>
				<Snackbar open={openDialog} autoHideDuration={3000} onClose={handleCloseDialog}>
					<Alert onClose={handleCloseDialog} severity="success">
						Tarea completada con éxito
					</Alert>
				</Snackbar>
				<Snackbar open={openDialogErr} autoHideDuration={3000} onClose={handleCloseDialogErr}>
					<Alert onClose={handleCloseDialogErr} severity="error">
						Tarea no pudo ser completada con éxito
					</Alert>
				</Snackbar>
				<Snackbar open={openDialogErrArq} autoHideDuration={3000} onClose={handleCloseDialogErrArq}>
					<Alert onClose={handleCloseDialogErrArq} severity="error">
						Este departamento no cuenta con arquitecturas disponibles.
					</Alert>
				</Snackbar>
				<Snackbar open={openDialogYaEx} autoHideDuration={3000} onClose={handleCloseDialogYaEx}>
					<Alert onClose={handleCloseDialogYaEx} severity="error">
						Ya existente.
					</Alert>
				</Snackbar>
				<Snackbar open={openDialogErrNoValido} autoHideDuration={3000} onClose={handleCloseDialogErrNoValido}>
					<Alert onClose={handleCloseDialogErrNoValido} severity="error">
						Datos inválidos.
					</Alert>
				</Snackbar>
				<Snackbar open={openDialogErrYaExiste} autoHideDuration={3000} onClose={handleCloseDialogErrYaExiste}>
					<Alert onClose={handleCloseDialogErrYaExiste} severity="error">
						Ya existente
					</Alert>
				</Snackbar>
			</div>
			<Notice icon="flaticon-home font-primary">
				<span>
					<FormattedMessage id="APP.NOTICES.CONTRACTS" />
				</span>
			</Notice>
			<form className="card card-custom" onSubmit={formik.handleSubmit}>
				{loading && <ModalProgressBar />}
				<div className="card-header border-0">
					<h3 className="card-title font-weight-bolder text-dark">
						<FormattedMessage id="GLOBAL.WORD.CONTRACTS" />
					</h3>
					<div className="card-toolbar">
						{/*Solo si hay botones de acción */}
						<div onClick={addSrv}>
							<Fab size="small" color="primary" aria-label="Add" className={classes.fab}>
								<AddIcon />
							</Fab>
						</div>
						<div onClick={editService}>
							<Fab id="editBtnService" color="secondary" disabled size="small" className={classes.fab}>
								<EditIcon />
							</Fab>
						</div>
						<button id="btnFind" type="submit" className="btn btn-sm btn-success mr-2" disabled={formik.isSubmitting || (formik.touched && !formik.isValid)}>
							<FormattedMessage id="APP.BUTTON.FIND" />
							{formik.isSubmitting}
						</button>
					</div>
				</div>
				<div className="card-body pt-2">
					{/* begin::Alert */}
					{isError && (
						<div className="alert alert-custom alert-light-danger fade show mb-10" role="alert">
							<div className="alert-icon">
								<span className="svg-icon svg-icon-3x svg-icon-danger">
									<SVG src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}></SVG>{" "}
								</span>
							</div>
							<div className="alert-text font-weight-bold">
								<FormattedMessage id={msjError} />
							</div>
							<div className="alert-close" onClick={() => {}}>
								<button type="button" className="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">
										<i className="ki ki-close"></i>
									</span>
								</button>
							</div>
						</div>
					)}
					{/* end::Alert */}

					{/* begin::results */}
					<div className="form-group row">{!isError && services !== undefined && <ServicesTable key={table.name} data={table} getDetailService={getDetailService} />}</div>
					{/* end::results */}
				</div>
			</form>
			{service !== undefined && methods !== undefined && openMethods && (
				<Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={openMethods} onClose={handleCloseMethods} aria-labelledby="max-width-dialog-title">
					<DialogTitle id="max-width-dialog-title">
						<FormattedMessage id="GLOBAL.WORD.INTERFACE.AGREEMENT" /> - [{service.fcNombre}]
					</DialogTitle>
					<DialogContent>
						<DialogContentText>{service.fcDescripcion}</DialogContentText>
						<strong>
							{service.fiIdServicio}.- <FormattedMessage id="GLOBAL.WORD.GENERAL.INFORMATION" />
						</strong>

						{/* begin::results */}
						<div className="form-group row">{!isError && services !== undefined && methods !== undefined && <ServicesTable key={tableURL.name} data={tableURL} />}</div>
						{/* end::results */}
						<p>
							<strong>
								{service.fiIdServicio}.1.- <FormattedMessage id="GLOBAL.WORD.LIST.AVAILABLE.METHODS" />
							</strong>
						</p>
						{/* begin::results */}
						<div className="form-group row">
							{!isError && services !== undefined && methods !== undefined && <ServicesTable key={tableMethods.name} data={tableMethods} getDetailService={getDetailMethod} />}
						</div>
						{/* end::results */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseMethods} color="primary">
							<FormattedMessage id="GLOBAL.WORD.CLOSE" />
						</Button>
					</DialogActions>
				</Dialog>
			)}
			{service !== undefined &&
				method !== undefined &&
				openMethod &&
				methodDetail !== undefined &&
				tableURLMethod !== undefined &&
				tableHeaders !== undefined &&
				tableParams !== undefined &&
				tableResponse !== undefined &&
				tableJsonSchema !== undefined &&
				tableGraphic !== undefined && (
					<Dialog fullWidth={fullWidth} maxWidth={maxWidthLG} open={openMethod} onClose={handleCloseMethod} aria-labelledby="max-width-dialog-title">
						<DialogTitle id="max-width-dialog-title">
							<FormattedMessage id="GLOBAL.WORD.INTERFACE.AGREEMENT" />- [{service.fcNombre}] - [{method.fcNombreMetodo}]
						</DialogTitle>
						<DialogContent>
							<DialogContentText>{method.fcDescripcion}</DialogContentText>
							<strong>
								{service.fiIdServicio}.{method.fiIdMetodo}.- <FormattedMessage id="GLOBAL.WORD.GENERAL.INFORMATION" />
							</strong>
							{/* begin::results */}
							<div className="form-group row">{tableURLMethod !== undefined && <ServicesTable key={tableURLMethod.name} data={tableURLMethod} />}</div>
							{/* end::results */}
							<strong>
								{service.fiIdServicio}.{method.fiIdMetodo}.1.- <FormattedMessage id="GLOBAL.WORD.REQUIRED.HEADERS" />
							</strong>
							{/* begin::results */}
							<div className="form-group row">{tableHeaders !== undefined && <ServicesTable key={tableHeaders.name} data={tableHeaders} />}</div>
							{/* end::results */}
							<strong>
								{service.fiIdServicio}.{method.fiIdMetodo}.2.- <FormattedMessage id="GLOBAL.WORD.INPUT.PARAMETERS" />
							</strong>
							{/* begin::results */}
							<div className="form-group row">{tableParams !== undefined && <ServicesTable key={tableParams.name} data={tableParams} />}</div>
							<p>
								<strong>
									* <FormattedMessage id="GLOBAL.WORD.OPTIONAL.PARAMETERS" />
								</strong>
							</p>
							<p>
								<strong>
									~ <FormattedMessage id="GLOBAL.WORD.DESCRIPTION.PARAMETER.REQUEST" />
								</strong>
							</p>
							{/* end::results */}
							<strong>
								{service.fiIdServicio}.{method.fiIdMetodo}.3.- <FormattedMessage id="GLOBAL.WORD.OUTPUT.PARAMETERS" />
							</strong>
							{/* begin::results */}
							<div className="form-group row">{tableResponse !== undefined && <ServicesTable key={tableResponse.name} data={tableResponse} />}</div>
							<p>
								<strong>
									~ <FormattedMessage id="GLOBAL.WORD.DESCRIPTION.PARAMETER.RESPONSE" />
								</strong>
							</p>
							{/* end::results */}
							<strong>
								{service.fiIdServicio}.{method.fiIdMetodo}.4.- <FormattedMessage id="GLOBAL.WORD.JSONSCHEMA.VALIDATOR" />
							</strong>
							{/* begin::results */}
							<div className="form-group row">{tableJsonSchema !== undefined && <ServicesTable key={tableJsonSchema.name} data={tableJsonSchema} />}</div>
							<p>
								<strong>
									<FormattedMessage id="GLOBAL.WORD.JSONSCHEMA.GENERATED" />
								</strong>
							</p>
							<p>
								<strong>
									<FormattedMessage id="GLOBAL.WORD.JSONSCHEMA.VALIDATED" />
								</strong>
							</p>
							{/* end::results */}
							<strong>
								{service.fiIdServicio}.{method.fiIdMetodo}.5.- <FormattedMessage id="GLOBAL.WORD.JSONSCHEMA.CHART" />
							</strong>
							{/* begin::results */}
							<div className="form-group row">{tableGraphic !== undefined && <ServicesTable key={tableGraphic.name} data={tableGraphic} />}</div>
							{/* end::results */}
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseMethod} color="primary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</Dialog>
				)}
			{openMFA && dialogMFA}
			{serviceEditInfo !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={"lg"} open={openServiceEditForm} onClose={handleCloseServiceEditForm} aria-labelledby="max-width-dialog-title">
					<DialogContent>
						<DialogTitle id="max-width-dialog-title">
							<Grid container spacing={1}>
								<Grid item xs={10}>
									<FormattedMessage id="GLOBAL.WORD.INTERFACE.AGREEMENT" /> - [{serviceEditInfo.fcNombre}]
								</Grid>
								<Grid item xs={2}>
									<Button variant="contained" onClick={() => handleOnClickEditInfoService(serviceEditInfo._id)} color="secondary" className={classes.button}>
										<Icon>edit_icon</Icon>
										<Typography>Editar</Typography>
									</Button>
								</Grid>
							</Grid>
						</DialogTitle>
						<DialogContentText>{serviceEditInfo.fcDescripcion}</DialogContentText>
						<strong>
							{serviceEditInfo.fiIdServicio}.- <FormattedMessage id="GLOBAL.WORD.GENERAL.INFORMATION" />
						</strong>
						{/* begin::results */}
						<div className="form-group row">{tableGeneralInfoServiceEdit !== undefined && <ServicesTable key={tableGeneralInfoServiceEdit.name} data={tableGeneralInfoServiceEdit} />}</div>
						{/* end::results */}
						<Grid container spacing={0}>
							<Grid item xs={11}>
								<strong>
									{serviceEditInfo.fiIdServicio}.1.- <FormattedMessage id="GLOBAL.WORD.LIST.AVAILABLE.METHODS" />
								</strong>
							</Grid>
							<Grid item xs={1}>
								<Grid container spacing={0}>
									<Grid item xs={12}>
										{/*Solo si hay botones de acción */}
										<div onClick={addMtd}>
											<Fab size="small" color="primary" aria-label="Add" className={classes.fab}>
												<AddIcon />
											</Fab>
										</div>
									</Grid> 
								</Grid>
							</Grid>
						</Grid>
						{/* begin::results */}
						
						<div className="form-group row">
							{!isError && tableMetodosEdit !== undefined && 
								<ServicesTable key={tableMetodosEdit.name} data={tableMetodosEdit} getDetailService={getMethodEditInfo} />
							}
						</div>
						{/* end::results */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseServiceEditForm} color="primary">
							<FormattedMessage id="GLOBAL.WORD.CLOSE" />
						</Button>
					</DialogActions>
				</Dialog>
			)}
			{arquitecturas !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={"lg"} open={openServiceAddForm} onClose={handleCloseServiceAddForm} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikAddService.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.NEW_CONTRACT" />
									</DialogTitle>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												<FormattedMessage id="GLOBAL.WORD.ARCHITECTURE" />
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fiIdArquitecturaLabel">fiIdArquitectura</InputLabel>
												<Select
													labelId="fiIdArquitecturaLabel"
													name="fiIdArquitectura"
													label="fiIdArquitectura"
													className={getInputClassesAddService("fiIdArquitectura")}
													{...formikAddService.getFieldProps("fiIdArquitectura")}
												>
													{arquitecturas.map((arq) => {
														return (
															<MenuItem key={uuidv4()} value={arq.fiIdArquitectura}>
																{arq.fcArquitectura}
															</MenuItem>
														);
													})}
												</Select>
												{formikAddService.touched.fiIdArquitectura && formikAddService.errors.fiIdArquitectura ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fiIdArquitectura}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												General
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcNombre"
												name="fcNombre"
												className={classes.textField + " " + getInputClassesAddService("fcNombre")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcNombre")}
											/>
											{formikAddService.touched.fcNombre && formikAddService.errors.fcNombre ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcNombre}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fiStatusLabel">fiStatus</InputLabel>
												<Select labelId="fiStatusLabel" name="fiStatus" label="fiStatus" className={getInputClassesAddService("fiStatus")} {...formikAddService.getFieldProps("fiStatus")}>
													<MenuItem value="false">Inactivo</MenuItem>
													<MenuItem value="true">Activo</MenuItem>
												</Select>
												{formikAddService.touched.fiStatus && formikAddService.errors.fiStatus ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fiStatus}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fcFolioCertificacion"
												name="fcFolioCertificacion"
												className={classes.textField + " " + getInputClassesAddService("fcFolioCertificacion")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcFolioCertificacion")}
											/>
											{formikAddService.touched.fcFolioCertificacion && formikAddService.errors.fcFolioCertificacion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcFolioCertificacion}</div>
											) : null}
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fdFecCertificacion"
												name="fdFecCertificacion"
												className={classes.textField + " " + getInputClassesAddService("fdFecCertificacion")}
												margin="normal"
												variant="outlined"
												type="datetime-local"
												InputLabelProps={{
													shrink: true,
												}}
												{...formikAddService.getFieldProps("fdFecCertificacion")}
											/>
											{formikAddService.touched.fdFecCertificacion && formikAddService.errors.fdFecCertificacion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fdFecCertificacion}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												name="fcDescripcion"
												label="Descripción"
												className={classes.textField + " " + getInputClassesAddService("fcDescripcion")}
												margin="normal"
												variant="outlined"
												multiline
												rows="4"
												{...formikAddService.getFieldProps("fcDescripcion")}
											/>
											{formikAddService.touched.fcDescripcion && formikAddService.errors.fcDescripcion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcDescripcion}</div>
											) : null}
										</Grid>

										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												URL's
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcContextPath"
												name="fcContextPath"
												className={classes.textField + " " + getInputClassesAddService("fcContextPath")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcContextPath")}
											/>
											{formikAddService.touched.fcContextPath && formikAddService.errors.fcContextPath ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcContextPath}</div>
											) : null}
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcActuador"
												name="fcActuador"
												className={classes.textField + " " + getInputClassesAddService("fcActuador")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcActuador")}
											/>
											{formikAddService.touched.fcActuador && formikAddService.errors.fcActuador ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcActuador}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="fcSwaggerDoc"
												name="fcSwaggerDoc"
												className={classes.textField + " " + getInputClassesAddService("fcSwaggerDoc")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcSwaggerDoc")}
											/>
											{formikAddService.touched.fcSwaggerDoc && formikAddService.errors.fcSwaggerDoc ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcSwaggerDoc}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloDevLabel">fcProtocoloDev</InputLabel>
												<Select labelId="fcProtocoloDevLabel" name="fcProtocoloDev" label="fcProtocoloDev" className={getInputClassesAddService("fiStatus")} {...formikAddService.getFieldProps("fcProtocoloDev")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikAddService.touched.fcProtocoloDev && formikAddService.errors.fcProtocoloDev ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcProtocoloDev}</div>
												) : null}
											</FormControl>
										</Grid>

										<Grid item xs={10}>
											<TextField
												label="fcHostDev"
												name="fcHostDev"
												className={classes.textField + " " + getInputClassesAddService("fcHostDev")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcHostDev")}
											/>
											{formikAddService.touched.fcHostDev && formikAddService.errors.fcHostDev ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcHostDev}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloProdLabel">fcProtocoloProd</InputLabel>
												<Select labelId="fcProtocoloProdLabel" name="fcProtocoloProd" label="fcProtocoloProd" className={getInputClassesAddService("fiStatus")} {...formikAddService.getFieldProps("fcProtocoloProd")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikAddService.touched.fcProtocoloProd && formikAddService.errors.fcProtocoloProd ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcProtocoloProd}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostProd"
												name="fcHostProd"
												className={classes.textField + " " + getInputClassesAddService("fcHostProd")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcHostProd")}
											/>
											{formikAddService.touched.fcHostProd && formikAddService.errors.fcHostProd ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcHostProd}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloDevCNBVLabel">fcProtocoloDevCNBV</InputLabel>
												<Select labelId="fcProtocoloDevCNBVLabel" name="fcProtocoloDevCNBV" label="fcProtocoloDevCNBV" className={getInputClassesAddService("fiStatus")} {...formikAddService.getFieldProps("fcProtocoloDevCNBV")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikAddService.touched.fcProtocoloDevCNBV && formikAddService.errors.fcProtocoloDevCNBV ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcProtocoloDevCNBV}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostDevCNBV"
												name="fcHostDevCNBV"
												className={classes.textField + " " + getInputClassesAddService("fcHostDevCNBV")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcHostDevCNBV")}
											/>
											{formikAddService.touched.fcHostDevCNBV && formikAddService.errors.fcHostDevCNBV ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcHostDevCNBV}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloIntCNBVLabel">fcProtocoloIntCNBV</InputLabel>
												<Select labelId="fcProtocoloIntCNBVLabel" name="fcProtocoloIntCNBV" label="fcProtocoloIntCNBV" className={getInputClassesAddService("fiStatus")} {...formikAddService.getFieldProps("fcProtocoloIntCNBV")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikAddService.touched.fcProtocoloIntCNBV && formikAddService.errors.fcProtocoloIntCNBV ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcProtocoloIntCNBV}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostIntCNBV"
												name="fcHostIntCNBV"
												className={classes.textField + " " + getInputClassesAddService("fcHostIntCNBV")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcHostIntCNBV")}
											/>
											{formikAddService.touched.fcHostIntCNBV && formikAddService.errors.fcHostIntCNBV ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcHostIntCNBV}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloQACNBVLabel">fcProtocoloQACNBV</InputLabel>
												<Select labelId="fcProtocoloQACNBVLabel" name="fcProtocoloQACNBV" label="fcProtocoloQACNBV" className={getInputClassesAddService("fiStatus")} {...formikAddService.getFieldProps("fcProtocoloQACNBV")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikAddService.touched.fcProtocoloQACNBV && formikAddService.errors.fcProtocoloQACNBV ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikAddService.errors.fcProtocoloQACNBV}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostQACNBV"
												name="fcHostQACNBV"
												className={classes.textField + " " + getInputClassesAddService("fcHostQACNBV")}
												margin="normal"
												variant="outlined"
												{...formikAddService.getFieldProps("fcHostQACNBV")}
											/>
											{formikAddService.touched.fcHostQACNBV && formikAddService.errors.fcHostQACNBV ? (
												<div className={"invalid-feedback " + classes.fcHostQACNBV}>{formikAddService.errors.fcHostQACNBV}</div>
											) : null}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button type="submit" className="btn btn-success mr-2" disabled={(formikAddService.touched && !formikAddService.isValid)}>
								<FormattedMessage id="GLOBAL.WORD.SAVE" />
								{formikAddService.isSubmitting}
							</button>
							<Button onClick={handleCloseServiceAddForm} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{serviceEditInfo !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={"lg"} open={openServiceEditInfo} onClose={handleCloseServiceEditInfo} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikEditService.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.CONTRACT.EDITION" /> - [{serviceEditInfo.fcNombre}]
									</DialogTitle>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												General
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcNombre"
												name="fcNombre"
												className={classes.textField + " " + getInputClassesEditService("fcNombre")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcNombre")}
											/>
											{formikEditService.touched.fcNombre && formikEditService.errors.fcNombre ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcNombre}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fiStatusLabel">fiStatus</InputLabel>
												<Select labelId="fiStatusLabel" name="fiStatus" label="fiStatus" className={getInputClassesEditService("fiStatus")} {...formikEditService.getFieldProps("fiStatus")}>
													<MenuItem value="false">Inactivo</MenuItem>
													<MenuItem value="true">Activo</MenuItem>
												</Select>
												{formikEditService.touched.fiStatus && formikEditService.errors.fiStatus ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fiStatus}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fcFolioCertificacion"
												name="fcFolioCertificacion"
												className={classes.textField + " " + getInputClassesEditService("fcFolioCertificacion")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcFolioCertificacion")}
											/>
											{formikEditService.touched.fcFolioCertificacion && formikEditService.errors.fcFolioCertificacion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcFolioCertificacion}</div>
											) : null}
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fdFecCertificacion"
												name="fdFecCertificacion"
												className={classes.textField + " " + getInputClassesEditService("fdFecCertificacion")}
												margin="normal"
												variant="outlined"
												type="datetime-local"
												InputLabelProps={{
													shrink: true,
												}}
												{...formikEditService.getFieldProps("fdFecCertificacion")}
											/>
											{formikEditService.touched.fdFecCertificacion && formikEditService.errors.fdFecCertificacion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fdFecCertificacion}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												name="fcDescripcion"
												label="Descripción"
												className={classes.textField + " " + getInputClassesEditService("fcDescripcion")}
												margin="normal"
												variant="outlined"
												multiline
												rows="4"
												{...formikEditService.getFieldProps("fcDescripcion")}
											/>
											{formikEditService.touched.fcDescripcion && formikEditService.errors.fcDescripcion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcDescripcion}</div>
											) : null}
										</Grid>

										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												URL's
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcContextPath"
												name="fcContextPath"
												className={classes.textField + " " + getInputClassesEditService("fcContextPath")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcContextPath")}
											/>
											{formikEditService.touched.fcContextPath && formikEditService.errors.fcContextPath ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcContextPath}</div>
											) : null}
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcActuador"
												name="fcActuador"
												className={classes.textField + " " + getInputClassesEditService("fcActuador")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcActuador")}
											/>
											{formikEditService.touched.fcActuador && formikEditService.errors.fcActuador ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcActuador}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="fcSwaggerDoc"
												name="fcSwaggerDoc"
												className={classes.textField + " " + getInputClassesEditService("fcSwaggerDoc")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcSwaggerDoc")}
											/>
											{formikEditService.touched.fcSwaggerDoc && formikEditService.errors.fcSwaggerDoc ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcSwaggerDoc}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloDevLabel">fcProtocoloDev</InputLabel>
												<Select labelId="fcProtocoloDevLabel" name="fcProtocoloDev" label="fcProtocoloDev" className={getInputClassesAddService("fiStatus")} {...formikEditService.getFieldProps("fcProtocoloDev")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikEditService.touched.fcProtocoloDev && formikEditService.errors.fcProtocoloDev ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcProtocoloDev}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostDev"
												name="fcHostDev"
												className={classes.textField + " " + getInputClassesEditService("fcHostDev")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcHostDev")}
											/>
											{formikEditService.touched.fcHostDev && formikEditService.errors.fcHostDev ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcHostDev}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloProdLabel">fcProtocoloProd</InputLabel>
												<Select labelId="fcProtocoloProdLabel" name="fcProtocoloProd" label="fcProtocoloProd" className={getInputClassesAddService("fiStatus")} {...formikEditService.getFieldProps("fcProtocoloProd")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikEditService.touched.fcProtocoloProd && formikEditService.errors.fcProtocoloProd ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcProtocoloProd}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostProd"
												name="fcHostProd"
												className={classes.textField + " " + getInputClassesEditService("fcHostProd")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcHostProd")}
											/>
											{formikEditService.touched.fcHostProd && formikEditService.errors.fcHostProd ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcHostProd}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloDevCNBVLabel">fcProtocoloDevCNBV</InputLabel>
												<Select labelId="fcProtocoloDevCNBVLabel" name="fcProtocoloDevCNBV" label="fcProtocoloDevCNBV" className={getInputClassesAddService("fiStatus")} {...formikEditService.getFieldProps("fcProtocoloDevCNBV")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikEditService.touched.fcProtocoloDevCNBV && formikEditService.errors.fcProtocoloDevCNBV ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcProtocoloDevCNBV}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostDevCNBV"
												name="fcHostDevCNBV"
												className={classes.textField + " " + getInputClassesEditService("fcHostDevCNBV")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcHostDevCNBV")}
											/>
											{formikEditService.touched.fcHostDevCNBV && formikEditService.errors.fcHostDevCNBV ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcHostDevCNBV}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloIntCNBVLabel">fcProtocoloIntCNBV</InputLabel>
												<Select labelId="fcProtocoloIntCNBVLabel" name="fcProtocoloIntCNBV" label="fcProtocoloIntCNBV" className={getInputClassesAddService("fiStatus")} {...formikEditService.getFieldProps("fcProtocoloIntCNBV")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikEditService.touched.fcProtocoloIntCNBV && formikEditService.errors.fcProtocoloIntCNBV ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcProtocoloIntCNBV}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostIntCNBV"
												name="fcHostIntCNBV"
												className={classes.textField + " " + getInputClassesEditService("fcHostIntCNBV")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcHostIntCNBV")}
											/>
											{formikEditService.touched.fcHostIntCNBV && formikEditService.errors.fcHostIntCNBV ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcHostIntCNBV}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcProtocoloQACNBVLabel">fcProtocoloQACNBV</InputLabel>
												<Select labelId="fcProtocoloQACNBVLabel" name="fcProtocoloQACNBV" label="fcProtocoloQACNBV" className={getInputClassesAddService("fiStatus")} {...formikEditService.getFieldProps("fcProtocoloQACNBV")}>
													<MenuItem value="http">http</MenuItem>
													<MenuItem value="https">https</MenuItem>
												</Select>
												{formikEditService.touched.fcProtocoloQACNBV && formikEditService.errors.fcProtocoloQACNBV ? (
													<div className={"invalid-feedback " + classes.requiredText}>{formikEditService.errors.fcProtocoloQACNBV}</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={10}>
											<TextField
												label="fcHostQACNBV"
												name="fcHostQACNBV"
												className={classes.textField + " " + getInputClassesEditService("fcHostQACNBV")}
												margin="normal"
												variant="outlined"
												{...formikEditService.getFieldProps("fcHostQACNBV")}
											/>
											{formikEditService.touched.fcHostQACNBV && formikEditService.errors.fcHostQACNBV ? (
												<div className={"invalid-feedback " + classes.fcHostQACNBV}>{formikEditService.errors.fcHostQACNBV}</div>
											) : null}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button type="submit" className="btn btn-success mr-2" disabled={(formikEditService.touched && !formikEditService.isValid)}>
								<FormattedMessage id="GLOBAL.WORD.SAVE" />
								{formikEditService.isSubmitting}
							</button>
							<Button onClick={handleCloseServiceEditInfo} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{serviceEditInfo !== undefined && openMetodoAddInfo && (
				<Dialog fullWidth={fullWidth} maxWidth={"lg"} open={openMetodoAddInfo} onClose={handleCloseMetodoAddInfo} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikAddMethod.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.METHOD.EDITION" />
									</DialogTitle>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												General
											</Typography>
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fcNombreMetodo"
												name="fcNombreMetodo"
												className={classes.textField + " " + getInputClassesEditMethod("fcNombreMetodo")}
												margin="normal"
												variant="outlined"
												{...formikAddMethod.getFieldProps("fcNombreMetodo")}
											/>
											{formikAddMethod.touched.fcNombreMetodo && formikAddMethod.errors.fcNombreMetodo ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddMethod.errors.fcNombreMetodo}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcMetodoLabel">fcMetodo</InputLabel>
												<Select labelId="fcMetodoLabel" name="fcMetodo" label="fcMetodo" className={getInputClassesEditMethod("fcMetodo")} {...formikAddMethod.getFieldProps("fcMetodo")}>
													<MenuItem value="GET">GET</MenuItem>
													<MenuItem value="POST">POST</MenuItem>
													<MenuItem value="PUT">PUT</MenuItem>
													<MenuItem value="DELETE">DELETE</MenuItem>
													<MenuItem value="PATCH">PATCH</MenuItem>
													<MenuItem value="OPTIONS">OPTIONS</MenuItem>
													<MenuItem value="TRACE">TRACE</MenuItem>
													<MenuItem value="CONNECT">CONNECT</MenuItem>
													<MenuItem value="HEAD">HEAD</MenuItem>
												</Select>
												{formikAddMethod.touched.fcMetodo && formikAddMethod.errors.fcMetodo ? (
													<div className={"invalid-feedback " + classes.requiredText}>
														{formikAddMethod.errors.fcMetodo}
													</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcPath"
												name="fcPath"
												className={classes.textField + " " + getInputClassesEditMethod("fcPath")}
												margin="normal"
												variant="outlined"
												{...formikAddMethod.getFieldProps("fcPath")}
											/>
											{formikAddMethod.touched.fcPath && formikAddMethod.errors.fcPath ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddMethod.errors.fcPath}</div>
											) : null}
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fcJsonSchema"
												name="fcJsonSchema"
												className={classes.textField + " " + getInputClassesEditMethod("fcJsonSchema")}
												margin="normal"
												variant="outlined"
												{...formikAddMethod.getFieldProps("fcJsonSchema")}
											/>
											{formikAddMethod.touched.fcJsonSchema && formikAddMethod.errors.fcJsonSchema ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddMethod.errors.fcJsonSchema}</div>
											) : null}
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcGrafico (base64)"
												name="fcGrafico"
												multiline
												rows="6"
												className={classes.textField + " " + getInputClassesEditMethod("fcGrafico")}
												margin="normal"
												variant="outlined"
												{...formikAddMethod.getFieldProps("fcGrafico")}
											/>
											{formikAddMethod.touched.fcGrafico && formikAddMethod.errors.fcGrafico ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddMethod.errors.fcGrafico}</div>
											) : null}
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcDescripcion"
												name="fcDescripcion"
												multiline
												rows="6"
												className={classes.textField + " " + getInputClassesEditMethod("fcDescripcion")}
												margin="normal"
												variant="outlined"
												{...formikAddMethod.getFieldProps("fcDescripcion")}
											/>
											{formikAddMethod.touched.fcDescripcion && formikAddMethod.errors.fcDescripcion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddMethod.errors.fcDescripcion}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Grid container spacing={0}>
												<Grid item xs={11}>
													<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
														<FormattedMessage id="GLOBAL.WORD.HEADERS" />
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<div onClick={handleClickAddHeader}>
														<Fab size="small" color="primary" aria-label="Add" className={classes.fab2}>
															<AddIcon onClick={handleClickAddHeader} />
														</Fab>
													</div>
												</Grid>
												<Grid item xs={12}>
													<div className={classes.demo}>
														<List>
															<ListItem button onClick={handleClickListHeaders}>
																<Grid container spacing={1} className={classes.root_grid}>
																	<Grid item xs={2}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcHeader
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcValor
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={3}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcEjemplo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={1}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fiStatus
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcDescripcion
																			</Typography>}
																		/>
																	</Grid>
																</Grid>
																{openHeadersItemList ? <ExpandLess className={classes.action} /> : <ExpandMore className={classes.action} />}
															</ListItem>
															<Collapse in={openHeadersItemList} timeout="auto" unmountOnExit>
																{headersList.map((value, index) => {
																	return (
																		<ListItem key={uuidv4()}>
																			<Grid container spacing={1} className={classes.root_grid_sec}>
																				<Grid item xs={2}>
																					<ListItemText primary={"" + value.fcHeader}/>
																				</Grid>
																				<Grid item xs={2}>
																					<ListItemText primary={"" + value.fcValor}/>
																				</Grid>
																				<Grid item xs={3}>
																					<ListItemText primary={"" + value.fcEjemplo}/>
																				</Grid>
																				<Grid item xs={1}>
																					<ListItemText primary={"" + value.fiStatus}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcDescripcion}/>
																				</Grid>
																			</Grid>
																			<img
																				src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
																				alt=""
																				className={classes.action}
																				onClick={() => deleteHeader(index)}>
																			</img>
																		</ListItem>
																	);
																})}
															</Collapse>
														</List>
													</div>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Grid container spacing={0}>
												<Grid item xs={11}>
													<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
													<FormattedMessage id="GLOBAL.WORD.PARAMETERS" />
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<div onClick={handleClickAddParameter}>
														<Fab size="small" color="primary" aria-label="Add" className={classes.fab2}>
															<AddIcon onClick={handleClickAddParameter} />
														</Fab>
													</div>
												</Grid>
												<Grid item xs={12}>
													<div className={classes.demo}>
														<List>
															<ListItem button onClick={handleClickListParameters}>
																<Grid container spacing={1} className={classes.root_grid}>
																	<Grid item xs={3}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcNombre
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={1}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fiStatus
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcEjemplo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcDescripcion
																			</Typography>}
																		/>
																	</Grid>
																</Grid>
																{openParametersItemList ? <ExpandLess className={classes.action} /> : <ExpandMore className={classes.action} />}
															</ListItem>	
															<Collapse in={openParametersItemList} timeout="auto" unmountOnExit>
																{parametersList.map((value, index) => {
																	return (
																		<ListItem key={uuidv4()}>
																			<Grid container spacing={1} className={classes.root_grid_sec}>
																				<Grid item xs={3}>
																					<ListItemText primary={"" + value.fcNombre}/>
																				</Grid>
																				<Grid item xs={1}>
																					<ListItemText primary={"" + value.fcTipo}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcEjemplo}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcDescripcion}/>
																				</Grid>
																			</Grid>
																			<img
																				src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
																				alt=""
																				className={classes.action}
																				onClick={() => deleteParameter(index)}>
																			</img>
																		</ListItem>
																	);
																})}
															</Collapse>
														</List>
													</div>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Grid container spacing={0}>
												<Grid item xs={11}>
													<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
														<FormattedMessage id="GLOBAL.WORD.RESPONSES" />
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<div onClick={handleClickAddResponse}>
														<Fab size="small" color="primary" aria-label="Add" className={classes.fab2}>
															<AddIcon onClick={handleClickAddResponse} />
														</Fab>
													</div>
												</Grid>
												<Grid item xs={12}>
													<div className={classes.demo}>
														<List>
															<ListItem button onClick={handleClickListResponses}>
																<Grid container spacing={1} className={classes.root_grid}>
																	<Grid item xs={3}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcCodigo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcEjemplo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={1}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fiStatus
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcDescripcion
																			</Typography>}
																		/>
																	</Grid>
																</Grid>
																{openResponsesItemList ? <ExpandLess className={classes.action} /> : <ExpandMore className={classes.action} />}
															</ListItem>
															<Collapse in={openResponsesItemList} timeout="auto" unmountOnExit>
																{responsesList.map((value, index) => {
																	return (
																		<ListItem key={uuidv4()}>
																			<Grid container spacing={1} className={classes.root_grid_sec}>
																				<Grid item xs={3}>
																					<ListItemText primary={"" + value.fcCodigo}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcEjemplo}/>
																				</Grid>
																				<Grid item xs={1}>
																					<ListItemText primary={"" + value.fiStatus}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcDescripcion}/>
																				</Grid>
																			</Grid>
																			<img
																				src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
																				alt=""
																				className={classes.action}
																				onClick={() => deleteResponse(index)}>
																			</img>
																		</ListItem>
																	);
																})}
															</Collapse>
														</List>
													</div>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button type="submit" className="btn btn-success mr-2" disabled={(formikAddMethod.touched && !formikAddMethod.isValid)}>
								<FormattedMessage id="GLOBAL.WORD.SAVE" />
								{formikAddMethod.isSubmitting}
							</button>
							<Button onClick={handleCloseMetodoAddInfo} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{methodEditInfo !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={"lg"} open={openMetodoEditInfo} onClose={handleCloseMetodoEditInfo} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikEditMethod.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.METHOD.EDITION" />
									</DialogTitle>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												General
											</Typography>
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fcNombreMetodo"
												name="fcNombreMetodo"
												className={classes.textField + " " + getInputClassesEditMethod("fcNombreMetodo")}
												margin="normal"
												variant="outlined"
												{...formikEditMethod.getFieldProps("fcNombreMetodo")}
											/>
											{formikEditMethod.touched.fcNombreMetodo && formikEditMethod.errors.fcNombreMetodo ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditMethod.errors.fcNombreMetodo}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fcMetodoLabel">fcMetodo</InputLabel>
												<Select labelId="fcMetodoLabel" name="fcMetodo" label="fcMetodo" className={getInputClassesEditMethod("fcMetodo")} {...formikEditMethod.getFieldProps("fcMetodo")}>
													<MenuItem value="GET">GET</MenuItem>
													<MenuItem value="POST">POST</MenuItem>
													<MenuItem value="PUT">PUT</MenuItem>
													<MenuItem value="DELETE">DELETE</MenuItem>
													<MenuItem value="PATCH">PATCH</MenuItem>
													<MenuItem value="OPTIONS">OPTIONS</MenuItem>
													<MenuItem value="TRACE">TRACE</MenuItem>
													<MenuItem value="CONNECT">CONNECT</MenuItem>
													<MenuItem value="HEAD">HEAD</MenuItem>
												</Select>
												{formikEditMethod.touched.fcMetodo && formikEditMethod.errors.fcMetodo ? (
													<div className={"invalid-feedback " + classes.requiredText}>
														{formikEditMethod.errors.fcMetodo}
													</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcPath"
												name="fcPath"
												className={classes.textField + " " + getInputClassesEditMethod("fcPath")}
												margin="normal"
												variant="outlined"
												{...formikEditMethod.getFieldProps("fcPath")}
											/>
											{formikEditMethod.touched.fcPath && formikEditMethod.errors.fcPath ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditMethod.errors.fcPath}</div>
											) : null}
										</Grid>
										<Grid item xs={3}>
											<TextField
												label="fcJsonSchema"
												name="fcJsonSchema"
												className={classes.textField + " " + getInputClassesEditMethod("fcJsonSchema")}
												margin="normal"
												variant="outlined"
												{...formikEditMethod.getFieldProps("fcJsonSchema")}
											/>
											{formikEditMethod.touched.fcJsonSchema && formikEditMethod.errors.fcJsonSchema ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditMethod.errors.fcJsonSchema}</div>
											) : null}
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcGrafico (base64)"
												name="fcGrafico"
												multiline
												rows="6"
												className={classes.textField + " " + getInputClassesEditMethod("fcGrafico")}
												margin="normal"
												variant="outlined"
												{...formikEditMethod.getFieldProps("fcGrafico")}
											/>
											{formikEditMethod.touched.fcGrafico && formikEditMethod.errors.fcGrafico ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditMethod.errors.fcGrafico}</div>
											) : null}
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcDescripcion"
												name="fcDescripcion"
												multiline
												rows="6"
												className={classes.textField + " " + getInputClassesEditMethod("fcDescripcion")}
												margin="normal"
												variant="outlined"
												{...formikEditMethod.getFieldProps("fcDescripcion")}
											/>
											{formikEditMethod.touched.fcDescripcion && formikEditMethod.errors.fcDescripcion ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikEditMethod.errors.fcDescripcion}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Grid container spacing={0}>
												<Grid item xs={11}>
													<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
														<FormattedMessage id="GLOBAL.WORD.HEADERS" />
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<div onClick={handleClickAddHeader}>
														<Fab size="small" color="primary" aria-label="Add" className={classes.fab2}>
															<AddIcon onClick={handleClickAddHeader} />
														</Fab>
													</div>
												</Grid>
												<Grid item xs={12}>
													<div className={classes.demo}>
														<List>
															<ListItem button onClick={handleClickListHeaders}>
																<Grid container spacing={1} className={classes.root_grid}>
																	<Grid item xs={2}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcHeader
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcValor
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={3}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcEjemplo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={1}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fiStatus
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcDescripcion
																			</Typography>}
																		/>
																	</Grid>
																</Grid>
																{openHeadersItemList ? <ExpandLess className={classes.action} /> : <ExpandMore className={classes.action} />}
															</ListItem>
															<Collapse in={openHeadersItemList} timeout="auto" unmountOnExit>
																{headersList.map((value, index) => {
																	return (
																		<ListItem key={uuidv4()}>
																			<Grid container spacing={1} className={classes.root_grid_sec}>
																				<Grid item xs={2}>
																					<ListItemText primary={"" + value.fcHeader}/>
																				</Grid>
																				<Grid item xs={2}>
																					<ListItemText primary={"" + value.fcValor}/>
																				</Grid>
																				<Grid item xs={3}>
																					<ListItemText primary={"" + value.fcEjemplo}/>
																				</Grid>
																				<Grid item xs={1}>
																					<ListItemText primary={"" + value.fiStatus}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcDescripcion}/>
																				</Grid>
																			</Grid>
																			<img
																				src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
																				alt=""
																				className={classes.action}
																				onClick={() => deleteHeader(index)}>
																			</img>
																		</ListItem>
																	);
																})}
															</Collapse>
														</List>
													</div>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Grid container spacing={0}>
												<Grid item xs={11}>
													<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
													<FormattedMessage id="GLOBAL.WORD.PARAMETERS" />
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<div onClick={handleClickAddParameter}>
														<Fab size="small" color="primary" aria-label="Add" className={classes.fab2}>
															<AddIcon onClick={handleClickAddParameter} />
														</Fab>
													</div>
												</Grid>
												<Grid item xs={12}>
													<div className={classes.demo}>
														<List>
															<ListItem button onClick={handleClickListParameters}>
																<Grid container spacing={1} className={classes.root_grid}>
																	<Grid item xs={3}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcNombre
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={1}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcTipo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcEjemplo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcDescripcion
																			</Typography>}
																		/>
																	</Grid>
																</Grid>
																{openParametersItemList ? <ExpandLess className={classes.action} /> : <ExpandMore className={classes.action} />}
															</ListItem>	
															<Collapse in={openParametersItemList} timeout="auto" unmountOnExit>
																{parametersList.map((value, index) => {
																	return (
																		<ListItem key={uuidv4()}>
																			<Grid container spacing={1} className={classes.root_grid_sec}>
																				<Grid item xs={3}>
																					<ListItemText primary={"" + value.fcNombre}/>
																				</Grid>
																				<Grid item xs={1}>
																					<ListItemText primary={"" + value.fcTipo}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcEjemplo}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcDescripcion}/>
																				</Grid>
																			</Grid>
																			<img
																				src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
																				alt=""
																				className={classes.action}
																				onClick={() => deleteParameter(index)}>
																			</img>
																		</ListItem>
																	);
																})}
															</Collapse>
														</List>
													</div>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Grid container spacing={0}>
												<Grid item xs={11}>
													<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
														<FormattedMessage id="GLOBAL.WORD.RESPONSES" />
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<div onClick={handleClickAddResponse}>
														<Fab size="small" color="primary" aria-label="Add" className={classes.fab2}>
															<AddIcon onClick={handleClickAddResponse} />
														</Fab>
													</div>
												</Grid>
												<Grid item xs={12}>
													<div className={classes.demo}>
														<List>
															<ListItem button onClick={handleClickListResponses}>
																<Grid container spacing={1} className={classes.root_grid}>
																	<Grid item xs={3}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcCodigo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcEjemplo
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={1}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fiStatus
																			</Typography>}
																		/>
																	</Grid>
																	<Grid item xs={4}>
																		<ListItemText disableTypography primary={
																			<Typography variant="h6" component="h6" className={classes.font2}>
																				fcDescripcion
																			</Typography>}
																		/>
																	</Grid>
																</Grid>
																{openResponsesItemList ? <ExpandLess className={classes.action} /> : <ExpandMore className={classes.action} />}
															</ListItem>
															<Collapse in={openResponsesItemList} timeout="auto" unmountOnExit>
																{responsesList.map((value, index) => {
																	return (
																		<ListItem key={uuidv4()}>
																			<Grid container spacing={1} className={classes.root_grid_sec}>
																				<Grid item xs={3}>
																					<ListItemText primary={"" + value.fcCodigo}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcEjemplo}/>
																				</Grid>
																				<Grid item xs={1}>
																					<ListItemText primary={"" + value.fiStatus}/>
																				</Grid>
																				<Grid item xs={4}>
																					<ListItemText primary={"" + value.fcDescripcion}/>
																				</Grid>
																			</Grid>
																			<img
																				src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
																				alt=""
																				className={classes.action}
																				onClick={() => deleteResponse(index)}>
																			</img>
																		</ListItem>
																	);
																})}
															</Collapse>
														</List>
													</div>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button type="submit" className="btn btn-success mr-2" disabled={(formikEditMethod.touched && !formikEditMethod.isValid)}>
								<FormattedMessage id="GLOBAL.WORD.SAVE" />
								{formikEditMethod.isSubmitting}
							</button>
							<Button onClick={handleCloseMetodoEditInfo} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{openAddHeaderForm && (
				<Dialog fullWidth={fullWidth} maxWidth={"md"} open={openAddHeaderForm} onClose={handleCloseHeaderForm} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikAddHeader.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.NEW.HEADER" />
									</DialogTitle>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												General
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcHeader"
												name="fcHeader"
												className={classes.textField + " " + getInputClassesAddHeader("fcHeader")}
												margin="normal"
												variant="outlined"
												{...formikAddHeader.getFieldProps("fcHeader")}
											/>
											{formikAddHeader.touched.fcHeader && formikAddHeader.errors.fcHeader ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddHeader.errors.fcHeader}</div>
											) : null}
										</Grid>
										<Grid item xs={2}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fiStatusLabel">fiStatus</InputLabel>
												<Select labelId="fiStatusLabel" name="fiStatusHeader" label="fiStatus" className={getInputClassesAddHeader("fiStatusHeader")} {...formikAddHeader.getFieldProps("fiStatusHeader")}>
													<MenuItem value="true">Activo</MenuItem>
													<MenuItem value="false">Inactivo</MenuItem>
												</Select>
												{formikAddHeader.touched.fiStatusHeader && formikAddHeader.errors.fiStatusHeader ? (
													<div className={"invalid-feedback " + classes.requiredText}>
														{formikAddHeader.errors.fiStatusHeader}
													</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="fcValor"
												name="fcValorHeader"
												className={classes.textField + " " + getInputClassesAddHeader("fcValorHeader")}
												margin="normal"
												variant="outlined"
												{...formikAddHeader.getFieldProps("fcValorHeader")}
											/>
											{formikAddHeader.touched.fcValorHeader && formikAddHeader.errors.fcValorHeader ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddHeader.errors.fcValorHeader}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="fcEjemplo"
												name="fcEjemploHeader"
												multiline
												rows="4"
												className={classes.textField + " " + getInputClassesAddHeader("fcEjemploHeader")}
												margin="normal"
												variant="outlined"
												{...formikAddHeader.getFieldProps("fcEjemploHeader")}
											/>
											{formikAddHeader.touched.fcEjemploHeader && formikAddHeader.errors.fcEjemploHeader ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddHeader.errors.fcEjemploHeader}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="fcDescripcion"
												name="fcDescripcionHeader"
												multiline
												rows="4"
												className={classes.textField + " " + getInputClassesAddHeader("fcDescripcionHeader")}
												margin="normal"
												variant="outlined"
												{...formikAddHeader.getFieldProps("fcDescripcionHeader")}
											/>
											{formikAddHeader.touched.fcDescripcionHeader && formikAddHeader.errors.fcDescripcionHeader ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddHeader.errors.fcDescripcionHeader}</div>
											) : null}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button type="submit" className="btn btn-success mr-2" disabled={(formikAddHeader.touched && !formikAddHeader.isValid)}>
								<FormattedMessage id="GLOBAL.WORD.SAVE" />
								{formikAddHeader.isSubmitting}
							</button>
							<Button onClick={handleCloseHeaderForm} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{openAddParameterForm && (
				<Dialog fullWidth={fullWidth} maxWidth={"md"} open={openAddParameterForm} onClose={handleCloseParameterForm} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikAddParameter.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.NEW.PARAMETER" />
									</DialogTitle>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												General
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcNombre"
												name="fcNombreParameter"
												className={classes.textField + " " + getInputClassesAddParameter("fcNombreParameter")}
												margin="normal"
												variant="outlined"
												{...formikAddParameter.getFieldProps("fcNombreParameter")}
											/>
											{formikAddParameter.touched.fcNombreParameter && formikAddParameter.errors.fcNombreParameter ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddParameter.errors.fcNombreParameter}</div>
											) : null}
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcTipo"
												name="fcTipoParameter"
												className={classes.textField + " " + getInputClassesAddParameter("fcTipoParameter")}
												margin="normal"
												variant="outlined"
												{...formikAddParameter.getFieldProps("fcTipoParameter")}
											/>
											{formikAddParameter.touched.fcTipoParameter && formikAddParameter.errors.fcTipoParameter ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddParameter.errors.fcTipoParameter}</div>
											) : null}
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="fcEjemplo"
												name="fcEjemploParameter"
												className={classes.textField + " " + getInputClassesAddParameter("fcEjemploParameter")}
												margin="normal"
												variant="outlined"
												{...formikAddParameter.getFieldProps("fcEjemploParameter")}
											/>
											{formikAddParameter.touched.fcEjemploParameter && formikAddParameter.errors.fcEjemploParameter ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddParameter.errors.fcEjemploParameter}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="fcDescripcion"
												name="fcDescripcionParameter"
												multiline
												rows="4"
												className={classes.textField + " " + getInputClassesAddParameter("fcDescripcionParameter")}
												margin="normal"
												variant="outlined"
												{...formikAddParameter.getFieldProps("fcDescripcionParameter")}
											/>
											{formikAddParameter.touched.fcDescripcionParameter && formikAddParameter.errors.fcDescripcionParameter ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddParameter.errors.fcDescripcionParameter}</div>
											) : null}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button type="submit" className="btn btn-success mr-2" disabled={(formikAddParameter.touched && !formikAddParameter.isValid)}>
								<FormattedMessage id="GLOBAL.WORD.SAVE" />
								{formikAddParameter.isSubmitting}
							</button>
							<Button onClick={handleCloseParameterForm} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{openAddResponseForm && (
				<Dialog fullWidth={fullWidth} maxWidth={"md"} open={openAddResponseForm} onClose={handleCloseResponseForm} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikAddResponse.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.NEW.RESPONSE" />
									</DialogTitle>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<Divider className={classes.divider} />
											<Typography variant="h6" component="h6" gutterBottom className={classes.font}>
												General
											</Typography>
										</Grid>
										<Grid item xs={8}>
											<TextField
												label="fcCodigo"
												name="fcCodigoResponse"
												className={classes.textField + " " + getInputClassesAddResponse("fcCodigoResponse")}
												margin="normal"
												variant="outlined"
												{...formikAddResponse.getFieldProps("fcCodigoResponse")}
											/>
											{formikAddResponse.touched.fcCodigoResponse && formikAddResponse.errors.fcCodigoResponse ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddResponse.errors.fcCodigoResponse}</div>
											) : null}
										</Grid>
										<Grid item xs={4}>
											<FormControl variant="outlined" className={classes.formControl}>
												<InputLabel id="fiStatusLabel">fiStatus</InputLabel>
												<Select labelId="fiStatusLabel" name="fiStatusResponse" label="fiStatus" className={getInputClassesAddResponse("fiStatusResponse")} {...formikAddResponse.getFieldProps("fiStatusResponse")}>
													<MenuItem value="true">Activo</MenuItem>
													<MenuItem value="false">Inactivo</MenuItem>
												</Select>
												{formikAddResponse.touched.fiStatusResponse && formikAddResponse.errors.fiStatusResponse ? (
													<div className={"invalid-feedback " + classes.requiredText}>
														{formikAddResponse.errors.fiStatusResponse}
													</div>
												) : null}
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="fcEjemplo"
												name="fcEjemploResponse"
												multiline
												rows="4"
												className={classes.textField + " " + getInputClassesAddResponse("fcEjemploResponse")}
												margin="normal"
												variant="outlined"
												{...formikAddResponse.getFieldProps("fcEjemploResponse")}
											/>
											{formikAddResponse.touched.fcEjemploResponse && formikAddResponse.errors.fcEjemploResponse ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddResponse.errors.fcEjemploResponse}</div>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="fcDescripcion"
												name="fcDescripcionResponse"
												multiline
												rows="4"
												className={classes.textField + " " + getInputClassesAddResponse("fcDescripcionResponse")}
												margin="normal"
												variant="outlined"
												{...formikAddResponse.getFieldProps("fcDescripcionResponse")}
											/>
											{formikAddResponse.touched.fcDescripcionResponse && formikAddResponse.errors.fcDescripcionResponse ? (
												<div className={"invalid-feedback " + classes.requiredText}>{formikAddResponse.errors.fcDescripcionResponse}</div>
											) : null}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button type="submit" className="btn btn-success mr-2" disabled={(formikAddResponse.touched && !formikAddResponse.isValid)}>
								<FormattedMessage id="GLOBAL.WORD.SAVE" />
								{formikAddResponse.isSubmitting}
							</button>
							<Button onClick={handleCloseResponseForm} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
		</>
	);
}
