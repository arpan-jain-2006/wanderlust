const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/review.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js")
const ReviewController= require("../controller/reviews.js")


const validateReview = (req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if (error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}


router.post("/",isLoggedIn, validateReview, wrapAsync(ReviewController.reviewPost));
// router.delete("/:id/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.reviewDestroy));
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.reviewDestroy));
module.exports = router;
