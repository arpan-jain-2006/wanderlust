const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

module.exports.reviewPost = async(req,res)=>{
     let listing= await Listing.findById(req.params.id);
     let newReview = new Review(req.body.review);
     newReview.author = req.user._id;
    //  console.log(newReview);
     listing.reviews.push(newReview);
     await newReview.save();
     await listing.save();
    //  console.log(newReview);
     req.flash("success","Review created");
     res.redirect(`/listing/${listing._id}`);
}

// module.exports.reviewDestroy = async (req, res) => {
//   let { id, reviewId } = req.params;
//   reviewId = reviewId.trim();
//   console.log("🛠️ Cleaned Review ID:", `"${reviewId}"`);
//   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//   await Review.findByIdAndDelete(reviewId);
//   req.flash("success","Review Deleted");
//   res.redirect(`/listing/${id}`);
// }



// module.exports.reviewDestroy = async (req, res) => {
//   let { id, reviewId } = req.params;
//   reviewId = reviewId.trim();
// 
//   if (!mongoose.Types.ObjectId.isValid(reviewId)) {
//     req.flash("error", "Invalid Review ID");
//     return res.redirect(`/listing/${id}`);
//   }
// 
//   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//   await Review.findByIdAndDelete(reviewId);
// 
//   req.flash("success", "Review Deleted");
//   res.redirect(`/listing/${id}`);
// };

module.exports.reviewDestroy = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted");
  res.redirect(`/listing/${id}`);
};