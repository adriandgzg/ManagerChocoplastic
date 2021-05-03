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
                    v-model="select_product"
                    :items="data_product"
                    item-text="prod_name_identifier"
                    item-value="prod_pk"
                    filled
                    chips
                    label="Producto"
                    placeholder="Seleccionar Producto"
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
      select_product: '',
      data_product: [],
     
    };
  },
  created() {
    this.getProducts();
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

    getProducts() {
      axios
        .get("/productList")
        .then((response) => {
          this.data_product = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GenerarReporte() {
      axios;
   
      if(this.select_product.prod_pk === undefined){
        var vProd_PK = '';
      }
      else
      {
        var vProd_PK = this.select_product.prod_pk;
      }


      window.open("http://3.217.161.164:777/?pRep=18&pProd_PK=" + vProd_PK + "&pUser_PK=" + this.users.id, "_blank");
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