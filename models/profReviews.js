const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Profile = require("./profprofile");

const userSchema = new Schema({
    // review: [
    //   {
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: Profile,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date:{
      type:String,
      required:true
    },
    userId:{
      type:String,
      required:true
    }
  //   ],
  // },
});

const Review = mongoose.model("Review", userSchema);
module.exports = Review;
