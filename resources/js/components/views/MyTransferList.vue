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
                            <v-toolbar flat color="indigo" v-if="can('transferdetail')">
                                <template v-slot:extension>
                                    <v-btn fab color="cyan accent-2" bottom left absolute :href="'/transferdetail/0'">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>

                            </v-toolbar>
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
                            </v-col>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip v-if="item.prtr_status_description == 'Pendiente'" color="gray" dark> {{item.prtr_status_description}} </v-chip>
                            <v-chip v-if="item.prtr_status_description == 'Solicitado'" color="orange" dark> {{item.prtr_status_description}} </v-chip>
                            <v-chip v-if="item.prtr_status_description == 'Finalizado'" color="green" dark> {{item.prtr_status_description}} </v-chip>
                        </template>

                        <template v-slot:item.action="{ item }">
                            <v-btn class="mr-2" fab dark small color="pink" v-if="item.prtr_status_description == 'Pendiente'" :href="'/transferdetail/'+item.prtr_pk" title="Continuar">
                                <v-icon dark>mdi-swap-horizontal</v-icon>
                            </v-btn>
                            <v-btn class="mr-2" fab dark small color="purple" title="Detalle de Traspaso" :href="'/transferdetailview/'+item.prtr_pk">
                                <v-icon dark>mdi-eye</v-icon>
                            </v-btn>
                            <!--<v-btn class="mr-2" fab dark small color="cyan"  title="Continuar venta" v-if="item.prtr_status == 'Pendiente'"
                               :href="'/detaiorder/'+item.clor_pk">
                            <v-icon dark>mdi-cash-register</v-icon>
                        </v-btn>-->
                        </template>
                    </v-data-table>
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
export default {
    data() {
        return {
            headers: [{
                    text: 'ID',
                    value: 'prtr_pk',
                    width: '10%'
                },
                {
                    text: 'Identificador',
                    value: 'prtr_identifier',
                    width: '10%'
                },
                {
                    text: 'Sucursal Salida',
                    value: 'stor_name_output'
                },
                {
                    text: 'Sucursal Entrada',
                    value: 'stor_name_input'
                },
                {
                    text: 'Observación',
                    value: 'prtr_observation'
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
            editedIndex: -1,
            sales: [],
            sales0: [],
            search: "",
            dialog: false,
            snackbar: false,
            timeout: 2000,
            idUserStore: 0,
            textMsg: "",
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
        this.getSales();
    },

    methods: {

        getSales() {
            this.loading = true
            axios
                .get("/product/mytransfers")
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.sales = response.data.data;
                        console.log(this.sales)
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.normal('Notificación', "Error al cargar los datos", "error");
                });
        },
    },
    computed: {
        ...mapGetters('auth', ['can'])
    },
}
</script>
