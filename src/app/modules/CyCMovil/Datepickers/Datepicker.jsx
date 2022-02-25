import React from "react";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useStyles } from "../Style/CycMovil_Style"


export function DatePicker({ display, default_date, handleChange }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        date: null
    });

    const handleChange2 = date => event => {
        setState({
            ...state,
            [date]: event.target.value,
        });
    };

    return (
        <FormControl className={classes.formControl} noValidate>
            <TextField
                id="date"
                label={display}
                type="date"
                onChange={handleChange !== undefined ? handleChange('date') : handleChange2('date')}
                defaultValue={default_date}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {/**/}
        </FormControl>
    );
}