const mongoose = require("mongoose")
const icecreamSchema = mongoose.Schema({
Brand : {
    type: String,
    required: [true, "IcecreamBrand is Required"]
},
Flavour : {
    type: String,
    required: [true, "IcecreamFlavour is Required"]
},
Cost: {
    type: Number,
    min:[50,"Price of the icecream should be 50"],
    max:[150,"Price can be more than 150"]
}
})
module.exports = mongoose.model("icecream", icecreamSchema)