<template>
  <div class="mapAdd col-sm-6 col-sm-offset-3">
    <div class="panel panel-default">
      <div class="panel-heading">Add map</div>
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
    name: 'mapAdd',
    components: {
      "vue-form-generator": VueFormGenerator.component
    },
    data() {
      return {
        model: {
          id: "",
          status: "przejezdna",
          startDate: 1516036517000,
          endDate: 1519000000000,
          taskId: "",
          aXcords: 13,
          aYcords: 15,
          bXcords: 1,
          bYcords: 64,
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
            label: "Status",
            model: "status",
            readonly: false,
            featured: true,
            required: true,
            disabled: false,
            placeholder: "road's status",
            validator: VueFormGenerator.validators.string
          }, {
            type: "input",
            inputType: "date",
            label: "Start Date",
            model: "startDate"
          }, {
            type: "input",
            inputType: "date",
            label: "End Date",
            model: "endDate"
          },  {
            type: "input",
            inputType: "number",
            label: "coordinates from - X",
            model: "aXcords",
            validator: VueFormGenerator.validators.number
          },   {
            type: "input",
            inputType: "number",
            label: "coordinates from - Y",
            model: "aYcords",
            validator: VueFormGenerator.validators.number
          },   {
            type: "input",
            inputType: "number",
            label: "coordinates to - X",
            model: "bXcords",
            validator: VueFormGenerator.validators.number
          },   {
            type: "input",
            inputType: "number",
            label: "coordinates to - Y",
            model: "bYcords",
            validator: VueFormGenerator.validators.number
          }, {
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
      submitForm: function () {
        this.$http.put('https://morning-escarpment-49088.herokuapp.com/map/create', JSON.stringify(this.model), {
          headers: auth.getAuthHeader(),
          type:'PUT',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',

        }).then(function () {
        }), function (data) {
          console.log(data);
        };
        router.push("/Home");
      }
    }

  }
</script>
