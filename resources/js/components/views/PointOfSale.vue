<template>
<v-container>
    <v-row>
        <v-col >
            <v-card>
                <v-card-title class="subheading font-weight-bold">No. Pedido: 10000003251</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="category d-inline-flex font-weight-light">
                    <span class="subheading font-weight-bold">Nombre</span>&nbsp; Juan Pérez López
                </v-card-text>
                <v-card-text class="category d-inline-flex font-weight-light">
                    <span class="subheading font-weight-bold">Vendedor</span>&nbsp; Carlos Jiménez Martinez
                </v-card-text>
                <v-card-text class="category d-inline-flex font-weight-light">
                    <span class="subheading font-weight-bold">Fecha</span>&nbsp; 10/10/2020
                </v-card-text>
                
            <br/>            
            </v-card>
            <v-card justify="end">
                    <v-btn dark color="danger"  @click="dialog = !dialog">CANCELAR PEDIDO</v-btn>                
                    <v-btn dark color="warning"  @click="dialog = !dialog">CREDITO</v-btn>                
                    <v-btn dark color="success"  @click="dialog = !dialog">CONTADO</v-btn>                
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
                            <th class="text-left">Unidad de medida</th>
                            <th class="text-left">Cantidad</th>
                            <th class="text-left">Precio de venta</th>
                            <th class="text-left">Importe</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.um }}</td>
                            <td>{{ item.cantidad }}</td>
                            <td>{{ item.precio }}</td>
                            <td>{{ item.importe }}</td>
                            <td>
                                <v-icon small class="mr-2">mdi-pencil</v-icon>
                                <v-icon small>mdi-delete</v-icon>
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td> Subtotal</td>
                            <td>$950.00</td>
                            <td/>
                        </tr>
                        <tr>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td> Envio</td>
                            <td>$50.00</td>
                            <td/>
                        </tr>
                        </tbody>
                        <tfoot>
                        
                            <tr>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td> Total a Pagar</td>
                            <td>$1,000.00</td>
                        </tr>
                        </tfoot>
                    </template>
                </v-simple-table>
            </v-card>
        </v-col>
    </v-row>

     <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title>
                    Motivo de cancelación
                </v-card-title>
                <v-card-text>
                    <v-select flat hide-details small clearable
                              item-text="name" item-value="id"
                              label="Seleccione una opción">
                    </v-select>
                    <v-btn  @click="dialog = !dialog">Cancelar</v-btn>
                    <v-btn  @click="dialog = !dialog" color="primary">Confirmar</v-btn>
                </v-card-text>
            </v-card>

        </v-dialog>

</v-container>
</template>

<script>
    import {mapGetters} from "vuex";
    export default {
        data() {
            return {
                dialog: false,
                desserts: [
                                {
                                id:1000,
                                name: 'Frozen Yogurt',
                                um:'CI',
                                cantidad: 13,
                                precio: '100.00',
                                importe: '1,300.00',
                                },
                                {
                                id:1001,
                                name: 'Ice cream sandwich',
                                um:'CI',
                                cantidad: 13,
                                precio: '100.00',
                                importe: '1,300.00',
                                },
                                {
                                    id:1002,
                                name: 'Eclair',
                                um:'CI',
                                cantidad: 13,
                                precio: '100.00',
                                importe: '1,300.00',
                                },                                
                            ],
            }
        }
    }
    </script>
