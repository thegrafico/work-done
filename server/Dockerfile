# Install Node.js and npm
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port for the server
EXPOSE 3000

# Start the server
CMD [ "npm", "start" ]