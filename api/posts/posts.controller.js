const postsModel = require('./posts.model');
const userModel = require('../auth/users.model');

exports.addNewpost = (req, res) => {
    userModel.model.findById(req.user._id, (err, data) => {
        if(err){
            return res.send(err);
        } else {
            const reqBod = req.body;
            console.log(reqBod);
            postsModel
                .create({
                    post: reqBod.post,
                    username: data.nickname,
                    show: reqBod.show,
                    title: reqBod.title
                },
                (err, data) => {
                    if(err){
                        return res.send(err)
                    } else {
                        return res.send(data)
                    }
                });
        }

    })
};

exports.showposts = (req, res) => {
    postsModel
        .findActiveposts()
        .exec( (err, docs) => {
            if(err) return res.status(400).send({error: err.message});
            res.render('posts.twig', {docs});
        });
};

exports.postDetails = (req, res) => {
    const { postId } = req.params;

    postsModel
        .findById(postId, (err, postData) => {
            if(err) {
                console.log(err);
            } else {
                res.render('detailedPost.twig', {postData});
            }
        })
}