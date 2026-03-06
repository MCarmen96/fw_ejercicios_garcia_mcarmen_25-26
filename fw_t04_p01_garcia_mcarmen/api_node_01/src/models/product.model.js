const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        stock: Number,
        department: String,
        available: Boolean,
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },

    }
);
// Propiedad virtual
productSchema.virtual("priceTaxes").get(function () {
  return this.price * 1.21;
});

/* No se guarda en MongoDB.
Se calcula cada vez que se devuelve el documento.
No se puede usar función flecha: () => {} porque perdería el this.
Se debe usar función normal: function () {} */

productSchema.statics.findByDepartment = function (department) {
    return this.find({ department });
};




module.exports = model("Product", productSchema);