const { default: mongoose } = require("mongoose");


const fieldSchema = new mongoose.Schema({
  filiere: { type: String, required: true },
  annees:[
  {  type: String,
    required:true}
  ]

});


const Field = mongoose.model("fields", fieldSchema);

module.exports = Field;
