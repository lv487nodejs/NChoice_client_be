const mongoose = require('mongoose');

const { Schema } = mongoose;

const PropetriesSchema = new Schema({
    size: {
        type: [String],
        enum: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true,
    },
    available: { type: Number, required: true, min: 0, max: 1000 },
    sku: {
        type: String,
        required: true,
        validate: [/[a-zA-Z0-9]/, 'Product sku should have letters and numbers'],
        unique: true,
    },
});

PropetriesSchema.pre('save', function(next) {
    this.sku = this.sku + '-' + this._id
    this.sku = this.sku.slice(0,-20).toUpperCase()
    next();
  });

module.exports = PropetriesSchema;
