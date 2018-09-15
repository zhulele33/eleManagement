<template>
  <div>
    <el-table
      class="rechargelog"
      :data="list"
      v-loading="listLoading"
      style="width: 100%">
      <el-table-column label="表号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meterId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电价(元)" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" align="center">
      <el-pagination :total="pages" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        listQuery: {
          pageNum: 1,
          meterId: undefined
        },
        pages: null,
        list: null,
        listLoading: false
    };
  },
  props: ["rechargeInfo"],
  mounted() {
    this.listQuery.meterId = this.rechargeInfo.meterId
    this.getRechartLog()
  },
  methods:{
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getRechartLog()
    },
    getRechartLog(meterId){
      this.listLoading = true
      this.Ajax('electrical/renterRechargeRecord',{params:this.listQuery}).then(data=>{
          this.list = data.list
          this.pages = data.pages
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

