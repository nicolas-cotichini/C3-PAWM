import axios from "axios";
import authHeader from "../auth/AuthHeader";

const API_URL = "http://localhost:8080/corriere/";

class CorriereService {
  /**
   * Ricerca tutti gli ordini da evadere
   */
  getAllConsegne() {
    return axios
      .get(API_URL + "lista-consegne", { headers: authHeader() })
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
      });
  }

  /**
   * Permette di controllare tutti gli Acquisti effettuati dal cliente
   */
  getAllRitiri(idOrdine: string) {
    return axios
      .get(API_URL + "lista-ritiri", {
        params: { idOrdine },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Ritorna la via del negozio
   */
  getIndirizzoRitiro(idNegozio: number) {
    return axios
      .get(API_URL + "indirizzo-ritiro", {
        params: { idNegozio },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * Permette di aggiornare lo stato della consegna dell'ordine
   */
  confermaConsegna(idOrdine: number) {
    return axios
      .get(API_URL + "conferma-consegna", {
        params: { idOrdine },
        headers: authHeader(),
      })
      .then((response) => {
        window.alert("Consegna registrata");
      })
      .catch(() => {
        window.alert("Errore aggiornamento stato Ordine, riprovare");
      })
      .finally(() => (window.location.href = "/lista-consegne"));
  }

  modificaLuogoConsegna(idLuogo: number) {
    let idOrdine = sessionStorage.getItem("idOrdine");
    return axios
      .get(API_URL + "modifica-luogo-consegna", {
        params: { idOrdine, idLuogo },
        headers: authHeader(),
      })
      .then(() => {
        window.alert("Modifica effettuata con successo!");
      })
      .catch((error) => {
        window.alert(error.response.data);
      })
      .finally(() => {
        sessionStorage.removeItem("idOrdine");
        window.location.href = "/lista-consegne";
      });
  }

  /**
   * Ritorna la lista dei magazzini
   */
  getAllMagazzini() {
    return axios
      .get(API_URL + "lista-magazzini", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Ritorna lo stato in servizio del corriere
   */
  getOperativo() {
    return axios
      .get(API_URL + "stato", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Permette di modificare lo stato in servizio del corriere
   */
  setOperativo() {
    return axios
      .get(API_URL + "cambia-stato", { headers: authHeader() })
      .then(() => {
        window.alert("Cambio stato effettuato con successo");
      })
      .catch(() => {
        window.alert("Aggiornamento stato operativo fallito, ritentare");
      })
      .finally(() => (window.location.href = "/profilo"));
  }
}

export default new CorriereService();
