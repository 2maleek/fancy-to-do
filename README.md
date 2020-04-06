# FANCY TO DO Server
Fancy To Do is an application to manage your activity. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "Malik",
	"email": "malikmail.com",
	"password": "test"
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
    "id": 6,
    "name": "Malik",
    "email": "malik@mail.com",
    "password": "$2b$10$xfLIEC1yVj5TYtQ3PZw/c.0D97Ij5NOPC4BMOBdA9JSbPC3MAhvue",
    "updatedAt": "2020-04-06T15:41:15.278Z",
    "createdAt": "2020-04-06T15:41:15.278Z"
}
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
  "please enter correct email"
]
```

_Response (409 - conflict)_
```
{
  "message": "Email Already registered!"
}
```

### POST /login

> Process Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "malikmail.com",
	"password": "test"
}
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjYsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtAbWFpbC5jb20iLCJpYXQiOjE1ODYxOTEzNjksImV4cCI6MTU4NjE5NDk2OX0.WNLicaqoVUNPgvqq_5y4bzXy9oflshME6ARWHk1z1Po"
}
```

#### Error Response: ####

_Response (400 - Bad Request)_
```
[
  "message": "Wrong Password!"
]
```

_Response (404 - Not Found)_
```
{
  "message": "user not registered!"
}
```





### POST /todos

> Create new todo

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjYsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtAbWFpbC5jb20iLCJpYXQiOjE1ODYxOTEzNjksImV4cCI6MTU4NjE5NDk2OX0.WNLicaqoVUNPgvqq_5y4bzXy9oflshME6ARWHk1z1Po"
}
```

_Request Body_
```
{
  "title": "belajar nodejs"
	"description": "belajar nodejs"
	"status": "incomplete"
	"due_date": "2020-01-01"
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
    "id": 13,
    "title": "belajar nodejs",
    "description": "belajar nodejs",
    "status": "Incomplete",
    "due_date": "2020-01-01T00:00:00.000Z",
    "UserId": 6,
    "updatedAt": "2020-04-06T16:53:36.080Z",
    "createdAt": "2020-04-06T16:53:36.080Z"
}
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
	"description can't be empty"
]
```
_Response (401 - Unauthorized)_
```
{
	"message": "Not authenticated!"
}
```

### GET /todos

> Get User's todos

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjYsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtAbWFpbC5jb20iLCJpYXQiOjE1ODYxOTEzNjksImV4cCI6MTU4NjE5NDk2OX0.WNLicaqoVUNPgvqq_5y4bzXy9oflshME6ARWHk1z1Po"
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
[
	{
		"id": 14,
		"title": "belajar nodejs",
		"description": "belajar nodejs Ampe mahir",
		"status": "Complete",
		"due_date": "2020-01-01T00:00:00.000Z",
		"UserId": 6,
		"createdAt": "2020-04-06T17:00:37.435Z",
		"updatedAt": "2020-04-06T17:04:42.252Z"
	},
	{
		"id": 13,
		"title": "belajar nodejs",
		"description": "belajar nodejs Ampe mahir",
		"status": "Complete",
		"due_date": "2020-01-01T00:00:00.000Z",
		"UserId": 6,
		"createdAt": "2020-04-06T16:53:36.080Z",
		"updatedAt": "2020-04-06T17:05:51.056Z"
	}
]
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
	"message": "Not authenticated!"
}
```

### GET /todos/:id

> Get todo by todo's id

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjYsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtAbWFpbC5jb20iLCJpYXQiOjE1ODYxOTEzNjksImV4cCI6MTU4NjE5NDk2OX0.WNLicaqoVUNPgvqq_5y4bzXy9oflshME6ARWHk1z1Po"
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
    "id": 13,
    "title": "belajar nodejs",
    "description": "belajar nodejs Ampe mahir",
    "status": "Complete",
    "due_date": "2020-01-01T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2020-04-06T17:00:37.435Z",
    "updatedAt": "2020-04-06T17:04:42.252Z"
}
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
	"message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
	"message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
	"message": "Todo not found! "
}
```


### PUT /todos/:id

> Update todo

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjYsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtAbWFpbC5jb20iLCJpYXQiOjE1ODYxOTEzNjksImV4cCI6MTU4NjE5NDk2OX0.WNLicaqoVUNPgvqq_5y4bzXy9oflshME6ARWHk1z1Po"
}
```

_Request Body_
```
{
  "title": "belajar nodejs"
	"description": "belajar nodejs Ampe mahir"
	"status": "Complete"
	"due_date": "2020-01-01"
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
    "id": 13,
    "title": "belajar nodejs",
    "description": "belajar nodejs Ampe mahir",
    "status": "Complete",
    "due_date": "2020-01-01T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2020-04-06T17:00:37.435Z",
    "updatedAt": "2020-04-06T17:04:42.252Z"
}
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
	"message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
	"message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
	"message": "Todo not found! "
}
```




### DELETE /todos/:id

> Update todo

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjYsIm5hbWUiOiJNYWxpayIsImVtYWlsIjoibWFsaWtAbWFpbC5jb20iLCJpYXQiOjE1ODYxOTEzNjksImV4cCI6MTU4NjE5NDk2OX0.WNLicaqoVUNPgvqq_5y4bzXy9oflshME6ARWHk1z1Po"
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
	"id": 15,
	"title": "belajar nodejs",
	"description": "belajar nodejs Ampe mahir",
	"status": "Complete",
	"due_date": "2020-01-01T00:00:00.000Z",
	"UserId": 6,
	"createdAt": "2020-04-06T17:04:12.393Z",
	"updatedAt": "2020-04-06T17:04:12.393Z"
}
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
	"message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
	"message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
	"message": "Todo not found! "
}
```


