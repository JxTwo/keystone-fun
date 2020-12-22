const { Text, DateTime, Relationship } = require('@keystonejs/fields');

exports.createCollectionModel = function(keystone) {

  keystone.createList('Collection', {
      fields: {
        name: { type: Text },
        description: { type: Text },
        dateCreated: { type: DateTime, default: Date.now },
        featured: { type: Boolean, default: false},
        users: { type: Relationship, ref: 'User.memberOfCollection', many: true },
        items: { type: Relationship, ref: 'Item.memberOfCollection', many: true }
      },
    });
}