<template>
    <div>
    <!-- <div class="header_container">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>      

                <el-dropdown>
                  <span >下拉菜单</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >首页</el-dropdown-item>
                    <el-dropdown-item >退出</el-dropdown-item>
                  </el-dropdown-menu>
                  
                </el-dropdown>
    </div> -->
    <HeadTop/>
		<el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
    <header class="form_header">选择食品种类</header>
    <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
      <el-row class="category_select">
			<el-form-item label="食品种类">
			  				<el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
						  	</el-select>
				</el-form-item>
					</el-row>
					<!--这里要想显示隐藏，不能使用show/hide 因为这部分与上下相连接，是一个整体，而不是单独一层面板 -->
                <!--这里class写称calss了 因为把名词写错浪费了多少时间！ -->
								<el-row class="hideCategory" :class="showCategory?'show':''">
										<div class="add_category">
                  <el-form-item label="食品种类" prop="name">
							  	  <el-input v-model="categoryForm.name"></el-input>
							    </el-form-item>
                  <el-form-item label="种类描述" prop="description">
							  	  <el-input v-model="categoryForm.description"></el-input>
							    </el-form-item>
                  <el-form-item>
								    <el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
							    </el-form-item>
                </div>
									</el-row>
                  <div class="add_category_button" @click="addCategoryFun">
						        <i class="el-icon-caret-top edit_icon" v-if="showCategory"></i>
						        <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
						        <span>添加食品种类</span>
					        </div>
    </el-form>
    <header class="form_header">添加食品</header>
    	<el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="食品名称" prop="name">
						<el-input v-model="foodForm.name"></el-input>
					</el-form-item>
          <el-form-item label="食品活动" prop="activity">
						<el-input v-model="foodForm.activity"></el-input>
					</el-form-item>
          <el-form-item label="食品详情" prop="description">
						<el-input v-model="foodForm.description"></el-input>
					</el-form-item>

          	<el-form-item label="上传食品图片">
						<el-upload
						  class="avatar-uploader"
						  :action="'//elm.cangdu.org' + '/v1/addimg/food'"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="foodForm.image_path" :src="'//elm.cangdu.org/img/' + foodForm.image_path" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon" style=" line-height: 120px;"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="食品特点">
						<el-select v-model="foodForm.attributes" multiple placeholder="请选择">
						    <el-option
						      	v-for="item in attributes"
						      	:key="item.value"
						      	:label="item.label"
						      	:value="item.value">
						    </el-option>
					 	</el-select>
					</el-form-item>

          <el-form-item label="食品规格">
						<el-radio class="radio" v-model="foodSpecs" label="one">单规格</el-radio>
  						<el-radio class="radio" v-model="foodSpecs" label="more">多规格</el-radio>
					</el-form-item>
					<el-row v-if="foodSpecs == 'one'">
						<el-form-item label="包装费">
							<el-input-number v-model="foodForm.specs[0].packing_fee" :min="0" :max="100"></el-input-number>
						</el-form-item>
						<el-form-item label="价格">
							<el-input-number v-model="foodForm.specs[0].price" :min="0" :max="10000"></el-input-number>
						</el-form-item>
					</el-row>

					<el-row v-else style="overflow: auto; text-align: center;">
						<el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
						<el-table
					    :data="foodForm.specs"
					    style="margin-bottom: 20px;"
					    :row-class-name="tableRowClassName">
						    <el-table-column
						      prop="specs"
						      label="规格">
						    </el-table-column>
						    <el-table-column
						      prop="packing_fee"
						      label="包装费">
						    </el-table-column>
						    <el-table-column
						      prop="price"
						      label="价格">
						    </el-table-column>
						    <el-table-column label="操作" >
						    <template slot-scope="scope">
						        <el-button
						          size="small"
						          type="danger"
						          @click="handleDelete(scope.$index)">删除</el-button>
						    </template>
						    </el-table-column>
						</el-table>
					</el-row>

					<el-form-item>
						<el-button type="primary" @click="addFood('foodForm')">确认添加食品</el-button>
					</el-form-item>
      </el-form>
			<!-- <el-dialog title="添加规格" v-model="dialogFormVisible" >
				  	<el-form :rules="specsFormrules" :model="specsForm">
					    <el-form-item label="规格" label-width="100px" prop="specs">
					     	<el-input v-model="specsForm.specs" auto-complete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="包装费" label-width="100px">
							<el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
						</el-form-item>
						<el-form-item label="价格" label-width="100px">
							<el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addspecs">确 定</el-button>
				  </div>
			</el-dialog> -->
			<el-dialog title="添加规格" :visible="dialogFormVisible">
				  	<el-form :rules="specsFormrules" :model="specsForm">
					    <el-form-item label="规格" label-width="100px" prop="specs">
					     	<el-input v-model="specsForm.specs" auto-complete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="包装费" label-width="100px">
							<el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
						</el-form-item>
						<el-form-item label="价格" label-width="100px">
							<el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addspecs">确 定</el-button>
				  </div>
				</el-dialog>
					</el-col>
  		</el-row>
    </div>
</template>

<script>
import HeadTop from '../../components/HeadTop/HeadTop.vue'
import {getCategory,addCategory,addFood} from '../../api/api.js'
export default {
	created(){//这一段操作太秀了，获取query传来的参数，同时判断了有没有选择商店，没有的话提供一个跳转回去的按钮
    		if (this.$route.query.restaurant_id) {
    			this.restaurant_id = this.$route.query.restaurant_id;
    		}else{
    			this.restaurant_id = Math.ceil(Math.random()*10);//不明白为何要补充一个id
    			this.$msgbox({
		          title: '提示',
		          message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
		          showCancelButton: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
		              this.$router.push('/shopList');
		              done();
		            } else {
		            	this.$message({
				            type: 'info',
				            message: '取消'
				        });
		              	done();
		            }
		          }
		        })
    		}
    		this.initData();
    	},
  data(){
    return{
				foodrules: {
    				name: [
						{ required: true, message: '请输入食品名称', trigger: 'blur' },
					],
    			},
				specsForm: {
		      specs: '',
		      packing_fee: 0,
		      price: 20,
		    },
				dialogFormVisible:false,
				foodSpecs: 'one',
				restaurant_id:1,
				foodSpecs: 'one',
      	showCategory:false,
      	categoryForm: {
    				categoryList: [],
    				categorySelect: '',
    				name: '',
    				description: '',
					},
				foodForm: {
    				name: '',
    				description: '',
    				image_path: '',
    				activity: '',
    				attributes: [],
    				specs: [{
    					specs: '默认',
			          	packing_fee: 0,
			          	price: 20,
    				}],
					},
				attributes: [{
		          	value: '新',
		          	label: '新品'
		        }, {
		          	value: '招牌',
		          	label: '招牌'
						},],
				 specsFormrules: {
		        	specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
		        }
				
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
            if (res.status == 1) {
                this.foodForm.image_path = res.image_path;//上传成功后显示新图片
                 this.$message.success('上传图片成功！');
            }else{
                this.$message.error('上传图片失败！');
            }
          },
      beforeAvatarUpload(file) {
              const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isRightType) {
                  this.$message.error('上传头像图片只能是 JPG或jpeg 格式!');
              }
              if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isRightType && isLt2M;
				},
				async initData(){
						const result = await getCategory(this.restaurant_id);
						if(result.status==1){
							result.category_list.map((item,index) =>{
								item.value=index
								item.label=item.name
							})
							this.categoryForm.categoryList = result.category_list;
						}else{
							console.log('获取初始数据时出错了')
						}
				},
			submitcategoryForm(categoryForm){
				this.$refs[categoryForm].validate( async (valid) =>{
					if(valid){
							const postdata={
								name:this.categoryForm.name,
								description:this.categoryForm.description,
								restaurant_id:this.restaurant_id
							}
							const res=await addCategory(postdata)
							if(res.status==1){
								this.initData()
								this.categoryForm.name = '';
								this.categoryForm.description = '';
								this.showAddCategory = false;
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
							}
					}else{
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				}

				)
			},
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
				},
			handleDelete(index){
				this.foodForm.specs.splice(index,1)
			},
			addspecs(){
				this.foodForm.specs.push({...this.specsForm})
				this.specsForm.specs=''
				this.specsForm.packing_fee=0
				this.specsForm.price=20
				this.dialogFormVisible=false
			},
			addCategoryFun(){
		    	this.showCategory = !this.showCategory;
				},
			addFood(foodForm){
				this.$refs[foodForm].validate( async (valid) =>{
					if(valid){
						const postdata={...this.foodForm,
							category_id:this.selectValue.id,
							restaurant_id:this.restaurant_id}
						const res=await addFood(postdata)
						if(res.status==1){
							this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					    this.foodForm = {
				    				name: '',
				    				description: '',
				    				image_path: '',
				    				activity: '',
				    				attributes: [],
				    				specs: [{
				    					specs: '默认',
							          	packing_fee: 0,
							          	price: 20,
				    				}],
				    			}
						}else{
									this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
						}
					}else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				})
			}
	},
	computed: {
    		selectValue: function (){
    			return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
    		}
    	},
    components:{
        HeadTop
        }
}
</script>

<style lang="less">
	@import '../../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.hideCategory{
		height: 10px;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.show{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.cell{
		text-align: center;
	}
</style>
