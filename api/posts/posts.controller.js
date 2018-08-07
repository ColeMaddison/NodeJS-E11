const postsModel = require('./posts.model');
const userModel = require('../auth/users.model');
const froala = require('wysiwyg-editor-node-sdk');
const express = require('express');
const filesApp = express();
const bodyparser = require('body-parser');

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
                        show: reqBod.show,
                        title: reqBod.title
                    },
                    (err, data) => {
                        if(err) {
                            return res.send(err)
                        } else {
                            return res.send(data)
                        }
                    })
            }
        }
    );

    // console.log(req.body);
    // res.send('yes');
};

exports.imageUpload = (req, res) => {
    
    froala.Image.upload(req, '/static/', (err, data) => {
        if(err) {
            return res.send(JSON.stringify(err));
        } else {
            console.log(data);
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
