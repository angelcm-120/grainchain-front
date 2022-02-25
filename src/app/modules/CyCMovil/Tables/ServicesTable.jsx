import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from 'clsx';
import { v4 as uuidv4 } from "uuid";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination, TableFooter } from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Checkbox from "@material-ui/core/Checkbox";
import LastPageIcon from "@material-ui/icons/LastPage";
import { FormattedMessage } from "react-intl";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	root2: {
		flexGrow: 1,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	paper: {
		marginTop: theme.spacing(3),
		width: "100%",
		overflowX: "auto",
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: "100%",
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
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const useStyles2 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(2.5),
	},
}));

const buttonStyle = makeStyles((theme) => ({
	btndownload: {
		"background-color": "Transparent",
		"background-repeat": "no-repeat",
		border: "none",
		cursor: "pointer",
		overflow: "hidden",
		outline: "none",
	},
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
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
				{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Next Page">
				{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Last Page">
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

function ServicesTable({ data, getDetailService, btnM }) {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	function Headers({ name, data }) {
		let columns = [];
		try {
			if (name === "services") {
				columns.push("");
			}
			Object.keys(data[0]).forEach(function(key) {
				if (key !== "check" && key !== "checkM" && key !== "fiIdServicio") {
					columns.push(key);
				}
			});
		} catch (Exception) {
			columns = [];
		}

		if (columns?.length > 0) {
			return columns.map((column) => (
				<TableCell key={column}>
					<strong>{column}</strong>
				</TableCell>
			));
		} else {
			return <></>;
		}
	}

	function Rows({ data, getDetailService, name }) {
		const classbutton = buttonStyle();
		let rows = [];
		let btn = document.getElementById("editBtnService");

		try {
			Object.keys(data).forEach(function(key) {
				rows.push(data[key]);
			});
		} catch (Exception) {
			rows = [];
		}

		const [checkedState, setCheckedState] = useState(new Array(rows?.length).fill(false));
		const [disabledState, setDisabledState] = useState(new Array(rows?.length).fill(false));

		const handleOnChange = (position, row) => {
			const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
			const updatedDisabledState = disabledState.map((item, index) => (index !== position ? !item : item));
			for (let i = 0; i < updatedCheckedState.length; i++) {
				if (updatedCheckedState[i] === true || updatedDisabledState[i] === true) {
					btn.value = row.fiIdServicio;
					btn.classList.remove("Mui-disabled");
					btn.disabled = false;
				} else {
					btn.classList.add("Mui-disabled");
				}
			}
			setCheckedState(updatedCheckedState);
			setDisabledState(updatedDisabledState);
		};
		if (rows?.length > 0) {
			return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, indexR) => {
				let values = [];
				Object.keys(row).forEach(function(key) {
					if(key !== "fiIdServicio"){
						values.push(row[key]);						
					}
				});
				return (
					<TableRow key={uuidv4()}>
						{values.map((value) => {
							if (value === "check" && getDetailService !== undefined) {
								return (
									<TableCell key={uuidv4()}>
										<Checkbox
											disabled={disabledState[indexR]}
											checked={checkedState[indexR]}
											color="primary"
											onChange={() => handleOnChange(indexR, row)}
											value={row}
											inputProps={{ "aria-label": "primary checkbox" }}
										/>
									</TableCell>
								);
							} else {
								return null;
							}
						})}
						{values.map((value) => {
							if (value !== "check" && value !== "checkM") {
								if (value?.isImg || value?.toString()?.includes("data:image/jpeg;base64")) {
									return (
										<TableCell key={uuidv4()}>
											<img id={uuidv4()} src={value} alt="" />
										</TableCell>
									);
								} else {
									return <TableCell key={uuidv4()}> {""+value} </TableCell>;
								}
							} else {
								return null;
							}
						})}
						{getDetailService !== undefined && name !== "Tabla de Métodos para editar" && (
							<TableCell>
								<button type="button" className={classbutton.btndownload} onClick={getDetailService} value={row}>
									<img
										id={row.fiIdServicio !== undefined ? row.fiIdServicio : row.fiIdMetodo !== undefined ? row.fiIdMetodo : undefined}
										src={toAbsoluteUrl("/media/svg/icons/Text/Bullet-list.svg")}
										alt="">
									</img>
								</button>
							</TableCell>
						)}
						{getDetailService !== undefined && name === "Tabla de Métodos para editar" && (
							<TableCell>
								<button type="button" className={classbutton.btndownload} onClick={getDetailService} value={row}>
									<img
										id={row.fiIdServicio + "|" + row.fiIdMetodo}
										src={toAbsoluteUrl("/media/svg/icons/General/Edit.svg")}
										alt="">
									</img>
								</button>
							</TableCell>
						)}
					</TableRow>
				);
			});
		} else {
			return <></>;
		}
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
	}

	function createTable(table, getDetailService) {
		return (
			<div key={table.name}>
				<Table key={table.name} className={classes.table} size="small">
					<TableHead>
						<TableRow>
							<Headers name={table.name} data={table.data}></Headers>
							{getDetailService !== undefined && table.name !== "Tabla de Métodos para editar" && (
								<TableCell key={uuidv4()}>
									<strong>
										<FormattedMessage id="GLOBAL.WORD.DETAIL" />{" "}
									</strong>
								</TableCell>
							)}
							{getDetailService !== undefined && table.name === "Tabla de Métodos para editar" && (
								<TableCell key={uuidv4()}>
									<strong>
										<FormattedMessage id="GLOBAL.WORD.EDITING" />{" "}
									</strong>
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						<Rows data={table.data} getDetailService={getDetailService} name={table.name}></Rows>
					</TableBody>
					{table?.data?.length > 5 && (
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 50, 100, 1000, 10000, 50000]}
									colSpan={12}
									count={table.data.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											"aria-label": <FormattedMessage id="GLOBAL.WORD.ROWSPERPAGE" />,
										},
										native: true,
									}}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					)}
				</Table>
			</div>
		);
	}

	function TableCyCMovil({ data }) {
		try {
			if (data !== undefined) {
				return createTable(data, getDetailService);
			} else {
				return <></>;
			}
		} catch (Exception) {
			return <></>;
		}
	}

	return (
		<div key={data.name} className={classes.root}>
			<Paper key={data.name} className={classes.paper}>
				<TableCyCMovil key={data.name} data={data} getDetailService={getDetailService}></TableCyCMovil>
			</Paper>
		</div>
	);
}

function MicroServicesTable({ data, getDetailMicroService }) {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	function Headers({ name, data }) {
		let columns = [];
		try {
			if (name === "microservicesxuser") {
				columns.push("");
			}
			Object.keys(data[0]).forEach(function(key) {
				if (key !== "fiIdDepartamento" && key !== "fi_id" && key !== "id" && key !== "fcSecrets" && key !== "fcConfigmaps" && key !== "check" && key !== "_id") {
					columns.push(key);
				}
				
			});
		} catch (Exception) {
			columns = [];
		}

		if (columns?.length > 0) {
			return columns.map((column) => (
				<TableCell key={column}>
					<strong>{column}</strong>
				</TableCell>
			));
		} else {
			return <></>;
		}
	}

	function Rows({ name, data, getDetailMicroService }) {
		const classbutton = buttonStyle();
		let rows = [];
		let btn = document.getElementById("editBtn");

		try {
			Object.keys(data).forEach(function(key) {
				rows.push(data[key]);
			});
		} catch (Exception) {
			rows = [];
		}

		const [checkedState, setCheckedState] = useState(new Array(rows?.length).fill(false));
		const [disabledState, setDisabledState] = useState(new Array(rows?.length).fill(false));

		const handleOnChange = (position, row) => {
			const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
			const updatedDisabledState = disabledState.map((item, index) => (index !== position ? !item : item));
			for (let i = 0; i < updatedCheckedState.length; i++) {
					if (updatedCheckedState[i] === true || updatedDisabledState[i] === true) {
					btn.value = row.fiIdDepartamento;
					btn.classList.remove("Mui-disabled");
					btn.disabled = false;
				} else {
					btn.classList.add("Mui-disabled");
				}
			}
			setCheckedState(updatedCheckedState);
			setDisabledState(updatedDisabledState);
		};

		const [valuesSecretsDev, setValuesSecretsDev] = useState(new Array(rows?.length).fill(false));

		const [valuesSecretsProd, setValuesSecretsProd] = useState(new Array(rows?.length).fill(false));

		const handleClickShowPasswordDev = (i) => {
			const updatedPass = []
			valuesSecretsDev.map((item, index) => {
				if(index === i) {
					updatedPass.push(!item);
				} else {
					updatedPass.push(item);

				} return 1;
			});

			setValuesSecretsDev(updatedPass);
		};

		const handleClickShowPasswordProd = (i) => {
			const updatedPass = []
			valuesSecretsProd.map((item, index) => {
				if(index === i) {
					updatedPass.push(!item);
				} else {
					updatedPass.push(item);

				} return 1;
			});

			setValuesSecretsProd(updatedPass);
		};
	
		const handleMouseDownPassword = (event) => {
			event.preventDefault();
		};

		if (rows?.length > 0) {
			return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, indexR) => {
				let values = [];
				Object.keys(row).forEach(function(key) {
					if (key !== "fiIdDepartamento" && key !== "fi_id" && key !== "id" && key !== "fcSecrets" && key !== "fcConfigmaps" && key !== "_id") {
						values.push(row[key]);
					}
				});

				return (
					<TableRow key={uuidv4()}>
						{values.map((value) => {
							if (value === "check" && getDetailMicroService !== undefined) {
								return (
									<TableCell key={uuidv4()}>
										<Checkbox
											disabled={disabledState[indexR]}
											checked={checkedState[indexR]}
											color="primary"
											onChange={() => handleOnChange(indexR, row)}
											value={row}
											inputProps={{ "aria-label": "primary checkbox" }}
										/>
									</TableCell>
								);
							} else {
								return null;
							}
						})}

						{values.map((value, index) => {
							if (value !== "check") {
								if (value?.isImg || value?.toString()?.includes("data:image/jpeg;base64")) {
									 
									return (
										<TableCell key={uuidv4()}>
											<img id={uuidv4()} src={value} alt="" />
										</TableCell>
									);
								} else {
									if(name === "secrets_dev" && index === 1) {
										return (
											<TableCell key={uuidv4()}>
												<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined" size="small">
													<InputLabel htmlFor={"dev"+indexR}>Value</InputLabel>
													<OutlinedInput
														id={"dev"+indexR}
														value={value}
														size="small"
														inputProps={{
															readOnly: true,
														}}
														type={valuesSecretsDev[indexR] ? 'text' : 'password'}
														endAdornment={
															<InputAdornment position="end">
																<IconButton aria-label="toggle password visibility" id={"dev"+indexR} onClick={() => handleClickShowPasswordDev(indexR)} onMouseDown={handleMouseDownPassword} edge="end">
																	{valuesSecretsDev[indexR] ? <Visibility /> : <VisibilityOff />}
																</IconButton>
															</InputAdornment>
														}
														labelWidth = {45}
													/>
												</FormControl>
												<img id={uuidv4()} src={value} alt="" />
											</TableCell>
										);
									} else if(name === "secrets_prod" && index === 1) {
										return (
											<TableCell key={uuidv4()}>
												<FormControl className={clsx(classes.margin, classes.textFieldPass)} variant="outlined" size="small">
													<InputLabel htmlFor={"prod"+indexR}>Value</InputLabel>
													<OutlinedInput
														id={"prod"+indexR}
														value={value}
														size="small"
														inputProps={{
															readOnly: true,
														}}
														type={valuesSecretsProd[indexR] ? 'text' : 'password'}
														endAdornment={
															<InputAdornment position="end">
																<IconButton aria-label="toggle password visibility" id={"prod"+indexR} onClick={() => handleClickShowPasswordProd(indexR)} onMouseDown={handleMouseDownPassword} edge="end">
																	{valuesSecretsProd[indexR] ? <Visibility /> : <VisibilityOff />}
																</IconButton>
															</InputAdornment>
														}
														labelWidth = {45}
													/>
												</FormControl>
												<img id={uuidv4()} src={value} alt="" />
											</TableCell>
										);
									} else {
										return <TableCell key={uuidv4()}> {value} </TableCell>;
									}
								}
							} else {
								return null;
							}
						})}

						{getDetailMicroService !== undefined && (
							<TableCell>
								<button type="button" className={classbutton.btndownload} onClick={getDetailMicroService} value={row}>
									<img
										id={row.fiIdDepartamento !== undefined ? row.fiIdDepartamento : row.fi_id !== undefined ? row.fi_id : undefined}
										src={name !== "msos_edit" ? toAbsoluteUrl("/media/svg/icons/Text/Bullet-list.svg") : toAbsoluteUrl("/media/svg/icons/General/Edit.svg")}
										alt=""
									></img>
								</button>
							</TableCell>
						)}
					</TableRow>
				);
			});
		} else {
			return <></>;
		}
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
	}

	function createTable(table, getDetailMicroService) {
		return (
			<div key={table.name}>
				<Table key={table.name} className={classes.table} size="small">
					<TableHead>
						<TableRow>
							<Headers name={table.name} data={table.data}></Headers>
							{getDetailMicroService !== undefined && (
								<TableCell key={uuidv4()}>
									<strong>
										<FormattedMessage id={table.name !== "msos_edit" ? "GLOBAL.WORD.DETAIL" : "GLOBAL.WORD.EDITION"} />{" "}
									</strong>
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						<Rows name={table.name} data={table.data} getDetailMicroService={getDetailMicroService}></Rows>
					</TableBody>
					{table?.data?.length > 5 && (
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 50, 100, 1000, 10000, 50000]}
									colSpan={12}
									count={table.data.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											"aria-label": <FormattedMessage id="GLOBAL.WORD.ROWSPERPAGE" />,
										},
										native: true,
									}}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					)}
				</Table>
			</div>
		);
	}

	function TableCyCMovil({ data }) {
		try {
			if (data !== undefined) {
				return createTable(data, getDetailMicroService);
			} else {
				return <></>;
			}
		} catch (Exception) {
			return <></>;
		}
	}

	return (
		<div key={data.name} className={classes.root}>
			<Paper key={data.name} className={classes.paper}>
				<TableCyCMovil key={data.name} data={data} getDetailMicroService={getDetailMicroService}></TableCyCMovil>
			</Paper>
		</div>
	);
}

export { ServicesTable, MicroServicesTable };
