const Review = require("../models/profReviews");

exports.postComment = (req, res, next) => {
  const postid = req.body.profileId;
  const name = req.body.name;
  const comment = req.body.comment;
  console.log(postid,name, comment);
  const review = new Review({
      reviewId:postid,
      name:name,
      comment:comment,
      date:req.body.date,
      userId:req.body.userId
  })
  review.save()
  .then((result) => {
      res.status(201).json({
          comment:result,
      })
  }).catch(err => console.log(err));
};

exports.getComment = (req, res, next) => {
    const post_id = req.body.postId;
    console.log(post_id);
    Review.find().then((result)=>{
        res.status(200).json({
            comment:result,
        })
    })
    .catch(err=>console.log(err));

}
exports.deleteComment = (req,res,next)=>{
    const postId = req.params.id;
    Review.findById(postId)
    .then(post=>{
      if(!post){
        const error = new Error('could not find post to delete');
        error.statusCode = 404;
        throw error;
      }
      return Review.findByIdAndDelete(postId);
    })
    .then(result=>{
      res.status(200).json({message:'Post deleted',posts:result});
    })
    .catch(err=>{
      if(!err.statusCode)
      {
        err.statusCode = 500;
      }
    });
  };