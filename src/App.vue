<template>
    <div id='app'>
        <LeftGuide v-if='logined'></LeftGuide>
        <router-view></router-view>
        
    </div>
</template>

<script>
//做到了！不同于源码的登录结构
import LeftGuide from './components/LeftGuide/LeftGuide.vue'
import {getAdminInfo} from './api/api.js'
export default {
    mounted(){
        this.init()
    },
    methods:{
        async init(){
            const res = await getAdminInfo()
            if(res.status==1){
                //如果检测到已经登录过，则延迟一秒后自动登录
                //console.log(this.$router)
                this.adminInfo=res.data
                this.$message({
                    type:'success',
                    message:'检测到已经登录过，将自动登录'
                })
                //console.log(this.logined)
                this.$router.replace("/home")
                this.logined=true
            }
        }
    },
    components:{
        LeftGuide
        },
    data(){
        return{
            logined:false,
            adminInfo: {
		        avatar: 'default.jpg'
	        },
        }
    },
    watch: {
      $route(){this.logined=true}
    },
}
</script>

<style>

</style>
