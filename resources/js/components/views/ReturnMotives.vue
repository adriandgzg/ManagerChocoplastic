<template>
    <v-app>
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
                            <v-text-field v-model="editado.remo_description" label="Nombre" maxlength="300"
                                        :rules="nameRules" required></v-text-field>                                                     
                            <span>Activo/Inactivo</span>
                            <v-switch v-model="estado"/>
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
                    <v-data-table :headers="headers" :items="payments" :search="search" sort-by="id" class="elevation-3">
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
                            
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-col>
                    </template>
                    <template v-slot:item.status="{ item }">                            
                            <v-chip v-if="item.remo_status == 1" color="green" dark>  Activo  </v-chip>
                            <v-chip v-else color="red" dark>Inactivo</v-chip>                        
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
                        value: 'remo_pk',
                        width: '10%'
                    }, 
                    {
                        text: 'Nombre',
                        value: 'remo_description'
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
            remo_pk:0,
            remo_description:'',
            remo_status:0,
         },
         defaultItem:{
            remo_pk:0,
            remo_description:'',
            remo_status:0,
         },
         editedIndex: -1,
          payments: [],
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
    loading:false,
    dialogQuestion:false,
      dialogQuestionDelete:false,
      messageQuestion:'',
    };
  },
   created() {
       this.getPayments();
   },

  methods: {

      getPayments() {
          this.loading = true
      axios
        .get("/returnmotivesList")
        .then(response => {
            setTimeout(() => (this.loading = false), 500)
            console.log(response.data)
          this.payments = response.data.data;          
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
      this.editedIndex = this.payments.indexOf(item)
      this.editado = Object.assign({}, item)
      this.estado = this.editado.remo_status
      this.dialog = true
    },
    guardar() {
        
        if(this.estado == true)
            this.editado.remo_status =  1;
        else
            this.editado.remo_status =  0;
        
        if (this.editedIndex > -1) {
            this.editar()
        } else {            
            this.alta()
        }
        this.cancelar()
    },
    alta: function () {
        axios.post('/returnmotives/add', this.editado).then(response => {
            this.snackbar = true
            this.textMsg = '¡Alta exitosa!'
            this.getPayments();
        });
    },
    editar: function () {
        axios.put('/returnmotives/update', this.editado).then(response => {
            this.snackbar = true
            this.textMsg = '¡Actualización Exitosa!'
            this.getPayments();
        });
    },

    borrar(item) {
        const index = this.payments.indexOf(item)
        this.editado = Object.assign({}, item)
        this.dialogQuestionDelete = true
        },

        guardaBorrar(){
            this.delete()
            this.dialogQuestionDelete = false
            },

    delete: function () {
        axios.put('/returnmotives/delete', this.editado).then(response => {
            
            this.textMsg = "¡Eliminado correctamente!";
            this.normal('Notificación', this.textMsg,"success");
            this.getPayments();
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