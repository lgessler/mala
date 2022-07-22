import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import MUIDataTable from "mui-datatables";
import '../css/main.scss'

function DocumentList(props) {
    const [count, setCount] = useState(100);
    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "releaseYear",
            label: "Release",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "paperUrl",
            label: "Paper",
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: "codeUrl",
            label: "Code",
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: "dataTypes",
            label: "Data Types",
            options: {
                sort: false,
                filter: true
            }
        },
        {
            name: "freeness",
            label: "Availability",
            options: {
                sort: true,
                filter: true
            }
        },
        {
            name: "keywords",
            label: "Keywords",
            options: {
                sort: false,
                filter: true
            }
        }

    ]

    const options = {
        filterType: 'textField',
        caseSensitive: false,
        selectableRows: false,
        rowsPerPage: count,
        onChangeRowsPerPage: setCount,
        rowsPerPageOptions: [50, 100, 250, 500],
        print: false,
        search: false,
        download: false,
        responsive: "simple"
    };

    const apps = JSON.parse(JSON.stringify(APPS))
    for (let o of apps) {
        o.name = <a href={'./' + o.slug + ".html"}>{o.name}</a>
        o.paperUrl = o.paperUrl ? <a href={o.paperUrl}>Paper</a> : '–'
        o.codeUrl = o.codeUrl ? <a href={o.codeUrl}>Code</a> : '–'
        o.dataTypes = o.dataTypes.join(", ")
        o.keywords = o.keywords.join(", ")
    }

    return (
        <MUIDataTable
            title={"The Map of Applications for Linguistic Annotation"}
            data={apps}
            columns={columns}
            options={options}
        />
    )
}

function setup() {
    const mountPoint = document.getElementById("mount")
    const root = ReactDOM.createRoot(mountPoint)
    root.render(<DocumentList />)
}
document.addEventListener('DOMContentLoaded', setup)