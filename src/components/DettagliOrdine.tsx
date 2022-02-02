import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { Component } from "react";
import ClienteService from "../services/ClienteService";
import CorriereService from "../services/CorriereService";
import { OrdineInfo } from "../type/Object.type";

type Props = {};

type State = {
  dettagli: OrdineInfo;
};

export default class DettagliOrdine extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dettagli: {
        luogo: "",
        indirizzo: "",
        password: [],
      },
    };
  }

  componentDidMount() {
    this.retriveDettagli();
  }

  async retriveDettagli() {
    let id = sessionStorage.getItem("idOrdine");
    let idcon = sessionStorage.getItem("idConsegna");
    if (id) {
      this.setState({
        dettagli: await ClienteService.getDettagliOrdine(id),
      });
      window.sessionStorage.removeItem("idOrdine");
    } else if (idcon) {
      this.setState({
        dettagli: await CorriereService.getDettagliOrdine(idcon),
      });
      window.sessionStorage.removeItem("idConsegna");
    }
  }

  render() {
    let { dettagli } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Dettagli Ordine</IonCardTitle>
              <IonCardSubtitle>Luogo: {dettagli.luogo}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Indirizzo : {dettagli.indirizzo}</IonCardContent>
            <IonCardContent>
              {" "}
              Password:
              {dettagli.password !== null
                ? dettagli.password?.map((rd) => <li key={rd}>{rd}</li>)
                : " non richieta"}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}
