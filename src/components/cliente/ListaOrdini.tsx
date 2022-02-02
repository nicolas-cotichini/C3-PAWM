import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React, { Component } from "react";
import ClienteService from "../../services/ClienteService";
import { Ordine } from "../../type/Object.type";

type Props = {};

type State = {
  ordini: Array<Ordine>;
};

export default class ListaOrdini extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ordini: [],
    };
  }

  componentDidMount() {
    this.retriveOrdini();
  }

  async retriveOrdini() {
    this.setState({
      ordini: await ClienteService.getAllOrdini(),
    });
  }

  render() {
    let { ordini } = this.state;
    let vuota = true;
    if (ordini.length !== 0) vuota = false;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {!vuota ? (
              ordini?.map((or) => (
                <IonCard key={or.id}>
                  <IonCardHeader>
                    <IonCardTitle>Ordine</IonCardTitle>
                    <IonCardSubtitle>Id: {or.id}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Stato : {or.stato}</IonCardContent>
                  {or.stato === "DA_ORDINARE" && (
                    <IonButton
                      onClick={() =>
                        sessionStorage.setItem("id", or.id.toString())
                      }
                      routerLink="/seleziona-luogo-consegna"
                    >
                      Effettua Ordine
                    </IonButton>
                  )}
                  {or.stato === "CONSEGNATO" && (
                    <IonButton
                      onClick={() =>
                        sessionStorage.setItem("idOrdine", or.id.toString())
                      }
                      routerLink="/dettagli-ordine"
                    >
                      Dettagli:
                    </IonButton>
                  )}
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>Non hai effettuato ordini</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}
