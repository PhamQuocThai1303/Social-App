import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    posts: [],
    postsLength: 0
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => { //do trong react có lưu lại lịch sử của params nên nếu có chuyển qua lại giữa các params sẽ không hoạt động nếu mình muốn lấy params, nên phải lưu tất cả params vào lại trong users, sau đấy đến profile nào thì lấy users trùng vs profile mình muốn lấy
            const foundUsers = action.payload.foundUser
            return {
                ...state,
                users: [...state.users, foundUsers]
            };
        },
        followUser: (state, action) => {
            const { user, authUser } = action.payload

            const newUser = { ...user, followers: [...user.followers, authUser] }
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item._id === newUser._id) item = { ...newUser }
                    return item
                })
            }
        },
        unFollowUser: (state, action) => {
            const { user, authUser } = action.payload
            const newUser = { ...user, followers: user.followers.filter(item => item._id !== authUser._id) }
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item._id === newUser._id) item = { ...newUser }
                    return item
                })
            }
        },
        getUserPosts: (state, action) => {
            const { posts, postsLength } = action.payload
            return {
                ...state,
                posts: posts,
                postsLength: postsLength
            };
        },
        updateUserPost: (state, action) => {
            const newPost = action.payload.newPost
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id === newPost._id) item = { ...newPost }
                    return item
                })
            }
        },
        likeUserPost: (state, action) => {
            const { post, user } = action.payload
            const newPost = { ...post, likes: [...post.likes, user] }
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id === newPost._id) item = { ...newPost }
                    return item
                })
            }
        },
        unlikeUserPost: (state, action) => {
            const { post, user } = action.payload
            const newPost = { ...post, likes: post.likes.filter(item => item._id !== user._id) }
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id === newPost._id) item = { ...newPost }
                    return item
                })
            }
        },
        deleteUserPost: (state, action) => {
            const { postId } = action.payload

            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item._id !== postId) return item
                })
            }
        },
    }
})

export const { getUser, followUser, unFollowUser, getUserPosts, updateUserPost, likeUserPost, unlikeUserPost, deleteUserPost } = userSlice.actions

export default userSlice.reducer
