<template>
  <div class="scheduleEdit col-sm-6 col-sm-offset-3">
    <div class="panel panel-default">
      <div class="panel-heading">Edit task  </div>
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
    name: 'scheduleEdit',
    components: {
      "vue-form-generator": VueFormGenerator.component
    },
    data() {
      return {
        driverList: [],
        carList:[],
        model: {
          finishDate:"",
          carId:"",
          driverId :"",
          status:"",
          description:"",
          aXcords: "",
          aYcords: "",
          bXcords: "",
          bYcords: "",
          id: this.$route.params.id,
        },
        schema: {
          fields: [
              {
               type: "input",
               inputType: "Date",
               label: "Date to finish",
               model: "finishDate",
               required: true,
               value: this.getDate,
               validator: VueFormGenerator.validators.Date
             },
            {
             type: "input",
             inputType: "number",
             label: "Point A x cord",
             model: "aXcords",
             required: true,
             validator: VueFormGenerator.validators.number
           },
           {
            type: "input",
            inputType: "number",
            label: "Point A y cord",
            model: "aYcords",
            required: true,
            validator: VueFormGenerator.validators.number
          },
          {
           type: "input",
           inputType: "number",
           label: "Point B x cord",
           model: "bXcords",
           required: true,
           validator: VueFormGenerator.validators.number
         },
         {
          type: "input",
          inputType: "number",
          label: "Point B y cord",
          model: "bYcords",
          required: true,
          validator: VueFormGenerator.validators.number
        },
          {
            type: "input",
            inputType: "text",
            label: "description",
            model: "description",
            readonly: false,
            featured: true,
            required: true,
            disabled: false,
            min: 5,
            max: 40,
            placeholder: "Description",
            validator: VueFormGenerator.validators.string
          },
          {
            type: "select",
            label: "Assign Driver",
            model: "driverId",
            required: false,
            values: this.driverListData,
            },

            {
              type: "select",
              label: "Assign car",
              model: "carId",
              required: false,
              values: this.carListData,
              },
            {
              type: "select",
              label: "Status",
              model: "status",
              required: true,
              values: ["Do aktualizacji", "Zakończony"],
              }
            , {
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
          validateAfterLoad: false,
          validateAfterChanged: true,
          validateBeforeSubmit: false
        }
      };
    },

    methods: {
      driverListData(){
        return this.driverList;

      },
      carListData(){
        return this.carList;
      },
      getDate: function () {
        return this.finishDate;
      },
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
        var driverId = this.model.driverId;
        var carId = this.model.carId;
        carId = carId[0];
        driverId  = driverId[0];

        this.$http.post('https://morning-escarpment-49088.herokuapp.com/task/update',
        {
          id: this.model.id,
          endDate: this.model.finishDate,
          driverId : driverId,
          carId: carId,
          status: this.model.status,
          description: this.model.description,
          aXcords: this.model.aXcords,
          aYcords: this.model.aXYcords,
          bXcords: this.model.bXcords,
          bYcords: this.model.bYcords,

        },{
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
      },
      getDriverList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/driver/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          var driverSurnames = [];
          var driverIds = [];
          //var jsonData = JSON.parse(myMessage);
          for (var i = 0; i < data.body.length; i++) {
              var driver = data.body[i];
              driverSurnames.push(driver.id +'. '+driver.surname);
          }
          this.driverList = driverSurnames;
        })
      },
      getCarList() {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/car/getAll', {
          headers: auth.getAuthHeader()
        }).then(function (data) {
          var cars = [];
          //var jsonData = JSON.parse(myMessage);
          for (var i = 0; i < data.body.length; i++) {
              var car = data.body[i];
              cars.push(car.id +'. '+car.model +' '+ car.producent);
          }
          this.carList = cars;
        })
      },

    },
    beforeMount() {
      this.getDriverList();
      this.getCarList();
      if(this.$route.params.id) {
        this.$http.get('https://morning-escarpment-49088.herokuapp.com/task/get/'+this.$route.params.id, {
          headers: auth.getAuthHeader()
        }).then(function (data) {

          this.model.finishDate = data.body['endDate']
          this.model.status = data.body['status']
          this.model.description = data.body['description']
          this.model.aXcords = data.body['axcords']
          this.model.aYcords = data.body['aycords']
          this.model.bXcords = data.body['bxcords']
          this.model.bYcords = data.body['bycords']
        })


      }

    }

  }
</script>
