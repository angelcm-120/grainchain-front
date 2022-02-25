import React from 'react';
import {
    makeStyles,
    useTheme
} from "@material-ui/core/styles";

import { v4 as uuidv4 } from 'uuid';
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TablePagination,
    TableFooter
} from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";
import { FormattedMessage } from "react-intl";

const buttonStyle=  makeStyles(theme => ({
    btndownload: {
        "background-color": 'Transparent',
        "background-repeat":'no-repeat',
        "border": 'none',
        cursor:'pointer',
        overflow: 'hidden',
        outline:'none'
    } 
}));

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


const useStyles2 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5)
    }
}));


function TablePaginationActions(props) {
    
    const classes = useStyles2();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                        <KeyboardArrowLeft />
                    )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                        <KeyboardArrowRight />
                    )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

 

function BinnacleTable({ data,downloadBinnacle }) {
    const classbutton= buttonStyle();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function Rows({ data,downloadBinnacle }) {
        let rows = []
        try {
            Object.keys(data).forEach(function (key) {
                rows.push(data[key])
            });
        } catch (Exception) {
            rows = []
        }

        if (rows?.length > 0) {
            return rows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ).map((row) => {
                
                return (<TableRow key={uuidv4()} >
                    <TableCell  >{row}</TableCell>
                    <TableCell key={row} >
                        <button key={uuidv4()} className={classbutton.btndownload}  onClick={downloadBinnacle} value={row}><img id={row} src={toAbsoluteUrl("/media/svg/icons/Files/Download.svg")} alt="" ></img></button></TableCell>
                </TableRow>)
            })
        }
        else {
            return <></>
        }
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
    }

    
    function createTable(table,downloadBinnacle) {        
        return (
            <div key={table.name} >
                <Table key={table.name} className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell ><strong><FormattedMessage id="APP.BINNACLES.TITLES.DATES" /></strong></TableCell>
                            <TableCell ><strong><FormattedMessage id="APP.BINNACLES.TITLES.ACTIONS" /></strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Rows data={table.data.fechas} downloadBinnacle={downloadBinnacle}></Rows>
                    </TableBody>
                    {table?.data?.fechas.length > 5 && <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 50, 100]}
                                colSpan={12}
                                count={table.data.fechas.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { "aria-label": <FormattedMessage id="GLOBAL.WORD.ROWSPERPAGE" /> },
                                    native: true
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>}
                </Table>
            </div>)
    }

    function TableCyCMovil({ data }) {
        try {
            if (data !== undefined) {
                return createTable(data,downloadBinnacle)
            } else {
                return <></>
            }
        }
        catch (Exception) {
            return <></>
        }
    }

    return (
        <div key={data.name} className={classes.root}>
            <Paper key={data.name} className={classes.paper}>
                <TableCyCMovil key={data.name} data={data}></TableCyCMovil>
            </Paper>
        </div>
    );
}


export {  BinnacleTable }