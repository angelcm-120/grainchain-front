import React, { useEffect, useState } from 'react';
import { getMonitor } from '../../Network/Services'
import { Dropdown } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { DropdownMenuAmbient } from "../../CyCMovil/Dropdowns/DropdownMenuAmbient";
import { getMonitorCollection, getMonitorCredit } from '../../Network/Services'
import { MonitorTable } from '../Tables/MonitorTable'
import { shallowEqual, useSelector } from "react-redux";

function CardMonitor(title, handleChange, message, enviroment, body) {
    return (<>
        <div className="card card-custom">
            {/* Head */}
            <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder text-dark">
                    <FormattedMessage id={title} /></h3>
                <div className="card-toolbar">
                    <Dropdown className="dropdown-inline" drop="down" alignRight>
                        <Dropdown.Toggle
                            id="dropdown-toggle-top2"
                            variant="transparent"
                            className="btn btn-light-primary btn-sm font-weight-bolder dropdown-toggle">
                            <FormattedMessage id="PORTAL.DROPDOWN.ENVIROMENT" /> : {enviroment}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                            <DropdownMenuAmbient handleChange={handleChange} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            {/* Body */}
            {message !== undefined && <div className="card-body pt-2">
                <p>{message}</p>
            </div>}
            {body !== undefined && body}
        </div><br></br>
    </>)
}

const GetMonitor = ({ svc, title }) => {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [response, setResponse] = useState([]);
    const [enviroment, setEnviroment] = useState("Dev Local");

    function handleChange(server) {
        const { hostname, port, protocol, text } = server
        if (title === "PORTAL.TITLES.MONITORCOLLECTION") {
            svc = getMonitorCollection(hostname, port, protocol)
        } else if (title === "PORTAL.TITLES.MONITORCREDIT") {
            svc = getMonitorCredit(hostname, port, protocol)
        }

        setEnviroment(text)
        reloadMonitor()
        setIsLoaded(false)
    }

    function reloadMonitor() {
        getMonitor(svc, user)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResponse(result);
                setError(null)
            },
                // Nota: es importante manejar errores aquí y no en 
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(reloadMonitor, [])


    if (response === undefined) {
        return (CardMonitor(title, handleChange, <FormattedMessage id="PORTAL.ERROR.SERVICENOTAVAIBLE" />, enviroment))
    } else {
        if (error) {
            return (CardMonitor(title, handleChange, <FormattedMessage id="PORTAL.ERROR.INTERNALSERVERERROR" />, enviroment))
        } else if (!isLoaded) {
            return (CardMonitor(title, handleChange, <FormattedMessage id="PORTAL.DROPDOWN.LOADING" />, enviroment));
        } else {
            return (CardMonitor(title, handleChange, undefined, enviroment, <div className="card-body pt-2">
                <p>{response.servicio}</p>
                <p>{response.codigo}</p>
                <p>{response.descripcion}</p>
                <p>{response.httpStatus}</p>
                <MonitorTable data={response}></MonitorTable>
            </div>));
        }
    }


}


export {
    GetMonitor
}