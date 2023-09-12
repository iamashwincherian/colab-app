FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock next.config.js tsconfig.json prisma .env ./
COPY public tailwind.config.js postcss.config.js ./ 

RUN npx prisma generate
RUN npm install

COPY .build ./
RUN npm run build

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start" ]