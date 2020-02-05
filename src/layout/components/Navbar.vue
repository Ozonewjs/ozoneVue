<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="hover">
        <!-- <div class="avatar-wrapper">
          <img :src= "personInfo" class="user-avatar">
          <span>个人信息</span>
          <i class="el-icon-caret-bottom" />
        </div> -->
         <a class="avatar-wrapper">
         <ul class="ul-top">
            <p style="height:20px;margin:0px;">
              <img :src= "personInfo" class="user-avatar">
            </p>
            <p class="p-text">个人信息</p>
          </ul>
         </a>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
     <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="hover">
        <a class="avatar-wrapper">
          <ul class="ul-top">
            <p style="height:20px;margin:0px;">
              <img :src= "applying" class="user-avatar">
            </p>
            <p style="padding:0px;height:5px;margin:0px;font-size:10px;">新增申请</p>
          </ul>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </a>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>经营贷产品</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">消费贷产品</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">贷记卡产品</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import store from '@/store'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data(){
    return{
       zone: require('@/assets/img/def_header2.jpg'),
       personInfo: require('@/assets/img/personInfo2.png'),
       applying: require('@/assets/img/applying.png')
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$store.dispatch('permission/resetRoles')
      await this.$store.dispatch('tagsView/delAllVisitedViews')
      await this.$store.dispatch('tagsView/delAllCachedViews')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    text-align: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 20px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 25px;
          height: 25px;
          // border-radius: 6px;
         
          
        }
        // .el-row{
        //   height:10px;
        // }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }

      }
    }
    .ul-top{
      padding:0px;
      margin:0px;
      text-align:center;
    }
    .p-text{
     padding:0px;
     height:5px;
     margin:0px;
     font-size:10px;
    }
  }
}
</style>
