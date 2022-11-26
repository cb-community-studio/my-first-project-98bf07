// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const modelName = 'inventories';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
      // ~cb-read-start~
      {
       sku: { type: String, required: true, unique: true },
       name: { type: String, required: true },
       brand: { type: String },
       category: { type: String },
       purchasePrice: { type: Number },
       salePrice: { type: Number },
       supplier: { type: String },
       qty: { type: Number },
       reminderThreshold: { type: Number },

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