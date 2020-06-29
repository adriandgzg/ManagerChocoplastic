<template>
    <v-app>
        <v-container>
            <v-row>
      <v-col>
        <v-card>
            <v-form v-model="valid">
          <v-card-title class="subheading font-weight-bold">No. Pedido: {{saleHeader.clor_fk}}</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <v-combobox v-model="select" :items="clients" label="Cliente"
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
                <v-combobox required
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
                <v-combobox required
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
        select:'',
    };
  },
   created() {
       this.createsale();
       this.getClients();
       this.getPayment();
   },

  methods: {
      finalizar(){
          console.log(this.select);
      },
      createsale() {
            axios.post('/clientsales?clor_pk=' + this.clor_pk + '')
                .then(response => {
                    this.sales = response.data.data;
                    this.saleHeader = response.data.data.sale;
                    //this.select = this.saleHeader.clor_fk;
                    console.log(this.saleHeader.clor_fk)
                })
                .catch(e => {
                    this.errors.push(e)
                    })
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
    }
}
</script>