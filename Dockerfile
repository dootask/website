FROM node:20-alpine AS builder

WORKDIR /app

COPY . .
RUN if [ -f help/package.json ]; then \
      npm run build:help; \
    elif [ -f help/index.html ]; then \
      rm -rf public/help && mv help public/help; \
    fi
RUN npm ci
RUN npm run build:nuxt

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/public/help /var/www/public/help

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
