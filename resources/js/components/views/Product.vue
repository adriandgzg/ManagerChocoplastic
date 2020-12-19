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

        <v-dialog v-model="dialogQuestionDeleteVar" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Alerta</v-card-title>
                <v-card-text>¿Está seguro de borrar el registro?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogQuestionDeleteVar = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" text @click="guardaBorrarVar">Continuar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogSuccess" width="640" overlay-color="white" persistent>
            <v-card color="primary">
                <v-alert color="success" border="left" colored-border icon="mdi-checkbox-marked-circle" prominent>
                    {{textMsg}}
                </v-alert>
            </v-card>
        </v-dialog>

        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-form v-model="validProvider">
                    <v-card-text>
                        <v-text-field v-model="editado.prod_name" label="Nombre" maxlength="300" :rules="nameRules" required></v-text-field>
                        <v-textarea v-model="editado.prod_description" label="Descripción" maxlength="5000" :rules="nameRules" required></v-textarea>
                        <v-text-field v-model="editado.prod_identifier" label="Identificador" maxlength="300" :rules="nameRules" required></v-text-field>
                        <v-select :items="categories" v-model="selectCat" label="Selecione una categoría" single-line item-text="prca_name" item-value="prca_pk" persistent-hint></v-select>
                        <v-select :items="measurements" v-model="selectMeasIn" label="Selecione una Unidad Entrada" single-line item-text="meas_name" item-value="meas_pk" persistent-hint></v-select>
                        <v-select :items="measurements" v-model="selectMeasOut" label="Selecione una Unidad Salida" single-line item-text="meas_name" item-value="meas_pk" persistent-hint></v-select>
                        <v-text-field v-model="editado.prod_actualprice" label="Precio Actual" prefix="$" type="number" :rules="numberRules" required></v-text-field>
                        <v-text-field v-model="editado.prod_eventualprice" label="Precio Eventual" prefix="$" type="number" :rules="numberRules" required></v-text-field>
                        <v-text-field v-model="editado.prod_preferentialprice" label="Precio Preferencial" prefix="$" type="number" :rules="numberRules" required></v-text-field>
                        <v-text-field v-model="editado.prod_saleprice" label="Precio Menudeo" prefix="$" type="number" :rules="numberRules" required></v-text-field>
                        <v-text-field v-model="editado.prod_listprice" label="Precio Mayoreo" prefix="$" type="number" :rules="numberRules" required></v-text-field>
                        <v-text-field v-model="editado.prod_minimumpurchase" label="Compra Mínima" type="number" :rules="numberRules" required></v-text-field>
                        <v-text-field v-model="editado.prod_packingquantity" label="Cantidad por paquete" type="number" :rules="numberRules" required></v-text-field>
                        <!--<v-text-field v-model="editado.prod_packingquantity" label="Stock" type="number" :rules="numberRules"></v-text-field>-->
                        <v-row>
                            <v-col cols="6">
                                <span>Venta a Granel</span>
                                <v-switch v-model="estadoGranel" />
                            </v-col>
                            <v-col cols="6">
                                <span>Activo/Inactivo</span>
                                <v-switch v-model="estado" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <span>IVA</span>
                                <v-switch v-model="estadoIVA" />
                            </v-col>
                            <v-col cols="6">
                                <span>IEPS</span>
                                <v-switch v-model="estadoIEPS" />
                            </v-col>
                        </v-row>

                        <v-card-text>

                            <v-btn raised class="primary" @click="onPickFileProduct">Subir imagen</v-btn>
                            <input type="file" style="display: none" ref="fileInput" accept="image/jpeg" @change="onFilePickedProduct" required :rules="rulesImage" />
                        </v-card-text>

                        <v-layout>
                            <img :src="this.imageUrl" height="150" />
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                        <v-btn :disabled="!validProvider" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>

        </v-dialog>

        <v-dialog v-model="dialogAddVar" max-width="500px" persistent>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Variaciones</v-toolbar-title>
                </v-toolbar>
                <v-form v-model="validVar">
                    <v-card-text>
                        <span>Unidad de medida</span>
                        <v-select :items="measurements" v-model="selectMeas" label="Selecione una Unidad de Salida" single-line item-text="meas_name" item-value="meas_pk" persistent-hint></v-select>

                        <!--<v-text-field v-model="editadoVar.prod_listprice" label="Precio Mayoreo" prefix="$" type="number" :rules="numberRules" required></v-text-field>-->
                        <v-text-field v-model="editadoVar.prod_saleprice" label="Precio" prefix="$" type="number" :rules="numberRules" required></v-text-field>
                        <v-text-field v-model="editadoVar.prod_fact_convert" label="Factor de conversión" prefix="" type="number" :rules="numberRules" required></v-text-field>
                        <span>Venta a Granel</span>
                        <v-switch v-model="estadoGranelVar" />

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarAddVar">Cancelar</v-btn>
                        <v-btn :disabled="!validVar" color="teal accent-4" class="ma-2 white--text" @click="guardaAddVar">Guardar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogVar" max-width="1024px" persistent>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-items>
                        <v-btn dark text>Variaciones</v-btn>
                    </v-toolbar-items>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialogVar = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-btn class="ma-2" dark color="green" @click="OpenDialogAddVar">Nuevo</v-btn>
                    <v-data-table :headers="headersVar" :items="variations" class="elevation-3">

                        <template v-slot:item.prod_listprice="{ item }">
                            <v-label>${{formatMoney(item.prod_listprice)}}</v-label>
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
                            <v-btn class="mx-2" fab dark small color="cyan" @click="editaVar(item)" title="Editar">
                                <v-icon dark>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn class="mr-2" fab dark small color="error" @click="borrarVar(item)">
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                            <!--

                                <v-btn class="mx-2" fab dark small color="orange" @click="variacion(item)" title="Variaciones">
                                    <v-icon dark>mdi-scale</v-icon>
                                </v-btn>-->
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

        </v-dialog>

        <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="headers" :items="products" :search="search" sort-by="id" class="elevation-3">
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

                        <template v-slot:item.prod_actualprice="{ item }">
                            <v-label>${{formatMoney(item.prod_actualprice)}}</v-label>
                        </template>
                        <template v-slot:item.prod_eventualprice="{ item }">
                            <v-label>${{formatMoney(item.prod_eventualprice)}}</v-label>
                        </template>
                        <template v-slot:item.prod_preferentialprice="{ item }">
                            <v-label>${{formatMoney(item.prod_preferentialprice)}}</v-label>
                        </template>
                        <template v-slot:item.prod_saleprice="{ item }">
                            <v-label>${{formatMoney(item.prod_saleprice)}}</v-label>
                        </template>
                        <template v-slot:item.prod_listprice="{ item }">
                            <v-label>${{formatMoney(item.prod_listprice)}}</v-label>
                        </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip v-if="item.prod_status == 1" color="green" dark> Activo </v-chip>
                            <v-chip v-else color="red" dark>Inactivo</v-chip>
                        </template>
                        <template v-slot:item.bulk="{ item }">
                            <v-chip v-if="item.prod_bulk == 1" color="green" outlined>
                                Granel</v-chip>
                            <v-chip v-else color="red" outlined>NA Granel</v-chip>

                        </template>
                        <template v-slot:item.action="{ item }">
                            <v-menu bottom left>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="grey" dark icon v-bind="attrs" v-on="on">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item>
                                        <v-btn class="mx-2" fab dark small color="cyan" @click="edita(item)" title="Editar producto">
                                            <v-icon dark>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn class="mx-2" fab dark small color="orange" @click="variacion(item)" title="Variaciones">
                                            <v-icon dark>mdi-scale</v-icon>
                                        </v-btn>
                                        <v-btn class="mr-2" fab dark small color="error" @click="borrar(item)">
                                            <v-icon dark>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
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
            headersVar: [{
                    text: 'Unidad de medida',
                    value: 'meas_fk_output_name'
                },
                {
                    text: 'Precio',
                    value: 'prod_saleprice'
                },
                {
                    text: 'Factor de conversión',
                    value: 'prod_fact_convert'
                },
                {
                    text: 'Tipo',
                    value: 'bulk'
                },
                {
                    text: '',
                    value: 'action'
                },
            ],
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
                    text: 'Unidad Entrada',
                    value: 'meas_fk_input_name'
                },
                {
                    text: 'Unidad Salida',
                    value: 'meas_fk_output_name'
                },
                {
                    text: 'Precio Actual',
                    value: 'prod_actualprice'
                },
                {
                    text: 'Precio Eventual',
                    value: 'prod_eventualprice'
                },
                {
                    text: 'Precio Preferencial',
                    value: 'prod_preferentialprice'
                },
                {
                    text: 'Precio Menudeo',
                    value: 'prod_saleprice'
                },
                {
                    text: 'Precio Mayoreo',
                    value: 'prod_listprice'
                },
                {
                    text: 'Compra Mínima',
                    value: 'prod_minimumpurchase'
                },
                {
                    text: 'Cantidad por Paquete',
                    value: 'prod_packingquantity'
                },
                {
                    text: 'Tipo',
                    value: 'bulk'
                },
                {
                    text: 'Estatus',
                    value: 'status'
                },
                {
                    text: '',
                    value: 'action'
                },
            ],
            select: 0,
            selectCat: 0,
            selectMeasIn: 0,
            selectMeas: 0,
            selectMeasOut: 0,
            principal: false,
            estado: true,
            estadoIVA: true,
            estadoIEPS: true,
            estadoGranel: true,
            estadoGranelVar: true,
            imageUrl: '',
            editadoVar: {
                prod_pk: 0,
                meas_fk_output: 0,
                prod_saleprice: 0,
                prod_listprice: 0,
                prod_fact_convert: 0,
                prod_bulk: 0,
            },
            defaultItemVar: {
                prod_pk: 0,
                meas_fk_output: 0,
                prod_saleprice: 0,
                prod_listprice: 0,
                prod_fact_convert: 0,
                prod_bulk: 0,
            },
            editado: {
                prod_pk: 0,
                prca_fk: 0,
                prca_name: '',
                meas_fk_input: 0,
                meas_fk_input_name: '',
                prod_description: '',
                meas_fk_output: 0,
                meas_fk_output_name: '',
                prod_identifier: '',
                prod_name: '',
                prod_actualprice: 0,
                prod_eventualprice: 0,
                prod_preferentialprice: 0,
                prod_saleprice: 0,
                prod_listprice: 0,
                prod_bulk: 0,
                prod_iva: 0,
                prod_ieps: 0,
                prod_packingquantity: 0,
                prod_minimumpurchase: 0,
                prod_status: 0,
                is_mod: false,
                imageUrl: this.imageUrl,
            },
            prod_pk: 0,
            defaultItem: {
                prod_pk: 0,
                prca_fk: 0,
                prca_name: '',
                meas_fk_input: 0,
                meas_fk_input_name: '',
                prod_description: '',
                meas_fk_output: 0,
                meas_fk_output_name: '',
                prod_identifier: '',
                prod_name: '',
                prod_name: '',
                prod_actualprice: 0,
                prod_eventualprice: 0,
                prod_preferentialprice: 0,
                prod_saleprice: 0,
                prod_listprice: 0,
                prod_bulk: 0,
                prod_iva: 0,
                prod_ieps: 0,
                prod_packingquantity: 0,
                prod_minimumpurchase: 0,
                prod_status: 0,
                is_mod: false,
                imageUrl: this.imageUrl,
            },
            editedIndex: -1,
            products: [],
            categories: [],
            measurements: [],
            search: "",
            dialog: false,
            dialogAddVar: false,
            snackbar: false,
            timeout: 2000,
            textMsg: "",
            valid: false,
            validVar: false,
            validProvider: false,
            dialogSuccess: false,
            dialogVar: false,
            variations: [],
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
            dialogQuestionDeleteVar: false,
            messageQuestion: '',
        };
    },
    created() {
        this.getProducts();
        this.getCategories();
        this.getMeasurements();
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

        getProducts() {
            this.loading = true
            axios
                .get("/productList")
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.products = response.data.data;
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.normal('Notificación', "Error al cargar los datos", "error");
                });
        },

        getCategories() {
            axios
                .get("/categories")
                .then(response => {
                    this.categories = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        getMeasurements() {
            axios
                .get("/measurements")
                .then(response => {
                    this.measurements = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        variacion(item) {
            this.editedIndex = this.products.indexOf(item)
            this.editado = Object.assign({}, item)
            this.editadoVar.prod_pk = this.editado.prod_pk
            this.dialogVar = true

            this.loading = true
            axios
                .get("/products/derived/" + item.prod_pk)
                .then(response => {
                    setTimeout(() => (this.loading = false), 500)
                    if (response.data.data != null) {
                        this.variations = response.data.data;
                        console.log('this.variations');
                        console.log(this.variations);
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
        edita(item) {
            this.editedIndex = this.products.indexOf(item)
            this.editado = Object.assign({}, item)
            this.estado = this.editado.prod_status
            this.estadoGranel = this.editado.prod_bulk
            this.estadoIVA = this.editado.prod_iva
            this.estadoIEPS = this.editado.prod_ieps
            this.selectCat = this.editado.prca_fk
            this.selectMeasIn = this.editado.meas_fk_input
            this.selectMeasOut = this.editado.meas_fk_output
            this.imageUrl = this.editado.prod_image
            this.dialog = true
        },
        guardar() {

            if (this.estado == true)
                this.editado.prod_status = 1;
            else
                this.editado.prod_status = 0;

            if (this.estadoGranel == true)
                this.editado.prod_bulk = 1;
            else
                this.editado.prod_bulk = 0;

            if (this.estadoIVA == true)
                this.editado.prod_iva = 1;
            else
                this.editado.prod_iva = 0;

            if (this.estadoIEPS == true)
                this.editado.prod_ieps = 1;
            else
                this.editado.prod_ieps = 0;

            this.editado.prca_fk = this.selectCat;
            this.editado.meas_fk_input = this.selectMeasIn;
            this.editado.meas_fk_output = this.selectMeasOut;
            console.log(this.editado)
            if (this.editedIndex > -1) {
                this.editar()
            } else {
                this.alta()
            }
            //this.cancelar()
        },
        alta: function () {
            axios.post('/product/add', this.editado).then(response => {
                    console.log(response.data)
                    if(response.data.status.code == 501) {
                        this.normal('Detalle de validación', 'El campo identificador ya ha sido registrado.', "error");
                    }
                    else
                    if (response.data.status.code == 200) {
                        this.dialogSuccess = false
                        this.textMsg = response.data.status.message
                        this.normal('Notificación', this.textMsg, "success");
                        this.getProducts();
                        this.cancelar();
                    } else {
                        this.normal('Notificación', response.data.status.technicaldetail.errorInfo[2], "error");
                    }
                })
                .catch(e => {
                    //this.errors.push(e)
                    this.normal('Notificación', 'Ocurrio un error al intentar guardar los cambios. Intente más tarde.', "error");
                })
        },

        editar: function () {
            axios.put('/product/update', this.editado).then(response => {
                    console.log(response)
                    if(response.data.status.code == 501) {
                        this.normal('Detalle de validación', 'El campo identificador ya ha sido registrado.', "error");
                    }
                    else
                    if (response.data.status.code == 200) {
                        this.dialogSuccess = false
                        this.textMsg = '¡Actualización Exitosa!'
                        this.normal('Notificación', this.textMsg, "success");
                        this.getProducts();
                        this.cancelar()
                    } else {

                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    //this.errors.push(e)
                    this.normal('Notificación', 'Ocurrio un error al intentar guardar los cambios. Intente más tarde.', "error");
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
                console.log(response)
                this.textMsg = "¡Eliminado correctamente!";
                this.normal('Notificación', this.textMsg, "success");
                this.getProducts();
            });
        },

        onPickFileProduct() {
            this.$refs.fileInput.click()
        },
        onFilePickedProduct(event) {
            const files = event.target.files
            let filename = files[0].name

            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
                this.editado.imageUrl = fileReader.result
                this.editado.is_mod = true
                console.log(this.editado)
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
        OpenDialogAddVar() {
            //console.log(this.editadoVar)
            this.dialogAddVar = true
            this.selectMeas = -1
        },
        guardaAddVar() {

            this.editadoVar.meas_fk_output = this.selectMeas;

            if (this.estadoGranelVar == true)
                this.editadoVar.prod_bulk = 1;
            else
                this.editadoVar.prod_bulk = 0;

            if (this.editedIndexVar > -1) {

                this.editarAddVar()
            } else {
                this.guardarAddVar()
            }

            this.cancelarAddVar()

        },
        guardarAddVar: function () {
            //this.editadoVar.meas_fk_output = this.selectMeas
            this.editadoVar.prod_pk = this.editado.prod_pk
            console.log(this.editadoVar)
            axios.post('products/derived', this.editadoVar).then(response => {
                    console.log(response.data)
                    if (response.data.status.code == 200) {
                        this.dialogSuccess = false
                        this.textMsg = response.data.status.message
                        this.normal('Notificación', this.textMsg, "success");
                        console.log(this.editado)
                        this.getvariacion(this.editado.prod_pk)
                    } else {
                        this.normal('Notificación', response.data.status.technicaldetail.errorInfo[2], "error");
                    }
                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                })
        },

        editaVar(item) {
            this.editedIndexVar = this.variations.indexOf(item)
            //this.editadoVar = Object.assign({}, item)
            this.editadoVar.prod_pk = item.prod_pk
            this.editadoVar.meas_fk_output = item.meas_fk_output
            this.editadoVar.prod_saleprice = item.prod_saleprice
            this.editadoVar.prod_listprice = item.prod_listprice
            this.editadoVar.prod_fact_convert = item.prod_fact_convert

            this.estadoGranelVar = item.prod_bulk

            this.selectMeas = item.meas_fk_output

            this.dialogAddVar = true
        },
        editarAddVar() {
            console.log("editar")
            console.log(this.editadoVar)
            axios.post('/products/derived/update', this.editadoVar).then(response => {
                    console.log(response)
                    if (response.data.status.code == 200) {
                        this.dialogSuccess = false
                        this.textMsg = '¡Actualización Exitosa!'
                        this.normal('Notificación', this.textMsg, "success");
                        this.getvariacion(this.editado.prod_pk)
                    } else {

                        this.normal('Notificación', response.data.message, "error");
                    }
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        cancelarAddVar() {
            this.dialogAddVar = false
            this.editadoVar = Object.assign({}, this.defaultItemVar)
            this.editedIndexVar = -1
        },
        getvariacion(id) {

            this.loading = true
            axios
                .get("/products/derived/" + id)
                .then(response => {
                    this.loading = false
                    console.log('response')
                    console.log(response)
                    if (response.data.data != null) {
                        this.variations = response.data.data;
                    } else {
                        this.normal('Notificación', response.data.status.message, "error");
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.normal('Notificación', "Error al cargar los datos", "error");
                });

        },

        borrarVar(item) {
            const index = this.variations.indexOf(item)
            this.editadoVar = Object.assign({}, item)
            this.dialogQuestionDeleteVar = true
        },

        guardaBorrarVar() {
            this.deleteVar()
            this.dialogQuestionDeleteVar = false
        },

        deleteVar: function () {
            axios.post('/products/derived/destroy', this.editadoVar).then(response => {
                console.log(response)
                this.textMsg = "¡Eliminado correctamente!";
                this.normal('Notificación', this.textMsg, "success");
                this.getvariacion(this.editado.prod_pk)
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
    watch: {
        dialogSuccess(val) {
            if (!val) return

            setTimeout(() => (this.dialogSuccess = false), 4000)
        },
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
        },
    },
};
</script>
