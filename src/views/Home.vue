<template>
  <div class="home">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item><router-link to="/">一頁式活動模組</router-link></el-breadcrumb-item>
      <el-breadcrumb-item><router-link to="/">查詢</router-link></el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
