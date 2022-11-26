
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PayrollsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            employeeId: _entity.employeeId,
            fullName: _entity.fullName,
            employeeEmail: _entity.employeeEmail,
            hoursWorked: _entity.hoursWorked,
            basicPay: _entity.basicPay,
            allowance: _entity.allowance,
            reimbursements: _entity.reimbursements,
            tax: _entity.tax,
            payLeaveDays: _entity.payLeaveDays,
            unpaidLeaveDays: _entity.unpaidLeaveDays,
            payDay: _entity.payDay,
            isActive: _entity.isActive

        };

        setLoading(true);
        try {
            const result = await client.service("payrolls").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div>
                <div>
                    <p className="m-0" >Employee ID:</p>
                    <InputText className="w-full mb-3" value={_entity?.employeeId} onChange={(e) => setValByKey("employeeId", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Full Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.fullName} onChange={(e) => setValByKey("fullName", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Email:</p>
                    <InputText className="w-full mb-3" value={_entity?.employeeEmail} onChange={(e) => setValByKey("employeeEmail", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Hours Worked:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.hoursWorked} onChange={(e) => setValByKey("hoursWorked", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Basic Pay:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.basicPay} onChange={(e) => setValByKey("basicPay", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Allowance:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.allowance} onChange={(e) => setValByKey("allowance", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Reimbursements:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.reimbursements} onChange={(e) => setValByKey("reimbursements", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Tax:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.tax} onChange={(e) => setValByKey("tax", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Pay Leave Days:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.payLeaveDays} onChange={(e) => setValByKey("payLeaveDays", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Unpaid Leave Days:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.unpaidLeaveDays} onChange={(e) => setValByKey("unpaidLeaveDays", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Pay Day:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.payDay} onChange={ (e) => setValByKey("payDay", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Is Active:</p>
                    <Checkbox checked={_entity?.isActive} onChange={ (e) => setValByKey("isActive", e.checked)}  ></Checkbox>
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(PayrollsCreateDialogComponent);
// createDialog_code.template
