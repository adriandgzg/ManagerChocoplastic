<template>
    <v-app>
        <v-container>
        <v-alert v-model="alert" dismissible transition="fade-transition" type="info">
      {{ textMsg }}
    </v-alert>
  
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
          <v-card-title class="subheading font-weight-bold"><H2>{{saleHeader.prpu_identifier}}</H2></v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">                
                <v-label><h4>Cliente:</h4> {{saleHeader.prov_name}}</v-label>  
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-label><h4>Sucursal:</h4> {{saleHeader.stor_name}}</v-label>                  
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-label><h4>Fecha:</h4> {{saleHeader.created_at}}</v-label> 
              </v-card-text>
            </v-col>
          </v-row> 
          <v-row>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-combobox required v-model="selectReturn"
            :items="returns"
            label="Motivo de devolución"
            item-text="remo_description"
            item-value="remo_pk"
            filled
            chips
            placeholder="Seleccionar Cliente"
          ></v-combobox>
              </v-card-text>
            </v-col>
            <v-col cols="8">
              <v-card-text class="category d-inline-flex font-weight-light">
                
                <v-textarea v-model="prre_observation" auto-grow
                    filled color="deep-purple" label="Observaciones" rows="3"></v-textarea>
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
    <v-alert v-model="alertError" dismissible transition="fade-transition" type="error" timeout="400">
      {{ textMsg }}
    </v-alert>
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
                  <th class="text-left">Cantidad Devuelta</th>
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
                  {{item.prrd_quantity_purchase}}
                  <td>
                  <v-text-field v-model="item.prrd_quantity" label=""
                        @change="onQuantityChange(item)" required></v-text-field>
                  </td>
                  <td>${{ formatMoney(item.prrd_price) }}</td>
                  <td>${{ formatMoney(item.prrd_quantity * item.prrd_price) }}</td>
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
          <span class="subheading font-weight-bold">Forma de Pago:</span>
          <v-text-field
            label="Efectivo: "
            prefix="$"
            type="number"
            v-model="efectivo"
          ></v-text-field>
          <v-text-field label="Transferencia: " v-model="tarjeta"  prefix="$" type="number"></v-text-field>

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
            v-model="efectivo"
            required
            :rules="minNumberRules"
            prefix="$"
            type="number"
          ></v-text-field>
          <v-text-field label="Transferencia: " v-model="tarjeta" required :rules="minNumberRules" prefix="$" type="number"></v-text-field>

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
import CripNotice from "crip-vue-notice";
export default {
  data() {
    return {
        prpu_pk: this.$route.params.id,
        prre_observation:'',
        valid:false,
        alert:false, 
        alertError:false,
        sales:[],
        stores:[],
        returns:[],
        payments:[],
        saleHeader:'',
        saleDetail:[],
        desserts:[],
        selectReturn:'',
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
            prrd_pk:0,
            prrd_quantity:0,
        },
        editadoSale:{
            prre_pk:0,
            remo_fk:0,
            prre_observation:'',
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
       this.getMotivos();
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
      getMotivos(){
            axios.get("/return/motives")
            .then(response => {
            this.returns = response.data.data;
            this.selectReturn = this.returns[0];

            })
            .catch(e => {
            console.log(e);
            });

        },
      finalizar(){
          
          if(this.selectReturn =='' || this.selectReturn == null){              
              this.normal('Notificación', "Debe seleccionar un motivo de devolución","error");
              return;
          }

          this.editadoSale.prre_pk = this.saleHeader.prre_pk;
          this.editadoSale.remo_fk = this.selectReturn.remo_pk;
          this.editadoSale.prre_observation = this.prre_observation;
  
         var r = confirm("¿Está seguro de finalizar la venta?");
            if (r == true) {
              
          axios.post('/provider/returns/update', this.editadoSale)
                .then(response => {
                  console.log(response)
                  if(response.data.status.code == 200){
                    this.snackbar = true;
                    this.textMsg = "¡Actualizado correctamente!";
                    this.normal('Notificación','¡Actualizado correctamente!' ,"success");
                    this.$router.push('/purchaselist') ; 
                  }
                  else{
                    this.normal('Notificación', response.data.message,"error");
                  }
                
                })
                .catch(e => {
                    this.errors.push(e)
                    })
            }

            
      },
      finalizarVenta(){
        console.log((this.total + '-' + (this.efectivo + this.tarjeta)));
          if(this.editadoSale.pame_fk == 1)          
          if((this.total - this.efectivo - this.tarjeta)==0)
          {

          }
          else{
            this.normal('Notificación', "Los montos de pago deben ser igual al total","error");
              return;
          }
          var r = confirm("¿Está seguro de finalizar la venta?");
            if (r == true) {
              this.editadoSale.clde_amount = this.total
            this.editadoSale.clpa_amount_cash=this.efectivo
            this.editadoSale.clpa_amount_transfer= this.tarjeta
          axios.post('/clientsales/update', this.editadoSale)
                .then(response => {
                  console.log(response)
                  if(response.data.code == 200){
                    this.snackbar = true;
                    this.textMsg = "¡Actualizado correctamente!";
                    this.normal('Notificación','¡Actualizado correctamente!' ,"success");
                    this.$router.push('/sales') ; 
                  }
                  else{
                    this.normal('Notificación', response.data.message,"error");
                  }
                
                })
                .catch(e => {
                    this.errors.push(e)
                    })
            }
      },
      onQuantityChange(item){
            this.editado = Object.assign({}, item)
            console.log(this.editado)
           if(this.editado.prrd_quantity > this.editado.prrd_quantity_purchase )
           {
             this.textMsg = "¡El cantidad devuelta no puede ser mayor a la cantidad comprada!";
             this.alertError = true;
             setTimeout(()=>{
                this.alertError=false
              },3000)
              this.createsale()
             return;
           }
            axios.post('/provider/return/details/update', this.editado)
                .then(response => {
                  console.log(response)
                   // this.snackbar = true;
                //this.textMsg = "¡Actualizado correctamente!";
                console.log("¡Actualizado correctamente!")
                this.getTotal();
                })
                .catch(e => {
                    this.errors.push(e)
                    })

        },
      createsale() {
        console.log('/provider/returns?prpu_pk=' + this.prpu_pk + '')
            axios.post('/provider/returns?prpu_pk=' + this.prpu_pk + '')
                .then(response => {
                  console.log(response.data)
                    this.sales = response.data.data;
                    this.saleHeader = response.data.data.ProviderReturns;
                    this.desserts =  this.sales.ProviderReturnDetails;

                    this.getTotal();
                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                    })
                },
    getTotal(){

            for (var i = 0; i < this.desserts.length; i++) {
                this.subtotal = this.subtotal + (this.desserts[i].prrd_price * this.desserts[i].prrd_quantity );
            }
            //this.iva =  this.subtotal * 0.16;

            this.total = this.subtotal + this.iva;
    },
    
    borrar(item) {
        
            this.editado = Object.assign({}, item)
            var r = confirm("¿Está seguro de borrar el registro?");
            if (r == true) {
                this.editado.prrd_pk = item.prrd_pk;
                this.delete()
            }
        },

        delete: function () {
            
            axios.post('/provider/return/details/destroy', this.editado).then(response => {
              
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
        
    }
}
</script>