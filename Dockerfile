# base image
FROM node

# set the working directory
WORKDIR /app

# copy everything (including node_modules) to the container 
COPY . .

# expose port 3000
EXPOSE 3000

# run the server when the container starts
CMD node server.js