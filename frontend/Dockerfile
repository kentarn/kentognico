# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build argument for API URL
ARG VITE_API_BASE_URL=http://backend:4000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the application
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Copy custom nginx config
RUN echo 'server {\n    listen 80;\n    server_name localhost;\n    root /usr/share/nginx/html;\n    index index.html;\n\n    # Gzip Settings\n    gzip on;\n    gzip_vary on;\n    gzip_min_length 1024;\n    gzip_proxied expired no-cache no-store private must-revalidate max-age=0;\n    gzip_types\n        text/plain\n        text/css\n        text/xml\n        text/javascript\n        application/javascript\n        application/xml+rss\n        application/json;\n\n    # Handle SPA routing\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n\n    # Cache static assets\n    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {\n        expires 1y;\n        add_header Cache-Control "public, immutable";\n    }\n}' > /etc/nginx/conf.d/default.conf

# Copy built application from build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]