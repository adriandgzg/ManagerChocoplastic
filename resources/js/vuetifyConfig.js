import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import es       from 'vuetify/es5/locale/es'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);
export default new Vuetify({
    iconfont: 'mdi',
    theme: {
        themes: {
            light: {
                primary: '#300078',
                secondary: '#4caf50',
                tertiary: '#495057',
                accent: '#82B1FF',
                error: '#f55a4e',
                info: '#00d3ee',
                success: '#5cb860',
                warning: '#ffa21a',
                hover: '#000000'
            },
        },
    },
    lang: {
        locales: {es},
        current: 'es'
    }
})