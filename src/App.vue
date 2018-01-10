<template>
  <div id="app">
    <header>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <button>
        <router-link to="/home">home</router-link>
      </button>
      <button>
        <router-link v-if="!user.authenticated" to="/Login">Sign In</router-link>
      </button>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import auth from './auth'
export default {
  name: 'app',
   data() {
        return {
          user: auth.user
        }
   },
   methods: {
     logout() {
       auth.logout()
     }
   }
 }
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
