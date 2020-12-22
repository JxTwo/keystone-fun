FROM utexas-glib-it-docker-local.jfrog.io/nodejs-12:1.0.0 as build
ARG DUMB_INIT_VERSION
WORKDIR /home/node
ADD . /home/node
RUN npm install
RUN npm run-script build