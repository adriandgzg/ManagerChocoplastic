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
        name: 'Bienvenido',
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
        name: 'Ventas del día',
        view: 'Sales'
    },
    {
        path: '/salesday',
        name: 'Ventas',
        view: 'SalesDay'
    },
    {
        path: '/orders',
        name: 'Pedidos del día',
        view: 'ClientOrders'
    },
    {
        path: '/ordersday',
        name: 'Pedidos',
        view: 'ClientOrdersDay'
    },
    {
        path: '/ordersfiltered',
        name: 'Pedidos (Filtro)',
        view: 'ClientOrdersFiltered'
    },
    {
        path: '/inventory',
        name: 'Inventario',
        view: 'Inventory'
    },
    {
        path: '/detaiorder/:id',
        name: 'Detalle de Orden',
        view: 'DetailOrder'
    },
    {
        path: '/detaiorderread/:id',
        name: 'Detalle de la Orden',
        view: 'DetailOrderRead'
    },

    {
        path: '/detailsale/:id',
        name: 'Detalle de Venta',
        view: 'DetailSale'
    },
    {
        path: '/salesdetail/:id',
        name: 'Detalle de la Venta',
        view: 'SalesDetail'
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
        path: '/clientsrdetail/:id',
        name: 'Detalle Devolución',
        view: 'ClientsRDetail'
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
    {
        path: '/providersreturndetail/:id',
        name: 'Detalle Devolución Proveedor',
        view: 'ProvidersReturnDetail'
    },
    {
        path: '/transferlist',
        name: 'Traspaso',
        view: 'TransferList'
    },
    {
        path: '/mytransferlist',
        name: 'Mis Solicitudes',
        view: 'MyTransferList'
    },
    {
        path: '/transferdetail/:id',
        name: 'Detalle Traspaso',
        view: 'TransferDetail'
    },
    {
        path: '/transferdetailfin/:id',
        name: 'Detalle de Traspaso',
        view: 'TransferDetailFin'
    },
    {
        path: '/transferdetailview/:id',
        name: 'Detalle Traspaso.',
        view: 'TransferDetailView'
    },
    {
        path: '/boxcutlist',
        name: 'Cajas',
        view: 'BoxCuts'
    },
    {
        path: '/reportinventorymovements',
        name: 'Movimientos de Inventario por Producto',
        view: 'ReportInventoryMovements'
    },
    {
        path: '/reportinventorystore',
        name: 'Inventario por Sucursal',
        view: 'ReportInventoryStore'
    },
    {
        path: '/reportclientcatalog',
        name: 'Catálogo Cliente',
        view: 'ReportCientCatalog'
    },
    {
        path: '/reportclientdebt',
        name: 'Reporte Cuentas por Cobrar',
        view: 'ReportClientDebt'
    },
    {
        path: '/reportclientpayment',
        name: 'Bitácora de Abonos',
        view: 'ReportClientPayment'
    },
]