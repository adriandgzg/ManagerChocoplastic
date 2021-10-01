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
                    v-model="select_provider"
                    :items="data_client"
                    item-text="prov_name_identifier"
                    item-value="prov_pk"
                    filled
                    chips
                    label="Proveedor"
                    placeholder="Seleccionar Proveedor"
                  ></v-combobox>
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
      menu1: false,
      menu2: false,
      textMsg: "",
      alert: false,
      valid: false,
      select_provider: '',
      start_date: "",
      end_date: "",
      data_client: [],
    };
  },
  created() {
    this.getProviders();
    this.getUsers();
  },
  methods: {
    getUsers() {
       this.users = this.$store.getters['auth/user']
    },

    getProviders() {
      axios
        .get("/providerlist") 
        .then((response) => {
          this.data_client = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    GenerarReporte() {
      axios;

      if(this.select_provider == null)
      {
        var vProv_PK = '';
      }
      else
      {
        if(this.select_provider.prov_pk === undefined){
          var vProv_PK = '';
        }
        else
        {
          var vProv_PK = this.select_provider.prov_pk;
        }
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

      window.open("http://3.217.161.164:777/?pRep=8&pProv_PK=" + vProv_PK + "&pDateStart=" + this.start_date + "&pDateEnd=" + this.end_date + "&pUser_PK=" + this.users.id, "_blank");
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