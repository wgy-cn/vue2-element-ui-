<template>
    <div>
        <HeadTop/>
        <el-col :span="20">
        <section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{adminDayCount}}</span> 新增管理员</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{alluserCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allorderCount}}</span> 订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{alladminDayCount}}</span> 管理员</div></el-col>
            </el-row>
		</section>
        <HomeChart :sevenDay='sevenDay'></HomeChart>
        </el-col>
    </div>
</template>

<script>
import time from 'time-formater'
import HomeChart from '../../components/HomeChart/HomeChart.vue'
import HeadTop from '../../components/HeadTop/HeadTop.vue'
import {userCount,orderCount,adminDayCount,getUserCount,adminCount,getOrderCount, } from '../../api/api.js'
export default {
    mounted(){
        this.initial()
        for(var i=0;i<7;i++){
             const day=time(new Date()-86400000*i).format('YYYY-MM-DD')
             this.sevenDay.push(day)
        }
        this.sevenDay.reverse()
        //console.log(this.sevenDay)
        //this.getSevenData()
        //console.log(this.sevenData)
    },
    methods:{
        async initial(){
            const date0=new Date()
            const today=time(date0).format('YYYY-MM-DD')//这里可能是因为版本的原因，需要传一个时间参数进去
            console.log(10086)
            const res =await userCount(today)
            const res2=await orderCount(today)
            const res3=await adminDayCount(today)
            console.log(res3)
            const res4=await getUserCount()
            const res5=await getOrderCount()
            const res6=await adminCount()
            this.userCount=res.count
            this.orderCount=res2.count
            this.adminDayCount=res3.count
            this.alluserCount=res4.count
            this.allorderCount=res5.count
            this.alladminDayCount=res6.count
            console.log(this.userCount)
        },

        // async getSevenData(){
        // //直接拿结果不是纯数据，不能用于作图
        //     // // this.sevenDay.forEach(day => {
        //     //     const res = userCount(day)
        //     //     // const res2= orderCount(day)
        //     //     // const res3= adminDayCount(day)
        //     //     // console.log(day)
        //     //     this.sevenData[0].push(res)
        //     //     // this.sevenData[1].push(res2)
        //     //     // this.sevenData[2].push(res3)
        //     //     console.log(this.sevenData)
        //     // // });
        //     const apiArr = [[],[],[]];
    	// 		// this.sevenDay.forEach(item => {
        //            const bbbb= await userCount(this.sevenDay[0])
        //             apiArr[0].push(bbbb)
    	// 			apiArr[1].push(await orderCount(this.sevenDay[0]))
        //            apiArr[2].push(await adminDayCount(this.sevenDay[0]))
        //            console.log(apiArr[0])
		// 		// })
				
    	// 		const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    	// 		Promise.all(promiseArr).then(res => {
    	// 			const resArr = [[],[],[]];
		// 			res.forEach((item, index) => {
		// 				if (item.status == 1) {
		// 					resArr[Math.floor(index/7)].push(item.count)
		// 				}
		// 			})
		// 			this.sevenData = resArr;
    	// 		}).catch(err => {
    	// 			console.log(err)
    	// 		})
        // }
    },
    data(){
        return{
            userCount:null,
            orderCount:null,
            adminDayCount:null,
            alluserCount:null,
            allorderCount:null,
            alladminDayCount:null,
            sevenDay:[],
           
        }
    },
    components:{
        HeadTop,
        HomeChart
        }
}
</script>

<style lang="less">
	@import '../../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;
            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
