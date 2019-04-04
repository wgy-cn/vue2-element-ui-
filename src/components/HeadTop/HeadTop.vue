<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb> 
        <el-dropdown @command="handleCommand" menu-align='start'>
        <img :src="'//elm.cangdu.org/img/' + adminInfo.avatar" class="avator">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>  
    </div>
</template>

<script>
    import {getAdminInfo,signout} from '../../api/api.js'

    export default {
      data(){
        return{
            logined:false,
            adminInfo: {
		        avatar: 'default.jpg'
	        },
        }
    },
      mounted(){
        this.init()
        },
      methods: {
          async init(){
            const res = await getAdminInfo()
            if(res.status==1){
                this.adminInfo=res.data
            }
        },
        //处理首页和退出指令
      async handleCommand(command) {//command很好用，适用于点击菜单项后可触发事件的需求
				if (command == 'home') {//到首页
					this.$router.push('/home');
				}else if(command == 'signout'){//退出
					const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
    }
}
</script>

<style lang="less">
	@import '../../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>

