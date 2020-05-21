
import mutations from './mutations'

const state = {
  drawer: null,
  color: '#300078',
  //image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
  //image: 'https://us.v-cdn.net/5019960/uploads/editor/lz/ze5i1lyf4qtg.png',
  //image: 'https://i2.wp.com/onlyvectorbackgrounds.com/wp-content/uploads/2018/10/Abstract-Geometric-Background-Blue.jpg?fit=1191%2C842&ssl=1',
  
  sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)'
};
export default {
  namespaced: true,
  state,
  mutations,
}
