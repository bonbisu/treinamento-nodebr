## Docker Container Databases

Para verificar serviços docker rodando, usar o comando:
```sh
docker ps
```

## ---- POSTGRES

Criando a imagem postgres e rodando em segunho plano com a flag `-d` na porta 5432:5432 (interna:externa).

```sh
docker run \
    --name postgres \
    -e POSTGRES_USER=fcosta \
    -e POSTGRES_PASSWORD=Senha01 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
```

Criando a imagem adminer(admin do postgres) e rodando em segunho plano com a flag `-d` na porta 8080:8080.

```sh
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
```
Executando o shell do container (ou qualquer outra aplicação).

```sh
docker exec -it postgres /bin/bash
```

## ---- MONGOBD

Criando a imagem mongodb e rodando em segunho plano com a flag `-d` na porta 27017:27017.

```sh
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=Senha01 \
    -d \
    mongo:4
```

Criando a imagem mongoclient(admin do mongodb) e rodando em segunho plano com a flag `-d` na porta 3000:3000.

```sh
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
```

Criando um usuário para o banco com limitação de Read/Write na collection `herois`.

```sh
docker exec -it mongodb \
    mongo --host localhost -u admin -p Senha01 --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'fcosta', pwd: 'Senha01', roles: [{role: 'readWrite', db: 'herois'}]})"
```