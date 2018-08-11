const postsModel = require('./posts.model');
const userModel = require('../auth/users.model');
const froala = require('wysiwyg-editor-node-sdk');
const path = require('path');
const fs = require('fs');

exports.addNewpost = (req, res) => {

    userModel.model.findById(
        req.user._id,
        (err, userData) => {
            if(err) {
                console.error(err);
            } else {
                const reqBod = req.body;
                postsModel
                    .create({
                        post: reqBod.post,
                        username: userData.nickname,
                        addedBy: userData._id.toString(),
                        show: reqBod.show,
                        title: reqBod.title
                    },
                    (err, data) => {
                        if(err) {
                            return res.send(err)
                        } else {
                            userModel.model
                                .findByIdAndUpdate(
                                    req.user._id,
                                    { $push: { posts: data._id.toString() } },
                                    (err, savedPost) => {
                                        if(err){
                                            console.error(err);
                                        }
                                    }
                                );
                            return res.send(data);
                        }
                    })
            }
        }
    );
};

exports.imageUpload = (req, res) => {

    const destinationPath = path.join('static', 'img', req.user._id.toString());

    if(!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }

    froala.Image.upload(req, `/${destinationPath}/`, (err, data) => {
        if(err) {
            return res.send(JSON.stringify(err));
        } else {
            res.send(data)
        }
    })
}

exports.showposts = (req, res) => {
    const { user } = req;

    postsModel
        .findActiveposts()
        .exec( (err, docs) => {
            if(err){ 
                return res.status(400).send({error: err.message});
            } else {
                res.render('posts.twig', {docs, user});
            }
        });
};

exports.postDetails = (req, res) => {
    const { postId } = req.params;
    const { user } = req;

    postsModel
        .findById(postId, (err, postData) => {
            if(err) {
                console.log(err);
            } else {
                res.render('detailedPost.twig', {postData, user});
            }
        })
}

exports.deletePost = (req, res) => {
    const { postId } = req.params;
    
    postsModel.findByIdAndRemove(
        postId,
        (err, data) => {
            if(err) {
                console.error(err);
            } else {
                res.status(200).send('ok');
            }
        }
    );
}