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
            <v-btn color="blue" text @click="snackbar = false">
               Cerrar
            </v-btn>
         </v-snackbar>

         <!--  Modal del diálogo para Alta y Edicion    -->
         <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
               <v-card-title class="cyan white--text">
                  <span class="headline">{{ formTitle }}</span>
               </v-card-title>
               <v-form v-model="validProvider">
                  <v-card-text>
                     <v-text-field v-model="editado.clor_name" label="Nombre" maxlength="300" :rules="nameRules"
                                   required></v-text-field>
                     <span>Activo/Inactivo</span>
                     <v-switch v-model="estado"/>
                  </v-card-text>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                     <!--<v-btn :disabled="!validProvider" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>-->
                  </v-card-actions>
               </v-form>
            </v-card>

         </v-dialog>

         <v-row>
            <v-col>
               <v-card>
                  <v-data-table :headers="headers" :items="categories"
                                disable-sort
                                class="elevation-3"
                                :footer-props="footerProps"
                                :loading="loading"
                                :options.sync="options"
                                :server-items-length="total"
                  >
                     <template v-slot:top>
                        <v-system-bar color="indigo darken-2" dark></v-system-bar>
                        <v-col cols="12" sm="12">
                           <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                         hide-details @keyup.enter="getDayOrders"></v-text-field>
                        </v-col>
                     </template>
                     <template v-slot:item.status="{ item }">
                        <v-chip :color="item.clor_status == 1? 'green' : item.clor_status == 2? 'blue' :'reed'" dark>
                           {{ item.clor_status_description }}
                        </v-chip>
                     </template>
                     <template v-slot:item.action="{ item }">

                        <v-btn class="mr-2" fab dark small color="cyan"
                               v-if="item.clor_status == 1 && boxEnabled != true" title="Convertir Orden en Venta"
                               :href="'/detaiorder/'+item.clor_pk">
                           <v-icon dark>mdi-cash-register</v-icon>
                        </v-btn>
                        <v-btn class="mr-2" fab dark small color="purple" title="Detalle de orden"
                               :href="'/detaiorderread/'+item.clor_pk">
                           <v-icon dark>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn class="mr-2" fab dark small color="error" v-if="item.clor_status == 1"
                               @click="borrar(item)" title="Eliminar orden">
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
import CripNotice from "crip-vue-notice";

export default {
   data() {
      return {
         headers: [
            {
               text: 'Pedido',
               value: 'clor_identifier'
            },
            {
               text: 'Sucursal',
               value: 'store.stor_name'
            },
            {
               text: 'Cliente',
               value: 'client.clie_name'
            },
            {
               text: 'Fecha',
               value: 'created_at'
            },
            {
               text: 'Estatus',
               value: 'status'
            },
            {
               text: '',
               value: 'action',
               width: '20%'
            },

         ],
         select: 0,
         principal: false,
         estado: true,
         editado: {
            clor_pk: 0,
            clor_name: '',
            clor_status: 0,
         },
         defaultItem: {
            clor_pk: 0,
            clor_name: '',
            clor_status: 0,
         },
         editedIndex: -1,
         sales: [],
         categories: [],
         entities: [],
         search: "",
         dialog: false,
         snackbar: false,
         timeout: 2000,
         textMsg: "",
         valid: false,
         validProvider: false,
         folioRules: [
            value => !!value || "Requerido.",
            value => (value && value.length >= 10) || "Min 10 caracter"
         ],
         nameRules: [
            value => !!value || 'Requerido.',
            value => (value && value.length >= 3) || 'Min 3 caracteres',
         ],
         phoneRules: [
            value => !!value || 'Requerido.',
            value => (value && value.length == 10) || 'Requiere 10 caracteres',
         ],
         loading: false,
         dialogQuestion: false,
         dialogQuestionDelete: false,
         messageQuestion: '',
         boxEnabled: false,
         options: {},
         pagination: {
            current: 1,
            total: 0
         },
         footerProps: {'items-per-page-options': [10, 50, 100]},
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
             .then(response => {
                if (response.data.data == null) {
                   this.boxEnabled = true
                } else {
                   this.boxEnabled = false
                }
                console.log("boxEnabled -->" + this.boxEnabled)
             })
             .catch(e => {
                console.log(e);
             });
      },

      async getDayOrders() {
         this.loading = true
         const {sortBy, sortDesc, page, itemsPerPage} = this.options
         await axios
             .get("/clientorders/day" + "?itemsPerPage=" + itemsPerPage + "&page=" + page+"&search=" + this.search)
             .then(response => {
                if (response.data.data != null) {
                   this.categories = response.data.data.data;
                   this.total = response.data.data.total;
                   if (this.options.page>response.data.data.last_page){
                      this.options.page=response.data.data.last_page
                   }
                } else {
                   this.normal('Notificación', response.data.status.message, "error");
                }
             })
             .catch(e => {
                console.log(e);
                this.normal('Notificación', "Error al cargar los datos", "error");
             });
         this.loading = false
      },

      cancelar() {
         this.dialog = false
         this.editado = Object.assign({}, this.defaultItem)
         this.editedIndex = -1
      },
      ventas(item) {
         this.editedIndex = this.categories.indexOf(item)
         this.editado = Object.assign({}, item)
         this.createsale(item.clor_pk)
      },

      createsale(id) {

         axios.post('/clientsales?clor_pk=' + id + '')
             .then(response => {

                this.sales = response.data;
                console.log(response.data);

             })
             .catch(e => {
                console.log(e);
             })
      },

      borrar(item) {
         const index = this.categories.indexOf(item)
         this.editado = Object.assign({}, item)
         this.dialogQuestionDelete = true
      },

      guardaBorrar() {
         this.delete()
         this.dialogQuestionDelete = false
      },

      delete: function () {
         axios.post('/client/orders/destroy', this.editado).then(response => {
            console.log(response)
            if (response.data.code == 200) {

               this.textMsg = "¡Eliminado correctamente!";
               this.normal('Notificación', this.textMsg, "error");
               this.getDayOrders();
            } else {
               this.normal('Notificación', response.data.message, "error");
            }
         });
      },
      normal(Title, Description, Type) {
         this.notice = new CripNotice({
            title: Title,
            description: Description,
            className: "open-normal",
            closable: true,
            duration: 3,
            type: Type,
         })
      },

   },
   computed: {
      formTitle() {
         return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      },
   },
   watch: {
      options: {
         handler() {
            this.getDayOrders()
         },
         deep: true,
      }
   }
};
</script>
