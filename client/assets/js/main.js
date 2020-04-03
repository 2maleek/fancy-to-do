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

$('#register').submit( function(e) {
  e.preventDefault()
  register()
})
$('#login').submit( function(e) {
  e.preventDefault()
  login()
})

function failLogin() {
  $('.todos').hide()
  $('#loginForm').show()
}
function successLogin() {
  $('.todos').hide()
  $('#home').show()
  $('#navbar').show()
}

function register() {
  const data = {
    name: $('#nameRegister').val(),
    email: $('#emailRegister').val(),
    password: $('#passwordRegister').val(),
  }
  console.log(data)
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/register`,
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
  console.log(data)
  $.ajax({
    type: 'POST',
    url: `${BASE_URL}/login`,
    data: data,
    dataType: 'json'
  })
  .done(result => {
    
    console.log(result)
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
}