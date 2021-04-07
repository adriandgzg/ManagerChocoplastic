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
                                    <td>{{ item.clod_quantity }}</td>

                                    <td>${{ formatMoney(item.clod_price) }}</td>
                                    <td>${{ formatMoney(item.clod_quantity * item.clod_price) }}</td>
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
                                    <td>IVA</td>
                                    <td>${{formatMoney(iva)}}</td>
                                    <td />
                                </tr>
                                <tr>
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
            ieps: 0,
            efectivo: 0,
            tarjeta: 0,
            textMsg: "",
            editado: {
                clod_pk: 0,
                clod_quantity: 0,
            },
            editadoSale: {
                clsa_pk: 0,
                clie_fk: 0,
                pame_fk: 0,
                stor_fk: 0,
                clde_amount: 0,
                clpa_amount_cash: 0,
                clpa_amount_transfer: 0,
            },

            dialogcredito: false,
            dialogcontado: false,
            loading: false,
            dialogQuestion: false,
            dialogQuestionDelete: false,
            messageQuestion: '',

            minNumberRules: [
                value => !!value || 'Requerido.',
                value => value > 0 || 'El número debe ser mayor o igual a cero',
            ],

        };
    },
    created() {

        this.createsale();
        //this.getClients();
        //this.getPaymentShow();
        //this.getStores();
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
   
        createsale() {
            this.loading = true
            axios.get('/client/orders/' + this.clor_pk + '')
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        console.log(response.data)
                        this.sales = response.data.data;
                        this.saleHeader = response.data.data.order;
                        this.desserts = this.sales.order_details;

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
            this.iva = 0;
            this.ieps = 0;
            for (var i = 0; i < this.desserts.length; i++) {
                this.subtotal = this.subtotal + (this.desserts[i].clod_price * this.desserts[i].clod_quantity);
                var importe = this.desserts[i].clod_price * this.desserts[i].clod_quantity;

                if (this.desserts[i].prod_iva == 1)
                    this.iva = this.iva + ((importe / (1 + (this.desserts[i].syst_iva / 100))) * (this.desserts[i].syst_iva / 100));
                if (this.desserts[i].prod_ieps == 1)
                    this.ieps = this.ieps + ((importe / (1 + (this.desserts[i].syst_ieps / 100))) * (this.desserts[i].syst_ieps / 100));
            }

            this.total = this.subtotal;
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
