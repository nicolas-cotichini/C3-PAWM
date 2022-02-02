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
import { Component } from "react";
import ClienteService from "../../services/ClienteService";
import { Acquisto } from "../../type/Object.type";

type Props = {};

type State = {
  acquisti: Array<Acquisto>;
};

export default class ListaAcquisti extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      acquisti: [],
    };
  }

  componentDidMount() {
    this.retriveAcquisti();
  }

  async retriveAcquisti() {
    this.setState({
      acquisti: await ClienteService.getAllAcquisti(),
    });
  }

  render() {
    let { acquisti } = this.state;
    let vuota = true;
    if (acquisti.length !== 0) vuota = false;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {!vuota ? (
              acquisti?.map((ac) => (
                <IonCard key={ac.id}>
                  <IonCardHeader>
                    <IonCardTitle>Acquisto</IonCardTitle>
                    <IonCardSubtitle>Id: {ac.id}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    effettuato in : {ac.nomeNegozio}
                  </IonCardContent>
                  <IonCardContent>il : {ac.data}</IonCardContent>
                  {ac.ordinato ? (
                    <IonCardContent>Stato : Ordinato</IonCardContent>
                  ) : (
                    <>
                      <IonCardContent>Stato : Da ordinare</IonCardContent>
                      <IonButton onClick={ClienteService.generaOrdine}>
                        Effettua Ordine
                      </IonButton>
                    </>
                  )}
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>Non hai effettuato acquisti</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}
