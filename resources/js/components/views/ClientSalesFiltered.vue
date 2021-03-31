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
              :items="data_order"
              :search="search"
              sort-by="id"
              class="elevation-3"
            >
              <template v-slot:top>
                <v-system-bar color="indigo darken-2" dark></v-system-bar>
                <v-toolbar flat color="indigo">
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-combobox
                        required
                        v-model="SelectSucursal"
                        :items="stores"
                        label="Sucursal"
                        :disabled="enabledStore"
                        item-text="stor_name"
                        item-value="stor_pk"
                        filled
                        chips
                        placeholder="Seleccionar una sucursal"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6">
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
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-combobox
                        v-model="selectClient"
                        :items="clients"
                        label="Cliente"
                        item-text="clie_name"
                        item-value="clie_pk"
                        filled
                        chips
                        placeholder="Seleccionar Cliente"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                      <v-combobox
                        v-model="selectpame"
                        :items="payments"
                        label="Métodos de pago"
                        item-text="pame_name"
                        item-value="pame_pk"
                        filled
                        chips
                        placeholder="Seleccionar Método Pago"
                      ></v-combobox>
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
                  <v-row>
                    <v-col>
                      <v-btn color="success" class="mr-4" @click="getSaleFilter"
                        >Buscar</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn
                        color="blue"
                        class="mr-4"
                        @click="getSaleFilterClear"
                        >Limpiar</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-col cols="12" sm="12">
                  <v-text-field
                    autofocus
                    v-model="search"
                    append-icon="search"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
              </template>

              <template v-slot:item="props">
                <tr>
                  <td style="font-weight: 600 !important">
                    {{ props.item.clsa_identifier }}
                  </td>
                  <td>{{ props.item.clor_identifier }}</td>
                  <td>{{ props.item.clie_name }}</td>
                  <td>{{ props.item.stor_name }}</td>
                  <td>{{ props.item.pame_name }}</td>
                  <td>{{ props.item.created_at }}</td>
                  <td>
                    <v-chip v-if="props.item.clsa_status == 0" color="red" dark>
                      Pendiente</v-chip
                    >
                    <v-chip
                      v-if="props.item.clsa_status == 2"
                      color="blue"
                      dark
                    >
                      En Proceso de Pago</v-chip
                    >
                    <v-chip
                      v-if="props.item.clsa_status == 3"
                      color="green"
                      dark
                      >Pagado</v-chip
                    >
                  </td>
                  <td>
                    <v-btn
                      class="mr-2"
                      fab
                      dark
                      small
                      color="pink"
                      v-if="
                        props.item.clsa_status_description != 'Pendiente' &&
                        props.item.cantreturn == 0 &&
                        can('clientreturn')
                      "
                      :href="'/clientsreturn/' + props.item.clsa_pk"
                      title="Devolución"
                    >
                      <v-icon dark>mdi-arrow-left-bold-circle</v-icon></v-btn
                    >
                    <v-btn
                      class="mr-2"
                      fab
                      dark
                      small
                      color="purple"
                      title="Detalle de venta"
                      :href="'/salesdetail/' + props.item.clsa_pk"
                    >
                      <v-icon dark>mdi-eye</v-icon></v-btn
                    >
                    <v-btn
                      v-if="props.item.clsa_status_description != 'Pendiente'"
                      class="mr-2"
                      fab
                      dark
                      small
                      color="orange"
                      @click="
                        printTicket(
                          '/client/sales/printOrder/' + props.item.clsa_pk
                        )
                      "
                      title="Imprimir ticket"
                    >
                      <v-icon dark>mdi-printer</v-icon></v-btn
                    >
                    <v-btn
                      class="mr-2"
                      fab
                      dark
                      small
                      color="cyan"
                      title="Continuar venta"
                      v-if="
                        props.item.clsa_status_description == 'Pendiente' &&
                        boxEnabled != true
                      "
                      :href="'/detaiorder/' + props.item.clor_pk"
                      ><v-icon dark>mdi-cash-register</v-icon></v-btn
                    >
                  </td>
                </tr>
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
        },
        {
          text: "Pedido",
          value: "clor_identifier",
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
        },
      ],
      menu2: false,
      select: 0,
      selectClient: "",
      selectpame: "",
      payments: [],
      clients: [],
      paymentsShapes: [],
      principal: false,
      estado: true,
      editedIndex: -1,
      data_order: [],
      search: "",
      dialog: false,
      snackbar: false,
      timeout: 2000,
      idUserStore: 0,
      textMsg: "",
      menu1: false,
      stores: [],
      SelectSucursal: "",
      enabledStore: false,
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: "",
      data_filter: {
        stor_pk: 0,
        clor_status: -1,
        start_date: "",
        end_date: "",
        clie_pk: 0,
        pame_pk: 0

      },
      boxEnabled: false,
      select_status: "",
      start_date: "",
      end_date: "",
      data_status: [
        { name_status: "Mostrar Todo", pk_status: -1 },
        { name_status: "Pendiente", pk_status: 0 },
        { name_status: "En Proceso de Pago", pk_status: 2 },
        { name_status: "Pagado", pk_status: 3 },
      ],
    };
  },
  created() {
    this.getStores();
    this.getUsers();
    this.obtenerCaja();
    this.getClients();
    this.getPayment();
  },

  methods: {
    getPayment() {
      axios
        .get("/paymentmethodsget")
        .then((response) => {
          this.payments = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getClients() {
      axios
        .get("/clientsget")
        .then((response) => {
          this.clients = response.data.data;
        })
        .catch((e) => {
          console.log(e);
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
    getUsers() {
      axios
        .get("/listUser")
        .then((response) => {
          this.users = response.data.data;

          if (this.users.store_id > 0) {
            this.enabledStore = true;
            this.SelectSucursal = this.stores.find(
              (item) => item.stor_pk == this.users.store_id
            );
          } else this.enabledStore = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
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
    getSaleFilterClear() {
      this.start_date = "";
      this.end_date = "";
      //this.getOrderFilter();
    },
    getSaleFilter() {
      if (this.SelectSucursal == "") {
        this.normal("Sucursal", "Seleccionar Sucursal", "warning");
        return false;
      }

      if (this.select_status == null || this.select_status === undefined || this.select_status == "" || this.select_status.pk_status == -1) 
      {
        var vStatus = -1;
      } 
      else 
      {
        var vStatus = this.select_status.pk_status;
      }

      if (this.selectClient == null || this.selectClient === undefined || this.selectClient == "" || this.selectClient.clie_pk == -1) 
      {
        var vClient = -1;
      } 
      else 
      {
        var vClient = this.selectClient.clie_pk;
      }

      if (this.selectpame == null || this.selectpame === undefined || this.selectpame == "" || this.selectpame.pame_pk == -1) 
      {
        var vPayment = -1;
      } 
      else 
      {
        var vPayment = this.selectpame.pame_pk;
      }

      this.data_filter.stor_pk = this.SelectSucursal.stor_pk;
      this.data_filter.clor_status = vStatus;
      this.data_filter.start_date = this.start_date;
      this.data_filter.end_date = this.end_date;
      this.data_filter.clie_pk = vClient;
      this.data_filter.pame_pk = vPayment;

      if (this.start_date != "" && this.end_date == "") {
        this.normal("Fecha Fin", "Seleccionar Fecha Fin", "warning");
        return false;
      }

      if (this.end_date != "" && this.start_date == "") {
        this.normal("Fecha Inicio", "Seleccionar Fecha Inicio", "warning");
        return false;
      }

      console.log(
        "data_filter.stor_pk: " +
          this.data_filter.stor_pk +
          "_____ data_filter.clor_status: " +
          this.data_filter.clor_status +
          "_____ data_filter.start_date: " +
          this.data_filter.start_date +
          "_____ data_filter.end_date: " +
          this.data_filter.end_date +
          "_____ data_filter.clie_pk: " +
          this.data_filter.clie_pk +
          "_____ data_filter.pame_pk: " +
          this.data_filter.pame_pk
      );
      this.loading = true;

      axios
        .post("/clientsales/filtered", this.data_filter)
        .then((response) => {
          setTimeout(() => (this.loading = false), 500);
          if (response.data.data != null) {
            this.data_order = response.data.data;
          } else {
            this.normal("Notificación", response.data.status.message, "error");
            console.log("Detalle: " + response.data.status.technicaldetail);
          }
        })
        .catch((e) => {
          this.normal("Notificación", e, "error");
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
};
</script>
