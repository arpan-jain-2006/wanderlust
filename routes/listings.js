const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingschema} = require("../schema.js");
const{isLoggedIn}= require("../middleware.js");
const{isOwner}= require("../middleware.js");
const listingsController = require("../controller/listings.js");
const multer = require("multer")
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

const validateListing = (req,res,next)=>{
    let {error}= listingschema.validate(req.body);
    if (error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

router.route("/")
.get(wrapAsync(listingsController.index))
.post( isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingsController.post));

// NEW route MUST come before SHOW route
         //NEW ROUTE USER
router.get("/new",isLoggedIn, listingsController.renderNewForm);
          //index Route
router.route("/:id")
.get( wrapAsync(listingsController.showListing))
.put(isLoggedIn,upload.single('listing[image]'),isOwner,validateListing, wrapAsync(listingsController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingsController.destroyListing))
         //Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingsController.editListing))

module.exports = router;