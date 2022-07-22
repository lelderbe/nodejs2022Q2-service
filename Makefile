run:
		docker-compose up

stop:
		docker-compose down

migration:
		docker-compose exec node npm run migration:up

migration-down:
		docker-compose exec node npm run migration:down

# use: make migration-gen NAME=migrations/AddVersionColumnToUsers
migration-gen:
		docker-compose exec node npm run migration:gen ${NAME}

db-drop:
		docker-compose exec node npm run db:drop

fclean:
		docker-compose down --rmi local -v

.PHONY:	all run stop migration migration-down migration-gen clean fclean re
