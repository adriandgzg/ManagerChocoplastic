<template>
  <v-app>
    <v-container>
      <v-dialog v-model="loading" persistent width="300">
        <v-card color="white">
          <v-card-text>
            Cargando
            <v-progress-linear indeterminate color="green" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogQuestionDelete" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Alerta</v-card-title>
          <v-card-text>¿Está seguro de borrar el registro?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogQuestionDelete = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="guardaBorrar">Continuar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar color="#000000" v-model="snackbar" :timeout="timeout">
        {{ textMsg }}
        <v-btn color="blue" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>

      <!--  Modal del diálogo para Alta y Edicion    -->
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card>
          <v-card-title class="cyan white--text">
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-form v-model="validProvider">
            <v-card-text>
              <v-text-field
                v-model="editadoProveedor.prov_name"
                label="Nombre"
                maxlength="300"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editadoProveedor.prov_identifier"
                label="Identificar"
                maxlength="300"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editadoProveedor.prov_rfc"
                label="RFC"
                maxlength="15"
                :rules="RFCRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editadoProveedor.prov_phone"
                label="Teléfono"
                maxlength="10"
                v-on:keydown="isNumber"
                :rules="phoneRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editadoProveedor.prov_email"
                label="Correo Electrónico"
                maxlength="50"
                type="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editadoProveedor.prov_addres"
                label="Dirección"
                maxlength="1000"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editadoProveedor.prov_cp"
                label="C.P."
                maxlength="5"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editadoProveedor.prov_city"
                label="Ciudad"
                maxlength="300"
                :rules="nameRules"
                required
              ></v-text-field>

              <span>Activo/Inactivo</span>
              <v-switch v-model="estado" />

              <v-select
                :items="entities"
                v-model="select"
                label="Selecione un estado"
                single-line
                item-text="feen_name"
                item-value="feen_pk"
                persistent-hint
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
              <v-btn
                :disabled="!validProvider"
                color="teal accent-4"
                class="ma-2 white--text"
                @click="guardar"
              >Guardar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-row>
        <v-col>
          <v-card>
            <v-data-table
              :headers="headers"
              :items="proveedores"
              :search="search"
              sort-by="id"
              class="elevation-3"
            >
              <template v-slot:top>
                <v-system-bar color="indigo darken-2" dark></v-system-bar>
                <v-toolbar flat color="indigo">
                  <template v-slot:extension>
                    <v-btn fab color="cyan accent-2" bottom left absolute @click="dialog = !dialog">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>

                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
              </template>
              <template v-slot:item.prde_amount_outstanding="{ item }">
                <v-label>${{formatMoney(item.prde_amount_outstanding)}}</v-label>
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip v-if="item.prov_status == 1" color="green" dark>Activo</v-chip>
                <v-chip v-else color="red" dark>Inactivo</v-chip>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn class="mr-2" fab dark small color="cyan" @click="edita(item)">
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="mr-2" fab dark small color="error" @click="borrar(item)">
                  <v-icon dark>mdi-delete</v-icon>
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
export default {
  data() {
    return {
      headers: [
        /*{
          text: "ID",
          value: "prov_pk",
          width: "10%",
        },*/
        {
          text: "Inden",
          value: "prov_identifier",
          width: "10%"
        },
        {
          text: "Nombre",
          value: "prov_name",
        },
        {
          text: "Monto Deuda",
          value: "prde_amount_outstanding",
        },
        {
          text: "RFC",
          value: "prov_rfc",
        },
        {
          text: "Teléfono",
          value: "prov_phone",
        },
        {
          text: "Email",
          value: "prov_email",
        },
        {
          text: "Dirección",
          value: "prov_addres",
        },
        {
          text: "CP",
          value: "prov_cp",
        },
        {
          text: "Ciudad",
          value: "prov_city",
        },
        {
          text: "Estado",
          value: "feen_name",
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
      phoneNumber: "",
      editadoProveedor: {
        prov_pk: 0,
        feen_fk: 0,
        prov_identifier: "",
        prov_name: "",
        prov_rfc: "",
        prov_phone: "",
        prov_email: "",
        prov_addres: "",
        prov_cp: "",
        prov_city: "",
        prov_status: 0,
      },
      defaultItem: {
        prov_pk: 0,
        feen_fk: 0,
        prov_identifier: "",
        prov_name: "",
        prov_rfc: "",
        prov_phone: "",
        prov_email: "",
        prov_addres: "",
        prov_cp: "",
        prov_city: "",
        prov_status: 0,
      },
      editedIndex: -1,
      proveedores: [],
      entities: [],
      search: "",
      dialog: false,
      snackbar: false,
      timeout: 2000,
      textMsg: "",
      valid: false,
      validProvider: false,
      estado: true,
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
      RFCRules: [
        (value) => !!value || "Requerido.",
        (value) =>
          (value && value.length >= 12 && value.length <= 13) ||
          "Ingrese un RFC valido",
      ],
      CPRules: [
        (value) => !!value || "Código postal requerido.",
        (value) =>
          (value && value.length == 5) || "Ingrese un Código Postal valido ",
      ],
      emailRules: [
        (v) => !!v || "Correo electrónico requerido",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Ingrese un correo válido",
      ],
      loading: false,
      dialogQuestion: false,
      dialogQuestionDelete: false,
      messageQuestion: "",
    };
  },
  created() {
    this.getProviders();
    this.getEntities();
  },

  methods: {
    isNumber: function (evt) {
      console.log("key " + evt.key + " (" + evt.keyCode + ")");
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      //if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      if (
        (charCode > 47 && charCode < 58) ||
        (charCode > 95 && charCode < 106) ||
        charCode == 8
      ) {
        console.log(charCode + "--> true");
        return true;
      } else {
        console.log(charCode + "-->");
        evt.preventDefault();
      }
    },

    getProviders() {
      this.loading = true;
      axios
        .get("/providerlist")
        .then((response) => {
          setTimeout(() => (this.loading = false), 2000);
          if (response.data.data != null) {
            this.proveedores = response.data.data;
          } else {
            this.normal("Notificación", response.data.status.message, "error");
          }
        })
        .catch((e) => {
          console.log(e);
          this.normal("Notificación", "Error al cargar los datos", "error");
        });
    },
    getEntities() {
      axios
        .get("/entitieslist")
        .then((response) => {
          console.log(response.data);
          this.entities = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    cancelar() {
      this.dialog = false;
      this.editadoProveedor = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    edita(item) {
      this.editedIndex = this.proveedores.indexOf(item);
      this.editadoProveedor = Object.assign({}, item);
      this.select = this.editadoProveedor.feen_fk;
      this.estado = this.editadoProveedor.prov_status;
      this.dialog = true;
    },
    guardar() {
      this.editadoProveedor.feen_fk = this.select;

      if (this.estado == true) this.editadoProveedor.prov_status = 1;
      else this.editadoProveedor.prov_status = 0;

      if (this.editedIndex > -1) {
        this.editar();
      } else {
        this.alta();
      }
      this.cancelar();
    },
    alta: function () {
      axios.post("/providers/add", this.editadoProveedor).then((response) => {
        this.snackbar = true;
        this.textMsg = "¡Alta exitosa!";
        this.getProviders();
      });
    },
    editar: function () {
      axios.put("/providers/update", this.editadoProveedor).then((response) => {
        this.snackbar = true;
        this.textMsg = "¡Actualización Exitosa!";
        this.getProviders();
      });
    },

    borrar(item) {
      const index = this.proveedores.indexOf(item);
      this.editadoProveedor = Object.assign({}, item);
      this.dialogQuestionDelete = true;
    },

    guardaBorrar() {
      this.delete();
      this.dialogQuestionDelete = false;
    },

    delete: function () {
      axios.put("/providers/delete", this.editadoProveedor).then((response) => {
        this.textMsg = "¡Eliminado correctamente!";
        this.normal("Notificación", this.textMsg, "success");
        this.getProviders();
      });
    },
    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : "") +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : "")
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
};
</script>