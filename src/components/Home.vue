<template>
  <div class = "home">
   <div class="menu col-sm-4 col-sm-offset-4">
     <h2>Main menu</h2>
     <p>Please choose the desired function</p>

     <router-link to="/driver">
       <button class="btn btn-primary">driver</button>
     </router-link>
     <router-link to="/schedule">
       <button class="btn btn-primary">shedule</button>
     </router-link>
     <router-link to="/map">
       <button class="btn btn-primary">maps</button>
     </router-link>
     <router-link to="/car">
       <button class="btn btn-primary">cars</button>
     </router-link>
     <router-link to="/photo">
       <button class="btn btn-primary">photo</button>
     </router-link>
   </div>
 </div>
 </template>

 <script>
 import auth from '../auth'

 export default {
   name: 'home'
 }
 </script>
