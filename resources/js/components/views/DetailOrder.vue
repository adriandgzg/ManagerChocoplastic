<template>
<v-app>
    <v-container>
        <v-alert type="warning" v-model="boxEnabledDetailOrder">
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
        <v-dialog v-model="dialogQuestionDeletePago" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Alerta</v-card-title>
                <v-card-text>¿Está seguro de borrar el registro?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogQuestionDeletePago = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" text @click="guardaBorrarPago">Continuar</v-btn>
                </v-card-actions>
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
                    <v-form v-model="valid">
                        <v-card-title class="subheading font-weight-bold">No. Pedido: {{saleHeader.clor_fk}}</v-card-title>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-combobox v-model="selectClient" :items="clients" label="Cliente" item-text="clie_name" item-value="clie_pk" filled chips @change="onChangeClient()" placeholder="Seleccionar Cliente"></v-combobox>
                                </v-card-text>
                            </v-col>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Vendedor:</h4>{{saleHeader.user}}
                                    </v-label>
                                </v-card-text>
                            </v-col>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Sucursal:</h4> {{saleHeader.stor_name}}
                                    </v-label>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-row>

                            <v-col cols="6">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-combobox required v-model="selectpame" :items="payments" label="Métodos de pago" item-text="pame_name" item-value="pame_pk" filled chips placeholder="Seleccionar Cliente"></v-combobox>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
                <v-card justify="end">
                    <v-btn :disabled="!valid" dark color="success" @click="finalizar">FINALIZAR</v-btn>
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
                                    <th class="text-left">Descuento(%)</th>
                                    <th class="text-left">Importe</th>
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
                                        <v-text-field v-model="item.clsd_quantity" label="" @change="onQuantityChange(item)" required></v-text-field>
                                    </td>
                                    <td>${{ formatMoney(item.clsd_price) }}</td>
                                    <td>
                                        <v-text-field v-if="can('discount')" v-model="item.clsd_discountrate" label="" @change="onQuantityChange(item)" required></v-text-field>
                                        <span v-else>0</span>
                                    </td>
                                    <td>${{ formatMoney((item.clsd_quantity * item.clsd_price)*(1- (item.clsd_discountrate/100))) }}</td>
                                    <td>
                                        <v-icon @click="borrar(item)" small>mdi-delete</v-icon>
                                    </td>
                                </tr>
                                <tr>
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
                                    <td>I.V.A.</td>
                                    <td>${{formatMoney(iva)}}</td>
                                    <td />
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
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

        <!-- Dialog -->

        <v-dialog v-model="dialogcredito" max-width="500">
            <v-card>
                <v-card-title>Crédito:</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-btn @click="abrirPago()" color="warning">Agregar pago</v-btn>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Forma de Pago</th>
                                                <th class="text-left">Monto</th>
                                                <th class="text-left">Referencia</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in pagos" :key="item.pash_name">
                                                <td>{{ item.pash_name }}</td>
                                                <td>{{ item.cpam_amount }}</td>
                                                <td>{{ item.cpam_reference }}</td>
                                                <td>
                                                    <v-icon @click="borrarPago(item)" small>mdi-delete</v-icon>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td />
                                                <td>Total</td>
                                                <td>${{formatMoney(montototal)}}</td>
                                                <td />
                                            </tr>
                                        </tfoot>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-col>
                    </v-row>
                    <tr>
                        <td>Subtotal</td>
                        <td> ${{formatMoney(subtotal)}}</td>
                        <td />
                    </tr>
                    <tr>
                        <td>Total I.V.A.</td>
                        <td> ${{formatMoney(iva)}}</td>
                        <td />
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td> ${{formatMoney(total)}}</td>
                    </tr>
                    <tr>
                        <td>Total Crédito</td>
                        <td> ${{formatMoney(total - efectivo - tarjeta) }}</td>
                    </tr>

                    <v-btn @click="dialogcredito = !dialogcredito">Cancelar</v-btn>
                    <v-btn @click="finalizarVenta" color="warning">Confirmar</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogcontado" max-width="640">
            <v-card>
                <v-card-title>Contado</v-card-title>

                <v-card-text>
                    <v-row>
                        <v-btn @click="abrirPago()" color="warning">Agregar pago</v-btn>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Forma de Pago</th>
                                                <th class="text-left">Monto</th>
                                                <th class="text-left">Referencia</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in pagos" :key="item.pash_name">
                                                <td>{{ item.pash_name }}</td>
                                                <td>{{ item.cpam_amount }}</td>
                                                <td>{{ item.cpam_reference }}</td>
                                                <td>
                                                    <v-icon @click="borrarPago(item)" small>mdi-delete</v-icon>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td />
                                                <td>Total</td>
                                                <td>${{formatMoney(montototal)}}</td>
                                                <td />
                                            </tr>
                                        </tfoot>
                                    </template>
                                </v-simple-table>
                            </v-card>
                        </v-col>
                    </v-row>

                    <tr>
                        <td>Cambio</td>
                        <td> <span>${{formatMoney(cambio)}} </span></td>
                        <td />
                    </tr>
                    <tr>
                        <td>Subtotal</td>
                        <td> ${{formatMoney(subtotal)}}</td>
                        <td />
                    </tr>
                    <tr>
                        <td>Total I.V.A.</td>
                        <td> ${{formatMoney(iva)}}</td>
                        <td />
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td> ${{formatMoney(total)}}</td>
                    </tr>
                    <v-btn @click="dialogcontado = !dialogcontado">Cancelar</v-btn>
                    <v-btn @click="finalizarVenta" color="success">Confirmar</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogPago" max-width="640">
            <v-card>
                <v-card-title>Agregar pago</v-card-title>

                <v-card-text>
                    <v-form v-model="validPago">
                        <v-row>
                            <v-combobox required v-model="selectpash" :items="paymentsShapes" label="Forma de pago" item-text="pash_name" item-value="pash_pk" @change="cambioFP()" filled chips placeholder="Seleccionar una opción"></v-combobox>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field autofocus id="montoPago" ref="foobar_x" required label="Monto: " v-model="editadoPago.cpam_amount" :rules="minNumberRules" prefix="$" type="number" @change="getcambio()"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Referencia: " v-model="editadoPago.cpam_reference"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-btn @click="dialogPago = !dialogPago">Cancelar</v-btn>
                        <v-btn color="primary" :disabled="!validPago" @click="agregarPago">
                            Agregar
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
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
            clor_pk: this.$route.params.id,
            valid: false,
            validPago: false,
            sales: [],
            stores: [],
            clients: [],
            payments: [],
            paymentsShapes: [],
            paymentsOriginal: [],
            saleHeader: '',
            saleDetail: [],
            desserts: [],
            selectClient: '',
            selectStore: '',
            selectpame: '',
            selectpash: '',
            snackbar: false,
            timeout: 2000,
            subtotal: 0,
            total: 0,
            cambio: 0,
            iva: 0,
            efectivo: 0,
            tarjeta: 0,
            monto: 0,
            referencia: '',
            textMsg: "",
            editadoPago: {
                clsa_fk: 0,
                pash_fk: 0,
                bocu_fk: 0,
                cpam_amount: 0,
                cpam_reference: '',
            },
            editadoPagoDefault: {
                clsa_fk: 0,
                pash_fk: 0,
                bocu_fk: 0,
                cpam_amount: 0,
                cpam_reference: '',
            },
            editado: {
                clsd_pk: 0,
                clsd_quantity: 0,
                clsd_discountrate: 0,
            },
            editadoSale: {
                clsa_pk: 0,
                clie_fk: 0,
                pame_fk: 0,
                stor_fk: 0,
                clde_amount: 0,
                clpa_amount_cash: 0,
                clpa_amount_transfer: 0,
                clpa_amount_change: 0,
            },
            editadoPash: {
                clsa_fk: 0,
                pash_fk: 0,
                cpam_amount: 0,
                cpam_reference: 0,
            },
            enabledStore: false,
            dialogcredito: false,
            dialogcontado: false,
            dialogPago: false,
            storeUser: '',
            minNumberRules: [
                value => !!value || 'Requerido.',
                value => value > 0 || 'El número debe ser mayor o igual a cero',
            ],
            loading: false,
            dialogQuestion: false,
            dialogQuestionDelete: false,
            dialogQuestionDeletePago: false,
            messageQuestion: '',
            pagos: [],
            montototal: 0,
            othercash: 0,
            bocu_pk: 0,
            boxEnabledDetailOrder: false,
        };
    },
    created() {
        this.createsale();
        this.getClients();
        this.getPaymentShow();
        this.getStores();
        this.getUsers();
        this.getPaymentShapes();
        this.obtenerCaja();
    },
    methods: {
        obtenerCaja() {
            axios
                .get("/boxcut")
                .then(response => {
                    console.log("/boxcut")
                    // console.log(response.data.data)
                    if (response.data.data == null) {
                        this.boxEnabledDetailOrder = true
                    } else {
                        this.boxEnabledDetailOrder = false
                        this.bocu_pk = response.data.data.bocu_pk;
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
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
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(',', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        onQuantityChange(item) {
            this.editado = Object.assign({}, item)
            axios.post('/client_sale_details/update', this.editado)
                .then(response => {
                    console.log(this.editado);
                    console.log(response);
                    this.getTotal();
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        onChangeClient() {
            if (this.selectClient.clie_pk == 1) {
                this.getPaymentShow()
            } else {
                this.getPayment()
            }
        },
        finalizar() {
            this.efectivo = 0;
            this.tarjeta = 0;
            this.getPagos();
            if (this.selectClient == '' || this.selectClient == null) {
                this.normal('Alerta', 'Debe seleccionar un cliente', "error");
                return;
            }
            if (this.selectpame == '' || this.selectpame == null) {
                this.normal('Alerta', 'Debe seleccionar un método de pago', "error");
                return;
            }
            if (!this.enabledStore)
                if (this.selectStore == '' || this.selectStore == null) {
                    this.normal('Alerta', 'Debe seleccionar una sucursal', "error");
                    return;
                }
            this.editadoSale.clsa_pk = this.saleHeader.clsa_pk;
            this.editadoSale.clie_fk = this.selectClient.clie_pk;
            this.editadoSale.pame_fk = this.selectpame.pame_pk;
            if (!this.enabledStore)
                this.editadoSale.stor_fk = this.selectStore.stor_pk;
            else
                this.editadoSale.stor_fk = this.users.store_id;
            if (this.editadoSale.pame_fk == 1) {
                this.dialogcontado = true;
                this.getcambio();
            } else
                this.dialogcredito = true;
        },
        finalizarVenta() {
            if (this.editadoSale.pame_fk == 1) {
                //var montototal = parseFloat(this.efectivo) + parseFloat(this.tarjeta);
                var operacion = parseFloat(this.total) - parseFloat(this.montototal);
                if (operacion <= 0) {} else {
                    this.normal('Notificación', 'Los montos de pago deben ser igual al total', "success");
                    return;
                }
            }
            this.messageQuestion = '¿Desea finalizar la Venta?';
            this.dialogQuestion = true
        },
        guardaFinalizar() {
            this.editadoSale.clde_amount = this.total
            this.editadoSale.clpa_amount_change = this.cambio
            this.editadoSale.bocu_fk = this.bocu_pk
            //console.log(this.editadoSale);
            //return false;
            axios.post('/clientsales/update', this.editadoSale)
                .then(response => {
                    if (response.data.code == 200) {
                        if (this.editadoSale.pame_fk == 1) {
                            //De Contado Ticket
                            let route = this.$router.resolve({
                                path: "/client/sales/printOrder/" + response.data.data,
                            });

                            var newWin = window.open(route.href, "",  "height=600,width=400");
                            setTimeout(function(){newWin.print(); },500);
                            setTimeout(function (){ newWin.close(); }, 10000);
                        }
                        if (this.editadoSale.pame_fk == 2) {
                            //A Credito Reporte
                            let route = this.$router.resolve({
                                path: "/client/sales/printCredit/" + response.data.data,
                            });
                          var newWin = window.open(route.href, "",  "height=600,width=400");
                          setTimeout(function(){newWin.print(); },500);
                          setTimeout(function (){ newWin.close(); }, 20000);
                        }
                        this.normal('Notificación', '¡Actualizado correctamente!', "success");
                        this.$router.push('/sales');
                    } else {
                        this.normal('Notificación', response.data.message, "error");
                    }
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        createsale() {
            this.loading = true
            axios.post('/clientsales?clor_pk=' + this.clor_pk + '')
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.sales = response.data.data;
                        this.saleHeader = response.data.data.sale;
                        this.desserts = this.sales.sale_details;
                        console.log("this.saleHeader");
                        console.log(response.data);
                        this.getTotal();
                    } else {
                        this.normal('Notificación', response.data.message, "error");
                    }
                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                    this.normal('Notificación', "Error al cargar los datos", "error");
                })
        },
        abrirPago() {
            this.editadoPago.cpam_amount = 0;
            this.dialogPago = true

        },
        agregarPago() {
            this.loading = true
            this.editadoPago.clsa_fk = this.saleHeader.clsa_pk;
            if (this.selectpash == '' || this.selectpash == null) {
                this.normal('Alerta', 'Debe seleccionar una forma de pago', "error");
                return;
            }
            this.editadoPago.pash_fk = this.selectpash.pash_pk;
            this.editadoPago.bocu_fk = this.bocu_pk
            console.log(this.editadoPago);
            axios.post('/client/payment/amounts', this.editadoPago)
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    console.log(response.data)
                    if (response.data.data != null) {
                        this.textMsg = "¡Actualizado correctamente!";
                        this.normal('Notificación', '¡Actualizado correctamente!', "success");
                        this.dialogPago = false

                        this.getPagos();

                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                    this.normal('Notificación', "Error al cargar los datos", "error");
                })
        },
        getPagos() {
            this.loading = true
            axios
                .get("/client/payment/amounts/" + this.saleHeader.clsa_pk)
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.pagos = response.data.data;
                        this.getEfectivo();
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log("Error al cargar los datos");
                    console.log(e);
                    this.normal('Notificación', "Error al cargar los datos", "error");
                });
        },

        cambioFP() {
            this.$refs.foobar_x.focus()
            this.$refs.foobar_x.$refs.input.select()
        },
        getcambio() {

            this.cambio = this.efectivo - (this.total - this.othercash)

            if ((this.cambio) > 0)
                this.cambio = this.efectivo - (this.total - this.othercash);
            else
                this.cambio = 0

            console.log('Efectivo: ' + this.efectivo + ' Total: ' + this.total + ' Cambio: ' + this.cambio)
        },
        getTotal() {
            this.subtotal = 0
            this.subtotal = 0;
            this.descuento = 0;
            for (var i = 0; i < this.desserts.length; i++) {
                //this.subtotal = this.subtotal + (this.desserts[i].clsd_price * this.desserts[i].clsd_quantity);
                var importe = this.desserts[i].clsd_price * this.desserts[i].clsd_quantity;
                var importeDescuento = (importe * (1 - this.desserts[i].clsd_discountrate / 100));
                this.subtotal = this.subtotal + importeDescuento;
            }
            this.total = this.subtotal + this.iva;
        },
        getEfectivo() {
            this.efectivo = 0;
            this.montototal = 0;
            this.othercash = 0;
            for (var i = 0; i < this.pagos.length; i++) {
                console.log(this.pagos[i])
                if (this.pagos[i].pash_name == 'Efectivo') {
                    this.efectivo = parseFloat(this.efectivo) + parseFloat(this.pagos[i].cpam_amount)
                } else {
                    this.othercash = this.othercash + parseFloat(this.pagos[i].cpam_amount)
                }
                this.montototal = parseFloat(this.montototal) + parseFloat(this.pagos[i].cpam_amount)
            }
            console.log('Efectivo: ' + this.efectivo + ' Total: ' + this.montototal)
            this.getcambio()
        },
        getClients() {
            axios.get("/clientsget")
                .then(response => {
                    this.clients = response.data.data;
                    this.selectClient = this.clients[0];
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getPaymentShapes() {
            axios
                .get("/paymentshapesget")
                .then(response => {
                    this.paymentsShapes = response.data.data;
                    this.selectpash = this.paymentsShapes[0];
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
        getPaymentShow() {
            axios
                .get("/paymentmethodsshow/1")
                .then(response => {
                    console.log(response.data.data)
                    this.payments = response.data.data;
                    this.selectpame = this.payments[0]
                })
                .catch(e => {
                    console.log(e);
                });
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
        borrar(item) {
            this.editado = Object.assign({}, item)
            this.dialogQuestionDelete = true
        },
        guardaBorrar() {
            this.delete()
            this.dialogQuestionDelete = false
        },
        borrarPago(item) {
            this.editadoPago = Object.assign({}, item)
            this.dialogQuestionDeletePago = true
        },
        guardaBorrarPago() {
            this.dialogQuestionDeletePago = false
            axios.post('/client/payment/amounts/destroy', this.editadoPago).then(response => {
                this.textMsg = "¡Eliminado correctamente!";
                this.normal('Notificación', this.textMsg, "success");
                this.getPagos();
            });
        },
        delete: function () {
            axios.post('/client_sale_details/destroy', this.editado).then(response => {
                this.textMsg = "¡Eliminado correctamente!";
                this.normal('Notificación', this.textMsg, "success");
                this.createsale();
            });
        },
        actualizar(item) {
            this.editado = Object.assign({}, item)
            axios.post('/client_sale_details/update', this.editado)
                .then(response => {
                    this.textMsg = "¡Actualizado correctamente!";
                    this.normal('Notificación', this.textMsg, "success");
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
