import React from "react";
import { GetMonitor } from '../../../app/modules/CyCMovil/Cards/Monitor'
import { getMonitorCollection, getMonitorCredit } from '../../../app/modules/Network/Services'
import { dev_hostname, dev_port, dev_protocol } from '../../../app/modules/Network/Config'

export function MainDashboard() {
    return (<>
        <div className="row">
            <div className="col-lg-6 col-xxl-6 order-1 order-xxl-1">
                <GetMonitor className="card-stretch gutter-b" svc={getMonitorCollection(dev_hostname, dev_port, dev_protocol)} title="PORTAL.TITLES.MONITORCOLLECTION" />

            </div>
            <div className="col-lg-6 col-xxl-6 order-1 order-xxl-1">
                <GetMonitor className="card-stretch gutter-b" svc={getMonitorCredit(dev_hostname, dev_port, dev_protocol)} title="PORTAL.TITLES.MONITORCREDIT" />
            </div>
        </div>
    </>);
}
