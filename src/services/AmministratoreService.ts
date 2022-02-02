import axios from "axios";
import authHeader from "../auth/AuthHeader";
import { Luogo, Personale } from "../type/Object.type";

const API_URL = "http://localhost:8080/amministratore/";

class AmministratoreService {
  /**
   * Permette di registrare un nuovo profilo Personale
   */
  registraPersonale(personale: Personale) {
    let url = personale.ruolo?.toString().toLowerCase();
    return axios
      .post(API_URL + "registrazione-" + url, personale, {
        headers: authHeader(),
      })
      .then(() => {
        window.alert("Registrazione avvenuta con successo");
        window.location.href = "/home";
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  /**
   * Permette di registrare un nuovo profilo interfaccia Locker
   */
  registraInterfaccia(interfaccia: Personale) {
    return axios
      .post(API_URL + "registrazione-interfaccia-locker", interfaccia, {
        headers: authHeader(),
      })
      .then(() => {
        window.alert("Registrazione avvenuta con successo");
        window.location.href = "/home";
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  /**
   * Cerca il personale con id specificato
   */
  getPersonaleById(idPersonale: string) {
    return axios
      .get(API_URL + "personale", {
        params: { idPersonale },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.alert(error.response.data);
        window.location.href = "/profilo";
      });
  }

  /**
   * Cerca tutto il personale di una determinata tipologia
   */
  getPersonaleByTipo(ruolo: string) {
    return axios
      .get(API_URL + "lista-personale", {
        params: { ruolo },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.alert(error.response.data);
        window.location.href = "/profilo";
      });
  }

  eliminaPersonale(idPersonale: number) {
    return axios
      .delete(API_URL + "elimina-personale", {
        params: { idPersonale },
        headers: authHeader(),
      })
      .then(() => {
        window.alert("Personale eliminato");
      })
      .catch((error) => {
        window.alert(error.response.data);
      })
      .finally(() => (window.location.href = "/profilo"));
  }

  /**
   * Permette di registrare un nuovo profilo Personale
   */
  registraLuogo(luogo: Luogo) {
    let url = luogo.tipo.toString().toLowerCase();
    return axios
      .post(API_URL + "registrazione-" + url, luogo, {
        headers: authHeader(),
      })
      .then(() => {
        window.alert("Registrazione avvenuta con successo");
        window.location.href = "/home";
      })
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  /**
   * Cerca il luogo con id specificato
   */
  getLuogoById(idLuogo: string) {
    return axios
      .get(API_URL + "luogo", {
        params: { idLuogo },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.alert(error.response.data);
        window.location.href = "/profilo";
      });
  }

  /**
   * Cerca tutti i luoghi di una determinata tipologia
   */
  getLuoghiByTipo(tipo: string) {
    return axios
      .get(API_URL + "lista-luogo", {
        params: { tipo },
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.alert(error.response.data);
        window.location.href = "/profilo";
      });
  }

  eliminaLuogo(idLuogo: number) {
    return axios
      .delete(API_URL + "elimina-luogo", {
        params: { idLuogo },
        headers: authHeader(),
      })
      .then(() => {
        window.alert("Luogo eliminato");
      })
      .catch((error) => {
        window.alert(
          "Impossibile eliminare luogo al momento, " + error.response.data
        );
      })
      .finally(() => (window.location.href = "/profilo"));
  }
}

export default new AmministratoreService();
