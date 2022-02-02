import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Component } from "react";
import CorriereService from "../../services/CorriereService";
import { Acquisto } from "../../type/Object.type";

type Props = {};

type State = {
  acquisti: Array<Acquisto>;
};

export default class ListaRitiri extends Component<Props, State> {
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
    let idConsegna = sessionStorage.getItem("idConsegna");
    if (idConsegna) {
      this.setState({
        acquisti: await CorriereService.getAllRitiri(idConsegna),
      });
      sessionStorage.removeItem("idConsegna");
    }
  }

  async getIndirizzo(idNegozio: number) {
    let indirizzo = await CorriereService.getIndirizzoRitiro(idNegozio);
    window.alert(indirizzo);
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
            {!vuota &&
              acquisti?.map((ac) => (
                <IonCard key={ac.id}>
                  <IonCardHeader>
                    <IonCardTitle>Acquisto</IonCardTitle>
                    <IonCardSubtitle>Id: {ac.id}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>id Cliente : {ac.idCliente}</IonCardContent>
                  <IonCardContent>dimensione : {ac.dimensione}</IonCardContent>
                  <IonCardContent>luogo: {ac.nomeNegozio}</IonCardContent>
                  <IonButton onClick={() => this.getIndirizzo(ac.idNegozio!)}>
                    indirizzo:{" "}
                  </IonButton>
                </IonCard>
              ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}
