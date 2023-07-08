import { useDispatch, useSelector } from "react-redux";
import { loadArticlesList } from "../../../store/articles";
import { useEffect } from "react";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList,
} from "../../../store/users";
import { loadCommentsList } from "../../../store/comments";

const DataLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());

    useEffect(() => {
        dispatch(loadArticlesList());
        dispatch(loadUsersList());
        dispatch(loadCommentsList());
    }, [isLoggedIn]);

    if (usersStatusLoading) return "Loading...";

    return children;
};

export default DataLoader;
