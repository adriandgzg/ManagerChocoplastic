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
        <v-snackbar color="#000000" v-model="snackbar" :timeout="timeout">
            {{ textMsg }}
            <v-btn color="blue" text @click="snackbar = false">
                Cerrar
            </v-btn>
        </v-snackbar>

        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-form v-model="validProvider">
                    <v-card-text>
                        <v-select v-model="store" :items="stores" item-text="stor_name" item-value="stor_pk" filled chips label="Sucursal" placeholder="Selecciona sucursal"></v-select>

                        <v-combobox v-model="product" :items="products" item-text="prod_name" item-value="prod_pk" filled chips label="Producto" placeholder="Selecciona producto"></v-combobox>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                        <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>

        </v-dialog>

        <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="headers" :items="frequents" :search="search" sort-by="id" class="elevation-3">
                        <template v-slot:top>
                            <v-system-bar color="indigo darken-2" dark></v-system-bar>
                            <v-toolbar flat color="indigo">
                                <template v-slot:extension>
                                    <v-btn fab color="cyan accent-2" bottom left absolute @click="dialog = !dialog">
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
                        <template v-slot:item.bulk="{ item }">
                            <v-chip v-if="item.prod_bulk == 1" color="green" outlined>
                                Granel</v-chip>
                            <v-chip v-else color="red" outlined>NA Granel</v-chip>
                        </template>

                        <template v-slot:item.action="{ item }">

                            <v-btn class="mr-2" fab dark small color="error" @click="borrar(item)">
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
            headers: [{
                    text: 'Ident',
                    value: 'prod_identifier'
                },
                {
                    text: 'Nombre',
                    value: 'prod_name'
                },
                {
                    text: 'Categoria',
                    value: 'prca_name'
                },
                {
                    text: 'Precio Menudeo',
                    value: 'prod_saleprice'
                },
                {
                    text: 'Sucursal',
                    value: 'stor_name'
                },
                {
                    text: 'Tipo',
                    value: 'bulk'
                },
                {
                    text: '',
                    value: 'action',
                    width: '10%'
                },
            ],
            select: 0,
            selectCat: 0,
            selectMeasIn: 0,
            selectMeasOut: 0,
            principal: false,
            estado: true,
            estadoGranel: true,
            imageUrl: '',
            editado: {
                prod_fk: 0,
                stor_fk: 0,
                prfr_pk: 0,
            },
            defaultItem: {
                prod_fk: 0,
                stor_fk: 0,
                prfr_pk: 0,
            },
            editedIndex: -1,
            categories: [],
            measurements: [],
            stores: [],
            store: '',
            frequents: [],
            products: [],
            product: '',
            search: "",
            dialog: false,
            snackbar: false,
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
            numberRules: [
                value => !!value || 'Requerido.',
                value => value > 0 || 'El número debe ser mayor a cero',
            ],
            rulesImage: [
                value => !!value || 'Archivo requerido',
                value => !value || value.size < 2000000 || 'La imagen tiene que ser menor a 2 MB!',
            ],
            loading: false,
            dialogQuestion: false,
            dialogQuestionDelete: false,
            messageQuestion: '',
        };
    },
    created() {
        this.getFrequents();
        this.getStores();
        this.getProducts();
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

        getFrequents() {
            axios
                .get("/product/frequents")
                .then(response => {
                    console.log(response.data)
                    this.frequents = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        getStores() {
            axios.get('/storeget')
                .then(response => {
                    this.stores = response.data.data
                })
                .catch(e => {
                    console.log(e);
                })
        },
        getProducts() {
            this.loading = true
            axios
                .get("/productList")
                .then(response => {
                    setTimeout(() => (this.loading = false), 2000)
                    if (response.data.data != null) {
                        this.products = response.data.data;
                    } else {
                        this.normal('Notificación', 'Ocurrio un error al cargar los datos.', "error");
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },

        cancelar() {
            this.dialog = false
            this.editado = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            this.store = ''
            this.product = ''

        },

        guardar() {
            console.log(this.product)
            console.log(this.store)
            this.editado.prod_fk = this.product.prod_pk;
            this.editado.stor_fk = this.store;
            axios.post('/product/frequents', this.editado).then(response => {
                    console.log(response.data)
                    if (response.data.status.code == 200) {
                        this.snackbar = true
                        this.textMsg = response.data.status.message
                        this.cancelar()

                        this.getFrequents();
                    } else {
                        this.normal('Notificación', 'Ocurrio un error al guardar. Contacte a su administrador.', "error");
                    }
                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                })
        },

        borrar(item) {
            const index = this.products.indexOf(item)
            this.editado = Object.assign({}, item)
            this.dialogQuestionDelete = true
        },

        guardaBorrar() {
            this.delete()
            this.dialogQuestionDelete = false
        },

        delete: function () {
            axios.put('/product/delete', this.editado).then(response => {

                this.textMsg = "¡Eliminado correctamente!";
                this.normal('Notificación', this.textMsg, "success");
                this.getFrequents();
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
