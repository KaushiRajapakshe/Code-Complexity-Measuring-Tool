from node:16-alpine

WORKDIR /

COPY . .

EXPOSE 8090

RUN npm install

CMD ["npm","start"]