const BASE_URL = 'http://localhost:3000'

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
      $('#showTodos').append(`
        <tr>
          <th scope="row">${i++}</th>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${date}</td>
          <td>${todo.status}</td>
          <td>QR</td>
          <td>
            <button type="button" class="btn btn-sm btn-primary" onclick="editForm('${todo.id}')">Edit</button>
            <button type="button" class="btn btn-sm btn-danger" onclick="deleteTodo('${todo.id}')">Delete</button>
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
