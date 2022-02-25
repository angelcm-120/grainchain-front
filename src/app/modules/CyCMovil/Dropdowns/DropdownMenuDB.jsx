/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { FormattedMessage } from "react-intl";
import {
    db_adnhandheld,
    db_datagps,
    db_ektdinero,
    db_oracle,
    db_cycmovilrdn,
    db_adnmexicohhkio
} from '../../Network/DB'

export function DropdownMenuDB({ handleChange, handleChangeInner }) {
    return <>
        {/*begin::Navigation*/}
        <ul className="navi navi-hover">
            <li className="navi-header pb-1">
                <span className="text-primary text-uppercase font-weight-bold font-size-sm"><FormattedMessage id="PORTAL.DROPDOWN.SELECT" />:</span>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_adnhandheld })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_adnhandheld })
                    }

                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_adnhandheld}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_adnmexicohhkio })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_adnmexicohhkio })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_adnmexicohhkio}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_ektdinero })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_ektdinero })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_ektdinero}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_datagps })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_datagps })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_datagps}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_oracle })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_oracle })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_oracle}</span>
                </a>
            </li>            
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_cycmovilrdn })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_cycmovilrdn })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_cycmovilrdn}</span>
                </a>
            </li>
        </ul>
        {/*end::Navigation*/}
    </>
}


/*
<li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_podcast })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_podcast })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_podcast}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_notasvoz })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_notasvoz })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_notasvoz}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ db: db_notificaciones })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ db: db_notificaciones })
                    }
                }}   >
                    <span className="navi-icon"><i className="fas fa-database"></i></span>
                    <span className="navi-text">{db_notificaciones}</span>
                </a>
            </li>
*/