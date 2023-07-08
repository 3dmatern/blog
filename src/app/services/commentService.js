import httpService from "./httpService";

const commentEndpoint = "comment/";

const commentService = {
    fetchAll: async () => {
        const { data } = await httpService.get(commentEndpoint);
        return data;
    },
    createComment: async (payload) => {
        const { data } = await httpService.post(commentEndpoint, payload);
        return data;
    },
    getComments: async (postId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: "postId",
                equalTo: `${postId}`,
            },
        });
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.patch(commentEndpoint + id, content);
        return data;
    },

    removeComment: async (id) => {
        const { data } = await httpService.delete(commentEndpoint + id);
        return data;
    },
};
export default commentService;
