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
                            <v-text-field v-model="editado.prod_name" label="Nombre" maxlength="300"
                                        :rules="nameRules" required></v-text-field>
                            <v-textarea v-model="editado.prod_description" label="Descripción" maxlength="5000"
                                        :rules="nameRules" required></v-textarea>  
                            <v-text-field v-model="editado.prod_identifier" label="Identificador" maxlength="300"
                                        :rules="nameRules" required></v-text-field>  
                            <v-select :items="categories" v-model="selectCat" label="Selecione una categoría" single-line
                                    item-text="prca_name" item-value="prca_pk"  persistent-hint 
                                    ></v-select>
                            <v-select :items="measurements" v-model="selectMeasIn" label="Selecione una Unidad Entrada" single-line
                                    item-text="meas_name" item-value="meas_pk"  persistent-hint 
                                    ></v-select>
                            <v-select :items="measurements" v-model="selectMeasOut" label="Selecione una Unidad Salida" single-line
                                    item-text="meas_name" item-value="meas_pk"  persistent-hint 
                                    ></v-select>
                            <v-text-field v-model="editado.prod_actualprice" label="Precio Actual" prefix="$" type="number"
                                            :rules="numberRules" required></v-text-field>
                            <v-text-field v-model="editado.prod_eventualprice" label="Precio Eventual" prefix="$" type="number"
                                            :rules="numberRules" required></v-text-field>
                            <v-text-field v-model="editado.prod_preferentialprice" label="Precio Preferencial" prefix="$" type="number"
                                            :rules="numberRules" required></v-text-field>                            
                            <v-text-field v-model="editado.prod_saleprice" label="Precio Venta" prefix="$" type="number"
                                            :rules="numberRules" required></v-text-field>
                            <v-text-field v-model="editado.prod_listprice" label="Precio Lista" prefix="$" type="number"
                                            :rules="numberRules" required></v-text-field>
                            <v-text-field v-model="editado.prod_packingquantity" label="Stock" type="number"
                                          :rules="numberRules"></v-text-field>
                            <span>Venta a Granel</span>
                            <v-switch v-model="estadoGranel"/>
                            <span>Activo/Inactivo</span>
                            <v-switch v-model="estado"/>

                            <v-card-text>
                            
                                <v-btn raised class="primary" @click="onPickFileProduct">Subir imagen</v-btn>
                                <input type="file" style="display: none" ref="fileInput" accept="image/jpeg"
                                       @change="onFilePickedProduct"  required :rules="rulesImage" />                               
                            </v-card-text>

                            <v-layout>
                                <img :src="this.imageUrl" height="150"/>
                            </v-layout>
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
                    <v-data-table :headers="headers" :items="products" :search="search" sort-by="id" class="elevation-3">
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
                            <v-toolbar-title class="white--text">Lista de Productos</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-col cols="12" sm="12">
                            <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-col>
                    </template>
                    
                    <template v-slot:item.prod_actualprice="{ item }">          
                        <v-label>${{formatMoney(item.prod_actualprice)}}</v-label>                              
                    </template>
                    <template v-slot:item.prod_eventualprice="{ item }">          
                        <v-label>${{formatMoney(item.prod_eventualprice)}}</v-label>                              
                    </template>
                    <template v-slot:item.prod_preferentialprice="{ item }">          
                        <v-label>${{formatMoney(item.prod_preferentialprice)}}</v-label>                              
                    </template>
                    <template v-slot:item.prod_saleprice="{ item }">          
                        <v-label>${{formatMoney(item.prod_saleprice)}}</v-label>                              
                    </template>
                    <template v-slot:item.prod_listprice="{ item }">          
                        <v-label>${{formatMoney(item.prod_listprice)}}</v-label>                              
                    </template>
                    <template v-slot:item.status="{ item }">                            
                            <v-chip v-if="item.prod_status == 1" color="green" dark>  Activo  </v-chip>
                            <v-chip v-else color="red" dark>Inactivo</v-chip>                        
                    </template>
                    <template v-slot:item.bulk="{ item }">
                        <v-chip v-if="item.prod_bulk == 1" color="green" outlined> 
                        Granel</v-chip>
                        <v-chip v-else color="red" outlined>NA Granel</v-chip>
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
                        text: 'Ident',
                        value: 'prod_identifier'
                    },                   
                    {
                        text: 'Nombre',
                        value: 'prod_name'
                    }, 
                   
                    {
                        text: 'Categoria',
                        value: 'prca_name'
                    }, 
                    {
                        text: 'Unidad Entrada',
                        value: 'meas_fk_input_name'
                    }, 
                    {
                        text: 'Unidad Salida',
                        value: 'meas_fk_output_name'
                    }, 
                    {
                        text: 'Precio Actual',
                        value: 'prod_actualprice'
                    },   
                    {
                        text: 'Precio Eventual',
                        value: 'prod_eventualprice'
                    }, 
                    {
                        text: 'Precio Preferencial',
                        value: 'prod_preferentialprice'
                    }, 
                    {
                        text: 'Precio Venta',
                        value: 'prod_saleprice'
                    }, 
                    {
                        text: 'Precio Lista',
                        value: 'prod_listprice'
                    }, 
                    {
                        text: 'Cantidad por Paquete',
                        value: 'prod_packingquantity'
                    },  
                    {
                        text: 'Tipo',
                        value: 'bulk'
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
         selectCat:0,
         selectMeasIn:0,
         selectMeasOut:0,
         principal:false,
         estado:true,
         estadoGranel:true,
         imageUrl:'',
         editado:{
            prod_pk:0,
            prca_fk:0,
            prca_name:'',
            meas_fk_input:0,
            meas_fk_input_name:'',
            prod_description:'',
            meas_fk_output:0,
            meas_fk_output_name:'',
            prod_identifier:'',
            prod_name:'',
            prod_actualprice:0,
            prod_eventualprice:0,
            prod_preferentialprice:0,
            prod_saleprice:0,
            prod_listprice:0,
            prod_bulk:0,
            prod_packingquantity:0,
            prod_status:0,            
            is_mod: false,
            imageUrl: this.imageUrl,
         },
         defaultItem:{
            prod_pk:0,
            prca_fk:0,
            prca_name:'',
            meas_fk_input:0,
            meas_fk_input_name:'',
            prod_description:'',
            meas_fk_output:0,
            meas_fk_output_name:'',
            prod_identifier:'',
            prod_name:'',
            prod_name:'',
            prod_actualprice:0,
            prod_eventualprice:0,
            prod_preferentialprice:0,
            prod_saleprice:0,
            prod_listprice:0,
            prod_bulk:0,
            prod_packingquantity:0,
            prod_status:0,            
            is_mod: false,
            imageUrl: this.imageUrl,
         },
         editedIndex: -1,
          products: [],
          categories: [],
          measurements:[],
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
    numberRules: [
        value => !!value || 'Requerido.',
        value => value > 0 || 'El número debe ser mayor a cero',
    ],
    rulesImage: [
        value => !!value || 'Archivo requerido',
        value => !value || value.size < 2000000 || 'La imagen tiene que ser menor a 2 MB!',
    ],
    };
  },
   created() {
       this.getProducts();
       this.getCategories();
       this.getMeasurements();
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

      getProducts() {
      axios
        .get("/productList")
        .then(response => {
            console.log(response.data)
          this.products = response.data.data;          
        })
        .catch(e => {
          console.log(e);
        });
    },

    getCategories() {
      axios
        .get("/categories")
        .then(response => {
          this.categories = response.data.data;          
        })
        .catch(e => {
          console.log(e);
        });
    },

    getMeasurements() {
      axios
        .get("/measurements")
        .then(response => {
          this.measurements = response.data.data;          
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
      this.editedIndex = this.products.indexOf(item)
      this.editado = Object.assign({}, item)
      this.estado = this.editado.prod_status
      this.estadoGranel = this.editado.prod_bulk
      this.selectCat = this.editado.prca_fk
      this.selectMeasIn = this.editado.meas_fk_input
      this.selectMeasOut = this.editado.meas_fk_output
      this.imageUrl = this.editado.prod_image
      this.dialog = true
    },
    guardar() {
        
        if(this.estado == true)
            this.editado.prod_status =  1;
        else
            this.editado.prod_status =  0;

        if(this.estadoGranel == true)
            this.editado.prod_bulk =  1;
        else
            this.editado.prod_bulk =  0;

      this.editado.prca_fk = this.selectCat;
      this.editado.meas_fk_input = this.selectMeasIn;
      this.editado.meas_fk_output = this.selectMeasOut;
        console.log(this.editado)
        if (this.editedIndex > -1) {
            this.editar()
        } else {            
            this.alta()
        }
        this.cancelar()
    },
    alta: function () {
        axios.post('/product/add', this.editado).then(response => {
            console.log(response.data)
            if(response.data.status.code == 200){
            this.snackbar = true
            this.textMsg = response.data.status.message
            
            this.getProducts();
            }
            else{
                alert(response.data.status.technicaldetail.errorInfo[2]);
            }
        })
        .catch(e => {
                    this.errors.push(e)
                    })
    },
    editar: function () {
        axios.put('/product/update', this.editado).then(response => {
            console.log(response)
            if(response.data.code == 200){
            this.snackbar = true
            this.textMsg = '¡Actualización Exitosa!'
            this.getProducts();
            }
            else{
                alert(response.data.message);
            }
        })
        .catch(e => {
                    this.errors.push(e)
                    })
    },

    borrar(item) {
        const index = this.products.indexOf(item)
        this.editado = Object.assign({}, item)
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
            this.delete()
        }
    },

    delete: function () {
        axios.put('/product/delete', this.editado).then(response => {
            this.snackbar = true;
            this.textMsg = "¡Eliminado correctamente!";
            this.getProducts();
        });
    },

    onPickFileProduct() {
        this.$refs.fileInput.click()
    },
    onFilePickedProduct(event) {
        const files = event.target.files
        let filename = files[0].name
        
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
           this.imageUrl = fileReader.result          
            this.editado.imageUrl = fileReader.result
            this.editado.is_mod = true
            console.log(this.editado)
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
    },

},
computed: {
formTitle () {      
return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
},
},
};
</script>