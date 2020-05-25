const asyncHandler = require("../../middleware/async");
const Product = require("../../models/Product");
const ErrorResponse = require("../../utils/errorResponse");

const updateRating = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { rate, userId } = req.body;

  const productToUpdate = await Product.findById(id);
  if (!productToUpdate) {
    return next(new ErrorResponse("Product not found", 404));
  }
  if (productToUpdate.usersVoted.includes(userId)) {
    return next(new ErrorResponse("You already voted", 400));
  }
  productToUpdate.rateCount = ++productToUpdate.rateCount;
  productToUpdate.rate = (
    (productToUpdate.rate * productToUpdate.rateCount + +rate) /
    productToUpdate.rateCount
  ).toFixed(0);
  productToUpdate.usersVoted.push(userId);
  productToUpdate.save();
  res.status(200).send("rating updated");
});
module.exports = { updateRating };
