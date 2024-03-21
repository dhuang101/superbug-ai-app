FROM node:20.9.0 AS fr_base

# build superbug ai
WORKDIR /app/superbug-ai
COPY app/superbug-ai/ ./
RUN npm install
RUN npm run build
