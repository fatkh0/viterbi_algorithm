import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export type GetCoded = {
  coded: string;
  errors: string;
};

export const ViterbiService = {
  async getCoded(polynom: string, message: string) {
    return await instance
      .get<GetCoded>(`/code`, {
        params: {
          imp_rsp: polynom,
          message: message,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
      });
  },
  async getNextStep() {
    return await instance
      .get<string>(`/next_step`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
      });
  },
  async getDecoded(errors: string) {
    return await instance
      .get(`/decode`, {
        params: { errors },
      })
      .then((res) => res.data)
      .catch((error: any) => {
        throw new Error(error.message);
      });
  },
};
