import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../../../../../_metronic/layout";
import {Demo1Develop} from "./Demo1Develop"; 

export function Develop() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <Demo1Develop />} 
    </>;
}
