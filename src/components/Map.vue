Map.vue<template>
  <div class="map">
    <div class="menu col-sm-6 col-sm-offset-4">
      <h2>Map list</h2>
      <li v-for="d in maps">
        {{ d.id }}. {{ d.startDate }} {{ d.endDate }}
        <button class="btn btn-danger" @click="mapDelete(d.id)">delete</button>
        <router-link :to="'/map/edit/'+d.id">
          <button class="btn btn-warning">edit map</button>
        </router-link>
      </li>
      <br/><br/><br/>
      <router-link to="/map/add">
        <button class="btn btn-primary">add map</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: 'map',

    data() {
      return {
        maps: []
      }
    },
    methods: {
      mapDelete(id) {
        this.$http.delete('https://morning-escarpment-49088.herokuapp.com/map/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )


          .then(function (data) {

            this.getMapList();

          })
      },


      getMapList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/map/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.maps = data.body;
        })
      }

    },
    beforeMount() {
      this.getMapList();
    }

  }
</script>
