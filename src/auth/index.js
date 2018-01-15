import router from '../router/index.js';
const API_URL = 'https://morning-escarpment-49088.herokuapp.com';
const LOGIN_URL = API_URL + '/oauth/token';
const SIGNUP_URL = API_URL + 'users/';
const DRIVER_URL = API_URL + 'driver/';

export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    let self = this;

    var data = new FormData()
    creds['grand_type'] = 'password';
    data.append('grant_type', 'password');
    data.append("username", creds['username']);
    data.append("password", creds['password']);
    context.$http.post(LOGIN_URL, data, {
      headers: {
        "Authorization": "Basic " + btoa("login:haslo"),
        "content-type": "application/x-www-form-urlencoded",
      }
    }).then(function (data) {


      localStorage.setItem('id_token', data.body.access_token);

      self.user.authenticated = true;
      router.push('/Home');
    }, function (err) {
      context.error = "Złe dane"
    })
  },


  logout() {
    localStorage.removeItem('id_token');
    this.user.authenticated = false;
    router.push('/login');
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token');
    if (jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },
  getAPI_URL(){
    return this.API_URL;
  },


  getAuthHeader() {
    return {
      'authorization': 'bearer ' + localStorage.getItem('id_token')
    }
  }
}
