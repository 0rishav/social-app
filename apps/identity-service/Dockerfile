# Stage 1: Build/Install
FROM node:20-alpine
WORKDIR /app

# 3. Layer Caching: Pehle saari package.json files copy karo
# Root package.json
COPY package*.json ./
# Service package.json
COPY apps/identity-service/package*.json ./apps/identity-service/
# Shared Packages package.json (Dependency chain)
COPY packages/common/package*.json ./packages/common/


# 4. Dependencies install karo (Root se taaki link ho jayein)
RUN npm install --production

# 5. Ab asli code copy karo (Post service + Shared logic)
COPY apps/identity-service ./apps/identity-service
COPY packages ./packages

# 6. Service folder ke andar jao
WORKDIR /app/apps/identity-service

# 7. Port (Post-service ka jo bhi port hai, maan lo 3001)
EXPOSE 8002
CMD ["npm", "start"]