import { createAction, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        tagsReq: (state) => {
            state.isLoading = true;
        },
        tagsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        tagsFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        tagCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        tagRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (t) => t._id !== action.payload
            );
        },
    },
});

const { reducer: tagsReducer, actions } = tagsSlice;
const { tagsReq, tagsReceived, tagsFailed, tagCreated, tagRemoved } = actions;

const createTagReq = createAction("tags/createTagReq");
const removeTagReq = createAction("tags/removeTagReq");

export const loadTagsList = () => async (dispatch) => {
    dispatch(tagsReq());
    try {
        const content = await api.tags.get();
        dispatch(tagsReceived(content));
    } catch (error) {
        dispatch(tagsFailed(error.message));
    }
};

export const createTag = (payload) => async (dispatch) => {
    dispatch(createTagReq());
    try {
        const content = await api.tags.create(payload);
        dispatch(tagCreated(content));
    } catch (error) {
        dispatch(tagsFailed(error.message));
    }
};

export const removeTag = (tagId) => async (dispatch) => {
    dispatch(removeTagReq());
    try {
        const content = await api.tags.remove(tagId);
        if (content === null) {
            dispatch(tagRemoved(tagId));
        }
    } catch (error) {
        dispatch(tagsFailed(error.message));
    }
};

export const getTags = () => (state) => state.tags.entities;
export const getTagsLoadingStatus = () => (state) => state.tags.isLoading;

export default tagsReducer;
