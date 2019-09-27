const state = {
  businessNo: '',
  menutype: '',
  customerid: '',
  customername: '',
  title: ''
}

const mutations = {
  SET_BUSINESSNO: (state, businessNo) => {
    state.businessNo = businessNo
  },
  SET_MENUTYPE: (state, menutype) => {
    state.menutype = menutype
  },
  SET_CUSTOMERID: (state, customerid) => {
    state.customerid = customerid
  },
  SET_CUSTOMERNAME: (state, customername) => {
    state.customername = customername
  },
  SET_TITLE: (state, title) => {
    state.title = title
  },
}

const actions = {
  gettaskist({ commit }, params) {
    const {  businessNo, menutype, customerid,customername, title } = params
    commit('SET_BUSINESSNO', businessNo)
    commit('SET_MENUTYPE', menutype)
    commit('SET_CUSTOMERID', customerid)
    commit('SET_CUSTOMERNAME', customername)
    commit('SET_TITLE', title)
  },

  releasetaskist({ commit}) {
    commit('SET_BUSINESSNO', '')
    commit('SET_MENUTYPE', '')
    commit('SET_CUSTOMERID', '')
    commit('SET_CUSTOMERNAME', '')
    commit('SET_TITLE', '')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

