import axios from "../setup/axios.js";
// import store from "../redux/store";
// import notiModalSlice from "../slices/notiModalSlice.js";
// import loadPageSlice from "../slices/loadPageSlice.js";

const getAccountService = () => {
    return axios.get('/api/account')
}

const refreshNewToken = () => {
    return axios.post('/api/refresh-token')
}

const uploadAvatar = (data) => {
    let email = data.email
    let avatar = data.avatar
    return axios.post('/api/user/avatar/upload', { email, avatar })
}

const getUserAvatar = (data) => {
    let email = data.email
    return axios.post('/api/user/avatar/read', { email })
}

// recall unfinished api if exprired token and refresh success
// const recallApi = async () => {
//     let state = store.getState();
//     let currentApi = state.userLogin.currentApi;
//     let unfinishedApi = currentApi[0];
//     let dataApi = currentApi[1];
    
//     store.dispatch(loadPageSlice.actions.toggleLoadPage())
//     let resRecall = await unfinishedApi(dataApi);
//     if (resRecall && +resRecall.EC === 0) {
//         console.log('resFromUnfinishedApi: ', resRecall);
//         store.dispatch(notiModalSlice.actions.setMessage(resRecall.EM))
//         store.dispatch(notiModalSlice.actions.setShow())
        
        
//         store.dispatch(loadPageSlice.actions.toggleLoadPage())
//         return;
//     } 
//     store.dispatch(loadPageSlice.actions.toggleLoadPage())
// }

export { getAccountService, refreshNewToken, uploadAvatar, getUserAvatar }