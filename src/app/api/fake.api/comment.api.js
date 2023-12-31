const comments = [
    {
        _id: "1",
        article_id: "1",
        user_id: "1",
        content: "Использовал меморизацию Redux :)",
        created_at: 1688984837343,
    },
];

if (!localStorage.getItem("comments")) {
    localStorage.setItem("comments", JSON.stringify(comments));
}

const create = (payload) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const comments = JSON.parse(localStorage.getItem("comments"));
            const newComment = {
                _id: String(comments.length + 1),
                created_at: Date.now(),
                ...payload,
            };
            comments.push(newComment);
            localStorage.setItem("comments", JSON.stringify(comments));
            resolve(newComment);
        }, 200);
    });

const get = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("comments")));
        }, 200);
    });

const remove = (id) =>
    new Promise((resolve) => {
        const comments = JSON.parse(localStorage.getItem("comments"));
        const newComments = comments.filter((c) => c._id !== id);
        localStorage.setItem("comments", JSON.stringify(newComments));
        resolve(null);
    });

const getByIdComment = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("comments")).find(
                    (r) => r._id === id
                )
            );
        }, 200);
    });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create,
    get,
    remove,
    getByIdComment,
};
