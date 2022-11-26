
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

const EmailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            fromEmail: _entity.fromEmail,
            toEmail: _entity.toEmail,
            subject: _entity.subject,
            body: _entity.body,
            time: _entity.time,
            sentStatus: _entity.sentStatus,
            readStatus: _entity.readStatus

        };

        setLoading(true);
        try {
            const result = await client.service("emails").create(_data);
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
                    <p className="m-0" >From Email:</p>
                    <InputText className="w-full mb-3" value={_entity?.fromEmail} onChange={(e) => setValByKey("fromEmail", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >To Email:</p>
                    <InputText className="w-full mb-3" value={_entity?.toEmail} onChange={(e) => setValByKey("toEmail", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Subject Email:</p>
                    <InputText className="w-full mb-3" value={_entity?.subject} onChange={(e) => setValByKey("subject", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Body:</p>
                    <InputText className="w-full mb-3" value={_entity?.body} onChange={(e) => setValByKey("body", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Time:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.time} onChange={ (e) => setValByKey("time", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Sent Status:</p>
                    <Checkbox checked={_entity?.sentStatus} onChange={ (e) => setValByKey("sentStatus", e.checked)}  ></Checkbox>
                </div>
                <div>
                    <p className="m-0" >Read Status:</p>
                    <Checkbox checked={_entity?.readStatus} onChange={ (e) => setValByKey("readStatus", e.checked)}  ></Checkbox>
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

export default connect(null, mapDispatch)(EmailsCreateDialogComponent);
// createDialog_code.template
