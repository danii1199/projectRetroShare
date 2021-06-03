import http from "../Http-common";
import AuthHeader from "./Auth/AuthHeader";

const getAll = async () => {
  return http.get("/all", {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};
const get = (id) => {
  return http.get(`/find/${id}`, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};

const update = (id, data) => {
  return http.put(`/update/${id}`, data, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};

const remove = (id) => {
  return http.post(`/delete/${id}`, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};

const findByUserName = (userName) => {
  return http.get(`/all?userName=${userName}`, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};

const findByEmail = (email) => {
  return http.get(`/all?email=${email}`, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};

const getVinyl = () => {
  return http.get("/v-all");
};

const getGame = () => {
  return http.get("/g-all");
};

const getRecordPlayer = () => {
  return http.get("/rp-all");
};

const getGameConsole = () => {
  return http.get("/gc-all");
};

const getProducts = () => {
  return http.get("/pr-all");
};
const getOneProduct = (id) => {
  return http.get(`/pr/${id}`);
};

const findByProductName = (productName) => {
  return http.get(`/pr-all?name=${productName}`);
};

const createProduct = (data, tproduct, idUser, idProductStatus) => {
  return http.post(`/${tproduct}/${idUser}/${idProductStatus}`, data, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};

const deleteProduct = (id) => {
  return http.post(`/pr-delete/${id}`, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
  
};

const verification = (userName) => {
  return http.post(`/verification/${userName}`);
  
};

const addToCart = (idProduct) => {
  return http.post(`/addtocart/${idProduct}/1`, {
    headers: {
      Authorization: AuthHeader(),
    },
  });
};


const getCurrentCart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

const getMessages = () => {
  return http.get(`/chat-all`);
}
const findEmail = (email) => {
  return http.get(`/find-email/${email}`);
};

const disabled = (id) => {
  return http.post(`/disabled/${id}`, {
    headers: {
      Authorization: AuthHeader(),
    },
  });


  
};


const services = {
  getAll,
  get,
  update,
  remove,
  findByUserName,
  getVinyl,
  getGame,
  getGameConsole,
  getRecordPlayer,
  getOneProduct,
  getProducts,
  findByProductName,
  createProduct,
  deleteProduct,
  findByEmail,
  addToCart,
  getCurrentCart,
  getMessages,
  verification,
  disabled,
  findEmail
};

export default services;
