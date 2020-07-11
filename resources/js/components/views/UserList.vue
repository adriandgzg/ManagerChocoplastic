<template>
    <v-container>
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
                            <v-toolbar-title class="white--text">Usuarios</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        
                    </template>                    
                    <template v-slot:item.action="{ item }">
                        <v-btn class="mr-2" fab dark small color="green" @click="editarTipo(item)">
                            <v-icon dark>mdi-account-arrow-right</v-icon>
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
            
            <v-card-text>
                <v-container>
                <v-text-field v-model="editado.name" label="Nombre" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                <v-text-field v-model="editado.email" label="Email" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                <v-text-field v-model="editado.password" label="Contraseña" maxlength="300"
                                        :rules="nameRules" required></v-text-field>                
                    <v-select
                                        
                                        v-model="gender"
                                        :items="statuses"
                                        item-text="name"
                                        item-value="id"
                                        filled
                                        chips
                                        label="Genero"
                                        placeholder="Selecciona su genero"
                                ></v-select>
                    <v-select
                                        
                                        v-model="gender"
                                        :items="statuses"
                                        item-text="name"
                                        item-value="id"
                                        filled
                                        chips
                                        label="Tienda"
                                        placeholder="Selecciona sucursal"
                                ></v-select>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">
                        Cancelar
                    </v-btn>
                    <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardar">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!--FIN-->
    </v-container>
</template>
<script>
    import {mapGetters} from "vuex";
    export default {
        data() {
            return {
                dialogForm:false,
                statuses:[
                    {name:'Cliente',id:1},
                    {name:'Repartidor',id:2},
                ],
                gender:'',
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
                        text: 'Teléfono',
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
                },
                defaultItem: {
                    email:'',
                    id: '',
                    name: '',
                    phone_number:'',
                    user_type:'',
                    user_type_id:0,
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

            }
        },
        created() {            
            this.getUser();
        },
        methods: {
            getUser() {
                axios.get('/listUsers')
                    .then(response => {                        
                        this.usuarios = response.data.data
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            editarTipo(item) {
                //this.editedIndexNeg = this.business.indexOf(item)
                console.log(item)
                
                this.editado = Object.assign({}, item)
                this.status = this.editado.user_type_id 
                console.log(this.editado)
                this.dialogForm = true                
            },
            cancelar() {
                this.dialogForm = false
                this.editado = Object.assign({}, this.defaultItem)
            },
            guardar() {                
//                console.log(this.status)
                this.editado.user_type_id = this.status

                axios.put('/user/updateStatus', this.editado)
                    .then(response => {
                        var statusObj=this.statuses.find(item => item.id === this.status);
                        
                        this.usuarios.find(item => item.id === this.editado.id).user_type=statusObj.name;
                        this.dialogForm = false
                        
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