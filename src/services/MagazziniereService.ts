import axios from "axios";
import authHeader from "../auth/AuthHeader";

const API_URL = "http://localhost:8080/magazziniere/";

class MagazziniereService {
  /**
   * Cercal'Ordine richiesto
   */
  getOrdine(idOrdine: string) {
    return axios
      .get(API_URL + "ordine", { params: { idOrdine }, headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        window.alert("Ordine con id: " + idOrdine + " non trovato");
      });
  }

  /**
   * Ritorna i dettagli dell'ordine cercato
   */
  getDettagliOrdine(idOrdine: string) {
    return axios
      .get(API_URL + "ordine-dettagli", {
        params: { idOrdine },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch();
  }

  /**
   * Permette di aggiornare lo stato della consegna dell'ordine
   */
  confermaRitiro(idOrdine: number) {
    return axios
      .get(API_URL + "conferma-ritiro", {
        params: { idOrdine },
        headers: authHeader(),
      })
      .then(() => {
        window.alert("Ritiro registrato");
      })
      .catch(() => {
        window.alert("Errore aggiornamento stato Ordine, riprovare");
      })
      .finally(() => (window.location.href = "/profilo"));
  }
}

export default new MagazziniereService();
