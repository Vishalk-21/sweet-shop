# Dockerfile for Frontend
FROM node:18-alpine AS builder

WORKDIR /app

COPY Frontend/package*.json ./

RUN npm install

COPY Frontend . .

RUN npm run build

# Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
