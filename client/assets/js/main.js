const BASE_URL = 'http://localhost:3000'
let myWindow = window
$(document).ready(function() {
})

if(localStorage.getItem('access_token')){
  successLogin()
}else{
  reset()
  failLogin()
}

$('#signupForm').on('click', function() {
  $('.todos').hide()
  $('#registerForm').show()
})
$('#signinForm').on('click', function() {
  failLogin()
})
$('#logout').on('click', function() {
  logout()
})
$('#addTodo').on('click', function() {
  $('.todos').hide()
  $('#addForm').show()
  $('#navbar').show()
})
$('.cancelSave').on('click', function() {
  $('.todos').hide()
  $('#home').show()
  $('#navbar').show()
})
$('#signWithGithub').on('click', function() {
  myWindow = window.open("https://github.com/login/oauth/authorize?client_id=652637bc2223e60a1218", "myWindow", 'width=350,height=300,scrollbars=no,toolbar=no,screenx=0,screeny=0,location=no,titlebar=no,directories=no,status=no,menubar=no,scrollbars=no');
  setTimeout(function () {
    myWindow.githubSignIn()
  }, 5000)
})

$('#register').submit( function(e) {
  e.preventDefault()
  register()
})
$('#login').submit( function(e) {
  e.preventDefault()
  login()
})
$('#add').submit( function(e) {
  e.preventDefault()
  add()
})
$('#update').submit(function (e) {
  e.preventDefault()
  edit()
})

function failLogin() {
  $('.todos').hide()
  $('#loginForm').show()
}
function successLogin() {
  $('.todos').hide()
  $('#home').show()
  $('#navbar').show()
  reset()
  getTodos()
}

function register() {
  const data = {
    name: $('#nameRegister').val(),
    email: $('#emailRegister').val(),
    password: $('#passwordRegister').val(),
  }
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/register`,
    data: data,
    dataType: 'json'
  })
  .done(() => {
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed up successfully'
    })
    reset()
    failLogin()
  })
  .fail(err => {
    if(err.responseJSON.message){
      $('#errorMessage').append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>${err.responseJSON.message}</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `)
    }else{      
      err.responseJSON.forEach(error => {
        $('#errorMessage').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${error}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `)
      })
    }
  })
}

function login() {
  const data = {
    email: $('#emailLogin').val(),
    password: $('#passwordLogin').val(),
  }
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/login`,
    data: data,
    dataType: 'json'
  })
  .done(result => {
      const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
    localStorage.setItem('access_token', result.access_token)
    successLogin()
  })
  .fail(err => {
    if(err.responseJSON.message){
      $('#errorMessage').append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>${err.responseJSON.message}</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `)
    }else{      
      err.responseJSON.forEach(error => {
        $('#errorMessage').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${error}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `)
      })
    }
  })
}

function logout() {
  localStorage.removeItem('access_token')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  failLogin()
  reset()
}

function reset() {
  $('#nameRegister').val('')
  $('#emailRegister').val('')
  $('#passwordRegister').val('')
  $('#emailLogin').val('')
  $('#passwordLogin').val('')
  $('#title').val('')
  $('#description').val('')
  $('#status').val('')
  $('#due_date').val('')
  $('#titleUpdate').val('')
  $('#descriptionUpdate').val('')
  $('#statusUpdate').val('')
  $('#due_dateUpdate').val('')
}

function getTodos() {
  $.ajax({
    type: 'GET',
    url: `${BASE_URL}/users`,
    dataType: 'json',
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done((users) => {
    let listUser = ''
    users.forEach(user => {
      listUser += `<a class="dropdown-item" href="#">${user.name}</a>\n`
    })
    return $.ajax({
      type: 'GET',
      url: `${BASE_URL}/todos`,
      dataType: 'json',
      beforeSend: function(req) {
        req.setRequestHeader('access_token', localStorage.getItem('access_token'))
      }
    })
    .done(todos => {
      $('#showTodos').empty()
      let i = 1;
      todos.forEach(todo => {
        let datetime = (todo.due_date).substring(0, 10).split('-')
        date = `${datetime[2]}-${datetime[1]}-${datetime[0]}`
  
        let text = `Your Todo \n\nTitle: ${todo.title}\nDescription: ${todo.description}\nDue Date: ${date}\nStatus: ${todo.status}`
        let encoded = encodeURI(text)
        $('#showTodos').append(`
          <tr>
            <th scope="row">${i++}</th>
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${date}</td>
            <td>${todo.status}</td>
            <td><img src="http://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=100x100"></td>
            <td>
              <button type="button" class="btn btn-sm btn-primary" onclick="editForm('${todo.id}')">Edit</button>
              <button type="button" class="btn btn-sm btn-danger" onclick="deleteTodo('${todo.id}')">Delete</button>
                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Invite Member</button>
                <div class="dropdown-menu">
                  ${listUser}
                </div>
            </td>
          </tr>
        `)
      })
    })
    .fail(err => {
      $('#errorMessage').append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Your Session has been expired</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `)
      logout()
    })
  })
  .fail((err) => {
    console.log(err)
  })
}


function add() {
  let data = {
    title: $('#title').val(),
    description: $('#description').val(),
    status: $('#status').val(),
    due_date: $('#due_date').val(),
  }
  console.log(data)
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/todos`,
    data: data,
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    } 
  })
  .done(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Added New Todo'
    })
    successLogin()
  })
  .fail((err) => {
    $('#errorMessage').append(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Internal server error</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `)
  })
}

function editForm(id) {
  $('.todos').hide()
  $('#updateForm').show()
  $('#navbar').show()
  $.ajax({
    type: 'GET',
    url: `${BASE_URL}/todos/${id}`,
    beforeSend: function(req) {
      req.setRequestHeader('access_token', localStorage.getItem('access_token'))
    }
  })
  .done(todo => {
    $('#idUpdate').val(`${todo.id}`)
    $('#titleUpdate').val(`${todo.title}`)
    $('#descriptionUpdate').val(`${todo.description}`)
    $('#statusUpdate').val(`${todo.status}`)
    $('#due_dateUpdate').val(`${todo["due_date"].substr(0, 10)}`)
    console.log($('#idUpdate').val())
  })
  .fail(err => {
    console.log(err)
  })
}

function edit() {
  let id = $('#idUpdate').val()
  let data = {
    title: $('#titleUpdate').val(),
    description: $('#descriptionUpdate').val(),
    status: $('#statusUpdate').val(),
    due_date: $('#due_dateUpdate').val(),
  }

 $.ajax({
   type: 'PUT',
   url: `${BASE_URL}/todos/${id}`,
   data: data,
   dataType: 'json',
   beforeSend: function(req) {
     req.setRequestHeader('access_token', localStorage.getItem('access_token'))
   }
 })
 .done(() => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Todo has been updated!'
  })
  successLogin()
 })
 .fail((err) => {
    $('#errorMessage').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Internal server error</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `)
 })
}

function deleteTodo(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: 'DELETE',
        url: `${BASE_URL}/todos/${id}`,
        dataType: 'json',
        beforeSend: function(req) {
          req.setRequestHeader('access_token', localStorage.getItem('access_token'))
        }
      })
      .done(() => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        successLogin()
      })
      .fail((err) => {
        $('#errorMessage').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Internal server error</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `)
      })
    }
  })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  sendGoogleToken(id_token)
}

function sendGoogleToken(id_token) {
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/googleSignIn`,
    data: { 'token': id_token }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    successLogin()
  })
  .fail(err => {
    console.log(err)
  })
}

function githubSignIn() {
  const query = window.location.search.substring(1)
  const token = query.split('code=')[1]
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/githubSignIn`,
    data: {requestToken: token},
    beforeSend: function(req) {
      req.setRequestHeader('Authorization', `token ${token}`)
    }
  })
  .done( res => {
    console.log(res)
    window.opener.localStorage.setItem('access_token', res.access_token)
    window.opener.successLogin()
    myWindow.close() 
  })
  .fail(err => {
    console.log
  })
}
