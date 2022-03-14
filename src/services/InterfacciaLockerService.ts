import axios from "axios";
import authHeader from "../auth/AuthHeader";
import AuthService from "../auth/AuthService";

const API_URL = "http://localhost:8080/locker/";

class InterfacciaLockerService {
  apriCella(password: string) {
    return axios
      .get(API_URL + "apri-cella", {
        params: { password },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}

export default new InterfacciaLockerService();
