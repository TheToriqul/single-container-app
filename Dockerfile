# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Add maintainer info
LABEL maintainer="Md Toriqul Islam <toriqul.int@gmail.com>"

# Set the working directory
WORKDIR /usr/src/app

# Copy the application code
COPY app.js .

# Install the necessary Node.js package
RUN npm install http@0.0.1-security

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["node", "app.js"]
