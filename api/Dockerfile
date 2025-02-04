FROM node:lts AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM deps AS development
ENV NODE_ENV=development
COPY . .
USER node
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "start:dev"]

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER node
EXPOSE 3000
ENV PORT=3000
CMD ["node", "dist/main"]
