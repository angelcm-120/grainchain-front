import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../../../../../_metronic/layout";
import {Demo1KIO} from "./Demo1KIO"; 

export function KIO() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <Demo1KIO />} 
    </>;
}
