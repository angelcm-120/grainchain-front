import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { DropdownMenuAmbient } from './DropdownMenuAmbient'
import {DropdownMenuDB} from './DropdownMenuDB'
import { Dropdown } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useStyles } from "../Style/CycMovil_Style"


export function DropDownAmbient({handleChange}) {    
    const classes = useStyles();
    const [ambient, setAmbient] = React.useState("Prod Int")
    const [state, setState] = React.useState({
        ambient: null
    });

  
    function handleChangeInner(server) {
        //const { hostname, port, protocol, text } = server
        const {text } = server
        setState({
            ...state,
            [ambient]: server,
        });
        setAmbient(text)
    }

    return (<>
        <FormControl className={classes.formControl} noValidate>
            <Dropdown className="dropdown-inline" drop="down" alignRight>
                <Dropdown.Toggle
                    id="dropdown-ambiente"
                    variant="transparent"
                    className="btn btn-light-primary btn-sm font-weight-bolder dropdown-toggle">
                    <FormattedMessage id="PORTAL.DROPDOWN.ENVIROMENT" /> : {ambient}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <DropdownMenuAmbient id="ambient" handleChange={handleChange} handleChangeInner={handleChangeInner} />
                </Dropdown.Menu>
            </Dropdown>
        </FormControl>
    </>)
}



export function DropDownDB({handleChange}) {    
    const classes = useStyles();
    const [db, setDB] = React.useState("db_adnhandheld")
    const [state, setState] = React.useState({
        db: null
    });

    
    function handleChangeInner(server) {            
        const {db } = server
        setState({
            ...state,
            [db]: server,
        });
       setDB(db)
    }
 
    return (<>
        <FormControl className={classes.formControl} noValidate>
            <Dropdown className="dropdown-inline" drop="down" alignRight>
                <Dropdown.Toggle
                    id="dropdown-db"
                    variant="transparent"
                    className="btn btn-light-primary btn-sm font-weight-bolder dropdown-toggle">
                    <FormattedMessage id="PORTAL.DROPDOWN.DB" /> : {db}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <DropdownMenuDB id="db" handleChange={handleChange} handleChangeInner={handleChangeInner} />
                </Dropdown.Menu>
            </Dropdown>
        </FormControl>
    </>)
}