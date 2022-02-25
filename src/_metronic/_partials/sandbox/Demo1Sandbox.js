import React from "react";
import { Notice } from "../controls";
 
 
import {SelectDevice,SelectAssigment, SelectDepartments} from '../../../app/modules/CyCMovil/Selects/Select'
import {DropDownAmbient,DropDownDB} from '../../../app/modules/CyCMovil/Dropdowns/Dropdown'
import {DatePicker} from '../../../app/modules/CyCMovil/Datepickers/Datepicker'


export function Demo1Sandbox() {
    return (<>
        <Notice icon="flaticon-home font-primary">
            <span>
                Coloca en este apartado los objetos que construyan y deseen utilizar a lo largo del portal
            </span>
        </Notice>
        <SelectDevice />
        <SelectAssigment />
        <SelectDepartments/>
        <DatePicker display="Start-Date" default_date="" />
        <DropDownAmbient />
        <DropDownDB />
    </>);
}
