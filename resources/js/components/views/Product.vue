<template>
  <v-container>
    <v-row>
      <v-col>
<v-data-table :headers="headers" :items="products" :search="search" sort-by="id" class="elevation-3"
>     
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
          <v-toolbar-title class="white--text">Productos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider> 
          <v-spacer></v-spacer>  
         
        
            <!--  Modal del diálogo para Alta y Edicion    -->
          <v-dialog v-model="dialog" max-width="500px" >
            <template v-slot:activator="{ on }"></template>
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <!-- para el EDICION-->
             <v-card-title  class="cyan white--text">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>    
                
              <v-card-text>                  
                <v-container>
                   
                      <v-text-field v-model="editado.name" label="Nombre" :rules="nameRules"  required ></v-text-field>                    
                      <v-text-field v-model="editado.description" label="Descripción" :rules="nameRules"  required></v-text-field>
                      <v-text-field v-model="editado.long_key" label="Key" :rules="nameRules"  required></v-text-field>
                      <v-text-field v-model="editado.price" label="Precio" prefix="$" type="number" :rules="numberRules"  required></v-text-field>
                      <v-text-field v-model="editado.content" label="Contenido" type="number" :rules="numberRules"></v-text-field>
                      <v-text-field v-model="editado.unit" label="Unidad" :rules="unidadRules"></v-text-field>
                      <v-text-field v-model="editado.brand" label="Marca" :rules="nameRules"></v-text-field>
                      <v-select :items="categories" v-model="select" label="Select" single-line
                                item-text="name" item-value="id" return-object persistent-hint 
                                v-on:change="changeRoute(`${select.id}`)"></v-select>
                      <v-select :items="subcategories" v-model="selectSub" label="Select" single-line
                                item-text="name" item-value="id" return-object persistent-hint 
                                v-on:change="changeRouteSub(`${selectSub.id}`)"></v-select>
                      <v-card-text>
                        <v-btn raised class="primary" @click="onPickFile">Subir imagen</v-btn>
                        <input type="file" style="display: none"  ref="fileInput" accept="image/jpeg"  @change="onFilePicked"/>
                      </v-card-text>                      
                   
                  <v-layout>
                      <img :src="imageUrl" height="150"/>
                    </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelar">Cancelar</v-btn>
                <v-btn color="teal accent-4" class="ma-2 white--text"  @click="guardar">Guardar</v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-dialog>

        </v-toolbar>
           <!-- Barra de búsqueda  -->
          <v-col cols="12" sm="12">
             <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
          </v-col>
      </template>
      <template v-slot:item.image="{ item }">
            <div class="p-2">
              <v-img :src="item.image" :alt="item.name" aspect-ratio="1"></v-img>
            </div>
          </template>
      <template v-slot:item.action="{ item }">   
         
        <v-btn class="mr-2" fab dark small color="cyan" @click="editar(item)">
        <v-icon dark>mdi-pencil</v-icon>
        </v-btn>   
        <v-btn class="mr-2" fab dark small color="error" @click="borrar(item)">
        <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    </v-col>

    </v-row>
  
  </v-container>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  data () {
      
    return{
       
      headers:[        
        {
          text: 'ID',
          value: 'id',
          width:'5%'
        },{
          text: 'Nombre',
          value: 'name',
          width:'35%'
        },{
          text: 'Descripción',
          value: 'description',
          width:'20%'
        },
        {
          text: 'Key',
          value: 'long_key',
          width:'20%'
        },{
          text: 'Precio',
          value: 'price',
          width:'10%'
        },{
          text: 'Contenido',
          value: 'content',
          width:'10%'
        },{
          text: 'Unidad',
          value: 'unit',
          width:'10%'
        },{
          text: 'Marca',
          value: 'brand',
          width:'10%'
        },

        { text: "Image", value: "image", sortable: false,
          width:'15%' }
        ,{
          text: '',
          value: 'action',
          width:'20%'
        },
      ],
       nameRules: [
      value => !!value || 'Requerido.',
      value => (value && value.length >= 3) || 'Min 3 caracteres',
    ],
     unidadRules: [
      value => !!value || 'Requerido.',
      value => (value && value.length >= 1) || 'Min 1 caracter',
    ],
     numberRules: [
      value => !!value || 'Requerido.',
      value => value > 0 || 'El número debe ser mayor a cero',
    ],
    valid: true,
      products:[], 
      search: '', //para el cuadro de búsqueda de datatables  
      dialog: false, //para que la ventana de dialogo o modal no aparezca automáticamente 
      imageUrl:'',
      select:{
            id: 0,
        },
      selectinput: {
            id: 0,
        },
      selectSub:{id: 0},
      categories:[],
      subcategories:[],
      editado: {
      id: '',
      name: '',
      description: '',
      long_key:'',
      price:'',
      content:'',
      unit:'',
      brand:'',
      sales_unit:'',
      bulk:'',
      imageUrl:this.imageUrl,
      idsubcategoria:0,
      select:0,
        },
        defaultItem: {
      id: '',
      name: '',
      description: '',
      long_key:'',
      price:'',
      content:'',
      unit:'',
      brand:'',
      imageUrl:this.imageUrl,
      sales_unit:'',
      bulk:'',
      idsubcategoria:0,
        },
      }
  },
  created() {
    this.getProducts();
    this.getCategories();
  },
   methods:{
     changeRoute(a) {
    //this.$router.push({path: a.src })
    console.log(a)
    this.getSubCategories(a)
    console.log(this.select)
  },
  changeRouteSub(a) {
    //this.$router.push({path: a.src })
    this.idsubcategoria=a
    this.editado.category_id  = this.idsubcategoria
    console.log('ID sub ' + this.idsubcategoria + ' --> ' + this.editado.category_id)
    
   // getSubCategories(a)
  },
       validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
       getProducts(){
      axios.get('/productList')
        .then(response => {
          this.products = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getCategories(){
     
      axios.get('/CategoriesCbx')
        .then(response => {
           
          this.categories = response.data.data
          console.log(this.categories)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getSubCategories(id){
      axios.get('/subcategories/'+id)
        .then(response => {
          this.subcategories = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    guardar () {
        if (!this.$refs.form.validate()) {
        this.snackbar = true
      }
      else{
      if (this.editedIndex > -1) {
          //Guarda en caso de Edición
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarProduct() 
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0){
          this.snackbar = true
          this.textSnack = 'Datos incompletos.'      
        }else{
          this.textSnack = '¡Alta exitosa!'
          this.addProduct()
        }       
      }
      this.cancelar()
      }
    },
    editarProduct:function(){
      console.log(this.editado)
        axios.put('/product/update', this.editado).then(response =>{
            this.getProducts();
        });        
         this.name = "",
         this.description = ""
    }, 
    editar (item) {    
      this. getCategories();
      this.editedIndex = this.products.indexOf(item)
      this.editado = Object.assign({}, item)
            
      this.select.id = parseInt(this.editado.select)
      
      
      if (this.editado.select != null)
      {
        this.getSubCategories(this.select.id)
        if(this.selectSub != null){
          this.selectSub.id = this.editado.category_id
          
        }
      }
      this.dialog = true
    },
    borrar (item) { 
      const index = this.products.indexOf(item)
      this.editado = Object.assign({}, item)
      console.log(this.products[index].id) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.deleteProduct()
        this.snackbar = true
        this.textSnack = 'Se eliminó el registro.'    
        } else {
        this.snackbar = true
        this.textSnack = 'Operación cancelada.'    
        }    
    },
    addProduct:function(){
        axios.post('/product/add', this.editado).then(response =>{
            this.getProducts();
        });        
         this.name = "",
         this.description = ""
    },  
    deleteProduct:function(){
        axios.put('/product/delete', this.editado).then(response =>{
            this.getProducts();
        });        
         this.name = "",
         this.description = ""
    }, 
    cancelar () {
      this.dialog = false
      this.editado = Object.assign({}, this.defaultItem)
      
      this.editedIndex = -1
    },
       onPickFile () {
  this.$refs.fileInput.click()
},
onFilePicked (event) {
  const files = event.target.files
  let filename = files[0].name
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    this.imageUrl = fileReader.result
    this.editado.imageUrl= fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  this.image = files[0]
}
   },
  computed: {
    // ...mapGetters('auth', ['can'])
    //Dependiendo si es Alta o Edición cambia el título del modal  
    formTitle () {
      //operadores condicionales "condición ? expr1 : expr2"
      // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>    
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
    },
  },
}
</script>