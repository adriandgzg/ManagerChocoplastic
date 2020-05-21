<template>
    <v-row>
       
            <v-data-table :headers="headers" :items="sales" :search="search" sort-by="id" :sort-desc="[true]" class="elevation-3">
                <template v-slot:top>
                                    <!-- Barra de búsqueda  -->
                                    <v-col cols="12" sm="12">
                                        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                                      hide-details></v-text-field>
                                    </v-col>
                                </template>
                <template v-slot:body.prepend>
                    <tr>
                        <td colspan="10"/>
                        <td>
                            <v-select flat hide-details small multiple clearable
                                      item-text="name" item-value="name"
                                      label="Estado"
                                      v-model="status" :items="statuses">
                            </v-select>
                        </td>
                        <td/>
                    </tr>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn x-small fab dark color="cyan" @click="viewSale(item)">
                        <v-icon dark>mdi-eye</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        
        <v-dialog v-model="detailForm" hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Detalle de pedido</v-toolbar-title>
                    <v-spacer/>
                    <v-btn icon dark :href="'/sales/'+selectedSale.id+'/print'" target="_blank">
                        <v-icon>mdi-printer</v-icon>
                    </v-btn>
                    <v-btn icon dark @click="detailForm = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                </v-toolbar>
                <v-stepper alt-labels v-if="user.store_id == null" >
                    <v-stepper-header>
                        <v-stepper-step complete step="1">
                            Iniciado
                        </v-stepper-step>
                        <v-stepper-step :complete="selectedSale.status.id>=2" step="2" :editable="selectedSale.status.id == 1  && user.store_id == null"  @click="user.store_id == null ? updateSaleStatus(2): ()=>{}">
                            Procesado
                        </v-stepper-step>
                        <v-stepper-step :complete="selectedSale.status.id>=3" step="3" :editable="selectedSale.status.id == 2 && user.store_id == null" @click="selectedSale.status.id==2 && user.store_id == null ? updateSaleStatus(3): ()=>{}">
                            Surtido
                        </v-stepper-step>
                        <v-stepper-step v-if="selectedSale.delivery_type_id==1 && selectedSale.delivery_id==null" :complete="selectedSale.status.id>=4" :editable="selectedSale.status.id == 3  && user.store_id == null" step="4" @click="selectedSale.status.id==3  && user.store_id == null ? deliveryForm=true : false">
                            Enviado
                        </v-stepper-step>
                        <v-stepper-step v-else :complete="selectedSale.status.id>=4"  :editable="selectedSale.status.id == 3 && user.store_id == null" step="4" @click="selectedSale.status.id==3  && user.store_id == null ? updateSaleStatus(4): ()=>{}">
                            Enviado
                        </v-stepper-step>
                        <v-stepper-step :complete="selectedSale.status.id>=5"  :editable="selectedSale.status.id == 4 && user.store_id == null" step="5" @click="selectedSale.status.id==4  && user.store_id == null ? updateSaleStatus(5): ()=>{}">
                            Entregado
                        </v-stepper-step>
                    </v-stepper-header>
                </v-stepper>
                <v-card-text>

                    <v-row>
                        <v-col sm8>
                            <v-card>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th class="text-left">Producto</th>
                                            <th class="text-left">Comentarios</th>
                                            <th class="text-left">Cantidad</th>
                                            <th class="text-left">Precio de venta</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="product in saleProducts" :key="product.id">
                                            <td>{{ product.name }}</td>
                                            <td>{{ product.sale.comments }}</td>
                                            <td>{{ product.sale.quantity }}</td>
                                            <td>${{ product.sale.sale_price }}</td>
                                            <td>
                                            
                                            <v-icon v-if="selectedSale.status.id<=3  && product.sale.business_id == user.store_id && product.completed == false" color="red darken-2" @click="completedProduct(product, 1)">mdi-checkbox-blank-circle</v-icon>
                                            <v-icon v-if="selectedSale.status.id<=3  && product.sale.business_id == user.store_id && product.completed == true" color="green darken-2" @click="completedProduct(product, 0)">mdi-check-circle</v-icon>
                                            </td>
                                            <td><v-icon v-if="selectedSale.status.id<=3  && user.store_id == null" @click="deleteProduct(product.id)">mdi-delete-forever</v-icon></td>

                                        </tr>
                                        <tr v-if="user.store_id == null">
                                            <td/>
                                            <td/>
                                            <td> Subtotal</td>
                                            <td>${{formatPrice(selectedSale.total)}}</td>
                                        </tr>
                                        <tr v-if="user.store_id == null">
                                            <td/>
                                            <td/>
                                            <td> Envio</td>
                                            <td>${{ formatPrice(selectedSale.delivery_distance*selectedSale.delivery_price) }}</td>
                                        </tr>
                                        </tbody>
                                        <tfoot v-if="user.store_id == null">
                                        
                                         <tr>
                                            <td/>
                                            <td/>
                                            <td> Total a Pagar</td>
                                            <td>${{ formatPrice((selectedSale.delivery_distance*selectedSale.delivery_price) + selectedSale.total)}}</td>
                                        </tr>
                                        </tfoot>
                                    </template>
                                </v-simple-table>

                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-input :messages="['No. Pedido']" dense prepend-icon="mdi-star">{{selectedSale.id}}</v-input>
                            <br/>
                            <v-input :messages="['Fecha Pedido']" dense prepend-icon="mdi-calendar-multiple-check">{{selectedSale.created_at}}</v-input>
                            <br v-if="selectedSale.status.id == 5"/>
                            <v-input v-if="selectedSale.status.id == 5" :messages="['Fecha Pedido Entregado']" dense prepend-icon="mdi-calendar-multiple-check">{{selectedSale.updated_at}}</v-input>
                            <br/>
                            <v-input v-if="user.store_id == null" :messages="['Dirección']" dense prepend-icon="mdi-pin">{{selectedSale.address.address}}</v-input>
                            <br v-if="user.store_id == null"/>
                            <v-input v-if="user.store_id == null" :messages="['Cliente']" prepend-icon="mdi-account">{{selectedSale.user.name}}</v-input>
                            <br v-if="user.store_id == null"/>
                            <v-row>
                            <v-col cols="4" v-if="user.store_id == null">
                            <v-input :messages="['Metodo de Pago']" prepend-icon="mdi-currency-usd">{{selectedSale.payment_method.name}}</v-input>
                            </v-col>
                            <v-col cols="4" v-if="user.store_id == null">
                            <v-input v-if="selectedSale.payment_method_id == 1" :messages="['Paga con']" prepend-icon="mdi-currency-usd">{{selectedSale.cash_amount}}</v-input>
                            </v-col>
                            <v-col cols="4" v-if="user.store_id == null">
                            <v-input v-if="selectedSale.payment_method_id == 1" :messages="['Cambio']" prepend-icon="mdi-currency-usd">{{formatPrice(selectedSale.cash_amount - ((selectedSale.delivery_distance*selectedSale.delivery_price) + selectedSale.total))}}</v-input>
                            </v-col>
                            </v-row>
                            <br v-if="user.store_id == null"/>
                            <v-input v-if="user.store_id == null" :messages="['Tipo entrega']" prepend-icon="mdi-cube-send">
                                {{selectedSale.delivery_type_id!=1 ?'En tienda': selectedSale.delivery_id==null? 'A domicilio':'A domicilio por '+ deliveryMen.find(item => item.id === selectedSale.delivery_id).name}}
                            </v-input>
                            <br v-if="user.store_id == null"/>
                            <v-input :messages="['Horario']" prepend-icon="mdi-clock">{{selectedSale.delivery_time.time}}</v-input>
                            <br/>
                            <v-input :messages="['Comentario']" prepend-icon="mdi-tooltip-outline">{{selectedSale.comments}}</v-input>
                            <br/>
                            <v-btn  v-if="selectedSale.status.id<=4 && user.store_id == null" dark color="danger" @click="cancelOrder">
                                CANCELAR PEDIDO
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-divider/>
                    <v-row v-if="user.store_id == null">
                        <v-col class="text-center align-center align-content-center">
                            <iframe :src="'http://www.google.com/maps?q='+selectedSale.address.latitude+','+selectedSale.address.longitude+'&z=15&output=embed'"
                                    width="500" height="300" frameborder="0" style="border:0;"
                                    allowfullscreen=""></iframe>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deliveryForm" max-width="500">
            <v-card>
                <v-card-title>
                    Asignación de repartidor
                </v-card-title>
                <v-card-text>
                    <v-select flat hide-details small clearable
                              item-text="name" item-value="id"
                              label="Repartidor"
                              v-model="deliveryMan" :items="deliveryMen">
                    </v-select>
                    <v-btn @click="deliveryForm=false; deliveryMan=''">Cancelar</v-btn>
                    <v-btn @click="updateSaleDelivery" color="primary">Asignar Repartidor</v-btn>
                </v-card-text>
            </v-card>

        </v-dialog>

        <v-dialog v-model="cancelForm" max-width="500">
            <v-card>
                <v-card-title>
                    Motivo de cancelación
                </v-card-title>
                <v-card-text>
                    <v-select flat hide-details small clearable
                              item-text="name" item-value="id"
                              label="Seleccione una opción"
                              v-model="motivoCancelacion" :items="motivosCancelacion">
                    </v-select>
                    <v-btn @click="cancelForm=false; motivoCancelacion=''">Cancelar</v-btn>
                    <v-btn @click="updateCancelReason(6)" color="primary">Confirmar</v-btn>
                </v-card-text>
            </v-card>

        </v-dialog>

        <v-dialog ref="confirm" v-model="confirm" max-width="500"
                  @keydown.esc="cancel">
        <v-card>
            <v-card-title>
                {{confirm_text}}
            </v-card-title>
            <v-card-text>
                <v-btn @click.native="cancel">Cancelar</v-btn>
                <v-btn @click.native="agree" color="primary">Aceptar</v-btn>
            </v-card-text>
        </v-card>

    </v-dialog>
    </v-row>


</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'ID',
                        value: 'id',
                    }, {
                        text: 'Cliente',
                        value: 'user.name',
                    }, {
                        text: 'Tienda',
                        value: 'store.name',
                    },
                    {
                        text: 'Dirección',
                        value: 'address.address',
                    }, {
                        text: 'Pago',
                        value: 'payment_method.name',
                    }, {
                        text: 'Total',
                        value: 'total',
                    }, {
                        text: 'Efectivo',
                        value: 'cash_amount',
                    }, {
                        text: 'Ticket',
                        value: 'ticket',
                    }, {
                        text: 'Comentario',
                        value: 'comments',
                    }, 
                    {
                        text: 'Fecha Pedido',
                        value: 'created_at',
                    }, 
                    
                    {
                        text: 'Estado',
                        value: 'status.name',
                        width: '100px',
                        filter: value => {
                            if (this.status.length === 0) return true;
                            return this.status.find(function (element) {
                                return element === value;
                            });
                        },
                    }, {
                        text: '',
                        value: 'action',
                        width: '60px'
                    },
                ],
                valid: true,
                sales: [],
                categoriesNode: [],
                search: '', //para el cuadro de búsqueda de datatables
                detailForm: false, //para que la ventana de dialogo o modal no aparezca automáticamente
                imageUrl: '',
                selectedSale: {
                    address: {},
                    user: {},
                    store: {},
                    status: {},
                    cancel_id:'',
                    payment_method: {},
                    delivery_time: {},
                },
                selectedProduct:{
                    idProduct:'',
                    idBusiness:'',
                    completed:false,
                }, 
                statuses: [],
                status: [],
                saleProducts: [],
                deliveryMen:[],
                deliveryMan:'',
                motivosCancelacion:[],
                motivoCancelacion:'',
                deliveryForm:false,
                cancelForm:false,
                confirm:false,
                confirm_text:'',
                confirm_result:false,
                resolve: null,
                reject: null,
                user:[],
                business:[],
            }
        },
        created() {
            this.getUser();
            //this.getProducts();
            this.getStatusNode();
            this.getDeliveryMen();
            this.getMotivosCancelacion();
            
        },
        methods: {
            formatPrice(value) {
                        let val = (value/1).toFixed(2).replace(',', '.')
                        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    },
            getProducts(idStore) {

                if(!idStore) { idStore = 0; } 

                axios.get('/saleList/'+ idStore)
                    .then(response => {                        
                        this.sales = response.data.data
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            
            getUser() {
                axios.get('/listUser')
                    .then(response => {                        
                        this.user = response.data.data
                        
                        this.getProducts(this.user.store_id);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getDeliveryMen() {
                axios.get('/deliveryMen')
                    .then(response => {
                        this.deliveryMen = response.data.data
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getStatusNode() {
                axios.get('/statusNode')
                    .then(response => {
                        this.statuses = response.data.data
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getMotivosCancelacion() {
                axios.get('/motivosCancelacion')
                    .then(response => {
                        this.motivosCancelacion = response.data.data
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            viewSale(sale) {
                axios.get('/sales/' + sale.id + '/productsBusiness/' + this.user.store_id)
                    .then(response => {
                        //this.selectedSale.status.id = 1;
                        //console.log(this.selectedSale);
                        this.saleProducts = response.data.data;                        
                        this.selectedSale = sale;
                        //console.log(this.saleProducts);
                        this.detailForm = true;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            updateSaleStatus(status) {
                if (this.selectedSale.status.id>=status) { return; }
                if(this.selectedSale.total > 0){
                this.selectedSale.status_id=status;
                axios.put('/sale/updateStatus', this.selectedSale)
                    .then(response => {
                        var statusObj=this.statuses.find(item => item.id === status);
                        this.sales.find(item => item.id === this.selectedSale.id).status=statusObj;
                        this.sales.find(item => item.id === this.selectedSale.id).status_id=status;                        
                    })
                    .catch(e => {
                        console.log(e);
                    })
                }
                else{
                    alert("No se puede continuar, no cuenta con productos en el pedido");
                }
            },
            updateSaleDelivery() {
                if (this.deliveryMan=='' || this.selectedSale.delivery_id!=null){
                    console.log('error')
                    return
                }
                console.log(this.deliveryMan)
                axios.put('/sale/delivery/update', {id:this.selectedSale.id, delivery_id:this.deliveryMan})
                    .then(response => {
                        this.deliveryForm=false;
                        this.selectedSale.delivery_id=this.deliveryMan.id;
                        this.updateSaleStatus(4)
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },

            updateCancelReason(status) {
                console.log(this.motivoCancelacion + ' <--> ' + this.selectedSale.cancel_id)
                if (this.motivoCancelacion=='' ){
                    console.log('error')
                    return
                }

                this.selectedSale.cancel_id =this.motivoCancelacion;
                this.selectedSale.status_id=status;

                console.log(this.selectedSale)
                axios.put('/sale/updateStatusCancel', this.selectedSale)
                    .then(response => {
                        this.cancelForm = false;
                        alert("El pedido ha sido cancelado.");                        
                        var statusObj=this.statuses.find(item => item.id === status);
                        this.sales.find(item => item.id === this.selectedSale.id).status=statusObj;
                        this.sales.find(item => item.id === this.selectedSale.id).status_id=status
                        //this.getProducts();
                    })
                    .catch(e => {
                        console.log(e);
                    })                
            },

            cancelSale(status) {
                
                this.selectedSale.status_id=status;
                axios.put('/sale/updateStatus', this.selectedSale)
                    .then(response => {
                       // this.selectedSale.status_id=status;
                        var statusObj=this.statuses.find(item => item.id === status);
                        this.sales.find(item => item.id === this.selectedSale.id).status=statusObj;
                        this.sales.find(item => item.id === this.selectedSale.id).status_id=status
                    })
                    .catch(e => {
                        console.log(e);
                    })
                
            },


            async cancelOrder() {
                /*if (! await this.ask('¿Seguro que desea cancelar esta orden?')) {
                    return;
                }*/

                this.cancelForm = true;
                //this.updateSaleStatus(6)
            },
            async deleteProduct(product_id) {
                if (! await this.ask('¿Desea borrar este producto?')) {
                    return;
                }
                axios.get('/sales/' + this.selectedSale.id + '/products/' + product_id + '/delete')
                    .then(response => {
                        this.selectedSale.total=response.data.data.total
                         if(this.selectedSale.total <= 0){
                            this.cancelSale(6)
                            alert("El pedido ha sido cancelado por falta de productos.");
                            this.detailForm = false;
                        }
                        this.saleProducts.splice(
                            this.saleProducts.indexOf(
                                this.saleProducts.find(item => item.id === product_id)
                            ), 1)

                       

                    })
                    .catch(e => {
                        console.log(e);
                    })
            },

            async completedProduct(product, estado) {  
                
                //console.log(product);
                this.selectedProduct.idBusiness = this.selectedSale.id
                this.selectedProduct.idProduct =  product.id
                this.selectedProduct.completed = estado

                //console.log(this.selectedProduct)
                

                axios.put('/sale/updateProductSale', this.selectedProduct)
                    .then(response => {
                        //this.viewSale(this.selectedSale)
                       //var statusObj=this.statuses.find(item => item.id === status);
                        //this.sales.find(item => item.id === this.selectedSale.id).status=statusObj;
                        //this.sales.find(item => item.id === this.selectedSale.id).status_id=status;                        
                        this.saleProducts.find(item => item.id === product.id).completed = estado
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },

            ask(text){
                this.confirm=true;
                this.confirm_text=text;
                return new Promise((resolve, reject) => {
                    this.resolve = resolve
                    this.reject = reject
                })
            },
            agree() {
                this.resolve(true)
                this.confirm = false
            },
            cancel() {
                this.resolve(false)
                this.confirm = false
            }
        },
    }
</script>