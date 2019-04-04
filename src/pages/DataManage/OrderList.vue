<template>
   <div class="fillcontain">
       <el-col :span="20">
    <HeadTop/>
<div class="table_container">
      <el-table
    :data="tableData"
    :row-key="row => row.index"
    :expand-row-keys='expandRow'
     @expand-change='expand'
    style="width: 100%" >

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名">
            <span>{{ props.row.user_name }}</span>
          </el-form-item>
          <el-form-item label="店铺名称">
            <span>{{ props.row.restaurant_name }}</span>
          </el-form-item>
          <el-form-item label="收货地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.restaurant_id }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.restaurant_address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="订单 ID"
      prop="id">
    </el-table-column>

    <el-table-column
      label="总价格"
      prop="total_amount">
    </el-table-column>
    
    <el-table-column
      label="订单状态"
      prop="status">
    </el-table-column>

  </el-table>
   <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination :total="userlistcount"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            layout="total, prev, pager, next"
            >
          </el-pagination>
            </div>
          </div>
   </el-col>
    </div>
</template>

<script>
import {getResturantDetail,getUserInfo,getAddressById,getOrderList} from '../../api/api.js'
import HeadTop from '../../components/HeadTop/HeadTop.vue'
export default {
    mounted(){
      //自己的思路行不通，改用项目源码的结构：相当简洁！但是会跨域报错，暂时mock数据或者使用自己的代码呈现页面。
      //this.$store.dispatch('ReceiveOrderList',{offset:this.offset+1,limit:this.limit})
      this.changeTableData()
      },
    methods:{
      expand(row,expandedRows){
        // this.empty=!this.empty //这句话也是犯了异步加载遇到计算属性的毛病，
    //导致奇数次展开时显示空信息！虽然影响不是很恶劣，但是极度影响用户体验
    //但是这种控制方式必须用两次变化相互配合！，缺少了第一个，第二个也没有作用了！
//至此，已经不愿意继续往下思考了，即便以目前所掌握的技术想出来方法，多半也是复杂且难以维护的！
//项目源码的操作不是利用计算属性，而是使用data属性，只在需要变化时控制其改变，避开异步加载的麻烦！
          //console.log(row.index)
        if(expandedRows.length>this.expandLength){
              this.ReceiveOrderInfo(row)
              }else{
                const index=this.expandRow.indexOf(row.index)
                this.expandRow.splice(index,1)
              }
        this.expandLength=expandedRows.length
      },
      async ReceiveOrderInfo(row){
          const restaurant = await getResturantDetail(row.restaurant_id);
	        const userInfo = await getUserInfo(row.user_id);
          const addressInfo = await getAddressById(row.address_id);
          
          this.expandTable={...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}}
          this.tableData.splice(row.index,1,{...this.expandTable})
          this.empty=!this.empty
 //console.log(row.index)
          this.$nextTick(
         () => {this.expandRow.push(row.index)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
//当异步加载遇到计算属性，让原本直线的逻辑变得扑朔迷离！
//————此处empty作为标志决定是否清空数组，切换页面时最先改变empty，触发计算属性重新计算
//此时新页面的信息尚未返回，清空数组后再次装载的还是旧的页面信息！
//更糟糕的是，当异步加载完成后，再次触发计算属性，此时empty已经为false，直接进行数组装载，导致数组内信息超载，
//不仅对页面显示造成影响，还打乱了展开行的index与key之间的绑定关系(index是在foreach里附加的，每次都是0-19)
//至此可以放弃借助翻页事件影响计算属性的思路了，只能借助展开收缩事件了
    //   handleCurrentChange(val) {

    //     this.empty=true
    //    
    //     this.currentPage=val
    //     this.offset=(val-1)*this.limit
    //     this.$store.dispatch('ReceiveOrderList',{offset:this.offset,limit:this.limit})
    //   }
    // },
    // computed:{
    //   tableData(){
    //       if(this.empty){
    //         this.tableData2=[]
    //         console.log("已清空数组")

    //         this.empty=false
    //       }...
    handleCurrentChange(val) {
        console.log(`第 ${val} 页`);
        this.currentPage=val
        this.offset=(val-1)*this.limit
        this.$store.dispatch('ReceiveOrderList',{offset:this.offset,limit:this.limit})
    },
    async changeTableData(){
      const result = await getOrderList({offset:this.offset,limit:this.limit})
      this.tableData=[]
      result.forEach((order,index) => {
            const data3={};
            data3.id= order.id;
            data3.total_amount= order.total_amount;
            data3.status= order.status_bar.title;
            data3.user_id= order.user_id;
            data3.address_id= order.address_id;
            data3.restaurant_id= order.restaurant_id;
            data3.index= index;//此处index不是order中的！
            this.tableData.push(data3)
          })
    }
  },
    
//   computed:{
//       tableData(){
//           if(this.empty){
//             this.tableData2=[]
// console.log("已清空数组")
//           this.$store.state.orderlist.forEach((order,index) => {
//             const data3={};
//             data3.id= order.id;
//             data3.total_amount= order.total_amount;
//             data3.status= order.status_bar.title;
//             data3.user_id= order.user_id;
//             data3.address_id= order.address_id;
//             data3.restaurant_id= order.restaurant_id;
//             data3.index= index;//此处index不是order中的！
//             this.tableData2.push(data3)
//           })
//           }
// console.log("翻页了")
//            //这种写法tableData2的数据永远不能增添展开行信息！因为不翻页也先被清空，所以设置判断条件，翻页时才清空
//   // if(this.tableData2.length==0){//当需要翻页时才发现根据length==0为条件的判定只适用于第一页的加载和展开信息
//   //去除判断条件可以翻页，但不能更新展开行
          
//  console.log(this.tableData2.length)
//         // }
//         return this.tableData2
//       }
//     },
    data() {
      return {
        //tableData2:[],
        expandTable:{},
        expandRow:[],
        expandLength:0,
        currentPage: 1,
        offset: 0,
        limit: 20,
        userlistcount:23280,
        empty:true,
        tableData:[],
      }
    },
    components:{
        HeadTop
    },
  }
</script>

<style lang="less">
	@import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
</style>
