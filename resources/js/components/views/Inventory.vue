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
        <v-snackbar color="#000000" v-model="snackbar" :timeout="timeout">
            {{ textMsg }}
            <v-btn color="blue" text @click="snackbar = false">
                Cerrar
            </v-btn>
        </v-snackbar>

        <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="headers" :items="sales" :search="search" sort-by="id" class="elevation-3">
                        <template v-slot:top>
                            <v-system-bar color="indigo darken-2" dark></v-system-bar>
                            <v-toolbar flat color="indigo">

                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>

                            </v-toolbar>
                            <v-col cols="12" sm="12">
                                <v-text-field autofocus v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
                            </v-col>
                            <v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <v-combobox required v-model="SelectSucursal"  :items="stores" label="Sucursal" :disabled="enabledStore" item-text="stor_name" item-value="stor_pk" filled chips placeholder="Seleccionar una sucursal"></v-combobox>
                                </v-col>
                                <v-col cols="4" sm="4">
                                    <v-btn color="success" class="mr-4" @click="getInventarioSucursal">Buscar</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        </template>

                        <template v-slot:item="props">
                            <tr>
                                <td style="font-size: 18px !important; font-weight: 600 !important">{{props.item.prod_identifier}}</td>
                                <td>{{props.item.prod_name}}</td>
                                <td>{{props.item.meas_name}}</td>
                                <td>{{props.item.prca_name}}</td>
                                <td>{{props.item.stor_name}}</td>
                                <td>{{props.item.prin_stock}}</td>
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
import CripNotice from "crip-vue-notice";
export default {
    data() {
        return {
            headers: [{
                    text: 'ID',
                    value: 'prod_identifier',
                    width: '10%'
                },
                {
                    text: 'Producto',
                    value: 'prod_name'
                },
                {
                    text: 'Unidad Medida Salida',
                    value: 'meas_name'
                },
                {
                    text: 'Categoria',
                    value: 'prca_name'
                },
                {
                    text: 'Sucursal',
                    value: 'stor_name'
                },
                {
                    text: 'Stock',
                    value: 'prin_stock'
                }
                /*,
                {
                    text: 'Pedido',
                    value: 'stock_order'
                },
                {
                    text: 'Stock App',
                    value: 'prin_stock' - 'stock_order'
                }*/

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
            menu1: false,
            stores: [],
            SelectSucursal: "",
            enabledStore: false,

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
        };
    },
    created() {
        this.getStores();
        this.getUsers();
    },

    methods: {
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

           this.users = this.$store.getters['auth/user']
           if (this.users.store_id > 0) {
              this.enabledStore = true;
              this.SelectSucursal = this.stores.find( (item) => item.stor_pk == this.users.store_id );
           } else {
              this.enabledStore = false;
           }
        },
        getSales() {

            this.loading = true
            axios
                .get("/product/inventories")
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.sales = response.data.data;
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                        console.log('Detalle: ' + response.data.status.technicaldetail);

                    }
                })
                .catch(e => {
                        console.log('Detalle: ' + response.data.status.technicaldetail);
                    this.normal('Notificación', "Error al cargar los datos", "error");
                });
        },


        getInventarioSucursal() {
            /*axios
                .get("/shipments/show/transactionsnotify?date=" + this.starttime)
                .then(response => {
                    console.log(response.data.data);
                    this.stores = response.data.data;

                })
                .catch(e => {
                    this.errors.push(e);
                });
*/
                console.log(this.SelectSucursal.stor_pk); 
                if(this.SelectSucursal == "")
                {
                    this.normal('Sucursal', "Seleccionar Sucursal", "warning");

                    return false;
                }

                 this.loading = true
            axios
                .get("/product/inventories/" +  this.SelectSucursal.stor_pk)
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.sales = response.data.data;
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                        console.log('Detalle: ' + response.data.status.technicaldetail);

                    }
                })
                .catch(e => {
                        console.log('Detalle: ' + response.data.status.technicaldetail);
                    this.normal('Notificación', "Error al cargar los datos", "error");
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
        }
    }
}
</script>
