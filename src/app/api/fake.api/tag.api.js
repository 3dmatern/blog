const tags = [
    {
        _id: "1",
        value: "sport",
        label: "sport",
    },
    {
        _id: "2",
        value: "science",
        label: "science",
    },
    {
        _id: "3",
        value: "game",
        label: "game",
    },
    {
        _id: "4",
        value: "reactjs",
        label: "reactjs",
    },
    {
        _id: "5",
        value: "redux",
        label: "redux",
    },
    {
        _id: "6",
        value: "bootstrap",
        label: "bootstrap",
    },
    {
        _id: "7",
        value: "html",
        label: "html",
    },
    {
        _id: "8",
        value: "css",
        label: "css",
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
