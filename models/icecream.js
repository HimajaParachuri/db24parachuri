const mongoose = require("mongoose")
const icecreamSchema = mongoose.Schema({
Brand : String,
Flavour : String,
Cost: Number
})
module.exports = mongoose.model("icecream", icecreamSchema)