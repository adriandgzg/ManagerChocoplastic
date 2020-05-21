<template>
    <v-container fill-height fluid grid-list-xl>

        <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
        >
            {{ textMsg }}
            <v-btn
                    color="blue"
                    text
                    @click="snackbar = false"
            >
                Cerrar
            </v-btn>
        </v-snackbar>
        <v-layout wrap>
            <v-flex md12 sm12 lg12>
                <v-card>
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title class="headline">{{stores.businessName}}</v-card-title>
                            <v-card-subtitle>{{stores.storeName}}</v-card-subtitle>
                        </div>
                        <v-col cols="6">

                            <v-img
                                    :src="stores.image"
                                    height="125"
                                    aspect-ratio="1"
                            ></v-img>
                        </v-col>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }"></template>
            <v-card>
                <!-- para el EDICION-->
                <v-card-title class="cyan white--text">
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>

                        <v-text-field v-model="editado.name" label="Nombre" :rules="nameRules" required></v-text-field>

                        <v-text-field v-model="editado.description" label="Descripción" :rules="nameRules"
                                      required></v-text-field>

                        <v-card-text>
                            <v-btn raised class="primary" @click="onPickFile">Subir imagen</v-btn>
                            <input type="file" style="display: none" ref="fileInput" accept="image/jpeg"
                                   @change="onFilePicked"/>
                        </v-card-text>

                        <v-layout>
                            <img :src="imageUrl" height="150"/>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarCategorie">Cancelar</v-btn>
                    <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardarCategorie">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialogAddSub" max-width="500px">
            <template v-slot:activator="{ on }"></template>
            <v-card>
                <!-- para el EDICION-->
                <v-card-title class="cyan white--text">
                    <span class="headline">{{ formTitleAddSub }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>

                        <v-text-field v-model="editadoSub.name" label="Nombre" :rules="nameRules"
                                      required></v-text-field>

                        <v-text-field v-model="editadoSub.description" label="Descripción" :rules="nameRules"
                                      required></v-text-field>

                        <v-card-text>
                            <v-btn raised class="primary" @click="onPickFile">Subir imagen</v-btn>
                            <input type="file" style="display: none" ref="fileInput" accept="image/jpeg"
                                   @change="onFilePicked" />
                           
                        </v-card-text>

                        <v-layout>
                            <img :src="imageUrl" height="150"/>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarSub">Cancelar</v-btn>
                    <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardarSub">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Modal productos-->
        <v-dialog v-model="dialogProducts" fullscreen hide-overlay transition="dialog-bottom-transition">

            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialogProducts = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ editado.name }} --> {{ editadoSub.name }} --> Productos</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialogProducts = false">Cerrar</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-subheader>
                        <v-btn color="success" class="ma-2" dark @click="dialogAddProduct = !dialogAddProduct">Agregar
                            Producto
                        </v-btn>
                    </v-subheader>
                    <v-list-item>
                        <v-list-item-content>
                            <v-data-table :headers="headersProducts" :items="products" :search="search" sort-by="id"
                                          class="elevation-3">
                                <template v-slot:top>
                                    <!-- Barra de búsqueda  -->
                                    <v-col cols="12" sm="12">
                                        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line
                                                      hide-details></v-text-field>
                                    </v-col>
                                </template>
                                <template v-slot:item.image="{ item }">
                                    <div class="p-2">
                                        <v-img :src="item.image" :alt="item.name" aspect-ratio="1"></v-img>
                                    </div>
                                </template>
                                <template v-slot:item.action="{ item }">

                                    <v-btn class="mr-2" fab dark small color="cyan"
                                           @click="editarProductoOriginal(item)">
                                        <v-icon dark>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="mr-2" fab dark small color="cyan"
                                           @click="PromocionProductoOriginal(item)">
                                        <v-icon dark>mdi-offer</v-icon>
                                    </v-btn>
                                    <v-btn class="mr-2" fab dark small color="error"
                                           @click="borrarProductoOriginal(item)">
                                        <v-icon dark>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

            </v-card>
        </v-dialog>
        <!-- Fin Modal productos-->
        <!-- Model agregar producto -->
        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialogPromoProduct" max-width="500px">
            <template v-slot:activator="{ on }"></template>
            <v-form v-model="validPromo" >
            <v-card>
                    <!-- para el EDICION-->
                    <v-card-title class="cyan white--text">
                        <span class="headline">Agregar Promoción</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <!--<v-date-picker v-model="dates" range></v-date-picker>-->
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <v-text-field v-model="editadoProductPromo.precioPromocion" label="Precio Promoción" prefix="$" type="number"
                                            :rules="numberRules" required></v-text-field>                                 
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <v-text-field v-model="editadoProductPromo.montoMinimo" label="Unidades mínimas" type="number"
                                            :rules="numberRules" required></v-text-field>                                 
                                </v-col>
                            </v-row>
                            <v-row>
                            <v-col cols="12" lg="6">
                                <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editadoProductPromo.start_date"
                                                label="Fecha Inicio"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="editadoProductPromo.start_date" 
                                                   @input="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-menu
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editadoProductPromo.end_date"
                                                label="Fecha Fin"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker no-title v-model="editadoProductPromo.end_date" :min="editadoProductPromo.start_date"
                                                   @input="menu1 = false"></v-date-picker>
                                    
                                </v-menu>

                            </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarProductoPromo">Cancelar
                        </v-btn>
                        <v-btn :disabled="!validPromo"  color="teal accent-4" class="ma-2 white--text" @click="guardarProductoPromo">Guardar
                        </v-btn>
                    </v-card-actions>
            </v-card>
            </v-form>
        </v-dialog>
        <!-- Model agregar producto -->
        <!--  Modal del diálogo para Alta y Edicion    -->
        <v-dialog v-model="dialogAddProduct" max-width="500px">
            <template v-slot:activator="{ on }"></template>
            <v-form v-model="valid" >
                <v-card>
                    <!-- para el EDICION-->
                    <v-card-title class="cyan white--text">
                        <span class="headline">{{ formTitleAddProduct }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>

                            <v-text-field v-model="editadoProduct.name" label="Nombre" :rules="nameRules"
                                          required></v-text-field>
                            <v-text-field v-model="editadoProduct.description" label="Descripción" :rules="nameRules"
                                          required></v-text-field>
                            <v-text-field v-model="editadoProduct.long_key" label="Key" :rules="nameRules"
                                          required></v-text-field>
                            <v-text-field v-model="editadoProduct.pricebusiness" label="Precio" prefix="$" type="number"
                                          :rules="numberRules" required></v-text-field>
                            <v-text-field v-model="editadoProduct.content" label="Contenido" type="number"
                                          :rules="numberRules"></v-text-field>
                            <v-text-field v-model="editadoProduct.unit" label="Unidad"
                                          :rules="unidadRules"></v-text-field>
                            <v-text-field v-model="editadoProduct.brand" label="Marca"
                                          :rules="nameRules"></v-text-field>

                            <v-text-field v-model="editadoProduct.stock" label="Stock" type="number"
                                          :rules="numberRules"></v-text-field>
                            <v-text-field v-model="editadoProduct.max_quantity" label="Cantidad Máxima" type="number"
                                          :rules="numberRules"></v-text-field>
                            <span>Habilitar / Deshabilitar</span>
                            <v-switch v-model="editadoProduct.is_active"/>
                            
                            <v-card-text>
                            
                                <v-btn raised class="primary" @click="onPickFileProduct">Subir imagen</v-btn>
                                <input type="file" style="display: none" ref="fileInput" accept="image/jpeg"
                                       @change="onFilePickedProduct"  required :rules="rulesImage" />
                               <!-- <v-file-input label="File input" accept="image/jpeg"
                                 required :rules="rulesImage"></v-file-input>-->
                            </v-card-text>

                            <v-layout>
                                <img :src="editadoProduct.imageUrl" height="150"/>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarProductoOriginal">Cancelar
                        </v-btn>
                        <v-btn :disabled="!valid" color="teal accent-4" class="ma-2 white--text" @click="guardarProductoOriginal">Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <!-- Fin modal agregar producto -->
        <!-- Modal agregar mision -->
        <v-dialog v-model="dialogMision" max-width="500px">
            <template v-slot:activator="{ on }"></template>
            <v-card>
                <!-- para el EDICION-->
                <v-card-title class="cyan white--text">
                    <span class="headline">{{ formTitleMision }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>

                        <v-text-field v-model="editadoMision.name" label="Nombre"></v-text-field>

                        <v-text-field v-model="editadoMision.description" label="Descripción"></v-text-field>
                        <v-row>
                            <v-col cols="12" lg="6">
                                <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editadoMision.start_date"
                                                label="Fecha Inicio"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="editadoMision.start_date"
                                                   @input="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-menu
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editadoMision.end_date"
                                                label="Fecha Fin"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="editadoMision.end_date"
                                                   @input="menu1 = false"></v-date-picker>
                                </v-menu>

                            </v-col>
                        </v-row>
                        <v-card-text>
                            <v-btn raised class="primary" @click="onPickFileMision">Subir imagen</v-btn>
                            <input type="file" style="display: none" ref="fileInput" accept="image/jpeg"
                                   @change="onFilePickedMision"/>
                        </v-card-text>
                        <v-layout>
                            <img :src="editadoMision.imageUrl" height="150"/>
                        </v-layout>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="cancelarMission">Cancelar</v-btn>
                    <v-btn color="teal accent-4" class="ma-2 white--text" @click="guardarMission">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Modal productos-->
        <v-dialog v-model="dialogProductsMissions" fullscreen hide-overlay transition="dialog-bottom-transition">

            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialogProductsMissions = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <!--<v-toolbar-title>{{ editado.name }} {{ editadoSub.name }}  Productos</v-toolbar-title>-->
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialogProductsMissions = false">Cerrar</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <!--<v-subheader>
                        <v-btn color="success" class="ma-2" dark @click="dialogAddProduct = !dialogAddProduct">Agregar
                            Producto
                        </v-btn>
                    </v-subheader>-->
                    <v-list-item>
                        <v-list-item-content>
                            <v-data-table :headers="headersMissions" :items="missionsProducts" :search="searchMission"
                                          sort-by="id" class="elevation-3">
                                <template v-slot:top>
                                    <!-- Barra de búsqueda  -->
                                    <v-col cols="12" sm="12">
                                        <v-text-field v-model="searchMission" append-icon="search" label="Buscar"
                                                      single-line hide-details></v-text-field>
                                    </v-col>
                                </template>
                                <template v-slot:item.image="{ item }">
                                    <div class="p-2">
                                        <v-img :src="item.image" :alt="item.name" aspect-ratio="1" height="60"></v-img>
                                    </div>
                                </template>
                                <template v-slot:item.action="{ item }">
                                    <v-switch v-if="item.missions.length>0"  value input-value="true" @change="toggleMission(item)"/>
                                    <v-switch v-else v-model="item.action" @change="toggleMission(item)"/>
                                </template>
                            </v-data-table>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

            </v-card>
        </v-dialog>
        <!-- Fin Modal productos-->
        <v-row>

            <v-tabs
                    v-model="tab"
                    background-color="deep-purple accent-4"
                    centered
                    dark
                    icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-1">
                    Categorías
                    <v-icon>mdi-format-list-text</v-icon>
                </v-tab>

                <v-tab href="#tab-2">
                    Misiones
                    <v-icon>mdi-sale</v-icon>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item :key="1" :value="'tab-1'">

                    <v-row>
                        <v-col cols="6">
                            <v-btn color="success" class="ma-2" dark @click="dialog = !dialog">
                                Agregar Categoría
                            </v-btn>
                            <v-container>
                                <v-data-table :headers="headers" :items="categories" :search="search" sort-by="id"
                                              class="elevation-3">

                                    <template v-slot:item.action="{ item }">
                                        <v-btn class="mr-2" fab dark small color="cyan" @click="editarCategoria(item)">
                                            <v-icon dark>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn class="mr-2" fab dark small color="cyan" @click="getSubcategorias(item)">
                                            <v-icon dark>mdi-file-document-box-search</v-icon>
                                        </v-btn>
                                        <v-btn class="mr-2" fab dark small color="error"
                                                @click="borrarCat(item)">
                                            <v-icon dark>mdi-delete</v-icon>
                                        </v-btn>
                                    </template>
                                </v-data-table>
                            </v-container>
                        </v-col>

                        <v-col cols="6">
                            <v-btn color="success" class="ma-2" dark @click="dialogAddSub = !dialogAddSub"
                                   :disabled="customCondition">
                                Agregar Subcategoría
                            </v-btn>

                            <v-card-text>
                                <v-container>
                                    <v-data-table :headers="headersSub" :items="subcategories" :search="search"
                                                  sort-by="id" class="elevation-3">
                                        <!--  Modal del diálogo para Alta y Edicion    -->
                                        <!--  Modal del diálogo para Alta y Edicion    -->

                                        <template v-slot:item.action="{ item }">
                                            <v-btn class="mr-2" fab dark small color="cyan" @click="editarSub(item)">
                                                <v-icon dark>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn class="mr-2" fab dark small color="error"
                                                           @click="borrarSub(item)">
                                                        <v-icon dark>mdi-delete</v-icon>
                                                    </v-btn>
                                            <v-btn class="mr-2" fab dark small color="cyan"
                                                   @click="abrirProducts(item)">
                                                <v-icon dark>mdi-file-document-box-plus</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                </v-container>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item

                        :key="2"
                        :value="'tab-2'"
                >
                    <v-row>

                        <v-btn color="success" class="ma-2" dark @click="dialogMision = !dialogMision">
                            Agregar Misión
                        </v-btn>
                        <v-container>
                            <v-data-table :headers="headersMissions" :items="missions" :search="search" sort-by="id"
                                          class="elevation-3">
                                <template v-slot:item.image="{ item }">
                                    <div class="p-2">
                                        <v-img :src="item.image" :alt="item.name" aspect-ratio="1"></v-img>
                                    </div>
                                </template>
                                <template v-slot:item.action="{ item }">
                                    <v-btn class="mr-2" fab dark small color="cyan" @click="editarMission(item)">
                                        <v-icon dark>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="mr-2" fab dark small color="error"
                                                @click="borrarMission(item)">
                                            <v-icon dark>mdi-delete</v-icon>
                                        </v-btn>
                                    <v-btn class="mr-2" fab dark small color="cyan"
                                           @click="abrirProductsMissions(item)">
                                        <v-icon dark>mdi-file-document-box-search</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                        </v-container>
                    </v-row>
                </v-tab-item>
            </v-tabs-items>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
    import Vue from 'vue'
    import axios from 'axios'
import VDateRange from 'vuetify-daterange-picker'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'


    export default {
        components: { VDateRange },
        name: 'InvoiceForm',

        data() {
            return {
                date: new Date().toISOString().substr(0, 10),
                nowDate: new Date().toISOString().slice(0,10),
                menu1: false,
                modal: false,
                menu2: false,
                snackbar: false,
                textMsg: '',
                timeout: 2000,
                tab: null,
                showSubcategoria: false,
                stores: [],
                categories: [],
                subcategories: [],
                categoriesrelations: [],
                customCondition: true,
                products: [],
                missions: [],
                dates: [],
                mission:'',
                missionsProducts: [],
                editedIndex: -1,
                editedSubIndex: -1,
                editedAddSubIndex: -1,
                editedIndexProducto: -1,
                editedIndexMision: -1,
                editedIndexProductoMission: -1,
                valid: false,
                validPromo:false,
                lazy: false,
                dialog: false,
                dialogSub: false,
                dialogProducts: false,
                dialogAddProduct: false,
                dialogPromoProduct: false,
                dialogMision: false,
                dialogProductsMissions: false,
                start_date:'',
                end_date:'',
                headers: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Categoría',
                        value: 'name'
                    }, {
                        text: '',
                        value: 'action'
                    },
                ],
                headersSub: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Subcategoría',
                        value: 'name'
                    }, {
                        text: '',
                        value: 'action'
                    },
                ],
                headersProd: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Nombre',
                        value: 'name'
                    }, {
                        text: '',
                        value: 'action'
                    },
                ],
                headersCateg: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '10%'
                    }, {
                        text: 'Nombre',
                        value: 'name'
                    }, {
                        text: '',
                        value: 'action'
                    },
                ],
                headersMissions: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '5%'
                    }, {
                        text: 'Nombre',
                        value: 'name',
                        width: '15%'
                    }, {
                        text: 'Descripción',
                        value: 'description',
                        width: '20%'
                    },
                    {
                        text: "Image", value: "image", sortable: false,
                        width: '15%'
                    }
                    , {
                        text: '',
                        value: 'action',
                        width: '20%'
                    },
                ],
                headersProducts: [
                    {
                        text: 'ID',
                        value: 'id',
                        width: '5%'
                    }, {
                        text: 'Nombre',
                        value: 'name',
                        width: '35%'
                    }, {
                        text: 'Descripción',
                        value: 'description',
                        width: '20%'
                    },
                    {
                        text: 'Key',
                        value: 'long_key',
                        width: '20%'
                    }, {
                        text: 'Precio',
                        value: 'pricebusiness',
                        width: '10%'
                    }, {
                        text: 'Contenido',
                        value: 'content',
                        width: '10%'
                    }, {
                        text: 'Unidad',
                        value: 'unit',
                        width: '10%'
                    }, {
                        text: 'Marca',
                        value: 'brand',
                        width: '10%'
                    },

                    {
                        text: "Image", value: "image", sortable: false,
                        width: '15%'
                    }
                    , {
                        text: '',
                        value: 'action',
                        width: '20%'
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
                rulesImage: [
                    value => !!value || 'Archivo requerido',
      value => !value || value.size < 2000000 || 'La imagen tiene que ser menor a 2 MB!',
    ],
                title: this.$route.params.id,
                title2: this.$route.params.idStore,
                search: '', //para el cuadro de búsqueda de datatables
                searchProd: '',
                searchProducts: '',
                searchMission: '',
                dialogProducto: false,
                dialogCategorias: false,
                dialogAddSub: false,
                switchMe: false,
                imageUrl: '',
                editadoCategorias: {
                    business_id: '',
                    store_id: '',
                    category_id: '',
                },
                editadoRelacion: {
                    id: '',
                    name: '',
                    description: '',
                    imageUrl: this.imageUrl,
                    file: '',
                    select: '',
                },
                editadoSub: {
                    id: '',
                    name: '',
                    description: '',
                    imageUrl: this.imageUrl,
                    file: '',
                    select: '',
                },
                editado: {
                    id: '',
                    name: '',
                    description: '',
                    imageUrl: this.imageUrl,
                    file: '',
                    select: '',
                    stock: '',
                    price: '',
                    max_quantity: '',
                    is_active: false,
                    exist: 0,
                    category_id: '',
                    store_id: '',
                    business_id: '',
                },
                defaultItem: {
                    id: '',
                    name: '',
                    description: '',
                    imageUrl: this.imageUrl,
                    file: '',
                    select: '',
                    stock: '',
                    price: '',
                    max_quantity: '',
                    is_active: false,
                    exist: 0,
                    category_id: '',
                    pricebusiness: '',
                    price: '',
                    max_quantity: '',
                },
                editadoProduct: {
                    id: '',
                    name: '',
                    description: '',
                    long_key: '',
                    price: '',
                    content: '',
                    unit: '',
                    brand: '',
                    sales_unit: '',
                    bulk: '',
                    imageUrl: '',
                    idsubcategoria: 0,
                    category_id: '',
                    select: 0,
                    store_id: '',
                    business_id: '',
                    stock: 0,
                    pricebusiness: '',
                    is_active: false,
                    is_mod: false,
                },
                editadoProductPromo: {
                    id: '',
                    start_date: '',
                    end_date: '',
                    idPromo: '',
                    pricePromocion: '',
                    store_id: '',
                    business_id: '',
                    existPromo:0
                },
                defaultProductPromo: {
                    id: '',
                    start_date: '',
                    end_date: '',
                    idPromo: '',
                    pricePromocion: '',
                    store_id: '',
                    business_id: '',
                    existPromo:0
                },
                defaultItemProduct: {
                    id: '',
                    name: '',
                    description: '',
                    long_key: '',
                    price: '',
                    content: '',
                    unit: '',
                    brand: '',
                    sales_unit: '',
                    bulk: '',
                    imageUrl: '',
                    idsubcategoria: 0,
                    category_id: '',
                    select: 0,
                    store_id: '',
                    business_id: '',
                    stock: 0,
                    pricebusiness: '',
                    is_active: false,
                    is_mod: false,
                },
                editadoMision: {
                    id: '',
                    name: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    imageUrl: '',
                    store_id: '',
                    business_id: '',
                    is_active: false,
                    is_mod: false,
                },
                defaultItemMision: {
                    id: '',
                    name: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    imageUrl: '',
                    store_id: '',
                    business_id: '',
                    is_active: false,
                    is_mod: false,
                },
                editadoMisionProduct: {
                    id: '',
                    name: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    imageUrl: '',
                    store_id: '',
                    business_id: '',
                    is_active: false,
                    is_mod: false,
                },
                defaultItemMisionProduct: {
                    id: '',
                    name: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    imageUrl: '',
                    store_id: '',
                    business_id: '',
                    is_active: false,
                    is_mod: false,
                },
            }

        },

        created() {
            this.getstores();
            this.getcategories();
            this.getMissions();

        },
        methods: {
            toggleMission(product) {
                axios.get('/missions/'+this.mission+'/products/'+product.id+'/toggle')
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(response);
                    })
            },
            getstores() {
                axios.get('/infoBusiness/' + this.$route.params.id + '/' + this.$route.params.idStore)
                    .then(response => {
                        this.stores = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            getcategories() {
                axios.get('/CategoriesBusiness/' + this.$route.params.id + '/' + this.$route.params.idStore)
                    .then(response => {
                        this.categories = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            getSubcategorias(item) {
                this.editedSubIndex = this.subcategories.indexOf(item)
                this.editado = Object.assign({}, item)
                this.showSubcategoria = !this.showSubcategoria
                this.customCondition = false
                this.getSubcategories()

            },
            getSubcategories() {
                axios.get('/subcategoriesList?id=' + this.editado.id)
                    .then(response => {
                        this.subcategories = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            getcategoriesrelations() {
                axios.get('/AsociarCategoriesBusiness/' + this.$route.params.id + '/' + this.$route.params.idStore)
                    .then(response => {
                        this.categoriesrelations = response.data.data

                        this.imageUrl = '';
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },

            editar(item) {
                //this.editedSubIndex = this.subcategories.indexOf(item)
                //this.editado = Object.assign({}, item)
                this.dialog = true

                this.getProducts(item.id)

            },
            editarProducto(item) {
                this.editedIndexProducto = this.products.indexOf(item)
                this.editado = Object.assign({}, item)
                this.dialogProducto = true
            },
            cancelar() {
                this.dialogProducto = false
                this.editado = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            },
            guardar() {
                if (this.editado.exist < 2) {
                    //Guarda en caso de Edición
                    console.log('¡Actualización Exitosa!')
                    this.editarProduct()
                } else {

                    console.log('¡Alta exitosa!')
                    this.addProduct()
                }
                this.cancelar()

            },
            editarProduct: function () {
                var idC = this.editado.category_id
                axios.put('/businessproduct/update', this.editado).then(response => {
                    this.getProducts(idC);

                    this.imageUrl = '';
                });
            },
            addProduct: function () {
                var idC = this.editado.category_id
                this.editado.store_id = this.$route.params.idStore
                this.editado.business_id = this.$route.params.id
                axios.post('/businessproduct/add', this.editado).then(response => {
                    this.getProducts(idC);

                    this.imageUrl = '';
                });
            },
            relacionarCat: function () {
                this.dialogCategorias = true
                this.getcategoriesrelations()
            },
            insertarCat(item) {
                this.editedIndexrelations = this.categoriesrelations.indexOf(item)
                this.editadoRelacion = Object.assign({}, item)
                this.dialogCategorias = true
                this.insertCategorias()
            },
            insertCategorias: function () {
                this.editadoCategorias.category_id = this.editadoRelacion.id;
                this.editadoCategorias.store_id = this.$route.params.idStore
                this.editadoCategorias.business_id = this.$route.params.id
                axios.post('/categories/updateBusinessCategory', this.editadoCategorias).then(response => {
                    this.getcategoriesrelations();
                    this.getcategories();

                    this.imageUrl = '';
                });
            },

            ///Nuevas funciones

            cancelarCategorie() {
                this.dialog = false
                this.editado = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            },

            guardarCategorie() {
                if (this.editedIndex > -1) {
                    //Guarda en caso de Edición
                    this.snackbar = true
                    this.textMsg = '¡Actualización Exitosa!'
                    this.editarCategorie()
                } else {
                    //Guarda el registro en caso de Alta
                    this.snackbar = true
                    this.textMsg = '¡Alta exitosa!'
                    this.altaCategorie()

                    this.imageUrl = '';

                }
                this.cancelarCategorie()
            },
            altaCategorie: function () {
                this.editado.store_id = this.$route.params.idStore
                this.editado.business_id = this.$route.params.id
                axios.post('/categories/addAsociar', this.editado).then(response => {
                    this.getcategoriesrelations();
                    this.getcategories();

                    this.imageUrl = '';
                });
                this.name = "",
                    this.description = ""
            },
            editarCategorie: function () {
                axios.put('/categories/update', this.editado).then(response => {
                    this.getcategoriesrelations();
                    this.getcategories();

                    this.imageUrl = '';
                });
            },
            editarCategoria(item) {
                console.log(item)
                this.editedIndex = this.categories.indexOf(item)

                console.log(this.editedIndex)
                this.editado = Object.assign({}, item)
                this.dialog = true


            },
            cancelarSub() {
                this.dialogAddSub = false
                this.editadoSub = Object.assign({}, this.defaultItem)
                this.editedAddSubIndex = -1
            },
            editarSub(item) {
                this.editedAddSubIndex = this.subcategories.indexOf(item)
                this.editadoSub = Object.assign({}, item)
                this.dialogAddSub = true

            },
            guardarSub() {
                console.log(this.editedAddSubIndex)
                if (this.editedAddSubIndex > -1) {
                    //Guarda en caso de Edición

                    console.log('¡Actualización Exitosa!')
                    this.editarSubCat()
                } else {
                    console.log('¡Agregado Exitosa!')
                    this.altaSubCat();
                }
                this.cancelarSub()
            },
            altaSubCat: function () {
                console.log(this.editado.id)
                this.editadoSub.category_id = this.editado.id
                axios.post('/categories/addSub', this.editadoSub).then(response => {
                    this.getSubcategories();

                    this.imageUrl = '';
                });
                this.name = ""
                this.description = ""
            },
            editarSubCat: function () {
                console.log(this.editado.id)
                this.editadoSub.category_id = this.editado.id
                axios.put('/categories/updateSub', this.editadoSub).then(response => {
                    this.getSubcategories();

                    this.imageUrl = '';
                });
                this.name = ""
                this.description = ""
            },
            borrarSub(item) {
                const index = this.subcategories.indexOf(item)
                this.editadoSub = Object.assign({}, item)
                console.log(this.subcategories[index].id) //capturo el id de la fila seleccionada
                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteSubCat()
                    this.snackbar = true
                    this.textMsg = 'Se eliminó el registro.'
                } else {
                    this.snackbar = true
                    this.textMsg = 'Operación cancelada.'
                }
            },
            deleteSubCat: function () {
                console.log(this.editadoSub)
                axios.put('/categories/deleteSub', this.editadoSub).then(response => {
                    this.getSubcategories();
                });
                this.name = "",
                    this.description = ""
            },
            borrarCat(item) {
                const index = this.categories.indexOf(item)
                this.editado = Object.assign({}, item)
                console.log(this.categories[index].id) //capturo el id de la fila seleccionada
                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteCat()
                    this.snackbar = true
                    this.textMsg = 'Se eliminó el registro.'
                } else {
                    this.snackbar = true
                    this.textMsg = 'Operación cancelada.'
                }
            },
            deleteCat: function () {
                axios.put('/categories/delete', this.editado).then(response => {
                    this.getcategories();
                });
                this.name = "",
                    this.description = ""
            },
            borrarMission(item) {
                const index = this.missions.indexOf(item)
                this.editadoMision = Object.assign({}, item)
                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteMission()
                    this.snackbar = true
                    this.textMsg = 'Se eliminó el registro.'
                } else {
                    this.snackbar = true
                    this.textMsg = 'Operación cancelada.'
                }
            },
            deleteMission: function () {
                axios.put('/businessMissions/delete', this.editadoMision).then(response => {
                    this.getMissions();
                });
                this.name = "",
                    this.description = ""
            },

            
            abrirProducts(item) {
                this.editedAddSubIndex = this.subcategories.indexOf(item)
                this.editadoSub = Object.assign({}, item)
                this.dialogProducts = true
                this.getProducts(item.id)
            },
            getProducts(id) {
                console.log('/productBusiness/' + id + '/' + this.$route.params.idStore + '/' + this.$route.params.id)
                axios.get('/productBusiness/' + id + '/' + this.$route.params.idStore + '/' + this.$route.params.id)
                    .then(response => {                        
                        this.imageUrl = '';
                        this.products = response.data.data
                        console.log(this.products)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            editarProductoOriginal(item) {
                this.editedIndexProducto = this.products.indexOf(item)
                this.editadoProduct = Object.assign({}, item)
                this.dialogAddProduct = true
                this.editadoProduct.is_mod = false
                console.log(this.editadoProduct)
            },
            PromocionProductoOriginal(item) {                
                this.editadoProductPromo = Object.assign({}, item)
                this.dialogPromoProduct = true
            },
            borrarProductoOriginal(item) {
                const index = this.products.indexOf(item)
                this.editadoProduct = Object.assign({}, item)
                console.log(this.products[index].id) //capturo el id de la fila seleccionada
                var r = confirm("¿Está seguro de borrar el registro?");
                if (r == true) {
                    this.deleteProductOriginal()
                }
            },
            cancelarProductoOriginal(item) {
                this.editedIndexProducto = -1
                this.editadoProduct = Object.assign({}, this.defaultItemProduct)
                this.dialogAddProduct = false
            },
            guardarProductoOriginal() {

                if (this.editedIndexProducto > -1) {
                    //Guarda en caso de Edición
                    console.log('¡Actualización Exitosa!')
                    console.log(this.editadoProduct)
                    this.editarProductOriginal()
                } else {
                    //Guarda el registro en caso de Alta

                    this.textMsg = '¡Alta exitosa!'
                    this.addProductOriginal()
                }
                this.cancelarProductoOriginal()
            },
            editarProductOriginal: function () {
                var idC = this.editadoProduct.category_id
                this.editadoProduct.store_id = this.$route.params.idStore
                this.editadoProduct.business_id = this.$route.params.id
                this.editadoProduct.category_id = this.editadoSub.id

                axios.put('/product/update', this.editadoProduct).then(response => {
                    this.snackbar = true;
                    this.textMsg = "¡Producto actualizado correctamente!";
                    this.getProducts(idC);
                });
                this.name = "",
                    this.description = ""
            },
            addProductOriginal: function () {

                var idC = this.editadoSub.id
                this.editadoProduct.store_id = this.$route.params.idStore
                this.editadoProduct.business_id = this.$route.params.id
                this.editadoProduct.category_id = this.editadoSub.id

                axios.post('/product/add', this.editadoProduct).then(response => {
                    this.snackbar = true;
                    this.textMsg = "¡Producto agregado correctamente!";
                    this.getProducts(idC);
                });
            },
            deleteProductOriginal: function () {
                var idC = this.editadoProduct.category_id
                axios.put('/product/delete', this.editadoProduct).then(response => {
                    this.snackbar = true;
                    this.textMsg = "¡Producto eliminado correctamente!";
                    this.getProducts(idC);
                });

            },
            AsociarCategorias: function () {
                this.editadoCategorias.category_id = this.editado.id;
                this.editadoCategorias.store_id = this.$route.params.idStore
                this.editadoCategorias.business_id = this.$route.params.id
                axios.post('/categories/updateBusinessCategory', this.editadoCategorias).then(response => {
                    this.getcategoriesrelations();
                    this.getcategories();
                });
            },

            getMissions() {
                axios.get('/getMissionBusiness/' + this.$route.params.idStore + '/' + this.$route.params.id)
                    .then(response => {
                        console.log(response.data.data)
                        this.missions = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            guardarMission() {

                if (this.editedIndexMision > -1) {
                    //Guarda en caso de Edición
                    console.log('¡Actualización Exitosa!')
                    console.log(this.editadoMision)
                    this.editarGuardarMission()
                } else {
                    //Guarda el registro en caso de Alta

                    this.textMsg = '¡Alta exitosa!'
                    this.addGuardarMission()
                }
                this.cancelarMission()
            },
            editarGuardarMission: function () {

                this.editadoMision.store_id = this.$route.params.idStore
                this.editadoMision.business_id = this.$route.params.id

                axios.put('/businessMissions/update', this.editadoMision).then(response => {
                    this.snackbar = true;
                    this.textMsg = "¡Producto actualizado correctamente!";
                    this.getMissions();
                });

            },
            addGuardarMission: function () {

                this.editadoMision.store_id = this.$route.params.idStore
                this.editadoMision.business_id = this.$route.params.id

                axios.post('/businessMissions/add', this.editadoMision).then(response => {
                    this.snackbar = true;
                    this.textMsg = "¡Agregado correctamente!";
                    this.getMissions();
                });
            },

            editarMission(item) {
                console.log(item)
                this.editedIndexMision = this.missions.indexOf(item)

                console.log(this.editadoMision)
                this.editadoMision.imageUrl = this.image
                this.editadoMision = Object.assign({}, item)
                this.dialogMision = true
            },
            cancelarMission(item) {
                this.editedIndexMision = -1
                this.editadoMision = Object.assign({}, this.defaultItemMision)
                this.dialogMision = false
            },

            abrirProductsMissions(item) {
                this.editedIndexProductoMission = this.missions.indexOf(item)
                this.editadoMision = Object.assign({}, item)
                this.dialogProductsMissions = true
                this.getProductsMission(item.id)
            },
            getProductsMission(id) {
                this.mission=id
                axios.get('/ProductsMissionsBusiness/' + id + '/' + this.$route.params.idStore + '/' + this.$route.params.id)
                    .then(response => {
                        console.log(response.data.data)
                        this.missionsProducts = response.data.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },

            /*++++++++++++++++++++++++*/

            guardarProductoPromo() {

                if (this.editadoProductPromo.existPromo > 0) {
                    //Guarda en caso de Edición
                    console.log('¡Actualización Exitosa!')
                    this.editarProductPromo()
                } else {
                    //Guarda el registro en caso de Alta
                    this.textMsg = '¡Alta exitosa!'
                    this.addProductPromo()
                }
                this.cancelarProductoPromo()
            },
            editarProductPromo: function () {
                var idC = this.editadoProductPromo.category_id
                this.editadoProductPromo.store_id = this.$route.params.idStore
                this.editadoProductPromo.business_id = this.$route.params.id
                this.editadoProductPromo.category_id = this.editadoSub.id
                console.log(this.editadoProductPromo)
                
                axios.put('/promoproduct/update', this.editadoProductPromo).then(response => {
                    this.snackbar = true;
                    this.textMsg = "¡Promoción actualizada correctamente!";
                    this.getProducts(idC);
                });
            },
            addProductPromo: function () {

                var idC = this.editadoProductPromo.category_id
                this.editadoProductPromo.store_id = this.$route.params.idStore
                this.editadoProductPromo.business_id = this.$route.params.id
                this.editadoProductPromo.category_id = this.editadoSub.id
                console.log(this.editadoProductPromo)
                

                axios.post('/promoproduct/add', this.editadoProductPromo).then(response => {
                    this.snackbar = true;
                    this.textMsg = "¡Promoción agregada correctamente!";
                    this.getProducts(idC);
                });
            },

            cancelarProductoPromo(item) {
                this.editadoProductPromo = Object.assign({}, this.defaultProductPromo)
                this.dialogPromoProduct = false
            },

            /*++++++++++++++++++++++++*/

            onPickFile() {
                this.$refs.fileInput.click()
            },
            onFilePicked(event) {
                const files = event.target.files
                let filename = files[0].name

                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                    this.editado.imageUrl = fileReader.result

                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            },

            onPickFileProduct() {
                this.$refs.fileInput.click()
            },
            onFilePickedProduct(event) {
                const files = event.target.files
                let filename = files[0].name
                console.log(this.editadoProduct)
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                    this.editadoProduct.imageUrl = fileReader.result
                    this.editadoProduct.is_mod = true
                    console.log(this.editadoProduct)
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            },

            onPickFileMision() {
                this.$refs.fileInput.click()
            },
            onFilePickedMision(event) {
                const files = event.target.files
                let filename = files[0].name
                console.log(this.editadoMision)
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                    this.editadoMision.imageUrl = fileReader.result
                    this.editadoMision.is_mod = true
                    console.log(this.editadoMision)
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            },

        },
        computed: {
           /* getStartDate() {
                            var nowDate = new Date(this.date.getFullYear(), this.date.getMonth(), 10);
                            return nowDate.toISOString().slice(0,10)
                        },*/
            // ...mapGetters('auth', ['can'])
            //Dependiendo si es Alta o Edición cambia el título del modal
            formTitle() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedIndex === -1 ? 'Agregar Categoría' : 'Editar Categoria'
            },

            formTitleAddSub() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedAddSubIndex === -1 ? 'Agregar subcategoría' : 'Editar subcategoría'
            },

            formTitleAddProduct() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedIndexProducto === -1 ? 'Agregar producto' : 'Editar producto'
            },
            formTitleMision() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedIndexMision === -1 ? 'Agregar Misión' : 'Editar Misión'
            },

            formTitleProductMision() {
                //operadores condicionales "condición ? expr1 : expr2"
                // si <condicion> es true, devuelve <expr1>, de lo contrario devuelve <expr2>
                return this.editedIndexProductoMission === -1 ? 'Agregar Producto/Misión' : 'Editar Producto/Misión'
            },


        },
    }
</script>

