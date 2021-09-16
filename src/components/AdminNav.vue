<template>
  <div class="admin-nav">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>一頁式活動管理</span>
        </template>
        <el-menu-item index="1-1">
          <router-link to="/">查詢</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="/AddCampaign">新增</router-link>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  props: {
    isCollapse: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
::v-deep .el-menu-vertical-demo,
.el-menu--vertical {
  height: 100vh;
  padding-left: 0;
  .el-sub-menu__title {
    text-align: left;
  }
  
  .el-menu-item {
    padding: 0;
    a {
      display: block;
      color: #fff;
      text-align: left;
      &.router-link-exact-active {
        color: rgb(255, 208, 75);
      }
    }
  }
}
::v-deep .el-menu--collapse {
  .el-sub-menu {
    &.is-active {
      i {
        color: rgb(255, 208, 75);
      }
    }
  }
}
</style>
