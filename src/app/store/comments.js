import { createAction, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        commentsReq: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
    },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsReq,
    commentsReceived,
    commentsFailed,
    commentCreated,
    commentRemoved,
} = actions;

const createCommentReq = createAction("comments/createCommentReq");
const removeCommentReq = createAction("comments/removeCommentReq");

export const loadCommentsList = () => async (dispatch) => {
    dispatch(commentsReq());
    try {
        const content = await api.comments.get();
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsFailed(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(createCommentReq());
    try {
        const content = await api.comments.create(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentReq());
    try {
        const content = await api.comments.remove(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentsFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
