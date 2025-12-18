# Multi-stage build to keep runtime image small
FROM node:20-alpine AS deps
WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

FROM node:20-alpine AS runtime
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Install lightweight HTTP client for healthcheck
RUN apk add --no-cache curl

# Copy dependencies and source code
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY src ./src
COPY conf ./conf
COPY package*.json ./

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
  CMD curl -fsS http://localhost:3000/health || exit 1

CMD ["npm", "start"]
