/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default [{
        path: '/dashboard',
        name: 'Dashboard',
        view: 'Dashboard'
    },
    {
        path: '/pos',
        name: 'Venta (Cobro)',
        view: 'PointOfSale'
    },
    {
        path: '/proveedores',
        name: 'Proveedores',
        view: 'Proveedores'
    },
    {
        path: '/clients',
        name: 'Clientes',
        view: 'Clients'
    },
    {
        path: '/stores',
        name: 'Tiendas',
        view: 'Stores'
    },
    {
        path: '/categoriesView',
        name: 'Categorias',
        view: 'Categorie'
    },
    {
        path: '/measurementsView',
        name: 'Medidas',
        view: 'Measurements'
    },
    {
        path: '/admins',
        name: 'Administración',
        view: 'Administration'
    },
    {
        path: '/entities',
        name: 'Entidades Federativas',
        view: 'Entities'
    },
    {
        path: '/paymentmethods',
        name: 'Métodos de Pago',
        view: 'PaymentMethods'
    },
    {
        path: '/paymentshapes',
        name: 'Entidades Federativas',
        view: 'PaymentShapes'
    },
    {
        path: '/products',
        name: 'Productos',
        view: 'Product'
    },
    {
        path: '/sales',
        name: 'Ventas',
        view: 'Sales'
    },
    {
        path: '/orders',
        name: 'Ordenes',
        view: 'ClientOrders'
    },
    {
        path: '/detaiorder/:id',
        name: 'Detalle de Orden', 
        view: 'DetailOrder'
    },
    {
        path: '/clientdebts',
        name: 'Cuentas por Pagar', 
        view: 'ClientDebts'
    },
    {
        path: '/userlist',
        name: 'Usuarios', 
        view: 'UserList'
    },
    {
        path: '/frequents',
        name: 'Productos Frecuentes', 
        view: 'Frequents'
    },
    {
        path: '/purchaseorder',
        name: 'Compras', 
        view: 'PurchaseOrder'
    },

]