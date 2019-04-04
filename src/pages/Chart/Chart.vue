<template>
    <div>
        <el-col :span="20">
            <HeadTop/>
            <div id="main" style="width: 90%;height:450px;"></div>
        </el-col>
    </div>
   
</template>

<script>
var echarts = require('echarts');
import HeadTop from '../../components/HeadTop/HeadTop.vue'
import {getUserCity} from '../../api/api.js'
export default {
    data(){
        return{
            UserCity:{}
        }
    },
    methods:{
        async init(){//如果不借住async await 返回的结果是很难提取的，使用后会能得到返回的纯数据
            const reslut=await getUserCity()
            //console.log(reslut)
            if(reslut.status==1){
                this.UserCity=reslut.user_city
                //console.log(this.UserCity.beijing)
            //画图必须保证已经获取到数据！ 
                console.log(this.UserCity.beijing)
                var myChart = echarts.init(document.getElementById('main'));
                var option = {
                title: {
                    text: '用户分布'
                },
                tooltip: {},
                legend: {
                    data:['北京','上海','深圳','杭州','其他']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    data: [
                        {value:this.UserCity.beijing, name:'北京'},
                        {value:this.UserCity.shanghai, name:'上海'},
                        {value:this.UserCity.shenzhen, name:'深圳'},
                        {value:this.UserCity.hangzhou, name:'杭州'},
                        {value:this.UserCity.qita, name:'其他'}]
                }]
                };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
            }
        }
    },
    mounted(){
        this.init()
        
        },
    components:{
        HeadTop
        }
}
</script>

<style lang="less">
	@import '../../style/mixin';
	
</style>
