<template>
  <div class="photo">
    <div class="menu col-sm-6 col-sm-offset-4">
      <h2>Photo list</h2>
      <li v-for="d in photos">
        {{ d.id }}. {{ d.photoURL }}
        <button class="btn btn-danger" @click="photoDelete(d.id)">delete</button>
      </li>
      <br/><br/><br/>
      <router-link to="/photo/add">
        <button class="btn btn-primary">add photo</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/'

  export default {
    name: 'photo',

    data() {
      return {
        photos: []
      }
    },
    methods: {
      photoDelete(id) {
        this.$http.delete('https://morning-escarpment-49088.herokuapp.com/photo/delete', {
            body: {
              "id": id
            },
            headers: auth.getAuthHeader()
          }
        )


          .then(function (data) {

            this.getPhotoList();

          })
      },


      getPhotoList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/photo/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.photos = data.body;
        })
      }

    },
    beforeMount() {
      this.getPhotoList();
    }

  }
</script>
