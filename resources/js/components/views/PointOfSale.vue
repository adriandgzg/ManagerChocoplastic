<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-text-field label="Ingresar No. Pedido:"></v-text-field>

          <v-card-title class="subheading font-weight-bold">No. Pedido: 10000003251</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-card-text class="category d-inline-flex font-weight-light">
                <span class="subheading font-weight-bold">Cliente:</span>&nbsp; Juan Pérez López
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

        </v-card>
        <v-card justify="end">
          <v-btn dark color="danger" @click="dialog = !dialog">CANCELAR PEDIDO</v-btn>
          <v-btn dark color="warning" @click="dialogcredito = !dialogcredito">CRÉDITO</v-btn>
          <v-btn dark color="success" @click="dialogcontado = !dialogcontado">CONTADO</v-btn>
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
                  <th class="text-left">#</th>
                  <th class="text-left">ID</th>
                  <th class="text-left">Producto</th>
                  <th class="text-left">Unidad Medida</th>
                  <th class="text-left">Cantidad</th>
                  <th class="text-left">Precio</th>
                  <th class="text-left">Importe</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.num }}</td>
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.um }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>{{ item.precio }}</td>
                  <td>{{ item.importe }}</td>
                  <td>
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                    <v-icon @click="dialogdelete = !dialogdelete" small>mdi-delete</v-icon>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>Subtotal</td>
                  <td>$1, 540.00</td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>Total Descuento</td>
                  <td>$0.00</td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>Total I.E.P.S.</td>
                  <td>$0.00</td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>Total I.V.A.</td>
                  <td>$246.4‬0</td>
                  <td />
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>Total</td>
                  <td>$1,786.40</td>
                </tr>
              </tfoot>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Motivo de Cancelación:</v-card-title>
        <v-card-text>
          <v-text-field label="Ejemplo: El cliente cancelo por..."></v-text-field>

          <v-btn @click="dialog = !dialog">Cancelar</v-btn>
          <v-btn @click="dialog = !dialog" color="danger" class="ma-2 white--text">Confirmar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogcredito" max-width="500">
      <v-card>
        <v-card-title>Comentario Crédito:</v-card-title>
        <v-card-text>
          <v-text-field label="Ejemplo: Crédito al cliente..."></v-text-field>

          <v-btn @click="dialogcredito = !dialogcredito">Cancelar</v-btn>
          <v-btn @click="dialogcredito = !dialogcredito" color="warning">Confirmar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogcontado" max-width="500">
      <v-card>
        <v-card-title>Contado</v-card-title>
        <v-card-text>
          <v-select
            :items="statuses"
            item-text="name"
            item-value="id"
            filled
            chips
            label="Forma de Pago"
            placeholder="Selecciona Forma de Pago"
          ></v-select>

          <tr>
            <td>Subtotal</td>
            <td>$1, 540.00</td>
            <td />
          </tr>
          <tr>
            <td>Total Descuento</td>
            <td>$0.00</td>
            <td />
          </tr>
          <tr>
            <td>Total I.E.P.S.</td>
            <td>$0.00</td>
            <td />
          </tr>
          <tr>
            <td>Total I.V.A.</td>
            <td>$246.4‬0</td>
            <td />
          </tr>
          <tr>
            <td>Total</td>
            <td>$1,786.40</td>
          </tr>
          <v-btn @click="dialogcontado = !dialogcontado">Cancelar</v-btn>
          <v-btn @click="dialogcontado = !dialogcontado" color="success">Confirmar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogdelete" max-width="500">
      <v-card>
        <v-card-title>Confirmar Eliminación</v-card-title>
        <v-card-text>
          <v-btn @click="dialogdelete = !dialogdelete">Cancelar</v-btn>
          <v-btn @click="dialogdelete = !dialogdelete" color="danger">Confirmar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      dialogcredito: false,
      dialogcontado: false,
      dialogdelete: false,
      statuses: [
        { name: "Efectivo", id: 1 },
        { name: "Tarjeta", id: 2 }
      ],
      desserts: [
        {
          num: 1,
          id: 1000,
          name: "PRODUCTO MENUDEO",
          um: "CJ",
          cantidad: 13,
          precio: "$100.00",
          importe: "$1,300.00"
        },
        {
          num: 2,
          id: 1001,
          name: "ADOBO ANITA 1 KG (CJ.12PZ)",
          um: "PZ",
          cantidad: 2,
          precio: "$20.00",
          importe: "$40.00"
        },
        {
          num: 3,
          id: 1002,
          name: "ADOBO ANITA 110 GR (CJ.50PZ)",
          um: "PZ",
          cantidad: 2,
          precio: "$50.00",
          importe: "$200.00"
        }
      ]
    };
  }
};
</script>
