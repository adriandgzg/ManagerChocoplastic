<template>
<v-app>
    <v-container>
        <v-snackbar color="#000000" v-model="snackbar" :timeout="timeout">
            {{ textMsg }}
            <v-btn color="blue" text @click="snackbar = false">
                Cerrar
            </v-btn>
        </v-snackbar>
        <v-dialog v-model="loading" persistent width="300">
            <v-card color="white">
                <v-card-text>
                    Cargando
                    <v-progress-linear indeterminate color="green" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

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
        <v-dialog v-model="dialogAgregar" scrollable max-width="600">
            <v-form v-model="validProvider">
                <v-card>
                    <v-toolbar dark color="cyan">
                        <v-toolbar-title>Agregar producto</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon dark @click="dialogAgregar = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-text-field v-model="detail.prod_identifier" label="ID" disabled />
                        <v-text-field v-model="detail.prod_name" label="Nombre" disabled />
                        <v-combobox required v-model="selectmeas" :items="measurements" label="Unidad de Medida" item-text="meas_name" item-value="meas_pk" filled chips placeholder="Seleccionar una opción">
                        </v-combobox>
                        <v-text-field v-model="detail.ppod_quantity" label="Cantidad" type="number" :rules="minNumberRules" autofocus></v-text-field>
                        <v-text-field v-model="detail.ppod_providerprice" label="Precio" prefix="$" type="number" :rules="minNumberRules" required></v-text-field>
                        <v-text-field v-model="detail.ppod_discountrate" label="Descuento(%)" type="number"></v-text-field>
                        <!--<v-text-field v-model="detail.ppod_ieps" label="IEPS(%)" type="number"></v-text-field>
                        <v-text-field v-model="detail.ppod_iva" label="IVA(%)" type="number"></v-text-field>-->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="dialogAgregar=false">Cancelar</v-btn>
                        <v-btn :disabled="!validProvider" color="teal accent-4" class="ma-2 white--text" @click="agregar()">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialog" scrollable>
            <v-card>
                <v-toolbar dark color="cyan">
                    <v-toolbar-title>Buscar producto</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
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
                            <v-btn class="mr-2" fab dark small color="green" @click="openAgregar(item)">
                                <v-icon dark>mdi-checkbox-marked-circle</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col>
                <v-card>
                    <v-row>
                        <v-col cols="6">
                            <v-card-text class="category d-inline-flex font-weight-light">
                                <v-combobox required v-model="selectProv" :items="providers" label="Proveedor" item-text="prov_name" item-value="prov_pk" filled chips placeholder="Seleccionar una proveedor"></v-combobox>
                            </v-card-text>
                        </v-col>

                        <v-col cols="6">
                            <v-card-text class="category d-inline-flex font-weight-light">
                                <v-label v-if="enabledStore">
                                    Sucursal: {{users.stor_name}}
                                </v-label>
                                <v-combobox v-else required v-model="selectStore" :items="stores" :disabled="enabledStore" label="Sucursal" item-text="stor_name" item-value="stor_pk" filled chips placeholder="Seleccionar una sucursal"></v-combobox>
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn class="ma-2" tile outlined color="blue" @click="buscar">
                                <v-icon left>mdi-file-find</v-icon> Buscar Producto
                            </v-btn>
                            <v-btn dark color="success" @click="finalizar" outlined>
                                <v-icon left>mdi-checkbox-marked-circle</v-icon> Finalizar
                            </v-btn>
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
                                    <th class="text-left">Unidad Medida</th>
                                    <th class="text-left">Cantidad</th>
                                    <th class="text-left">Precio</th>
                                    <th class="text-left">Importe</th>
                                    <th class="text-left">Descuento(%)</th>
                                    <th class="text-left">Descuento($)</th>
                                    <th class="text-left">Importe Total</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in desserts" :key="item.prod_name">
                                    <td>{{ item.prod_identifier }}</td>
                                    <td>{{ item.prod_name }}</td>
                                    <td>{{ item.meas_name }}</td>
                                    <td>
                                        <v-text-field v-model="item.ppod_quantity" label="" @change="onQuantityChange(item)" required></v-text-field>
                                    </td>
                                    <td>
                                        <v-text-field v-model="item.ppod_providerprice" label="" @change="onQuantityChange(item)" required></v-text-field>
                                    </td>
                                    <td>{{ formatMoney((item.ppod_quantity * item.ppod_providerprice)) }}</td>
                                    <td>
                                        <v-text-field v-if="can('discount')" v-model="item.ppod_discountrate" label="" @change="onQuantityChange(item)" required></v-text-field>
                                        <span v-else>0</span>
                                    </td>

                                    <td>{{ formatMoney((item.ppod_quantity * item.ppod_providerprice)*((item.ppod_discountrate/100))) }}</td>

                                    <td>${{ formatMoney((item.ppod_quantity * item.ppod_providerprice)*(1- (item.ppod_discountrate/100))) }}</td>
                                    <td>
                                        <v-icon @click="borrar(item)" small>mdi-delete</v-icon>
                                    </td>
                                </tr>
                                <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>Subtotal</td>
                                    <td>${{formatMoney(subtotal)}}</td>
                                    <td />
                                </tr>
                                <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>Descuento</td>
                                    <td>${{formatMoney(descuento)}}</td>
                                    <td />
                                </tr>
                                <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>I.V.A.</td>
                                    <td>${{formatMoney(iva)}}</td>
                                    <td />
                                </tr>
                                <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>IEPS</td>
                                    <td>${{formatMoney(ieps)}}</td>
                                    <td />
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>Total</td>
                                    <td>${{formatMoney(total)}}</td>
                                    <td />
                                </tr>
                            </tfoot>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</v-app>
</template>

<script>
import {
    mapGetters
} from "vuex";
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
            prpo_pk: this.$route.params.id,
            valid: false,
            validProvider: false,
            stores: [],
            providers: [],
            desserts: [],
            products: [],
            selectProv: '',
            selectStore: '',
            search: '',
            snackbar: false,
            timeout: 2000,
            subtotal: 0,
            descuento: 0,
            total: 0,
            iva: 0,
            ieps: 0,
            textMsg: "",
            editado: {
                ppod_pk: 0,
                ppod_quantity: 0,
                ppod_providerprice: 0,
                ppod_discountrate: 0,
                prod_pk: 0,
                prod_identifier: 0,
                prod_name: '',
                prod_description: '',
                meas_name: '',
                meas_fk:0,
            },
            defaultItem: {
                ppod_pk: 0,
                ppod_quantity: 0,
                ppod_providerprice: 0,
                ppod_discountrate: 0,
                prod_pk: 0,
                prod_identifier: 0,
                prod_name: '',
                prod_description: '',
                meas_name: '',
                meas_fk:0,
            },
            detail: {
                prpo_fk: 0,
                prod_fk: 0,
                ppod_pk: 0,
                ppod_quantity: 0,
                ppod_providerprice: 0,
                ppod_discountrate: 0,
                prod_identifier: 0,
                prod_name: '',
                prod_ieps: 0,
                prod_iva: 0,
                syst_ieps: 0,
                syst_iva: 0,
                meas_fk:0,
            },
            detailDefault: {
                prpo_fk: 0,
                prod_fk: 0,
                ppod_pk: 0,
                ppod_quantity: 0,
                ppod_providerprice: 0,
                ppod_discountrate: 0,
                prod_identifier: 0,
                prod_name: '',
                prod_ieps: 0,
                prod_iva: 0,
                syst_ieps: 0,
                syst_iva: 0,
                meas_fk:0,
            },
            orderHeader: {
                prpo_pk: 0,
                prov_fk: 0,
                stor_fk: 0,
            },
            enabledStore: false,
            dialogcredito: false,
            dialogcontado: false,
            dialog: false,
            loading: false,
            dialogQuestion: false,
            dialogQuestionDelete: false,
            messageQuestion: '',
            dialogAgregar: false,
            measurements: [],
            selectmeas: '',
            minNumberRules: [
                value => !!value || 'Requerido.',
                value => value > 0 || 'El número debe ser mayor o igual a cero',
            ],

        };
    },
    created() {
        this.getStores();
        this.getProviders();
        this.createCompra();
        this.getUsers();
    },

    methods: {
        getUsers() {
            axios.get('/listUser')
                .then(response => {
                    this.users = response.data.data

                    if (this.users.store_id > 0) {
                        this.enabledStore = true
                        this.selectStore = this.stores.find(item => item.stor_pk == this.users.store_id)
                    } else
                        this.enabledStore = false

                })
                .catch(e => {
                    this.errors.push(e)
                })
        },

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
            axios.get("/providers")
                .then(response => {
                    this.providers = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });

        },
        getMeasurement(id) {
            axios
                .get("/product/measurements/" + id)
                .then(response => {
                    this.measurements = response.data.data;
                   
                    for (var i = 0; i < this.measurements.length; i++) {
                        if(this.measurements[i].meas_pk == this.detail.meas_fk){
                            this.selectmeas = this.measurements[i];
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });

        },

        openAgregar(item) {
            if (this.desserts.length > 0) {
                this.detail.prpo_fk = this.prpo_pk;
            } else {
                this.detail.prpo_fk = 0;
            }

             console.log(item);
             this.detail.meas_fk = item.meas_fk_input;
            this.detail.prod_fk = item.prod_pk;
            this.detail.ppod_quantity = 1;
            this.detail.ppod_providerprice = 0;
            this.detail.ppod_discountrate = 0;
            this.detail.prod_identifier = item.prod_identifier
            this.detail.prod_name = item.prod_name

            this.getMeasurement(item.prod_pk)
            this.dialogAgregar = true
        },

        agregar(item) {

            if (this.selectmeas == '' || this.selectmeas == null) {
                this.normal('Notificación', "Debe seleccionar una unidad de medida", "error");

                return;
            }

            this.detail.meas_fk = this.selectmeas.meas_pk;

            axios.post('/provider/purchase/order/details', this.detail)
                .then(response => {
                    console.log(response)
                    if (response.data.status.code == 200) {

                        this.textMsg = "¡Actualizado correctamente!";
                        this.prpo_pk = response.data.data;
                        //this.normal('Notificación','¡Actualizado correctamente!' ,"success");
                        this.createCompra();
                        this.dialogAgregar = false;
                        this.getTotal();

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
            axios.post('/provider/purchase/order/details/destroy', this.editado).then(response => {
                console.log(response);
                if (response.data.status.code == 200) {

                    this.textMsg = "¡Eliminado correctamente!";
                    this.normal('Notificación', this.textMsg, "error");
                    this.createCompra();
                } else {
                    this.normal('Notificación', "Ocurrio un error al eliminar el producto", "error");

                }
            });
        },

        createCompra() {
            this.loading = true
            axios.get('/provider/purchase/orders/' + this.prpo_pk + '')
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        console.log(response)
                        this.desserts = response.data.data.provider_purchase_order_details
                        this.getTotal();
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.normal('Notificación', "Error al cargar los datos", "error");
                })
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
            //this.editado = Object.assign({}, item)
            this.detail.ppod_pk = item.ppod_pk,
                this.detail.prod_fk = item.prod_pk;
            this.detail.ppod_quantity = item.ppod_quantity;
            this.detail.ppod_providerprice = item.ppod_providerprice;
            this.detail.ppod_discountrate = item.ppod_discountrate;
            this.detail.ppod_ieps = item.ppod_ieps;
            this.detail.ppod_iva = item.ppod_iva;

            axios.post('/provider/purchase/order/details/update', this.detail)
                .then(response => {
                    console.log(response)
                    if (response.data.status.code == 200) {

                        this.textMsg = "¡Actualizado correctamente!";
                        //this.normal('Notificación','¡Actualizado correctamente!' ,"success");
                        this.getTotal();
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
            this.descuento = 0;
            this.iva = 0;
            this.ieps = 0;
            for (var i = 0; i < this.desserts.length; i++) {
                var importe = this.desserts[i].ppod_providerprice * this.desserts[i].ppod_quantity;
                var importeDescuento = (importe * (1 - this.desserts[i].ppod_discountrate / 100));

                this.descuento = this.descuento + ((importe) * ((this.desserts[i].ppod_discountrate / 100)));

                this.subtotal = this.subtotal + (importeDescuento);
                if (this.desserts[i].prod_iva == 1)
                    this.iva = this.iva + ((importeDescuento / (1 + (this.desserts[i].syst_iva / 100))) * (this.desserts[i].syst_iva / 100));
                if (this.desserts[i].prod_ieps == 1)
                    this.ieps = this.ieps + ((importeDescuento) * (this.desserts[i].syst_ieps / 100));

            }

            this.total = this.subtotal + this.ieps;
        },

        finalizar() {

            if (this.total <= 0) {
                this.normal('Notificación', "La orden de compra no puede ser menor o igual a cero", "error");
                return;
            }

            if (this.selectProv == '' || this.selectProv == null) {
                this.normal('Notificación', "Debe seleccionar un proveedor", "error");
                return;
            }
            if (!this.enabledStore)
                if (this.selectStore == '' || this.selectStore == null) {
                    this.normal('Notificación', "Debe seleccionar una sucursal", "error");
                    return;
                }

            if (this.desserts.length <= 0) {
                this.normal('Notificación', "Debe agregar al menos un articulo para finalizar", "error");
                return;
            }

            this.messageQuestion = '¿Desea finalizar la Orden de compra?';

            this.dialogQuestion = true
            /*
                      var r = confirm("¿Está seguro de finalizar la venta?");
                        if (r == true) {*/

            // }            
        },
        guardaFinalizar() {
            this.orderHeader.prpo_pk = this.prpo_pk
            this.orderHeader.prov_fk = this.selectProv.prov_pk

            this.orderHeader.stor_fk = this.selectStore.stor_pk
            console.log(this.enabledStore)
            if (!this.enabledStore)
                this.orderHeader.stor_fk = this.selectStore.stor_pk;
            else
                this.orderHeader.stor_fk = this.users.store_id;

            console.log(this.orderHeader)

            axios.post('/provider/purchase/orders', this.orderHeader)
                .then(response => {
                    console.log(response)
                    if (response.data.status.code == 200) {

                        this.textMsg = "¡Actualizado correctamente!";
                        this.normal('Notificación', '¡Actualizado correctamente!', "success");
                        this.$router.push('/PurchaseOrdersList');
                    } else {
                        this.normal('Notificación', response.data.message, "error");
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
            var r = confirm("¿Está seguro de finalizar la venta?");
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
    },
    computed: {
        ...mapGetters('auth', ['can'])
    },
}
</script>
