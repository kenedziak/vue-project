<template>
  <div class="photoEdit col-sm-6 col-sm-offset-3">
    <div class="panel panel-default">
      <div class="panel-heading">Edit photo</div>
      <div class="panel-body">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'
  import router from '../router/index.js';
  import VueFormGenerator from "vue-form-generator";
  import "vue-form-generator/dist/vfg.css";

  export default {
    name: 'photoEdit',
    components: {
      "vue-form-generator": VueFormGenerator.component
    },
    data() {
      return {
        model: {
          photoURL: "url"
        },
        schema: {
          fields: [{
            type: "input",
            inputType: "text",
            label: "ID",
            model: "id",
            readonly: true,
            featured: false,
            disabled: true
          }, {
            type: "input",
            inputType: "text",
            label: "taskId",
            model: "taskId",
            readonly: false,
            featured: false,
            disabled: false
          }, {
            type: "input",
            inputType: "text",
            label: "photoURL",
            model: "photoURL",
            readonly: false,
            featured: true,
            required: true,
            disabled: false,
            placeholder: "What is the photo's adress?",
            validator: VueFormGenerator.validators.string
          },{
            type: "submit",
            buttonText: "Submit",
            onSubmit: this.submitForm,
            disabled() {
              return this.errors.length > 0;
            }
          }
          ]
        },

        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true,
          validateBeforeSubmit: true
        }
      };
    },

    methods: {
      prettyJSON: function (json) {
        if (json) {
          json = JSON.stringify(json, undefined, 4);
          json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
          });
        }
      },
      submitForm:function(){
        this.$http.post('https://morning-esphotopment-49088.herokuapp.com/photo/update', JSON.stringify(this.model),{
          headers: auth.getAuthHeader(),
          type:'POST',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',

        }).then (function (data) {
          return false;
        }),function(data){
        };
        console.log(JSON.stringify(this.model));
        router.push("/Home");
      }
    },
    beforeMount() {
      if(this.$route.params.id) {
        this.$http.get('https://morning-esphotopment-49088.herokuapp.com/photo/get/'+this.$route.params.id, {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.model = data.body;
          console.log(data.body);
        })

      }

    }

  }
</script>
