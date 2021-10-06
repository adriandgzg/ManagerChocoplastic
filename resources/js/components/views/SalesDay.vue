<template>
  <v-app>
    <v-container>
      <v-alert type="warning" v-model="boxEnabled">
        Para realizar una venta, primero debe abrir caja.
      </v-alert>
      <v-dialog v-model="loading" persistent width="300">
        <v-card color="white">
          <v-card-text>
            Cargando
            <v-progress-linear
              indeterminate
              color="green"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-snackbar color="#000000" v-model="snackbar" :timeout="timeout">
        {{ textMsg }}
        <v-btn color="blue" text @click="snackbar = false"> Cerrar </v-btn>
      </v-snackbar>

      <v-row>
        <v-col>
          <v-card>
            <v-data-table
              :headers="headers"
              :search="search"
               disable-sort
              class="elevation-3"
              :footer-props="footerProps"
              :loading="loading"
              :options.sync="options"
              :server-items-length="total"
            >
              <template v-slot:top>
                <v-system-bar color="indigo darken-2" dark></v-system-bar>
                <v-toolbar flat color="indigo">
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-col cols="12" sm="12">
                  <v-text-field
                    autofocus
                    v-model="search"
                    append-icon="search"
                    label="Buscar"
                    single-line
                    hide-details
                    @keyup.en.enter="getSales"
                  ></v-text-field>
                </v-col>
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip
                  v-if="item.clsa_status == '0'"
                  color="gray"
                  dark
                >
                  {{ item.clsa_status_description }}
                </v-chip>
                <v-chip v-else color="green" dark>{{
                  item.clsa_status_description
                }}</v-chip>
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn
                  class="mr-2"
                  fab
                  dark
                  small
                  color="pink"
                  v-if="
                    item.clsa_status != '0' &&
                    item.can_return &&
                    can('clientreturn')
                  "
                  :href="'/clientsreturn/' + item.clsa_pk"
                  title="Devolución"
                >
                  <v-icon dark>mdi-arrow-left-bold-circle</v-icon>
                </v-btn>
                <v-btn
                  class="mr-2"
                  fab
                  dark
                  small
                  color="purple"
                  title="Detalle de venta"
                  :href="'/salesdetail/' + item.clsa_pk"
                >
                  <v-icon dark>mdi-eye</v-icon>
                </v-btn>

                <v-btn
                  v-if="item.clsa_status != '0'"
                  class="mr-2"
                  fab
                  dark
                  small
                  color="orange"
                  @click="
                    printTicket('/client/sales/printOrder/' + item.clsa_pk)
                  "
                  title="Imprimir ticket"
                >
                  <v-icon dark>mdi-printer</v-icon>
                </v-btn>
                <v-btn
                  class="mr-2"
                  fab
                  dark
                  small
                  color="cyan"
                  title="Continuar venta"
                  v-if="item.clsa_status == '0' && boxEnabled != true"
                  :href="'/detaiorder/' + item.clor_fk"
                >
                  <v-icon dark>mdi-cash-register</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import CripNotice from "crip-vue-notice";
export default {
  data() {
    return {
      headers: [
        {
          text: "Venta",
          value: "clsa_identifier",
          width: "10%",
        },
        {
          text: "Pedido",
          value: "clor_identifier",
          width: "10%",
        },
        {
          text: "Cliente",
          value: "clie_name",
        },
        {
          text: "Sucursal",
          value: "stor_name",
        },
        {
          text: "Método Pago",
          value: "pame_name",
        },
        {
          text: "Fecha",
          value: "created_at",
        },
        {
          text: "Estatus",
          value: "status",
        },
        {
          text: "",
          value: "action",
          width: "20%",
        },
      ],
      select: 0,
      principal: false,
      estado: true,
      editedIndex: -1,
      sales: [],
      sales0: [],
      search: "",
      dialog: false,
      snackbar: false,
      timeout: 2000,
      idUserStore: 0,
      textMsg: "",
      boxEnabled: false,
      folioRules: [
        (value) => !!value || "Requerido.",
        (value) => (value && value.length >= 10) || "Min 10 caracter",
      ],
      nameRules: [
        (value) => !!value || "Requerido.",
        (value) => (value && value.length >= 3) || "Min 3 caracteres",
      ],
      phoneRules: [
        (value) => !!value || "Requerido.",
        (value) => (value && value.length == 10) || "Requiere 10 caracteres",
      ],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: "",
       options: {},
       pagination: {
          current: 1,
          total: 0
       },
       footerProps: {'items-per-page-options': [10, 20, 100]},
       total: 0,
    };
  },
  created() {
    this.obtenerCaja();
  },

  methods: {
    obtenerCaja() {
      axios
        .get("/boxcut")
        .then((response) => {
          if (response.data.data == null) {
            this.boxEnabled = true;
          } else {
            this.boxEnabled = false;
          }
          console.log("boxEnabled -->" + this.boxEnabled);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getSales() {
      this.loading = true;
      axios
        .get("/clientsales")
        .then((response) => {
          setTimeout(() => (this.loading = false), 500);
          if (response.data.data != null) {
             this.sales = response.data.data.data;
             this.total = response.data.data.total;
             if (this.options.page>response.data.data.last_page){
                this.options.page=response.data.data.last_page
             }
          } else {
            this.normal("Notificación", response.data.status.message, "error");
          }
        })
        .catch((e) => {
          console.log(e);
          this.normal("Notificación", "Error al cargar los datos", "error");
        });
    },
    printTicket(url) {
      var newWin = window.open(url, "Imprimir orden", "height=400,width=600");
      setTimeout(function () {
        newWin.print();
      }, 1000);
      setTimeout(function () {
        newWin.close();
      }, 50000);
      return true;
    },
    normal(Title, Description, Type) {
      this.notice = new CripNotice({
        title: Title,
        description: Description,
        className: "open-normal",
        closable: true,
        duration: 3,
        type: Type,
      });
    },
  },
  computed: {
    ...mapGetters("auth", ["can"]),
  },
   watch: {
      options: {
         handler() {
            this.getSales()
         },
         deep: true,
      }
   }
};
</script>
