import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Component } from "react";
import MagazziniereService from "../../services/MagazziniereService";
import { Ordine, OrdineInfo } from "../../type/Object.type";

type Props = {
  idOrdine: string;
};

type State = {
  ordine: Ordine;
  dettagli: OrdineInfo;
};

export default class DettagliOrdineMagazzino extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ordine: {
        id: 0,
        idCliente: 0,
        stato: "string",
        data: "string",
      },
      dettagli: {
        luogo: "",
        indirizzo: "",
      },
    };
  }

  componentDidMount() {
    this.retriveDettagli();
  }

  async retriveDettagli() {
    this.setState({
      ordine: await MagazziniereService.getOrdine(this.props.idOrdine),
    });
    this.setState({
      dettagli: await MagazziniereService.getDettagliOrdine(
        this.props.idOrdine
      ),
    });
  }

  render() {
    let ordine = this.state.ordine;
    let dettagli = this.state.dettagli;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {ordine ? (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Ordine id: {ordine.id}</IonCardTitle>
                <IonCardSubtitle>Luogo: {dettagli.luogo}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Indirizzo: {dettagli.indirizzo}</IonCardContent>
              <IonCardContent>Id Cliente: {ordine.idCliente}</IonCardContent>
              <IonButton
                onClick={() => MagazziniereService.confermaRitiro(ordine.id)}
              >
                Conferma Ritiro
              </IonButton>
            </IonCard>
          ) : (
            <IonCard color="warning">
              <IonCardHeader>
                <IonCardTitle>Ordine non trovato</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          )}
        </IonContent>
      </IonPage>
    );
  }
}
