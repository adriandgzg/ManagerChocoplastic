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
            <v-col  cols="6">
              <v-form v-model="valid" ref="form">
                <v-card-text class="category d-inline-flex font-weight-light">
                  <v-select
                    v-model="select_status"
                    :items="data_status"
                    item-text="name_status"
                    item-value="pk_status"
                    filled
                    chips
                    label="Estatus"
                    placeholder="Seleccionar Estatus"
                  ></v-select>
                </v-card-text>
              </v-form>
            </v-col>

            <v-col cols="6">
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
                    placeholder="Seleccionar Sucursal"
                    :disabled="enabledStore"
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
                      <v-btn
                        color="blue"
                        class="mr-4"
                        @click="getFilterClear"
                        >Limpiar</v-btn
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
      enabledStore: false,
      select_status: '',
      start_date: "",
      end_date: "",
      data_status: [
        { name_status: "Mostrar Todo", pk_status: -1 },
        { name_status: "Cancelado", pk_status: 0 },
        { name_status: "Pendiente", pk_status: 1 },
        { name_status: "Procesado", pk_status: 2 }
      ],
      select_stores: 0,
      stores: [],
    };
  },
  created() {
    this.getStores();
    this.getUsers();
  },
  methods: {
   
    getUsers() {
       this.users = this.$store.getters['auth/user']
    },
    getFilterClear() {
      this.start_date = "";
      this.end_date = "";
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

    GenerarReporte() {
      axios;
   
      if(this.select_status === undefined || this.select_status == "" || this.select_status.pk_status == -1 || this.select_status == -1){
        var vStatus = '';
      }
      else
      {
        var vStatus = this.select_status;
      }

      if(this.select_stores == 0)
      {
        this.select_stores = "";
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
      window.open("http://3.217.161.164:777/?pRep=12&pStor_PK=" + this.select_stores + "&pStatus=" + vStatus + "&pDateStart=" + this.start_date + "&pDateEnd=" + this.end_date + "&pUser_PK=" + this.users.id, "_blank");
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