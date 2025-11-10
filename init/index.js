const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const mongourl = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connection with DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongourl);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner:"688b67f0b1b4396e87773108"}));
    await Listing.insertMany(initdata.data);
    console.log("data init" );
}
initDB();