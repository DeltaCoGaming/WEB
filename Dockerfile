# Start with a minimal Node.js base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy over the package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the application code and build it
COPY . .
RUN npm run build

# Use a smaller Node.js base image for the final container
FROM node:18-alpine

# Set the working directory and copy the built app from the builder stage
WORKDIR /app
COPY --from=builder /app /app

# Expose the application's port
EXPOSE 37283

# Start the application
CMD ["npm", "start"]
