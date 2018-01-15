<template>
  <div class="driver">
    <div class="menu col-sm-6 col-sm-offset-4">
      <h2>Driver list</h2>
      <table class="table table-inverse">
        <thead>
          <tr>
             <th>Id</th>
             <th>Name</th>
             <th>Surname</th>
             <th>Username</th>
             <th> Operations</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="d in drivers">
             <th scope="row">{{d.id}}</th>
             <td>{{ d.name }}</td>
             <td> {{ d.surname }}</td>
             <td> {{d.username}}</td>
             <td>
               <button class="btn btn-danger" @click="driverDelete(d.id)">delete</button><router-link :to="'/driver/edit/'+d.id"><button class="btn btn-warning">edit driver</button></router-link>
             </td>
           </tr>
         </tbody>
       </table>
      <br/><br/><br/>
      <router-link to="/driver/add">
        <button class="btn btn-primary">add driver</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: 'driver',

    data() {
      return {
        drivers: []
      }
    },
    methods: {
      driverDelete(id) {
        this.$http.delete('https://morning-escarpment-49088.herokuapp.com/driver/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )


          .then(function (data) {

            this.getDriverList();

          })
      },


      getDriverList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/driver/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.drivers = data.body;
        })
      }

    },
    beforeMount() {
      this.getDriverList();
    }

  }
</script>
