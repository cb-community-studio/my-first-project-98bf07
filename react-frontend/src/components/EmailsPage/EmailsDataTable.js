
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const EmailsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.fromEmail}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.toEmail}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.subject}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.body}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.time}</p>
    const tickTemplate5 = (rowData, { rowIndex }) => <i className={`pi ${rowData.sentStatus?"pi-check": "pi-times"}`}  ></i>
    const tickTemplate6 = (rowData, { rowIndex }) => <i className={`pi ${rowData.readStatus?"pi-check": "pi-times"}`}  ></i>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="fromEmail" header="From Email" body={pTemplate0} />
            <Column field="toEmail" header="To Email" body={pTemplate1} />
            <Column field="subject" header="Subject Email" body={pTemplate2} />
            <Column field="body" header="Body" body={pTemplate3} />
            <Column field="time" header="Time" body={pTemplate4} />
            <Column field="sentStatus" header="Sent Status" body={tickTemplate5} />
            <Column field="readStatus" header="Read Status" body={tickTemplate6} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default EmailsDataTable;