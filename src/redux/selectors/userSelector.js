const userInfoSelector = (state) => state.user.info
const userFollowersSelector = (state) => state.user.followers
const userFollowingsSelector = (state) => state.user.followings
const userPostsSelector = (state) => state.user.posts
const isFollowingUserSelector = (state) => state.user.isFollowing

export {
    userInfoSelector,
    userFollowersSelector,
    userFollowingsSelector,
    userPostsSelector,
    isFollowingUserSelector
}