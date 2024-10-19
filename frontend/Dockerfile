# Use node as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]