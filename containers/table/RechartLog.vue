<template>
    <el-table
      class="rechargelog"
      :data="list"
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
</template>
<script>
export default {
  data() {
    return {
        list: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        listLoading: false
    };
  },
  props: ["rechargeInfo"],
  mounted() {
    console.log(this.rechargeInfo);
    this.getRechartLog(this.rechargeInfo.houseid)
  },
  methods:{
      getRechartLog(houseid){
        this.listLoading = true
        this.Ajax('electrical/getRechargeLog',{params:houseid}).then(data=>{
            console.log(data)
            this.listLoading = false
        })
      },
  }
};
</script>
<style scoped lang="stylus">
    .rechargelog
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

