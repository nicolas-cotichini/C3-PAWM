import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username: any, password: any) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/profilo";
      })
      .catch(() => {
        window.alert("Login fallita");
      });
  }

  logout() {
    window.sessionStorage.removeItem("user");
    window.location.href = "/login";
  }

  /**
   * @returns i dati inerenti il profilo
   */
  getProfilo() {
    return axios
      .get(API_URL + "profilo", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((e: Error) => {
        window.alert("Sessione terminata, fare il login");
        this.logout();
      });
  }

  getCurrentUser() {
    return JSON.parse(window.sessionStorage.getItem("user") || "{}");
  }
}

export default new AuthService();
