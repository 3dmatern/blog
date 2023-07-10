import { useDispatch, useSelector } from "react-redux";
import { loadArticlesList } from "../../../store/articles";
import { useEffect } from "react";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList,
} from "../../../store/users";
import { loadCommentsList } from "../../../store/comments";
import { loadTagsList } from "../../../store/tag";
import { loadArticleTagsList } from "../../../store/articleTag";

const DataLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());

    useEffect(() => {
        dispatch(loadArticlesList());
        dispatch(loadUsersList());
        dispatch(loadCommentsList());
        dispatch(loadTagsList());
        dispatch(loadArticleTagsList());
    }, [isLoggedIn]);

    if (usersStatusLoading) return "Loading...";

    return children;
};

export default DataLoader;
