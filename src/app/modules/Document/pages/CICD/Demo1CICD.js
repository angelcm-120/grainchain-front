import React from "react";
import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";

const docs = [    
    { uri: require("./CyCMovil_CICD.pdf") }, // Local File
  ];

function Demo1CICD() {
    return <DocViewer 
    pluginRenderers={[PDFRenderer, PNGRenderer]}
    documents={docs}
    config={{
        header: {
         disableHeader: true,
         disableFileName: true,
         retainURLParams: true
        }
       }} />;
}

export{ Demo1CICD}