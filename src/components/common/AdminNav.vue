<template>
  <div class="admin-nav">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="props.isCollapse"
    >
    <div class="version">
      <p><i class="el-icon-info"></i> 版本資訊：</p>
      <p>{{version}}</p>
      <p>{{releaseTime}}</p>
    </div>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <template #title>
          <router-link to="/">一頁式活動模組</router-link>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  isCollapse: Boolean
})

/** 版號 */
const version = `${process.env.VUE_APP_VERSION}`;
/** 更新時間 */
const releaseTime = document.lastModified;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$active-color: rgb(255, 208, 75);

.el-menu-vertical-demo {
  height: calc(100vh - $header-height);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 201px;
  position: relative;
}

.el-menu-item,
.el-sub-menu {
  padding: 0;
  text-align: left;
  a {
    color: #fff;
  }
  &.is-active {
    a {
      color: $active-color;
    }
  }
}

.el-menu--collapse {
  .el-sub-menu {
    &.is-active {
      i {
        color: $active-color !important;
      }
    }
  }
}

.el-popper {
  &.is-dark {
    a {
      color: #fff;
    }
  }
}

.version {
  color: #fff;
  font-size: small;
  text-align: left;
  position:absolute;
  bottom: 0;
  left: 0;
  padding: 0 0 20px 20px;
}
</style>
