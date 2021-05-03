<template>
  <v-container>
    <v-alert
      v-model="alert"
      dismissible
      transition="fade-transition"
      type="info"
      timeout="5000"
      >{{ textMsg }}</v-alert
    >
    <v-row>
      <v-col>
        <v-card>
          <v-row>
            <v-col>
              <v-form v-model="valid" ref="form">
                <v-card-text class="category d-inline-flex font-weight-light">
                  <v-combobox
                    v-model="select_categoryproduct"
                    :items="data_categoryproduct"
                    item-text="prca_name"
                    item-value="prca_pk"
                    filled
                    chips
                    label="Categoría"
                    placeholder="Seleccionar Categoría"
                  ></v-combobox>
                </v-card-text>
              </v-form>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-form v-model="valid" ref="form">
                <v-card-text class="category d-inline-flex font-weight-light">
                  <v-combobox
                    v-model="select_status"
                    :items="data_status"
                    item-text="name_status"
                    item-value="pk_status"
                    filled
                    chips
                    label="Estatus"
                    placeholder="Seleccionar Estatus"
                  ></v-combobox>
                </v-card-text>
              </v-form>
            </v-col>
          </v-row>

  
        </v-card>
        <v-card justify="end">
          <v-btn
            color="success"
            class="mr-4"
            :disabled="!valid"
            @click="GenerarReporte"
            >Generar</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      textMsg: "",
      alert: false,
      valid: false,
      select_categoryproduct: '',
      select_status: '',
      data_categoryproduct: [],
      data_status: [
        { name_status: "Mostrar Todo", pk_status: -1 },
        { name_status: "Activo", pk_status: 1 },
        { name_status: "Inactivo", pk_status: 0 },
      ],
    };
  },
  created() {
    this.getCategoryProduct();
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get("/listUser")
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getCategoryProduct() {
      axios
        .get("/categorieslist") 
        .then((response) => {
          this.data_categoryproduct = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    GenerarReporte() {
      axios;
   
      if(this.select_status === undefined || this.select_status == "" || this.select_status.pk_status == -1){
        var vStatus = '';
      }
      else
      {
        var vStatus = this.select_status.pk_status;
      }

      
      if(this.select_categoryproduct.prca_pk === undefined){
        var vPrca_PK = '';
      }
      else
      {
        var vPrca_PK = this.select_categoryproduct.prca_pk;
      }


      window.open("http://3.217.161.164:777/?pRep=17&pPrca_PK=" + vPrca_PK + "&pStatus=" + vStatus + "&pUser_PK=" + this.users.id, "_blank");
    },
    hide_alert: function (event) {
      console.log("Hide");
      // `event` is the native DOM event
      window.setInterval(() => {
        this.alert = false;
      }, 7000);
    },
  },
  mounted: function () {
    if (alert) {
      this.hide_alert();
    }
  },
};
</script>