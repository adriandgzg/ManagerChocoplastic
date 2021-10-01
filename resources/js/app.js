

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue     from 'vue'
import vuetify from './vuetifyConfig'

import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated';

import router from './router'
import store from './store'
import * as actions from './store/action-types'
import * as mutations from './store/mutation-types'

import {mapGetters, mapMutations, mapState} from 'vuex'
import withSnackbar from './mixins/withSnackbar'
//TODO: clean files import authorization from './mixins/authorization'

//Sync store with router
//sync(store, router)

Vue.use(VueInternationalization);
Vue.use(require('vue-chartist'));
const i18n = new VueInternationalization({
    locale: 'es',
    messages: Locale
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('login', require('./components/LoginComponent.vue').default);
Vue.component('password-reset', require('./components/ResetPasswordComponent').default);
Vue.component('snackbar', require('./components/SnackBarComponent.vue').default);
Vue.component('gravatar', require('./components/GravatarComponent.vue').default);
Vue.component('core-drawer', require('./components/core/Drawer.vue').default);
//Vue.component('core-filter', require('./components/core/Filter.vue').default);
Vue.component('core-footer', require('./components/core/Footer.vue').default);
Vue.component('core-toolbar', require('./components/core/Toolbar.vue').default);
Vue.component('core-view', require('./components/core/View.vue').default);
//Vue.component('app', require('./components/App.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

new Vue({
    vuetify,
    i18n,
    store,
    router,
    mixins: [ withSnackbar ],
    data: () => ({

    }),
    computed: {
        //...mapState('app', ['image', 'color']),
        //...mapGetters( 'auth',['can']),
    },
    methods: {
        ...mapMutations('auth', ['updatePermissions']),
    },
    mounted(){
        this.updatePermissions(window.Permissions)
    }
}).$mount('#app');
