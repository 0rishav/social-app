FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/common/package*.json ./packages/common/
COPY apps/post-service/package*.json ./apps/post-service/

RUN npm install

COPY packages/ ./packages/
COPY apps/post-service/ ./apps/post-service/

FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder --chown node:node /app/node_modules ./node_modules

COPY --chown node:node packages/ ./packages
COPY --chown node:node apps/post-service ./apps/post-service

USER node

EXPOSE 8002

CMD ["node", "apps/post-service/src/index.js"]
