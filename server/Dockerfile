# 1. Use Node 20
FROM node:20-alpine

# ... rest of the file stays the same ...
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 5000
CMD ["npm", "start"]