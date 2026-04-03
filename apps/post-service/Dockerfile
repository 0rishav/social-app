# 1. Base Image
FROM node:18-alpine

# 2. Monorepo ke liye Root Workdir
WORKDIR /app

# 3. Layer Caching: Pehle saari package.json files copy karo
# Root package.json
COPY package*.json ./
# Service package.json
COPY apps/post-service/package*.json ./apps/post-service/
# Shared Packages package.json (Dependency chain)
COPY packages/common/package*.json ./packages/common/
COPY packages/protos/package*.json ./packages/protos/
COPY packages/shared-models/package*.json ./packages/shared-models/

# 4. Dependencies install karo (Root se taaki link ho jayein)
RUN npm install --production

# 5. Ab asli code copy karo (Post service + Shared logic)
COPY apps/post-service ./apps/post-service
COPY packages ./packages

# 6. Service folder ke andar jao
WORKDIR /app/apps/post-service

# 7. Port (Post-service ka jo bhi port hai, maan lo 3001)
EXPOSE 8002

# 8. Start command
CMD ["npm", "start"]