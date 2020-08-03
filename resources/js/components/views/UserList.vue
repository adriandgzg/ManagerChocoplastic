<template>
    <v-container>
    <v-dialog v-model="loading" persistent width="300">
          <v-card color="white">
            <v-card-text>
              Cargando
              <v-progress-linear
                indeterminate 
                color="green"
                class="mb-0"
              ></v-progress-linear>
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
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="usuarios" sort-by="id" class="elevation-3">
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
                                        @click="dialogForm = !dialogForm"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                           
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        
                    </template>                    
                    <template v-slot:item.action="{ item }">
                        <v-btn class="mr-2" fab dark small color="green" @click="editarTipo(item)">
                            <v-icon dark>mdi-account-arrow-right</v-icon>
                        </v-btn>
                        <v-btn class="mr-2" fab dark small color="blue" @click="editarPassword(item)">
                            <v-icon dark>mdi-account-key</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialogForm" max-width="800px">
        <template v-slot:activator="{ on }"></template>

        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Usuario</span>
            </v-card-title>
            <v-form v-model="valid" >
            <v-card-text>
                <v-container>
                <v-text-field v-model="editado.name" label="Nombre" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                <v-text-field v-model="editado.email" label="Email" maxlength="300"
                                        :rules="[rules.required, rules.email]" required></v-text-field>
                <v-text-field v-model="editado.phone_number" label="No. Empleado" maxlength="300"
                                        :rules="nameRules" required></v-text-field>  
                <v-text-field v-model="editado.password" label="Contraseña" maxlength="300"
                                        :rules="[rules.required, rules.min]" 
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"
                                        ></v-text-field>                
                    <v-select
                                        
                                        v-model="gender"
                                        :items="genders"
                                        item-text="name"
                                        item-value="name"
                                        filled
                                        chips
                                        label="Género"
                                        placeholder="Selecciona su Género"
                                ></v-select>
                    <v-select
                                        
                                        v-model="store"
                                        :items="stores"
                                        item-text="stor_name"
                                        item-value="stor_pk"
                                        filled
                                        chips
                                        label="Sucursal"
                                        placeholder="Selecciona sucursal"
                                ></v-select>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">
                        Cancelar
                    </v-btn>
                    <v-btn :disabled="!valid" color="teal accent-4" class="ma-2 white--text" @click="guardar">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card-text>
            </v-form>
        </v-card>
    </v-dialog>
    <!--FIN-->
    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on }"></template>

        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Usuario</span>
            </v-card-title>
            <v-form v-model="validUpdate" >
            <v-card-text>
                <v-container>
                <v-text-field v-model="editado.name" label="Nombre" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                <v-text-field v-model="editado.email" label="Email" maxlength="300"
                                        :rules="[rules.required, rules.email]" required></v-text-field>
                <v-text-field v-model="editado.phone_number" label="No. Empleado" maxlength="300"
                                        disabled></v-text-field>      
                              
                    <v-select
                                        
                                        v-model="gender"
                                        :items="genders"
                                        item-text="name"
                                        item-value="name"
                                        filled
                                        chips
                                        label="Género"
                                        placeholder="Selecciona su Género"
                                ></v-select>
                    <v-select
                                        
                                        v-model="store"
                                        :items="stores"
                                        item-text="stor_name"
                                        item-value="stor_pk"
                                        filled
                                        chips
                                        label="Sucursal"
                                        placeholder="Selecciona sucursal"
                                ></v-select>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarupdate">
                        Cancelar
                    </v-btn>
                    <v-btn :disabled="!validUpdate" color="teal accent-4" class="ma-2 white--text" @click="actualizar">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card-text>
            </v-form>
        </v-card>
    </v-dialog>
    <!--FIN-->

    <!--  Modal del diálogo para Alta y Edicion    -->
    <v-dialog v-model="dialogPassword" max-width="800px">
        <template v-slot:activator="{ on }"></template>

        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Cambio de Contraseña</span>
            </v-card-title>
            <v-form v-model="validPassword" >
            <v-card-text>
                <v-container>
                <v-text-field v-model="editado.password" label="Contraseña" maxlength="300"
                                        :rules="[rules.required, rules.min]" 
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"
                                        ></v-text-field>  
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarPassword">
                        Cancelar
                    </v-btn>
                    <v-btn :disabled="!validPassword" color="teal accent-4" class="ma-2 white--text" @click="actualizarPassword">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card-text>
            </v-form>
        </v-card>
    </v-dialog>
    <!--FIN-->
    </v-container>
</template>
<script>
    import {mapGetters} from "vuex";
import CripNotice from "crip-vue-notice";
    export default {
        data() {
            return {
                dialogForm:false,
                dialog:false,
                dialogPassword:false,
                show1: false,
                statuses:[
                    {name:'Cliente',id:1},
                    {name:'Repartidor',id:2},
                ],
                valid:false,
                validUpdate:false,
                validPassword:false,
                genders:[],
                gender:'',
                store:'',
                stores:[],
                headers: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Nombre',
                        value: 'name'
                    }, {
                        text: 'Correo Electrónico',
                        value: 'email'
                    }, {
                        text: 'No. Empleado',
                        value: 'phone_number'
                    }, {
                        text: 'Tipo Usuario',
                        value: 'user_type'
                    }, 
                    {
                        text: '',
                        value: 'action'
                    },
                ],                
                usuarios: [],                
                editado: {                    
                    id: '',
                    name: '',
                    email:'',
                    password:'',
                    phone_number:'',
                    birthday:'',
                    gender:'',
                    profile_picture:'',
                    user_type:'',
                    user_type_id:0,
                    stor_fk:0,
                },
                defaultItem: {
                    id: '',
                    name: '',
                    email:'',
                    password:'',
                    phone_number:'',
                    birthday:'',
                    gender:'',
                    profile_picture:'',
                    user_type:'',
                    user_type_id:0,
                    stor_fk:0,
                },

                nameRules: [
                    value => !!value || 'Requerido.',
                    value => (value && value.length >= 3) || 'Min 3 caracteres',
                ],
                phoneRules: [
                        value => !!value || 'Requerido.',
                        value => (value && value.length == 10 ) || 'Requiere 10 caracteres',
                            ],
                numberRules: [
                    value => !!value || 'Requerido.',
                    value => value > 0 || 'El número debe ser mayor a cero',
                ],
                rulesImage: [
                    value => !!value || 'Archivo requerido',
                    value => !value || value.size < 2000000 || 'La imagen tiene que ser menor a 2 MB!',
                ],
                rules: {
                        required: value => !!value || 'Requiredo.',
                        min: v => v.length >= 8 || 'Min 8 caracteres',                        
                        email: value => {
                                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                return pattern.test(value) || 'E-mail inválido.'
                                },
                    },
                
                loading:false,
                dialogQuestion:false,
                dialogQuestionDelete:false,
                messageQuestion:'',

            }
        },
        created() {            
            this.getUser();
            this.getGenders();
            this.getStores();
        },
        methods: {
            getUser() {
                 this.loading = true
                axios.get('/listUsers')
                    .then(response => {
                         setTimeout(() => (this.loading = false), 2000)                   
                        this.usuarios = response.data.data
                    })
                    .catch(e => {
                        console.log(e);
                        this.normal('Notificación', "Error al cargar los datos" ,"error");
                    })
            },
            getGenders() {
                axios.get('/clients/genders')
                    .then(response => {                        
                        this.genders = response.data.data
                    })
                    .catch(e => {
                        console.log(e);
                    })
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
            editarTipo(item) {
                //this.editedIndexNeg = this.business.indexOf(item)
                console.log(item)
                
                this.editado = Object.assign({}, item)
                this.gender = this.editado.gender
                this.store = this.editado.stor_fk
                console.log(this.editado)
                this.dialog = true                
            },
            editarPassword(item){
                this.editado = Object.assign({}, item)
                this.dialogPassword = true
            },
            cancelar() {
                this.dialogForm = false
                this.editado = Object.assign({}, this.defaultItem)
            },
            guardar() {            
                this.editado.gender = this.gender;   
                this.editado.stor_fk = this.store;
                console.log(this.editado)
                //this.editado.user_type_id = this.status

                axios.post('signup', this.editado)
                    .then(response => {
                        if(response.data.status.code == 200){
                            this.normal('Notificación',response.data.status.message ,"success");
                            this.dialogForm = false
                            this.getUser();
                        }                        
                        else{
                            this.normal('Notificación',response.data.status.message ,"success");
                        }
                    })                    
            },

            actualizar(){
                this.editado.gender = this.gender;   
                this.editado.stor_fk = this.store;
                console.log(this.editado)

                axios.post('/user/update', this.editado)
                    .then(response => {
                        if(response.data.status.code == 200){
                            this.normal('Notificación',response.data.status.message ,"success");
                            this.dialog = false
                            this.getUser();
                        }                        
                        else{
                            this.normal('Notificación',response.data.status.message ,"success");
                        }
                    })

            },
            actualizarPassword(){               

                axios.post('/user/password/change', this.editado)
                    .then(response => {
                        if(response.data.status.code == 200){
                            this.normal('Notificación',response.data.status.message ,"success");
                            this.dialogPassword = false
                            this.getUser();
                        }                        
                        else{
                            this.normal('Notificación',response.data.status.message ,"success");
                        }
                    })

            },
            cancelarupdate() {
                this.dialog = false
                this.editado = Object.assign({}, this.defaultItem)
            },
            cancelarPassword() {
                this.dialogPassword = false
                this.editado = Object.assign({}, this.defaultItem)
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
    }
</script>