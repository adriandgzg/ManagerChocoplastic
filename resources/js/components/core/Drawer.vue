<template>
  <v-navigation-drawer id="app-drawer" v-model="inputValue" app width="260" :src="background">
    <v-img :gradient="sidebarOverlayGradiant" height="100%">
      <v-list dense nav>
        <v-list-item>
          <v-list-item-avatar color="white">
            <v-img :src="logo" height="34" contain />
          </v-list-item-avatar>

          <v-list-item-title class="title">Chocoplastic</v-list-item-title>
        </v-list-item>
                
              

       <v-list-group prepend-icon="account_circle" no-action>        
          <template v-slot:activator>          
            <v-list-item-title>Proveedores</v-list-item-title>
          </template>
          <v-list-item href="/purchaseorderslist">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Ordenes de Compra</v-list-item-title>
        </v-list-item>  
        <v-list-item href="/purchaselist">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Compras</v-list-item-title>
        </v-list-item>  
        <v-list-item href="/providerdebts">
          <v-list-item-action>
            <v-icon>mdi-tag</v-icon>
          </v-list-item-action>
          <v-list-item-title>Cuentas por cobrar</v-list-item-title>
        </v-list-item>
        
       </v-list-group>

        <v-list-group prepend-icon="account_circle" no-action>        
          <template v-slot:activator>          
            <v-list-item-title>Clientes</v-list-item-title>
          </template>

          <v-list-item href="/clientdebts">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-title>Cuentas por Cobrar</v-list-item-title>
          </v-list-item>

           <v-list-item href="/orders">
              <v-list-item-action>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-action>
              <v-list-item-title>Ordenes</v-list-item-title>
            </v-list-item>
          
          <v-list-item href="/sales">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-title>Venta (Cobro)</v-list-item-title>
          </v-list-item>

        </v-list-group>


        
        
        <v-list-group prepend-icon="account_circle" no-action>        
          <template v-slot:activator>          
            <v-list-item-title>Catalogos</v-list-item-title>
          </template>

          <v-list-item href="/products">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Productos</v-list-item-title>
        </v-list-item>

          <v-list-item href="/proveedores">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Proveedores</v-list-item-title>
        </v-list-item>
        <v-list-item href="/frequents">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Productos Frecuentes</v-list-item-title>
        </v-list-item>

        <v-list-item href="/userlist">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item>

        <v-list-item href="/clients">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>

        <v-list-item href="/admins">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Administración</v-list-item-title>
        </v-list-item>

        

        <v-list-item href="/stores">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Tiendas</v-list-item-title>
        </v-list-item>
        <v-list-item href="/categoriesView">
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-title>Categorias</v-list-item-title>
        </v-list-item>
          <v-list-item href="/measurementsView">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-title>Medidas</v-list-item-title>
          </v-list-item>
          <v-list-item href="/entities">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-title>Entidades Federativas</v-list-item-title>
          </v-list-item>
          <v-list-item href="/paymentmethods">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-title>Metodos de Pago</v-list-item-title>
          </v-list-item>
          <v-list-item href="/paymentshapes ">
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-title>Formas de Pago</v-list-item-title>
          </v-list-item>

            
          </v-list-group>
          <v-list-item href="/logout">
              <v-list-item-action>
                <v-icon>mdi-group</v-icon>
              </v-list-item-action>
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item>
      </v-list>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    logo: "/images/logo_chocoplastic_miniatura.png",
    links: [
      {
        to: "/admins",
        icon: "mdi-chart-bubble",
        text: "Administración",
        access: "admin"
      },
      {
        to: "/stores",
        icon: "mdi-chart-bubble",
        text: "Tiendas",
        access: ""
      },
      {
        to: "/sales",
        icon: "mdi-cart",
        text: "Ventas",
        access: "users"
      },
      {
        to: "/coverage",
        icon: "mdi-shape-polygon-plus",
        text: "Coberturas",
        access: "admin"
      },
      {
        to: "/user-profile",
        icon: "mdi-account",
        text: "Perfil",
        access: "user"
      },
      {
        to: "/table",
        icon: "mdi-group",
        text: "Tablas"
      },
      {
        to: "/maps",
        icon: "mdi-map-marker",
        text: "Mapa"
      },
      {
        to: "/notifications",
        icon: "mdi-bell",
        text: "Notificaciones"
      }
    ],
    linksAdmin: [
      {
        to: "/admins",
        icon: "mdi-chart-bubble",
        text: "Administración",
        access: "admin"
      },
      {
        to: "/stores",
        icon: "mdi-chart-bubble",
        text: "Tiendas",
        access: "storemanager"
      },
      {
        to: "/stores",
        icon: "mdi-chart-bubble",
        text: "Tiendas",
        access: "admin"
      },
      {
        to: "/sales",
        icon: "mdi-cart",
        text: "Ventas",
        access: "admin"
      },
      {
        to: "/salesbusiness",
        icon: "mdi-cart",
        text: "Ventas Negocio",
        access: "storemanager"
      },
      {
        to: "/coverage",
        icon: "mdi-shape-polygon-plus",
        text: "Coberturas",
        access: "admin"
      },
      {
        to: "/userlist",
        icon: "mdi-shape-polygon-plus",
        text: "Administración",
        access: "admin"
      }
    ],
    responsive: false,
    user: "",
    admin: ""
  }),
  computed: {
    ...mapState("app", ["image", "color"]),
    ...mapGetters("auth", ["can"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    },
    background: {
      get() {
        return this.$store.state.app.image;
      }
    },
    items() {
      return this.$t("Layout.View.items");
    },
    sidebarOverlayGradiant() {
      return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`;
    }
  },
  created() {
    this.getUser();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getUser() {
      axios
        .get("/listUser")
        .then(response => {
          this.user = response.data.data;
          console.log(this.user);
          this.getRol(this.user.id);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getRol(id) {
      axios
        .get("/rolUser/" + id)
        .then(response => {
          this.admin = response.data.data;
          //console.log('kkkk-> ' +  this.admin.permission_id)
        })
        .catch(e => {
          console.log(e);
        });
    },
    ...mapMutations("app", ["setDrawer", "toggleDrawer"])
  }
};
</script>

<style lang="scss">
#app-drawer {
  .v-list__item {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 100%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }

  div.v-responsive.v-image > div.v-responsive__content {
    overflow-y: auto;
  }
}
</style>
