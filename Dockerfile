FROM node:16-alpine3.14
LABEL version="0.0.1"

# COPY repository
COPY . .
WORKDIR server

# build
RUN yarn
RUN yarn build

# Start
ENTRYPOINT [ "yarn", "run", "start:prod" ]
