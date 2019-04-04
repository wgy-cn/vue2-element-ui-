
import Vue from 'vue'
import VueRouter from 'Vue-router'
import AddGoods from '../pages/AddData/AddGoods.vue'
import AddShop from '../pages/AddData/AddShop.vue'
import Chart from '../pages/Chart/Chart.vue'
import AdminList from '../pages/DataManage/AdminList.vue'
import FoodList from '../pages/DataManage/FoodList.vue'
import OrderList from '../pages/DataManage/OrderList.vue'
import ShopList from '../pages/DataManage/ShopList.vue'
import UserList from '../pages/DataManage/UserList.vue'
import Description from '../pages/Description/Description.vue'
import Edit from '../pages/Edit/Edit.vue'
import Home from '../pages/Home/Home.vue'
import Login from '../pages/Login/Login.vue'
import Setting from '../pages/Setting/Setting.vue'

Vue.use(VueRouter);

const routes=[
    {path:'/',redirect:'/login'},
    {path:'/home',component:Home},
    {path:'/userlist',component:UserList,meta:['数据管理','用户列表']},
    {path:'/shoplist',component:ShopList,meta:['数据管理','商家列表']},
    {path:'/foodlist',component:FoodList,meta:['数据管理','食品列表']},
    {path:'/orderlist',component:OrderList,meta:['数据管理','订单列表']},
    {path:'/adminlist',component:AdminList,meta:['数据管理','管理员列表']},
    {path:'/addshop',component:AddShop,meta:['添加数据','添加商铺']},
    {path:'/addgoods',component:AddGoods,meta:['添加数据','添加商品']},
    {path:'/chart',component:Chart,meta:['图表','用户分布']},
    {path:'/edit',component:Edit,meta:['编辑','文本编辑']},
    {path:'/setting',component:Setting,meta:['设置','管理员设置']},
    {path:'/description',component:Description,meta:['说明','说明']},
    {path:'/login',component:Login}
]

export default new VueRouter({
    routes
})