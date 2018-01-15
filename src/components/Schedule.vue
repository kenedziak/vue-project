<template>
  <div class="shedule">
    <div class="menu col-sm-6 col-sm-offset-4">
      <h2>Task list</h2>
      <table class="table table-inverse">
        <thead>
          <tr>
             <th>Id</th>
             <th>Finish date</th>
             <th>car id</th>
             <th>driver id</th>
             <th>status </th>
             <th> Operations </th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="t in tasks">
             <th scope="row">{{ t.id }}</th>
             <td>{{ t.endDate }}</td>
             <td> {{ t.carId }}</td>
             <td> {{ t.driverId }}</td>
             <td> {{ t.status }}</td>

             <td>
               <button class="btn btn-danger" @click="taskDelete(t.id)">delete</button><router-link :to="'/shedule/edit/'+t.id"><button class="btn btn-warning">edit task</button></router-link>
             </td>
           </tr>
         </tbody>
       </table>
      <br/><br/><br/>
      <router-link to="/shedule/add">
        <button class="btn btn-primary">add task</button>
      </router-link>
      </div>
</div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: 'shedule',

    data() {
      return {
        tasks: []
      }
    },
    methods: {
      taskDelete(id) {
        this.$http.delete('https://morning-escarpment-49088.herokuapp.com/task/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )


          .then(function (data) {

            this.getTaskList();

          })
      },


      getTaskList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/task/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.tasks = data.body;
        })
      }

    },
    beforeMount() {
      this.getTaskList();
    }

  }
</script>
