import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorageService";
import { generateAuthError } from "../utils/generateAuthError";
import api from "../api";

const initialState = localStorageService.getUserId()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersReq: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersReqFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        authReqSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authReqFailed: (state, action) => {
            state.error = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
        },
        authReq: (state) => {
            state.error = null;
        },
    },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersReq,
    usersReceived,
    usersReqFailed,
    userUpdated,
    authReqSuccess,
    authReqFailed,
    userLoggedOut,
} = actions;

const updateUserReq = createAction("users/updateUserReq");
const authReq = createAction("users/authReq");

export const signIn =
    ({ payload, navigate }) =>
    async (dispatch) => {
        dispatch(authReq());
        try {
            const data = await api.users.getUser(payload);
            localStorageService.setUserId(data._id);
            dispatch(authReqSuccess({ userId: data._id }));
            navigate(-1);
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log({ code, message });
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authReqFailed(errorMessage));
            } else {
                dispatch(authReqFailed(error.message));
            }
        }
    };

export const signUp =
    ({ payload, navigate }) =>
    async (dispatch) => {
        dispatch(authReq());
        try {
            const data = await api.users.create(payload);
            localStorageService.setUserId(data._id);
            dispatch(authReqSuccess({ userId: data._id }));
            navigate("/");
        } catch (error) {
            dispatch(authReqFailed(error.message));
        }
    };

export const logOut = (navigate) => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    navigate("/");
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersReq());
    try {
        const content = await api.users.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersReqFailed(error.message));
    }
};

export const updateUser = (userId, payload) => async (dispatch) => {
    dispatch(updateUserReq());
    try {
        const { content } = await api.users.update(userId, payload);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(usersReqFailed(error.message));
    }
};

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUser = () => (state) => {
    return state.users.entities
        ? state.users.entities.find(
              (u) => state.users.auth && u._id === state.users.auth.userId
          )
        : null;
};
export const getAuthErrors = () => (state) => state.users.error;

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;
