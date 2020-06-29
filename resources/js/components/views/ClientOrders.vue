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
                            <v-text-field v-model="editado.clor_name" label="Nombre" maxlength="300"
                                        :rules="nameRules" required></v-text-field>                                                     
                            <span>Activo/Inactivo</span>
                            <v-switch v-model="estado"/>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                            <!--<v-btn :disabled="!validProvider" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>-->
                        </v-card-actions>
                    </v-form>
                </v-card>

            </v-dialog>

            <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="headers" :items="categories" :search="search" sort-by="id" class="elevation-3">
                    <template v-slot:top>
                    <v-system-bar color="indigo darken-2" dark></v-system-bar>
                        <v-toolbar flat color="indigo">
                            
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-col>
                    </template>
                    <template v-slot:item.status="{ item }">                            
                            <v-chip v-if="item.clor_status == 1" color="green" dark>  Activo  </v-chip>
                            <v-chip v-else color="red" dark>Inactivo</v-chip>                        
                    </template>
                     <template v-slot:item.action="{ item }">   
                                    
                        <v-btn class="mr-2" fab dark small color="cyan" 
                               :href="'/detaiorder/'+item.clor_pk">
                            <v-icon dark>mdi-cash-register</v-icon>
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
                        value: 'clor_pk',
                        width: '10%'
                    }, 
                    {
                        text: 'No. Orden',
                        value: 'clor_identifier'
                    },
                    {
                        text: 'Cliente',
                        value: 'clie_name'
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
         select:0,
         principal:false,
         estado:true,
         editado:{
            clor_pk:0,
            clor_name:'',
            clor_status:0,
         },
         defaultItem:{
            clor_pk:0,
            clor_name:'',
            clor_status:0,
         },
         editedIndex: -1,
         sales:[],
          categories: [],
          entities: [],
          search:"",
          dialog: false,
        snackbar: false,
        timeout: 2000,
      textMsg: "",
      valid: false,
      validProvider:false,
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
       this.getCategories();
   },

  methods: {

      getCategories() {
      axios
        .get("/clientorders")
        .then(response => {
            console.log(response.data)
          this.categories = response.data.data;          
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
    ventas (item) {         
      this.editedIndex = this.categories.indexOf(item)
      this.editado = Object.assign({}, item)
      this.createsale(item.clor_pk)
    },

    createsale(id) {
        axios.post('/clientsales?clor_pk=' + id + '')
            .then(response => {
                this.sales = response.data;
                console.log(response.data);
            })
            .catch(e => {
                this.errors.push(e)
            })
    },
    

    borrar(item) {
        const index = this.categories.indexOf(item)
        this.editado = Object.assign({}, item)
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
            this.delete()
        }
    },

    delete: function () {
        axios.put('/categories/delete', this.editado).then(response => {
            this.snackbar = true;
            this.textMsg = "¡Eliminado correctamente!";
            this.getCategories();
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