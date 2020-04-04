# fancy-to-do

Fancy To-Do List API, Documentation


# FANCY TO-DO LIST API
Fancy To-Do List API

### Preparing you must have an accout to access todo

### 0.1 POST /register
_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "name": "Malik",
    "email": "malikibrahim@mail.com",
    "password": "malik"
}
```

_Response :_

```javascript
{
    "id": 8,
    "name": "Malik",
    "email": "malikibrahim@mail.com",
    "password": "$2b$10$7ojAed3a.Cq9UljgHCRXOeEMdH75TGd0eR3jKQVQszV/XpHdvZlli",
    "updatedAt": "2020-04-04T07:13:55.882Z",
    "createdAt": "2020-04-04T07:13:55.882Z"
}
```

### 0.2 POST /login
_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "malikibrahim@mail.com",
    "password": "malik"
}
```

_Response :_

```javascript
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtpYnJhaGltQG1haWwuY29tIiwiaWF0IjoxNTg1OTg0NTU0LCJleHAiOjE1ODU5ODgxNTR9.ra2WDhqSeFgDrb2D0IeY_upfZ9ABI_9-EsaY_e-YW9o"
}
```

### 1. POST /todos
_Request header:_

```javascript
{
    "Content-Type": "application/json",
    "access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtpYnJhaGltQG1haWwuY29tIiwiaWF0IjoxNTg1OTg0NTU0LCJleHAiOjE1ODU5ODgxNTR9.ra2WDhqSeFgDrb2D0IeY_upfZ9ABI_9-EsaY_e-YW9o"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "title": "title baru",
    "description": "botani",
    "status": "Complete",
    "due_date": "2020-11-11"
}
```

_Response :_

```javascript
{
    "id": 9,
    "title": "title baru",
    "description": "botani",
    "status": "Complete",
    "due_date": "2020-11-11T00:00:00.000Z",
    "UserId": 8,
    "updatedAt": "2020-04-04T07:18:12.520Z",
    "createdAt": "2020-04-04T07:18:12.520Z"
}
```

### 2. GET /todos

_Request header:_

```javascript
{
    "Content-Type": "application/json",
    "access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtpYnJhaGltQG1haWwuY29tIiwiaWF0IjoxNTg1OTg0NTU0LCJleHAiOjE1ODU5ODgxNTR9.ra2WDhqSeFgDrb2D0IeY_upfZ9ABI_9-EsaY_e-YW9o"
}
```
<br>

_Response :_

```javascript
[
    {
        "id": 9,
        "title": "title baru",
        "description": "botani",
        "status": "Complete",
        "due_date": "2020-11-11T00:00:00.000Z",
        "UserId": 8,
        "createdAt": "2020-04-04T07:18:12.520Z",
        "updatedAt": "2020-04-04T07:18:12.520Z"
    },
    {
        "id": 10,
        "title": "title lagi",
        "description": "botani",
        "status": "Complete",
        "due_date": "2020-11-11T00:00:00.000Z",
        "UserId": 8,
        "createdAt": "2020-04-04T07:21:11.747Z",
        "updatedAt": "2020-04-04T07:21:11.747Z"
    }
]
```

### 3. GET /todos/:id
_Request header:_

```javascript
{
    "Content-Type": "application/json",
    "access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtpYnJhaGltQG1haWwuY29tIiwiaWF0IjoxNTg1OTg0NTU0LCJleHAiOjE1ODU5ODgxNTR9.ra2WDhqSeFgDrb2D0IeY_upfZ9ABI_9-EsaY_e-YW9o"
}
```

<br>

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/9
```

_Response :_

```javascript
{
    "id": 9,
    "title": "title baru",
    "description": "botani",
    "status": "Complete",
    "due_date": "2020-11-11T00:00:00.000Z",
    "UserId": 8,
    "createdAt": "2020-04-04T07:18:12.520Z",
    "updatedAt": "2020-04-04T07:18:12.520Z"
}
```

_If the "id" wasn't found, the response will be :_

```javascript
"Todo Not found"
```

### 4. PUT /todos/:id
_Request header:_

```javascript
{
    "Content-Type": "application/json",
    "access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtpYnJhaGltQG1haWwuY29tIiwiaWF0IjoxNTg1OTg0NTU0LCJleHAiOjE1ODU5ODgxNTR9.ra2WDhqSeFgDrb2D0IeY_upfZ9ABI_9-EsaY_e-YW9o"
}
```

<br>

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/9
```

_Example Input (Request Body) :_

```javascript
{
    "title": "new title",
    "description": "new desc",
    "status": "Incomplete",
    "due_date": "2020-11-11"
}
```

_Response :_

```javascript
{
    "id": 9,
    "title": "new title",
    "description": "new desc",
    "status": "Incomplete",
    "due_date": "2020-11-11T00:00:00.000Z",
    "UserId": 8,
    "createdAt": "2020-04-04T07:18:12.520Z",
    "updatedAt": "2020-04-04T07:25:47.237Z"
}
```

### 5. DELETE /todos/:id
_Request header:_

```javascript
{
    "Content-Type": "application/json", "access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtpYnJhaGltQG1haWwuY29tIiwiaWF0IjoxNTg1OTg0NTU0LCJleHAiOjE1ODU5ODgxNTR9.ra2WDhqSeFgDrb2D0IeY_upfZ9ABI_9-EsaY_e-YW9o"
}
```

<br>

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/10
```

_Response :_

```javascript
{
    "id": 10,
    "title": "title lagi",
    "description": "botani",
    "status": "Complete",
    "due_date": "2020-11-11T00:00:00.000Z",
    "UserId": 8,
    "createdAt": "2020-04-04T07:21:11.747Z",
    "updatedAt": "2020-04-04T07:21:11.747Z"
}
```
# Third Party
    goqr :  http://goqr.me/api

# Server Documentation

## Server

    Tools: NodeJS, Express, sequelize, postgresql

### Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  bcryptjs         | ^4.0.1        |
|  cors             | ^2.8.5        |
|  dotenv           | ^8.2.0        |
|  express          | ^4.17.1       |
|  google-auth      | ^5.10.1       |
|  jsonwebtoken     | ^8.5.1        |
|  pg               | ^7.18.1       |
|  sequelize        | ^5.21.3       |

### Example .env

    DB_HOST=localhost
    DB_DIALECT=postgres
    DB_NAME=fancytodo
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    SECRET=gogo
    PORT=3000

### Default Port

    3000

# API Documentation

## Todos

| Url   | Method    |   Description |
| -------------     | ------------- | ------------- |
| /     | POST      | Membuat todo baru
| /     | GET       | Mendapatkan list todo
| /:id  | GET       | Mendapatkan data todo berdasarkan id
| /:id  | PUT       | Mengubah data todo berdasarkan id
| /:id  | DELETE    | Menghapus data todo berdasarkan id


## Table Responses

| Code   | Description    | 
| -------------     | ------------- |
| 200     | Response Sukses      | 
| 201     | Data baru berhasil ditambahkan      | 
| 400     | Request yang diberikan tidak lengkap atau salah      | 
| 401     | Tidak memiliki otoritas      | 
| 404     | Data tidak ditemukan / tidak ada      | 
| 500     | Error dari sisi server    | 
