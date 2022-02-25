import React, { useState } from "react";
import ReactJson from 'react-json-view'
import { Notice } from "../controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../controls";
import { toAbsoluteUrl } from "../../_helpers";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";
import { getexecuteQuery, getFavorites } from '../../../app/modules/Network/Services'
import { shallowEqual, useSelector } from "react-redux";
import EditorInquiries from './Editor'
import { DropDownAmbient, DropDownDB } from '../../../app/modules/CyCMovil/Dropdowns/Dropdown'
import { DefaultTable } from '../../../app/modules/CyCMovil/Tables/DefaultTable'
import ShowFavorites from './Actions/ShowFavorites'
import SaveFavorite from './Actions/SaveFavorite'
import { replaceNewLineChars, formatQuery, copyResults } from './Utils/Format'
import { eMail } from './Utils/eMail'



export function Demo1Inquiries() {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [loading, setloading] = useState(false);
    const [isError, setisError] = useState(false);
    const [executeHidden, setExecuteHidden] = useState(true);
    const [msjError, setMsjError] = useState(false);
    const [ambient, setAmbient] = useState({ hostname: "devcycmovil", port: 8383, protocol: "http", text: "Dev Local" })
    const [db, setDB] = useState("db_adnhandheld")
    const [query, setQuery] = useState(false);
    const [favoriteQuerys, setFavoriteQuerys] = useState(undefined);
    const [state, setState] = useState({
        ambient: null,
        db: null
    });
    const [results, setResults] = useState(undefined);
    const [openFavorites, setOpenFavorites] = useState(false)
    const [openAddFavorites, setOpenAddFavorites] = useState(false)

    const initialValues = {

    };

    function handleCopyResults() {
        setloading(true)
        copyResults(results)
        setloading(false)
    }

    function handleClickFavorites() {
        setOpenFavorites(true);
    }

    function handleCloseFavorites() {
        setOpenFavorites(false);
    }

    function handleClickAddFavorites() {
        setOpenAddFavorites(true);
    }

    function handleCloseAddFavorites() {
        setOpenAddFavorites(false);
        getFavoriteQuerys()
    }

    function handleChangeAmbient(server) {
        //const { hostname, port, protocol, text } = server        
        setState({
            ...state,
            [ambient]: server,
        });
        setResults(undefined)
        setFavoriteQuerys(undefined)
        setAmbient(server)

        document.getElementById("root").click();

    }

    function handleChangeDB(server) {
        //const { hostname, port, protocol, text } = server
        const { db } = server
        setState({
            ...state,
            [db]: server,
        });
        setResults(undefined)
        setFavoriteQuerys(undefined)
        setDB(db)

        document.getElementById("root").click();
    }

    function handleSelectionChange(e, editor) {
        if (editor?.selection.getContent()?.length > 0) {
            formatQuery(editor?.selection.getContent(), setResults, setisError, setMsjError, user, setQuery, setExecuteHidden, isError)
        }
    }

    function handleEditorChange(content, editor) {
        if (content?.target?.getContent() !== undefined) {
            formatQuery(content?.target?.getContent(), setResults, setisError, setMsjError, user, setQuery, setExecuteHidden, isError)
        }
    }

    function getFavoriteQuerys() {
        setTimeout(() => {
            try {
                getFavorites(db, user)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpstatus === "OK" && result?.resultados?.length > 0) {
                            result.resultados.forEach(query => {
                                query.query = Buffer.from(query.query, 'base64').toString("utf-8")
                            })

                            const table = {
                                name: "favorites",
                                data: result.resultados
                            }
                            setFavoriteQuerys(table)
                        } else {
                            setFavoriteQuerys(table)
                        }
                    },
                        (error) => {
                            setFavoriteQuerys(undefined)
                        }
                    )
            } catch (Exception) {
                setFavoriteQuerys(undefined)
            }
        }, 1000);
    }

    function executeQuery(values, setStatus, setSubmitting) {
        setloading(true);
        setisError(false);
        setTimeout(() => {
            try {
                getexecuteQuery(ambient, user.accessToken, db, query)
                    .then(res => res.json())
                    .then((result) => {
                        if (result.httpStatus === "OK") {
                            eMail(user, ambient, query, undefined, db);
                            setloading(false);
                            setSubmitting(false);
                            setisError(false);
                            setMsjError(undefined)

                            try {
                                setResults(JSON.parse(replaceNewLineChars(Buffer.from(result.resultado, 'base64').toString("utf-8").replaceAll("<?xml version=\"1.0\" encoding=\"windows-1252\"?>","<?xml version=\\\"1.0\\\" encoding=\\\"windows-1252\\\"?>"))))
                            }
                            catch (error) {
                                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                                setisError(true);
                                setResults(result)
                            }


                        } else {
                            eMail(user, ambient, query, replaceNewLineChars(Buffer.from(result.resultado, 'base64').toString("utf-8")), db);
                            setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                            setloading(false);
                            setSubmitting(false);
                            setisError(true);
                            try {
                                setResults(JSON.parse(replaceNewLineChars(Buffer.from(result.resultado, 'base64').toString("utf-8"))))
                            }
                            catch (error) {
                                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                                setisError(true);
                                setResults(result)

                            }
                        }
                    },
                        (error) => {
                            setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                            setResults(undefined)
                            setloading(false);
                            setSubmitting(false);
                            setisError(true);
                        }
                    )
            } catch (Exception) {
                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.ERRORQUERY")
                setResults(undefined)
                setloading(false);
                setSubmitting(false);
                setisError(true);
            }


        }, 1000);
    };

    const Schema = Yup.object().shape({
        // employee: Yup.string().required(<FormattedMessage id="APP.YUP.REQUIRED.EMPLOYEE" />)

    });

    const formik = useFormik({
        initialValues,
        validationSchema: Schema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            executeQuery(values, setStatus, setSubmitting);
        },
        onReset: (values, { resetForm }) => {
            resetForm();
        },
    });

    const tables = []
    const table = {
        name: "",
        data: undefined
    }
    if (results !== undefined) {
        Object.keys(results).forEach(function (key) {
            const auxTable = { ...table }
            auxTable.name = key
            auxTable.data = results[key]
            tables.push(auxTable)
        });
    }



    if (user !== undefined && db !== undefined && favoriteQuerys === undefined) {
        getFavoriteQuerys()
    }

    return (<>
        <Notice icon="flaticon-home font-primary">
            <span>
                <FormattedMessage id="APP.NOTICES.INQUIRIES" />
            </span>
        </Notice>
        <form className="card card-custom" onSubmit={formik.handleSubmit}>
            {loading && <ModalProgressBar />}
            <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder text-dark">
                    <FormattedMessage id="GLOBAL.WORD.INQUIRIES" />
                </h3>
                <div className="card-toolbar">
                    {
                        results !== undefined && !isError && !openAddFavorites > 0 &&
                        <button
                            id="btnAddFavorites"
                            type="button"
                            className="btn btn-sm btn-success mr-2"
                            disabled={
                                formik.isSubmitting || (formik.touched && !formik.isValid)
                            }
                            onClick={handleClickAddFavorites}
                        >
                            <FormattedMessage id="APP.BUTTON.SAVE_CHANGES" />

                        </button>
                    }
                    {
                        favoriteQuerys?.data?.length > 0 &&
                        <button
                            id="btnfavorites"
                            type="button"
                            className="btn btn-sm btn-success mr-2"
                            disabled={
                                formik.isSubmitting || (formik.touched && !formik.isValid)
                            }
                            onClick={handleClickFavorites}
                        >
                            <FormattedMessage id="APP.BUTTON.FAVORITES" />

                        </button>
                    }
                    <button
                        id="btnexecute"
                        type="submit"
                        className="btn btn-sm btn-success mr-2"
                        disabled={
                            formik.isSubmitting || (formik.touched && !formik.isValid)
                        }
                        hidden={executeHidden || isError}
                    >
                        <FormattedMessage id="APP.BUTTON.EXECUTE" />
                        {formik.isSubmitting}
                    </button>
                    {results !== undefined && <button
                        id="btncopy"
                        type="button"
                        className="btn btn-sm btn-success mr-2"
                        disabled={
                            formik.isSubmitting || (formik.touched && !formik.isValid)
                        }
                        hidden={executeHidden || isError}
                        onClick={handleCopyResults}
                    >
                        <FormattedMessage id="APP.BUTTON.COPY" />
                        {formik.isSubmitting}
                    </button>}

                    <DropDownAmbient id="ambient" handleChange={handleChangeAmbient}></DropDownAmbient>
                    <DropDownDB id="db" handleChange={handleChangeDB}></DropDownDB>
                </div>
            </div>
            <div className="card-body pt-2">
                {/* begin::tinymce */}
                <div className="form-group row">
                    <EditorInquiries handleEditorChange={handleEditorChange} handleSelectionChange={handleSelectionChange}></EditorInquiries>
                </div>
                {/* end::tinymce */}
                {/* begin::Alert */}
                {msjError && (
                    <div
                        className="alert alert-custom alert-light-danger fade show mb-10"
                        role="alert"
                    >
                        <div className="alert-icon">
                            <span className="svg-icon svg-icon-3x svg-icon-danger">
                                <SVG
                                    src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}
                                ></SVG>{" "}
                            </span>
                        </div>
                        <div className="alert-text font-weight-bold">
                            <FormattedMessage id={msjError} />
                        </div>
                        <div className="alert-close" onClick={() => { }}>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">
                                    <i className="ki ki-close"></i>
                                </span>
                            </button>

                        </div>
                    </div>
                )}
                {/* end::Alert */}
                {/* begin::results */}
                <div className="form-group row">
                    {results !== undefined && <ReactJson src={results} theme="monokai" collapsed={true} enableClipboard={true} displayObjectSize={true} displayDataTypes={false} />}
                </div>
                <div id="results" className="form-group row">
                    {!isError && results !== undefined && tables?.length > 0 &&
                        tables.map((table => {
                            return <DefaultTable key={table.name} data={table} />
                        }))

                    }
                </div>
                {/* end::results */}
            </div>
        </form>
        {openFavorites && <ShowFavorites openFavorites={openFavorites} handleCloseFavorites={handleCloseFavorites} favoriteQuerys={favoriteQuerys} />}
        {openAddFavorites && <SaveFavorite openAddFavorites={openAddFavorites} handleCloseAddFavorites={handleCloseAddFavorites} db={db} query={query} setOpenAddFavorites={setOpenAddFavorites} />}

    </>);
}
