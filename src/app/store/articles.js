import { createAction, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        articlesReq: (state) => {
            state.isLoading = true;
        },
        articlesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        articlesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        articleCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        articleUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((a) => a._id === action.payload._id)
            ] = action.payload;
        },
        articleRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (a) => a._id !== action.payload
            );
        },
    },
});

const { reducer: articlesReducer, actions } = articlesSlice;
const {
    articlesReq,
    articlesReceived,
    articlesFailed,
    articleCreated,
    articleUpdated,
    articleRemoved,
} = actions;

const createArticleReq = createAction("articles/createArticleReq");
const updateArticleReq = createAction("articles/updateArticleReq");
const removeArticleReq = createAction("articles/removeArticleReq");

export const loadArticlesList = () => async (dispatch) => {
    dispatch(articlesReq());
    try {
        const content = await api.articles.get();
        dispatch(articlesReceived(content));
    } catch (error) {
        dispatch(articlesFailed(error.message));
    }
};

export const createArticle =
    ({ payload, navigate }) =>
    async (dispatch) => {
        dispatch(createArticleReq());
        try {
            const content = await api.articles.create(payload);
            dispatch(articleCreated(content));
            navigate("/admin");
            return content._id;
        } catch (error) {
            dispatch(articlesFailed(error.message));
        }
    };

export const updateArticle =
    ({ payload, navigate }) =>
    async (dispatch) => {
        dispatch(updateArticleReq());
        try {
            const content = await api.articles.update(payload._id, payload);
            dispatch(articleUpdated(content));
            navigate("/admin");
        } catch (error) {
            dispatch(articlesFailed(error.message));
        }
    };

export const removeArticle = (articleId) => async (dispatch) => {
    dispatch(removeArticleReq());
    try {
        const content = await api.articles.remove(articleId);
        if (content === null) {
            dispatch(articleRemoved(articleId));
        }
    } catch (error) {
        dispatch(articlesFailed(error.message));
    }
};

export const getArticleById = (articleId) => (state) => {
    if (state.articles.entities) {
        return state.articles.entities.find((a) => a._id === articleId);
    }
};

export const getArticles = () => (state) => state.articles.entities;
export const getArticlesLoadingStatus = () => (state) =>
    state.articles.isLoading;

export default articlesReducer;
