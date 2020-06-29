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
            <v-form v-model="valid">
          <v-card-title class="subheading font-weight-bold">No. Pedido: {{saleHeader.clor_fk}}</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-combobox v-model="selectClient" :items="clients" label="Cliente"
                item-text="clie_name" item-value="clie_pk" filled chips 
                placeholder="Seleccionar Cliente"></v-combobox>
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <span class="subheading font-weight-bold">Vendedor:</span>&nbsp; Carlos Jiménez Martinez
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <span class="subheading font-weight-bold">Fecha:</span>&nbsp; 10/10/2020
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-combobox required v-model="selectStore"
            :items="payments"
            label="Sucursal"
            item-text="pame_name"
            item-value="pame_pk"
            filled
            chips
            placeholder="Seleccionar Cliente"
          ></v-combobox>
              </v-card-text>
            </v-col>
          
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-combobox required v-model="selectpame"
            :items="payments"
            label="Métodos de pago"
            item-text="pame_name"
            item-value="pame_pk"
            filled
            chips
            placeholder="Seleccionar Cliente"
          ></v-combobox>
              </v-card-text>
            </v-col>
          </v-row>
            </v-form>
        </v-card>
        <v-card justify="end">
          <v-btn :disabled="!valid" dark color="success" @click="finalizar">FINALIZAR</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Producto</th>
                  <th class="text-left">Unidad Medida</th>
                  <th class="text-left">Cantidad</th>
                  <th class="text-left">Precio</th>
                  <th class="text-left">Importe</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.prod_name">
                  <td>{{ item.prod_identifier }}</td>
                  <td>{{ item.prod_name }}</td>
                  <td>{{ item.meas_name }}</td>
                  <td>
                  <v-text-field v-model="item.clsd_quantity" label=""
                        @change="onQuantityChange(item)" required></v-text-field>
                  </td>
                  <td>{{ formatPrice(item.clsd_price) }}</td>
                  <td>{{ formatPrice(item.clsd_quantity * item.clsd_price) }}</td>
                  <td>
                    <v-icon @click="borrar(item)" small>mdi-delete</v-icon>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>Subtotal</td>
                  <td>{{subtotal}}</td>
                  <td />
                </tr>                
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>I.V.A.</td>
                  <td>{{iva}}</td>
                  <td />
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>Total</td>
                  <td>{{total}}</td>
                  <td />
                </tr>
              </tfoot>
            </template>
          </v-simple-table>
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
        clor_pk: this.$route.params.id,
        valid:false,
        sales:[],
        clients:[],
        payments:[],
        saleHeader:'',
        saleDetail:[],
        desserts:[],
        selectClient:'',
        selectStore:'',
        selectpame:'',
        snackbar: false,
        timeout: 2000,
        subtotal:0,
        total:0,
        iva:0,
      textMsg: "",
        editado:{
            clsd_pk:0,
            clsd_quantity:0,
        },
    };
  },
   created() {
       this.createsale();
       this.getClients();
       this.getPayment();
   },

  methods: {
      formatPrice(value) {
                        let val = (value/1).toFixed(2).replace(',', '.')
                        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    },
        onQuantityChange(item){
            this.editado = Object.assign({}, item)
            axios.post('/client_sale_details/update', this.editado)
                .then(response => {
                    this.snackbar = true;
                this.textMsg = "¡Actualizado correctamente!";
                console.log("¡Actualizado correctamente!")
                this.getTotal();
                })
                .catch(e => {
                    this.errors.push(e)
                    })

        },
      finalizar(){
          console.log(this.selectClient);
          console.log(this.selectpame);
          console.log(this.selectStore);
      },
      createsale() {
            axios.post('/clientsales?clor_pk=' + this.clor_pk + '')
                .then(response => {
                    this.sales = response.data.data;
                    this.saleHeader = response.data.data.sale;
                    this.desserts =  this.sales.sale_details;

                    this.getTotal();
                })
                .catch(e => {
                    this.errors.push(e)
                    })
                },
    getTotal(){

            for (var i = 0; i < this.desserts.length; i++) {
                this.subtotal = this.subtotal + (this.desserts[i].clsd_price * this.desserts[i].clsd_quantity );
            }
            this.iva =  this.subtotal * 0.16;

            this.total = this.subtotal + this.iva;
    },
    getClients(){
            axios.get("/clients")
            .then(response => {
            this.clients = response.data.data;
            })
            .catch(e => {
            console.log(e);
            });

        },
        getPayment() {
            axios
                .get("/paymentmethodsget")
                .then(response => {
                this.payments = response.data.data;   
                })
                .catch(e => {
                console.log(e);
                });
            },
        
        borrar(item) {
        
            this.editado = Object.assign({}, item)
            var r = confirm("¿Está seguro de borrar el registro?");
            if (r == true) {
                this.editado.clsd_pk = item.clsd_pk;
                this.delete()
            }
        },

        delete: function () {
            
            axios.post('/client_sale_details/destroy', this.editado).then(response => {
                this.snackbar = true;
                this.textMsg = "¡Eliminado correctamente!";
               this.createsale();
            });
        },

        actualizar(item) {
        
            this.editado = Object.assign({}, item)
            axios.post('/client_sale_details/update', this.editado)
                .then(response => {
                    this.snackbar = true;
                this.textMsg = "¡Actualizado correctamente!";
                })
                .catch(e => {
                    this.errors.push(e)
                    })
        },

        
    }
}
</script>