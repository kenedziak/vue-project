<template>
  <div class="car">
    <div class="menu col-sm-6 col-sm-offset-4">
      <h2>Car list</h2>
      <li v-for="d in cars">
        {{ d.id }}. {{ d.producent }} {{ d.model }}
        <button class="btn btn-danger" @click="carDelete(d.id)">delete</button>
        <router-link :to="'/car/edit/'+d.id">
          <button class="btn btn-warning">edit car</button>
        </router-link>
      </li>
      <br/><br/><br/>
      <router-link to="/car/add">
        <button class="btn btn-primary">add car</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: 'car',

    data() {
      return {
        cars: []
      }
    },
    methods: {
      carDelete(id) {
        this.$http.delete('https://morning-escarpment-49088.herokuapp.com/car/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )


          .then(function (data) {

            this.getCarList();

          })
      },


      getCarList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/car/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.cars = data.body;
        })
      }

    },
    beforeMount() {
      this.getCarList();
    }

  }
</script>
