const { Schema, model } = require("mongoose");

const episodesSchema=new Schema(
    {
        code:String,
        title:String,
        summary:String,
        year:Number,
        characters:Array
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports=model('Episode',episodesSchema);