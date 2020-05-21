<template>
    <v-container>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="usuarios" sort-by="id" class="elevation-3">
                    <template v-slot:top>
                        <v-system-bar color="indigo darken-2" dark></v-system-bar>
                        <v-toolbar flat color="indigo">
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
    <v-dialog v-model="dialogForm" max-width="1024px">
        <template v-slot:activator="{ on }"></template>

        <v-card>
            <!-- para el EDICION-->
            <v-card-title class="cyan white--text">
                <span class="headline">Tipo de usuario</span>
            </v-card-title>
            
            <v-card-text>
                <v-container>
                    <v-select
                                        
                                        v-model="status"
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
                status:'',
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
                    email:'',
                    id: '',
                    name: '',
                    phone_number:'',
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