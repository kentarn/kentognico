# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY src ./src/

# Build the application
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from build stage
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma/

# Create a script to run migrations and start the server
COPY <<EOF /app/start.sh
#!/bin/sh
npx prisma migrate deploy
npm run db:seed
npm start
EOF

RUN chmod +x /app/start.sh

EXPOSE 4000

CMD ["/app/start.sh"]