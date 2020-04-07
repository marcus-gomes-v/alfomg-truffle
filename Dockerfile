# Use an official Node runtime as a parent image
FROM node:10.18.0

# Set the /app directory as working directory
WORKDIR /app

# Clone code to container
RUN git clone https://github.com/viniciusgomes/alfomg-truffle.git .

# Install ganache-cli globally
RUN npm -g install truffle
