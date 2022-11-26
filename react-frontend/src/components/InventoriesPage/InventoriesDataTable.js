
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const InventoriesDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.sku}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.name}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.brand}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.category}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.purchasePrice}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.salePrice}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.supplier}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.qty}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.reminderThreshold}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="sku" header="SKU" body={pTemplate0} />
            <Column field="name" header="Name" body={pTemplate1} />
            <Column field="brand" header="Brand" body={pTemplate2} />
            <Column field="category" header="Category" body={pTemplate3} />
            <Column field="purchasePrice" header="Purchase Price" body={pTemplate4} />
            <Column field="salePrice" header="Sale Price" body={pTemplate5} />
            <Column field="supplier" header="Supplier" body={pTemplate6} />
            <Column field="qty" header="QTY" body={pTemplate7} />
            <Column field="reminderThreshold" header="Reminder Threshold" body={pTemplate8} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default InventoriesDataTable;