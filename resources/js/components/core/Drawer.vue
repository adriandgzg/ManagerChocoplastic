<template>
<v-navigation-drawer id="app-drawer" v-model="inputValue" app width="300" :src="background">
    <v-img :gradient="sidebarOverlayGradiant" height="100%">
        <v-list dense nav>
            <v-list-item>
                <v-list-item-avatar color="white">
                    <v-img :src="logo" height="34" contain />
                </v-list-item-avatar>

                <v-list-item-title class="title">Chocoplastic</v-list-item-title>
            </v-list-item>

            <v-list-group :prepend-icon="link.icon" no-action v-for="(link, i) in linksChoco" :key="i" :to="link.to" :active-class="color" v-if="can(link.access)">
                <template v-slot:activator>
                    <v-list-item-title>{{link.text}}</v-list-item-title>
                </template>

                <v-list-item v-for="(linkMenu, j) in link.submenu" :key="j" :to="linkMenu.to" :active-class="color" v-if="can(linkMenu.access) " class="v-list-item">
                    <v-list-item-action>
                        <v-icon>{{ linkMenu.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title v-text="linkMenu.text" />
                </v-list-item>
            </v-list-group>

            <v-list-item v-for="(link, k) in submenu" :key="k+100" :to="link.to" :active-class="color" v-if="can(link.access) " class="v-list-item">

                <v-list-item-action>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-title v-text="link.text" />
            </v-list-item>

            <v-list-group prepend-icon="account_circle" no-action>
                <template v-slot:activator>
                    <v-list-item-title>Catálogos</v-list-item-title>
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
                    <v-list-item-title>Categorías</v-list-item-title>
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
                    <v-list-item-title>Métodos de Pago</v-list-item-title>
                </v-list-item>
                <v-list-item href="/paymentshapes ">
                    <v-list-item-action>
                        <v-icon>mdi-cart</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Formas de Pago</v-list-item-title>
                </v-list-item>
                <v-list-item href="/returnmotives ">
                    <v-list-item-action>
                        <v-icon>mdi-cart</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Motivo de Cancelación</v-list-item-title>
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
import {
    mapGetters,
    mapMutations,
    mapState
} from "vuex";

export default {
    data: () => ({
        logo: "/images/logo_chocoplastic_miniatura.png",

        linksChoco: [{
                icon: 'account_circle',
                text: 'Proveedores',
                access: 'providers',
                submenu: [{
                        to: '/purchaseorderslist',
                        icon: 'mdi-chart-bubble',
                        text: 'Órdenes de Compra',
                        access: 'providers',
                    },
                    {
                        to: '/purchaselist',
                        icon: 'mdi-chart-bubble',
                        text: 'Compras',
                        access: 'providers',
                    },
                    {
                        to: '/providerdebts',
                        icon: 'mdi-tag',
                        text: 'Cuentas por Pagar',
                        access: 'providers',
                    },
                    {
                        to: '/providersreturnlist',
                        icon: 'mdi-tag',
                        text: 'Devoluciones',
                        access: 'providers',
                    },
                ]
            },
            {
                icon: 'account_circle',
                text: 'Clientes',
                access: 'clients',
                submenu: [{
                        to: '/orders',
                        icon: 'mdi-cart',
                        text: 'Pedidos',
                        access: 'clients',
                    },
                    {
                        to: '/sales',
                        icon: 'mdi-cart',
                        text: 'Venta',
                        access: 'clients',
                    },
                    {
                        to: '/clientdebts',
                        icon: 'mdi-tag',
                        text: 'Cuentas por Cobrar',
                        access: 'clients',
                    },
                    {
                        to: '/clientsreturnlist',
                        icon: 'mdi-tag',
                        text: 'Devoluciones',
                        access: 'clients',
                    },
                ]
            },
        ],
        submenu: [{
                to: '/boxcutlist',
                icon: 'mdi-tag',
                text: 'Cajas',
                access: 'box',
            },
            {
                to: '/inventory',
                icon: 'mdi-cart',
                text: 'Inventarios',
                access: 'inventory',
            },
            {
                to: '/transferlist',
                icon: 'mdi-cart',
                text: 'Traspasos',
                access: 'transfer',
            },
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

    div.v-responsive.v-image>div.v-responsive__content {
        overflow-y: auto;
    }
}
</style>
