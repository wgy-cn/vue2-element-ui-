<template>
<div class="login_page fillcontain"> 
    <section class="form_contianer" >
        <div class="manage_tip">
        <p>elm后台管理系统</p>
        </div>
<el-form ref="form" :model="form" :rules='rules' label-width="80px">
  <el-form-item prop="username">
    <el-input v-model="form.username" placeholder='用户名'></el-input>
  </el-form-item>
    <el-form-item prop="password">
    <el-input type="password" v-model="form.password" placeholder='密码'></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">登录</el-button>
  </el-form-item>

      <p class="tip">温馨提示:</p>
      <p class="tip">未登录过的新用户，自动注册</p>
      <p class="tip">注册过的用户可凭账号密码登录</p>
      </el-form>
    </section>
</div>
</template>
<script>
import {login} from '../../api/api.js'
  export default {
    data() {
      return {
        form: {
          username: '',
          password:''
        },
        rules:{
            username:[
            {required:true,message:'请输入用户名', trigger: 'blur'}
            ],
            password:[
            {required:true,message:'请输入密码', trigger: 'blur'}
            ]
        }
      }
    },
    methods: {
    async onSubmit(formName) {
        console.log(this.$refs['form']);
        this.$refs[formName].validate(async (valid) =>{
            if(valid){
                const res = await login({user_name:this.form.username,password:this.form.password})
                if(res.status==1){
                    this.$message({type:'success',message:'登陆成功了'})
                    this.$router.replace('/home')
                }else{
                    this.$message({type:'error',message:res.message})
                }
            }else{
                 this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
            }
        }
        )
      }
    // async onSubmit(formName) {
		// 		this.$refs[formName].validate(async (valid) => {
		// 			if (valid) {
		// 				const res = await login({user_name: this.form.username, password: this.form.password})
		// 				if (res.status == 1) {
		// 					this.$message({
		//                         type: 'success',
		//                         message: '登录成功'
		//                     });
		// 					this.$router.push('manage')
		// 				}else{
		// 					this.$message({
		//                         type: 'error',
		//                         message: res.message
		//                     });
		// 				}
		// 			} else {
		// 				this.$notify.error({
		// 					title: '错误',
		// 					message: '请输入正确的用户名密码',
		// 					offset: 100
		// 				});
		// 				return false;
		// 			}
		// 		});
    //   },
      
    }
  }
</script>

<style>

</style>
