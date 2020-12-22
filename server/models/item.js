const { Text, DateTime, Relationship, Select, File, } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
  src: './public/files',
  path: '/public/files',
});

exports.createItemModel = function(keystone) {

  const itemOptions = [
    { value: 'Image', label: "Definitely an image." },
    { value: 'Maybe_Image', label: "Not sure yet." },
    { value: 'Not_Image', label: 'Definitely not an image.' },
  ];

  keystone.createList('Item', {
      fields: {
        file: {type: File, adapter: fileAdapter, route: "/public/files"},
        name: { type: Text },
        description: { type: Text },
        dateCreated: { type: DateTime, default: Date.now },
        itemType: { type: Select, options: itemOptions},
        memberOfCollection: { type: Relationship, ref: 'Collection.items' }
      },
    });
}