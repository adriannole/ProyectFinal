FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps react-router-dom



COPY . .

EXPOSE 3000
CMD ["npm", "start"]
