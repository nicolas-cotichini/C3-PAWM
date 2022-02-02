import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";

import { closeCircleSharp, logOut } from "ionicons/icons";
import { Component } from "react";
import ReactDOM from "react-dom";

import AuthService from "../auth/AuthService";

import ClienteService from "../services/ClienteService";
import CorriereService from "../services/CorriereService";
import { Profilo } from "../type/Object.type";
import Negozio from "./commerciante/Negozio";
import { InterfacciaLocker } from "./interfacciaLocker/InterfacciaLocker";

type Props = {};

type StateProfilo = {
  profilo: Profilo;
  operativo?: boolean;
};

export default class ProfiloDettagli extends Component<Props, StateProfilo> {
  constructor(pros: Props) {
    super(pros);
    this.state = {
      profilo: {
        id: 0,
        nome: "",
        cognome: "",
        email: "",
        ruolo: "",
      },
      operativo: false,
    };
  }

  componentDidMount() {
    this.retriveProfilo();
  }

  async retriveProfilo() {
    this.setState({
      profilo: await AuthService.getProfilo(),
    });
    if (this.state.profilo.ruolo === "CORRIERE")
      this.setState({
        operativo: await CorriereService.getOperativo(),
      });
    AuthService.aggiornaToken();
  }

  render() {
    let { profilo } = this.state;

    function deleteCliente() {
      if (profilo.ruolo === "CLIENTE") {
        let ask = window.confirm("Vuoi davvero eliminare il tuo Account?");
        if (ask) ClienteService.cancellaCliente();
      }
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonRow>
                <IonCol />
                <IonCardTitle>I tuoi dati</IonCardTitle>
                <IonCol />
              </IonRow>
              <IonCardSubtitle>Id: {profilo.id}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Nome : {profilo.nome}</IonCardContent>
            <IonCardContent>Cognome : {profilo.cognome}</IonCardContent>
            <IonCardContent>Email : {profilo.email}</IonCardContent>
            <IonCardContent>Tipo profilo : {profilo.ruolo}</IonCardContent>
            {this.state.profilo.ruolo === "CORRIERE" && (
              <IonCardContent>
                Stato : {this.state.operativo ? "Operativo" : "Non operativo"}
              </IonCardContent>
            )}
          </IonCard>
          {/* Amministratore */}
          {this.state.profilo.ruolo === "AMMINISTRATORE" && (
            <IonCard>
              <IonRow>
                <IonCol />
                <IonButton href="/registrazione-personale">
                  Aggiungi Personale
                </IonButton>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol />
                <IonButton href="/eliminazione-personale">
                  Rimuovi Personale
                </IonButton>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol />
                <IonButton href="/registrazione-luogo">
                  Aggiungi Luogo
                </IonButton>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol />
                <IonButton href="/eliminazione-luogo">Gestisci Luogo</IonButton>
                <IonCol />
              </IonRow>
            </IonCard>
          )}
          {/* Cliente */}
          {this.state.profilo.ruolo === "CLIENTE" && (
            <IonCard>
              <IonRow>
                <IonCol />
                <IonButton href="/lista-acquisti">I tuoi Acquisti</IonButton>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol />
                <IonButton href="/lista-ordini">I tuoi Ordini</IonButton>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol />
                <IonButton href="/cerca-merce">Cerca Merce</IonButton>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol />
                <IonButton onClick={deleteCliente} color="danger">
                  Elimina Account
                  <IonIcon icon={closeCircleSharp} />
                </IonButton>
                <IonCol />
              </IonRow>
            </IonCard>
          )}
          {/* Commerciante */}
          {this.state.profilo.ruolo === "COMMERCIANTE" && (
            <>
              <Negozio />
              <IonCard>
                <IonRow>
                  <IonCol />
                  <IonButton href="/lista-acquisti-commerciante">
                    Acquisti Registrati
                  </IonButton>
                  <IonCol />
                </IonRow>
                <IonRow>
                  <IonCol />
                  <IonButton href="/crea-acquisto">
                    Crea Nuovo Acquisto
                  </IonButton>
                  <IonCol />
                </IonRow>
                <IonRow>
                  <IonCol />
                  <IonButton href="/crea-merce">Aggiungi Merce</IonButton>
                  <IonCol />
                </IonRow>
                <IonRow>
                  <IonCol />
                  <IonButton href="/lista-merci-negozio">
                    Le tue merci
                  </IonButton>
                  <IonCol />
                </IonRow>
              </IonCard>
            </>
          )}
          {/* Corriere */}
          {this.state.profilo.ruolo === "CORRIERE" && (
            <IonCard>
              <IonRow>
                <IonCol />
                <IonButton href="/lista-consegne">Consegne</IonButton>
                <IonCol />
              </IonRow>
              <IonRow>
                <IonCol />
                <IonButton
                  onClick={CorriereService.setOperativo}
                  color="tertiary"
                >
                  {this.state.operativo ? "Termina turno" : "Inizia turno"}
                </IonButton>
                <IonCol />
              </IonRow>
            </IonCard>
          )}
          {/* Magazziniere */}
          {this.state.profilo.ruolo === "MAGAZZINIERE" && (
            <IonCard>
              <IonRow>
                <IonCol />
                <IonButton href="/cerca-ordine">Cerca Ordine</IonButton>
                <IonCol />
              </IonRow>
            </IonCard>
          )}
          {/* Locker */}
          {this.state.profilo.ruolo === "INTLOCKER" &&
            ReactDOM.render(
              <InterfacciaLocker />,
              document.getElementById("root")
            )}
          ;
          <IonRow>
            <IonCol />
            <IonButton onClick={AuthService.logout}>
              Logout
              <IonIcon icon={logOut} />
            </IonButton>
            <IonCol />
          </IonRow>
        </IonContent>
      </IonPage>
    );
  }
}
