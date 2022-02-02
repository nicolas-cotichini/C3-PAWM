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
  IonButton,
} from "@ionic/react";
import { Component } from "react";
import CorriereService from "../../services/CorriereService";
import { Ordine } from "../../type/Object.type";

type Props = {};

type State = {
  ordini: Array<Ordine>;
};

export default class ListaConsegne extends Component<Props, State> {
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
      ordini: await CorriereService.getAllConsegne(),
    });
  }

  confermaConsegna(idOrdine: number) {
    let ask = window.confirm("Consegna effettuata?");
    if (ask) CorriereService.confermaConsegna(idOrdine);
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
                  <IonButton
                    onClick={() =>
                      sessionStorage.setItem("idConsegna", or.id.toString())
                    }
                    routerLink="/dettagli-ordine"
                  >
                    Dettagli Consegna:
                  </IonButton>
                  <IonButton
                    onClick={() =>
                      sessionStorage.setItem("idConsegna", or.id.toString())
                    }
                    routerLink="/lista-ritiri"
                  >
                    Dettagli Ritiro:
                  </IonButton>
                  <IonButton onClick={() => this.confermaConsegna(or.id)}>
                    Conferma consegna
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() =>
                      sessionStorage.setItem("idOrdine", or.id.toString())
                    }
                    routerLink="/lista-magazzini"
                  >
                    Modifica Luogo Consegna
                  </IonButton>
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>
                    Non hai consegne da effettuare al momento
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}
