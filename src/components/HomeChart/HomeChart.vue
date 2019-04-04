<template>
    <div>
        <div id="main" style="width: 90%;height:500px;"></div>
    </div>
</template>

<script>
var echarts = require('echarts');
import {getUserCity} from '../../api/api.js'

export default {
    data(){
        return{
            UserCity:{}
        }
    },
    
    mounted(){
        this.init()
    },
    props:['sevenDay'],
    methods:{
         init(){
            var myChart = echarts.init(document.getElementById('main'));
                var option = {
                title: {
                    text: '走势图'
                },
                tooltip: {},
                legend: {
                    data:['新注册用户','新增订单','新增管理员']
                },
                toolbox: {
                        show: true,
                        feature: {
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                 xAxis : {
                        type : 'category',
                        data : this.sevenDay
                    }
                ,
                yAxis : [
                    {
                        type : 'value',
                        name: '用户',
                        min: 0,
                        max: 200,
                        position: 'left',
                    },
                ],
                series: [
                    {
                    name: '新注册用户',
                    type: 'bar',
                    data: [25,40,82,65,12,38,21],
                    markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                    },
                    {
                    name: '新增订单',
                    type: 'bar',
                    data: [5,7,22,15,9,11,3],
                    markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                    },
                    {
                    name: '新增管理员',
                    type: 'bar',
                    data:[57,65,103,114,34,68,11],
                    markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                    },
                ]
                };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
      watch: {
  //观察option的变化
    // sevenData(newVal, oldVal){
    //    if (this.chart) {
    //  if (newVal) {
    //   this.chart.setOption(newVal);
    //  } else {
    //   this.chart.setOption(oldVal);
    //  }
    // } else {
    //   this.init();
    // }
    // },
    sevenDay(newVal, oldVal) {
    if (this.chart) {
     if (newVal) {
      this.chart.setOption(newVal);
     } else {
      this.chart.setOption(oldVal);
     }
    } else {
      this.init();
    }
   },
  // deep: true //对象内部属性的监听，关键。
  }
}
</script>

<style>

</style>
