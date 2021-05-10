import http from "../../Http-common";

import AuthHeader from "./AuthHeader";

const getPublicContent = () => {
  return http.get("/all");
};

const getUserBoard = () => {
  return http.get("/user", { headers: AuthHeader() });
};

const getModeratorBoard = () => {
  return http.get("/mod", { headers: AuthHeader() });
};

const getAdminBoard = () => {
  return http.get("/admin", { headers: AuthHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
