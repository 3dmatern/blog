import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles";
import usersReducer from "./users";
import commentsReducer from "./comments";
import tagsReducer from "./tag";
import articleTagsReducer from "./articleTag";

const rootReducer = combineReducers({
    users: usersReducer,
    articles: articlesReducer,
    comments: commentsReducer,
    tags: tagsReducer,
    articleTags: articleTagsReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
