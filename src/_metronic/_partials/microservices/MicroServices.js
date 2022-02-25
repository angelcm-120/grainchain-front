import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../layout";
import {Demo1MicroServices} from "./Demo1MicroServices"; 

export function MicroServices() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <Demo1MicroServices />} 
    </>;
}
