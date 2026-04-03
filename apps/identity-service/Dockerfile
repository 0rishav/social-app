# Stage 1: Build/Install
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY apps/identity-service/package*.json ./apps/identity-service/
COPY packages/ ./packages/ 

RUN npm install --frozen-lockfile

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

WORKDIR /app/apps/identity-service
EXPOSE 8001
CMD ["npm", "start"]