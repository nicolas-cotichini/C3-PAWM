import axios from "axios";
import authHeader from "../auth/AuthHeader";
import { Cliente } from "../type/Object.type";

const API_URL = "http://localhost:8080/cliente/";

class ClienteService {
  /**
   * Permette di registrare un nuovo profilo Cliente
   */
  registraCliente(cliente: Cliente) {
    return axios
      .post(API_URL + "registrazione", cliente)
      .then(() => {
        window.alert("Registrazione avvenuta con successo");
        window.location.href = "/home";
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  /**
   * Permette di eliminare un profilo Cliente
   */
  cancellaCliente() {
    return axios
      .delete(API_URL + "eliminazione", { headers: authHeader() })
      .then(() => {
        window.location.replace("/home");
        window.alert("Profilo eliminato");
      })
      .catch((error) => {
        console.log(error);
        window.alert(
          "Impossibile eliminare profilo, controlla di aver ritirato i tuoi Acquisti prima!"
        );
        window.location.href = "/profilo";
      });
  }

  /**
   * Permette di controllare tutti gli Acquisti effettuati dal cliente
   */
  getAllAcquisti() {
    return axios
      .get(API_URL + "lista-acquisti", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Ricerca tutti gli Ordini effettuati dal Cliente
   */
  getAllOrdini() {
    return axios
      .get(API_URL + "lista-ordini", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Cerca i dettagli dell'Ordine richiesto
   */
  getDettagliOrdine(idOrdine: string) {
    return axios
      .get(API_URL + "ordine", { params: { idOrdine }, headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.alert(error.response.data);
        window.location.href = "/profilo";
      });
  }

  /**
   * Permette di generare un ordine e ne salva l'id
   */
  generaOrdine() {
    return axios
      .get(API_URL + "genera-ordine", { headers: authHeader() })
      .then((response) => {
        sessionStorage.setItem("id", response.data);
        window.location.href = "/seleziona-luogo-consegna";
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  /**
   * Permette di creare un ordine scegliendo il punto ritiro
   */
  creaOrdine(idLuogo: number) {
    let idOrdine = sessionStorage.getItem("id");
    return axios
      .get(API_URL + "crea-ordine", {
        params: { idOrdine, idLuogo },
        headers: authHeader(),
      })
      .then(() => {
        window.alert(
          "Ordine effettuato, monitora lo stato della consegna dal tuo profilo"
        );
      })
      .catch((error) => {
        window.alert(error.response.data);
      })
      .finally(() => {
        sessionStorage.removeItem("id");
        window.location.href = "/home";
      });
  }

  /**
   * Ricerca i luoghi in cui è possibile far consegnare l'Ordine
   */
  getLuoghiConsegna() {
    return axios
      .get(API_URL + "cerca-luoghi-consegna", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        window.alert(
          "Errore, si prega di scegliere un luogo consegna dalla lista degli ordini"
        );
        window.location.href = "/home";
      });
  }

  /**
   * Ricerca tutti i negozi che hanno la merce desiderata
   */
  getNegoziMerce(merce: string) {
    return axios
      .get(API_URL + "cerca-negozi-merce", {
        params: { merce },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.alert(error.response.data);
        window.location.href = "/cerca-merce";
      })
      .finally(() => window.sessionStorage.removeItem("merce"));
  }
}

export default new ClienteService();
