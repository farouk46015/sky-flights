import { api } from "../ApiClient";

export const mainApi = {
  getLocale: async () => {
    try {
      const response = await api.main().request({
        method: "GET",
        url: "getLocale",
      });
      console.log("test vaslue llllllll ", response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getConfig: async () => {
    try {
      const response = await api.main().request({
        method: "GET",
        url: "getConfig",
      });
      console.log("test vaslue llllllll ", response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  checkServer: async () => {
    try {
      const response = await api.main().request({
        method: "GET",
        url: "checkServer",
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
