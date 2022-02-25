import React from "react";
import { Notice } from "../../../_metronic/_partials/controls";
import { FormattedMessage } from "react-intl";

export function Demo1Home() {    
    return (<>
        <Notice icon="flaticon-home font-primary">
            <span>
                <FormattedMessage id="GLOBAL.WORD.HOME.NOTICE" />
            </span>
        </Notice>

    </>);
}
