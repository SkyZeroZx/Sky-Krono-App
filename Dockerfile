# Stage 1: Compile app

# Install node 
FROM node:18-alpine3.15 as build

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Add the source code to app
COPY ./ /app

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run production


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/ /usr/share/nginx/html
