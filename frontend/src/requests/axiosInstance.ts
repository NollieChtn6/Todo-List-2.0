import axios from "axios";

const BASE_API: string = "http://localhost:3000/api";

export const axiosInstance = axios.create({
	baseURL: BASE_API,
});
