<template>
    <div class="fillcontain">
       <el-col :span="20">
          <HeadTop></HeadTop>
         <div class="table_container">
          <el-table ref="singleTable" :data="userlist" highlight-current-row @current-change="handleCurrentChange"
            style="width: 100%" >
            <el-table-column type="index" width="100"> </el-table-column>
            <el-table-column property="registe_time" label="注册日期" width="220"> </el-table-column>
            <el-table-column property="username" label="用户姓名" width="220"> </el-table-column>
            <el-table-column property="city" label="注册地址" > </el-table-column>
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
import {mapState} from 'vuex'
import HeadTop from '../../components/HeadTop/HeadTop.vue'
export default {
    mounted(){
      this.$store.dispatch('ReceiveUserList',{offset:this.offset+1,limit:this.limit})
      //this.$store.dispatch('ReceiveUserListCount')
    },
    computed:{
      ...mapState(['userlist']),//目前请求总数的API会跨域报错，暂时手动写了'userlistcount'页码数
      // userlistcount(){
      //   return this.userlistcount=userlistcount
      // }
      // finaldata(){
      //   const {userlist}=this;
      //   //console.log(userlist)
      //   return userlist
      // }    
    },
    components:{
        HeadTop
        },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`第 ${val} 页`);
        this.currentPage=val
        this.offset=(val-1)*this.limit
        this.$store.dispatch('ReceiveUserList',{offset:this.offset,limit:this.limit})
      }
    },
    data() {
      return {
        currentPage: 1,
        offset: 0,
        limit: 20,
        userlistcount:23280
      };
    }
  }
 
</script>

<style lang="less">
	@import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
