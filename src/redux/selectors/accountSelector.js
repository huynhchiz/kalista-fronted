const accAuthSelector = (state) => state.account.auth
const accInfoSelector = (state) => state.account.info
const accFollowersSelector = (state) => state.account.followers
const accFollowingsSelector = (state) => state.account.followings
const accPostsSelector = (state) => state.account.posts

export {
    accAuthSelector,
    accInfoSelector,
    accFollowersSelector,
    accFollowingsSelector,
    accPostsSelector
}