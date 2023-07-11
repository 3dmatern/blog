import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const articleTagsSlice = createSlice({
    name: "articleTags",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        articleTagsReq: (state) => {
            state.isLoading = true;
        },
        articleTagsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        articleTagsFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        articleTagCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        articleTagUpdated: (state, action) => {
            state.entities = action.payload;
        },
        articleTagRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (t) => t.article_id !== action.payload
            );
        },
    },
});

const { reducer: articleTagsReducer, actions } = articleTagsSlice;
const {
    articleTagsReq,
    articleTagsReceived,
    articleTagsFailed,
    articleTagCreated,
    articleTagUpdated,
    articleTagRemoved,
} = actions;

const createArticleTagReq = createAction("articleTags/createArticleTagReq");
const updateArticleTagReq = createAction("articleTags/updateArticleTagReq");
const removeArticleTagReq = createAction("articleTags/removeArticleTagReq");

export const loadArticleTagsList = () => async (dispatch) => {
    dispatch(articleTagsReq());
    try {
        const content = await api.articlesTags.get();
        dispatch(articleTagsReceived(content));
    } catch (error) {
        dispatch(articleTagsFailed(error.message));
    }
};

export const createArticleTag = (payload) => async (dispatch) => {
    dispatch(createArticleTagReq());
    try {
        const content = await api.articlesTags.create(payload);
        dispatch(articleTagCreated(content));
    } catch (error) {
        dispatch(articleTagsFailed(error.message));
    }
};

export const updateArticleTag =
    ({ article_id, payload }) =>
    async (dispatch) => {
        dispatch(updateArticleTagReq());
        try {
            const content = await api.articlesTags.update({
                article_id,
                payload,
            });
            dispatch(articleTagUpdated(content));
        } catch (error) {
            dispatch(articleTagsFailed(error.message));
        }
    };

export const removeArticleTag = (articleId) => async (dispatch) => {
    dispatch(removeArticleTagReq());
    try {
        const content = await api.articlesTags.remove(articleId);
        if (content === null) {
            dispatch(articleTagRemoved(articleId));
        }
    } catch (error) {
        dispatch(articleTagsFailed(error.message));
    }
};

export const getArticleTags = () => (state) => state.articleTags.entities;
export const getArticleTagsLoadingStatus = () => (state) =>
    state.articleTags.isLoading;

export const selectArticleTags = (state) => state.articleTags.entities;
export const selectArticleTagsById = createSelector(
    [selectArticleTags, (state, articleId) => articleId],
    (articleTags, articleId) => {
        if (articleTags) {
            return articleTags.filter((a) => a.article_id === articleId);
        }
    }
);

export default articleTagsReducer;
