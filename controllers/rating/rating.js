const asyncHandler = require('../../middleware/async');
const Product = require('../../models/Product');
const ErrorResponse = require('../../utils/errorResponse');

const updateRating = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { rate } = req.body;
    console.log(id);
    
    const productToUpdate = await Product.findById(id);
    if (!productToUpdate) {
        return next(new ErrorResponse('Product not found', 404));
    }
    productToUpdate['ratings-count'] = ++productToUpdate['ratings-count']; 
    productToUpdate.rate = (((productToUpdate.rate * productToUpdate['ratings-count'])+ +rate) /productToUpdate['ratings-count']).toFixed(0);
    productToUpdate.save();
    res.status(200).send('rating updated');
})
module.exports = { updateRating };