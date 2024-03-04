const {Schema, model} = require('mongoose')


const CollectionSchema = new Schema({
    collectionId: { type: String, required: true },
    collectionName: { type: String, required: true },
    images: [{
        id: { type: String },
        src: { type: String }
    }]
});


const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    userCollections: [CollectionSchema]
})

module.exports = model('User', User)
