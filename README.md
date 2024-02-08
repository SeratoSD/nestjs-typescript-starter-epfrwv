## Installation

In the root folder, with docker running:

```bash
$ docker-compose up -d
$ npm install
```

Inside /src folder, create the tables and fill them with test data following the commands below:

```bash
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

## Running the app

In the root folder:

```bash
$ npm run start
```

## Geting user permissions by id
```bash
curl  -X GET \
  'http://localhost:3000/users/1/permissions' \
  --header 'Accept: */*'
```

## Test

```bash
$ npm run test
```

## Database schema

Database in 3NF as follows:
For each table, transitive dependency was removed, so none non-prime attribute is dependent on another non-prime attribute.
The system is able to scale easily, just addind new roles and/or permissions to the correspondent tables and relate them with desired users.

![Database Schema](schema.png)
