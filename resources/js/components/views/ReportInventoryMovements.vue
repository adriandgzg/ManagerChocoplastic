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
                  <v-select
                    v-model="select_products"
                    :items="products"
                    item-text="prod_name_identifier"
                    item-value="prod_identifier"
                    filled
                    chips
                    label="Producto"
                    placeholder="Seleccionar Producto"
                  ></v-select>
                </v-card-text>
              </v-form>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" lg="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="start_date"
                    label="Fecha Inicio"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="start_date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="end_date"
                    label="Fecha Fin"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="end_date"
                  :min="start_date"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
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
      select_products: 0,
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
            this.select_stores = this.stores.find(
              (item) => item.stor_pk == this.users.store_id 
            );
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

      if (this.select_products == "" || this.select_products == "0") {
        this.alert = true;
        this.textMsg = "Seleccionar Producto";
        return;
      }
      if(this.select_stores.stor_pk == 0)
      {
        this.select_stores.stor_pk = "";
      }

      if (this.start_date != "" && this.end_date == "") {
        this.alert = true;
        this.textMsg = "Seleccionar Fecha Fin";
        return;
      }

      if (this.end_date != "" && this.start_date == "") {
        this.alert = true;
        this.textMsg = "Seleccionar Fecha Inicio";
        return;
      }

      window.open(
        //"http://3.217.161.164:777/?pRep=1&pProd_PK=1&pStor_PK=&pDateStart=&pDateEnd=http://52.90.189.143:8000/SMR/?pRep=1&pDateStart=" +
        "http://3.217.161.164:777/?pRep=1&pProd_PK=" +
          this.select_products +
          "&pStor_PK=" +
          this.select_stores.stor_pk +
          "&pDateStart=" +
          this.start_date +
          "&pDateEnd=" +
          this.end_date +
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