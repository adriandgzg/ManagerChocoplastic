<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    width="300"
    :src="background"
  >
    <v-img  height="100%">
      <v-list dense nav>
        <v-list-item>
          <v-list-item-avatar color="white">
            <v-img :src="logo" height="34" contain />
          </v-list-item-avatar>

          <v-list-item-title class="title">Chocoplastic</v-list-item-title>
        </v-list-item>

        <v-list-group
          :prepend-icon="link.icon"
          no-action
          v-for="(link, i) in linksChoco"
          :key="i"
          :to="link.to"
          :active-class="color"
          v-if="can(link.access)"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(linkMenu, j) in link.submenu"
            :key="j"
            :to="linkMenu.to"
            :active-class="color"
            v-if="can(linkMenu.access)"
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>{{ linkMenu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="linkMenu.text" />
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-for="(link, k) in submenu"
          :key="k + 100"
          :to="link.to"
          :active-class="color"
          v-if="can(link.access)"
          class="v-list-item"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="link.text" />
        </v-list-item>

        <v-list-group
          :prepend-icon="link.icon"
          no-action
          v-for="(link, i) in linksTraspasos"
          :key="i + 1000"
          :to="link.to"
          :active-class="color"
          v-if="can(link.access)"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(linkMenu, j) in link.submenu"
            :key="j"
            :to="linkMenu.to"
            :active-class="color"
            v-if="can(linkMenu.access)"
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>{{ linkMenu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="linkMenu.text" />
          </v-list-item>
        </v-list-group>

        <v-list-group
          :prepend-icon="link.icon"
          no-action
          v-for="(link, i) in linksCatalogos"
          :key="i + 200"
          :to="link.to"
          :active-class="color"
          v-if="can(link.access)"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(linkMenu, j) in link.submenu"
            :key="j"
            :to="linkMenu.to"
            :active-class="color"
            v-if="can(linkMenu.access)"
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>{{ linkMenu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="linkMenu.text" />
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

    linksChoco: [
      {
        icon: "mdi-account-group",
        text: "Proveedores",
        access: "providers",
        submenu: [
          {
            to: "/purchaseorderslist",
            icon: "mdi-format-list-numbered",
            text: "Órdenes de Compra",
            access: "purchaseorderslist",
          },
          {
            to: "/purchaselist",
            icon: "mdi-cart-plus",
            text: "Compras",
            access: "purchaselist",
          },
          {
            to: "/providerdebts",
            icon: "mdi-currency-usd-off",
            text: "Cuentas por Pagar",
            access: "providerdebts",
          },
          {
            to: "/providersreturnlist",
            icon: "mdi-basket-unfill",
            text: "Devoluciones",
            access: "providersreturnlist",
          },
        ],
      },
      {
        icon: "account_circle",
        text: "Clientes",
        access: "clients",
        submenu: [
          {
            to: "/orders",
            icon: "mdi-cart-arrow-down",
            text: "Pedidos del día",
            access: "orders",
          },
          {
            to: "/ordersday",
            icon: "mdi-cart-arrow-down",
            text: "Pedidos",
            access: "ordersday", 
          },
          {
            to: "/ordersfiltered",
            icon: "mdi-cart-plus",
            text: "Pedidos (Filtro)",
            access: "ordersfiltered",
          },
          {
            to: "/sales",
            icon: "mdi-basket",
            text: "Ventas del día", 
            access: "sales",
          },
           {
            to: "/salesday",
            icon: "mdi-basket",
            text: "Ventas",
            access: "salesday",
          },
          {
            to: "/salesfiltered",
            icon: "mdi-basket-outline",
            text: "Ventas (Filtro)",
            access: "salesfiltered",
          },
          {
            to: "/clientdebts",
            icon: "mdi-currency-usd",
            text: "Cuentas por Cobrar",
            access: "clientdebts",
          },
          {
            to: "/clientsreturnlist",
            icon: "mdi-cart-arrow-up",
            text: "Devoluciones",
            access: "clientsreturnlist",
          },
        ],
      },
      {
        icon: "mdi-finance",
        text: "Reportes",
        access: "reports",
        submenu: [
          {
            to: "/reportinventorymovements",
            icon: "mdi-file-chart",
            text: "Kardex",
            access: "reportinventorymovements",
          },
          {
            to: "/reportinventorystore",
            icon: "mdi-file-chart",
            text: "Inventario por Sucursal",
            access: "reportinventorystore",
          },
          {
            to: "/reportclientcatalog",
            icon: "mdi-file-chart",
            text: "Catálogo Cliente",
            access: "reportclientcatalog",
          },
          {
            to: "/reportclientdebt",
            icon: "mdi-file-chart",
            text: "Cuentas por Cobrar ",
            access: "reportclientdebt",
          },
          {
            to: "/reportclientpayment",
            icon: "mdi-file-chart",
            text: "Bitácora de Abonos",
            access: "reportclientpayment",
          },
          {
            to: "/reportprovidercatalog",
            icon: "mdi-file-chart",
            text: "Catálogo Proveedor ",
            access: "reportprovidercatalog",
          },
          {
            to: "/reportproviderdebt",
            icon: "mdi-file-chart",
            text: "Cuentas por Pagar ",
            access: "reportproviderdebt",
          },
          {
            to: "/reportproviderpayment",
            icon: "mdi-file-chart",
            text: "Bitácora de Pagos ",
            access: "reportproviderpayment",
          },
          {
            to: "/reportproviderpurchaseorder",
            icon: "mdi-file-chart",
            text: "Órdenes de Compra",
            access: "reportproviderpurchaseorder",
          },
          {
            to: "/reportproviderpurchase",
            icon: "mdi-file-chart",
            text: "Compras ",
            access: "reportproviderpurchase",
          },
          {
            to: "/reportclientreturndetail",
            icon: "mdi-file-chart",
            text: "Devoluciones",
            access: "reportclientreturndetail",
          },
          {
            to: "/reportclientorder", 
            icon: "mdi-file-chart",
            text: "Pedidos ",
            access: "reportclientorder",
          },
          {
            to: "/reportclientsale",
            icon: "mdi-file-chart",
            text: "Ventas",
            access: "reportclientsale",
          },
          {
            to: "/reportclientsaleman", 
            icon: "mdi-file-chart",
            text: "Vendedores",
            access: "reportclientsaleman",
          },
          {
            to: "/reportproductcatalog",
            icon: "mdi-file-chart",
            text: "Catálogo Producto",
            access: "reportproductcatalog",
          },
          {
            to: "/reportproductvariation", 
            icon: "mdi-file-chart",
            text: "Producto Variaciones ",
            access: "reportproductvariation",
          },
        ],
      },
    ],
    submenu: [
      {
        to: "/boxcutlist",
        icon: "mdi-cash-register",
        text: "Cajas",
        access: "box",
      },
      {
        to: "/inventory",
        icon: "mdi-store",
        text: "Inventarios",
        access: "inventory",
      },
    ],

    linksTraspasos: [
      {
        icon: "mdi-swap-horizontal-bold",
        text: "Traspasos",
        access: "transfer",
        submenu: [
          {
            to: "/transferlist",
            icon: "mdi-archive-arrow-up",
            text: "Traspasos",
            access: "transferlist",
          },
          {
            to: "/transferdetail/0",
            icon: "mdi-archive-arrow-down",
            text: "Solicitar Traspaso",
            access: "transferdetail",
          },
          {
            to: "/mytransferlist",
            icon: "mdi-archive-outline",
            text: "Mis Solicitudes Traspasos",
            access: "mytransferlist",
          },
        ],
      },
    ],

    linksCatalogos: [
      {
        icon: "mdi-safe-square",
        text: "Catálogos",
        access: "admin",
        submenu: [
          {
            to: "/admins",
            icon: "mdi-shield-key",
            text: "Administración",
            access: "admin",
          },
          {
            to: "/categoriesView",
            icon: "mdi-playlist-check",
            text: "Categorías",
            access: "admin",
          },
          {
            to: "/clients",
            icon: "mdi-account-multiple",
            text: "Clientes",
            access: "admin",
          },
          {
            to: "/entities",
            icon: "mdi-map",
            text: "Entidades Federativas",
            access: "admin",
          },
          {
            to: "/paymentshapes",
            icon: "mdi-cash-multiple",
            text: "Formas de Pago",
            access: "admin",
          },
          {
            to: "/measurementsView",
            icon: "mdi-ruler",
            text: "Medidas",
            access: "admin",
          },
          {
            to: "/paymentmethods",
            icon: "mdi-wallet",
            text: "Métodos de Pago",
            access: "admin",
          },
          {
            to: "/returnmotives",
            icon: "mdi-playlist-remove",
            text: "Motivo de Devolución",
            access: "admin",
          },
          {
            to: "/products",
            icon: "mdi-bottle-soda",
            text: "Productos",
            access: "admin",
          },
          {
            to: "/proveedores",
            icon: "mdi-briefcase-account",
            text: "Proveedores",
            access: "admin",
          },
          {
            to: "/frequents",
            icon: "mdi-tag",
            text: "Productos Frecuentes",
            access: "admin",
          },
          {
            to: "/stores",
            icon: "mdi-domain",
            text: "Tiendas",
            access: "admin",
          },
          {
            to: "/userlist",
            icon: "mdi-account",
            text: "Usuarios",
            access: "admin",
          },
        ],
      },
    ],

    responsive: false,
    userDrawer: "",
    adminDrawer: "",
  }),
  computed: {
    ...mapState("app", ["image", "color"]),
    ...mapGetters("auth", ["can", "user"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      },
    },
    background: {
      get() {
        return this.$store.state.app.image;
      },
    },
    items() {
      return this.$t("Layout.View.items");
    },
    sidebarOverlayGradiant() {
      return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`;
    },
  },
  created() {
    this.getUser();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    getUser() {
       if(this.$store.getters['auth/user']==null){
          axios
              .get("/listUser")
              .then(response => {
                 this.$store.commit('auth/updateUser', response.data.data)
                 this.getRol(this.$store.getters['auth/user'].id);
              })
              .catch(e => {
                 console.log(e);
              });
       }else{
          this.getRol(this.$store.getters['auth/user'].id);
       }

    },
    getRol(id) {
      axios
        .get("/rolUser/" + id)
        .then((response) => {
          this.adminDrawer = response.data.data;
          //console.log('kkkk-> ' +  this.admin.permission_id)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
  },
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
