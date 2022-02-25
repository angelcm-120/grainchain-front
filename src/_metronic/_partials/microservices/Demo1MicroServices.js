import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { Notice } from "../controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../controls";
import { toAbsoluteUrl } from "../../_helpers";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";
import {
	getMicroServicesUser,
	getMicroServiceDept,
	getMicroServiceIngress,
	getMicroServiceEditDept,
	getMicroServiceFQDNS,
	setMicroServiceFQDNSUpdate,
	getMicroServiceEditForUpdate,
	setMicroServiceMsoUpdate,
	getDepartamento,
	setMicroServiceMsoAdd,
	getAllDeptos,
	getMicroServiceSecretsDet,
	getMicroServiceConfigmapsDet,
	getMicroServiceVariablesSC,
} from "../../../app/modules/Network/Services";
import { shallowEqual, useSelector } from "react-redux";
import { MicroServicesTable } from "../../../app/modules/CyCMovil/Tables/ServicesTable";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Dialog, DialogTitle, Button, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import { VerificationCodeDialog } from '../../../app/modules/UserProfile/components/VerificationCodeCard'

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Demo1MicroServices() {
	
	const useStyles = makeStyles((theme) => ({
		root_textfield: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: "100%",
			},
		},
		root_grid: {
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
		requiredText: {
			marginLeft: theme.spacing(1),
			marginTop: theme.spacing(0)
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
	const [microservices, setMicroServicios] = useState(undefined);
	const [microservice, setMicroServicio] = useState(undefined);
	const [microservicesdetail, setMicroServicesDetail] = useState(undefined);
	const [microservicesingress, setMicroServicesIngress] = useState(undefined);
	const [microservicesingressdetail, setMicroServicesIngressDetail] = useState(undefined);
	const [microserviceedit, setMicroServiceEdit] = useState(undefined);
	const [microservicefqdnsedit, setMicroServiceFQNDSEdit] = useState(undefined);
	const [departments, setDepartments] = useState(undefined);
	const [alldepartments, setAllDepartments] = useState(undefined);
	const [microserviceeditforupdate, setMicroServiceEditForUpdate] = useState(undefined);
	const [microservicesecrets, setMicroServiceSecrets] = useState(undefined);
	const [microserviceconfigmaps, setMicroServiceConfigmaps] = useState(undefined);
	const [msjError, setMsjError] = useState(undefined);
	const [openMicroServicesDept, setOpenMicroServicesDept] = React.useState(false);
	const [openMicroServiceIngress, setOpenMicroServiceIngress] = React.useState(false);
	const [openMicroServiceEdit, setOpenMicroServiceEdit] = React.useState(false);
	const [openMicroServiceAdd, setOpenMicroServiceAdd] = React.useState(false);
	const [openMicroServiceEditFQDNS, setOpenMicroServiceEditFQDNS] = React.useState(false);
	const [openMicroServiceEditForUpdate, setOpenMicroServiceEditForUpdate] = React.useState(false);
	const [openMicroServiceSecrets, setOpenMicroServiceSecrets] = React.useState(false);
	const [openMicroServiceConfigmaps, setOpenMicroServiceConfigmaps] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [openDialogErr, setOpenDialogErr] = React.useState(false);
	const [openDialogErrDept, setOpenDialogErrDept] = React.useState(false);
	const [openDialogErrIngress, setOpenDialogErrIngress] = React.useState(false);
	const [openDialogErrIngressDup, setOpenDialogErrIngressDup] = React.useState(false);
	const [ingressList, setIngressList] = React.useState([]);
	const [selectdept, setSelectDept] = React.useState({
		fiIdDepartamento: "",
	});
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [allVariablesList, setAllVariablesList] = React.useState([]);
	const [variablesList, setVariablesList] = React.useState([]);
	const [variables, setVariables] = useState([]);
	const [origin, setOrigin] = React.useState([]);
	const [selectOrigin, setSelectOrigin] = React.useState("");
	const [keys, setKeys] = React.useState([]);
	const [selectKey, setSelectKey] = React.useState("");
	const [selectId, setSelectId] = React.useState("");
	const [select_Id, setSelect_Id] = React.useState("");
	const [selectedValue, setSelectedValue] = React.useState("dev");
	const [type, setType] = React.useState({
		typeName: "",
	});
	const [valueEnv, setValueEnv] = React.useState({
		value: "",
		showValue: false,
	});
	const fullWidth = true;
	const maxWidth = "md";
	const maxWidthLG = "lg";
	const today = new Date();
	const date = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
	const time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);
	const dateTime = date + "T" + time;
	const initialValues = {
		fcWorkload: "", 
		fcVersionDesarrollo: "",
		fcVersionProduccion: "",
		fcPuerto: "",
		fiProduccion: false,
		fdFechaModificacion: dateTime,
		fcImagen: "",
		fcArtefacto: "",
		fiIdDepartamento: "",
		fcDescripcion: "",
		log: "",
		fcDesarrollo: "",
		fcProduccion: "",
	};
	const [openMFA, setOpenMFA] = useState(false);
	const [dialogMFA, setDialogMFA] = useState(<></>);

	function handleCloseMicroServices() {
		setMicroServicio(undefined);
		setMicroServicesDetail(undefined);
		setOpenMicroServicesDept(false);
	}

	function handleCloseMicroServiceIngress() {
		setMicroServicesIngressDetail(undefined);
		setMicroServicesIngress(undefined);
		setOpenMicroServiceIngress(false);
	}

	function handleCloseMicroServiceEdit() {
		setOpenMicroServiceEdit(false);
	}

	function handleCloseMicroServiceAdd() {
		setOpenMicroServiceAdd(false);
	}

	function handleCloseMicroServiceEditFQDNS() {
		setOpenMicroServiceEditFQDNS(false);
	}

	function handleCloseMicroServiceEditForUpdate() {
		setOpenMicroServiceEditForUpdate(false);
	}

	function handleCloseMicroServiceSecrets() {
		setOpenMicroServiceSecrets(false);
	}

	function handleCloseMicroServiceConfigmaps() {
		setOpenMicroServiceConfigmaps(false);
	}

	const handleClickDialog = () => {
		setOpenDialog(true);
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

	const handleClickDialogErrDept = () => {
		setOpenDialogErrDept(true);
	};

	const handleCloseDialogErrDept = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogErrDept(false);
	};

	const handleClickDialogErrIngress = () => {
		setOpenDialogErrIngress(true);
	};

	const handleCloseDialogErrIngress = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogErrIngress(false);
	};

	const handleClickDialogErrIngressDup = () => {
		setOpenDialogErrIngressDup(true);
	};

	const handleCloseDialogErrIngressDup = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenDialogErrIngressDup(false);
	};

	const getDetailMicroServiceDept = (event) => {
		const microservicio = microservices.departamentos.find((x) => x.fiIdDepartamento === Number.parseInt(event.target.id));

		if (microservicio?.fiIdDepartamento) {
			setMicroServicio(microservicio);
			getMicroServicesxDept(microservicio.fiIdDepartamento);
		}
	};

	const getDetailMicroServiceIngress = (event) => {
		const array = event.target.id.split("|");
		const ingress = microservicesdetail.fcMsos.find((x) => x.fcWorkload === array[0]);
		if (ingress?.fcIngress) {
			setMicroServicesIngress(ingress);
			getMicroServiceIngressDetail(array[0], array[1]);
		}
	};

	function editMso(event) {
		let data = document.getElementById("editBtn").value;
		getMicroServiceEdit(data);
	}

	function addMso(event) {
		setSelectDept({ fiIdDepartamento: "" });
		getMicroServiceVariables();
		setIngressList([]);
		setVariablesList([]);
		if(user.fiIdDepartamento) {
			getOpenAddMso(user.fiIdDepartamento);
		} else {
			handleClickDialogErrDept();
		}
	}

	const getMicroServiceForUpdateEdit = (event) => {
		const array = event.target.id.split("|");
		const ingress = microserviceedit.fcMsos.find((x) => x.fcWorkload === array[0]);
		if (ingress?.fcIngress) {
			getMicroServiceForUpdate(array[1], array[0]);
		}
	};

	const getMicroServiceSecrets = (event) => {
		const array = { ...event.target.id.split("|") };
		if (microservicesingressdetail?.fcMsos?.fcSecrets) {
			getMicroServiceSecretsDetail(array[1], array[2], array[0]);
		}
	};

	const getMicroServiceConfigmaps = (event) => {
		const array = { ...event.target.id.split("|") };
		if (microservicesingressdetail?.fcMsos?.fcConfigmaps) {
			getMicroServiceConfigmapsDetail(array[1], array[2], array[0]);
		}
	};

	const getAllDepartments = () => {
		setloading(true);
		setisError(false);
		setTimeout(() => {
			try {
				getAllDeptos(user)
					.then((res) => res.json())
					.then(
						(result) => {
							if (result.httpstatus.includes("OK")) {
								setloading(false);
								setisError(false);
								setMsjError(undefined);
								if (result?.resultados !== undefined) {
									setAllDepartments(result.resultados);
								}
							} else {
								setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
								setloading(false);
								setisError(true);
							}
						},
						(error) => {
							setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
							setAllDepartments(undefined);
							setloading(false);
							setisError(true);
						}
					);
			} catch (Exception) {
				setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
				setAllDepartments(undefined);
				setloading(false);
				setisError(true);
			}
		}, 500);
	};

	const getMicroServicesxUser = () => {
		if (user.roles === 1 || user.roles === "1") {
			setIsAdmin(true);
			getAllDepartments();
		}
		setMicroServicios(undefined);
		setloading(true);
		setisError(false);
		setTimeout(() => {
			try {
				getMicroServicesUser(user)
					.then((res) => res.json())
					.then(
						(result) => {
							if (result.httpstatus.includes("OK")) {
								setloading(false);
								setisError(false);
								setMsjError(undefined);
								if (result?.resultados !== undefined) {
									setMicroServicios(result?.resultados);
								}
							} else {
								setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
								setloading(false);
								setisError(true);
							}
						},
						(error) => {
							setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
							setMicroServicios(undefined);
							setloading(false);
							setisError(true);
						}
					);
			} catch (Exception) {
				setMsjError("APP.CONTRACTS.MESSAGES.ALERT.ERRORQUERY");
				setMicroServicios(undefined);
				setloading(false);
				setisError(true);
			}
		}, 500);
	};

	const getMicroServicesxDept = (dept) => {
		setloading(true);
		setTimeout(() => {
			try {
				getMicroServiceDept(dept, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados !== undefined) {
									setMicroServicesDetail(result?.resultados);
									setOpenMicroServicesDept(true);
								}
							} else {
								return setMicroServicesDetail(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setMicroServicesDetail(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setMicroServicesDetail(undefined);
			}
		}, 500);
	};

	const getMicroServiceFQNDS = (dept) => {
		setloading(true);
		setTimeout(() => {
			try {
				getMicroServiceFQDNS(dept, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados !== undefined) {
									setMicroServiceFQNDSEdit(result?.resultados);
									setOpenMicroServiceEditFQDNS(true);
								}
							} else {
								return setMicroServiceFQNDSEdit(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setMicroServiceFQNDSEdit(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setMicroServiceFQNDSEdit(undefined);
			}
		}, 500);
	};

	const getMicroServiceForUpdate = (dept, wrk) => {
		setloading(true);
		setTimeout(() => {
			try {
				getMicroServiceEditForUpdate(dept, wrk, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados !== undefined) {
									setMicroServiceEditForUpdate(result?.resultados);
									setIngressList(JSON.parse(JSON.stringify(Array.from(result?.resultados?.fcMsos?.fcIngress))));
									setVariablesList(JSON.parse(JSON.stringify(Array.from(result?.resultados?.myVariables))));
									setVariables(new Array(JSON.parse(JSON.stringify(Array.from(result?.resultados?.myVariables))).length).fill(false));

									formikForUpdate.values.fcWorkload = result.resultados.fcMsos.fcWorkload;
									formikForUpdate.values.fcVersionDesarrollo = result.resultados.fcMsos.fcVersionDesarrollo;
									formikForUpdate.values.fcVersionProduccion = result.resultados.fcMsos.fcVersionProduccion;
									formikForUpdate.values.fcPuerto = result.resultados.fcMsos.fcPuerto;
									formikForUpdate.values.fiProduccion = result.resultados.fcMsos.fiProduccion;
									formikForUpdate.values.fdFechaModificacion = dateTime;
									formikForUpdate.values.fcImagen = result.resultados.fcMsos.fcImagen;
									formikForUpdate.values.fcArtefacto = result.resultados.fcMsos.fcArtefacto;
									formikForUpdate.values.fcDescripcion = result.resultados.fcMsos.fcDescripcion;
									formikForUpdate.values.log = result.resultados.fcMsos.log;

									const varL = JSON.parse(JSON.stringify(Array.from(result?.resultados?.myVariables)));
									let aux = result?.resultados;

									varL.forEach(function(value) {
										aux.secrets.forEach(function(ori, k) {
											if (ori.nombre === value.origin) {
												aux.secrets[k].desarrollo.forEach(function(_key, l) {
													if (value.key === _key.key) {
														aux.secrets[k].desarrollo.splice(l, 1);
													}
												});
											}
										});
										aux.secrets.forEach(function(ori, k) {
											if (ori.nombre === value.origin) {
												aux.secrets[k].produccion.forEach(function(_key, l) {
													if (value.key === _key.key) {
														aux.secrets[k].produccion.splice(l, 1);
													}
												});
											}
										});
										aux.configmaps.forEach(function(ori, k) {
											if (ori.nombre === value.origin) {
												aux.configmaps[k].desarrollo.forEach(function(_key, l) {
													if (value.key === _key.key) {
														aux.configmaps[k].desarrollo.splice(l, 1);
													}
												});
											}
										});
										aux.configmaps.forEach(function(ori, k) {
											if (ori.nombre === value.origin) {
												aux.configmaps[k].produccion.forEach(function(_key, l) {
													if (value.key === _key.key) {
														aux.configmaps[k].produccion.splice(l, 1);
													}
												});
											}
										});
									});

									setAllVariablesList(aux);

									setSelectKey("");
									setSelectOrigin("");
									setSelectedValue("dev");
									setType({ typeName: "" });
									setValueEnv({ value: "", showValue: false });

									setOpenMicroServiceEditForUpdate(true);
								}
							} else {
								return setMicroServiceEditForUpdate(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setMicroServiceEditForUpdate(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setMicroServiceEditForUpdate(undefined);
			}
		}, 500);
	};

	const getMicroServiceVariables = () => {
		setloading(true);
		setTimeout(() => {
			try {
				getMicroServiceVariablesSC(user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados !== undefined) {
									setVariablesList(JSON.parse(JSON.stringify(Array.from(result?.resultados?.myVariables))));
									setVariables(new Array(JSON.parse(JSON.stringify(Array.from(result?.resultados?.myVariables))).length).fill(false));
									setAllVariablesList(result?.resultados);

									formikForAdd.values.fcWorkload = "";
									formikForAdd.values.fcVersionDesarrollo = "";
									formikForAdd.values.fcVersionProduccion = "";
									formikForAdd.values.fcPuerto = "";
									formikForAdd.values.fiProduccion = false;
									formikForAdd.values.fdFechaModificacion = dateTime;
									formikForAdd.values.fcImagen = "";
									formikForAdd.values.fcArtefacto = "";
									formikForAdd.values.fcDescripcion = "";
									formikForAdd.values.fiIdDepartamento = "";
									formikForAdd.values.log = "";

									setSelectKey("");
									setSelectOrigin("");
									setSelectedValue("dev");
									setType({ typeName: "" });
									setValueEnv({ value: "", showValue: false });
								}
							} else {
								return null;
							}
						},
						(error) => {
							setloading(false);
							return null;
						}
					);
			} catch (Exception) {
				setloading(false);
				return null;
			}
		}, 500);
	};

	const getMicroServiceEdit = (dept) => {
		setloading(true);
		setTimeout(() => {
			try {
				getMicroServiceEditDept(dept, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados !== undefined) {
									setMicroServiceEdit(result?.resultados);
									formikFQDNS.values.fcDesarrollo = result.resultados.fcFQDNS.fcDesarrollo;
									formikFQDNS.values.fcProduccion = result.resultados.fcFQDNS.fcProduccion;
									setOpenMicroServiceEdit(true);
								}
							} else {
								return setMicroServiceEdit(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setMicroServiceEdit(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setMicroServiceEdit(undefined);
			}
		}, 500);
	};

	const setMicroServiceEditUpdate = (json, setStatus, setSubmitting) => {
		setloading(true);
		setTimeout(() => {
			try {
				setMicroServiceFQDNSUpdate(json, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								getMicroServicesxUser();
								getMicroServiceEdit(json.fiIdDepartamento);
								handleCloseMicroServiceEditFQDNS(false);
								handleCloseMicroServiceEdit(false);
								setSubmitting(false);
								handleClickDialog();
							} else {
								handleClickDialogErr();
								return setMicroServiceEdit(undefined);
							}
						},
						(error) => {
							setloading(false);
							handleClickDialogErr();
							return setMicroServiceEdit(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				handleClickDialogErr();
				return setMicroServiceEdit(undefined);
			}
		}, 500);
	};

	function setMicroServiceUpdate (json, setSubmitting) {
		setloading(true);
		setTimeout(() => {
			try {
				setMicroServiceMsoUpdate(json, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								handleCloseMicroServiceEditForUpdate(false);
								handleCloseMicroServiceEdit(false);
								getMicroServicesxUser();
								getMicroServiceEdit(json.departamentos[0].fiIdDepartamento);
								setSubmitting(false);
              	setisError(false)
								handleClickDialog();
							} else {
								setSubmitting(false);
              	setisError(true);
								handleClickDialogErr();
								return setMicroServiceEdit(undefined);
							}
						},
						(error) => {
							setloading(false);
							handleClickDialogErr();
							return setMicroServiceEdit(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				handleClickDialogErr();
				return setMicroServiceEdit(undefined);
			}
		}, 500);
	}

	const setMicroServiceAdd = (json, setStatus, setSubmitting) => {
		setloading(true);
		setTimeout(() => {
			try {
				setMicroServiceMsoAdd(json, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								handleCloseMicroServiceAdd(false);
								getMicroServicesxUser();
								setSubmitting(false);
              	setisError(false); 
								handleClickDialog();
							} else {
								handleClickDialogErr();
								return setDepartments(undefined);
							}
						},
						(error) => {
							setloading(false);
							handleClickDialogErr();
							return setDepartments(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				handleClickDialogErr();
				return setDepartments(undefined);
			}
		}, 500);
	};

	const getMicroServiceIngressDetail = (wrk, dept) => {
		setloading(true);
		setTimeout(() => {
			try {
				getMicroServiceIngress(dept, wrk, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);

							if (result.httpstatus.includes("OK")) {
								if (result?.resultados?.departamentos.length > 0) {
									setMicroServicesIngressDetail(result?.resultados);
									setOpenMicroServiceIngress(true);
								}
							} else {
								return setMicroServicesIngressDetail(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setMicroServicesIngressDetail(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setMicroServicesIngressDetail(undefined);
			}
		}, 500);
	};

	const getOpenAddMso = (dept) => {
		setloading(true);
		setTimeout(() => {
			try {
				getDepartamento(dept, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);

							if (result.httpstatus.includes("OK")) {
								if (result?.resultados?.departamentos?.length > 0) {
									setDepartments(result?.resultados);
									setOpenMicroServiceAdd(true);
								}
							} else {
								return setDepartments(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setDepartments(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setDepartments(undefined);
			}
		}, 500);
	};

	const getMicroServiceSecretsDetail = (dept, wrk, id) => {
		setOpenMFA(true);
		setDialogMFA(
			<VerificationCodeDialog
				handleCompleteParent={
					function handleComplete() {
						setMsjError(undefined);
						setloading(true);
						setTimeout(() => {
							try {
								getMicroServiceSecretsDet(dept, wrk, id, user)
									.then((res) => res.json())
									.then(
										(result) => {
											setloading(false);
											if (result.httpstatus.includes("OK")) {
												if (result?.resultados !== undefined) {
													setMicroServiceSecrets(result?.resultados);
													setOpenMicroServiceSecrets(true);
												}
											} else {
												return setMicroServiceSecrets(undefined);
											}
										},
										(error) => {
											setloading(false);
											return setMicroServiceSecrets(undefined);
										}
									);
							} catch (Exception) {
								setloading(false);
								return setMicroServiceSecrets(undefined);
							}
						}, 500);
						setDialogMFA(<></>);
					}
				}
				handleCloseParent={
					function handleCloses(){
						setDialogMFA(<></>)
					}
				}
			/>
		);
		
	};

	const getMicroServiceConfigmapsDetail = (dept, wrk, id) => {
		setloading(true);
		setTimeout(() => {
			try {
				getMicroServiceConfigmapsDet(dept, wrk, id, user)
					.then((res) => res.json())
					.then(
						(result) => {
							setloading(false);
							if (result.httpstatus.includes("OK")) {
								if (result?.resultados !== undefined) {
									setMicroServiceConfigmaps(result?.resultados);
									setOpenMicroServiceConfigmaps(true);
								}
							} else {
								return setOpenMicroServiceConfigmaps(undefined);
							}
						},
						(error) => {
							setloading(false);
							return setOpenMicroServiceConfigmaps(undefined);
						}
					);
			} catch (Exception) {
				setloading(false);
				return setOpenMicroServiceConfigmaps(undefined);
			}
		}, 500);
	};

	useEffect(getMicroServicesxUser, []);

	const table = {
		name: "",
		data: undefined,
	};

	if (microservices !== undefined) {
		Object.keys(microservices?.departamentos).forEach(function(key) {
			microservices.departamentos[key].fcExtension = microservices.departamentos.find((x) => x.fcExtension === microservices.departamentos[key].fcExtension).fcExtension;
			microservices.departamentos[key].fcResponsable = microservices.departamentos.find((x) => x.fcResponsable === microservices.departamentos[key].fcResponsable).fcResponsable;
			microservices.departamentos[key].fcUbicacion = microservices.departamentos.find((x) => x.fcUbicacion === microservices.departamentos[key].fcUbicacion).fcUbicacion;
			microservices.departamentos[key].fcFQDNSDesarrollo = microservices.microservicios[key].fcFQDNS.fcDesarrollo;
			microservices.departamentos[key].fcFQDNSProduccion = microservices.microservicios[key].fcFQDNS.fcProduccion;
			microservices.departamentos[key].fcMsos = JSON.stringify(microservices.microservicios[key].fcMsos);
			microservices.departamentos[key].Msos = microservices.microservicios[key].fcMsos.length;
			microservices.departamentos[key].fiIdDepartamento = microservices.departamentos.find((x) => x.fiIdDepartamento === microservices.departamentos[key].fiIdDepartamento).fiIdDepartamento;
			microservices.departamentos[key].check = "check";
		});

		table.name = "microservicesxuser";
		table.data = JSON.parse(JSON.stringify(microservices.departamentos));
		Object.keys(table.data).forEach(function(key) {
			delete table.data[key]._id;
			delete table.data[key].fcExtension;
			delete table.data[key].fcTelefono;
			delete table.data[key].fcMsos;
			delete table.data[key].fcEmail;
			delete table.data[key].fcEmailGrupo;
		});
	}

	const tableGeneralDataDept = {
		name: "",
		data: undefined,
	};

	const tableGeneralData = {
		name: "",
		data: undefined,
	};

	const tableGeneralInfoEdit = {
		name: "",
		data: undefined,
	};

	const tableMicroServices = {
		name: "",
		data: undefined,
	};

	const tableMsoData = {
		name: "",
		data: undefined,
	};

	const tableSecrets = {
		name: "",
		data: undefined,
	};

	const tableConfigmaps = {
		name: "",
		data: undefined,
	};

	const tableIngress = {
		name: "",
		data: undefined,
	};

	const editData = {
		name: "",
		data: undefined,
	};

	const secretsDev = {
		name: "",
		data: undefined,
	};

	const secretsProd = {
		name: "",
		data: undefined,
	};

	const configmapsDev = {
		name: "",
		data: undefined,
	};

	const configmapsProd = {
		name: "",
		data: undefined,
	};

	const msoUpdateData = {
		name: "",
		data: undefined,
	};

	if (microservicesdetail !== undefined && microservicesdetail.fcFQDNS) {
		tableMicroServices.name = "Microservicios";

		Object.keys(microservicesdetail?.fcMsos).forEach(function(key) {
			microservicesdetail.fcMsos[key].fiIdDepartamento = microservicesdetail.fcMsos[key].fcWorkload + "|" + microservicesdetail.departamentos[0].fiIdDepartamento;
			microservicesdetail.fcMsos[key].fcDepartamento = microservicesdetail.departamentos[0].fcDepartamento;
		});

		tableMicroServices.data = JSON.parse(JSON.stringify(microservicesdetail.fcMsos));

		Object.keys(tableMicroServices.data).forEach(function(key) {
			delete tableMicroServices.data[key].fcIngress;
			delete tableMicroServices.data[key].fiProduccion;
			delete tableMicroServices.data[key].fcPuerto;
			delete tableMicroServices.data[key].log;
			delete tableMicroServices.data[key].fcDepartamento;
		});

		const generalInfoDept = [
			{
				info: "Departamento",
				data: `${microservice.fcDepartamento}`,
			},
			{
				info: "Responsable",
				data: `${microservice.fcResponsable}`,
			},
			{
				info: "FQDN Desarrollo",
				data: `${microservicesdetail.fcFQDNS.fcDesarrollo}`,
			},
			{
				info: "FQDN Producción",
				data: `${microservicesdetail.fcFQDNS.fcProduccion}`,
			},
		];

		tableGeneralDataDept.name = "FQDNS";
		tableGeneralDataDept.data = generalInfoDept;
	}

	if (microservicesingressdetail !== undefined && microservicesingressdetail.fcMsos) {
		tableIngress.name = "Ingress";

		Object.keys(tableMicroServices.data).forEach(function(key) {
			microservicesingressdetail.fcWorkload = microservicesingressdetail.fcMsos.fcWorkload;
		});

		tableIngress.data = JSON.parse(JSON.stringify(Array.from(microservicesingressdetail.fcMsos.fcIngress)));

		if (microservicesingressdetail.fcMsos.fcSecrets.length > 0) {
			tableSecrets.name = "Secrets";
			tableSecrets.data = JSON.parse(JSON.stringify(microservicesingressdetail.fcMsos.fcSecrets));

			Object.keys(tableSecrets.data).forEach(function(key) {
				tableSecrets.data[key].fi_id = tableSecrets.data[key].fi_id + "|" + microservicesingressdetail.departamentos[0].fiIdDepartamento + "|" + microservicesingressdetail.fcMsos.fcWorkload;
				tableSecrets.data[key].secrets_desarrollo = tableSecrets.data[key].fcDesarrollo.length;
				tableSecrets.data[key].secrets_produccion = tableSecrets.data[key].fcProduccion.length;
			});
			Object.keys(tableSecrets.data).forEach(function(key) {
				delete tableSecrets.data[key].fcDesarrollo;
				delete tableSecrets.data[key].fcProduccion;
			});
		}

		if (microservicesingressdetail.fcMsos.fcConfigmaps.length > 0) {
			tableConfigmaps.name = "Configmaps";
			tableConfigmaps.data = JSON.parse(JSON.stringify(microservicesingressdetail.fcMsos.fcConfigmaps));

			Object.keys(tableConfigmaps.data).forEach(function(key) {
				tableConfigmaps.data[key].fi_id = tableConfigmaps.data[key].fi_id + "|" + microservicesingressdetail.departamentos[0].fiIdDepartamento + "|" + microservicesingressdetail.fcMsos.fcWorkload;
				tableConfigmaps.data[key].configmaps_desarrollo = tableConfigmaps.data[key].fcDesarrollo.length;
				tableConfigmaps.data[key].configmaps_produccion = tableConfigmaps.data[key].fcProduccion.length;
			});
			Object.keys(tableConfigmaps.data).forEach(function(key) {
				delete tableConfigmaps.data[key].fcDesarrollo;
				delete tableConfigmaps.data[key].fcProduccion;
			});
		}

		for (let i = 0; i < tableIngress.data.length; i++) {
			tableIngress.data[i] = { fcIngress: tableIngress.data[i].toString() };
		}

		const generalInfoMso = [
			{
				info: "Departamento",
				data: `${microservicesingressdetail.departamentos[0].fcDepartamento}`,
			},
			{
				info: "FQDN Desarrollo",
				data: `${microservicesingressdetail.fcFQDNS.fcDesarrollo}`,
			},
			{
				info: "FQDN Producción",
				data: `${microservicesingressdetail.fcFQDNS.fcProduccion}`,
			},
		];

		tableMsoData.name = "Microservicio";
		tableMsoData.data = generalInfoMso;

		const generalInfo = [
			{
				info: "Workload",
				data: `${microservicesingressdetail.fcMsos.fcWorkload}`,
			},
			{
				info: "Descripción",
				data: `${microservicesingressdetail.fcMsos.fcDescripcion}`,
			},
			{
				info: "Imagen",
				data: `${microservicesingressdetail.fcMsos.fcImagen}`,
			},
			{
				info: "Vesión Desarrollo",
				data: `${microservicesingressdetail.fcMsos.fcVersionDesarrollo}`,
			},
			{
				info: "Vesión Producción",
				data: `${microservicesingressdetail.fcMsos.fcVersionProduccion}`,
			},
			{
				info: "Artefacto",
				data: `${microservicesingressdetail.fcMsos.fcArtefacto}`,
			},
			{
				info: "Fecha De Modificación",
				data: `${microservicesingressdetail.fcMsos.fdFechaModificacion}`,
			},
			{
				info: "Producción",
				data: `${microservicesingressdetail.fcMsos.fiProduccion}`,
			},
			{
				info: "Puerto",
				data: `${microservicesingressdetail.fcMsos.fcPuerto}`,
			},
			{
				info: "Log",
				data: `${microservicesingressdetail.fcMsos.log}`,
			},
		];

		tableGeneralData.name = "Microservicio";
		tableGeneralData.data = generalInfo;
	}
	if (microserviceedit !== undefined) {
		editData.name = "msos_edit";
		editData.data = JSON.parse(JSON.stringify(microserviceedit.fcMsos));

		Object.keys(editData.data).forEach(function(key) {
			delete editData.data[key].fcIngress;
			delete editData.data[key].log;
			delete editData.data[key].fcDescripcion;
		});

		Object.keys(editData.data).forEach(function(key) {
			editData.data[key].fiIdDepartamento = microserviceedit.fcMsos[key].fcWorkload + "|" + microserviceedit.departamentos[0].fiIdDepartamento;
			if (editData.data[key].fiProduccion) {
				editData.data[key].fiProduccion = "Si";
			} else {
				editData.data[key].fiProduccion = "No";
			}
		});

		const generalInfoMso = [
			{
				info: "Departamento",
				data: `${microserviceedit.departamentos[0].fcDepartamento}`,
			},
			{
				info: "Responsable",
				data: `${microserviceedit.departamentos[0].fcResponsable}`,
			},
			{
				info: "FQDN Desarrollo",
				data: `${microserviceedit.fcFQDNS.fcDesarrollo}`,
			},
			{
				info: "FQDN Producción",
				data: `${microserviceedit.fcFQDNS.fcProduccion}`,
			},
		];

		tableGeneralInfoEdit.name = "Información General Microservicios";
		tableGeneralInfoEdit.data = generalInfoMso;
	}
	if (microserviceeditforupdate !== undefined) {
		msoUpdateData.name = "msos_edit_update";
		msoUpdateData.data = JSON.parse(JSON.stringify(microserviceeditforupdate.fcMsos));
	}
	if (microservicesecrets !== undefined) {
		secretsDev.name = "secrets_dev";
		secretsDev.data = JSON.parse(JSON.stringify(microservicesecrets.fcDesarrollo));

		secretsProd.name = "secrets_prod";
		secretsProd.data = JSON.parse(JSON.stringify(microservicesecrets.fcProduccion));
	}
	if (microserviceconfigmaps !== undefined) {
		configmapsDev.name = "configmaps_dev";
		configmapsDev.data = JSON.parse(JSON.stringify(microserviceconfigmaps.fcDesarrollo));

		configmapsProd.name = "configmaps_prod";
		configmapsProd.data = JSON.parse(JSON.stringify(microserviceconfigmaps.fcProduccion));
	}

	const Schema = Yup.object().shape({});

	let SchemaAdd = Yup.object().shape({});

	if(user.roles === 1) {
		SchemaAdd = Yup.object().shape({
			fcWorkload: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcVersionDesarrollo: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcVersionProduccion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcPuerto: Yup.number().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fiProduccion: Yup.boolean().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fdFechaModificacion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcImagen: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcArtefacto: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fiIdDepartamento: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcDescripcion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			log: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />)
		});
	} else {
		SchemaAdd = Yup.object().shape({
			fcWorkload: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcVersionDesarrollo: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcVersionProduccion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcPuerto: Yup.number().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fiProduccion: Yup.boolean().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fdFechaModificacion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcImagen: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcArtefacto: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			fcDescripcion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
			log: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />)
		});
	}

	const SchemaUp = Yup.object().shape({
    fcWorkload: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
    fcVersionDesarrollo: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcVersionProduccion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcPuerto: Yup.number().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fiProduccion: Yup.boolean().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fdFechaModificacion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcImagen: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcArtefacto: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		fcDescripcion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
		log: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />)
  });

	const SchemaFQDNS = Yup.object().shape({
    fcDesarrollo: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />),
    fcProduccion: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.FIELD" />)
  });

	function handleOnClickEditFQDNS(fiIdDepartamento, _id) {
		getMicroServiceFQNDS(fiIdDepartamento);
		formikFQDNS.values.fcDesarrollo = microserviceedit.fcFQDNS.fcDesarrollo;
		formikFQDNS.values.fcProduccion = microserviceedit.fcFQDNS.fcProduccion;
		setFQDNSEdit({
			_id: _id,
			fiIdDepartamento: fiIdDepartamento,
		});
	}

	const formik = useFormik({
		initialValues:{},
		validationSchema: Schema,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			getMicroServicesxUser();
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const formikFQDNS = useFormik({
		initialValues,
		validationSchema: SchemaFQDNS,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			const jsonParam = {
				_id: fqdnsedit._id,
				fiIdDepartamento: fqdnsedit.fiIdDepartamento,
				fcFQDNS: {
					fcDesarrollo: values.fcDesarrollo,
					fcProduccion: values.fcProduccion
				},
			};

			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={
						function handleComplete() {
							setMsjError(undefined);
							setSubmitting(false);
							setMicroServiceEditUpdate(jsonParam, setStatus, setSubmitting);
							setDialogMFA(<></>);
						}
					}
					handleCloseParent={
						function handleCloses(){
							setDialogMFA(<></>)
						}
					}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

 	const formikForUpdate = useFormik({
		initialValues,
		validationSchema: SchemaUp,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			setloading(true);
			const wrk = values.fcWorkload;
			const desc = values.fcDescripcion;
			const img = values.fcImagen;
			const vd = values.fcVersionDesarrollo;
			const vp = values.fcVersionProduccion;
			const art = values.fcArtefacto;
			const fm = values.fdFechaModificacion;
			const prt = values.fcPuerto;
			const lg = values.log;
			const prod = values.fiProduccion;

			let arrSecrets = [];
			let arrConfigmaps = [];

			variablesList.forEach(function(vari, i) {
				if (vari.type === "Secret") {
					if (arrSecrets.length > 0) {
						let bandera = false;
						arrSecrets.forEach(function(secret) {
							if (secret.fi_id === vari._id) {
								bandera = true;
							}
						});
						if (bandera === false) {
							const temp = {
								fi_id: vari._id,
								fcDesarrollo: [],
								fcProduccion: [],
							};
							arrSecrets.push(temp);
						}
					} else {
						const temp = {
							fi_id: vari._id,
							fcDesarrollo: [],
							fcProduccion: [],
						};
						arrSecrets.push(temp);
					}
				} else if (vari.type === "ConfigMap") {
					if (arrConfigmaps.length > 0) {
						let bandera = false;
						arrConfigmaps.forEach(function(configmap) {
							if (configmap.fi_id === vari._id) {
								bandera = true;
							}
						});
						if (bandera === false) {
							const temp = {
								fi_id: vari._id,
								fcDesarrollo: [],
								fcProduccion: [],
							};
							arrConfigmaps.push(temp);
						}
					} else {
						const temp = {
							fi_id: vari._id,
							fcDesarrollo: [],
							fcProduccion: [],
						};
						arrConfigmaps.push(temp);
					}
				}
			});

			variablesList.forEach(function(vari) {
				if (vari.type === "Secret") {
					if (arrSecrets.length > 0) {
						arrSecrets.forEach(function(secret, k) {
							if (secret.fi_id === vari._id) {
								if (vari.environment === "dev") {
									arrSecrets[k].fcDesarrollo.push(vari.id);
								} else if (vari.environment === "prod") {
									arrSecrets[k].fcProduccion.push(vari.id);
								}
							}
						});
					}
				} else if (vari.type === "ConfigMap") {
					if (arrConfigmaps.length > 0) {
						arrConfigmaps.forEach(function(configmap, k) {
							if (configmap.fi_id === vari._id) {
								if (vari.environment === "dev") {
									arrConfigmaps[k].fcDesarrollo.push(vari.id);
								} else if (vari.environment === "prod") {
									arrConfigmaps[k].fcProduccion.push(vari.id);
								}
							}
						});
					}
				}
			});

			const modMso = {
				fcWorkload: wrk,
				fcDescripcion: desc,
				fcImagen: img,
				fcVersionDesarrollo: vd,
				fcVersionProduccion: vp,
				fcArtefacto: art,
				fdFechaModificacion: fm,
				fiProduccion: prod,
				fcPuerto: prt,
				fcSecrets: arrSecrets,
				fcConfigmaps: arrConfigmaps,
				log: lg,
				fcIngress: JSON.stringify(ingressList),
			};

			let microserviceeditCopy = Object.assign({}, microserviceedit);

			for (let i = 0; i < microserviceeditCopy.fcMsos.length; i++) {
				if (microserviceeditCopy.fcMsos[i].fcWorkload === microserviceeditforupdate.fcMsos.fcWorkload) {
					microserviceeditCopy.fcMsos[i] = modMso;
				} else {
					microserviceeditCopy.fcMsos[i].fcIngress = JSON.stringify(microserviceeditCopy.fcMsos[i].fcIngress);
				}
			}
			
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={
						function handleComplete() {
							setMsjError(undefined);
							setSubmitting(false);
							setMicroServiceUpdate(microserviceeditCopy, setStatus, setSubmitting);
							setDialogMFA(<></>);
						}
					}
					handleCloseParent={
						function handleCloses(){
							setDialogMFA(<></>)
						}
					}
				/>
			);
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const formikForAdd = useFormik({
		initialValues,
		validationSchema: SchemaAdd,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			let arrSecrets = [];
			let arrConfigmaps = [];
			const wrk = values.fcWorkload;
			const desc = values.fcDescripcion;
			const img = values.fcImagen;
			const vd = values.fcVersionDesarrollo;
			const vp = values.fcVersionProduccion;
			const art = values.fcArtefacto;
			const fm = values.fdFechaModificacion;
			const prt = values.fcPuerto;
			const lg = values.log;
			const idDep = values.fiIdDepartamento;
			const prod = values.fiProduccion;

			variablesList.forEach(function(vari, i) {
				if (vari.type === "Secret") {
					if (arrSecrets.length > 0) {
						let bandera = false;
						arrSecrets.forEach(function(secret) {
							if (secret.fi_id === vari._id) {
								bandera = true;
							}
						});
						if (bandera === false) {
							const temp = {
								fi_id: vari._id,
								fcDesarrollo: [],
								fcProduccion: [],
							};
							arrSecrets.push(temp);
						}
					} else {
						const temp = {
							fi_id: vari._id,
							fcDesarrollo: [],
							fcProduccion: [],
						};
						arrSecrets.push(temp);
					}
				} else if (vari.type === "ConfigMap") {
					if (arrConfigmaps.length > 0) {
						let bandera = false;
						arrConfigmaps.forEach(function(configmap) {
							if (configmap.fi_id === vari._id) {
								bandera = true;
							}
						});
						if (bandera === false) {
							const temp = {
								fi_id: vari._id,
								fcDesarrollo: [],
								fcProduccion: [],
							};
							arrConfigmaps.push(temp);
						}
					} else {
						const temp = {
							fi_id: vari._id,
							fcDesarrollo: [],
							fcProduccion: [],
						};
						arrConfigmaps.push(temp);
					}
				}
			});

			variablesList.forEach(function(vari) {
				if (vari.type === "Secret") {
					if (arrSecrets.length > 0) {
						arrSecrets.forEach(function(secret, k) {
							if (secret.fi_id === vari._id) {
								if (vari.environment === "dev") {
									arrSecrets[k].fcDesarrollo.push(vari.id);
								} else if (vari.environment === "prod") {
									arrSecrets[k].fcProduccion.push(vari.id);
								}
							}
						});
					}
				} else if (vari.type === "ConfigMap") {
					if (arrConfigmaps.length > 0) {
						arrConfigmaps.forEach(function(configmap, k) {
							if (configmap.fi_id === vari._id) {
								if (vari.environment === "dev") {
									arrConfigmaps[k].fcDesarrollo.push(vari.id);
								} else if (vari.environment === "prod") {
									arrConfigmaps[k].fcProduccion.push(vari.id);
								}
							}
						});
					}
				}
			});
			
			if (isAdmin) {
				const modMso = {
					fcWorkload: wrk,
					fcDescripcion: desc,
					fcImagen: img,
					fcVersionDesarrollo: vd,
					fcVersionProduccion: vp,
					fcArtefacto: art,
					fdFechaModificacion: fm,
					fiProduccion: prod,
					fcSecrets: arrSecrets,
					fcConfigmaps: arrConfigmaps,
					fcPuerto: prt,
					log: lg,
					fcIngress: JSON.stringify(ingressList),
				};

				let microserviceAddCopy = Object.assign({}, departments);

				if (isAdmin) {
					microserviceAddCopy.departamentos[0].fiIdDepartamento = idDep;
				}

				for (let i = 0; i < microserviceAddCopy.fcMsos.length; i++) {
					microserviceAddCopy.fcMsos[i].fcIngress = JSON.stringify(microserviceAddCopy.fcMsos[i].fcIngress);
				}

				microserviceAddCopy.fcMsos.push(modMso);

				setOpenMFA(true);
				setDialogMFA(
					<VerificationCodeDialog
						handleCompleteParent={
							function handleComplete() {
								setMsjError(undefined);
								setSubmitting(false);
								setMicroServiceAdd(microserviceAddCopy, setStatus, setSubmitting);
								setDialogMFA(<></>);
							}
						}
						handleCloseParent={
							function handleCloses(){
								setDialogMFA(<></>)
							}
						}
					/>
				);
			} else {
				const modMso = {
					fcWorkload: wrk,
					fcDescripcion: desc,
					fcImagen: img,
					fcVersionDesarrollo: vd,
					fcVersionProduccion: vp,
					fcArtefacto: art,
					fdFechaModificacion: fm,
					fiProduccion: prod,
					fcSecrets: arrSecrets,
					fcConfigmaps: arrConfigmaps,
					fcPuerto: prt,
					log: lg,
					fcIngress: JSON.stringify(ingressList),
				};

				let microserviceAddCopy = Object.assign({}, departments);

				for (let i = 0; i < microserviceAddCopy.fcMsos.length; i++) {
					microserviceAddCopy.fcMsos[i].fcIngress = JSON.stringify(microserviceAddCopy.fcMsos[i].fcIngress);
				}

				microserviceAddCopy.fcMsos.push(modMso);

				setOpenMFA(true);
				setDialogMFA(
					<VerificationCodeDialog
						handleCompleteParent={
							function handleComplete() {
								setMsjError(undefined);
								setSubmitting(false);
								setMicroServiceAdd(microserviceAddCopy, setStatus, setSubmitting);
								setDialogMFA(<></>);
							}
						}
						handleCloseParent={
							function handleCloses(){
								setDialogMFA(<></>)
							}
						}
					/>
				);
			}
		},
		onReset: (values, { resetForm }) => {
			resetForm();
		},
	});

	const getInputClasses = (fieldname) => {
    if (formikForAdd.touched[fieldname] && formikForAdd.errors[fieldname]) {
      return "is-invalid";
    }

    if (formikForAdd.touched[fieldname] && !formikForAdd.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

	const getInputClassesUpdate = (fieldname) => {
    if (formikForUpdate.touched[fieldname] && formikForUpdate.errors[fieldname]) {
      return "is-invalid";
    }

    if (formikForUpdate.touched[fieldname] && !formikForUpdate.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

	const getInputClassesFQDN = (fieldname) => {
    if (formikFQDNS.touched[fieldname] && formikFQDNS.errors[fieldname]) {
      return "is-invalid";
    }

    if (formikFQDNS.touched[fieldname] && !formikFQDNS.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

	const [fqdnsedit, setFQDNSEdit] = useState({
		_id: "",
		fiIdDepartamento: "",
		fcFQDNS: {
			fcDesarrollo: "",
			fcProduccion: "",
		},
	});

	const handleInputChangeFQDNSEdit = (event) => {
		setFQDNSEdit({
			...fqdnsedit,
			[event.target.name]: event.target.value,
		});
	};

	const handleInputChangeDepartamento = (event) => {
		setSelectDept({
			...selectdept,
			[event.target.name]: event.target.value,
		});
	};

	if (microserviceeditforupdate !== undefined) {
		microserviceeditforupdate.fcMsos.fdFechaModificacion = microserviceeditforupdate.fcMsos.fdFechaModificacion.replace("/", "-");
		microserviceeditforupdate.fcMsos.fdFechaModificacion = microserviceeditforupdate.fcMsos.fdFechaModificacion.replace(" ", "T");
	}

	const handleClickShowValue = () => {
		if(!valueEnv.showValue) {
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={
						function handleComplete() {
							setValueEnv({ value: valueEnv.value, showValue: !valueEnv.showValue });
						}
					}
					handleCloseParent={
						function handleCloses(){
								setDialogMFA(<></>)
						}
					}
				/>
			);
		} else {
			setValueEnv({ value: valueEnv.value, showValue: !valueEnv.showValue });
		}
	};

	const handleMouseDownValue = (event) => {
		event.preventDefault();
	};

	const handleMouseDownVariable = (event) => {
		event.preventDefault();
	};

	const agregarIngress = (e) => {
		let ingress = document.getElementById("ingressUpdate");
		const comp = ingressList.find((x) => x === ingress.value);

		if(ingress.value[0] === " " || ingress.value[(ingress.value.length - 1)] === " " || ingress.value === "" || ingress.value === " ") {
			handleClickDialogErrIngress();	
		} else if(comp !== undefined) {
			handleClickDialogErrIngressDup();
		} else {
			setIngressList([...ingressList, ingress.value]);
			ingress.value = "";
		}
	};

	const agregarIngressAdd = (e) => {
		let ingress = document.getElementById("ingressAdd");

		const comp = ingressList.find((x) => x === ingress.value);

		if(ingress.value[0] === " " || ingress.value[(ingress.value.length - 1)] === " " || ingress.value === "" || ingress.value === " ") {
			handleClickDialogErrIngress();	
		} else if(comp !== undefined) {
			handleClickDialogErrIngressDup();
		} else {
			setIngressList([...ingressList, ingress.value]);
			ingress.value = "";	
		}
	};

	const agregarVariable = (e) => {
		if(select_Id !== "" && selectId !== "" && selectKey !== "" && selectOrigin !== "" && type.typeName !== "" && valueEnv.value !== "" && selectedValue !== "") {
			const newVariable = {
				_id: select_Id,
				id: selectId,
				key: selectKey,
				origin: selectOrigin,
				type: type.typeName,
				value: valueEnv.value,
				environment: selectedValue,
			};
			let arrVar = variablesList.slice();
			arrVar.push(newVariable);
			setVariablesList([...variablesList, newVariable]);

			let arrVarPass = variables.slice();
			arrVarPass.push(false);
			setVariables([...variables, false]);

			let arrAllVar = Object.assign({}, allVariablesList);

			if (type.typeName === "Secret") {
				arrAllVar.secrets.forEach(function(sec, i) {
					if (sec.nombre === selectOrigin) {
						if (selectedValue === "dev") {
							arrAllVar.secrets[i].desarrollo.forEach(function(key, k) {
								if (key.key === selectKey) {
									arrAllVar.secrets[i].desarrollo.splice(k, 1);
									let arrKeys = keys.slice();
									arrKeys.forEach(function(value, l) {
										if (value === selectKey) {
											arrKeys.splice(l, 1);
										}
									});
									setKeys(arrKeys);
									setSelectKey("");
									setValueEnv({ value: "", showValue: false });
								}
							});
						} else if (selectedValue === "prod") {
							arrAllVar.secrets[i].produccion.forEach(function(key, k) {
								if (key.key === selectKey) {
									arrAllVar.secrets[i].produccion.splice(k, 1);
									let arrKeys = keys.slice();
									arrKeys.forEach(function(value, l) {
										if (value === selectKey) {
											arrKeys.splice(l, 1);
										}
									});
									setKeys(arrKeys);
									setSelectKey("");
									setValueEnv({ value: "", showValue: false });
								}
							});
						}
					}
				});
			} else if (type.typeName === "ConfigMap") {
				arrAllVar.configmaps.forEach(function(sec, i) {
					if (sec.nombre === selectOrigin) {
						if (selectedValue === "dev") {
							arrAllVar.configmaps[i].desarrollo.forEach(function(key, k) {
								if (key.key === selectKey) {
									arrAllVar.configmaps[i].desarrollo.splice(k, 1);
									let arrKeys = keys.slice();
									arrKeys.forEach(function(value, l) {
										if (value === selectKey) {
											arrKeys.splice(l, 1);
										}
									});
									setKeys(arrKeys);
									setSelectKey("");
									setValueEnv({ value: "", showValue: false });
								}
							});
						} else if (selectedValue === "prod") {
							arrAllVar.configmaps[i].produccion.forEach(function(key, k) {
								if (key.key === selectKey) {
									arrAllVar.configmaps[i].produccion.splice(k, 1);
									let arrKeys = keys.slice();
									arrKeys.forEach(function(value, l) {
										if (value === selectKey) {
											arrKeys.splice(l, 1);
										}
									});
									setKeys(arrKeys);
									setSelectKey("");
									setValueEnv({ value: "", showValue: false });
								}
							});
						}
					}
				});
			}

			setAllVariablesList(arrAllVar);
		}
	};

	const deleteIngress = (indexItem) => {
		setIngressList((prevState) => prevState.filter((second, index) => index !== indexItem));
	};

	const deleteVariable = (indexItem) => {
		const aux = allVariablesList;
		const vari = variablesList[indexItem];
		if (vari.type === "Secret") {
			aux.secrets.forEach(function(sec, i) {
				if (sec.nombre === vari.origin) {
					if (vari.environment === "dev") {
						const newVar = {
							id: vari.id,
							key: vari.key,
							value: vari.value,
						};
						aux.secrets[i].desarrollo.push(newVar);
					} else {
						const newVar = {
							id: vari.id,
							key: vari.key,
							value: vari.value,
						};
						aux.secrets[i].produccion.push(newVar);
					}
				}
			});
		} else {
			aux.configmaps.forEach(function(conf, i) {
				if (conf.nombre === vari.origin) {
					if (vari.environment === "dev") {
						const newVar = {
							id: vari.id,
							key: vari.key,
							value: vari.value,
						};
						aux.configmaps[i].desarrollo.push(newVar);
					} else {
						const newVar = {
							id: vari.id,
							key: vari.key,
							value: vari.value,
						};
						aux.configmaps[i].produccion.push(newVar);
					}
				}
			});
		}

		setOpenMFA(true);
		setDialogMFA(
			<VerificationCodeDialog
				handleCompleteParent={
					function handleComplete() {
						setAllVariablesList(aux);
						setOriginComponentDelete(vari.origin, vari.environment, aux, vari.type);
						setVariablesList((prevState) => prevState.filter((second, index) => index !== indexItem));
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

	const deleteIngressAdd = (indexItem) => {
		setIngressList((prevState) => prevState.filter((second, index) => index !== indexItem));
	};

	const handleInputChangeType = (event) => {
		setValueEnv({ value: "", showValue: false });
		setSelectKey("");
		setSelectOrigin("");
		setKeys([]);
		setOrigin([]);
		setType({
			...type,
			typeName: event.target.value,
		});
		if (event.target.value === "Secret") {
			const secrets = [];
			allVariablesList.secrets.forEach(function(value) {
				secrets.push(value.nombre);
			});
			setOrigin(secrets);
		} else if (event.target.value === "ConfigMap") {
			const configmaps = [];
			allVariablesList.configmaps.forEach(function(value) {
				configmaps.push(value.nombre);
			});
			setOrigin(configmaps);
		} else {
			setValueEnv({ value: "", showValue: false });
			setSelectKey("");
			setSelectOrigin("");
			setKeys([]);
			setOrigin([]);
		}
	};

	const setOriginComponent = (origin) => {
		setValueEnv({ value: "", showValue: false });

		if (type.typeName === "Secret" && origin !== "") {
			if (selectedValue === "dev") {
				const keys = allVariablesList.secrets.find((x) => x.nombre === origin).desarrollo;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else if (selectedValue === "prod") {
				const keys = allVariablesList.secrets.find((x) => x.nombre === origin).produccion;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else {
				setKeys([]);
			}
		} else if (type.typeName === "ConfigMap" && origin !== "") {
			if (selectedValue === "dev") {
				const keys = allVariablesList.configmaps.find((x) => x.nombre === origin).desarrollo;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else if (selectedValue === "prod") {
				const keys = allVariablesList.configmaps.find((x) => x.nombre === origin).produccion;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else {
				setKeys([]);
			}
		} else {
			setSelectKey("");
			setKeys([]);
		}
	};

	const setOriginComponentDelete = (origin, env, aux, type) => {
		setValueEnv({ value: "", showValue: false });

		if (origin === selectOrigin) {
			if (type === "Secret") {
				if (env === "dev" && selectedValue === env) {
					const keys = aux.secrets.find((x) => x.nombre === origin).desarrollo;
					let arr = [];
					keys.forEach(function(value) {
						arr.push(value.key);
					});
					setKeys(arr);
				} else if (env === "prod" && selectedValue === env) {
					const keys = aux.secrets.find((x) => x.nombre === origin).produccion;
					let arr = [];
					keys.forEach(function(value) {
						arr.push(value.key);
					});
					setKeys(arr);
				}
			} else if (type === "ConfigMap") {
				if (env === "dev" && selectedValue === env) {
					const keys = aux.configmaps.find((x) => x.nombre === origin).desarrollo;
					let arr = [];
					keys.forEach(function(value) {
						arr.push(value.key);
					});
					setKeys(arr);
				} else if (env === "prod" && selectedValue === env) {
					const keys = aux.configmaps.find((x) => x.nombre === origin).produccion;
					let arr = [];
					keys.forEach(function(value) {
						arr.push(value.key);
					});
					setKeys(arr);
				}
			}
		}
	};

	const setKeysComponent = (env) => {
		setValueEnv({ value: "", showValue: false });

		let aux = allVariablesList;
		variablesList.forEach(function(value) {
			aux.secrets.forEach(function(ori, k) {
				if (ori.nombre === selectOrigin) {
					aux.secrets[k].desarrollo.forEach(function(key, l) {
						if (value.key === key.key) {
							aux.secrets[k].desarrollo.splice(l, 1);
						}
					});
				}
			});
			aux.secrets.forEach(function(ori, k) {
				if (ori.nombre === selectOrigin) {
					aux.secrets[k].produccion.forEach(function(key, l) {
						if (value.key === key.key) {
							aux.secrets[k].produccion.splice(l, 1);
						}
					});
				}
			});
			aux.configmaps.forEach(function(ori, k) {
				if (ori.nombre === selectOrigin) {
					aux.configmaps[k].desarrollo.forEach(function(key, l) {
						if (value.key === key.key) {
							aux.configmaps[k].desarrollo.splice(l, 1);
						}
					});
				}
			});
			aux.configmaps.forEach(function(ori, k) {
				if (ori.nombre === selectOrigin) {
					aux.configmaps[k].produccion.forEach(function(key, l) {
						if (value.key === key.key) {
							aux.configmaps[k].produccion.splice(l, 1);
						}
					});
				}
			});
		});

		setAllVariablesList(aux);

		if (type.typeName === "Secret") {
			if (env === "dev") {
				const keys = aux.secrets.find((x) => x.nombre === selectOrigin).desarrollo;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else if (env === "prod") {
				const keys = aux.secrets.find((x) => x.nombre === selectOrigin).produccion;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else {
				setKeys([]);
			}
		} else if (type.typeName === "ConfigMap") {
			if (env === "dev") {
				const keys = aux.configmaps.find((x) => x.nombre === selectOrigin).desarrollo;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else if (env === "prod") {
				const keys = aux.configmaps.find((x) => x.nombre === selectOrigin).produccion;
				let arr = [];
				keys.forEach(function(value) {
					arr.push(value.key);
				});
				setKeys(arr);
			} else {
				setKeys([]);
			}
		} else {
			setSelectKey("");
		}
	};

	const handleInputChangeOrigin = async (event) => {
		setSelectOrigin(event.target.value);
		setOriginComponent(event.target.value);
	};

	const handleChangeCheckBox = (event) => {
		setSelectKey("");
		setKeys([]);
		setSelectedValue(event.target.value);
		if (selectOrigin !== "") {
			setKeysComponent(event.target.value);
		}
	};

	const handleInputChangeKey = (event) => {
		setSelectKey(event.target.value);
		if (type.typeName === "Secret" && selectOrigin !== "" && event.target.value !== "") {
			if (selectedValue === "dev") {
				const keys = allVariablesList.secrets.find((x) => x.nombre === selectOrigin);
				const key = keys.desarrollo.find((x) => x.key === event.target.value);
				setValueEnv({ value: key.value, showValue: false });
				setSelectId(key.id);
				setSelect_Id(keys._id);
			} else if (selectedValue === "prod") {
				const keys = allVariablesList.secrets.find((x) => x.nombre === selectOrigin);
				const key = keys.produccion.find((x) => x.key === event.target.value);
				setValueEnv({ value: key.value, showValue: false });
				setSelect_Id(keys._id);
				setSelectId(key.id);
			} else {
				setSelectKey("");
				setKeys([]);
			}
		} else if (type.typeName === "ConfigMap" && selectOrigin !== "" && event.target.value !== "") {
			if (selectedValue === "dev") {
				const keys = allVariablesList.configmaps.find((x) => x.nombre === selectOrigin);
				const key = keys.desarrollo.find((x) => x.key === event.target.value);
				setValueEnv({ value: key.value, showValue: true });
				setSelect_Id(keys._id);
				setSelectId(key.id);
			} else if (selectedValue === "prod") {
				const keys = allVariablesList.configmaps.find((x) => x.nombre === selectOrigin);
				const key = keys.produccion.find((x) => x.key === event.target.value);
				setValueEnv({ value: key.value, showValue: true });
				setSelect_Id(keys._id);
				setSelectId(key.id);
			} else {
				setSelectKey("");
				setKeys([]);
			}
		} else {
			setValueEnv({ value: "", showValue: false });
			setSelectKey("");
			setKeys([]);
		}
	};

	const handleClickShowValues = (i) => {
		const updatedVariables = [];
		variables.map((item, index) => {
			if (index === i) {
				updatedVariables.push(!item);
			} else {
				updatedVariables.push(item);
			}
			return 1;
		});
		if(!variables[i]) {
			setOpenMFA(true);
			setDialogMFA(
				<VerificationCodeDialog
					handleCompleteParent={
						function handleComplete() {
							setVariables(updatedVariables);
						}
					}
					handleCloseParent={
						function handleCloses(){
								setDialogMFA(<></>)
						}
					}
				/>
			);
		} else {
			setVariables(updatedVariables);
		}
	};

	const textoAdmin = (adm, depto) => {
		if(adm) {
			return "";
		} else {
			return " - [" + depto + "]";
		}
	}

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
				<Snackbar open={openDialogErrDept} autoHideDuration={3000} onClose={handleCloseDialogErrDept}>
					<Alert onClose={handleCloseDialogErrDept} severity="error">
						No estás asociado a ningún departamento, favor de contactar al área de soporte.
					</Alert>
				</Snackbar>
				<Snackbar open={openDialogErrIngress} autoHideDuration={3000} onClose={handleCloseDialogErrIngress}>
					<Alert onClose={handleCloseDialogErrIngress} severity="error">
						Ingress inválido.
					</Alert>
				</Snackbar>
				<Snackbar open={openDialogErrIngressDup} autoHideDuration={3000} onClose={handleCloseDialogErrIngressDup}>
					<Alert onClose={handleCloseDialogErrIngressDup} severity="error">
						Este ingress ya fue agregado.
					</Alert>
				</Snackbar>
			</div>
			<Notice icon="flaticon-home font-primary">
				<span>
					<FormattedMessage id="APP.NOTICES.MICROSERVICES" />
				</span>
			</Notice>
			<form className="card card-custom" onSubmit={formik.handleSubmit}>
				{loading && <ModalProgressBar />}
				<div className="card-header border-0">
					<h3 className="card-title font-weight-bolder text-dark">
						<FormattedMessage id="GLOBAL.WORD.MICROSERVICES" />
					</h3>
					<div className="card-toolbar">
						{/*Solo si hay botones de acción */}
						<div onClick={addMso}>
							<Fab size="small" color="primary" aria-label="Add" className={classes.fab}>
								<AddIcon />
							</Fab>
						</div>
						<div onClick={editMso}>
							<Fab id="editBtn" color="secondary" disabled size="small" aria-label="Edit" className={classes.fab}>
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
					<div className="form-group row">{!isError && microservices !== undefined && <MicroServicesTable key={table.name} data={table} getDetailMicroService={getDetailMicroServiceDept} />}</div>
					{/* end::results */}
				</div>
			</form>
			{microservicesdetail !== undefined && microservice !== undefined && openMicroServicesDept && (
				<Dialog fullWidth={fullWidth} maxWidth={"xl"} open={openMicroServicesDept} onClose={handleCloseMicroServices} aria-labelledby="max-width-dialog-title">
					<DialogTitle id="max-width-dialog-title">
						<FormattedMessage id="GLOBAL.WORD.INTERFACE.MICROSERVICES" /> - [{microservice.fcDepartamento}]
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<strong>
								<FormattedMessage id="GLOBAL.WORD.GENERAL.INFORMATION.MICROSERVICES" />
							</strong>
						</DialogContentText>
						<p>
							<strong>
								{microservice.fiIdDepartamento}.- <FormattedMessage id="GLOBAL.WORD.GENERAL.INFORMATION" />
							</strong>
						</p>
						{/* begin::results */}
						<div className="form-group row">
							{!isError && microservice !== undefined && microservicesdetail !== undefined && <MicroServicesTable key={tableGeneralDataDept.name} data={tableGeneralDataDept} />}
						</div>
						{/* end::results */}

						{/* end::results */}
						<p>
							<strong>
								{microservice.fiIdDepartamento}.1.- <FormattedMessage id="GLOBAL.WORD.LIST.AVAILABLE.INGRESS" />
							</strong>
						</p>
						{/* begin::results */}
						<div className="form-group row">
							{!isError && microservice !== undefined && microservicesdetail !== undefined && (
								<MicroServicesTable key={tableMicroServices.name} data={tableMicroServices} getDetailMicroService={getDetailMicroServiceIngress} />
							)}
						</div>
						{/* end::results */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseMicroServices} color="primary">
							<FormattedMessage id="GLOBAL.WORD.CLOSE" />
						</Button>
					</DialogActions>
				</Dialog>
			)}
			{microservicesdetail !== undefined && openMicroServicesDept && microservicesingress !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={maxWidthLG} open={openMicroServiceIngress} onClose={handleCloseMicroServiceIngress} aria-labelledby="max-width-dialog-title">
					<DialogContent>
						<DialogTitle id="max-width-dialog-title">
							<FormattedMessage id="GLOBAL.WORD.INTERFACE.MICROSERVICES" /> - [{microservicesdetail.fcMsos[0].fcDepartamento}] - [{microservicesingress.fcWorkload}]
						</DialogTitle>

						<DialogContentText>
							<strong>
								<FormattedMessage id="GLOBAL.WORD.MICROSERVICE.DETAIL" /> {microservicesingress.fcWorkload}
							</strong>
						</DialogContentText>

						<strong>
							{microservice.fiIdDepartamento}.1.- <FormattedMessage id="GLOBAL.WORD.GENERAL.INFORMATION" />
						</strong>
						{/* begin::results */}
						<div className="form-group row">{tableMsoData !== undefined && <MicroServicesTable key={tableMsoData.name} data={tableMsoData} />}</div>
						{/* end::results */}

						<strong>
							{microservice.fiIdDepartamento}.1.1.- <FormattedMessage id="GLOBAL.WORD.MICROSERVICE.INFORMATION" />
						</strong>
						{/* begin::results */}
						<div className="form-group row">{tableGeneralData !== undefined && <MicroServicesTable key={tableGeneralData.name} data={tableGeneralData} />}</div>
						{/* end::results */}

						<Grid container spacing={4}>
							<Grid item xs={6}>
								{tableSecrets.data !== undefined && (
									<div>
										<strong>Secrets</strong>
										<div className="form-group row">
											{tableSecrets !== undefined && <MicroServicesTable key={tableSecrets.name} data={tableSecrets} getDetailMicroService={getMicroServiceSecrets} />}
										</div>
									</div>
								)}
							</Grid>
							<Grid item xs={6}>
								{/* begin::results */}
								{tableConfigmaps.data !== undefined && (
									<div>
										<strong>ConfigMaps</strong>
										<div className="form-group row">
											{tableConfigmaps !== undefined && <MicroServicesTable key={tableConfigmaps.name} data={tableConfigmaps} getDetailMicroService={getMicroServiceConfigmaps} />}
										</div>
									</div>
								)}
							</Grid>
						</Grid>
						{/* end::results */}

						<strong>
							{microservice.fiIdDepartamento}.1.2.- <FormattedMessage id="GLOBAL.WORD.INGRESS.LIST" />
						</strong>
						{/* begin::results */}
						<div className="form-group row">{tableIngress !== undefined && <MicroServicesTable key={tableIngress.name} data={tableIngress} />}</div>
						{/* end::results */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseMicroServiceIngress} color="primary">
							<FormattedMessage id="GLOBAL.WORD.CLOSE" />
						</Button>
					</DialogActions>
				</Dialog>
			)}
			{microserviceedit !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={"xl"} open={openMicroServiceEdit} onClose={handleCloseMicroServiceEdit} aria-labelledby="max-width-dialog-title">
					<DialogContent>
						<DialogTitle id="max-width-dialog-title">
							<Grid container spacing={1}>
								<Grid item xs={10}>
									<FormattedMessage id="GLOBAL.WORD.INTERFACE.MICROSERVICES.EDIT" /> - [{microserviceedit.departamentos[0].fcDepartamento}]
								</Grid>
								<Grid item xs={2}>
									<Button
										variant="contained"
										onClick={() => handleOnClickEditFQDNS(microserviceedit.departamentos[0].fiIdDepartamento, microserviceedit._id)}
										color="secondary"
										className={classes.button}
									>
										<Icon>edit_icon</Icon>
										<Typography>Editar FQDNS</Typography>
									</Button>
								</Grid>
							</Grid>
						</DialogTitle>

						<strong>
							{microserviceedit.departamentos[0].fiIdDepartamento}.1.- <FormattedMessage id="GLOBAL.WORD.GENERAL.INFORMATION" />
						</strong>
						{/* begin::results */}
						<div className="form-group row">{tableGeneralInfoEdit !== undefined && <MicroServicesTable key={tableGeneralInfoEdit.name} data={tableGeneralInfoEdit} />}</div>
						{/* end::results */}

						<strong>
							{microserviceedit.departamentos[0].fiIdDepartamento}.1.1.- <FormattedMessage id="GLOBAL.WORD.MICROSERVICE.INFORMATION" />
						</strong>
						{/* begin::results */}
						<div className="form-group row">{editData !== undefined && <MicroServicesTable key={editData.name} data={editData} getDetailMicroService={getMicroServiceForUpdateEdit} />}</div>
						{/* end::results */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseMicroServiceEdit} color="primary">
							<FormattedMessage id="GLOBAL.WORD.CLOSE" />
						</Button>
					</DialogActions>
				</Dialog>
			)}
			{microservicefqdnsedit !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={openMicroServiceEditFQDNS} onClose={handleCloseMicroServiceEditFQDNS} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="fqdns_edit_form" required onSubmit={formikFQDNS.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.INTERFACE.FQDNS.EDIT" /> - [{microserviceedit.departamentos[0].fcDepartamento}]
									</DialogTitle>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={6}>
											<TextField
												label="FQDN Desarrollo"
												name="fcDesarrollo"
												className={classes.textField + " " + getInputClassesFQDN("fcDesarrollo")}
												margin="normal"
												variant="outlined"
												onChange={handleInputChangeFQDNSEdit}
												{...formikFQDNS.getFieldProps("fcDesarrollo")}
												/>
											{formikFQDNS.touched.fcDesarrollo && formikFQDNS.errors.fcDesarrollo ? (
												<div className={"invalid-feedback " + classes.requiredText}>
													{formikFQDNS.errors.fcDesarrollo}
												</div>
											) : null}
										</Grid>
										<Grid item xs={6}>
											<TextField
												label="FQDN Producción"
												name="fcProduccion"
												className={classes.textField + " " + getInputClassesFQDN("fcProduccion")}
												margin="normal"
												variant="outlined"
												onChange={handleInputChangeFQDNSEdit}
												{...formikFQDNS.getFieldProps("fcProduccion")}
											/>
											{formikFQDNS.touched.fcProduccion && formikFQDNS.errors.fcProduccion ? (
												<div className={"invalid-feedback " + classes.requiredText}>
													{formikFQDNS.errors.fcProduccion}
												</div>
											) : null}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button
								type="submit"
								className="btn btn-success mr-2"
								disabled={
              		formikFQDNS.isSubmitting || (formikFQDNS.touched && !formikFQDNS.isValid)
            		}
							>
								<FormattedMessage id="GLOBAL.WORD.SAVE"/>
								{formikFQDNS.isSubmitting}
							</button>
							<Button onClick={handleCloseMicroServiceEditFQDNS} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{openMFA && dialogMFA}
			{microserviceeditforupdate !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={"xl"} open={openMicroServiceEditForUpdate} onClose={handleCloseMicroServiceEditForUpdate} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" id="mso_edit_form" onSubmit={formikForUpdate.handleSubmit}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">
										<FormattedMessage id="GLOBAL.WORD.INTERFACE.MSO.EDIT" /> - [{microserviceedit.departamentos[0].fcDepartamento}]
									</DialogTitle>
									<Divider />
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography variant="h5" gutterBottom>
										Datos del microservicio
									</Typography>
								</Grid>
								<Grid item xs={12} sm={4}>
									<TextField
										name="fcWorkload"
										label="Workload"
										className={classes.textField + " " + getInputClassesUpdate("fcWorkload")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("fcWorkload")}
									/>
									{formikForUpdate.touched.fcWorkload && formikForUpdate.errors.fcWorkload ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForUpdate.errors.fcWorkload}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField
										name="fcVersionDesarrollo"
										label="Versión Desarrollo"
										className={classes.textField + " " + getInputClassesUpdate("fcVersionDesarrollo")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("fcVersionDesarrollo")}
									/>
									{formikForUpdate.touched.fcVersionDesarrollo && formikForUpdate.errors.fcVersionDesarrollo ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForUpdate.errors.fcVersionDesarrollo}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField
										name="fcVersionProduccion"
										label="Versión Producción"
										className={classes.textField + " " + getInputClassesUpdate("fcVersionProduccion")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("fcVersionProduccion")}
										/>
									{formikForUpdate.touched.fcVersionProduccion && formikForUpdate.errors.fcVersionProduccion ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForUpdate.errors.fcVersionProduccion}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField
										name="fcPuerto"
										label="Puerto"
										type="number"
										className={classes.textField + " " + getInputClassesUpdate("fcPuerto")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("fcPuerto")}
										/>
									{formikForUpdate.touched.fcPuerto && formikForUpdate.errors.fcPuerto ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForUpdate.errors.fcPuerto}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="fiProduccionLabelUpdate">¿Producción?</InputLabel>
										<Select labelId="fiProduccionLabelUpdate" name="fiProduccion" label="¿Producción?"
										className={getInputClassesUpdate("fiProduccion")} {...formikForUpdate.getFieldProps("fiProduccion")}>
											<MenuItem value="false">No</MenuItem>
											<MenuItem value="true">Si</MenuItem>
										</Select>
										{formikForUpdate.touched.fiProduccion && formikForUpdate.errors.fiProduccion ? (
											<div className={"invalid-feedback " + classes.requiredText}>
												{formikForUpdate.errors.fiProduccion}
											</div>
										) : null}
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField
										name="fdFechaModificacion"
										label="Fecha De Modificación"
										className={classes.textField + " " + getInputClassesUpdate("fdFechaModificacion")}
										disabled
										type="datetime-local"
										margin="normal"
										variant="outlined"
										InputLabelProps={{
											shrink: true,
										}}
										{...formikForUpdate.getFieldProps("fdFechaModificacion")}
									/>
									{formikForUpdate.touched.fdFechaModificacion && formikForUpdate.errors.fdFechaModificacion ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForUpdate.errors.fdFechaModificacion}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={5}>
									<TextField 
										name="fcImagen"
										label="Imagen"
										className={classes.textField + " " + getInputClassesUpdate("fcImagen")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("fcImagen")}
										/>
									{formikForUpdate.touched.fcImagen && formikForUpdate.errors.fcImagen ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForUpdate.errors.fcImagen}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={5}>
									<TextField
										name="fcArtefacto"
										label="Artefacto"
										className={classes.textField + " " + getInputClassesUpdate("fcArtefacto")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("fcArtefacto")}
									/>
										{formikForUpdate.touched.fcArtefacto && formikForUpdate.errors.fcArtefacto ? (
											<div className={"invalid-feedback " + classes.requiredText}>
												{formikForUpdate.errors.fcArtefacto}
											</div>
										) : null}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="fcDescripcion"
										label="Descripción"
										multiline
										rows="4"
										className={classes.textField + " " + getInputClassesUpdate("fcDescripcion")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("fcDescripcion")}
									/>
									{formikForUpdate.touched.fcDescripcion && formikForUpdate.errors.fcDescripcion ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForUpdate.errors.fcDescripcion}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name="log"
										label="Log"
										multiline
										rows="4"
										className={classes.textField + " " + getInputClassesUpdate("log")}
										margin="normal"
										variant="outlined"
										{...formikForUpdate.getFieldProps("log")}
										/>
										{formikForUpdate.touched.log && formikForUpdate.errors.log ? (
											<div className={"invalid-feedback " + classes.requiredText}>
												{formikForUpdate.errors.log}
											</div>
										) : null}
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Divider />
									<div className={classes.highTop}></div>
									<Typography variant="h5" component="h5" gutterBottom>
										Secrets y ConfigMaps
									</Typography>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="typeLabel">Type</InputLabel>
										<Select labelId="typeLabel" id="type" name="type" value={type.typeName} label="Type" onChange={handleInputChangeType}>
											<MenuItem value=""></MenuItem>
											<MenuItem value="Secret">Secret</MenuItem>
											<MenuItem value="ConfigMap">ConfigMap</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="originLabel">Origin</InputLabel>
										<Select labelId="originLabel" id="origin" name="origin" value={selectOrigin} label="Origin" onChange={handleInputChangeOrigin}>
											<MenuItem value=""></MenuItem>
											{origin.map((ori) => {
												return (
													<MenuItem key={uuidv4()} value={ori}>
														{ori}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={2}>
									<Grid item xs={12} sm={12}>
										<FormControl component="fieldset">
											<RadioGroup row aria-label="position" name="environment" id="environment" value={selectedValue} onChange={handleChangeCheckBox}>
												<Box display="flex" alignItems="flex-bottom" justifyContent="center" m={1} sx={{ height: 80 }}>
													<Grid item xs={12} sm={6}>
														<FormControlLabel value="dev" control={<Radio color="primary" />} label="Desarrollo" labelPlacement="top" />
													</Grid>
												</Box>
												<Box display="flex" alignItems="flex-bottom" justifyContent="center" m={1} sx={{ height: 80 }}>
													<Grid item xs={12} sm={6}>
														<FormControlLabel value="prod" control={<Radio color="primary" />} label="Producción" labelPlacement="top" />
													</Grid>
												</Box>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="keyUpdateLabel">Key</InputLabel>
										<Select labelId="originLabel" id="key" name="key" value={selectKey} label="Key" onChange={handleInputChangeKey}>
											<MenuItem value=""></MenuItem>
											{keys.map((key) => {
												return (
													<MenuItem key={uuidv4()} value={key}>
														{key}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={3}>
									<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined">
										<InputLabel htmlFor="valueenv">Value</InputLabel>
										<OutlinedInput
											id="valueenv"
											value={valueEnv.value}
											inputProps={{
												readOnly: true,
											}}
											type={valueEnv.showValue ? "text" : "password"}
											endAdornment={
												<InputAdornment position="end">
													<IconButton aria-label="toggle password visibility" onClick={handleClickShowValue} onMouseDown={handleMouseDownValue} edge="end">
														{valueEnv.showValue ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											}
											labelWidth={45}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={1}>
									<Box display="flex" alignItems="center" justifyContent="center" m={1} sx={{ height: 80 }}>
										<div onClick={agregarVariable}>
											<Fab size="medium" color="primary" aria-label="add">
												<AddIcon />
											</Fab>
										</div>
									</Box>
								</Grid>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Typography variant="subtitle2">Lista de Secrets y ConfigMaps</Typography>
									</Grid>
									<Grid item xs={12}>
										<div className={classes.demo}>
											<List>
												{variablesList.map((value, index) => {
													if (value.type === "Secret") {
														return (
															<ListItem key={uuidv4()}>
																<Grid container className={classes.root_grid}>
																	<Grid item xs={1}>
																		<ListItemText primary={"Type: " + value.type} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Origin: " + value.origin} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Environment: " + value.environment} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Key: " + value.key} />
																	</Grid>
																	<Grid item xs={5}>
																		<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined" size="small">
																			<InputLabel htmlFor={"val" + index}>Value</InputLabel>
																			<OutlinedInput
																				id={"val" + index}
																				value={"" + value.value}
																				size="small"
																				inputProps={{
																					readOnly: true,
																				}}
																				type={variables[index] ? "text" : "password"}
																				endAdornment={
																					<InputAdornment position="end">
																						<IconButton
																							aria-label="toggle password visibility"
																							id={"var" + index}
																							onClick={() => handleClickShowValues(index)}
																							onMouseDown={handleMouseDownVariable}
																							edge="end"
																						>
																							{variables[index] ? <Visibility /> : <VisibilityOff />}
																						</IconButton>
																					</InputAdornment>
																				}
																				labelWidth={45}
																			/>
																		</FormControl>
																	</Grid>
																</Grid>
																<ListItemSecondaryAction>
																	<div onClick={() => deleteVariable(index)}>
																		<IconButton edge="end" aria-label="delete">
																			<DeleteIcon />
																		</IconButton>
																	</div>
																</ListItemSecondaryAction>
															</ListItem>
														);
													} else {
														return (
															<ListItem key={uuidv4()}>
																<Grid container className={classes.root_grid}>
																	<Grid item xs={1}>
																		<ListItemText primary={"Type: " + value.type} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Origin: " + value.origin} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Environment: " + value.environment} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Key: " + value.key} />
																	</Grid>
																	<Grid item xs={5}>
																		<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined" size="small">
																			<InputLabel htmlFor={"val" + index}>Value</InputLabel>
																			<OutlinedInput id={"val" + index} value={"" + value.value} disabled size="small" type={"text"} labelWidth={45} />
																		</FormControl>
																	</Grid>
																</Grid>
																<ListItemSecondaryAction>
																	<div onClick={() => deleteVariable(index)}>
																		<IconButton edge="end" aria-label="delete">
																			<DeleteIcon />
																		</IconButton>
																	</div>
																</ListItemSecondaryAction>
															</ListItem>
														);
													}
												})}
											</List>
										</div>
									</Grid>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Divider />
									<div className={classes.highTop}></div>
									<Typography variant="h5" component="h5" gutterBottom>
										Ingress
									</Typography>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={11}>
									<TextField id="ingressUpdate" label="Ingress" className={classes.textField} margin="normal" variant="outlined" />
								</Grid>
								<Grid item xs={12} sm={1}>
									<Box display="flex" alignItems="flex-start" justifyContent="center" m={1} sx={{ height: 100 }}>
										<div onClick={agregarIngress}>
											<Fab size="medium" color="primary" aria-label="add">
												<AddIcon />
											</Fab>
										</div>
									</Box>
								</Grid>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Typography variant="subtitle2">Lista de Ingress</Typography>
									</Grid>
									<Grid item xs={12}>
										<div className={classes.demo}>
											<List>
												{ingressList.map((value, index) => (
													<ListItem key={uuidv4()}>
														<ListItemText primary={value} />
														<ListItemSecondaryAction>
															<div onClick={() => deleteIngress(index)}>
																<IconButton edge="end" aria-label="delete">
																	<DeleteIcon />
																</IconButton>
															</div>
														</ListItemSecondaryAction>
													</ListItem>
												))}
											</List>
										</div>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
						{loading && <ModalProgressBar />}
							<button
								type="submit"
								className="btn btn-success mr-2"
								disabled={
              		formikForUpdate.isSubmitting || (formikForUpdate.touched && !formikForUpdate.isValid)
            		}
							>
								<FormattedMessage id="GLOBAL.WORD.SAVE"/>
								{formikForUpdate.isSubmitting}
							</button>
							<Button onClick={handleCloseMicroServiceEditForUpdate} color="secondary">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{departments !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={"xl"} open={openMicroServiceAdd} onClose={handleCloseMicroServiceAdd} aria-labelledby="max-width-dialog-title">
					<form className="card card-custom" onSubmit={formikForAdd.handleSubmit}>
						{loading && <ModalProgressBar />}
						<DialogContent>
							<Grid container spacing={1}>
								{isAdmin && (
									<Grid item xs={8}>
										<DialogTitle id="max-width-dialog-title">
											<FormattedMessage id="GLOBAL.WORD.INTERFACE.MSO.ADD" />
											{textoAdmin(isAdmin, departments.departamentos[0].fcDepartamento)}
										</DialogTitle>
										<Divider />
									</Grid>
								)}
								{!isAdmin && (
									<Grid item xs={12}>
										<DialogTitle id="max-width-dialog-title">
											<FormattedMessage id="GLOBAL.WORD.INTERFACE.MSO.ADD" />
											{textoAdmin(isAdmin, departments.departamentos[0].fcDepartamento)}
										</DialogTitle>
										<Divider />
									</Grid>
								)}
								{isAdmin && (
									<Grid item xs={4} sm={2}>
										
											<FormControl variant="outlined" className={classes.formControlS}>
												<InputLabel id="fiIdDepartementoAddLabel">Departamento</InputLabel>
												<Select
													labelId="fiIdDepartementoAddLabel"
													name="fiIdDepartamento"
													className={getInputClasses("fiIdDepartamento")}
													value={selectdept.fiIdDepartamento}
													label="Departamento"
													onChange={handleInputChangeDepartamento}
													{...formikForAdd.getFieldProps("fiIdDepartamento")}
												>
													{alldepartments.map((dept) => {
														return (
															<MenuItem key={uuidv4()} value={dept.fiIdDepartamento}>
																{dept.fcDepartamento}
															</MenuItem>
														);
													})}
												</Select>
												{formikForAdd.touched.fiIdDepartamento && formikForAdd.errors.fiIdDepartamento ? (
													<div className={"invalid-feedback " + classes.requiredText}>
														{formikForAdd.errors.fiIdDepartamento}
													</div>
												) : null}
											</FormControl>
									</Grid>
								)}
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography variant="h5" gutterBottom>
										Datos del microservicio
									</Typography>
								</Grid>
								<Grid item xs={12} sm={4}>
									<TextField name="fcWorkload" label="Workload" className={classes.textField + " " + getInputClasses("fcWorkload")} 
									margin="normal" variant="outlined" {...formikForAdd.getFieldProps("fcWorkload")}/>
									{formikForAdd.touched.fcWorkload && formikForAdd.errors.fcWorkload ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.fcWorkload}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField name="fcVersionDesarrollo" label="Versión Desarrollo" className={classes.textField + " " + getInputClasses("fcVersionDesarrollo")} 
									margin="normal" variant="outlined" {...formikForAdd.getFieldProps("fcVersionDesarrollo")}/>
									{formikForAdd.touched.fcVersionDesarrollo && formikForAdd.errors.fcVersionDesarrollo ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.fcVersionDesarrollo}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField name="fcVersionProduccion" label="Versión Producción" className={classes.textField + " " + getInputClasses("fcVersionDesarrollo")} 
									margin="normal" variant="outlined" {...formikForAdd.getFieldProps("fcVersionProduccion")}/>
									{formikForAdd.touched.fcVersionProduccion && formikForAdd.errors.fcVersionProduccion ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.fcVersionProduccion}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField
										name="fcPuerto"
										label="Puerto"
										type="number"
										
										className={classes.textField + " " + getInputClasses("fcPuerto")}
										margin="normal"
										variant="outlined"
										{...formikForAdd.getFieldProps("fcPuerto")}
									/>
									{formikForAdd.touched.fcPuerto && formikForAdd.errors.fcPuerto ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.fcPuerto}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="fiProduccionLabelAdd">¿Producción?</InputLabel>
										<Select labelId="fiProduccionLabelAdd" name="fiProduccion" label="¿Producción?"
										className={getInputClasses("fiProduccion")}	{...formikForAdd.getFieldProps("fiProduccion")}>
											<MenuItem value="false">No</MenuItem>
											<MenuItem value="true">Si</MenuItem>
										</Select>
										{formikForAdd.touched.fiProduccion && formikForAdd.errors.fiProduccion ? (
											<div className={"invalid-feedback " + classes.requiredText}>
												{formikForAdd.errors.fiProduccion}
											</div>
										) : null}
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={2}>
									<TextField
										name="fdFechaModificacion"
										label="Fecha De Modificación"
										className={classes.textField}
										defaultValue={dateTime}
										disabled
										type="datetime-local"
										margin="normal"
										variant="outlined"
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={5}>
									<TextField name="fcImagen" label="Imagen" className={classes.textField + " " + getInputClasses("fcImagen")} 
									margin="normal" variant="outlined" {...formikForAdd.getFieldProps("fcImagen")}/>
									{formikForAdd.touched.fcImagen && formikForAdd.errors.fcImagen ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.fcImagen}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={5}>
									<TextField name="fcArtefacto" label="Artefacto" className={classes.textField + " " + getInputClasses("fcArtefacto")} 
									margin="normal" variant="outlined" {...formikForAdd.getFieldProps("fcArtefacto")}/>
									{formikForAdd.touched.fcArtefacto && formikForAdd.errors.fcArtefacto ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.fcArtefacto}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField name="fcDescripcion" label="Descripción" multiline rows="4" className={classes.textField + " " + getInputClasses("fcDescripcion")} 
									margin="normal" variant="outlined" {...formikForAdd.getFieldProps("fcDescripcion")}/>
									{formikForAdd.touched.fcDescripcion && formikForAdd.errors.fcDescripcion ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.fcDescripcion}
										</div>
									) : null}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField name="log" label="Log" multiline rows="4" className={classes.textField + " " + getInputClasses("log")} 
									margin="normal" variant="outlined" {...formikForAdd.getFieldProps("log")}/>
									{formikForAdd.touched.log && formikForAdd.errors.log ? (
										<div className={"invalid-feedback " + classes.requiredText}>
											{formikForAdd.errors.log}
										</div>
									) : null}
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Divider />
									<div className={classes.highTop}></div>
									<Typography variant="h5" component="h5" gutterBottom>
										Secrets y ConfigMaps
									</Typography>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="typeLabel">Type</InputLabel>
										<Select labelId="typeLabel" id="type" name="type" value={type.typeName} label="Type" onChange={handleInputChangeType}>
											<MenuItem value=""></MenuItem>
											<MenuItem value="Secret">Secret</MenuItem>
											<MenuItem value="ConfigMap">ConfigMap</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="originLabel">Origin</InputLabel>
										<Select labelId="originLabel" id="origin" name="origin" value={selectOrigin} label="Origin" onChange={handleInputChangeOrigin}>
											<MenuItem value=""></MenuItem>
											{origin.map((ori) => {
												return (
													<MenuItem key={uuidv4()} value={ori}>
														{ori}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={2}>
									<Grid item xs={12} sm={12}>
										<FormControl component="fieldset">
											<RadioGroup row aria-label="position" name="environment" id="environment" value={selectedValue} onChange={handleChangeCheckBox}>
												<Box display="flex" alignItems="flex-bottom" justifyContent="center" m={1} sx={{ height: 80 }}>
													<Grid item xs={12} sm={6}>
														<FormControlLabel value="dev" control={<Radio color="primary" />} label="Desarrollo" labelPlacement="top" />
													</Grid>
												</Box>
												<Box display="flex" alignItems="flex-bottom" justifyContent="center" m={1} sx={{ height: 80 }}>
													<Grid item xs={12} sm={6}>
														<FormControlLabel value="prod" control={<Radio color="primary" />} label="Producción" labelPlacement="top" />
													</Grid>
												</Box>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
								<Grid item xs={12} sm={2}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="keyUpdateLabel">Key</InputLabel>
										<Select labelId="originLabel" id="key" name="key" value={selectKey} label="Key" onChange={handleInputChangeKey}>
											<MenuItem value=""></MenuItem>
											{keys.map((key) => {
												return (
													<MenuItem key={uuidv4()} value={key}>
														{key}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={3}>
									<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined">
										<InputLabel htmlFor="valueenv">Value</InputLabel>
										<OutlinedInput
											id="valueenv"
											value={valueEnv.value}
											type={valueEnv.showValue ? "text" : "password"}
											inputProps={{
												readOnly: true,
											}}
											endAdornment={
												<InputAdornment position="end">
													<IconButton aria-label="toggle password visibility" onClick={handleClickShowValue} onMouseDown={handleMouseDownValue} edge="end">
														{valueEnv.showValue ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											}
											labelWidth={45}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={1}>
									<Box display="flex" alignItems="center" justifyContent="center" m={1} sx={{ height: 80 }}>
										<div onClick={agregarVariable}>
											<Fab size="medium" color="primary" aria-label="add">
												<AddIcon />
											</Fab>
										</div>
									</Box>
								</Grid>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Typography variant="subtitle2">Lista de Secrets y ConfigMaps</Typography>
									</Grid>
									<Grid item xs={12}>
										<div className={classes.demo}>
											<List>
												{variablesList.map((value, index) => {
													if (value.type === "Secret") {
														return (
															<ListItem key={uuidv4()}>
																<Grid container className={classes.root_grid}>
																	<Grid item xs={1}>
																		<ListItemText primary={"Type: " + value.type} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Origin: " + value.origin} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Environment: " + value.environment} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Key: " + value.key} />
																	</Grid>
																	<Grid item xs={5}>
																		<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined" size="small">
																			<InputLabel htmlFor={"val" + index}>Value</InputLabel>
																			<OutlinedInput
																				id={"val" + index}
																				value={"" + value.value}
																				size="small"
																				type={variables[index] ? "text" : "password"}
																				inputProps={{
																					readOnly: true,
																				}}
																				endAdornment={
																					<InputAdornment position="end">
																						<IconButton
																							aria-label="toggle password visibility"
																							id={"var" + index}
																							onClick={() => handleClickShowValues(index)}
																							onMouseDown={handleMouseDownVariable}
																							edge="end"
																						>
																							{variables[index] ? <Visibility /> : <VisibilityOff />}
																						</IconButton>
																					</InputAdornment>
																				}
																				labelWidth={45}
																			/>
																		</FormControl>
																	</Grid>
																</Grid>
																<ListItemSecondaryAction>
																	<div onClick={() => deleteVariable(index)}>
																		<IconButton edge="end" aria-label="delete">
																			<DeleteIcon />
																		</IconButton>
																	</div>
																</ListItemSecondaryAction>
															</ListItem>
														);
													} else {
														return (
															<ListItem key={uuidv4()}>
																<Grid container className={classes.root_grid}>
																	<Grid item xs={1}>
																		<ListItemText primary={"Type: " + value.type} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Origin: " + value.origin} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Environment: " + value.environment} />
																	</Grid>
																	<Grid item xs={2}>
																		<ListItemText primary={"Key: " + value.key} />
																	</Grid>
																	<Grid item xs={5}>
																		<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined" size="small">
																			<InputLabel htmlFor={"val" + index}>Value</InputLabel>
																			<OutlinedInput id={"val" + index} value={"" + value.value} disabled size="small" type={"text"} labelWidth={45} />
																		</FormControl>
																	</Grid>
																</Grid>
																<ListItemSecondaryAction>
																	<div onClick={() => deleteVariable(index)}>
																		<IconButton edge="end" aria-label="delete">
																			<DeleteIcon />
																		</IconButton>
																	</div>
																</ListItemSecondaryAction>
															</ListItem>
														);
													}
												})}
											</List>
										</div>
									</Grid>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<DialogTitle id="max-width-dialog-title">Ingress</DialogTitle>
									<Divider />
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={11}>
									<TextField id="ingressAdd" label="Ingress" className={classes.textField} margin="normal" variant="outlined" />
								</Grid>
								<Grid item xs={12} sm={1}>
									<Box display="flex" alignItems="flex-start" justifyContent="center" m={1} sx={{ height: 100 }}>
										<div onClick={agregarIngressAdd}>
											<Fab size="medium" color="primary" aria-label="add">
												<AddIcon />
											</Fab>
										</div>
									</Box>
								</Grid>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Divider />
										<Typography variant="h6" component="h6" gutterBottom>
											Lista de Ingress
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<div className={classes.demo}>
											<List>
												{ingressList.map((value, index) => (
													<ListItem key={uuidv4()}>
														<ListItemText primary={value} />
														<ListItemSecondaryAction>
															<div onClick={() => deleteIngressAdd(index)}>
																<IconButton edge="end" aria-label="delete">
																	<DeleteIcon />
																</IconButton>
															</div>
														</ListItemSecondaryAction>
													</ListItem>
												))}
											</List>
										</div>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<button
							type="submit"
							className="btn btn-success mr-2"
							disabled={
								formikForAdd.isSubmitting || (formikForAdd.touched && !formikForAdd.isValid)
							}
							>
								<FormattedMessage id="GLOBAL.WORD.SAVE"/>
								{formikForAdd.isSubmitting}
							</button>
							<button onClick={handleCloseMicroServiceAdd} className="btn btn-default mr-2">
								<FormattedMessage id="GLOBAL.WORD.CLOSE" />
							</button>
						</DialogActions>
					</form>
				</Dialog>
			)}
			{microservicesecrets !== undefined && openMicroServiceSecrets && microservicesingress !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={maxWidthLG} open={openMicroServiceSecrets} onClose={handleCloseMicroServiceSecrets} aria-labelledby="max-width-dialog-title">
					<DialogContent>
						<DialogTitle id="max-width-dialog-title">
							<FormattedMessage id="GLOBAL.WORD.INTERFACE.MICROSERVICES" /> - [{microservicesdetail.fcMsos[0].fcDepartamento}] - [{microservicesingress.fcWorkload}]
						</DialogTitle>

						<DialogContentText>
							<strong>
								<FormattedMessage id="GLOBAL.WORD.MICROSERVICE.DETAIL" /> {microservicesingress.fcWorkload}
							</strong>
						</DialogContentText>

						<strong>Secrets Desarrollo</strong>
						{/* begin::results */}
						<div className="form-group row">{secretsDev !== undefined && <MicroServicesTable key={secretsDev.name} data={secretsDev} />}</div>
						{/* end::results */}

						<strong>Secrets Producción</strong>
						{/* begin::results */}
						<div className="form-group row">{secretsProd !== undefined && <MicroServicesTable key={secretsProd.name} data={secretsProd} />}</div>
						{/* end::results */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseMicroServiceSecrets} color="primary">
							<FormattedMessage id="GLOBAL.WORD.CLOSE" />
						</Button>
					</DialogActions>
				</Dialog>
			)}
			{microserviceconfigmaps !== undefined && openMicroServiceConfigmaps && microservicesingress !== undefined && (
				<Dialog fullWidth={fullWidth} maxWidth={maxWidthLG} open={openMicroServiceConfigmaps} onClose={handleCloseMicroServiceConfigmaps} aria-labelledby="max-width-dialog-title">
					<DialogContent>
						<DialogTitle id="max-width-dialog-title">
							<FormattedMessage id="GLOBAL.WORD.INTERFACE.MICROSERVICES" /> - [{microservicesdetail.fcMsos[0].fcDepartamento}] - [{microservicesingress.fcWorkload}]
						</DialogTitle>

						<DialogContentText>
							<strong>
								<FormattedMessage id="GLOBAL.WORD.MICROSERVICE.DETAIL" /> {microservicesingress.fcWorkload}
							</strong>
						</DialogContentText>

						<strong>Secrets Desarrollo</strong>
						{/* begin::results */}
						<div className="form-group row">{configmapsDev !== undefined && <MicroServicesTable key={configmapsDev.name} data={configmapsDev} />}</div>
						{/* end::results */}

						<strong>Secrets Producción</strong>
						{/* begin::results */}
						<div className="form-group row">{configmapsProd !== undefined && <MicroServicesTable key={configmapsProd.name} data={configmapsProd} />}</div>
						{/* end::results */}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseMicroServiceConfigmaps} color="primary">
							<FormattedMessage id="GLOBAL.WORD.CLOSE" />
						</Button>
					</DialogActions>
				</Dialog>
			)}
			
		</>
	);
}
