
<template>
  <v-container>
    <v-row>
      <v-col>
<v-data-table :headers="headers" :items="business" :search="search" sort-by="id" class="elevation-3">     
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
         
            <!--  Modal del diálogo para Alta y Edicion    -->
          <v-dialog v-model="dialog" max-width="500px">
          
            <v-form ref="form" >
            <template v-slot:activator="{ on }"></template>
            <v-card>
             <v-card-title  class="cyan white--text">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>    
                
              <v-card-text>                  
                <v-container>
                  <v-row>
                   
                      <v-text-field v-model="editado.name" label="Nombre" required></v-text-field>
                   
                      <v-text-field v-model="editado.description" label="Descripción" required></v-text-field>
                   
                    </v-row>
                    <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-combobox v-model="editado.select" :items="businessNode" label="(Seleccione una opción)" item-text="name" outlined dense required></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-card-text>
                        <v-btn raised class="primary" @click="onPickFile">Subir imagen</v-btn>
                        <input type="file" style="display: none"  ref="fileInput" accept="image/jpeg"  @change="onFilePicked" required/>
                      </v-card-text>                      
                    </v-col>
                    </v-row>                    
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
          <v-col cols="12" sm="12">
             <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
          </v-col>
      </template>
      <template v-slot:item.action="{ item }">   
         <img :src="'' + item.image" style="width: 50px; height: 50px" />
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
          width:'10%'
        },{
          text: 'Nombre',
          value: 'name'
        },{
          text: 'Descripción',
          value: 'description'
        },
        ,{
          text: '',
          value: 'action'
        },
      ],
      business:[],    
        businessNode:[],    
      errors:[],
      editingText:'',
      file:'', 
      editingMode:false,
      action:null,
      selectedModel:null,
      selectedRole:null,
      selectedUser:null,
      assignRole:false,
      chosenFile: null,
      select: [],
      search: '', //para el cuadro de búsqueda de datatables  
    snackbar: false, //para el mensaje del snackbar   
    textSnack: 'texto snackbar', //texto que se ve en el snackbar 
    dialog: false, //para que la ventana de dialogo o modal no aparezca automáticamente 
    editedIndex: -1,
    imageUrl:'',
    image:'',
    editado: {
      id: '',
      name: '',
      description: '',
      imageUrl:this.imageUrl,
       file: '',
       select: '',
       is_mod:false,
    },
    defaultItem: {
     id: '',
      name: '',
      description: '',
      file: '',
      imageUrl:'',is_mod:false,
    },  
    }
  },
  created() {
    this.getbusiness();
    this.getbusinessNode();
  },
  methods:{
    
    getbusiness(){
      axios.get('/businessList')
        .then(response => {
          this.business = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getbusinessNode(){
      axios.get('/businessNode')
        .then(response => {
          this.businessNode = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    cancelar () {
      this.dialog = false
      this.editado = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    editar (item) {    
      this.editedIndex = this.business.indexOf(item)
      this.editado = Object.assign({}, item)
      this.editado.is_mod = false
      this.dialog = true
    },
    borrar (item) { 
      const index = this.business.indexOf(item)
      this.editado = Object.assign({}, item)
      console.log(this.business[index].id) //capturo el id de la fila seleccionada 
        var r = confirm("¿Está seguro de borrar el registro?");
        if (r == true) {
        this.deleteCat()
        this.snackbar = true
        this.textSnack = 'Se eliminó el registro.'    
        } else {
        this.snackbar = true
        this.textSnack = 'Operación cancelada.'    
        }    
    },
    guardar () {
      if (this.editedIndex > -1) {
          //Guarda en caso de Edición
        this.id=this.editado.id          
        this.marca=this.editado.marca
        this.modelo=this.editado.modelo
        this.stock=this.editado.stock
        this.snackbar = true
        this.textSnack = '¡Actualización Exitosa!'  
        this.editarCat() 
      } else {
          //Guarda el registro en caso de Alta  
          if(this.editado.marca == "" || this.editado.modelo == "" || this.editado.stock == 0){
          this.snackbar = true
          this.textSnack = 'Datos incompletos.'      
        }else{
          this.name=this.editado.name
          this.description=this.editado.description
          this.snackbar = true
          this.textSnack = '¡Alta exitosa!'
          this.altaMovil()
        }       
      }
      this.cancelar()
    },
    //Procedimiento Alta de moviles.
    altaMovil:function(){
        axios.post('/business/add', this.editado).then(response =>{
            this.getbusiness();
        });        
         this.name = "",
         this.description = ""
    },  
    editarCat:function(){
      console.log(this.editado);
        axios.put('/business/update', this.editado).then(response =>{
            this.getbusiness();
        });        
         this.name = "",
         this.description = ""
    }, 
    deleteCat:function(){
        axios.put('/business/delete', this.editado).then(response =>{
            this.getbusiness();
        });        
         this.name = "",
         this.description = ""
    }, 
    handleFileUpload(){
        this.file = this.$refs.file.files[0];
        this.editado.file = this.$refs.file.files[0];
        console.log(this.editado.file);
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
    this.editado.is_mod = true
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
