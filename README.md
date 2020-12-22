# KeystoneJS Starter Template
Valkyrie Squad KeystoneJS Proof of Concept. This was initialized using Keystone's Quick Start Guide (`https://www.keystonejs.com/quick-start/`) and the Basic Authentication configuration, which creates a simple list of users and an admin application (`localhost:3000/admin`) with basic authentication.

KeystoneJS is a headless CMS intended to be front-end agnostic. For this project, we are using ReactJS (`https://reactjs.org/`) as the front-end framework.

## Setting up.
1. Install node.js (`https://nodejs.org/en/`)
2. Install mongodb. I recommend using homebrew (`https://treehouse.github.io/installation-guides/mac/mongo-mac.html`) Important: note the line about creating the /data/db directory and giving mongodb permission to access that directory.
3. Clone this repo.
4. Run `npm install`

## Running locally without Docker.
1. The index.js file is pointed to `mongodb://mongodb:27017/valkryie-keystonejs`. This is necessary for keystonejs to connect to mongodb in a docker/container environement. To run locally, update that url to `mongodb://localhost:27017/valkryie-keystonejs` (currently on lines 18 and 22).
2. Start mongodb. From terminal, run `mongod`.
3. Run `npm run dev`. Note that this command is defined in the package.json file.

## Running locally with Docker.
1. Download the MongoDB image from `https://hub.docker.com/_/mongo`.
2. Build a KeystoneJS image from the Dockerfile contained in this repository. You can name the image whatever you want as long as you reference that name in the docker-compose.yml file. E.g., run `docker build -t testing-admin`.
3. Run `docker images`. Confirm you see these two images: `mongodb`, and `testing-admin` (or whatever you named it).
4. From this repo directory, run `docker-compose up`.
5. When making changes, you will need to rebuild the keystone image and update the docker-compose.yml file to run the new keystone image.

## Troubleshooting MongoDB install
If you run into trouble installing MongoDB, try the following:
1. Switch users to your admin account
2. Tap the MongoDB resource with homebrew: `brew tap mongodb/brew`
3. Next, run the following command to install MongoDB: `brew install mongodb-community@4.2`

For more information regarding installation of MongoDB on OSX, please read more on their website: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

## MongoDB Shell
To access the mongodb shell, simply run `mongo` from a terminal window. Here is a quick reference guide: https://docs.mongodb.com/manual/reference/mongo-shell/. This is useful if you want to confirm the content of a database or drop a database. 

To access the mongodb shell running inside a docker container:
1. After initializing the container, run `docker ps -a`. Copy the container id for the running mongodb container.
2. Run `docker exec -it mongodbcontainerid /bin/bash`
3. Run `mongo`

## Next steps
This example has no front-end application but you can build your own using the GraphQL API (`http://localhost:3000/admin/graphiql`).