FROM node:lts as dependencies
WORKDIR /lifeseed-sun
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /lifeseed-sun
COPY . .
# COPY --from=dependencies /lifeseed-sun/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /lifeseed-sun
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /lifeseed-sun/config.js ./
COPY --from=builder /lifeseed-sun/public ./public
COPY --from=builder /lifeseed-sun/.next ./.next
COPY --from=builder /lifeseed-sun/node_modules ./node_modules
COPY --from=builder /lifeseed-sun/package.json ./package.json

CMD ["yarn", "start"]