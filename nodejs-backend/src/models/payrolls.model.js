// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const modelName = 'payrolls';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
      // ~cb-read-start~
      {
       employeeId: { type: String, unique: true },
       fullName: { type: String },
       employeeEmail: { type: String, lowercase: true },
       hoursWorked: { type: Number },
       basicPay: { type: Number },
       allowance: { type: Number },
       reimbursements: { type: Number },
       tax: { type: Number },
       payLeaveDays: { type: Number },
       unpaidLeaveDays: { type: Number },
       payDay: { type: Date },
       isActive: { type: Boolean },

    }
      // ~cb-read-end~
      , 
      {
      timestamps: true
    });
  
    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
      mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
    
  };