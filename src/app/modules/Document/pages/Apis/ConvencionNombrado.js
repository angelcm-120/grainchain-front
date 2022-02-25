import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../../../../_metronic/layout";
import {Demo1ConvencionNombrado} from "./Demo1ConvencionNombrado"; 

export function ConvencionNombrado() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <Demo1ConvencionNombrado />} 
    </>;
}
