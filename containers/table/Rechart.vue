<template>
    <div class="recharge">
        <dl class="label">
            <dd class="label-row">
                <span class="label-name">表号:</span>
                <span class="label-val">{{rechargeInfo.meterId}}</span>
            </dd>
            <dd class="label-row">
                <span class="label-name">电价:</span>
                <span class="label-val">{{rechargeInfo.price}}</span>
            </dd>
        </dl>
        <el-form :model="rechargeForm" ref="rechargeForm" label-width="80px" class="rechartForm">
            <el-form-item prop="rechargeMoney"
                label="金额"
                :rules="[
                { pattern:/^[1-9]\d*(\.\d+)?$/, message: '请输入大于0的数字'},
                { required: true, message: '请输入金额', trigger: 'blur' }
                ]"
            >
                <el-input v-model="rechargeForm.rechargeMoney"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="acount"
                label="电量"
                :rules="[
                { required: true, message: '请输入电量', trigger: 'blur' },
                { type: 'number', message: '电量必须为数字值', trigger: ['blur', 'change']}
                ]"
            > -->
                <!-- <el-input v-model="dynamicValidateForm.eleQuality"></el-input>
            </el-form-item> -->
            
        </el-form>
        <el-row justify="center" type="flex">
            <el-button type="primary" @click="submitForm('rechargeForm')">提交</el-button>
        </el-row>
    </div>
    
</template>
<script>
export default {
  data() {
    return {
        rechargeForm:{
            rechargeMoney: 0,
        }
       
    };
  },
  props: ["rechargeInfo"],
  mounted() {
    console.log(this.rechargeInfo);
  },
  methods:{
      submitForm(formName){
        // meterId:
        // rechargeMoney:
        this.$refs[formName].validate((valid) => {
            console.log(2323)
          if (valid) {
              this.Ajax('/electrical/userRecharge',{params:{
                  meterId:this.rechargeInfo.meterId,
                  rechargeMoney:this.rechargeForm.rechargeMoney
              }}).then(data=>{
                  console.log('充值成功')
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
</style>

