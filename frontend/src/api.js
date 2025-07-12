import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const fetchQuestions = () => API.get("/questions");
export const fetchQuestionById = (id) => API.get(/questions/${id});
export const postAnswer = (answer) => API.post("/answers", answer);
export const voteAnswer = (data) => API.post("/votes", data);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (userData) => API.post("/auth/register", userData);