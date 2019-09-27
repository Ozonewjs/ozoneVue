
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roleid: state => state.user.roleid,
  roles: state => state.permission.roles,
  permission_routes: state => state.permission.routes,
  businessNo: state => state.taskcard.businessNo,
  menutype: state => state.taskcard.menutype,
  customerid: state => state.taskcard.customerid,
  customername: state => state.taskcard.customername,
  title: state => state.taskcard.title,
}
export default getters
