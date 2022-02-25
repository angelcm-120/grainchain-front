/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { FormattedMessage } from "react-intl";
import {
    dev_hostname, dev_port, dev_protocol,
    cnbv_dev_hostname, cnbv_dev_port, cnbv_dev_protocol,
    cnbv_int_hostname, cnbv_int_port, cnbv_int_protocol,
    cnbv_qa_hostname, cnbv_qa_port, cnbv_qa_protocol,
    prod_dmz_hostname, prod_dmz_port, prod_dmz_protocol,
    prod_int_hostname, prod_int_port, prod_int_protocol,
    dev_text, cnbv_dev_text, cnbv_int_text, cnbv_qa_text,
    prod_dmz_text, prod_int_text
} from '../../Network/Config'
import { shallowEqual, useSelector } from "react-redux";

export function DropdownMenuAmbient({ handleChange, handleChangeInner }) {
    const user = useSelector((state) => state.auth.user, shallowEqual);

    return <>
        {/*begin::Navigation*/}
        <ul className="navi navi-hover">
            <li className="navi-header pb-1">
                <span className="text-primary text-uppercase font-weight-bold font-size-sm"><FormattedMessage id="PORTAL.DROPDOWN.SELECT" />:</span>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ hostname: dev_hostname, port: dev_port, protocol: dev_protocol, text: dev_text })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ hostname: dev_hostname, port: dev_port, protocol: dev_protocol, text: dev_text })
                    }

                }}   >
                    <span className="navi-icon"><i className="fas fa-server"></i></span>
                    <span className="navi-text">{dev_text}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ hostname: cnbv_dev_hostname, port: cnbv_dev_port, protocol: cnbv_dev_protocol, text: cnbv_dev_text })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ hostname: cnbv_dev_hostname, port: cnbv_dev_port, protocol: cnbv_dev_protocol, text: cnbv_dev_text })
                    }

                }}>
                    <span className="navi-icon"><i className="fas fa-server"></i></span>
                    <span className="navi-text">{cnbv_dev_text}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ hostname: cnbv_int_hostname, port: cnbv_int_port, protocol: cnbv_int_protocol, text: cnbv_int_text })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ hostname: cnbv_int_hostname, port: cnbv_int_port, protocol: cnbv_int_protocol, text: cnbv_int_text })
                    }

                }}>
                    <span className="navi-icon"><i className="fas fa-server"></i></span>
                    <span className="navi-text">{cnbv_int_text}</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ hostname: cnbv_qa_hostname, port: cnbv_qa_port, protocol: cnbv_qa_protocol, text: cnbv_qa_text })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ hostname: cnbv_qa_hostname, port: cnbv_qa_port, protocol: cnbv_qa_protocol, text: cnbv_qa_text })
                    }

                }}>
                    <span className="navi-icon"><i className="fas fa-server"></i></span>
                    <span className="navi-text">{cnbv_qa_text}</span>
                </a>
            </li>
            
            
            <li className="navi-item" hidden={(user.roles !==1 && user.roles!==2)}>
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ hostname: prod_int_hostname, port: prod_int_port, protocol: prod_int_protocol, text: prod_int_text })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ hostname: prod_int_hostname, port: prod_int_port, protocol: prod_int_protocol, text: prod_int_text })
                    }

                }}>
                    <span className="navi-icon"><i className="fas fa-server"></i></span>
                    <span className="navi-text">{prod_int_text}</span>
                </a>
            </li>
            <li className="navi-item" hidden={(user.roles !==1 && user.roles!==2)}>
                <a href="#" className="navi-link" onClick={() => {
                    handleChange({ hostname: prod_dmz_hostname, port: prod_dmz_port, protocol: prod_dmz_protocol, text: prod_dmz_text })
                    if (handleChangeInner !== undefined) {
                        handleChangeInner({ hostname: prod_dmz_hostname, port: prod_dmz_port, protocol: prod_dmz_protocol, text: prod_dmz_text })
                    }

                }}>
                    <span className="navi-icon"><i className="fas fa-server"></i></span>
                    <span className="navi-text">{prod_dmz_text}</span>
                </a>
            </li>
        </ul>
        {/*end::Navigation*/}
    </>
}
