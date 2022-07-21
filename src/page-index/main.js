import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';

import '../css/main.css'

function DocumentList(props) {
    return (
        <div className="container container-md">
            Hello, world!
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("mount"))
root.render(<DocumentList />)
