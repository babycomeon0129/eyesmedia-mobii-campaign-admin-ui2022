<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/** 上傳圖片路徑 */
const imageUrl = ref('');

/** 圖片上傳成功 */
const uploadSuccess = (res, file) => this.imageUrl = URL.createObjectURL(file.raw);

const beforeAvatarUpload = file => {
  let width = 200;
  let height = 200;

  const isSize = new Promise((resolve, reject) => {
    let _URL = window.URL || window.webkitURL;
    let img = new Image();
    img.onload  = () => {
      let valid = img.width <= width && img.height <= height;
      valid ? resolve() : reject();
    }
    img.src = _URL.createObjectURL(file);
  }).then(()=>{
    console.log(`1111111`);
    return file;
  }, () => {
    console.log(`上傳圖片尺寸只能是${width}*${height}px!請重新選擇!`);
  })
  return isSize;
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
