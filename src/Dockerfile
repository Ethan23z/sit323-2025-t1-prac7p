FROM node:18
WORKDIR /usr/src/app
COPY package.json yarn.lock* ./
RUN yarn install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
