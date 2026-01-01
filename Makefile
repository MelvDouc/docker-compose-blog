.PHONY: help up down npm migration_dev

help:
	@echo "Usage:"
	@echo "> make up MODE=prod|dev (ARGS=)"
	@echo "> make down MODE=prod|dev"
	@echo "> make npm APP=server|client ARGS"
	@echo "> make migration_dev MIGRATION="

up:
	docker compose -f docker-compose.$(MODE).yml --env-file env/.env.$(MODE) up --build $(ARGS)

down:
	docker compose -f docker-compose.$(MODE).yml down

npm:
	npm --prefix $(APP) $(ARGS)

migration_dev:
	docker exec -it blog_server sh -c "npm run make:migration -- $(MIGRATION)"