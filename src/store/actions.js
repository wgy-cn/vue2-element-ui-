import{
    RECEIVE_USERLIST,
    RECEIVE_SHOPLIST,
    RECEIVE_ORDERLIST,
    RECEIVE_FOODLIST,
    RECEIVE_ADMINLIST,
    RECEIVE_CITY,
    RECEIVE_USERLISTCOUNT
}from './mutation-types'

import{
    login,
    signout,
    getAdminInfo,
    apiCount,
    apiAllCount,
    apiAllRecord,
    userCount,
    orderCount,
    adminDayCount,
    adminList,
    adminCount,
    cityGuess,
    addShop,
    searchplace,
    getCategory,
    addCategory,
    addFood,
    foodCategory,
    getResturants,
    getResturantDetail,
    getResturantsCount,
    updateResturant,
    deleteResturant,
    getFoods,
    getFoodsCount,
    getMenu,
    getMenuById,
    updateFood,
    deleteFood,
    getUserList,
    getUserCount,
    getOrderList,
    getOrderCount,
    getUserInfo,
    getAddressById,
    getUserCity
}from '../api/api.js'

export default {
    async ReceiveUserList({commit},param){
        const userlist=await getUserList(param)
        commit(RECEIVE_USERLIST,{userlist})
    },

    async ReceiveCity({commit}){
        const city = await cityGuess();
        //console.log(city);
        commit(RECEIVE_CITY,{city})
    },

    async ReceiveShopList({commit},param){
        const shoplist=await getResturants(param);
        //console.log(shoplist);
        commit(RECEIVE_SHOPLIST,{shoplist})
    },

    async ReceiveFoodList({commit},param){
        const foodlist=await getFoods(param);
        //console.log(foodlist);
        commit(RECEIVE_FOODLIST,{foodlist})
    },

    async ReceiveOrderList({commit},param){
        const orderlist=await getOrderList(param);
        //console.log(orderlist);
        commit(RECEIVE_ORDERLIST,{orderlist})
    },

    async ReceiveAdminList({commit},param){
        const res=await adminList(param);
        const adminlist=res.data
        //console.log(adminlist);
        commit(RECEIVE_ADMINLIST,{adminlist})
    },

    async ReceiveUserListCount({commit}){
        const res=await getUserCount();
        console.log(res);
        if (res.status == 1) {
            const userlistcount=res.count
            //console.log(userlistcount);
            commit(RECEIVE_USERLISTCOUNT,{userlistcount})
        }
    },
}