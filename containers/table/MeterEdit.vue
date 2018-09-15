<template>
    <div class="recharge">
        <el-form inline label-width="80px" ref="editFormRef" :model="editForm" >
          <el-form-item label="电表号">
            <span>{{rechargeInfo.meterId}}</span>
          </el-form-item>
          <el-form-item prop="price"
                label="单价"
                :rules="[
                { pattern:/^[1-9]\d*(\.\d+)?$/, message: '请输入大于0的数字'},
                { required: true, message: '请输入单价', trigger: 'blur' }
                ]"
            >
                <el-input v-model="editForm.price"></el-input>
            </el-form-item>
        </el-form>
        <el-row justify="center" type="flex">
            <el-button type="primary" @click="submitForm('editFormRef')">提交</el-button>
            <el-button type="primary" @click="closeDialog">取消</el-button>
        </el-row>
    </div>
    
</template>
<script>
export default {
  data() {
    return {
        editForm:{
price: 0,
        }
        
    };
  },
  props: ["rechargeInfo"],
  mounted() {
    console.log(this.rechargeInfo);
  },
  methods:{
      closeDialog(){
        this.$emit('closeDialog')
      },
      submitForm(formName){
      
        this.$refs[formName].validate((valid) => {
          console.log(32)
          if (valid) {
              this.Ajax('/electrical/editMeter',{params:{
                  meterId:this.rechargeInfo.meterId,
                  price:this.editForm.price
              }}).then(data=>{
                  console.log('修改成功')
                  this.$emit('closeDialog',true)
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(){
      }
  }
};
</script>
<style scoped lang="stylus">
.recharge
    margin-top -20px
    .label
        display flex
        flex-wrap wrap
        line-height 35px
        border-bottom: 1px solid #eee;
        .label-row
            width 50%
            display flex
            .label-name
                width 80px
                padding-right 10px
                text-align right
    .rechartForm
        margin-top 10px
        .el-input
            width 80%
    .eleNo
      line-height 40px
</style>

