<template>
  <div class="upload">
    <el-upload
      :action="upLoadApi"
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="props.imgUrl !== '' && props.imgUrl !== null" :src="props.imgUrl" class="img-upload" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const props = defineProps({
  imgWidth: {
    type: Number,
    default: 500,
    required: false
  },
  imgHeigh: {
    type: Number,
    default: 500,
    required: false
  },
  imgUrl: {
    type: String,
    default: '',
    required: false
  },
});

const emits = defineEmits(['imgUpload']);

/** vuex */
const store = useStore();
/** 上傳檔案的API */
const upLoadApi = `${process.env.VUE_APP_campaignAPI}${store.state.campaign.apiVersion}/base/fileupload`;
/** 圖片上傳成功 */
const uploadSuccess = (res) => {
  console.log(res);
  if (res.errorCode === '996600001') {
    const data = JSON.parse(res.data);
    console.log(data);
    emits('imgUpload', data);
  }
}
/** 圖片上傳前先限制大小與寬高 */
const beforeAvatarUpload = file => {
  // 限制上傳圖片大小不可超過2M
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    ElMessage.error('上傳圖片不可超過1M');
    return false;
  }
  // 限制上傳圖片寬高
  // TODO: 限制寬高有提示但未真正回傳false，需檢查
  const isSize = new Promise((resolve, reject) => {
    let _URL = window.URL || window.webkitURL;
    let img = new Image();
    img.onload = () => {
      let valid = img.width === props.imgWidth && img.height === props.imgHeigh;
      valid ? resolve() : reject();
    }
    img.src = _URL.createObjectURL(file);
  }).then(() => {
    ElMessage({
      message: '上傳成功',
      type: 'success'
    });
    return true;
  })
  .catch(()=> {
    ElMessage.error(`上傳圖片尺寸只能是${props.imgWidth}*${props.imgHeigh}px，請重新選擇。`);
    return Promise.reject();
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
