const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const rootPath = require('app-root-path').path;

const multer = require('multer');

const allowedExts = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif'
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        const destinationPath = path.join(rootPath, 'static', 'img', req.user._id.toString(), 'logo');
    
        if(!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath);
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if(!allowedExts.includes(ext)) {
            return cb(new Error('Only images can be uploaded'));
        } else {
            return cb(null, true);
        }
    }
});


const ctrl = require('./controller');
const mdl = require('../middlewares');

router.get('/', mdl.isAuth, ctrl.getUser);

router.post('/', mdl.isAuth, upload.single('file'), ctrl.updateUserData);

module.exports = router;
