const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PhoneSchema = new mongoose.Schema({
    _id: false,
    code: String,
    phone: String
});

const UsersSchema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password: {type: String, required: true, select: false},
    fullName: {type: String},
    telephone: [PhoneSchema],
    description: {type: mongoose.Schema.Types.Mixed}
}, {
    timestamps: true,
    collection: "UsersCollection"
});

UsersSchema.statics = {
    checkUser: function(email, password, cb) {
        this
            .findOne({email: email})
            .select('email password')
            .lean()
            .exec( (err, doc) => {
                if(err) return cb({message: err.message});

                if(!doc) return cb({message: "email is not correct"});

                const compare = bcrypt.compareSync(password, doc.password);
                if(compare) {
                    cb(false, doc);
                } else {
                    cb({message: "password is not correct"});
                }
            });
    },
    serializeUser: function(user, cb) {
        cb(false, user._id.toString());
    },
    deserializeUser: function(user, cb) {
        this
            .findById(user)
            .select('email fullName')
            .lean()
            .exec( (err, doc) => {
                if (err) return cb({message: err.message});

                if (!doc) return cb({message: "email is not correct"});
                cb(false, doc);
            });
    },
};

UsersSchema.pre('save', function(next) {
    // this.markModified('description')

    if(this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    next();
});

const model = mongoose.model('UserModel', UsersSchema);

module.exports = {
    model,
    schema: UsersSchema
};