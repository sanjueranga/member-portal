# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .



# Build your React app
RUN npm run build

# Expose the port your React app will run on (usually 3000)
EXPOSE 3000

# Define the command to run your React app
CMD ["npm", "start"]
