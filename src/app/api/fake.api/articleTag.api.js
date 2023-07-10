const articlesTags = [
    {
        article_id: "1",
        tag_id: "1",
    },
];

if (!localStorage.getItem("articlesTags")) {
    localStorage.setItem("articlesTags", JSON.stringify(articlesTags));
}

const create = (payload) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articlesTags = JSON.parse(
                localStorage.getItem("articlesTags")
            );
            articlesTags.push(payload);
            localStorage.setItem("articlesTags", JSON.stringify(articlesTags));
            resolve(payload);
        }, 200);
    });

const get = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("articlesTags")));
        }, 200);
    });

const update = (payload) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articlesTags = JSON.parse(
                localStorage.getItem("articlesTags")
            );
            articlesTags[
                articlesTags.findIndex(
                    (a) => a.article_id === payload.article_id
                )
            ] = payload;
            localStorage.setItem("articlesTags", JSON.stringify(articlesTags));
            resolve(payload);
        }, 200);
    });

const remove = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articlesTags = JSON.parse(
                localStorage.getItem("articlesTags")
            );
            const newArticlesTags = articlesTags.filter(
                (at) => at.article_id !== id
            );
            localStorage.setItem(
                "articlesTags",
                JSON.stringify(newArticlesTags)
            );
        }, 200);
    });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create,
    get,
    update,
    remove,
};
