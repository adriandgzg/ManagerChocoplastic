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
            :items="stores"
            label="Sucursal"
            item-text="stor_name"
            item-value="stor_pk"
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
                  <td>${{ formatMoney(item.clsd_price) }}</td>
                  <td>${{ formatMoney(item.clsd_quantity * item.clsd_price) }}</td>
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
                  <td>${{formatMoney(subtotal)}}</td>
                  <td />
                </tr>                
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>I.V.A.</td>
                  <td>${{formatMoney(iva)}}</td>
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
                  <td>${{formatMoney(total)}}</td>
                  <td />
                </tr>
              </tfoot>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog -->

    
    <v-dialog v-model="dialogcredito" max-width="500">
      <v-card>
        <v-card-title>Crédito:</v-card-title>
        <v-card-text>
          <v-text-field label="Comentario:"></v-text-field>
          <span class="subheading font-weight-bold">Forma de Pago:</span>
          <v-text-field
            label="Efectivo: "
            required
            :rules="minNumberRules"
            prefix="$"
            type="number"
            v-model="efectivo"
          ></v-text-field>
          <v-text-field label="Tarjeta: " v-model="tarjeta" required :rules="minNumberRules" prefix="$" type="number"></v-text-field>

          <br />
          <tr>
            <td>Subtotal</td>
            <td> ${{formatMoney(subtotal)}}</td>
            <td />
          </tr>          
          <tr>
            <td>Total I.V.A.</td>
            <td> ${{formatMoney(iva)}}</td>
            <td />
          </tr>
          <tr>
            <td>Total</td>
            <td> ${{formatMoney(total)}}</td>
          </tr>
          <tr>
            <td>Total Crédito</td>
            <td> ${{formatMoney(total - efectivo - tarjeta) }}</td>
          </tr>

          <v-btn @click="dialogcredito = !dialogcredito">Cancelar</v-btn>
          <v-btn @click="finalizarVenta" color="warning">Confirmar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogcontado" max-width="500">
      <v-card>
        <v-card-title>Contado</v-card-title>

        <v-card-text>
          <span class="subheading font-weight-bold">Forma de Pago:</span>

          <v-text-field
            label="Efectivo: "
            required
            :rules="minNumberRules"
            prefix="$"
            type="number"
          ></v-text-field>
          <v-text-field label="Tarjeta: " required :rules="minNumberRules" prefix="$" type="number"></v-text-field>

          <br />
          <tr>
            <td>Subtotal</td>
            <td> ${{formatMoney(subtotal)}}</td>
            <td />
          </tr>          
          <tr>
            <td>Total I.V.A.</td>
            <td> ${{formatMoney(iva)}}</td>
            <td />
          </tr>
          <tr>
            <td>Total</td>
            <td> ${{formatMoney(total)}}</td>
          </tr>
          <v-btn @click="dialogcontado = !dialogcontado">Cancelar</v-btn>
          <v-btn @click="finalizarVenta" color="success">Confirmar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
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
        stores:[],
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
        efectivo:0,
        tarjeta:0,
      textMsg: "",
        editado:{
            clsd_pk:0,
            clsd_quantity:0,
        },
        editadoSale:{
            clsa_pk:0,
            clie_fk:0,
            pame_fk:0,
            stor_fk:0,
        },
        
      dialogcredito: false,
      dialogcontado: false,

      minNumberRules: [
                    value => !!value || 'Requerido.',
                    value => value > 0 || 'El número debe ser mayor o igual a cero',
                ],
      
    };
  },
   created() {
       this.createsale();
       this.getClients();
       this.getPayment();
       this.getStores();
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
          
          if(this.selectClient =='' || this.selectClient == null){
              alert("Debe seleccionar un cliente");
              return;
          }

          if(this.selectpame =='' || this.selectpame == null){
              alert("Debe seleccionar un método de pago");
              return;
          }

          if(this.selectStore =='' || this.selectStore == null){
              alert("Debe seleccionar una sucursal");
              return;
          }
          console.log("paso 2");
          console.log(this.selectpame);
          console.log(this.selectStore);

          this.editadoSale.clsa_pk = this.saleHeader.clsa_pk;
          this.editadoSale.clie_fk = this.selectClient.clie_pk;
          this.editadoSale.pame_fk = this.selectpame.pame_pk;
          this.editadoSale.stor_fk = this.selectStore.stor_pk;

          if(this.editadoSale.pame_fk == 1)
          this.dialogcontado = true;
          else
          this.dialogcredito = true;

            
      },
      finalizarVenta(){
          var r = confirm("¿Está seguro de finalizar la venta?");
            if (r == true) {
          axios.post('/clientsales/update', this.editadoSale)
                .then(response => {
                    this.snackbar = true;
                this.textMsg = "¡Actualizado correctamente!";
                alert("¡Actualizado correctamente!");
                this.$router.push('/sales') ; 
                
                })
                .catch(e => {
                    this.errors.push(e)
                    })
            }
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
            //this.iva =  this.subtotal * 0.16;

            this.total = this.subtotal + this.iva;
    },
    getClients(){
            axios.get("/clientsget")
            .then(response => {
            this.clients = response.data.data;
            this.selectClient = this.clients[0];

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
        getStores(){
            axios.get("/storeget")
            .then(response => {
            this.stores = response.data.data;
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