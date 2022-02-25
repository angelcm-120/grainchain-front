import React from "react";
import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";

const docs = [    
    { uri: require("./manejo_y_control_de_errores.pdf") }, // Local File
  ];

function Demo1ControlErrores() {
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

export{ Demo1ControlErrores}