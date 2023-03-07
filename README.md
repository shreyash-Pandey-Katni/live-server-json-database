# Usage [![Node.js Package](https://github.com/shreyash-Pandey-Katni/liveserver-json-database/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/shreyash-Pandey-Katni/liveserver-json-database/actions/workflows/npm-publish.yml) [![Github All Releases](https://img.shields.io/github/downloads/shreyash-Pandey-Katni/live-server-json-database/total.svg)]()

To run the application, execute the following command:

```
liveserver-json-database -f {file_path} -p {port}
```

Once the server is running, you can use the following endpoints to interact with the API:

### POST /addData

Adds a new data object to the file. The data object should be sent in the request body.

Example request:

```bash
curl --request POST \
  --url http://localhost:3000/addData \
  --header 'Content-Type: application/json' \
  --data '{
 <your_data_object>
}'
```

Example response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "msg": "Data added"
}
```

### GET /listData

Returns an array of all the data objects in the file.

Example request:

```bash
curl --request GET \
  --url http://localhost:3000/listData \
  --header 'Content-Type: application/json'
```

Example response:

```bash

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "name": "John",
    "age": 30
  },
  {
    "name": "Jane",
    "age": 25
  }
]
```

### GET /deleteData

Deletes a data object from the file. The ID of the data object to delete should be sent in the request body.

Example request:

```bash
curl --request GET \
  --url http://localhost:3000/deleteData \
  --header 'Content-Type: application/json' \
  --data '{
 "id":<id_of_data_object_to_delete>
}'
```

Example response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "msg": "Data deleted"
}
```

### GET /updateData

Updates a data object in the file. The updated data object should be sent in the request body.

Example request:

```bash
curl --request PUT \
  --url 'http://localhost:3000/updateData/1465?=1465' \
  --header 'Content-Type: application/json' \
  --data '<dictionary of updated data>'
```

Example response:

```bash

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "msg": "Data updated"
}
```
