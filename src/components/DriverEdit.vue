<template>
  <div class="driverEdit col-sm-6 col-sm-offset-3">
    <div class="panel panel-default">
      <div class="panel-heading">Edit driver</div>
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
    name: 'driverEdit',
    components: {
      "vue-form-generator": VueFormGenerator.component
    },
    data() {
      return {
        model: {
          id:this.$route.params.id
        },
        schema: {
          fields: [
            {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            readonly: false,
            featured: true,
            min: 5,
            max: 40,
            required: false,
            disabled: false,
            placeholder: "User's name",
            validator: VueFormGenerator.validators.string
          },{
            type: "input",
            inputType: "text",
            label: "Surname",
            model: "surname",
            readonly: false,
            featured: true,
            required: false,
            min: 5,
            max: 40,
            disabled: false,
            placeholder: "User's surname",
            validator: VueFormGenerator.validators.string
          },{
            type: "input",
            inputType: "text",
            label: "Username",
            model: "username",
            readonly: false,
            featured: true,
            required: false,
            min: 5,
            max: 40,
            disabled: false,
            placeholder: "User's username",
            validator: VueFormGenerator.validators.string
          }, {
            type: "input",
            inputType: "email",
            label: "E-mail",
            required: false,
            model: "email",
            placeholder: "User's e-mail address",
            validator: VueFormGenerator.validators.email
          },{
            type: "input",
            inputType: "number",
            label: "Pesel",
            model: "pesel",
            required: false,
            validator: VueFormGenerator.validators.number
          }, {
            type: "input",
            inputType: "number",
            label: "Phone number",
            model: "phoneNumber",
            validator: VueFormGenerator.validators.number
          },  {
            type: "switch",
            label: "Sex",
            model: "isMale",
            multi: true,
            readonly: false,
            featured: false,
            disabled: false,
            default: true,
            textOn: "Male",
            textOff: "Female"
          }, {
              type: "submit",
              buttonText: "Submit",
              onSubmit: this.submitForm,
            disabled() {
              return this.errors.length>0;
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
        this.$http.post('https://morning-escarpment-49088.herokuapp.com/driver/update', JSON.stringify(this.model),{
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
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/driver/get/'+this.$route.params.id, {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          this.model = data.body;
          console.log(data.body);
        })

      }

    }

  }
</script>
