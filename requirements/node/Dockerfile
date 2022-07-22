FROM node:16-alpine3.15
LABEL org.opencontainers.image.authors="lelderbe@student.21-school.ru"
ENV TZ Europe/Moscow
STOPSIGNAL SIGKILL
WORKDIR /app
CMD	npm install && \
	npm run migration:up && \
	npm run start:dev
