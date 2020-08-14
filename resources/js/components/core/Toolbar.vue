<template>  
  <div>
    <v-app-bar
            app
    id="core-toolbar"

    style="background: #F2436D;"
  >

  <v-dialog v-model="dialogCaja" max-width="500px" >
    <v-card>
        <v-card-title class="cyan white--text">
            <span class="headline">Apertura de Caja</span>
        </v-card-title>
        <v-form v-model="validCaja" >
          <v-card-text>
                  
              <v-text-field v-model="user.name" label="Usuario" 
                            prepend-icon="mdi-account" disabled></v-text-field>
              <v-text-field v-model="dateFormatted" label="Inicio de Caja"
                  prepend-icon="event" disabled></v-text-field>

              <v-text-field v-model="montoApertura" label="Monto de Apertura" 
                            prepend-icon="mdi-square-inc-cash"
                          prefix="" type="number" v-on:keydown="isNumberValid" 
                          :rules="numberRules" required></v-text-field>
          </v-card-text>

         

          <v-spacer></v-spacer>
          <v-card-actions>
              <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
              <v-btn :disabled="!validCaja" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>
          </v-card-actions>
        </v-form>
          
  </v-card>
</v-dialog>

<v-dialog v-model="dialogCerrarCaja" max-width="500px" >
    <v-card>
        <v-card-title class="cyan white--text">
            <span class="headline">Cierre de Caja</span>
        </v-card-title>
        <v-form v-model="validCaja" >
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" style="padding: 0px 12px 0px 12px;">  
                <v-text-field v-model="user.name" label="Usuario" 
                          prepend-icon="mdi-account" disabled></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">  
                <v-text-field v-model="dateFormatted" label="Inicio de Caja" prepend-icon="event"
                           disabled></v-text-field>
              </v-col>
              <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">  
                <v-text-field v-model="dateFormatted" label="Cierre de Caja" prepend-icon="event"
                           disabled></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">  
                <v-text-field v-model="montoApertura" label="Monto de Apertura" 
                          prepend-icon="mdi-square-inc-cash" disabled
                          prefix="" type="number" v-on:keydown="isNumberValid" 
                          :rules="numberRules" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">   
                <v-text-field v-model="montoApertura" label="Monto de Cierre" 
                          prepend-icon="mdi-square-inc-cash"
                          prefix="" type="number" v-on:keydown="isNumberValid" 
                          :rules="numberRules" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                  <v-card>
                    <v-card-title class="green white--text">   
                        <v-icon class="mr-4" dark size="36">
                          mdi-cash-multiple
                        </v-icon> 
                        <span class="headline">Resumen de Caja</span>                                        
                    </v-card-title>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                        <p class="text-lg-h5 font-weight-bold  green--text" style="padding-bottom: 0px; margin:0px;" >
                          Total de Venta
                        </p>
                        </v-col>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                            <p class="text-lg-right text-lg-h5  green--text" style="padding-bottom: 0px; margin:0px;">
                            $150,000.00
                          </p>                        
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                        <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                          Efectivo
                        </p>
                        </v-col>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                            <p class="text-lg-right text-lg-h6  grey--text" style="padding-bottom: 0px; margin:0px;">
                            $30,000.00
                          </p>                        
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                        <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                          Tarjeta
                        </p>
                        </v-col>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                            <p class="text-lg-right text-lg-h6  grey--text" style="padding-bottom: 0px; margin:0px;">
                            $70,000.00
                          </p>                        
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                        <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                          Crédito
                        </p>
                        </v-col>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                            <p class="text-lg-right text-lg-h6  grey--text" style="padding-bottom: 0px; margin:0px;">
                            $50,000.00
                          </p>                        
                        </v-col>
                      </v-row>
                     <v-divider style="margin: 10px 10px 10px"></v-divider>
                     <v-row>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                        <p class="text-lg-h5 font-weight-bold  blue--text" style="padding-bottom: 0px; margin:0px;" >
                          Total en Caja
                        </p>
                        </v-col>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                            <p class="text-lg-right text-lg-h5  blue--text" style="padding-bottom: 0px; margin:0px;">
                            $10,000.00
                          </p>                        
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                        <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                          Cobrado
                        </p>
                        </v-col>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                            <p class="text-lg-right text-lg-h6  green--text" style="padding-bottom: 0px; margin:0px;">
                            $30,000.00
                          </p>                        
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                        <p class="text-lg-h6 grey--text" style="padding-bottom: 0px; margin:0px;">
                          Retiros
                        </p>
                        </v-col>
                        <v-col cols="12" md="6" style="padding: 0px 12px 0px 12px;">
                            <p class="text-lg-right text-lg-h6  red--text" style="padding-bottom: 0px; margin:0px;">
                            $20,000.00
                          </p>                        
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
              </v-col>
            </v-row>
           
               <v-textarea auto-grow
                    filled color="deep-purple" label="Observaciones" rows="3"></v-textarea>
              </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
              <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarCerrar">Cancelar</v-btn>
              <v-btn :disabled="!validCerrarCaja" color="teal accent-4" class="ma-2 white--text" @click="guardar">Guardar</v-btn>
          </v-card-actions>
        </v-form>
          
  </v-card>
</v-dialog>
    <div class="v-toolbar-title">
      <v-toolbar-title
        
      >
        <v-btn
          class="default v-btn--simple"
          light
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >

      <v-btn v-if="boxEnabled" color="#4F33FF" class="ma-2 white--text" @click="abrirCaja" >
        Abrir Caja
        <v-icon right dark>mdi-inbox-arrow-down</v-icon>
      </v-btn>

      <v-btn v-else color="#FF5733" class="ma-2 white--text" @click="cerrarCaja">
        Cerrar Caja
        <v-icon right dark>mdi-inbox-arrow-up</v-icon>
      </v-btn>
        
        
      </v-flex>
    </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>

    import {mapMutations} from 'vuex'
import CripNotice from "crip-vue-notice";
    export default {
        data: () => ({
            notifications: [],
            title: null,
            responsive: false,
            responsiveInput: false,
            dialogCaja:false,
            dialogCerrarCaja:false,
            validCerrarCaja:false,
            validCaja:false,         
            dateFormatted:'',
            boxEnabled:false,   
            editadoBox:{
              bocu_startdate:'',
              bocu_initialamount:0
            },
            caja:[],   
            user:'',
            montoApertura:0,
            numberRules: [
                value => !!value || 'Requerido.',
                value => value > 0 || 'El número debe ser mayor a cero',
            ],
        }),

        watch: {
            '$route'(val) {
      this.title = val.name
    },    
  },

  created() {
    this.getUser();
    this.obtenerCaja();
    console.log(new Date().toISOString());
    this.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10)) + ' ' + this.formatHour(new Date().toISOString().substr(11, 15));
    
  },   

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    isNumberValid: function(evt) {
           console.log('key ' + evt.key + ' (' + evt.keyCode + ')');
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        
        //if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106) || charCode == 8) {
            console.log(charCode + '--> true' );
            return true;
        } else {
            console.log(charCode + '-->' );
            evt.preventDefault();
            
        }
      },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${year}-${month}-${day.substr(0,2)}`
    },
    formatHour (date) {
      if (!date) return null

      const [year, month, day] = date.split(':')
      return `${year}:${month}`
    },
    getUser() {
      axios
        .get("/listUser")
        .then(response => {
          this.user = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    obtenerCaja(){
      axios
        .get("/boxcut")
        .then(response => {
          console.log(response.data)
          if(response.data.data == null)
            this.boxEnabled = true
          else
            this.boxEnabled = false

          //this.caja = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    abrirCaja(){
      this.dialogCaja = true
      this.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10)) + ' ' + 
                           this.formatHour(new Date().toISOString().substr(11, 15));
    },
    cerrarCaja(){
      this.dialogCerrarCaja = true
      this.dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10)) + ' ' + 
                           this.formatHour(new Date().toISOString().substr(11, 15));
    },
    cancelar() {
                this.dialogCaja = false
            },
    cancelarCerrar() {
                this.dialogCerrarCaja = false
            },
    guardar(){
      this.editadoBox.bocu_startdate = this.dateFormatted;
      this.editadoBox.bocu_initialamount = this.montoApertura;
      axios.post('/box/insert', this.editadoBox)
                .then(response => {
                  console.log(response)
                  if(response.data.code == 200){
                    this.dialogCaja = false
                    this.textMsg = "¡Actualizado correctamente!";
                    this.normal('Notificación','¡Actualizado correctamente!' ,"success");
                   this.obtenerCaja();
                  }
                  else{
                    this.normal('Notificación',response.data.message ,"error");                    
                  }
                
                })
                .catch(e => {
                    //this.errors.push(e)
                    console.log(e)
                    })
    },
    guardarCierre(){},
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
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
