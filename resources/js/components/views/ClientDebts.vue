<template>
    <v-app>
        <v-container>
         <!--  Modal del diálogo para Alta y Edicion    -->
            <v-dialog v-model="dialogdetail" max-width="500px" persistent>
                <v-card>
                    <v-card-title class="cyan white--text">
                        <span class="headline">Detalle de pagos</span>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table :headers="headersdetail" :items="detallepagos" sort-by="id" class="elevation-3">
                            <template v-slot:item.clpa_amount="{ item }">          
                                <v-label>${{formatMoney(item.clpa_amount)}}</v-label>                              
                            </template>
                   
                        </v-data-table>
                    </v-card-text>
                 <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelardetalle">Cancelar</v-btn>
                    
                </v-card-actions>
                </v-card>
            </v-dialog>

         <!--  Modal del diálogo para Alta y Edicion    -->
            <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title class="cyan white--text">
                        <span class="headline">Agregar pago</span>
                    </v-card-title>
                    <v-card-text>
                    <v-form v-model="valid">
                        <v-card-title class="subheading font-weight-bold">No. Venta: {{editado.clsa_identifier}}</v-card-title>
                        <v-divider></v-divider>
                        
                        <v-row>
                            
                            <v-text-field v-model="editado.clpa_amount" label="Monto abonado" prefix="$" type="number"
                                            :rules="numberRules" required></v-text-field>
                            
                            <v-card-text class="category d-inline-flex font-weight-light">
                                <v-combobox required v-model="selectpame"
                            :items="payments"
                            label="Métodos de pago"
                            item-text="pash_name"
                            item-value="pash_pk"
                            filled
                            chips
                            placeholder="Seleccionar una opción"
                        ></v-combobox>
                            </v-card-text>
                            
                        </v-row>
                            </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                            <v-btn :disabled="!valid" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>
                        </v-card-actions>
                </v-card>

            </v-dialog>
            <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="headers" :items="clientsdebts" :search="search" sort-by="id" class="elevation-3">
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
                    <template v-slot:item.clde_amount="{ item }">          
                        <v-label>${{formatMoney(item.clde_amount)}}</v-label>                              
                    </template>
                    <template v-slot:item.clde_amount_paid="{ item }">          
                        <v-label>${{formatMoney(item.clde_amount_paid)}}</v-label>                              
                    </template>
                    <template v-slot:item.clde_amount_outstanding="{ item }">          
                        <v-label>${{formatMoney(item.clde_amount_outstanding)}}</v-label>                              
                    </template>
                     <template v-slot:item.action="{ item }">   
                                    
                        
                        <v-btn class="mr-2" fab dark small color="cyan" @click="abonar(item)">
                            <v-icon dark>mdi-coin</v-icon>
                        </v-btn>

                        <v-btn class="mr-2" fab dark small color="cyan" @click="detalle(item)">
                            <v-icon dark>mdi-parking</v-icon>
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
        headersdetail:[
            {
                text: 'ID',
                value: 'clpa_pk',
                width: '10%'
            }, 
            {
                text: 'Forma de Pago',
                value: 'pash_name'
            },
            {
                text: 'Monto pagado',
                value: 'clpa_amount'
            },
            {
                text: 'Fecha pago',
                value: 'created_at'
            },
        ]
        ,
         headers: [
                    {
                        text: 'ID',
                        value: 'clde_pk',
                        width: '10%'
                    }, 
                    {
                        text: 'No. Venta',
                        value: 'clsa_identifier'
                    },
                    {
                        text: 'Cliente',
                        value: 'clie_name'
                    },
                    {
                        text: 'Monto Deuda',
                        value: 'clde_amount'
                    },
                    {
                        text: 'Monto Pagado',
                        value: 'clde_amount_paid'
                    },
                    {
                        text: 'Monto Pendiente',
                        value: 'clde_amount_outstanding'
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
            clde_fk:0,//PK Cliente Deuda
            clsa_identifier:'',
            clie_fk:0,//PK Cliente
            pash_fk:0,//PK Forma de Pago
            clpa_amount:0,//Monto
         },
         defaultItem:{
            clde_fk:0,//PK Cliente Deuda
            clsa_identifier:'',
            clie_fk:0,//PK Cliente
            pash_fk:0,//PK Forma de Pago
            clpa_amount:0,//Monto
         },
         editedIndex: -1,
         sales:[],
         detallepagos:[],
          clientsdebts: [],
          entities: [],
          search:"",
          dialog: false,
          dialogdetail:false,
        snackbar: false,
        timeout: 2000,
      textMsg: "",
      valid: false,
      validProvider:false,
      payments:[],
        selectpame:'',
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
    numberRules: [
                    value => !!value || 'Requerido.',
                    value => value > 0 || 'El número debe ser mayor o igual a cero',
                ],
    };
  },
   created() {
       this.getClientesPago();
       this.getPayment();
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

      getClientesPago() {
      axios
        .get("/client/debts")
        .then(response => {
            console.log(response.data)
          this.clientsdebts = response.data.data;          
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
    abonar(item){
this.dialog = true
 this.editado.clde_fk = item.clde_pk
this.editado.clsa_identifier = item.clsa_identifier
        this.editado.clie_fk = item.clie_pk
            this.editado.pash_fk =0
            this.editado.clpa_amount=0
    },
    getPayment() {
            axios
                .get("/paymentshapesget")
                .then(response => {
                this.payments = response.data.data;   
                })
                .catch(e => {
                console.log(e);
                });
            },
    guardar(){
        this.editado.pash_fk = this.selectpame.pash_pk;
       
        if(this.selectpame =='' || this.selectpame == null){
              alert("Debe seleccionar un método de pago");
              return;
          }
          
          
          axios.post('/client/payments', this.editado)
                .then(response => {
                  console.log(response)
                  if(response.data.code == 200){
                    this.snackbar = true;
                    this.textMsg = "¡Actualizado correctamente!";
                    alert("¡Actualizado correctamente!");
                    this.getClientesPago();
                    this.cancelar()
                  }
                  else{
                    alert(response.data.message);
                  }
                
                })
                .catch(e => {
                    this.errors.push(e)
                    })
            
      },

      detalle(item) {
      console.log(item)
      axios
        .get("/client/payments/"+item.clde_pk)
        .then(response => {          
          this.detallepagos = response.data.data;     
          this.dialogdetail = true
        })
        .catch(e => {
          console.log(e);
        });
    },
    cancelardetalle(){
        this.dialogdetail = false
    }

},
computed: {
formTitle () {      
return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
},
},
};
</script>