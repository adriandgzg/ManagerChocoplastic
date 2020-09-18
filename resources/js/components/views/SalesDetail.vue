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
                    <v-form v-model="valid">
                        <v-card-title class="subheading font-weight-bold">No. Pedido: {{saleHeader.clor_identifier}}</v-card-title>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Cliente:</h4> {{saleHeader.clie_name}}
                                    </v-label>
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
                    </v-form>
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
                                    <td>{{ item.clsd_quantity }}</td>
                                    <td>${{ formatMoney(item.clsd_price) }}</td>
                                    <td>{{ item.clsd_discountrate }}</td>
                                    <td>${{ formatMoney((item.clsd_quantity * item.clsd_price)*(1- (item.clsd_discountrate/100))) }}</td>
                                    <td>

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
                                    <td>Descuento</td>
                                    <td>${{formatMoney(descuento)}}</td>
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
                    <span class="subheading font-weight-bold">Forma de Pago:</span>
                    <v-text-field label="Efectivo: " prefix="$" type="number" v-model="efectivo"></v-text-field>
                    <v-text-field label="Transferencia: " v-model="tarjeta" prefix="$" type="number"></v-text-field>

                    <br />
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

        <v-dialog v-model="dialogcontado" max-width="500">
            <v-card>
                <v-card-title>Contado</v-card-title>

                <v-card-text>
                    <span class="subheading font-weight-bold">Forma de Pago:</span>

                    <v-text-field label="Efectivo: " v-model="efectivo" required :rules="minNumberRules" prefix="$" type="number"></v-text-field>
                    <v-text-field label="Transferencia: " v-model="tarjeta" required :rules="minNumberRules" prefix="$" type="number"></v-text-field>

                    <br />
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
    </v-container>
</v-app>
</template>

<script>
import CripNotice from "crip-vue-notice";
export default {
    data() {
        return {
            clor_pk: this.$route.params.id,
            valid: false,
            sales: [],
            stores: [],
            clients: [],
            payments: [],
            paymentsOriginal: [],
            saleHeader: '',
            saleDetail: [],
            desserts: [],
            selectClient: '',
            selectStore: '',
            selectpame: '',
            snackbar: false,
            timeout: 2000,
            subtotal: 0,
            total: 0,
            iva: 0,
            efectivo: 0,
            tarjeta: 0,
            textMsg: "",
            editado: {
                clsd_pk: 0,
                clsd_quantity: 0,
            },
            editadoSale: {
                clsa_pk: 0,
                clie_fk: 0,
                pame_fk: 0,
                stor_fk: 0,
                clde_amount: 0,
                clsd_amount_cash: 0,
                clsd_amount_transfer: 0,
            },

            dialogcredito: false,
            dialogcontado: false,
            loading: false,
            minNumberRules: [
                value => !!value || 'Requerido.',
                value => value > 0 || 'El número debe ser mayor o igual a cero',
            ],

        };
    },
    created() {

        this.createsale();
        this.getClients();
        this.getPaymentShow();
        this.getStores();
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

        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(',', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        onQuantityChange(item) {
            this.editado = Object.assign({}, item)
            axios.post('/client_sale_details/update', this.editado)
                .then(response => {
                    this.textMsg = "¡Actualizado correctamente!";
                    console.log("¡Actualizado correctamente!")
                    this.getTotal();
                })
                .catch(e => {
                    this.errors.push(e)
                })

        },
        onChangeClient() {
            if (this.selectClient.clie_pk == 1) {
                console.log('getPaymentShow')
                this.getPaymentShow()
            } else {
                console.log('getPayment')
                this.getPayment()
            }
        },
        finalizar() {
            console.log(this.selectClient);
            this.efectivo = 0;
            this.tarjeta = 0;

            if (this.selectClient == '' || this.selectClient == null) {
                this.normal('Alerta', 'Debe seleccionar un cliente', "error");
                return;
            }

            if (this.selectpame == '' || this.selectpame == null) {
                this.normal('Alerta', 'Debe seleccionar un método de pago', "error");
                return;
            }

            /*if (this.selectStore == '' || this.selectStore == null) {
                this.normal('Alerta', 'Debe seleccionar una sucursal', "error");
                return;
            }*/

            this.editadoSale.clsa_pk = this.saleHeader.clsa_pk;
            this.editadoSale.clie_fk = this.selectClient.clie_pk;
            this.editadoSale.pame_fk = this.selectpame.pame_pk;
            this.editadoSale.stor_fk = this.selectStore.stor_pk;

            if (this.editadoSale.pame_fk == 1)
                this.dialogcontado = true;
            else
                this.dialogcredito = true;

        },
        finalizarVenta() {
            console.log((this.total + '-' + (this.efectivo + this.tarjeta)));
            if (this.editadoSale.pame_fk == 1)
                if ((this.total - this.efectivo - this.tarjeta) == 0) {

                }
            else {
                this.normal('Notificación', 'Los montos de pago deben ser igual al total', "success");
                return;
            }
            var r = confirm("¿Está seguro de finalizar la venta?");
            if (r == true) {
                this.editadoSale.clde_amount = this.total
                this.editadoSale.clsd_amount_cash = this.efectivo
                this.editadoSale.clsd_amount_transfer = this.tarjeta
                axios.post('/clientsales/update', this.editadoSale)
                    .then(response => {
                        console.log(response)
                        if (response.data.code == 200) {

                            if (this.editadoSale.pame_fk == 1) {
                                //De Contado Ticket
                                this.$router.push('/client/sales/printOrder/' + item.clsa_pk);
                                this.$router.push('/sales');

                            }

                            if (this.editadoSale.pame_fk == 2) {
                                //A Credito Reporte
                                let route = this.$router.resolve({
                                    path: '/client/sales/printCredit/' + this.item.clsa_pk
                                });

                                window.open(route.href, '_blank');
                            }
                            this.normal('Notificación', '¡Actualizado correctamente!', "success");

                        } else {
                            this.normal('Notificación', response.data.message, "error");
                        }

                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },
        createsale() {
            this.loading = true
            axios.get('/client/sales/' + this.clor_pk + '')
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        console.log(response.data)
                        this.sales = response.data.data;
                        this.saleHeader = response.data.data.client_sales;
                        this.desserts = this.sales.client_sale_details;

                        this.getTotal();
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
        getTotal() {

            this.subtotal = 0;
            this.descuento = 0;
            for (var i = 0; i < this.desserts.length; i++) {
                //this.subtotal = this.subtotal + (this.desserts[i].clsd_price * this.desserts[i].clsd_quantity);

                var importe = this.desserts[i].clsd_price * this.desserts[i].clsd_quantity;
                var importeDescuento = (importe * (1 - this.desserts[i].clsd_discountrate / 100));
                this.descuento = this.descuento + (importe * (this.desserts[i].clsd_discountrate / 100));
                this.subtotal = this.subtotal + importeDescuento;
            }
            //this.iva =  this.subtotal * 0.16;

            this.total = this.subtotal + this.iva;
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
                    this.payments = response.data.data;
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
            var r = confirm("¿Está seguro de borrar el registro?");
            if (r == true) {
                this.editado.clsd_pk = item.clsd_pk;
                this.delete()
            }
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
    }
}
</script>
