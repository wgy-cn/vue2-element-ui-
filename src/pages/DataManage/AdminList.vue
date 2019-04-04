<template>
     <div class="fillcontain">
       <el-col :span="20">
      <HeadTop></HeadTop>
    <div class="table_container">
      <el-table ref="singleTable" :data="adminlist" highlight-current-row @current-change="handleCurrentChange"
        style="width: 100%" >  

        <el-table-column property="user_name" label="姓名" width="180"> </el-table-column>
        <el-table-column property="create_time" label="注册日期" width="220"> </el-table-column>
        <el-table-column property="city" label="地址"  width="180"> </el-table-column>
         <el-table-column property="admin" label="权限"  > </el-table-column>

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
      this.$store.dispatch('ReceiveAdminList',{offset:this.offset+1,limit:this.limit})
    },
    components:{
        HeadTop
        },
    computed:{
      ...mapState(['adminlist']),
    },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`第 ${val} 页`);
        this.currentPage=val
        this.offset=(val-1)*this.limit
        this.$store.dispatch('ReceiveAdminList',{offset:this.offset,limit:this.limit})
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
