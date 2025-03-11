# https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/Dockerfile

# Stage 1: Build the application
FROM node:20 AS builder
WORKDIR /home/node/app

# Leverage caching by copying package.json and package-lock.json first
COPY package*.json ./
RUN npm install -g npm@latest && npm install



FROM node:20
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ARG PORT=4200
ENV PORT $PORT
EXPOSE $PORT 9229 9230

WORKDIR ./home/node/app
RUN npm install -g npm@latest
COPY tsconfig.json ./
RUN chown node:node -R ./
COPY --from=builder /home/node/app ./
USER node
CMD ["npm", "run", "dev"]