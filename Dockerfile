# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:14.15.0

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
COPY .env ./

 
# Installs all node packages
RUN npm install
RUN npm install dotenv

# required to serve the react app on the live server
RUN npm install -g serve
 
# Copies everything over to Docker environment
COPY . .

RUN npm run build production 
# Uses port which is used by the actual application
EXPOSE 9001
 
# Finally runs the application 
CMD ["serve", "-s", "build", "-l", "9001"]


