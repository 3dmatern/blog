const tags = [
    {
        _id: "1",
        name: "новость",
    },
];

if (!localStorage.getItem("tags")) {
    localStorage.setItem("tags", JSON.stringify(tags));
}

const create = (payload) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const tags = JSON.parse(localStorage.getItem("tags"));
            const newTag = {
                _id: String(tags.length + 1),
                ...payload,
            };
            tags.push(newTag);
            localStorage.setItem("tags", JSON.stringify(tags));
            resolve(newTag);
        }, 200);
    });

const get = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("tags")));
        }, 200);
    });

const getByIdTag = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("tags")).find(
                    (tag) => tag._id === id
                )
            );
        }, 200);
    });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create,
    get,
    getByIdTag,
};
