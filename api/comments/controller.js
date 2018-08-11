const postsModel = require('../posts/posts.model');
const userModel = require('../auth/users.model');

exports.addComment = (req, res) => {
    const reqBod = req.body;
    const { _id } = req.user;
    const { comment, commentId } = req.body;

    userModel.model
        .findById(_id)
        .exec((err, data) =>{
            if(err) {
                console.err(err);
            } else {
                postsModel
                    .findById(reqBod.commentId)
                    .populate('comments')
                    .update({ $push: {
                        comments: {
                            $each:[{
                                commentId: commentId,
                                userId: _id,
                                commentText: comment,
                                username: data.nickname
                            }],
                            $position: 0
                        }
                    }},
                    (err, data) => {
                        if(err){
                            return res.send(err);
                        } else {
                            return res.send(data);
                        }
                    })
            }
        })
}
