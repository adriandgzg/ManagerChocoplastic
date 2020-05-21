<template>

    <v-container>
    <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
        >
            {{ textMsg }}
            <v-btn
                    color="blue"
                    text
                    @click="snackbar = false"
            >
                Cerrar
            </v-btn>
        </v-snackbar>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="stores" :search="search" sort-by="id" class="elevation-3">
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
                                        v-if="user.store_id == null"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <v-toolbar-title class="white--text">Tienda</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-col>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn class="mr-2" fab dark small color="green" @click="agregarNegocio(item)">
                            <v-icon dark>mdi-store</v-icon>
                        </v-btn>
                        <v-btn v-if="user.store_id == null" class="mr-2" fab dark small color="cyan" @click="editar(item)">
                            <v-icon dark>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn v-if="user.store_id == null" class="mr-2" fab dark small color="error" @click="borrar(item)">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn v-if="user.store_id == null" class="mr-2" fab dark small color="blue" @click="agregaTime(item)">
                            <v-icon dark>mdi-calendar-clock</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>

        </v-row>
    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialog" max-width="1024px">
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="editado.name" label="Nombre"
                                          required :rules="nameRules"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="editado.address" label="Dirección"
                                          required :rules="nameRules"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="editado.phone_number" label="Teléfono" :counter="10" 
                                            required :rules="phoneRules"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-dialog ref="dialog1" v-model="dialogOpeningTime"
                                      :return-value.sync="editado.opening_time" persistent
                                      width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editado.opening_time"
                                                  label="Horario de apertura"
                                                  append-icon="access_time" readonly
                                                   required :rules="timeRules"
                                                  v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-if="dialogOpeningTime"
                                               v-model="editado.opening_time" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="dialogOpeningTime = false">
                                        Cancelar
                                    </v-btn>
                                    <v-btn text color="primary"
                                           @click="$refs.dialog1.save(editado.opening_time)">Aceptar
                                    </v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="6">
                            <v-dialog ref="dialog2" v-model="dialogClosingTime"
                                      :return-value.sync="editado.closing_time" persistent
                                      width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="editado.closing_time"
                                                  label="Horario de cierre"
                                                  append-icon="access_time" readonly
                                                  required :rules="timeRules"
                                                  v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-if="dialogClosingTime"
                                               v-model="editado.closing_time" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="dialogClosingTime = false">
                                        Cancelar
                                    </v-btn>
                                    <v-btn text color="primary"
                                           @click="$refs.dialog2.save(editado.closing_time)">Aceptar
                                    </v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="editado.minimum_purchase" label="Mínimo Compra"
                                          required  :rules="minNumberRules"></v-text-field>
                        </v-col>
                        
                        <v-col cols="6">
                            <v-text-field v-model="editado.delivery_price" label="Costo de Envío (Por Km)"
                                          required :rules="minNumberRules" prefix="$" type="number"></v-text-field>
                            
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="editado.latitude" label="Latitud"
                                          required :rules="coordRules"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="editado.longitude" label="Longitud"

                                          required :rules="coordRules"></v-text-field>
                        </v-col>
                    </v-row>
                        <!--<v-combobox v-model="editado.select" :items="businessNode" label="(Seleccione una opción)" item-text="name" outlined dense required></v-combobox>-->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">
                        Cancelar
                    </v-btn>
                    <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardar">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>

    </v-dialog>
    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialogNeg" max-width="1024px">
        <template v-slot:activator="{ on }"></template>

        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">{{ formTitleNeg }}</span>
            </v-card-title>
            <v-card-text style="height: 40px; position: relative">
                <v-btn
                        absolute
                        dark
                        fab
                        top
                        right
                        color="green"
                        v-if="user.store_id == null"
                        @click="dialogForm = !dialogForm"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-text>
            <v-card-text>
                <v-container>
                    <v-data-table :headers="headersNeg" :items="business" :search="search"
                                  sort-by="id" class="elevation-3">
                        <template v-slot:item.action="{ item }">
                            <v-btn class="mr-2" fab dark small color="cyan"
                                   @click="editarNeg(item)">
                                <v-icon dark>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn class="mr-2" fab dark small color="error"
                                   @click="borrarNeg(item)">
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>

                            <v-btn class="mr-2" fab dark small color="cyan"
                                   :href="'/missions/'+item.id+'/'+item.store_id">
                                <v-icon dark>mdi-send-outline</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!--FIN-->

     <!-- Modal del diálogo para Alta y Edicion de horas -->
    <v-dialog v-model="dialogTime" max-width="640px">
        <template v-slot:activator="{ on }"></template>

        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Horarios disponibles</span>
            </v-card-title>
            <v-card-text style="height: 40px; position: relative">
                <v-btn
                        absolute
                        dark
                        fab
                        top
                        right
                        color="green"
                        @click="dialogTimeAdd = !dialogTimeAdd"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-text>
            <v-card-text>
                <v-container>
                    <v-data-table :headers="headersTime" :items="pickupTimes" 
                                  sort-by="id" class="elevation-3">
                        <template v-slot:item.action="{ item }">
                            <v-btn class="mr-2" fab dark small color="cyan"
                                   @click="editaTime(item)">
                                <v-icon dark>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn class="mr-2" fab dark small color="error"
                                   @click="borrarTime(item)">
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!--FIN-->

    <!-- Modal del diálogo para Alta y Edicion de horas -->
    <v-dialog v-model="dialogTimeAdd" max-width="640px">
        <template v-slot:activator="{ on }"></template>

        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Agregar horario</span>
            </v-card-title>
            
            <v-card-text>
                    <v-container>
                        <v-text-field v-model="editadoTime.time" label="Nombre"
                                      required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarAddTime">
                        Cancelar
                    </v-btn>
                    <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardarTime">
                        Guardar
                    </v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
    <!--FIN-->

    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialogForm" max-width="1024px">

        <v-form ref="form">
            <template v-slot:activator="{ on }"></template>
            <v-card>
                <v-card-title class="cyan white--text">
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>

                        <v-text-field v-model="editadoNeg.name" label="Nombre"
                                      required></v-text-field>

                        <v-text-field v-model="editadoNeg.description" label="Descripción"
                                      required></v-text-field>

                        <v-text-field v-model="editadoNeg.proportion" label="Proporción"
                                      type="number" required></v-text-field>
                        <v-text-field v-model="editadoNeg.row" label="Fila" type="number"
                                      required></v-text-field>


                        <v-card-text>
                            <v-btn raised class="primary" @click="onPickFile">Subir imagen
                            </v-btn>
                            <input type="file" style="display: none" ref="fileInput"
                                   accept="image/jpeg" @change="onFilePicked"/>
                        </v-card-text>
                        <v-layout>
                            <img :src="editadoNeg.imageUrl" height="150"/>
                        </v-layout>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarNeg">
                        Cancelar
                    </v-btn>
                    <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardarNeg">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
    </v-container>
</template>
<script>
    import {mapGetters} from "vuex";
    export default {
        data() {
            return {
                money:
                    {
                        decimal: ',',
                        thousands: '.',
                        prefix: '',
                        suffix: '',
                        precision: 2,
                        masked: false /* doesn't work with directive */
                    },
                    headersTime: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Horario',
                        value: 'time',
                        width: '60%'
                    },
                    {
                        text: '',
                        value: 'action',
                        width: '30%'
                    },
                    ],
                headers: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Nombre',
                        value: 'name'
                    }, {
                        text: 'Dirección',
                        value: 'address'
                    }, {
                        text: 'Teléfono',
                        value: 'phone_number'
                    }, {
                        text: 'Hora Apertura',
                        value: 'opening_time'
                    }, {
                        text: 'Hora Cierre',
                        value: 'closing_time'
                    }, {
                        text: 'Mínimo Compra',
                        value: 'minimum_purchase'
                    }, {
                        text: 'Costo envío',
                        value: 'delivery_price'
                    }/*,{
          text: 'Latitud',
          value: 'latitude'
        },{
          text: 'Longitud',
          value: 'longitude'
        }*/, {
                        text: '',
                        value: 'action'
                    },
                ],
                headersNeg: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Nombre',
                        value: 'name'
                    }, {
                        text: 'Descripción',
                        value: 'description'
                    },
                    , {
                        text: '',
                        value: 'action'
                    },
                ],
                nameRules: [
                    value => !!value || 'Requerido.',
                    value => (value && value.length >= 3) || 'Min 3 caracteres',
                ],
                phoneRules: [
                    value => !!value || 'Requerido.',
                    value => (value && value.length == 10 ) || 'Requiere 10 caracteres',
                ],
                unidadRules: [
                    value => !!value || 'Requerido.',
                    value => (value && value.length >= 1) || 'Min 1 caracter',
                ],
                numberRules: [
                    value => !!value || 'Requerido.',
                    value => value > 0 || 'El número debe ser mayor a cero',
                ],                
                minNumberRules: [
                    value => !!value || 'Requerido.',
                    value => value > 0 || 'El número debe ser mayor o igual a cero',
                ],
                timeRules: [
                    value => !!value || 'Requerido.',
                    value => (value && value.length >= 1) || 'El campo no puede ser vacio',
                ],
                coordRules: [
                            v => !!v || 'Coordenada inválida',
                            v => (v <= Number.MAX_SAFE_INTEGER) || 'Coordenada inválida',
                            v => (v >= Number.MIN_SAFE_INTEGER) || 'Coordenada inválida'
                        ],
                        textMsg: '',
                timeout: 2000,
                stores: [],
                pickupTimes:[],
                businessNode: [],
                business: [],
                phoneNumber: null,
                results: null,
                aux_trans: "0,00",
            min_salary: "0,00",
            vSal_Base: 0,
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
                dialogNeg: false, //para que la ventana de dialogo o modal no aparezca automáticamente
                dialogTime: false,
                dialogTimeAdd: false,
                dialogForm: false,
                editedIndex: -1,
                editedIndexTime: -1,
                editedIndexNeg: -1,
                imageUrl: '',
                image: '',
                editadoTime: {
                    id: '',
                    time: '',
                    idStore: '',
                },
                defaultEditadoTime: {
                    id: '',
                    time: '',
                    idStore: '',
                },
                editado: {
                    id: '',
                    name: '',
                    address: '',
                    phone_number: '',
                    opening_time: '',
                    closing_time: '',
                    minimum_purchase: 0,
                    delivery_price: 0,
                    latitude: 0,
                    longitude: 0,
                    select: '',
                    business_id:0
                },
                editadoNeg: {
                    id: '',
                    name: '',
                    description: '',
                    imageUrl: '',
                    file: '',
                    select: '',
                    store_id: '',
                    proportion: 0,
                    row: 0,
                    is_mod: false,
                },
                defaultItem: {
                    id: '',
                    name: '',
                    address: '',
                    phone_number: '',
                    opening_time: '',
                    closing_time: '',
                    minimum_purchase: '',
                    delivery_price: '',
                    latitude: '',
                    longitude: '',
                },
                dialogTime: false,
                dialogOpeningTime: false,
                dialogClosingTime: false,
                user:[],
            }
        },
        created() {
            
            this.getUser();
            
           //this.getstores();
        },
        methods: {
            getUser() {
                axios.get('/listUser')
                    .then(response => {    
                                            
                        this.user = response.data.data                        

                        this.getstores(this.user.store_id)
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getstores(idStore) {
                if(!idStore) { idStore = 0; } 
                console.log('/storeList/'+ idStore)
                axios.get('/storeList/'+ idStore)
                    .then(response => {
                        this.stores = response.data.data
                        console.log(this.stores)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },

            getbusinessNode() {
                console.log("this.editado")
                var idStore = this.user.store_id;
                if(!idStore) { idStore = 0; } 
                this.editado.business_id = idStore;
                axios.post('/businessNode', this.editado)
                    .then(response => {
                        this.business = response.data.data
                        console.log(this.business)
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
            editar(item) {
                this.editedIndex = this.stores.indexOf(item)
                this.editado = Object.assign({}, item)
                this.dialog = true
            },
            editarNeg(item) {
                this.editedIndexNeg = this.business.indexOf(item)
                this.editadoNeg = Object.assign({}, item)
                this.dialogForm = true
                this.is_mod = false
            },
            agregarNegocio(item) {
                this.editedIndexNeg = -1
                this.editado = Object.assign({}, item)
                console.log(this.editado)
                this.dialogNeg = true
                this.getbusinessNode()
            },
            agregaTime(item) {
                this.editado = Object.assign({}, item)
                console.log(this.editado)
                this.dialogTime = true
                this.getPickupTime(this.editado.id)
            },
            editaTime(item) {
                this.editedIndexTime = this.pickupTimes.indexOf(item)
                this.editadoTime = Object.assign({}, item)
                this.dialogTimeAdd = true
            },
            cancelarAddTime() {
                this.dialogTimeAdd = false
                this.editadoTime = Object.assign({}, this.defaultEditadoTime)
                this.editedIndexTime = -1
            },

            guardarTime() {
                if (this.editedIndexTime > -1) {
                    //Guarda en caso de Edición
                   this.snackbar = true
                    this.textMsg = '¡Actualización Exitosa!'

                    this.editarTime()
                } 
                else {                   
                        this.snackbar = true
                        this.textMsg = '¡Alta exitosa!'
                        this.agregarTime()
                    
                }
                this.cancelarAddTime()
            },

            getPickupTime(idStore) {
                if(!idStore) { idStore = 0; } 
                console.log('/listPickupTimes/'+ idStore)
                axios.get('/listPickupTimes/'+ idStore)
                    .then(response => {
                        this.pickupTimes = response.data.data                        
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },


            borrar(item) {
                const index = this.stores.indexOf(item)
                this.editado = Object.assign({}, item)
                console.log(this.stores[index].id) //capturo el id de la fila seleccionada
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
            borrarNeg(item) {
                const index = this.stores.indexOf(item)
                this.editadoNeg = Object.assign({}, item)

                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteNeg()
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
                    this.id = this.editado.id
                    this.name = this.editado.name
                    this.address = this.editado.address
                    this.phone_number = this.editado.phone_number
                    this.opening_time = this.editado.opening_time
                    this.closing_time = this.editado.closing_time
                    this.minimum_purchase = this.editado.minimum_purchase
                    this.delivery_price = this.editado.delivery_price
                    this.latitude = this.editado.latitude
                    this.longitude = this.editado.longitude
                    this.textSnack = '¡Actualización Exitosa!'

                    this.editarCat()
                } else {
                    //Guarda el registro en caso de Alta
                    if (this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0) {
                        this.snackbar = true
                        this.textSnack = 'Datos incompletos.'
                    } else {
                        this.name = this.editado.name
                        this.description = this.editado.description
                        this.snackbar = true
                        this.textSnack = '¡Alta exitosa!'
                        this.altaMovil()
                    }
                }
                this.cancelar()
            },
            //Procedimiento Alta de moviles.
            altaMovil: function () {
                axios.post('/store/add', this.editado).then(response => {
                    this.getstores();
                });
                this.name = "",
                    this.address = ""
            },
            editarCat: function () {
                console.log(this.editado);
                axios.put('/store/update', this.editado).then(response => {
                    this.getstores();
                });
                this.name = "",
                    this.address = ""
            },
            deleteCat: function () {
                axios.put('/store/delete', this.editado).then(response => {
                    this.getstores();
                });
                this.name = "",
                    this.description = ""
            },
            /*********/
            //Procedimiento Alta de moviles.
            agregarTime: function () {
                this.editadoTime.idStore = this.editado.id
                axios.post('/store/addTime', this.editadoTime).then(response => {
                    this.getPickupTime(this.editado.id);
                });
            },
            editarTime: function () {                
                axios.put('/store/updateTime', this.editadoTime).then(response => {
                    this.getPickupTime(this.editado.id);
                });
            },
            deleteTime: function () {

                this.editadoTime.idStore = this.editado.id
                console.log( 'this.editadoTime');
                console.log( this.editadoTime);
                axios.put('/store/deleteTime', this.editadoTime).then(response => {
                    this.getPickupTime(this.editado.id);
                });
            },

            borrarTime(item) {
                const index = this.pickupTimes.indexOf(item)
                this.editadoTime = Object.assign({}, item)

                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteTime()
                    this.snackbar = true
                    this.textMsg = 'Se eliminó el registro.'
                } else {
                    this.snackbar = true
                    this.textMsg = 'Operación cancelada.'
                }
            },
            /*********/

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
                    this.editadoNeg.is_mod = true
                    this.editadoNeg.imageUrl = fileReader.result

                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            },
            cancelarNeg() {
                this.dialogForm = false
                this.editadoNeg = Object.assign({}, this.defaultItem)
                this.editedIndexNeg = -1
            },
            guardarNeg() {
                this.editadoNeg.store_id = this.editado.id
                if (this.editedIndexNeg > -1) {
                    //Guarda en caso de Edición

                    this.textSnack = '¡Actualización. Exitosa!'
                    this.editarNegocio()
                } else {
                    //Guarda el registro en caso de Alta
                    if (this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0) {
                        this.snackbar = true
                        this.textSnack = 'Datos incompletos.'
                    } else {

                        this.snackbar = true
                        this.textSnack = '¡Alta. exitosa!'
                        this.altaNeg()
                    }
                }
                this.cancelarNeg()
            },
            irNeg(item) {
                //this.$router.push({ name: 'products' })
                //window.location.replace("/missions/1/edit/2");
                axios.get("/missions/1/edit/2");
            },

            altaNeg: function () {
                axios.post('/business/add', this.editadoNeg).then(response => {
                    this.getbusinessNode();
                });
                this.name = "",
                    this.description = ""
            },
            editarNegocio: function () {
                //console.log(this.editadoNeg)
                axios.put('/business/update', this.editadoNeg).then(response => {
                    this.getbusinessNode();
                });
                this.name = "",
                    this.description = ""
            },
            deleteNeg: function () {
                axios.put('/business/delete', this.editadoNeg).then(response => {
                    this.getbusinessNode();
                });
                this.name = "",
                    this.description = ""
            },
        },
        computed: {
            // ...mapGetters('auth', ['can'])
            //Dependiendo si es Alta o Edición cambia el título del modal
            formTitle() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
            },
            formTitleNeg() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedIndexNeg === -1 ? 'Nuevo Registro' : 'Editar Registro'
            },
        },
    }
</script>
