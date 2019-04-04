import{
    RECEIVE_USERLIST,
    RECEIVE_SHOPLIST,
    RECEIVE_ORDERLIST,
    RECEIVE_FOODLIST,
    RECEIVE_ADMINLIST,
    RECEIVE_CITY,
    RECEIVE_USERLISTCOUNT
}from './mutation-types'

export default {
    [RECEIVE_USERLIST](state,{userlist}){
        state.userlist=userlist
        //console.log(state)
    },
    [RECEIVE_SHOPLIST](state,{shoplist}){
        state.shoplist=shoplist
        //console.log(state)
    },
    [RECEIVE_CITY](state,{city}){
        state.city=city
    },
    [RECEIVE_FOODLIST](state,{foodlist}){
        state.foodlist=foodlist
    },
    [RECEIVE_ORDERLIST](state,{orderlist}){
        state.orderlist=orderlist
    },
    [RECEIVE_ADMINLIST](state,{adminlist}){
        state.adminlist=adminlist
    },
    [RECEIVE_USERLISTCOUNT](state,{userlistcount}){
        state.userlistcount=userlistcount
    },
}