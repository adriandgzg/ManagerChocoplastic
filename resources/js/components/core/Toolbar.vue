<template>
<div>
    <v-app-bar app id="core-toolbar" style="background: #F2436D;">

        <v-dialog v-model="dialogCaja" max-width="500px">
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">Apertura de Caja</span>
                </v-card-title>
                <v-form v-model="validCaja">
                    <v-card-text>

                        <v-text-field v-model="user.name" label="Usuario" prepend-icon="mdi-account" disabled></v-text-field>
                        <v-text-field v-model="dateFormatted" label="Inicio de Caja" prepend-icon="event" disabled></v-text-field>

                        <v-text-field v-model="montoApertura" label="Monto de Apertura" prepend-icon="mdi-square-inc-cash" prefix="" type="number" v-on:keydown="isNumberValid" :rules="numberRules" required></v-text-field>
                    </v-card-text>

                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                        <v-btn :disabled="!validCaja" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>
                    </v-card-actions>
                </v-form>

            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCerrarCaja" max-width="500px">
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">Cierre de Caja</span>
                </v-card-title>
                <v-form v-model="validCerrarCaja">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="12" style="padding: 0px 12px 0px 12px;">
                                <v-text-field v-model="user.name" label="Usuario" prepend-icon="mdi-account" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                <v-text-field v-model="saldosCaja.bocu_startdate" label="Inicio de Caja" prepend-icon="event" disabled></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                <v-text-field v-model="dateFormatted" label="Cierre de Caja" prepend-icon="event" disabled></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                <v-text-field v-model="saldosCaja.bocu_initialamount" label="Monto de Apertura" prepend-icon="mdi-square-inc-cash" disabled prefix="" type="number" v-on:keydown="isNumberValid" :rules="numberRules" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                <v-text-field v-model="editadoBox.bocu_endamount" label="Monto de Cierre" prepend-icon="mdi-square-inc-cash" prefix="" type="number" v-on:keydown="isNumberValid" :rules="numberRules" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <span>Cancelar pedidos del día</span>
                                <v-switch v-model="CancelarVentas" />
                            </v-col>
                        </v-row> 
                        <v-row>
                            <v-col>
                                <v-card>
                                    <v-card-title class="green white--text">
                                        <v-icon class="mr-4" dark size="36">
                                            mdi-cash-multiple
                                        </v-icon>
                                        <span class="headline">Resumen de Caja</span>
                                    </v-card-title>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-h5 font-weight-bold  green--text" style="padding-bottom: 0px; margin:0px;">
                                                    COBROS
                                                </p>
                                            </v-col>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-right text-lg-h5  green--text" style="padding-bottom: 0px; margin:0px;">
                                                    $ {{formatMoney(saldosCaja.totalcharge)}}
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                                                    RETIROS
                                                </p>
                                            </v-col>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-right text-lg-h6  grey--text" style="padding-bottom: 0px; margin:0px;">
                                                    $ {{formatMoney(saldosCaja.totalwithdrawals)}}
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                                                    TOTAL
                                                </p>
                                            </v-col>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-right text-lg-h6  grey--text" style="padding-bottom: 0px; margin:0px;">
                                                    $ {{formatMoney((parseFloat(saldosCaja.bocu_initialamount) + parseFloat(saldosCaja.totalcharge)) - parseFloat(saldosCaja.totalwithdrawals)) }}
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                                                    SALDO FINAL
                                                </p>
                                            </v-col>
                                            <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                                                <p class="text-lg-right text-lg-h6  grey--text" style="padding-bottom: 0px; margin:0px;">
                                                    ${{formatMoney(saldosCaja.bocu_endamount)}}
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-divider style="margin: 10px 10px 10px"></v-divider>

                                    </v-container>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-textarea auto-grow v-model="editadoBox.bocu_observation" filled color="deep-purple" label="Observaciones" rows="3"></v-textarea>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarCerrar">Cancelar</v-btn>
                        <v-btn :disabled="!validCerrarCaja" color="teal accent-4" class="ma-2 white--text" @click="guardarCierre">Guardar</v-btn>
                    </v-card-actions>
                </v-form>

            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDrawals" max-width="500px">
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">Retiro de Caja</span>
                </v-card-title>
                <v-form v-model="validDrawals">
                    <v-card-text>
                        <v-row>
                            <v-text-field v-model="user.name" label="Usuario" prepend-icon="mdi-account" disabled></v-text-field>

                        </v-row>
                        <v-row>
                            <v-text-field v-model="editadoDrawals.cawi_amount" label="Monto de Retiro" prepend-icon="mdi-square-inc-cash" prefix="" type="number" v-on:keydown="isNumberValid" :rules="numberRules" required></v-text-field>

                        </v-row>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarRetirar">Cancelar</v-btn>
                        <v-btn :disabled="!validDrawals" color="teal accent-4" class="ma-2 white--text" @click="guardarRetiro">Guardar</v-btn>
                    </v-card-actions>
                </v-form>

            </v-card>
        </v-dialog>
        <div class="v-toolbar-title">
            <v-toolbar-title>
                <v-btn class="default v-btn--simple" light icon @click.stop="onClickBtn">
                    <v-icon>mdi-view-list</v-icon>
                </v-btn>
                {{ title }}
            </v-toolbar-title>
        </div>

        <v-spacer />
        <v-toolbar-items>
            <v-flex align-center layout py-2>
                <v-btn v-if="!boxEnabled" color="#e3ae10" class="ma-2 white--text" @click="retirarCaja">
                    Retiro de Caja
                    <v-icon right dark>mdi-inbox-arrow-up</v-icon>
                </v-btn>
                <v-btn v-if="boxEnabled" color="#4F33FF" class="ma-2 white--text" @click="abrirCaja">
                    Abrir Caja
                    <v-icon right dark>mdi-inbox-arrow-down</v-icon>
                </v-btn>

                <v-btn v-else color="#FF5733" class="ma-2 white--text" @click="cerrarCaja">
                    Cerrar Caja
                    <v-icon right dark>mdi-inbox-arrow-up</v-icon>
                </v-btn>

            </v-flex>
        </v-toolbar-items>
    </v-app-bar>
</div>
</template>

<script>
import {
    mapMutations
} from 'vuex'
import CripNotice from "crip-vue-notice";
export default {
    data: () => ({
        notifications: [],
        title: null,
        responsive: false,
        responsiveInput: false,
        dialogCaja: false,
        dialogCerrarCaja: false,
        dialogDrawals: false,
        validDrawals: false,
        validCerrarCaja: false,
        validCaja: false,
        dateFormatted: '',
        boxEnabled: false,
        boxDrawals: false,
        CancelarVentas: false,

        editadoBox: {
            admi_fk: 0,
            bocu_amountcash: 0,
            bocu_amountsum: 0,
            bocu_enddate: '',
            bocu_initialamount: 0,
            bocu_endamount: 0,
            bocu_startdate: '',
            bocu_observation: '',
            bocu_status: 1,
            bocu_cancelorders: 0,
            bocu_pk: 0,
        },
        editadoBoxDefault: {
            admi_fk: 0,
            bocu_amountcash: 0,
            bocu_amountsum: 0,
            bocu_enddate: '',
            bocu_initialamount: 0,
            bocu_endamount: 0,
            bocu_startdate: '',
            bocu_observation: '',
            bocu_status: 1,
            bocu_cancelorders: 0,
            bocu_pk: 0,
        },
        editadoDrawals: {
            bocu_fk: 0,
            cawi_amount: 0,
        },
        editadoBoxDefault: {
            bocu_fk: 0,
            cawi_amount: 0,
        },
        caja: [],
        saldosCaja: '',
        user: '',
        montoApertura: 0,
        numberRules: [
            value => !!value || 'Requerido.',
            value => value > 0 || 'El número debe ser mayor a cero',
        ],
    }),

    watch: {
        '$route'(val) {
            this.title = val.name
        },
        checkbox: function () {
            // Emit this information to the parents component
            this.$emit("child-checkbox", this.boxEnabled);
        }
    },

    created() {
        this.getUser();
        this.obtenerCaja();
        //console.log('la hora:' + new Date().toISOString());
        //this.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10)) + ' ' + this.formatHour(new Date().toISOString().substr(11, 15));
        //var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
        //this.dateFormatted = this.formatDate(localISOTime.toISOString().substr(0, 10)) + ' ' + this.formatHour(localISOTime.toISOString().substr(11, 15));
        //console.log('la hora buena:' + this.dateFormatted);  
        
        //var localISOTimex = this.formatDate((new Date(Date.now() - tzoffset)).toISOString().substr(0, 10));

        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = this.formatDate((new Date(Date.now() - tzoffset)).toISOString().substr(0, 10)) + ' ' + this.formatHour((new Date(Date.now() - tzoffset)).toISOString().substr(11, 15));
        this.dateFormatted = localISOTime;

        console.log('la hora:' + this.dateFormatted);  

    },

    mounted() {
        this.onResponsiveInverted()
        window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResponsiveInverted)
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
        isNumberValid: function (evt) {
            console.log('key ' + evt.key + ' (' + evt.keyCode + ')');
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            console.log(charCode + '-->ñprim')
            //if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106) || charCode == 8 || charCode == 190 || charCode == 110) {
                // console.log(charCode + '--> true');
                return true;
            } else {
                // console.log(charCode + '-->000');
                evt.preventDefault();

            }
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${year}-${month}-${day.substr(0,2)}`
        },
        formatHour(date) {
            if (!date) return null

            const [year, month, day] = date.split(':')
            return `${year}:${month}`
        },
        getUser() {
            axios
                .get("/listUser")
                .then(response => {
                    this.user = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        obtenerCaja() {
            axios
                .get("/boxcut")
                .then(response => {
                    console.log('response.data.data.box')
                    console.log(response.data.data)
                    if (response.data.data == null) {
                        this.boxEnabled = true
                    } else {
                        this.boxEnabled = false
                        this.editadoBox = response.data.data;
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        abrirCaja() {
            this.dialogCaja = true
            //this.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10)) + ' ' +
              //  this.formatHour(new Date().toISOString().substr(11, 15));
        },
        cerrarCaja() {
            this.dialogCerrarCaja = true
            //this.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10)) + ' ' +
              //  this.formatHour(new Date().toISOString().substr(11, 15));

            axios
                .get("/box/cuts/" + this.editadoBox.bocu_pk)
                .then(response => {
                    this.saldosCaja = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });

        },
        retirarCaja() {
            this.dialogDrawals = true
            //this.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10)) + ' ' +
              //  this.formatHour(new Date().toISOString().substr(11, 15));
            this.editadoDrawals.bocu_fk = this.editadoBox.bocu_pk;
        },

        cancelar() {
            this.dialogCaja = false
        },
        cancelarCerrar() {
            this.dialogCerrarCaja = false
        },
        cancelarRetirar() {
            this.dialogDrawals = false
        },
        guardar() {
            this.editadoBox.bocu_startdate = this.dateFormatted;
            this.editadoBox.bocu_initialamount = this.montoApertura;
            axios.post('/box/insert', this.editadoBox)
                .then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        this.dialogCaja = false
                        this.textMsg = "¡Actualizado correctamente!";
                        this.normal('Notificación', '¡Actualizado correctamente!', "success");
                        this.editadoBox = this.editadoBoxDefault;
                        this.obtenerCaja();
                        this.$router.go();
                    } else {
                        this.normal('Notificación', response.data.message, "error");
                    }

                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                })
        },

        guardarCierre() {
            this.editadoBox.bocu_enddate = this.dateFormatted;
            if (this.CancelarVentas == true)
            {
                this.editadoBox.bocu_cancelorders = 1;
            }
            else
            {
                this.editadoBox.bocu_cancelorders = 0;
            }


            axios.post('/box/update', this.editadoBox)
                .then(response => {
                    console.log('response')
                    console.log(response)
                    if (response.data.code == 200) {
                        this.dialogCerrarCaja = false
                        this.textMsg = "¡Actualizado correctamente!";
                        this.normal('Notificación', '¡Actualizado correctamente!', "success");

                        this.obtenerCaja();
                        let route = this.$router.resolve({
                            path: '/cash/cutbox/printCorte/' + this.editadoBox.bocu_pk
                        });

                        window.open(route.href, '_blank');

                        this.editadoBox = this.editadoBoxDefault;
                        this.$router.go();
                    } else {
                        this.normal('Notificación', response.data.status.technicaldetail, "error");
                    }

                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                })

        },

        guardarRetiro() {

            axios.post('/cash/withdrawals', this.editadoDrawals)
                .then(response => {
                    console.log(response)
                    if (response.data.status.code == 200) {
                        this.dialogDrawals = false
                        this.textMsg = "¡Actualizado correctamente!";
                        this.normal('Notificación', '¡Actualizado correctamente!', "success");
                        this.editadoDrawals = this.editadoDrawalsDefault;
                        let route = this.$router.resolve({
                            path: '/cash/withdrawals/printRetiro/' + response.data.data
                        });

                        window.open(route.href, '_blank');
                        this.$router.go();
                    } else {
                        this.normal('Notificación', response.data.message, "error");
                    }

                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
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
        ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
        onClickBtn() {
            this.setDrawer(!this.$store.state.app.drawer)
        },
        onClick() {
            //
        },
        onResponsiveInverted() {
            if (window.innerWidth < 991) {
                this.responsive = true
                this.responsiveInput = false
            } else {
                this.responsive = false
                this.responsiveInput = true
            }
        }
    }
}
</script>

<style>
#core-toolbar a {
    text-decoration: none;
}
</style>
