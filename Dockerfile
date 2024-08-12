# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the required port
EXPOSE 37283

# Start the application
CMD ["npm", "start"]


# How to build the Docker image
# docker build -t deltawebsite .

# How to run the Docker container
# docker run -p 37283:37283 deltawebsite
