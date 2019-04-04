<template>
    <div id='app' class="manage_page fillcontain">
         <el-col :span="4" style="min-height: 100%; background-color: #324057;">

      <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>  
        <el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
        
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
            
                <el-menu-item index="userlist">userlist</el-menu-item>
                <el-menu-item index="shoplist">shoplist</el-menu-item>
                <el-menu-item index="foodlist">foodlist</el-menu-item>
                <el-menu-item index="orderlist">orderlist</el-menu-item>
                <el-menu-item index="adminlist">adminlist</el-menu-item>
           
        </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
        
          <el-menu-item index="addshop">addshop</el-menu-item>
          <el-menu-item index="addgoods">addgoods</el-menu-item>
       
      </el-submenu>

      <el-submenu index="4">
        <template slot="title"><i class="el-icon-star-on"></i>图表</template>
       
          <el-menu-item index="chart">chart</el-menu-item>
        
      </el-submenu>

      <el-submenu index="5">
        <template slot="title"><i class="el-icon-edit"></i>编辑</template>
        
          <el-menu-item index="edit">edit</el-menu-item>
       
      </el-submenu>

      <el-submenu index="6">
        <template slot="title"><i class="el-icon-setting"></i>设置</template>
       
          <el-menu-item index="setting">setting</el-menu-item>
      
      </el-submenu>

        <el-submenu index="7">
        <template slot="title"><i class="el-icon-warning"></i>说明</template>
      
          <el-menu-item index="description">description</el-menu-item>
      
      </el-submenu>

    </el-menu>
  </el-col>
    </div>
     

</template>

<script>
 export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
	.manage_page{
		
	}
</style>
