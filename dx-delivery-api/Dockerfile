   
FROM node:14

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn
RUN yarn global add nodemon

# copy the code
COPY . .

EXPOSE 3000
CMD ["yarn", "run", "dev"]