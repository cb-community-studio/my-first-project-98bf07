
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const PayrollsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.employeeId}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.fullName}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.employeeEmail}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.hoursWorked}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.basicPay}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.allowance}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.reimbursements}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.tax}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.payLeaveDays}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.unpaidLeaveDays}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.payDay}</p>
    const tickTemplate11 = (rowData, { rowIndex }) => <i className={`pi ${rowData.isActive?"pi-check": "pi-times"}`}  ></i>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="employeeId" header="Employee ID" body={pTemplate0} />
            <Column field="fullName" header="Full Name" body={pTemplate1} />
            <Column field="employeeEmail" header="Email" body={pTemplate2} />
            <Column field="hoursWorked" header="Hours Worked" body={pTemplate3} />
            <Column field="basicPay" header="Basic Pay" body={pTemplate4} />
            <Column field="allowance" header="Allowance" body={pTemplate5} />
            <Column field="reimbursements" header="Reimbursements" body={pTemplate6} />
            <Column field="tax" header="Tax" body={pTemplate7} />
            <Column field="payLeaveDays" header="Pay Leave Days" body={pTemplate8} />
            <Column field="unpaidLeaveDays" header="Unpaid Leave Days" body={pTemplate9} />
            <Column field="payDay" header="Pay Day" body={pTemplate10} />
            <Column field="isActive" header="Is Active" body={tickTemplate11} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default PayrollsDataTable;