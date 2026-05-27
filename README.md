# Trabalho faculdade

## Ambiente de desenvolvimento (somente na primeira vez)

- Instalar o docker na sua máquina, se não houver
- Abrir o terminal dentro da pasta que contém este 'README.md'
- Iniciar a aplicação:

```shell
docker compose up -d
```

- Conectar no conteiner:

```shell
docker exec -it trabalho bash
```

- Permitir que o app escreva na pasta 'data':

```shell
chmod -R 777 /var/www/html/data
```

- Desconectar do conteiner:

```shell
exit
```

- Finalizar o conteiner:

```shell
docker compose down -d
```

## Iniciar

```shell
docker compose up -d
```

## Acessar

> http://localhost:8080

## Finalizar

```shell
docker compose down -d
```