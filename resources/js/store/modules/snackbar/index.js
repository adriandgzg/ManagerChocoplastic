
import mutations from './mutations'

const state = {
  show: false,
  color: 'error',
  text: 'An error occurred',
  subText: '',
  timeout: 6000
};
const getters = {
  snackbarShow: state => state.show,
  snackbarColor: state => state.color,
  snackbarText: state => state.text,
  snackbarSubtext: state => state.subText,
  snackbarTimeout: state => state.timeout
};

export default
{
  namespaced: true,
  state,
  getters,
  mutations
}
