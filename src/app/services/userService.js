import httpService from "./httpService";
import localStorageService from "./localStorageService";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.patch(userEndpoint + id, content);
        return data;
    },
};
export default userService;
