import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../layout";
import {Demo1Inquiries} from "./Demo1Inquiries"; 

export function Inquiries() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <Demo1Inquiries />} 
    </>;
}
