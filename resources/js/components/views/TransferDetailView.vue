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

        <v-dialog v-model="dialogQuestion" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Información</v-card-title>
                <v-card-text>{{messageQuestion}}.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogQuestion = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" text @click="guardaFinalizar">Continuar</v-btn>
                </v-card-actions>
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
        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialog" scrollable max-width="800px">
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">Buscar producto</span>
                </v-card-title>

                <v-data-table :headers="headers" :items="products" :search="search" sort-by="id" class="elevation-3">
                    <template v-slot:top>
                        <v-col cols="12" sm="12">
                            <v-text-field autofocus v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
                        </v-col>
                    </template>
                    <template v-slot:item.prod_saleprice="{ item }">
                        <v-label>${{formatMoney(item.prod_saleprice)}}</v-label>
                    </template>
                    <template v-slot:item.bulk="{ item }">
                        <v-chip v-if="item.prod_bulk == 1" color="green" outlined>
                            Granel</v-chip>
                        <v-chip v-else color="red" outlined>NA Granel</v-chip>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn class="mr-2" fab dark small color="green" @click="agregar(item)" title="Agregar producto">
                            <v-icon dark>mdi-checkbox-marked-circle</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>

        </v-dialog>

        <v-row>
            <v-col>
                <v-card>
                    <v-row>
                        <v-col cols="3">
                            <v-card-text class="category d-inline-flex font-weight-light">
                                <v-label>
                                    <h4>ID traspaso</h4>
                                    {{editadoHeader.prtr_identifier}}
                                </v-label>
                            </v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-card-text class="category d-inline-flex font-weight-light">
                                <v-label>
                                    <h4>Sucursal Salida:</h4>
                                    {{editadoHeader.stor_name_output}}
                                </v-label>
                            </v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-card-text class="category d-inline-flex font-weight-light">
                                <v-label>
                                    <h4>Sucursal Salida:</h4>
                                    {{editadoHeader.stor_name_input}}
                                </v-label>
                            </v-card-text>
                        </v-col>
                        <v-col cols="3">
                            <v-card-text class="category d-inline-flex font-weight-light">
                                <v-label>
                                    <h4>Observación:</h4>
                                    {{editadoHeader.prtr_observation}}
                                </v-label>
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <!--    
                    <v-btn class="ma-2" tile outlined color="blue" @click="buscar">
                        <v-icon left>mdi-file-find</v-icon> Buscar Producto
                    </v-btn>                        
                    <v-btn dark color="success" @click="finalizar" outlined>
                    <v-icon left>mdi-checkbox-marked-circle</v-icon> Finalizar
                    </v-btn>     -->
                        </v-col>
                    </v-row>
                </v-card>

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">ID</th>
                                    <th class="text-left">Producto</th>
                                    <th class="text-left">Unidad Medida Salida</th>
                                    <th class="text-left" style="width:200px">Cantidad a traspasar</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in desserts" :key="item.prod_name">
                                    <td>{{ item.prod_identifier }}</td>
                                    <td>{{ item.prod_name }}</td>
                                    <td>{{ item.meas_name }}</td>
                                    <td>{{ item.prtd_quantity }}</td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </template>
                    </v-simple-table>
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
                    text: 'Ident',
                    value: 'prod_identifier'
                },
                {
                    text: 'Nombre',
                    value: 'prod_name'
                },
                {
                    text: 'Unidad',
                    value: 'meas_fk_input_name'
                },
                {
                    text: 'Tipo',
                    value: 'bulk'
                },

                {
                    text: '',
                    value: 'action',
                    width: '20%'
                },
            ],
            prtr_pk: this.$route.params.id,
            directa: this.$route.params.directa,
            prtr_observation: '',
            prpu_pk: 0,
            valid: false,
            stores: [],
            providers: [],
            desserts: [],
            products: [],
            selectProv: '',
            selectStore: '',
            payments: [],
            selectpame: '',
            search: '',
            snackbar: false,
            timeout: 2000,
            subtotal: 0,
            total: 0,
            iva: 0,
            textMsg: "",
            editadoHeader: {
                prpu_pk: 0,
                prov_fk: 0,
                prov_name: '',
                prpo_fk: 0,
                stor_fk: 0,
                store_name: '',
                pame_fk: 0,
                pame_name: '',
                prpu_identifier: '',
                prpu_type: 0,
                prpu_status: 0,
                created_at: '',
                updated_at: '',
                prtr_observation: '',
                stor_name_output: '',
                stor_name_input: '',
                prtr_identifier: '',
            },
            editado: {
                prtd_pk: 0,
                prtd_quantity: 0,
                prtd_price: 0,
                prtd_discountrate: 0,
                prod_pk: 0,
                prod_identifier: 0,
                prod_name: '',
                prod_description: '',
                meas_name: ''
            },
            defaultItem: {
                prtd_pk: 0,
                prtd_quantity: 0,
                prtd_price: 0,
                prtd_discountrate: 0,
                prod_pk: 0,
                prod_identifier: 0,
                prod_name: '',
                prod_description: '',
                meas_name: ''
            },
            detail: {
                prpu_pk: 0,
                prtr_fk: 0,
                pame_fk: 0,
                prov_fk: 0,
                stor_fk: 0,
                prpo_fk: 0,
                prod_fk: 0,
                prtd_pk: 0,
                prtd_quantity: 0,
                prtd_price: 0,
                prtd_discountrate: 0,
            },
            detailDefault: {
                prpo_fk: 0,
                prod_fk: 0,
                prtd_pk: 0,
                prtd_quantity: 0,
                prtd_price: 0,
                prtd_discountrate: 0,
            },
            orderHeader: {
                prpu_pk: 0,
                prtr_pk: 0,
                prov_fk: 0,
                stor_fk_input: 0,
                pame_fk: 0,
                prpu_amount: 0,
                prtr_observation: '',
                stor_name_output: '',
                stor_name_input: '',
                prtr_identifier: '',

            },
            enabledStore: false,
            dialogcredito: false,
            dialogcontado: false,
            dialog: false,
            dialogQuestion: false,
            dialogQuestionDelete: false,
            messageQuestion: '',

            minNumberRules: [
                value => !!value || 'Requerido.',
                value => value > 0 || 'El número debe ser mayor o igual a cero',
            ],
            loading: false,
            dialogQuestion: false,
            dialogQuestionDelete: false,
            messageQuestion: '',
        };
    },
    created() {
        this.getStores();
        this.getProviders();
        this.createCompra();
        this.getPayment();
    },

    methods: {

        formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                console.log(e)
            }
        },

        getStores() {
            axios.get("/storeget")
                .then(response => {
                    this.stores = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });

        },

        getProviders() {
            axios.get("/providerlist")
                .then(response => {
                    this.providers = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });

        },

        getPayment() {
            axios
                .get("/paymentmethodsget")
                .then(response => {
                    this.payments = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });

        },

        agregar(item) {
            if (this.desserts.length > 0) {
                this.detail.prtr_fk = this.prtr_pk;
            } else {
                this.detail.prtr_fk = 0;
            }
            this.detail.prod_fk = item.prod_pk;
            this.detail.prtd_quantity = 1;
            this.detail.prtd_price = 0;
            this.detail.prtd_discountrate = 0;

            this.detail.prov_fk = this.selectProv.prov_pk
            this.detail.stor_fk = this.selectStore.stor_pk
            this.detail.pame_fk = this.selectpame.pame_pk

            axios.post('/product/transfer/details', this.detail)
                .then(response => {
                    console.log(response)
                    if (response.data.status.code == 200) {

                        this.textMsg = "¡Actualizado correctamente!";
                        this.prtr_pk = response.data.data;
                        //this.normal('Notificación','¡Actualizado correctamente!' ,"success");
                        this.createCompra();
                        this.dialog = false;
                        //this.getTotal();

                    } else {
                        this.normal('Notificación', response.data.message, "error");
                    }

                })
                .catch(e => {
                    this.errors.push(e)
                })

        },

        borrar(item) {

            console.log(item)
            this.editado = Object.assign({}, item)
            this.dialogQuestionDelete = true
        },

        guardaBorrar() {
            this.delete()
            this.dialogQuestionDelete = false
        },

        delete: function () {
            axios.post('/product/transfer/details/destroy', this.editado).then(response => {
                console.log(response);
                if (response.data.status.code == 200) {

                    this.textMsg = "¡Eliminado correctamente!";
                    this.normal('Notificación', this.textMsg, "success");
                    this.createCompra();
                } else {
                    this.normal('Notificación', "Ocurrio un error al eliminar el producto", "error");

                }
            });
        },

        createCompra() {
            this.loading = true

            axios.get('/product/transfers/' + this.prtr_pk + '')
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        console.log(response)
                        this.desserts = response.data.data.ProductTransferDetails;
                        this.prtr_pk = response.data.data.ProductTransfers.prtr_pk;
                        this.editadoHeader = response.data.data.ProductTransfers;
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.normal('Notificación', "Error al cargar los datos", "error");
                });

        },
        cancelar() {
            this.dialog = false
            this.editado = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        },
        buscar() {
            this.loading = true
            axios.get('/product/search')
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    this.products = response.data.data;
                    this.dialog = true
                    console.log(response.data)
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },

        onQuantityChange(item) {
            this.detail.prtd_pk = item.prtd_pk,
                this.detail.prod_fk = item.prod_pk;
            this.detail.prtd_quantity = item.prtd_quantity;
            this.detail.prtd_price = item.prtd_price;
            this.detail.prtd_discountrate = item.prtd_discountrate;
            axios.post('/product/transfer/details/update', this.detail)
                .then(response => {
                    console.log(response)
                    if (response.data.status.code == 200) {

                        this.textMsg = "¡Actualizado correctamente!";
                    } else {
                        this.normal('Notificación', response.data.status.message, "success");
                    }

                })
                .catch(e => {
                    this.errors.push(e)
                })

        },

        getTotal() {

            this.subtotal = 0;
            for (var i = 0; i < this.desserts.length; i++) {

                this.subtotal = this.subtotal + ((this.desserts[i].prtd_price * this.desserts[i].prtd_quantity) * (1 - (this.desserts[i].prtd_discountrate / 100)));
                console.log(this.subtotal);
            }

            this.total = this.subtotal + this.iva;
        },

        finalizar() {
            if (this.selectStore == '' || this.selectStore == null) {
                this.normal('Notificación', "Debe seleccionar una sucursal", "error");
                return;
            }
            this.messageQuestion = '¿Está seguro de finalizar el traspaso?';
            this.dialogQuestion = true
        },
        guardaFinalizar() {

            this.orderHeader.prtr_pk = this.prtr_pk
            this.orderHeader.stor_fk_input = this.selectStore.stor_pk
            this.orderHeader.prtr_observation = this.prtr_observation
            console.log(this.orderHeader)
            axios.post('/product/transfers/update', this.orderHeader)
                .then(response => {
                    console.log(response);
                    var vMessage = response.data.status.message;
                    if (response.data.status.code == 200) {
                        //this.textMsg = "¡Actualizado correctamente!";
                        this.normal('Notificación', vMessage, "success");
                        this.$router.push('/transferlist');
                    } else {
                        this.normal('Notificación', vMessage, "error");
                    }
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        finalizarVenta() {
            console.log((this.total + '-' + (this.efectivo + this.tarjeta)));
            if (this.editadoSale.pame_fk == 1)
                if ((this.total - this.efectivo - this.tarjeta) == 0) {

                }
            else {
                this.normal('Notificación', "Los montos de pago deben ser igual al total", "error");
                return;
            }
            var r = confirm("¿Está seguro de finalizar la compra?");
            if (r == true) {
                this.editadoSale.clde_amount = this.total
                this.editadoSale.clpa_amount_cash = this.efectivo
                this.editadoSale.clpa_amount_transfer = this.tarjeta
                axios.post('/clientsales/update', this.editadoSale)
                    .then(response => {
                        console.log(response)
                        if (response.data.code == 200) {

                            this.textMsg = "¡Actualizado correctamente!";
                            this.normal('Notificación', '¡Actualizado correctamente!', "success");
                            this.$router.push('/sales');
                        } else {
                            this.normal('Notificación', response.data.message, "error");
                        }

                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },
        actualizar(item) {

            this.editado = Object.assign({}, item)
            axios.post('/client_sale_details/update', this.editado)
                .then(response => {

                    this.textMsg = "¡Actualizado correctamente!";
                })
                .catch(e => {
                    this.errors.push(e)
                })
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

    }
}
</script>
