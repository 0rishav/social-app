FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/common/package*.json ./packages/common/
COPY apps/identity-service/package*.json ./apps/identity-service/

RUN npm install 

COPY packages/ ./packages/
COPY apps/identity-service/ ./apps/identity-service/

FROM node:20-alpine as runner
WORKDIR /app

COPY --from=builder --chown=node:node /app/node_modules ./node_modules

COPY --chown=node:node packages/ ./packages
COPY --chown=node:node apps/identity-service/ ./apps/identity-service/

USER node

EXPOSE 8001
CMD ["node","apps/identity-service/src/index.js"]