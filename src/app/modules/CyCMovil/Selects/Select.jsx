import React from "react";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useStyles } from "../Style/CycMovil_Style"
import { FormattedMessage } from "react-intl";



export function SelectDevice() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        device: 'None'
    });

    const [isNone, setNone] = React.useState(true);

    const handleChange = device => event => {
        if (event.target.value === 0) {
            setNone(true);
        } else {
            setNone(false);
        }
        setState({
            ...state,
            [device]: event.target.value,
        });
    };

    return <>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-native">Device</InputLabel>
            <NativeSelect
                value={state.name}
                onChange={handleChange('device')}
                name="device"
                input={<Input id="name-native" />}
            >
                <option value="0" >None</option>
                <optgroup label="IOS">
                    <option value="1">Iphone</option>
                    <option value="2">Ipad</option>
                </optgroup>
                <optgroup label="Android">
                    <option value="3">PAX</option>
                </optgroup>
            </NativeSelect>

            {isNone && <FormHelperText>Select a device</FormHelperText>}

            {/**/}
        </FormControl>
    </>
}

export function SelectAssigment() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        assigment: 'None'
    });

    const [isNone, setNone] = React.useState(true);

    const handleChange = assigment => event => {
        if (event.target.value === 0) {
            setNone(true);
        } else {
            setNone(false);
        }
        setState({
            ...state,
            [assigment]: event.target.value,
        });
    };

    return <>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-native">Assigment</InputLabel>
            <NativeSelect
                value={state.name}
                onChange={handleChange('assigment')}
                name="assigment"
                input={<Input id="name-native" />}
            >
                <option value="0" >None</option>
                <option value="1" >Region</option>
                +
                <option value="2" >Managment</option>
                <option value="3" >Plaque</option>
            </NativeSelect>

            {isNone && <FormHelperText>Select an assigment</FormHelperText>}

            {/**/}
        </FormControl>
    </>
}
 

export function SelectDepartments({setDeparmentParent}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        assigment: 'None'
    }); 
    const [isNone, setNone] = React.useState(true);

    const handleChange = assigment => event => {
        if (event.target.value === 0) {
            setNone(true);
        } else {
            setNone(false); 
            if (setDeparmentParent!=null){
                setDeparmentParent(event.target.value)
            }
        }
        setState({
            ...state,
            [assigment]: event.target.value,
        });
    };

    return <>
        <FormControl className={classes.select}>
            <InputLabel htmlFor="name-native"> <FormattedMessage id="GLOBAL.WORD.DEPARTMENT" /></InputLabel>
            <NativeSelect
                value={state.name}
                onChange={handleChange('assigment')}
                name="department"
                input={<Input id="name-native" />} 
            >
                <option value="0" >NA</option>
                <option value="11" >Bienes adjudicados y legal</option>
                <option value="12" >Cartografía y zonificación</option>
                <option value="10" >Cobranza Legal</option>
                <option value="8" >Cobranza Relacional</option>
                <option value="9" >Cobranza Vencida</option>
                <option value="14" >Contact Center</option>
                <option value="5" >DB SQL Alnova</option>
                <option value="1" >Dispositivos Móviles</option>
                <option value="15" >Garantias y RMD</option>
                <option value="7" >Gobierno de APIS</option>
                <option value="2" >Operaciones Unix</option>
                <option value="4" >Operaciones Unix DRP</option>   
                <option value="3" >Operaciones Windows</option>
                <option value="6" >Operaciones Windows DRP</option>                                                
                <option value="16" >Planes de pago</option>
                <option value="18" >Plataforma Cloud</option>
                <option value="17" >Regional</option>
                <option value="13" >Unidad Avante</option>

            </NativeSelect>

            {isNone && <FormHelperText><FormattedMessage id="GLOBAL.WORD.DEPARTMENT.SELECT" /></FormHelperText>}

            {/**/}
        </FormControl>
    </>
}

