import httpService from "./httpService";

const postEndpoint = "post/";

const postService = {
    fetchAll: async () => {
        const { data } = await httpService.get(postEndpoint);
        return data;
    },
    create: async (content) => {
        const data = await httpService.post(postEndpoint, content);
        return data;
    },
    get: async (id) => {
        const data = await httpService.get(postEndpoint + id);
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.patch(postEndpoint + id, content);
        return data;
    },

    delete: async (id) => {
        const { data } = await httpService.delete(postEndpoint + id);
        return data;
    },
};
export default postService;
