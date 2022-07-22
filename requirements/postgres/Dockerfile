FROM postgres:alpine3.16
LABEL org.opencontainers.image.authors="lelderbe@student.21-school.ru"
ENV TZ Europe/Moscow
STOPSIGNAL SIGINT
CMD ["postgres", "-c", "logging_collector=on", "-c", "log_statement=mod"]
