<template>
    <div class="statusContainer">
        <el-alert title="当电表处于以下状态时，自动对电表进行断电操作" type="info" :closable="false" show-icon></el-alert>
        <el-row justify="center" type="flex" class="checkedGroup" v-if="isLoaded">
            <el-checkbox-group v-model="type">
                <el-checkbox label="电费欠费" name="arrearOff" v-if="arrearOff==1" checked></el-checkbox>
                <el-checkbox label="电费欠费" name="arrearOff" v-else></el-checkbox>
                <el-checkbox label="欠租" name="arrearRentOff" v-if="arrearRentOff==1" checked></el-checkbox>
                <el-checkbox label="欠租" name="arrearRentOff" v-else></el-checkbox>
                <el-checkbox label="退租" name="outRentOff" v-if="outRentOff==1" checked></el-checkbox>
                <el-checkbox label="退租" name="outRentOff" v-else></el-checkbox>
                <el-checkbox label="电费缴费通电" name="payOn" v-if="payOn==1" checked></el-checkbox>
                <el-checkbox label="电费缴费通电" name="payOn" v-else></el-checkbox>
                <el-checkbox label="续租通电" name="payRentOn" v-if="payRentOn" checked></el-checkbox>
                <el-checkbox label="续租通电" name="payRentOn" v-else></el-checkbox>
            </el-checkbox-group>
        </el-row>
        <el-row justify="center" type="flex" class="checkedGroup">
            <el-button type="primary" size="medium" @click="submitForm()">提交</el-button>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isLoaded:false,
            arrearOff:1,
            arrearRentOff: 0,
            outRentOff: 0,
            payOn: 0,
            payRentOn: 0,
            type:[],
            id:'',
        }
    },
    mounted(){
        console.log(32)
        this.getInfo()
    },
    methods:{
        getInfo(){
            this.Ajax('electrical/meter/cancel/info').then(data=>{
                const {
                    arrearOff,
                    arrearRentOff,
                    outRentOff,
                    payOn,
                    payRentOn,
                    id
                } = data
                this.arrearOff = arrearOff
                this.arrearRentOff = arrearRentOff
                this.outRentOff = outRentOff
                this.payOn = payOn
                this.payRentOn = payRentOn
                this.isLoaded = true
                this.id = id
            })
        },
        submitForm(){
            console.log(this.arrearOff, this.type)
            const postData = {}
            for(let i=0;i<this.type.length;i++){
                const item = this.type[i]
                if(item == '电费欠费'){
                    postData.arrearOff = 1
                    continue
                } 
                if(item == '欠租'){
                    postData.arrearRentOff = 1
                    continue
                } 
                if(item == '退租'){
                    postData.outRentOff = 1
                    continue
                } 
                if(item == '电费缴费通电'){
                    postData.payOn = 1
                    continue
                } 
                if(item == '续租通电'){
                    postData.payRentOn = 1
                    continue
                } 
            }
            if(!postData.arrearOff) postData.arrearOff = 0 
            if(!postData.arrearRentOff) postData.arrearRentOff = 0 
            if(!postData.outRentOff) postData.outRentOff = 0 
            if(!postData.payOn) postData.payOn = 0 
            if(!postData.payRentOn) postData.payRentOn = 0 
            postData.id = this.id

            this.Ajax('electrical/meter/cancel/updateCancel',{params:postData,methods:'post'}).then(data=>{
                this.$emit('closeDialog',true)
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.statusContainer
    margin-top -20px
    .checkedGroup
        margin-top 20px
        .el-checkbox-group
            width 600px
            .el-checkbox
                width 200px
                margin-left 0
                margin-bottom: 10px;
</style>


