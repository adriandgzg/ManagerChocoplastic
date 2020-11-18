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
                        </template>

                        <!--<template v-slot:item.action="{ item }">   
                        <v-btn class="mr-2" fab dark small color="indigo" v-if="item.clsa_status != 'Pendiente'" 
                               :href="'/clientsreturn/'+item.clor_pk" title="Devolución">
                            <v-icon dark>mdi-archive-arrow-up</v-icon>
                        </v-btn>  
                    </template>-->
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
                },
                {
                    text: 'Pedido',
                    value: 'stock_order'
                },
                {
                    text: 'Stock App',
                    value: 'stock_app'
                }

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
                .get("/product/inventories")
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.sales = response.data.data;
                        //console.log(this.sales)
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log(e);
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
        },
    }
}
</script>
