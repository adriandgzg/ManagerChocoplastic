<template>
    <v-app>
        <v-container>
        <v-dialog v-model="loadingDialog" persistent width="300">
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
          <v-card-title class="subheading font-weight-bold"><H2>{{saleHeader.clsa_identifier}}</H2></v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">                
                <v-label><h4>Cliente:</h4> {{saleHeader.clie_name}}</v-label>  
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
                <v-label><h4>Motivo de devolución:</h4> {{saleHeader.remo_description}}</v-label> 
              </v-card-text>
            </v-col>
            <v-col cols="8">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-label><h4>Observaciones:</h4> {{saleHeader.clre_observation}}</v-label>                 
              </v-card-text>
            </v-col>
          </v-row>        
            </v-form>
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
                  {{item.clrd_quantity_sale}}
                  <td>
                  {{item.clrd_quantity}}                  
                  </td>
                  <td>${{ formatMoney(item.clrd_price) }}</td>
                  <td>${{ formatMoney(item.clrd_quantity * item.clrd_price) }}</td>
                  <td>
                    
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

        </v-container>
    </v-app>
</template>
<script>
import CripNotice from "crip-vue-notice";

export default {
  data() {
    return {
        alert:false, 
        alertError:false,
        clre_pk: this.$route.params.id,
        clre_observation:'',
        valid:false,
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
            clrd_pk:0,
            clrd_quantity:0,
        },
        editadoSale:{
            clre_pk:0,
            remo_fk:0,
            clre_observation:'',
        },
        
      dialogcredito: false,
      dialogcontado: false,
      loadingDialog:false,
      minNumberRules: [
                    value => !!value || 'Requerido.',
                    value => value > 0 || 'El número debe ser mayor o igual a cero',
                ],
      
    };
  },
   created() {
       this.createsale();
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
      
      createsale() {
        this.loadingDialog = true
        console.log('/client/returns/' + this.clre_pk + ' --> get')
            axios.get('/client/returns/' + this.clre_pk + '')
                .then(response => {
                  setTimeout(() => (this.loadingDialog = false), 1000)
                  if(response.data.data != null){
                    this.sales = response.data.data;
                    this.saleHeader = response.data.data.ClientReturns;
                    this.desserts =  this.sales.ClientReturnDetails;

                    this.getTotal();
                  }
                  else{
                    this.normal('Notificación',response.data.status.message ,"error");
                  }
                })
                .catch(e => {
                    console.log(e)
                    this.normal('Notificación', "Error al cargar el detalle de la devolución" ,"error");
                    })
                },
    getTotal(){

            for (var i = 0; i < this.desserts.length; i++) {
                this.subtotal = this.subtotal + (this.desserts[i].clrd_price * this.desserts[i].clrd_quantity );
            }
            //this.iva =  this.subtotal * 0.16;

            this.total = this.subtotal + this.iva;
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