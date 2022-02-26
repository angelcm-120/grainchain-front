import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { TableRow, Table, TableCell, TableBody, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	pared: {
		backgroundColor: "#000000",
		height: theme.spacing(3),
		borderWidth: "1px",
		borderColor: '#000000',
	},
	bombillo: {
		backgroundColor: "#FF0000",
		height: theme.spacing(3),
		borderWidth: "0px",

	},
	iluminado: {
		backgroundColor: "#E8FF00",
		height: theme.spacing(3),
		borderWidth: "0px",
	},
	fila: {
		backgroundColor: "#E8FF00",
		height: theme.spacing(3),
		borderWidth: "2px",
		borderColor: '#3E3B3B',
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

function BombillosTabla({ data }) {
	const classes = useStyles();
	
	function Rows({ name ,data }) {
		return data.map( (fila) => {
			fila = fila.split('')
			return (
				<TableRow key={uuidv4()}>
						{fila.map((columna) => {
							if (columna === "1") {
								return (
									<TableCell className={classes.pared} key={uuidv4()}>
									</TableCell>
								);
							}
							if (columna === "2") {
								return (
									<TableCell className={classes.iluminado} key={uuidv4()}>
									</TableCell>
								);
							}
							if (columna === "3") {
								return (
									<TableCell className={classes.bombillo} key={uuidv4()}>
										Bombillo
									</TableCell>
								);
							}
						})}
				</TableRow>
			);
		})
	}

	function createTable( data ) {
		return (
			<Table key="tabla" className={classes.table} size="small">
				<TableBody>
					<Rows name="tabla" data={data}></Rows>
				</TableBody>
			</Table>
		);
	}

	function TableOfBombillos({ data }) {
		try {
			if (data !== undefined) {
				return createTable(data);
			} else {
				return <></>;
			}
		} catch (Exception) {
			return <></>;
		}
	}

	return (
		<div key="tabla" className={classes.root}>
			<TableOfBombillos key="tabla" data={data} ></TableOfBombillos>
		</div>
	);
}

export { BombillosTabla };
