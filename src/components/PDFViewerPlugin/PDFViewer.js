import React, { useState } from 'react';
import PDFViewer from 'pdf-viewer-reactjs'


const PDFViewerr = () => {
    return (
        <div style={{height:"450px"}}>
            <PDFViewer
                document={{
                    url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
                }}
            />
        </div>
    )
}

export default PDFViewerr