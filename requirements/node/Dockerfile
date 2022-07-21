FROM node:16-alpine3.15
LABEL org.opencontainers.image.authors="lelderbe@student.21-school.ru"
ENV TZ Europe/Moscow
STOPSIGNAL SIGKILL
WORKDIR /app
# EXPOSE 4000
# RUN npm i
# ENTRYPOINT ["node", "index.js"]
CMD	\
# 	yarn config set strict-ssl false && \
# 	# export NODE_TLS_REJECT_UNAUTHORIZED='0' && \
	npm i && \
# 	# yarn build && \
# 	yarn migration:up && \
	npm run start:dev && \
	echo
