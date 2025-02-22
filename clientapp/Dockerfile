# Use Node.js as base image
FROM node:16 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx for serving the frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
