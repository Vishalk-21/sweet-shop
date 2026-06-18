# Dockerfile for Backend
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY Backend/package*.json ./Backend/
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
