import * as types from "../../mutation-types";

const state = {
  permissions: [],
  user:null,
};

const getters= {
    can: state => (permissionName)=>{
      return state.permissions.indexOf(permissionName) !== -1;
    },
    user: state => {
      return state.user;
    }
}
const mutations = {
  updatePermissions (state, permissions) {
    state.permissions = permissions
  },
  updateUser (state, user) {
    state.user = user
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
