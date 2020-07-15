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
            
            

            <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="headers" :items="ordenescompra" :search="search" sort-by="id" class="elevation-3">
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
                     <template v-slot:item.action="{ item }">   
                                    
                        <v-btn class="mr-2" fab dark small color="pink" 
                               :href="'/purchaseorder/'+item.prpo_pk">
                            <v-icon dark>mdi-shuffle</v-icon>
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
                        text: 'No. ID',
                        value: 'prpo_identifier'
                    },
                    {
                        text: 'Proveedor',
                        value: 'prov_name'
                    },
                    {
                        text: 'Sucursal',
                        value: 'stor_name'
                    },
                    {
                        text: 'Fecha',
                        value: 'created_at'
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
          ordenescompra: [],
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
        .get("/provider/purchase/orders")
        .then(response => {
            console.log(response.data)
          this.ordenescompra = response.data.data;          
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
        var r = confirm("¿Está seguro de borrar el registro?--");
        if (r == true) {
            this.delete()
        }
    },

    delete: function () {
        axios.post('/provider/purchase/orders/destroy', this.editado).then(response => {
                console.log(response);
                if(response.data.status.code == 200){
                this.snackbar = true;
                this.textMsg = "¡Eliminado correctamente!";
                alert(this.textMsg);
                this.getCategories();
                }
                else{
                    alert("Ocurrio un error al eliminar el producto");
                }
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