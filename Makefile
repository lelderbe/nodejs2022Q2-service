RESET       = \033[0m
GREEN       = \033[0;32m
CYAN        = \033[0;36m
LIGHT_RED   = \033[1;31m
LIGHT_WHITE = \033[1;37m

INFO        = #${CYAN}
WARNING     = ${LIGHT_RED}
SECTION     = #${LIGHT_WHITE}

help:
		@echo "Usage: make [target] ..."
		@echo "  ${INFO}start${RESET}            - start docker containers"
		@echo "  ${INFO}stop${RESET}             - stop and remove docker containers"
		@echo "  ${INFO}test${RESET}             - run application tests"
		@echo
		@echo "${SECTION}Migrations${RESET}"
		@echo "  ${INFO}migration${RESET}        - apply available migrations"
		@echo "  ${INFO}migration-down${RESET}   - revert last migration"
		@echo "  ${INFO}migration-gen NAME=NameForMigration${RESET} - generate migration"
		@echo
		@echo "${SECTION}Cleaning${RESET}"
		@echo "  ${WARNING}db-drop${RESET}          - Warning: clear database (drop all tables)"
		@echo "  ${WARNING}clean${RESET}            - Warning: stop and remove containers, network, DB data volume"
		@echo "  ${WARNING}fclean${RESET}           - Warning: clean + remove docker images"
		@echo

start:
		docker-compose up

stop:
		docker-compose down

migration:
		docker-compose exec node npm run migration:up

migration-down:
		docker-compose exec node npm run migration:down

migration-gen:
		docker-compose exec node npm run migration:gen migrations/${NAME}

db-drop:
		docker-compose exec node npm run db:drop

clean:
		docker-compose down --rmi local -v

fclean: clean
		docker rmi node:rss 2>/dev/null || true
		docker rmi postgres:rss 2>/dev/null || true

test:
		docker-compose exec node npm run test

.PHONY: all help run start stop migration migration-down migration-gen db-drop clean fclean re test
