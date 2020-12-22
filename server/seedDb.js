const crypto = require('crypto');
const randomString = () => crypto.randomBytes(6).hexSlice();
const collectionCount = 5
const userCount = 10
const itemCount = 25

module.exports = async keystone => {
    // Count existing users
    const {
        data: {
        _allUsersMeta: { count },
        },
    } = await keystone.executeQuery(
        `query {
            _allUsersMeta {
                count
            }
        }`
    );
    // If there are zero users, initialize admin user + sample list data
    if (count === 0) {
        const password = randomString();
        const email = 'admin@example.com';

        await keystone.executeQuery(
        `mutation initialUser($password: String, $email: String) {
                createUser(data: {name: "Admin", email: $email, isAdmin: true, password: $password}) {
                id
                }
            }`,
        {
            variables: {
            password,
            email,
            },
        }
        );

        console.log(`
        User created:
            email: ${email}
            password: ${password}
        Please change these details after initial login.
        `);

        // seeds database with some initial list data
        const collections = createCollections()
        await keystone.createItems({
            Collection: collections,
            User: createUsers(collections),
            Item: createNewItems(collections),
        });
    }
}


const createCollections = () => {
    let i = 0
    let collections = []
    while (i < collectionCount) {
        let newCollection = {
            name: `Collection ${randomString()}`,
            description: `Collection with content ${randomString()}.`,
        }
        collections.push(newCollection)
        i ++
    }
    return collections
}

const createUsers = (collections) => {
    let i = 0
    let users = []
    let collectionName = ''
    while (i < userCount) {
        if (i < 5) {collectionName = collections[i].name}
        else if (i < 10) {collectionName = collections[(i - 5)].name}
        else {collectionName = collections[0].name}
        let newUser = {
            name: `User ${randomString()}`,
            email: `${randomString()}@example.com`,
            memberOfCollection: { where: { name: collectionName } },
            password: `${randomString()}`
        }
        users.push(newUser)
        i ++
    }
    return users
}

const createNewItems = (collections) => {
    let i = 0
    let items = []
    let collectionName = ''
    while (i < itemCount) {
        if (i < 5) {collectionName = collections[i].name}
        else if (i < 10) {collectionName = collections[(i - 5)].name}
        else if (i < 15) {collectionName = collections[(i - 10)].name}
        else if (i < 20) {collectionName = collections[(i - 15)].name}
        else if (i < 25) {collectionName = collections[(i - 20)].name}
        else {collectionName = collections[0].name}
        let newItem = {
            name: `Item ${randomString()}`,
            description: `Item ${randomString()}.`,
            memberOfCollection: { where: { name: collectionName } },
        }
        items.push(newItem)
        i ++
    }
    return items
}