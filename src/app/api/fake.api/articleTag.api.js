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
            const newArticleTag = {
                ...payload,
            };
            articlesTags.push(newArticleTag);
            localStorage.setItem("articlesTags", JSON.stringify(articlesTags));
            resolve(newArticleTag);
        }, 200);
    });

const get = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("articlesTags")));
        }, 200);
    });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create,
    get,
};
