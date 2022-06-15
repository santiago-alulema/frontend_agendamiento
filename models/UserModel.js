const {Schema, model}= require('mongoose');

const UserSchema = Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname: {
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})

UserSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('User',UserSchema);