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
          <el-form-item label="食品名称" style=" margin-right: 0">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="餐馆名称" style=" margin-right: 0">
            <span>{{ props.row.restaurant_name }}</span>
          </el-form-item>
          <el-form-item label="食品 ID" style=" margin-right: 0">
            <span>{{ props.row.item_id }}</span>
          </el-form-item>
          <el-form-item label="餐馆 ID" style=" margin-right: 0">
            <span>{{ props.row.restaurant_id }}</span>
          </el-form-item>
          <el-form-item label="食品介绍" style=" margin-right: 0">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="餐馆地址" style=" margin-right: 0">
            <span>{{ props.row.restaurant_address }}</span>
          </el-form-item>
          <el-form-item label="食品评分" style=" margin-right: 0">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item label="食品分类" style=" margin-right: 0">
            <span>{{ props.row.category_name }}</span>
          </el-form-item>
          <el-form-item label="月销量" style=" margin-right: 0">
            <span>{{ props.row.month_sales }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="食品名称"
      prop="name">
    </el-table-column>

    <el-table-column
      label="食品介绍"
      prop="description">
    </el-table-column>
    
    <el-table-column
      label="评分"
      prop="rating">
    </el-table-column>

     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
 <div class="Pagination">
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
          <el-dialog title="修改食品信息" :visible="EditTableShow">
      <el-form :model="expandTable">
    <el-form-item label="食品名称" label-width="100px">
      <el-input v-model="expandTable.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="食品介绍" label-width="100px">
      <el-input v-model="expandTable.description" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="食品分类" label-width="100px">
      <el-select v-model="selectedIndex" :placeholder="selectMenu.label" @change='handleSelect'>
        <el-option 
        v-for="item in allmenu" :key="item.value" :label="item.label" :value="item.index">
        </el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="食品图片" label-width="100px">
       <el-upload
      class="avatar-uploader"
      :action="baseUrl + '/v1/addimg/food'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="expandTable.image_path" :src="baseImgPath + expandTable.image_path" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      </el-form-item>
      </el-form>
    
      <el-table :data="foodInfo">
    <el-table-column property="specs" label="规格" width="150"></el-table-column>
    <el-table-column property="packing_fee" label="包装费" width="200"></el-table-column>
    <el-table-column property="price" label="价格"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
			    <el-button
			      size="small"
			      type="danger"
			      @click="deleteInfo(scope.$index)">删除</el-button>
			  </template>
    </el-table-column>
    </el-table>
    <el-button type="primary" @click="AddFormShow = true" style="margin-bottom: 10px;">添加规格</el-button>
    
    <div slot="footer" class="dialog-footer">
    <el-button @click="EditTableShow = false">取 消</el-button>
    <el-button type="primary" @click="UpdateFood">确 定</el-button>
      </div>
      </el-dialog>

      <el-dialog title="添加规格" :visible="AddFormShow">
  <el-form :model="addInfo">
    <el-form-item label="规格" label-width="100px">
      <el-input v-model="addInfo.specs" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="包装费" label-width="100px">
      <el-input-number v-model="addInfo.packing_fee" :min="1" :max="100" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="价格" label-width="100px">
      <el-input-number v-model="addInfo.price" :min="1" :max="100" controls-position="right"></el-input-number>      
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="AddFormShow = false">取 消</el-button>
    <el-button type="primary" @click="AddForm">确 定</el-button>
  </div>
</el-dialog>
      
  </div>
   </el-col>
    </div>
</template>

<script>
import {baseUrl, baseImgPath} from '../../config/env.js'
import {getMenuById,getResturantDetail,getMenu,updateFood, deleteFood} from '../../api/api.js'
import HeadTop from '../../components/HeadTop/HeadTop.vue'
export default {
    mounted(){
      this.$store.dispatch('ReceiveFoodList',{offset:this.offset,limit:this.limit})
    },
   
    methods:{
//经过 index绑定key(必须要inex),展开行的增与删(不能省略else)，获取展开信息的异步调用(异步方法加async) 这三点，我的写法必须跟源码结构相似了
      expand(row,expandedRows){
        //console.log(expandedRows)
        //最初想省略参数status以及判断条件，默认是正常成功状态，最终发现是不能绕开的，而且status是展开行的状态码
        if(expandedRows.length>this.expandLength){//如果是展开：需要经过一系列步骤给展开行添加信息
              // this.expandRow.push(row.index)
          this.ReceiveFoodInfo(row)
        }else{//如果是最后一个展开行关闭：就可以清空展开行的信息了//使用length做条件不能关闭打开多行的情况，因为当存在多行展开时，length一直大于0，就一直没法清空
          const index=this.expandRow.indexOf(row.index)//逐行收缩已展开行
          this.expandRow.splice(index,1)
          //console.log(9988)
          // this.expandRow=[]
        }
        this.expandLength=expandedRows.length
   },
      async ReceiveFoodInfo(row,type){
        //console.log(row)
        //1.获取foodlist中缺少信息
        const resturantdetail =await getResturantDetail(row.restaurant_id)
        const menu =await getMenuById(row.category_id)
      //2.把新获取的信息 糅合到 原信息中
        this.expandTable={...row,...{restaurant_name:resturantdetail.name,category_name:menu.name,restaurant_address:resturantdetail.address}}
        //this.tableData.push(this.expandTable) 错误的
      //3.取代该行原来的信息
        //console.log(row)
        //console.log(this.expandTable)
        this.selectMenu = {label: menu.name, value: row.category_id}
        this.tableData2.splice(row.index,1,{...this.expandTable})
        //console.log(this.tableData2)
      //expandRow是要展开的行，数值的元素是row的key值。下次刷新时添加要展开的行
        this.$nextTick(
         () => {this.expandRow.push(row.index)
        })
        if(type=='edit'){//源码的判断条件里有一个关于商铺id的，但是this.restaurant_id = this.$route.query.restaurant_id意义何在？没有传参来源;
          this.getMenu()
        }
      },
       handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`第 ${val} 页`);
        this.currentPage=val
        this.offset=(val-1)*this.limit
        //console.log(this.offset);
        this.$store.dispatch('ReceiveFoodList',{offset:this.offset,limit:this.limit})
        //console.log(this.offset);
      },
      handleEdit(row){
        this.ReceiveFoodInfo(row, 'edit')//点击编辑按钮，调用获取展开行信息函数，并附加edit参数，调用获取菜单函数，
        //此外，设置一个计算变量，用于储存展开行信息中的菜单，这样就把编辑界面所需信息集齐了
        this.EditTableShow=true
        //console.log(this.EditTableShow)
      },
      async getMenu(){
        this.allmenu=[]
        //console.log(this.expandTable.restaurant_id)
        const result=await getMenu({restaurant_id:this.expandTable.restaurant_id,allMenu:true})
        result.forEach((item,index)=>{
          this.allmenu.push({
              label:item.name,
              value:item.id,
              index
            })
        }
        )
        //console.log(this.allmenu)
      },
      handleSelect(index){
        //console.log('品')
        this.selectedIndex=index
        this.selectMenu=this.allmenu[index]
      },
        handleAvatarSuccess(res, file) {
                if (res.status == 1) {
                    this.expandTable.image_path = res.image_path;
                    this.$message.success('上传图片成功！');
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG或jpeg 格式！');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            deleteInfo(index){
              this.foodInfo.splice(index,1)
            },
            AddForm(){
              //console.log(516511)
              this.foodInfo.push({...this.addInfo});
              this.addInfo.specs=''
              this.addInfo.packing_fee=0
              this.addInfo.price=20
              this.AddFormShow=false
            },
           async UpdateFood(){
              this.EditTableShow=false
              var subdata={new_category_id:this.selectMenu.value,specs: this.foodInfo}
              var postdata={...this.expandTable,...subdata}
              const result =await updateFood(postdata)
              if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新食品信息成功'
                        });
//更新成功后重新获取食品列表！！（未完成）
                        this.$store.dispatch('ReceiveFoodList',{offset:this.offset,limit:this.limit})
                        
              }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
              }
            },
            async handleDelete(index,row){
              const result =await deleteFood(row.item_id)
              if(result.status==1){
                    this.$message({
                        type: 'success',
                        message: '删除食品成功'
                      });
                this.tableData2.splice(index,1)
              }else{
                 this.$message({
                            type: 'error',
                            message: result.message
                        });
              }
            }
    },
    data() {
      return {
        AddFormShow:false,
        addInfo:{
          specs:'',
          packing_fee:0,
          price:20,
        },
        baseUrl,
        baseImgPath,
        selectMenu:{},
        selectedIndex:1,
        EditTableShow:false,
        allmenu:[],
        tableData2:[],
        expandTable:{},
        expandRow:[],
        expandLength:0,
        currentPage: 1,
        offset: 0,
        limit: 20,
        userlistcount:23280
      }
    },
    computed:{
      foodInfo(){
        let foodInfo = []
        //console.log(this.expandTable.specfoods)
        if(this.expandTable.specfoods){
          this.expandTable.specfoods.forEach(
            item => {
              foodInfo.push({
                specs:item.specs_name,
                packing_fee: item.packing_fee,
	        			price: item.price,
              })
            }
          )
        }
        return foodInfo
      },
      tableData(){
        //this.tableData2=[] //由于这种写法，tableData2的数据永远都不能改变！
        if(this.tableData2.length==0){
           this.$store.state.foodlist.forEach((food,index) => {
            const data3={};
            data3.name= food.name;
            data3.item_id= food.item_id;
            data3.description= food.description;
            data3.rating= food.rating;
            data3.month_sales= food.month_sales;
            data3.restaurant_id= food.restaurant_id;
            data3.category_id= food.category_id;
            data3.specfoods = food.specfoods;
            //console.log(data3.specfoods)
            data3.index= index;//此处index不是food中的！
            this.tableData2.push(data3)
          })
        }
       
        return this.tableData2
      }
    },
    components:{
        HeadTop
    },
  }
</script>

<style lang="less">
	@import '../../style/mixin';
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
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
</style>
