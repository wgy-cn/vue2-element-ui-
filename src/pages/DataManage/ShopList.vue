<template>
 <div class="fillcontain">
       <el-col :span="20">
    <HeadTop/>
     <div class="table_container">
      <el-table
    :data="shoplist"
    style="width: 100%" 
    :row-style="rowClass">

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺名称"  style=" margin-right: 0">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="店铺地址" style=" margin-right: 0">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="店铺介绍" style=" margin-right: 0">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID" style=" margin-right: 0">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="联系电话" style=" margin-right: 0">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="评分" style=" margin-right: 0">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item label="销售量" style=" margin-right: 0">
            <span>{{ props.row.recent_order_num }}</span>
          </el-form-item>
          <el-form-item label="分类" style=" margin-right: 0">
            <span>{{ props.row.category }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="店铺名称"
      prop="name" width='190'>
    </el-table-column>

    <el-table-column
      label="店铺地址"
      prop="address" width='300'>
    </el-table-column>

    <el-table-column
      label="店铺介绍"
      prop="description" width="190">
    </el-table-column>

     <el-table-column label="操作" width="260">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini"
          @click="AddFood(scope.$index, scope.row)">添加食品</el-button>
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
    <el-form-item label="店铺名称" label-width="100px">
      <el-input v-model="expandTable.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="详细地址" label-width="100px">
      <el-autocomplete
          v-model="address.address"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入地址"
          style="width: 100%;"
          @select="addressSelect"
        ></el-autocomplete>
        <span>当前城市：{{city.name}}</span>
    </el-form-item>
    <el-form-item label="店铺介绍" label-width="100px">
      <el-input v-model="expandTable.description" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" label-width="100px">
      <el-input v-model="expandTable.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="店铺分类" label-width="100px">
      <el-cascader
        :options="categoryOptions"
        v-model="selectedCategory"
        change-on-select
      ></el-cascader>
    </el-form-item>
     <el-form-item label="商铺图片" label-width="100px">
       <!-- 此处必须使用网络版地址，否则404 -->
       <el-upload
      class="avatar-uploader"
      :action="'//elm.cangdu.org' + '/v1/addimg/shop'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="expandTable.image_path" :src="'//elm.cangdu.org/img/' + expandTable.image_path" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      </el-form-item>
      </el-form>
    
    <div slot="footer" class="dialog-footer">
    <el-button @click="EditTableShow = false">取 消</el-button>
    <el-button type="primary" @click="UpdateShop">确 定</el-button>
      </div>
      </el-dialog>
 </div>
   </el-col>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {foodCategory,deleteResturant,searchplace} from '../../api/api.js'
import {baseUrl, baseImgPath} from '../../config/env.js'
import HeadTop from '../../components/HeadTop/HeadTop.vue'
export default {
    mounted(){
      // console.log(this.$store)
      this.$store.dispatch('ReceiveCity')
      console.log(this.city)
      this.$store.dispatch('ReceiveShopList',{latitude:this.city.latitude,longitude:this.city.longitude,offset:this.offset,limit:this.limit})
          },
    computed:{
      ...mapState(['city','shoplist']),
    },
    methods: {
      //设置行高
      rowClass({ row, rowIndex}) {
    
    return 'height:10px' 
},
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`第 ${val} 页`);
        this.currentPage=val
        this.offset=(val-1)*this.limit
        this.$store.dispatch('ReceiveShopList',{latitude:this.city.latitude,longitude:this.city.longitude,offset:this.offset,limit:this.limit})
      },
      handleEdit(index,row){
        //console.log(row.image_path)
        this.expandTable=row
        this.address.address = row.address;
        this.EditTableShow=true
        this.selectedCategory = row.category.split('/');
        if(!this.categoryOptions.length){
          this.getCategory()
        }
      },
      async getCategory(){
        const res = await foodCategory()
        res.forEach(
          item => {
            if(item.sub_categories.length){
              const contain={
                label:item.name,
                value:item.name,
                children:[]
              }
              item.sub_categories.forEach( (subitem,index) =>{
                  if(index==0){
                    return
                  }
                  contain.children.push({
                    label:subitem.name,
                    value:subitem.name
                  })
              })
              this.categoryOptions.push(contain)
            }
          }
        )
      },
      handleAvatarSuccess(res, file) {
            if (res.status == 1) {
                this.expandTable.image_path = res.image_path;//上传成功后显示新图片
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
     async UpdateShop(){
          this.EditTableShow=false
          var postdata={...this.expandTable,...this.address}
          postdata.category = this.selectedCategory.join('/');
          const res = await updateResturant(postdata)
          if (res.status == 1) {
                this.$message({
                    type: 'success',
                    message: '更新店铺信息成功'
                });
                //this.getResturants();  //更新成功后刷新列表！
                this.$store.dispatch('ReceiveShopList',{latitude:this.city.latitude,longitude:this.city.longitude,offset:this.offset,limit:this.limit})
            }else{
                this.$message({
                    type: 'error',
                    message: res.message
                });
            }
      },
      async handleDelete(index,row){
              const result =await deleteResturant(row.id)
              if(result.status==1){
                    this.$message({
                        type: 'success',
                        message: '删除店铺成功'
                      });
                this.shoplist.splice(index,1)
              }else{
                 this.$message({
                            type: 'error',
                            message: result.message
                        });
              }
        },
      addressSelect(value){
        const {address,latitude,longitude}=value
        this.address={address,latitude,longitude}
      },
     async querySearchAsync(queryString, callback){
        if (queryString) {
         const cityList = await searchplace(this.city.id, queryString);
         if(cityList instanceof Array){
           cityList.map(item => {
             item.value=item.address
             return item
           })
           callback(cityList)
         }
      }
      },
      AddFood(index, row){
        this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
      }

    },
    data() {
      return {
        selectedCategory:[],
        EditTableShow:false,
        categoryOptions: [],
        address: {},
        expandTable:{},
        baseUrl,
        baseImgPath,
        currentPage: 1,
        offset: 0,
        limit: 20,
        userlistcount:23280
      };
    },

    components:{
        HeadTop
    },
    // watch:{
    //   city(value){
    //     this.$nextTick(
          
    //     )
    //   }
    // }
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
