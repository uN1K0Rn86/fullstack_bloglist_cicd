# Build Frontend
FROM node:20-bullseye AS frontend-build

WORKDIR /app/bloglist-frontend

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python

# Install node modules
COPY bloglist-frontend/package-lock.json bloglist-frontend/package.json ./
RUN npm ci --include=dev

# Copy application code
COPY bloglist-frontend/ .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Build Backend
FROM frontend-build AS backend-build

WORKDIR /app/bloglist-backend

# Copy backend package files and install deps
COPY bloglist-backend/package-lock.json bloglist-backend/package.json ./
RUN npm install --production

# Copy backend source code
COPY bloglist-backend/ .

# Copy frontend build from previous stage into backend's 'dist' folder
COPY --from=frontend-build /app/bloglist-frontend/dist ./dist

ENV NODE_ENV="production"
ENV PORT=3003

# Expose port and start application
EXPOSE 3003
CMD [ "node", "index.js" ]