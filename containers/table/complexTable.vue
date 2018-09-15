<template>
  <div class="app-container">
    <div class="setting">
      <el-button style="margin-right: 10px;" type="primary" icon="el-icon-star-on" @click="handleAutoSetting()">自动通断电配置</el-button>
    </div>
    <div class="filter-container">
      <el-input placeholder="小区" v-model="listQuery.address" style="width: 200px;" class="filter-item" @keyup="handleFilter"/>
      <!-- <el-input placeholder="房间号" v-model="listQuery.houseid" style="width: 200px;" class="filter-item" @keyup="handleFilter"/> -->
      <el-input placeholder="表号" v-model="listQuery.meterId" style="width: 200px;" class="filter-item" @keyup="handleFilter"/>
      <el-select v-model="listQuery.status" placeholder="通电状态" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in ElectrifyOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.wifiStatus" placeholder="wifi状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in wifiOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:560px;">
      <!-- <el-table-column label="id" align="center" width="65"> -->
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.index }}</span>
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column label="表号" width="150" align="center">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.meterId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房源地址" min-width="300" align="center">
        <template slot-scope="scope">
          <a :href="`#/meters/${scope.row.meterId}`" target="_blank">{{ scope.row.address }}</a>
        </template>
      </el-table-column>
      <!-- <el-table-column label="类型" width="100">
        <template slot-scope="scope">
          <span >{{ scope.row.type }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="租客信息" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.infoOfrent }}</span>
        </template> -->
      <!-- </el-table-column> -->
      
      <el-table-column label="电价" width="100">
        <template slot-scope="scope">
          <span >{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="租客可用电量" align="center" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.variable}}</span>
        </template>
      </el-table-column>
      <el-table-column label="wifi状态" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.wifiStatus | wifiFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="通电状态" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status | electrifyFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="230" class-name="small-margin">
        <template slot-scope="scope" >
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row,'handleRecharge')">充值</el-button>
          <el-button size="mini" type="info" @click="handleUpdate(scope.row,'handleRechargeLog')">充值记录</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row,'handleEdit')">改价</el-button>
          <el-button type="danger" size="mini" @click="handleEleOnOrOff(scope.row,0)" v-if="scope.row.status==1">断电</el-button>
          <el-button type="success" size="mini" @click="handleEleOnOrOff(scope.row,1)" v-if="scope.row.status==0">通电</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleUpdate(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" align="center">
      <el-pagination :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :width="dialogWidth" class="selfDialog">
      <Rechart v-if="dialogStatus==='handleRecharge'" :rechargeInfo="rechargeInfo" @closeDialog="closeDialog"/>
      <RechartLog v-if="dialogStatus === 'handleRechargeLog'" :rechargeInfo="rechargeInfo" @closeDialog="closeDialog"/>
      <MeterEdit v-if="dialogStatus === 'handleEdit'" :rechargeInfo="rechargeInfo" @closeDialog="closeDialog"/>
      <StatusOfSetting v-if="dialogStatus === 'handleAutoSetting'" @closeDialog="closeDialog"/>
    </el-dialog>
  </div>
</template>

<script>

import Rechart from './Rechart'
import RechartLog from './RechartLog'
import MeterEdit from './MeterEdit'
import StatusOfSetting from './StatusOfSetting'

const wifiOptions = [
  { key: 1, display_name: '已连接' },
  { key: 0, display_name: '已断开' },
]

const ElectrifyOptions = [
  { key: 1, display_name: '已通电' },
  { key: 0, display_name: '已断开' },
]

export default {
  name: 'ComplexTable',
  filters: {
    wifiFilter(status) {
      for(let i=0;i<wifiOptions.length;i++){
        if(wifiOptions[i].key == status){
          return wifiOptions[i].display_name
        }
      }
    },
    electrifyFilter(type) {
      for(let i=0;i<ElectrifyOptions.length;i++){
        if(ElectrifyOptions[i].key == type){
          return ElectrifyOptions[i].display_name
        }
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      dialogWidth: '50%',
      listQuery: {
        // pageN
        pageNum: 1,
        address: undefined,
        meterId: undefined,
        status: undefined,
        wifiStatus: undefined
      },
      ElectrifyOptions,
      wifiOptions,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        handleRecharge: '充值',
        handleRechargeLog: '充值记录',
        handleEdit: '编辑',
        handleAutoSetting: '自动通断电配置',
      },
      rechargeInfo:{},
    }
  },
  components: {Rechart,RechartLog,MeterEdit,StatusOfSetting},
  created() {
    this.getList()
  },
  methods: {
    closeDialog(neesFresh){
      if(neesFresh){
        this.getList()
      }
      this.dialogFormVisible = false
    },
    getList() {
      this.listLoading = true
      this.Ajax('electrical/getMeterInfoList',{params:this.listQuery}).then(data => {
        this.list = data.list
        this.total = data.total
          setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleEleOnOrOff(row,isTurnOn) {
      this.Ajax('electrical/updateMeterStatus',{params:{status:isTurnOn,meterId:row.meterId}}).then(data => {
        // row.status = isTurnOn
        this.getList()
      })
    },
    handleAutoSetting() {
      this.dialogStatus = 'handleAutoSetting'
      this.dialogFormVisible = true
      this.dialogWidth = '50%'
    },
    handleRecharge(row){
      this.rechargeInfo = row
      this.dialogWidth = '30%'
      console.log('handleRecharge')
    },
    handleRechargeLog(row){
      this.rechargeInfo = row
      this.dialogWidth = '50%'
    },
    handleEdit(row){
      this.rechargeInfo = row
      this.dialogWidth = '30%'
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleUpdate(row,type) {
      this.dialogFormVisible = true
      this.dialogStatus = type
      if(this[type]){
        this[type](row)
      }
    },
/*    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },*/
  }
}
</script>
<style lang="stylus" scoped>
.setting
  margin-bottom 20px
.filter-container
  margin-bottom 10px
</style>
<style lang="stylus">
.app-container .el-table td
  padding 10px 0
.small-margin .el-button
  margin-bottom 10px
.selfDialog
  .el-dialog__header
    border-bottom 1px solid #ddd
</style>

