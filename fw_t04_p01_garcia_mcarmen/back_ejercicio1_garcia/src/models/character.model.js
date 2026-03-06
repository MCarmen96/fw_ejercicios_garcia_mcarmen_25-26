const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
    {
        name: String,
        img: String,
        age: Number,
        species: String,
        specialTraits: Array,
        role: String,
        firstAppearance: String
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
 module.exports=model('Character',characterSchema);