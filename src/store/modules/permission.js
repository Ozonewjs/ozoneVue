import { asyncRoutes, constantRoutes } from '@/router'
import { getMenus } from '@/api/user'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(temp, menus) {
  let checkres = 0
  menus.forEach(menu => {
    if (menu.path === temp.path) {
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
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(
      (resolve, reject) => {
        getMenus(roles).then(response => {
          let accessedroutesmenu
          if (response.data) {
            accessedroutesmenu = filterAsyncRoutes(asyncRoutes, response.data)
          }
          commit('SET_ROUTES', accessedroutesmenu)
          resolve(accessedroutesmenu)
        }).catch(error => {
          reject(error)
        })
      }
    //   resolve => {
    //   let accessedRoutes
    //   if (roles.includes('admin')) {
    //     // accessedRoutes = asyncRoutes || []
    //     accessedRoutes = []
    //   } else {
    //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    //   }
    //   commit('SET_ROUTES', accessedRoutes)
    //   resolve(accessedRoutes)
    // }
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
