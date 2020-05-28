const asyncHandler = require('../../middleware/async');
const Product = require('../../models/Product');
const ErrorResponse = require('../../utils/errorResponse');

const UPDATE_RATING_ERROR_MESSAGE = 'Product not found';
const USER_VOTED_ERROR_MESSAGE = 'You already voted';

const updateRating = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { rate, userId } = req.body;

  const productToUpdate = await Product.findById(id);
  if (!productToUpdate) {
    return next(new ErrorResponse(UPDATE_RATING_ERROR_MESSAGE, 404));
  }
  if (productToUpdate.usersVoted.includes(userId)) {
    return next(new ErrorResponse(USER_VOTED_ERROR_MESSAGE, 400));
  }
  productToUpdate.rateCount = ++productToUpdate.rateCount;
  productToUpdate.rate = (
    (productToUpdate.rate * productToUpdate.rateCount + +rate) /
    productToUpdate.rateCount
  ).toFixed(0);
  productToUpdate.usersVoted.push(userId);
  productToUpdate.save();
  res.status(200).send('rating updated');
});
module.exports = { updateRating };
