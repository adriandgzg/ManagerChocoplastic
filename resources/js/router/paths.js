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
    /*{
        path: '/admins',
        name: 'Administración',
        view: 'Administration'
    },
    {
        path: '/user-profile',
        name: 'User Profile',
        view: 'UserProfile'
    },
    {
        path: '/maps',
        view: 'Maps'
    },
    {
        path: '/notifications',
        view: 'Notifications'
    },
    {
        path: '/table',
        view: 'Table'
    },
    {
        path: '/categories',
        name: 'Categorías',
        view: 'Categorie'
    },
    {
      path: '/business',
      name: 'Negocios',
      view: 'Business'
    },
    {
        path: '/stores',
        name: 'Tiendas',
        view: 'Stores'
    },
    {
        path: '/missions',
        name: 'Misiones',
        view: 'Missions'
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
        path: '/salesbusiness',
        name: 'Ventas negocio',
        view: 'SalesBusiness'
    },
    {
        path: '/coverage',
        name: 'Cobertura',
        view: 'Coverages'
    },
    {
        path: '/userlist',
        name: 'Usuarios',
        view: 'UserList'
    },

    {
        path: '/pos',
        name: 'Venta (Cobro)',
        view: 'PointOfSale'
    },
    {
        path: '/missions/:id/:idStore',
        name: 'Negocios',
        view: 'Missions'
    },*/
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

]