import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: '100%',
    },
}));
 

function MonitorTable({ data }) {   
    if (data!==undefined && data.resultados!==undefined && data.resultados.monitorCobranza){
        data=data.resultados.monitorCobranza.cadenas
    }else if (data!==undefined && data.resultados!==undefined && data.resultados.monitorInvestigacion){
        data=data.resultados.monitorInvestigacion.cadenas
    }
    const {fiCadenasError,fiCadenasPendientes,fiCadenasProcesadas}=data
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Cadenas</TableCell>
                            <TableCell align="right">Errores</TableCell>
                            <TableCell align="right">Pendientes</TableCell>
                            <TableCell align="right">Procesadas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell component="th" scope="row"></TableCell> 
                            <TableCell align="right">{fiCadenasError}</TableCell>
                            <TableCell align="right">{fiCadenasPendientes}</TableCell>
                            <TableCell align="right">{fiCadenasProcesadas}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
 

export {  MonitorTable }