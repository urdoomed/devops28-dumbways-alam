FROM node:10-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node index.js"]
