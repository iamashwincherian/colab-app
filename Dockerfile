FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock next.config.js tsconfig.json prisma .env ./
COPY public tailwind.config.js postcss.config.js ./ 

RUN npx prisma generate
RUN npm install

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV development

EXPOSE 3000

CMD [ "npm", "run", "dev" ]