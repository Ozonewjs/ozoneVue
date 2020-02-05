import { asyncRoutes, constantRoutes } from '@/router'
import { getMenus } from '@/api/user'

const state = {
  routes: [],
  addRoutes: [],
  roles: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  generateRoutes({ commit},roleid) {
    return new Promise((resolve, reject) => {
        getMenus(roleid).then(response => {
          let accessedroutesmenu
          let loginRoles = [];
          if (response.code === 'S') {
            accessedroutesmenu = filterAsyncRoutes(asyncRoutes, response.menus)
            loginRoles.push(response.roleid)
          }
          commit('SET_ROLES',loginRoles)
          commit('SET_ROUTES', accessedroutesmenu)
          resolve(accessedroutesmenu)
        }).catch(error => {
          reject(error)
        })
      }
    )
  },
  resetRoles({commit}){
    return new Promise(resolve => {
      commit('SET_ROLES',[])
      resolve()
    }
    )
  },
}
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(temp, menus) {
  let checkres = 0
  menus.forEach(menu => {
    if (menu.menuid === temp.menuid) {
      checkres++
    }
  })
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }
  if (checkres > 0) {
    return true
  } else {
    return false
  }
}

/**
 * Filter asynchronous routing tables by recursion 递归实现
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach(route => {
  // ...展开运算
    const tmp = { ...route }
    if (hasPermission(tmp, menus)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })
  return res
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
