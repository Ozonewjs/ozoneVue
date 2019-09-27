import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  roleid: '',
  avatar: '',
  // roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_COOKIE: (state, cookie) => {
    state.cookie = cookie
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLEID: (state, roleid) => {
    state.roleid = roleid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // 解构（Destructuring）
    const { userId, passWord } = userInfo
    // Promise 是一个对象，从它可以获取异步操作的消息。
    return new Promise((resolve, reject) => {
      login({ userId: userId.trim(), passWord: passWord }).then(response => {
        const { loginUser } = response
        commit('SET_TOKEN', loginUser.sessionID)
        commit('SET_NAME', loginUser.loginUser.userName)
        commit('SET_ROLEID', loginUser.role)
        commit('SET_COOKIE', loginUser.sessionID)
        setToken(loginUser.sessionID)
        sessionStorage.setItem("roleid",loginUser.role)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.roleid).then(response => {
  //       const data = response
  //       if (data.code !=='S') {
  //         reject('Verification failed, please Login again.')
  //       }
  //       const { menus, name, avatar } = data
  //       // roles must be a non-empty array
  //       if (!menus || menus.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }
  //       // commit('SET_ROLES', menus)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    console.log("logout-------------")
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLEID', '')
        commit('SET_COOKIE', '')
        removeToken()
        resetRouter()
        resolve()
        sessionStorage.removeItem("roleid")
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

