import React from "react";
import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";

const docs = [    
    { uri: require("./architecture_int.pdf") }, // Local File
  ];

function Demo1Int() {
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

export{ Demo1Int}