.PHONY: start-db run-backend stop-db

start-db:
	cd ./backend/docker && docker compose up -d

stop-db:
	docker compose -f backend/docker/docker-compose.yml down

start-backend: 
	cd ./backend && npm run dev

run-backend: start-db start-backend