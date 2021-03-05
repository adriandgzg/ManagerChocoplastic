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
                  <v-select
                    v-model="select_stores"
                    :items="stores"
                    item-text="stor_name"
                    item-value="stor_pk"
                    filled
                    chips
                    label="Sucursal"
                    placeholder="Selecciona Sucursal"
                    :disabled="enabledStore"
                  ></v-select>
                </v-card-text>
              </v-form>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-form v-model="valid" ref="form">
                <v-card-text class="category d-inline-flex font-weight-light">
                  <v-combobox
                    v-model="select_products"
                    :items="products"
                    item-text="prod_name_identifier"
                    item-value="prod_identifier"
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
      enabledStore: false,
      menu1: false,
      menu2: false,
      textMsg: "",
      alert: false,
      valid: false,
      select_stores: 0,
      select_products: '',
      start_date: "",
      end_date: "",
      stores: [],
      products: [],
    };
  },
  created() {
    this.getStores();
    this.getUsers();
    this.getProducts();
  },
  methods: {
    getUsers() {
      axios
        .get("/listUser")
        .then((response) => {
          this.users = response.data.data;

          if (this.users.store_id > 0) {
            this.enabledStore = true;
            this.select_stores = this.users.store_id;
          } else this.enabledStore = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getStores() {
      axios
        .get("/storeget")
        .then((response) => {
          this.stores = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getProducts() {
      axios
        .get("/productList")
        .then((response) => {
          this.products = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    GenerarReporte() {
      axios;

      if(this.select_stores == 0)
      {
        this.select_stores = "";
      }

      if(this.select_products.prod_pk === undefined){
        var vprod_pk = '';
      }
      else
      {
        var vprod_pk = this.select_products.prod_pk;
      }

      window.open(
        "http://3.217.161.164:777/?pRep=2&pProd_PK=" +
          vprod_pk +
          "&pStor_PK=" +
          this.select_stores +
          "&pUser_PK=" +
          this.users.id,
        "_blank"
      );
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