.PHONY: help up down npm migration migrate migration_dev migrate_dev

DOCKER_EXEC_SERVER = docker exec -it blog_server

help:
	@echo "Usage:"
	@echo "> make up MODE=prod|dev (ARGS=)"
	@echo "> make down MODE=prod|dev"
	@echo "> make npm APP=server|client ARGS="
	@echo "> make migration(_dev) MIGRATION="
	@echo "> make migrate(_dev)"

up:
	docker compose -f docker-compose.$(MODE).yml --env-file env/.env.$(MODE) up --build $(ARGS)

down:
	docker compose -f docker-compose.$(MODE).yml down

npm:
	npm --prefix $(APP) $(ARGS)

migration:
	$(DOCKER_EXEC_SERVER) sh -c "npm run make:migration -- $(MIGRATION)"

migrate:
	$(DOCKER_EXEC_SERVER) sh -c "npm run migrate"

migration_dev:
	$(DOCKER_EXEC_SERVER) sh -c "npm run dev:make:migration -- $(MIGRATION)"

migrate_dev:
	$(DOCKER_EXEC_SERVER) sh -c "npm run dev:migrate"