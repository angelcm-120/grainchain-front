import { serverExpress } from "../../../redux/config";
import { default_body, default_auth, default_cType } from "./Config";
import { v4 as uuidv4 } from "uuid";

const express = `${serverExpress}requests`;
const contracts = `${serverExpress}contracts`;
const microservices = `${serverExpress}microservices`;
const departments = `${serverExpress}departments`;
const bazstore = `${serverExpress}bazstore`;
const querys = `${serverExpress}querys`;
const secure = `${serverExpress}secure`;
const users = `${serverExpress}users`;
const mail = `${serverExpress}email`;
const menus = `${serverExpress}menus`;

function svc_monitorcollection(dev_hostname, dev_port, dev_protocol) {
	return (
		'{"protocol":"' +
		dev_protocol +
		'","hostname":"' +
		dev_hostname +
		'","port":"' +
		dev_port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/Indicadores/Monitoreos/monitorCobranza/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		default_body +
		'","decode":true}'
	);
}

function svc_monitorcredit(dev_hostname, dev_port, dev_protocol) {
	return (
		'{"protocol":"' +
		dev_protocol +
		'","hostname":"' +
		dev_hostname +
		'","port":"' +
		dev_port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/Indicadores/Monitoreos/monitorInvestigacion/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		default_body +
		'","decode":true}'
	);
}

function svc_getValuestoRestart(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/Rendimientos/Servicios/obtengestiones/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_applyRestarValues(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/Rendimientos/Servicios/reiniciovalor/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_executeQuery(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/DAOS/Servicios/consulta/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_binnacles(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/Rendimientos/Servicios/obtenfechasbitacora/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_binnacle(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/Rendimientos/Servicios/obtenbitacora/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_registerNewApp(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/registraaplicacion/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getCatalogueApps(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtenaplicaciones/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_registerNewVersion(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/registraversion/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getJobPosition(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtenpuestos/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_registerJobXAplication(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/registrapuestoxaplicacion/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getCatalogueVersions(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtenversiones/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getManagementChange(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtencambiosgerencias/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getRegionsChange(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtencambiosregiones/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getPlateChange(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtencambiostest/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_registerAssignVersion(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/registracambio/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getCountries(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtenpaises/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getRegions(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtenregiones/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function svc_getManagement(host, port, protocol, body) {
	return (
		'{"protocol":"' +
		protocol +
		'","hostname":"' +
		host +
		'","port":"' +
		port +
		'","method":"POST","path":"/CyC/Cobranza-Relacional/BazStore/Servicios/obtengerencias/v1","headers":{"Authorization":"' +
		default_auth +
		'","Content-Type":"' +
		default_cType +
		'"},"params":"' +
		body +
		'","decode":true}'
	);
}

function getCatalogueApps(ambient, accessToken, device) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={   "dispositivo": {     "dispositivo":' + device + "  } }";
	const svc = svc_getCatalogueApps(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getJob(ambient, accessToken) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"noEmpleado":"000000"}';
	const svc = svc_getJobPosition(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getInfoDeparments() {
	return fetch(departments + "/info", {});
}

function registerJobXAplication(ambient, accessToken, job, catalogue) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"puesto":{"puesto":' + job + '},"aplicacion":{"aplicacion":' + catalogue + "}}";
	const svc = svc_registerJobXAplication(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getCatalogueVersions(ambient, accessToken, device) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={   "dispositivo": {     "dispositivo":' + device + "  } }";
	const svc = svc_getCatalogueVersions(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getManagementChange(ambient, accessToken) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"noEmpleado":"000000"}';
	const svc = svc_getManagementChange(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getRegionsChange(ambient, accessToken) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"noEmpleado":"000000"}';
	const svc = svc_getRegionsChange(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getPlateChange(ambient, accessToken) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"noEmpleado":"000000"}';
	const svc = svc_getPlateChange(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function findAppsxUser(user) {
	return fetch(bazstore + "/appsxuser?us=" + user.id, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function registerAssignVersion(ambient, accessToken, typeAssignment, plate, distributionDate, version, region, management) {
	const { hostname, port, protocol } = ambient;
	const request =
		'peticion={"noEmpleado":"000000","noPlaca":"0000000","bazstore":{"cambio":{"tipoCambio":"' +
		typeAssignment +
		'","noPlaca":"' +
		plate +
		'","fechaDistribucion":"' +
		distributionDate +
		'","version":{"versionId":' +
		version +
		'},"region":{"region":' +
		region +
		'},"gerencia":{"region":{"region":' +
		region +
		'},"gerencia":' +
		management +
		"}}}}";
	const svc = svc_registerAssignVersion(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getCountries(ambient, accessToken) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"noEmpleado":"000000"}';
	const svc = svc_getCountries(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getRegions(ambient, accessToken, country) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"gerencia":{"pais":{"pais":' + country + "}}}";
	const svc = svc_getRegions(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getManagement(ambient, accessToken, country, region) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"gerencia":{"pais":{"pais":' + country + '},"region":{"pais":{"pais":' + country + '},"region":' + region + "}}}";
	const svc = svc_getManagement(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function registerNewApp(ambient, accessToken, device, name, description) {
	const { hostname, port, protocol } = ambient;
	const request =
		'peticion={"bazstore":{"cambio":{"dispositivo":{"dispositivo":"' +
		device +
		'"}},"aplicacion":{"aplicacion":1,"nombre":"' +
		name +
		'","descripcion":"' +
		description +
		'"}}}';
	const svc = svc_registerNewApp(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function registerNewVersion(ambient, accessToken, version, description, catalogue) {
	const { hostname, port, protocol } = ambient;
	const request =
		'peticion={"bazstore":{"cambio":{"hash":"' +
		uuidv4() +
		'","version":{"version":' +
		version +
		',"descripcion":"' +
		description +
		'"}},"aplicacion":{"aplicacion":' +
		catalogue +
		"}}}";

	const svc = svc_registerNewVersion(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));

	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getBinnacle(server, accessToken, employee, date) {
	const { hostname, port, protocol } = server;
	const request = 'peticion={"noEmpleado":"' + employee + '","rendimientos":{"bitacora":{"fecha":"' + date + '","id":100}}}';
	const svc = svc_binnacle(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));

	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getBinnacles(server, accessToken, employee) {
	const { hostname, port, protocol } = server;
	const request = 'peticion={"noEmpleado":"' + employee + '","rendimientos":{"bitacora":{"id":100}}}';
	const svc = svc_binnacles(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));

	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getexecuteQuery(server, accessToken, db, query) {
	const { hostname, port, protocol } = server;

	const request =
		'peticion={"noEmpleado":"000000","daos":{"db":"' +
		db +
		'","tipoConsulta":"db_funcion","consulta":"","funcion":"' +
		encodeURIComponent(Buffer.from(query, "utf-8").toString("base64")) +
		'"}}';
	const svc = svc_executeQuery(hostname, port, protocol, encodeURIComponent(Buffer.from(request, "utf-8").toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getValuestoRestart(ambient, employee, accessToken) {
	const { hostname, port, protocol } = ambient;
	const request = 'peticion={"noEmpleado":"' + employee + '","rendimientos":{"tienda":{"tipoGestion":"cobranza"}}}';
	const svc = svc_getValuestoRestart(hostname, port, protocol, encodeURIComponent(Buffer.from(request).toString("base64")));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function applyRestartValues(ambient, gestion, accessToken) {
	let employee = "";
	let ids = "";
	const { hostname, port, protocol } = ambient;
	gestion.forEach((gestionAux) => {
		employee = gestionAux.fcEmpNo;
		ids += (ids.length > 0 ? "," : "") + gestionAux.fiIdGestion;
	});
	const request =
		'peticion={"noEmpleado":"' +
		employee +
		'","rendimientos":{"reiniciosValores":{"noEmpleado":' +
		employee +
		',"descripcion":"Reinicio de Dispositivos Moviles","tipoReinicioValor":"Moviles","gestionesReiniciar":[' +
		ids +
		"]}}}";
	const svc = svc_applyRestarValues(hostname, port, protocol, Buffer.from(request).toString("base64"));
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function sendmail(emailObj, accessToken) {
	return fetch(`${mail}/send?from=${emailObj.from}&to=${emailObj.to}&subject=${emailObj.subject}&body=${emailObj.body}`, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});
}

function getServices(user) {
	return fetch(contracts + "/servicesdept?us=" + user.id + "&dept=" + user.fiIdDepartamento, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getServicesAdmin(user) {
	return fetch(contracts + "/servicesadmin", {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getInfoServiceEdit(service, user) {
	return fetch(contracts + "/serviceinfoedit?srv=" + service, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getInfoServiceAdd(user) {
	return fetch(contracts + "/serviceinfoadd?dept=" + user.fiIdDepartamento + "&prms=" + user.roles, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function addNewService(service, user) {
	return fetch(contracts + "/newservice", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(service),
	});
}

function setServiceUpdateInfo(values, user) {
	return fetch(contracts + "/serviceinfoupdate", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(values),
	});
}

function setMethodUpdateInfo(values, user) {
	return fetch(contracts + "/methodinfoupdate", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(values),
	});
}

function setServiceAddInfo(values, user) {
	console.log(values);
	return fetch(contracts + "/serviceinfoadd", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(values),
	});
}

function getDepartamento(dept, user) {
	return fetch(microservices + "/getdepartamento?dept=" + dept, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getAllDeptos(user) {
	return fetch(microservices + "/getalldepartamentos", {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMicroServicesUser(user) {
	return fetch(microservices + "/microservicesxusers", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(user),
	});
}

function getMicroServiceDept(dept, user) {
	return fetch(microservices + "/microservicesxdept?dept=" + dept, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMicroServiceEditDept(dept, user) {
	return fetch(microservices + "/microserviceedit?dept=" + dept, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMicroServiceFQDNS(dept, user) {
	return fetch(microservices + "/microservicefqdns?dept=" + dept, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMicroServiceEditForUpdate(dept, wrk, user) {
	return fetch(microservices + "/getmicroserviceedit?dept=" + dept + "&wrk=" + wrk, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMicroServiceVariablesSC(user) {
	return fetch(microservices + "/getvariables", {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function setMicroServiceFQDNSUpdate(jsonParam, user) {
	return fetch(microservices + "/microservicefqdnupdate", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(jsonParam),
	});
}

function setMicroServiceMsoUpdate(jsonParam, user) {
	return fetch(microservices + "/microservicemsoupdate", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(jsonParam),
	});
}

function setMicroServiceMsoAdd(jsonParam, user) {
	return fetch(microservices + "/microservicemsoadd", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.accessToken,
		},
		body: JSON.stringify(jsonParam),
	});
}

function getMicroServiceIngress(dept, wrk, user) {
	return fetch(microservices + "/microservicesxingress?dept=" + dept + "&wrk=" + wrk, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMicroServiceSecretsDet(dept, wrk, id, user) {
	return fetch(microservices + "/microservicesecrets?dept=" + dept + "&wrk=" + wrk + "&id=" + id, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMicroServiceConfigmapsDet(dept, wrk, id, user) {
	return fetch(microservices + "/microserviceconfigmaps?dept=" + dept + "&wrk=" + wrk + "&id=" + id, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getmethods(id, user) {
	return fetch(contracts + "/methods?svc=" + id, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getmethodDetail(idServicio, idMetodo, user) {
	return fetch(contracts + "/method?svc=" + idServicio + "&method=" + idMetodo, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getSaveQuery(user, db, titulo, descripcion, fecha, query) {
	return fetch(
		querys +
			"/addFavorite?us=" +
			user.id +
			"&db=" +
			db +
			"&titulo=" +
			titulo +
			"&descripcion=" +
			descripcion +
			"&fecha=" +
			fecha +
			"&query=" +
			Buffer.from(query, "utf-8").toString("base64"),
		{
			headers: {
				Authorization: "Bearer " + user.accessToken,
			},
		}
	);
}

function getFavorites(db, user) {
	return fetch(querys + "/favorites?us=" + user.id + "&db=" + db, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMenuxUser(user) {
	return fetch(`${menus}/menuxuser?us=${user.id}`, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getNewAccessToken(user) {
	return fetch(`${users}/renewToken?us=${user.username}`, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMonitor(svc, user) {
	return fetch(express + "?body=" + svc, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getQR2FA(user) {
	return fetch(secure + "/2fa?email=" + user.email, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function enableMFA(user) {
	return fetch(`${users}/enable2FA?us=${user.email}`, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function disableMFA(user) {
	return fetch(`${users}/disable2FA?us=${user.email}`, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function verifyR2FA(user, token) {
	return fetch(secure + "/verify2fa?email=" + user.email + "&token=" + token, {
		headers: {
			Authorization: "Bearer " + user.accessToken,
		},
	});
}

function getMonitorCollection(dev_hostname, dev_port, dev_protocol) {
	return svc_monitorcollection(dev_hostname, dev_port, dev_protocol);
}

function getMonitorCredit(dev_hostname, dev_port, dev_protocol) {
	return svc_monitorcredit(dev_hostname, dev_port, dev_protocol);
}

export {
	express,
	contracts,
	bazstore,
	querys,
	secure,
	users,
	microservices,
	getInfoServiceAdd,
	addNewService,
	getServicesAdmin,
	setServiceUpdateInfo,
	setServiceAddInfo,
	registerAssignVersion,
	getBinnacle,
	getQR2FA,
	getRegionsChange,
	getServices,
	getInfoServiceEdit,
	findAppsxUser,
	getCatalogueApps,
	getCatalogueVersions,
	getCountries,
	getManagement,
	getDepartamento,
	getMicroServiceEditDept,
	getMicroServiceFQDNS,
	setMicroServiceFQDNSUpdate,
	getMicroServiceEditForUpdate,
	setMicroServiceMsoUpdate,
	setMicroServiceMsoAdd,
	getAllDeptos,
	getMicroServiceSecretsDet,
	getMicroServiceConfigmapsDet,
	getMicroServiceVariablesSC,
	getMonitorCollection,
	getMonitorCredit,
	getRegions,
	applyRestartValues,
	disableMFA,
	enableMFA,
	getBinnacles,
	getexecuteQuery,
	getMicroServicesUser,
	getMicroServiceDept,
	getMicroServiceIngress,
	getFavorites,
	getInfoDeparments,
	getJob,
	getManagementChange,
	getMenuxUser,
	getmethodDetail,
	getmethods,
	getMonitor,
	getNewAccessToken,
	getPlateChange,
	getSaveQuery,
	getValuestoRestart,
	registerJobXAplication,
	registerNewApp,
	registerNewVersion,
	setMethodUpdateInfo,
	sendmail,
	verifyR2FA,
};
