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
        icon: "account_circle",
        text: "Proveedores",
        access: "providers",
        submenu: [
          {
            to: "/purchaseorderslist",
            icon: "mdi-chart-bubble",
            text: "Órdenes de Compra",
            access: "purchaseorderslist",
          },
          {
            to: "/purchaselist",
            icon: "mdi-chart-bubble",
            text: "Compras",
            access: "purchaselist",
          },
          {
            to: "/providerdebts",
            icon: "mdi-tag",
            text: "Cuentas por Pagar",
            access: "providerdebts",
          },
          {
            to: "/providersreturnlist",
            icon: "mdi-tag",
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
            icon: "mdi-cart",
            text: "Pedidos del día",
            access: "orders",
          },
          {
            to: "/ordersday",
            icon: "mdi-cart",
            text: "Pedidos",
            access: "ordersday", 
          },
          {
            to: "/ordersfiltered",
            icon: "mdi-cart",
            text: "Pedidos (Filtro)",
            access: "ordersfiltered",
          },
          {
            to: "/sales",
            icon: "mdi-cart",
            text: "Ventas del día", 
            access: "sales",
          },
           {
            to: "/salesday",
            icon: "mdi-cart",
            text: "Ventas",
            access: "salesday",
          },
          {
            to: "/salesfiltered",
            icon: "mdi-cart",
            text: "Ventas (Filtro)",
            access: "salesfiltered",
          },
          {
            to: "/clientdebts",
            icon: "mdi-tag",
            text: "Cuentas por Cobrar",
            access: "clientdebts",
          },
          {
            to: "/clientsreturnlist",
            icon: "mdi-tag",
            text: "Devoluciones",
            access: "clientsreturnlist",
          },
        ],
      },
      {
        icon: "account_circle",
        text: "Reportes",
        access: "reports",
        submenu: [
          {
            to: "/reportinventorymovements",
            icon: "mdi-cart",
            text: "Kardex",
            access: "reportinventorymovements",
          },
          {
            to: "/reportinventorystore",
            icon: "mdi-cart",
            text: "Inventario por Sucursal",
            access: "reportinventorystore",
          },
          {
            to: "/reportclientcatalog",
            icon: "mdi-cart",
            text: "Catálogo Cliente",
            access: "reportclientcatalog",
          },
          {
            to: "/reportclientdebt",
            icon: "mdi-cart",
            text: "Cuentas por Cobrar ",
            access: "reportclientdebt",
          },
          {
            to: "/reportclientpayment",
            icon: "mdi-cart",
            text: "Bitácora de Abonos",
            access: "reportclientpayment",
          },
          {
            to: "/reportprovidercatalog",
            icon: "mdi-cart",
            text: "Catálogo Proveedor ",
            access: "reportprovidercatalog",
          },
          {
            to: "/reportproviderdebt",
            icon: "mdi-cart",
            text: "Cuentas por Pagar ",
            access: "reportproviderdebt",
          },
          {
            to: "/reportproviderpayment",
            icon: "mdi-cart",
            text: "Bitácora de Pagos ",
            access: "reportproviderpayment",
          },
          {
            to: "/reportproviderpurchaseorder",
            icon: "mdi-cart",
            text: "Órdenes de Compra",
            access: "reportproviderpurchaseorder",
          },
          {
            to: "/reportproviderpurchase",
            icon: "mdi-cart",
            text: "Compras ",
            access: "reportproviderpurchase",
          },
          {
            to: "/reportclientreturndetail",
            icon: "mdi-cart",
            text: "Devoluciones",
            access: "reportclientreturndetail",
          },
          {
            to: "/reportclientorder", 
            icon: "mdi-cart",
            text: "Pedidos ",
            access: "reportclientorder",
          },
          {
            to: "/reportclientsale",
            icon: "mdi-cart",
            text: "Ventas",
            access: "reportclientsale",
          },
          {
            to: "/reportclientsaleman", 
            icon: "mdi-cart",
            text: "Vendedores",
            access: "reportclientsaleman",
          },
          {
            to: "/reportproductcatalog",
            icon: "mdi-cart",
            text: "Catálogo Producto",
            access: "reportproductcatalog",
          },
          {
            to: "/reportproductvariation", 
            icon: "mdi-cart",
            text: "Producto Variaciones ",
            access: "reportproductvariation",
          },
        ],
      },
    ],
    submenu: [
      {
        to: "/boxcutlist",
        icon: "mdi-tag",
        text: "Cajas",
        access: "box",
      },
      {
        to: "/inventory",
        icon: "mdi-cart",
        text: "Inventarios",
        access: "inventory",
      },
    ],

    linksTraspasos: [
      {
        icon: "mdi-cart",
        text: "Traspasos",
        access: "transfer",
        submenu: [
          {
            to: "/transferlist",
            icon: "mdi-cart",
            text: "Traspasos",
            access: "transferlist",
          },
          {
            to: "/transferdetail/0",
            icon: "mdi-cart",
            text: "Solicitar Traspaso",
            access: "transferdetail",
          },
          {
            to: "/mytransferlist",
            icon: "mdi-cart",
            text: "Mis Solicitudes Traspasos",
            access: "mytransferlist",
          },
        ],
      },
    ],

    linksCatalogos: [
      {
        icon: "account_circle",
        text: "Catálogos",
        access: "admin",
        submenu: [
          {
            to: "/admins",
            icon: "mdi-chart-bubble",
            text: "Administración",
            access: "admin",
          },
          {
            to: "/categoriesView",
            icon: "mdi-chart-bubble",
            text: "Categorías",
            access: "admin",
          },
          {
            to: "/clients",
            icon: "mdi-chart-bubble",
            text: "Clientes",
            access: "admin",
          },
          {
            to: "/entities",
            icon: "mdi-chart-bubble",
            text: "Entidades Federativas",
            access: "admin",
          },
          {
            to: "/paymentshapes",
            icon: "mdi-chart-bubble",
            text: "Formas de Pago",
            access: "admin",
          },
          {
            to: "/measurementsView",
            icon: "mdi-chart-bubble",
            text: "Medidas",
            access: "admin",
          },
          {
            to: "/paymentmethods",
            icon: "mdi-chart-bubble",
            text: "Métodos de Pago",
            access: "admin",
          },
          {
            to: "/returnmotives",
            icon: "mdi-chart-bubble",
            text: "Motivo de Devolución",
            access: "admin",
          },
          {
            to: "/products",
            icon: "mdi-chart-bubble",
            text: "Productos",
            access: "admin",
          },
          {
            to: "/proveedores",
            icon: "mdi-chart-bubble",
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
            icon: "mdi-tag",
            text: "Tiendas",
            access: "admin",
          },
          {
            to: "/userlist",
            icon: "mdi-tag",
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
    ...mapGetters("auth", ["can"]),
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
      axios
        .get("/listUser")
        .then((response) => {
          this.userDrawer = response.data.data;
          console.log(this.userDrawer);
          this.getRol(this.userDrawer.id);
        })
        .catch((e) => {
          console.log(e);
        });
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
