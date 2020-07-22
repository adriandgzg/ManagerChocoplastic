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
        name: 'Formas de Pago',
        view: 'PaymentShapes'
    },
    {
        path: '/returnmotives',
        name: 'Motivos de Devolución',
        view: 'ReturnMotives'
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
        name: 'Pedidos',
        view: 'ClientOrders'
    },
    {
        path: '/detaiorder/:id',
        name: 'Detalle de Orden', 
        view: 'DetailOrder'
    },    
    {
        path: '/detailsale/:id',
        name: 'Detalle de Venta', 
        view: 'DetailSale'
    },
    {
        path: '/clientdebts',
        name: 'Cuentas por Cobrar', 
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
        path: '/purchaseorder/:id',
        name: 'Orden de Compra', 
        view: 'PurchaseOrder'
    },
    {
        path: '/purchaseorderslist',
        name: 'Ordenes de Compra', 
        view: 'PurchaseOrdersList'
    },
    {
        path: '/purchaselist',
        name: 'Compras', 
        view: 'PurchaseList'
    },
    {
        path: '/purchases/:id/:directa',
        name: 'Compra', 
        view: 'Purchases'
    },
    {
        path: '/purchasesdetail/:id',
        name: 'Detalle de Compra', 
        view: 'PurchasesDetail'
    },
    {
        path: '/providerdebts',
        name: 'Cuentas por Pagar', 
        view: 'ProviderDebts'
    },
    {
        path: '/orderdetail/:id',
        name: 'Detalle de Orden de Compra', 
        view: 'OrderDetail'
    },    
    {
        path: '/clientsreturn/:id',
        name: 'Devoluciones', 
        view: 'ClientsReturn'
    },
    {
        path: '/clientsreturnlist',
        name: 'Lista de Devoluciones', 
        view: 'ClientsReturnList'
    },
    {
        path: '/providersreturn/:id',
        name: 'Devoluciones Proveedor', 
        view: 'ProvidersReturn'
    },
    {
        path: '/providersreturnlist',
        name: 'Lista Devoluciones Proveedor', 
        view: 'ReturnList'
    },
]