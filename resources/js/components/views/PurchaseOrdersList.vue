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
        <v-dialog v-model="loadingDialog" persistent width="300">
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
                    <v-data-table :headers="headers" :items="ordenescompra" :search="search" sort-by="id" class="elevation-3" :loading="loading" loading-text="Cargando... Espere un momento.">
                        <template v-slot:top>
                            <v-system-bar color="indigo darken-2" dark></v-system-bar>
                            <v-toolbar flat color="indigo">
                                <template v-slot:extension>
                                    <v-btn fab color="cyan accent-2" bottom left absolute :href="'/purchaseorder/0'">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>

                            </v-toolbar>
                            <v-col cols="12" sm="12">
                                <v-text-field autofocus v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
                            </v-col>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip v-if="item.prpo_status == 0" color="red" dark> {{item.prpo_status_description}} </v-chip>
                            <v-chip v-if="item.prpo_status == 1" color="orange" dark> {{item.prpo_status_description}} </v-chip>
                            <v-chip v-if="item.prpo_status == 2" color="green" dark> {{item.prpo_status_description}} </v-chip>
                            <v-chip v-if="item.prpo_status == 3" color="blue" dark> {{item.prpo_status_description}} </v-chip>

                        </template>
                        <template v-slot:item.action="{ item }">

                            <v-btn class="mr-2" fab dark small color="pink" v-if="item.prpo_status == 1" :href="'/purchaseorder/'+item.prpo_pk">
                                <v-icon dark>mdi-shuffle</v-icon>
                            </v-btn>
                            <v-btn class="mr-2" fab dark small color="orange" :href="'/purchases/'+item.prpo_pk+'/1'" title="Convertir en compra" v-if="item.prpo_status == 2">
                                <v-icon dark>mdi-cloud-check</v-icon>
                            </v-btn>
                            <v-btn class="mr-2" fab dark small color="purple" :href="'/orderdetail/'+item.prpo_pk" title="Detalle de la orden">
                                <v-icon dark>mdi-eye</v-icon>
                            </v-btn>

                            <v-btn class="mr-2" fab dark small color="error" @click="borrar(item)" title="Eliminar" v-if="item.prpo_status == 1">
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
                    text: 'No. ID',
                    value: 'prpo_identifier'
                },
                {
                    text: 'Proveedor',
                    value: 'prov_name'
                },
                {
                    text: 'Sucursal',
                    value: 'stor_name'
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
            ordenescompra: [],
            entities: [],
            search: "",
            dialog: false,
            snackbar: false,
            loadingDialog: false,
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
        };
    },
    created() {
        this.getCategories();
    },

    methods: {

        getCategories() {
            this.loading = true
            axios
                .get("/provider/purchase/orders")
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.ordenescompra = response.data.data;
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
        ventas(item) {
            this.editedIndex = this.categories.indexOf(item)
            this.editado = Object.assign({}, item)
            this.createsale(item.clor_pk)
        },

        createsale(id) {
            this.loadingDialog = true
            axios.post('/clientsales?clor_pk=' + id + '')
                .then(response => {
                    setTimeout(() => (this.loadingDialog = false), 1000)
                    if (response.data.data != null) {
                        this.sales = response.data;
                        console.log(response.data);
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.normal('Notificación', "Error al cargar los datos", "error");

                })
        },

        borrar(item) {

            this.editado = Object.assign({}, item)
            this.dialogQuestionDelete = true
        },

        guardaBorrar() {
            this.delete()
            this.dialogQuestionDelete = false
        },

        delete: function () {
            axios.post('/provider/purchase/orders/destroy', this.editado).then(response => {
                console.log(response);
                if (response.data.status.code == 200) {

                    this.textMsg = "¡Eliminado correctamente!";
                    this.normal('Notificación', this.textMsg, "success");
                    this.getCategories();
                } else {
                    this.normal('Notificación', "Ocurrio un error al eliminar el producto", "error");
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
};
</script>
