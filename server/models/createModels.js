const user = require('./user')
const collection = require('./collection')
const item = require('./item')

exports.createLists = function(keystone) {
    user.createUserModel(keystone)
    collection.createCollectionModel(keystone)
    item.createItemModel(keystone)
}