import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../layout";
import {Demo1Home} from "./Demo1Home"; 

export function Home() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <Demo1Home />} 
    </>;
}
