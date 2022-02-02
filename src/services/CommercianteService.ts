import axios from "axios";
import authHeader from "../auth/AuthHeader";
import { Acquisto, Merce } from "../type/Object.type";

const API_URL = "http://localhost:8080/commerciante/";

class CommercianteService {
  /**
   * Permette di creare una nuova merce
   */
  creaMerce(merce: Merce) {
    return axios
      .post(API_URL + "crea-merce", merce, { headers: authHeader() })
      .then((response) => {
        window.alert(response.data);
      })
      .catch((error) => {
        window.alert(error.response.data);
      })
      .finally(() => {
        window.location.replace("/home");
      });
  }

  /**
   * Permette di eliminare la merce dal proprio negozio
   */
  eliminaMerce(nomeMerce: string) {
    return axios
      .delete(API_URL + "elimina-merce", {
        params: { nomeMerce },
        headers: authHeader(),
      })
      .then((response) => {
        window.alert(response.data);
      })
      .catch((error) => {
        window.alert(error.response.data);
      })
      .finally(() => {
        window.location.replace("/home");
      });
  }

  /**
   * Permette di visionare tutte le merci
   */
  getAllMerci() {
    return axios
      .get(API_URL + "lista-merci", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Permette di creare un nuovo acquisto
   */
  creaAcquisto(acquisto: Acquisto) {
    return axios
      .post(API_URL + "crea-acquisto", acquisto, { headers: authHeader() })
      .then((response) => {
        window.alert("L'id dell'acquisto è: " + response.data);
      })
      .catch(() => {
        window.alert("Id cliente non trovato");
      })
      .finally(() => {
        window.location.replace("/crea-acquisto");
      });
  }

  /**
   * Permette di visionare tutti gli acquisti
   */
  getAllAcquisti() {
    return axios
      .get(API_URL + "lista-acquisti", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Ritorna i dettagli del negozio legati al commerciante
   */
  getNegozio() {
    return axios
      .get(API_URL + "negozio", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new CommercianteService();
