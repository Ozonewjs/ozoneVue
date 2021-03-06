import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken ,removeToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// async 是 ES7 才有的与异步操作有关的关键字
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  if (to.path === '/login') {
    sessionStorage.removeItem("roleid")
    removeToken();
  }
  // set page title
  if (to.meta.title != "" && to.meta.title != undefined) {
    document.title = getPageTitle(to.meta.title)
  } else if(to.params.title) {
    to.meta.title = to.params.title
    document.title = getPageTitle(to.meta.title)
  }
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log("hasRoles======"+hasRoles)
      if (hasRoles) {
        // if (to.matched.length ===0) {  //如果未匹配到路由
        //   next('/login');   //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
        // } 
        // else {
          next();    //如果匹配到正确跳转
        // }
      }else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // await: 操作符用于等待一个 Promise 对象, 它只能在异步函数 async function 内部使用。
          // const { roles } = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          let roleid = store.getters.roleid
          if (roleid) {
            if(!sessionStorage.getItem("roleid")){
              sessionStorage.setItem("roleid",roleid)
            }
          } else {
            // await store.dispatch('tagsView/delAllVisitedViews')
            // await store.dispatch('tagsView/delAllCachedViews')
            roleid = sessionStorage.getItem("roleid")
          }
          const accessRoutes = await store.dispatch('permission/generateRoutes',roleid)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
       next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
