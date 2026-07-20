# Multi-stage Dockerfile for Node.js Server
FROM node:20-alpine AS base

# Create app directory
WORKDIR /app

# Install dependencies based on lockfile
COPY package*.json ./
RUN npm ci

# Copy project source files
COPY . .

# Expose application port
EXPOSE 5000

# Set environment to production by default
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "src/index.js"]
