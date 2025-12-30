# 1. Use Node 20 (Required for newer Vite versions)
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies and install
COPY package*.json ./
RUN npm install

# 4. Copy the app source code
COPY . .

# 5. Expose the default Vite port
EXPOSE 5173

# 6. Start the app
CMD ["npm", "run", "dev", "--", "--host"]