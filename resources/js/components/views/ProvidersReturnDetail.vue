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
        <v-alert v-model="alert" dismissible transition="fade-transition" type="info">
            {{ textMsg }}
        </v-alert>

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
                        <v-card-title class="subheading font-weight-bold">
                            <H2>{{saleHeader.prpu_identifier}}</H2>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Proveedor:</h4> {{saleHeader.prov_name}}
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
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Fecha:</h4> {{saleHeader.created_at}}
                                    </v-label>
                                </v-card-text>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Motivo Devolución:</h4> {{saleHeader.remo_description}}
                                    </v-label>
                                </v-card-text>
                            </v-col>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Estatus:</h4> {{saleHeader.prre_status_description}}
                                    </v-label>
                                </v-card-text>
                            </v-col>
                            <v-col cols="4">
                                <v-card-text class="category d-inline-flex font-weight-light">
                                    <v-label>
                                        <h4>Observaciones:</h4> {{saleHeader.prre_observation}}
                                    </v-label>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-alert v-model="alertError" dismissible transition="fade-transition" type="error" timeout="400">
                {{ textMsg }}
            </v-alert>
            <v-col>
                <v-card>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Identificador</th>
                                    <th class="text-left">Producto</th>
                                    <th class="text-left">Unidad Medida</th>
                                    <th class="text-left">Cantidad Devuelta</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in desserts" :key="item.prod_name">
                                    <td>{{ item.prod_identifier }}</td>
                                    <td>{{ item.prod_name }}</td>
                                    <td>{{ item.meas_name }}</td>
                                    <td>{{item.prrd_quantity}}</td>
                                    <td></td>
                                </tr>

                            </tbody>
                            <tfoot>

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
            prpu_pk: this.$route.params.id,
            prre_observation: '',
            valid: false,
            alert: false,
            alertError: false,
            sales: [],
            stores: [],
            returns: [],
            payments: [],
            saleHeader: '',
            saleDetail: [],
            desserts: [],
            selectReturn: '',
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
                prrd_pk: 0,
                prrd_quantity: 0,
            },
            editadoSale: {
                prre_pk: 0,
                remo_fk: 0,
                prre_observation: '',
            },

            dialogcredito: false,
            dialogcontado: false,

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
        this.createsale();
        //this.getMotivos();
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
        getMotivos() {
            axios.get("/return/motives")
                .then(response => {
                    this.returns = response.data.data;
                    this.selectReturn = this.returns[0];

                })
                .catch(e => {
                    console.log(e);
                });

        },
        finalizar() {

            if (this.selectReturn == '' || this.selectReturn == null) {
                this.normal('Notificación', 'Debe seleccionar un motivo de devolución', "success");
                return;
            }

            this.editadoSale.prre_pk = this.saleHeader.prre_pk;
            this.editadoSale.remo_fk = this.selectReturn.remo_pk;
            this.editadoSale.prre_observation = this.prre_observation;

            var r = confirm("¿Está seguro de finalizar?");
            if (r == true) {

                axios.post('/provider/returns/update', this.editadoSale)
                    .then(response => {
                        console.log(response)
                        if (response.data.status.code == 200) {

                            this.textMsg = "¡Actualizado correctamente!";
                            this.normal('Notificación', this.textMsg, "success");
                            this.$router.push('/purchaselist');
                        } else {
                            this.normal('Alerta', response.data.message, "error");

                        }

                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }

        },
        finalizarVenta() {
            console.log((this.total + '-' + (this.efectivo + this.tarjeta)));
            if (this.editadoSale.pame_fk == 1)
                if ((this.total - this.efectivo - this.tarjeta) == 0) {

                }
            else {
                this.normal('Alerta', "Los montos de pago deben ser igual al total", "error");
                return;
            }
            var r = confirm("¿Está seguro de finalizar?");
            if (r == true) {
                this.editadoSale.clde_amount = this.total
                this.editadoSale.clpa_amount_cash = this.efectivo
                this.editadoSale.clpa_amount_transfer = this.tarjeta
                axios.post('/clientsales/update', this.editadoSale)
                    .then(response => {
                        console.log(response)
                        if (response.data.code == 200) {

                            this.textMsg = "¡Actualizado correctamente!";
                            this.normal('Notificación', this.textMsg, "success");
                            this.$router.push('/sales');
                        } else {
                            this.normal('Alerta', response.data.message, "error");
                        }

                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },
        onQuantityChange(item) {
            this.editado = Object.assign({}, item)
            console.log(this.editado)
            if (this.editado.prrd_quantity > this.editado.prrd_quantity_purchase) {
                this.textMsg = "¡El cantidad devuelta no puede ser mayor a la cantidad comprada!";
                this.alertError = true;
                setTimeout(() => {
                    this.alertError = false
                }, 3000)
                this.createsale()
                return;
            }
            axios.post('/provider/return/details/update', this.editado)
                .then(response => {
                    console.log(response)
                    console.log("¡Actualizado correctamente!")
                    this.getTotal();
                })
                .catch(e => {
                    this.errors.push(e)
                })

        },
        createsale() {
            this.loading = true
            axios.get('/provider/returns/' + this.prpu_pk + '')
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        console.log(response.data)
                        this.sales = response.data.data;
                        this.saleHeader = response.data.data.ProviderReturns;
                        this.desserts = this.sales.ProviderReturnDetails;
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

            for (var i = 0; i < this.desserts.length; i++) {
                this.subtotal = this.subtotal + (this.desserts[i].prrd_price * this.desserts[i].prrd_quantity);
            }
            //this.iva =  this.subtotal * 0.16;

            this.total = this.subtotal + this.iva;
        },

        borrar(item) {

            this.editado = Object.assign({}, item)
            var r = confirm("¿Está seguro de borrar el registro?");
            if (r == true) {
                this.editado.prrd_pk = item.prrd_pk;
                this.delete()
            }
        },

        delete: function () {

            axios.post('/provider/return/details/destroy', this.editado).then(response => {

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
