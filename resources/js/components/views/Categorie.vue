<template>
    <v-container>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="categories" :search="search" sort-by="id" class="elevation-3"
                >
                    <template v-slot:top>
                        <v-system-bar color="indigo darken-2" dark></v-system-bar>
                        <v-toolbar flat color="indigo">
                            <template v-slot:extension>
                                <v-btn
                                        fab
                                        color="cyan accent-2"
                                        bottom
                                        left
                                        absolute
                                        @click="dialog = !dialog"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <v-toolbar-title class="white--text">Categorías</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                            <!--  Modal del diálogo para Alta y Edicion    -->
                            <v-dialog v-model="dialogSub" max-width="800px">
                                <template v-slot:activator="{ on }"></template>

                                <v-card>
                                    <!-- para el EDICION-->
                                    <v-card-title class="cyan white--text">
                                        <span class="headline">{{ formTitleSub }}</span>
                                    </v-card-title>
                                    <v-card-text style="height: 40px; position: relative">
                                        <v-btn
                                                absolute
                                                dark
                                                fab
                                                top
                                                right
                                                color="green"
                                                @click="dialogAddSub = !dialogAddSub"
                                        >
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-card-text>
                                    <v-card-text>
                                        <v-container>
                                            <v-data-table :headers="headers" :items="subcategories" :search="search"
                                                          sort-by="id" class="elevation-3">
                                                <template v-slot:item.action="{ item }">
                                                    <v-btn class="mr-2" fab dark small color="cyan"
                                                           @click="editarAddSub(item)">
                                                        <v-icon dark>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <v-btn class="mr-2" fab dark small color="error"
                                                           @click="borrarSub(item)">
                                                        <v-icon dark>mdi-delete</v-icon>
                                                    </v-btn>
                                                </template>
                                            </v-data-table>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <!--  Modal del diálogo para Alta y Edicion    -->
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }"></template>
                                <v-card>
                                    <!-- para el EDICION-->
                                    <v-card-title class="cyan white--text">
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>

                                            <v-text-field v-model="editado.name" label="Nombre"></v-text-field>

                                            <v-text-field v-model="editado.description"
                                                          label="Descripción"></v-text-field>

                                            <!--<v-combobox v-model="editado.select" :items="categoriesNode" label="(Seleccione una opción)" item-text="name" outlined dense></v-combobox>
                                        -->
                                            <v-card-text>
                                                <v-btn raised class="primary" @click="onPickFile">Subir imagen</v-btn>
                                                <input type="file" style="display: none" ref="fileInput"
                                                       accept="image/jpeg" @change="onFilePicked"/>
                                            </v-card-text>

                                            <v-layout>
                                                <img :src="imageUrl" height="150"/>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar
                                        </v-btn>
                                        <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <!--  Modal del diálogo para Alta y Edicion    -->
                            <v-dialog v-model="dialogAddSub" max-width="500px">
                                <template v-slot:activator="{ on }"></template>
                                <v-card>
                                    <!-- para el EDICION-->
                                    <v-card-title class="cyan white--text">
                                        <span class="headline">{{ formTitleAddSub }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>

                                            <v-text-field v-model="editadoSub.name" label="Nombre"></v-text-field>

                                            <v-text-field v-model="editadoSub.description"
                                                          label="Descripción"></v-text-field>

                                            <v-card-text>
                                                <v-btn raised class="primary" @click="onPickFile">Subir imagen</v-btn>
                                                <input type="file" style="display: none" ref="fileInput"
                                                       accept="image/jpeg" @change="onFilePicked"/>
                                            </v-card-text>

                                            <v-layout>
                                                <img :src="imageUrl" height="150"/>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarSub">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardarSub">
                                            Guardar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                        <!-- Barra de búsqueda  -->
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-col>
                    </template>
                    <template v-slot:item.image="{ item }">
                        <div class="p-2">
                            <v-img :src="item.image" :alt="item.name" aspect-ratio="1"></v-img>
                        </div>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn class="mr-2" fab dark small color="cyan" @click="editarSub(item)">
                            <v-icon dark>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn class="mr-2" fab dark small color="cyan" @click="editar(item)">
                            <v-icon dark>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mr-2" fab dark small color="error" @click="borrar(item)">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                headers: [

                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Nombre',
                        value: 'name',
                        width: '20%'
                    }, {
                        text: 'Descripción',
                        value: 'description',
                        width: '35%'
                    },
                    {
                        text: "Image", value: "image", sortable: false,
                        width: '15%'
                    }
                    , {
                        text: '',
                        value: 'action',
                        width: '20%'
                    },
                ],
                categories: [],
                subcategories: [],
                categoriesNode: [],
                errors: [],
                editingText: '',
                file: '',
                editingMode: false,
                action: null,
                selectedModel: null,
                selectedRole: null,
                selectedUser: null,
                assignRole: false,
                chosenFile: null,
                select: [],
                search: '', //para el cuadro de búsqueda de datatables
                snackbar: false, //para el mensaje del snackbar
                textSnack: 'texto snackbar', //texto que se ve en el snackbar
                dialog: false, //para que la ventana de dialogo o modal no aparezca automáticamente
                dialogSub: false,
                dialogAddSub: false,
                editedIndex: -1,
                editedSubIndex: -1,
                editedAddSubIndex: -1,
                imageUrl: '',
                image: '',
                editado: {
                    id: '',
                    name: '',
                    description: '',
                    imageUrl: this.imageUrl,
                    file: '',
                    select: '',
                },
                editadoSub: {
                    id: '',
                    name: '',
                    description: '',
                    category_id: '',
                    imageUrl: this.imageUrl,
                    file: '',
                    select: '',
                },
                defaultItem: {
                    id: '',
                    name: '',
                    description: '',
                    file: '',
                    imageUrl: '',
                },
            }
        },
        created() {
            this.getCategories();
            this.getCategoriesNode();
            /* this.getcategories();
             this.getRoles();
             this.getPermissions();*/
        },
        methods: {

            getCategories() {
                axios.get('/categoriesList')
                    .then(response => {
                        this.categories = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            getSubcategories() {
                axios.get('/subcategoriesList?id=' + this.editado.id)
                    .then(response => {
                        this.subcategories = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            getCategoriesNode() {
                axios.get('/categoriesNode')
                    .then(response => {
                        this.categoriesNode = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            cancelar() {
                this.dialog = false
                this.editado = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            },
            cancelarSub() {
                this.dialogAddSub = false
                this.editadoSub = Object.assign({}, this.defaultItem)
                this.editedAddSubIndex = -1
            },
            editar(item) {
                this.editedIndex = this.categories.indexOf(item)
                this.editado = Object.assign({}, item)
                this.dialog = true
            },
            editarSub(item) {
                this.editedSubIndex = this.subcategories.indexOf(item)
                this.editado = Object.assign({}, item)
                this.dialogSub = true
                this.getSubcategories()

            },
            editarAddSub(item) {
                console.log(item)
                this.editedAddSubIndex = this.subcategories.indexOf(item)
                this.editadoSub = Object.assign({}, item)
                this.dialogAddSub = true
            },
            borrar(item) {
                const index = this.categories.indexOf(item)
                this.editado = Object.assign({}, item)
                console.log(this.categories[index].id) //capturo el id de la fila seleccionada
                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteCat()
                    this.snackbar = true
                    this.textSnack = 'Se eliminó el registro.'
                } else {
                    this.snackbar = true
                    this.textSnack = 'Operación cancelada.'
                }
            },
            borrarSub(item) {
                const index = this.subcategories.indexOf(item)
                this.editadoSub = Object.assign({}, item)
                console.log(this.subcategories[index].id) //capturo el id de la fila seleccionada
                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteSubCat()
                    this.snackbar = true
                    this.textSnack = 'Se eliminó el registro.'
                } else {
                    this.snackbar = true
                    this.textSnack = 'Operación cancelada.'
                }
            },
            
            guardar() {
                if (this.editedIndex > -1) {
                    //Guarda en caso de Edición
                    this.textSnack = '¡Actualización Exitosa!'
                    this.editarCat()
                } else {
                    //Guarda el registro en caso de Alta
                    if (this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0) {
                        this.snackbar = true
                        this.textSnack = 'Datos incompletos.'
                    } else {
                        this.textSnack = '¡Alta exitosa!'

                        this.imageUrl='';
                        this.altaMovil()
                    }
                }
                this.cancelar()
            },
            guardarSub() {
                console.log(this.editedAddSubIndex)
                if (this.editedAddSubIndex > -1) {
                    //Guarda en caso de Edición

                    this.textSnack = '¡Actualización Exitosa!'

                    this.imageUrl='';
                    this.editarSubCat()
                } else {

                    this.altaSubCat();
                }
                this.cancelarSub()
            },
            //Procedimiento Alta de moviles.
            altaMovil: function () {
                axios.post('/categories/add', this.editado).then(response => {
                    this.getCategories();
                });
                this.name = "",
                    this.description = ""
            },
            altaSubCat: function () {
                console.log(this.editado.id)
                this.editadoSub.category_id = this.editado.id
                axios.post('/categories/addSub', this.editadoSub).then(response => {
                    this.getSubcategories();

                    this.imageUrl='';
                });
                this.name = "",
                    this.description = ""
            },
            editarCat: function () {
                axios.put('/categories/update', this.editado).then(response => {
                    this.getCategories();
                    this.imageUrl='';
                });
                this.name = "",
                    this.description = ""
            },
            editarSubCat: function () {
                console.log(this.editado.id)
                this.editadoSub.category_id = this.editado.id
                axios.put('/categories/updateSub', this.editadoSub).then(response => {
                    this.getSubcategories();
                    this.imageUrl='';
                });
                this.name = "",
                    this.description = ""
            },
            deleteCat: function () {
                axios.put('/categories/delete', this.editado).then(response => {
                    this.getCategories();
                });
                this.name = "",
                    this.description = ""
            },
            deleteSubCat: function () {
                console.log(this.editadoSub)
                axios.put('/categories/deleteSub', this.editadoSub).then(response => {
                    this.getSubcategories();
                });
                this.name = "",
                    this.description = ""
            },
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
                this.editado.file = this.$refs.file.files[0];
                console.log(this.editado.file);
            },
            onPickFile() {
                this.$refs.fileInput.click()
            },
            onFilePicked(event) {
                const files = event.target.files
                let filename = files[0].name
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                    this.editado.imageUrl = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            }
        },
        computed: {
            // ...mapGetters('auth', ['can'])
            //Dependiendo si es Alta o Edición cambia el título del modal
            formTitle() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
            },
            formTitleSub() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedSubIndex === -1 ? 'Nuevo Registro' : 'Subcategorías'
            },
            formTitleAddSub() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedSubIndex === -1 ? 'Nuevo Registro' : 'Subcategorías'
            },
        },
    }
</script>
