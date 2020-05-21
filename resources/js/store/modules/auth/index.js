import * as types from "../../mutation-types";

const state = {
  permissions: []
};

const getters= {
    can: state => (permissionName)=>{
      return state.permissions.indexOf(permissionName) !== -1;
    }
}
const mutations = {
  updatePermissions (state, permissions) {
    state.permissions = permissions
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
