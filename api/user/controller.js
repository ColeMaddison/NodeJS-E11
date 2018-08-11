// const postsModel = require('../posts/posts.model');
const userModel = require('../auth/users.model');
const path = require('path');
const fs = require('fs');

// get user profile
exports.getUser = (req, res) => {
    const { _id } = req.user;

    userModel.model
        .findById(
            _id,
            (err, userData) => {
                if(err) { 
                    console.error(err);
                } else {
                    res.render('userProfile.twig', {userData});
                }
            }
        )
};

exports.updateUserData = (req, res) => {
    // console.log(req.file);
    const userId = req.user._id;
    const userEmailNew = req.body.email;
    const userAvatar = req.file;
    const avatarPathAbsolute = userAvatar.path.split('/').slice(0, userAvatar.path.split('/').length-1).join('/');
    const logoDirectory = path.join('/', 'static', 'img', userId.toString(), 'logo');

    const options = {};

    if(!req.file){
        options['email'] = userEmailNew;
    } else {
        const avatarPath = path.join(logoDirectory, userAvatar.filename);
        // console.log(avatarPath);
        options['avatar'] = avatarPath;
        options['email'] = userEmailNew;
    }

    userModel.model.findByIdAndUpdate(
        userId,
        options,
        (err, data) => {
            if(err) {
                console.error(err);
            } else {
                fs.readdir(avatarPathAbsolute, (err, files) => {
                    if(err) {
                        return console.error(err);
                    } 
                    console.log(files, userAvatar);
                    files.forEach(file => {
                        if (!(file === userAvatar.filename)){
                            let userAvatarOldPath = path.join(avatarPathAbsolute, file);
                            fs.unlink(userAvatarOldPath, err => {
                                if(err) {
                                    console.error(err);
                                }
                            })
                        }
                    });
                });
                res.status(200).send;
            }
        }
    );
};