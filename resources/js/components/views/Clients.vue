<template>
    <v-app>
        <v-container>
                <v-snackbar color="#000000"
                    v-model="snackbar"
                    :timeout="timeout">
                    {{ textMsg }}
                    <v-btn
                            color="blue"
                            text
                            @click="snackbar = false"
                    >
                        Cerrar
                    </v-btn>
                </v-snackbar>
            
             <!--  Modal del diálogo para Alta y Edicion    -->
            <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title class="cyan white--text">
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-form v-model="validProvider" >
                        <v-card-text>
                            <v-text-field v-model="editado.clie_name" label="Nombre" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                            <v-text-field v-model="editado.clie_identifier" label="Identificar" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                            <v-text-field v-model="editado.clie_rfc" label="RFC" maxlength="15"
                                        :rules="nameRules" required></v-text-field>
                            <v-text-field v-model="editado.clie_phone" label="Teléfono" maxlength="10"
                                        :rules="phoneRules" required></v-text-field>
                            <v-text-field v-model="editado.clie_email" label="Correo Electrónico" maxlength="50"
                                        :rules="nameRules" required></v-text-field>
                            <v-text-field v-model="editado.clie_addres" label="Dirección" maxlength="1000"
                                        :rules="nameRules" required></v-text-field>
                            <v-text-field v-model="editado.clie_cp" label="C.P." maxlength="5"
                                        :rules="nameRules" required></v-text-field>
                            <v-text-field v-model="editado.clie_city" label="Ciudad" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                            
                            <v-switch v-model="estado"/>
                        
                            <v-select :items="entities" v-model="select" label="Selecione un estado" single-line
                                    item-text="feen_name" item-value="feen_pk" return-object persistent-hint 
                                    ></v-select>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                            <v-btn :disabled="!validProvider" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>

            </v-dialog>

            <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="headers" :items="clientes" :search="search" sort-by="id" class="elevation-3">
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
                            <v-toolbar-title class="white--text">Lista de Clientes</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-col>
                    </template>
                    <template v-slot:item.action="{ item }">                   
                        <v-btn class="mr-2" fab dark small color="cyan" @click="edita(item)">
                            <v-icon dark>mdi-pencil</v-icon>
                        </v-btn>
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
export default {
  data() {
    return {
         headers: [
                    {
                        text: 'ID',
                        value: 'clie_pk',
                        width: '10%'
                    },                    
                    {
                        text: 'Id Proveedor',
                        value: 'clie_identifier'
                    }, 
                    {
                        text: 'Nombre',
                        value: 'clie_name'
                    }, 
                    {
                        text: 'RFC',
                        value: 'clie_rfc'
                    }, 
                    {
                        text: 'Teléfono',
                        value: 'clie_phone'
                    }, 
                    {
                        text: 'Email',
                        value: 'clie_email'
                    }, 
                    {
                        text: 'Dirección',
                        value: 'clie_addres'
                    }, 
                    {
                        text: 'CP',
                        value: 'clie_cp'
                    }, 
                    {
                        text: 'Ciudad',
                        value: 'clie_city'
                    }, 
                    {
                        text: 'Estado',
                        value: 'feen_name'
                    }, 
                    {
                        text: '',
                        value: 'action',
                        width: '20%'
                    },

         ],
         select:0,
         editado:{
            clie_pk:0,
            feen_fk:0,
            clie_identifier:'',
            clie_name:'',
            clie_rfc:'',
            clie_phone:'',
            clie_email:'',
            clie_addres:'',
            clie_cp:'',
            clie_city:'',
            clie_status:0,
         },
         defaultItem:{
            clie_pk:0,
            feen_fk:0,
            clie_identifier:'',
            clie_name:'',
            clie_rfc:'',
            clie_phone:'',
            clie_email:'',
            clie_addres:'',
            clie_cp:'',
            clie_city:'',
            clie_status:0,
         },
         editedIndex: -1,
          clientes: [],
          entities: [],
          search:"",
          dialog: false,
        snackbar: false,
        timeout: 2000,
      textMsg: "",
      valid: false,
      validProvider:false,
      estado:true,
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
            value => (value && value.length == 10 ) || 'Requiere 10 caracteres',
                 ],
    };
  },
   created() {
       this.getClients();
       this.getEntities();
   },

  methods: {

      getClients() {
      axios
        .get("/clientlist")
        .then(response => {
            console.log(response.data)
          this.clientes = response.data.data;          
        })
        .catch(e => {
          console.log(e);
        });
    },
    getEntities() {
      axios
        .get("/entitieslist")
        .then(response => {
            console.log(response.data)
          this.entities = response.data.data;          
        })
        .catch(e => {
          console.log(e);
        });
    },

    cancelar() {
                this.dialog = false
                this.editado = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            },
    edita (item) {    
     
      this.editedIndex = this.clientes.indexOf(item)
      this.editado = Object.assign({}, item)
      this.select = this.editado.feen_fk
      this.estado = this.editado.clie_status
      this.dialog = true
    },
    guardar() {
        this.editado.feen_fk = this.select.feen_pk

        if(this.estado == true)
            this.editado.clie_status =  1;
        else
            this.editado.clie_status =  0;

        if (this.editedIndex > -1) {
            this.editar()
        } else {            
            this.alta()
        }
        this.cancelar()
    },
    alta: function () {
        axios.post('/clients/add', this.editado).then(response => {
            this.snackbar = true
            this.textMsg = '¡Alta exitosa!'
            this.getClients();
        });
    },
    editar: function () {
        axios.put('/clients/update', this.editado).then(response => {
            this.snackbar = true
            this.textMsg = '¡Actualización Exitosa!'
            this.getClients();
        });
    },

    borrar(item) {
        const index = this.clientes.indexOf(item)
        this.editado = Object.assign({}, item)
        console.log('capturo el id de la fila seleccionada')
        console.log(item) //capturo el id de la fila seleccionada
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
            this.delete()
        }
    },

    delete: function () {
        axios.put('/clients/delete', this.editado).then(response => {
            this.snackbar = true;
            this.textMsg = "¡Eliminado correctamente!";
            this.getClients();
        });
    },

},
computed: {
formTitle () {      
return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
},
},
};
</script>