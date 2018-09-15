<template>
    <div class="app-container">
        <div class="filter-container">
             <el-date-picker
                class="filter"
                v-model="searchDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getChartData">搜索</el-button>
        </div>
        <div id="main" style="width: 100%;height:600px;" class="chart"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    data(){
        return {
            searchDate: '',
            option:{
                title: {
                    text: '耗电量统计',
                    left:'center',
                    // top: 50,
                    textStyle: {
                        lineHeight: 100
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    right: '20%',
                    data:['耗电量']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value',
                    max: '100',
                    min: '0',
                    axisLabel: {
                        formatter: '{value}kwh'
                    },
                },
                series: [
                    {
                        name:'耗电量',
                        type:'line',
                        lineStyle:{color: '#ddd'},
                        label: {
                            normal: {
                            show: true,
                            position: 'top',
                            },
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },

                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                
                ]
            }

        }
    },
    mounted(){
        this.getChartData()
    },
    methods:{
        getChartData(){
            this.Ajax('/electrical/getUserUseElectricDetail',{
                params:{
                    searchDate:this.searchDate,
                    meterId:this.$route.params.meterId
                }
            }).then(data=>{
                this.option.xAxis.data = data.x
                this.option.series[0].data = data.detail
                this.initChart('main',this.option)
            })
        },
        initChart(id,option){
            let myChart = echarts.getInstanceByDom(document.getElementById(id))
            if (myChart === undefined) {
                myChart = echarts.init(document.getElementById(id))
            }
            myChart.setOption(option,true)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .chart
        margin-top 20px
    .filter-container .filter
        margin-left 10%
</style>


