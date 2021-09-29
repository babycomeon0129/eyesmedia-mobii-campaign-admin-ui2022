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
import { ref, defineProps } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
  imgWidth: Number,
  imgHeigh: Number
});

/** 上傳圖片路徑 */
const imageUrl = ref('');

/** 圖片上傳成功 */
const uploadSuccess = (res, file) => this.imageUrl = URL.createObjectURL(file.raw);

/** 圖片上傳前先限制大小與寬高 */
const beforeAvatarUpload = file => {

  // 限制上傳圖片寬高
  const isSize = new Promise((resolve, reject) => {
    let _URL = window.URL || window.webkitURL;
    let img = new Image();
    img.onload  = () => {
      let valid = img.width === props.imgWidth && img.height === props.imgHeigh;
      valid ? resolve() : reject();
    }
    img.src = _URL.createObjectURL(file);
  }).then(()=>{
    ElMessage({
      message: '上傳成功',
      type: 'success'
    });
    return file;
  }, () => {
    ElMessage.error(`上傳圖片尺寸只能是${props.imgWidth}*${props.imgHeigh}px，請重新選擇。`);
  });

  // 限制上傳圖片大小不可超過2M
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    ElMessage.error('上傳圖片不可超過2M');
  }
  return isSize && isLt2M;
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
