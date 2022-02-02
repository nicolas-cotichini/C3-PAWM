import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonList,
  IonButton,
} from "@ionic/react";
import { Component } from "react";
import CommercianteService from "../../services/CommercianteService";
import { Merce } from "../../type/Object.type";

type Props = {};

type State = {
  merci: Array<Merce>;
};

export default class ListaNegoziMerce extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      merci: [],
    };
  }

  componentDidMount() {
    this.retriveAcquisti();
  }

  async retriveAcquisti() {
    this.setState({
      merci: await CommercianteService.getAllMerci(),
    });
  }

  eliminaMerce(nomeMerce: string) {
    let ask = window.confirm("Vuoi davvero eliminare " + nomeMerce + "?");
    if (ask) CommercianteService.eliminaMerce(nomeMerce);
  }

  render() {
    let { merci } = this.state;
    let vuota = true;
    if (merci.length !== 0) vuota = false;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {!vuota ? (
              merci?.map((mc) => (
                <IonCard key={mc.nome}>
                  <IonCardHeader>
                    <IonCardTitle>{mc.nome}</IonCardTitle>
                  </IonCardHeader>
                  <IonButton
                    color="danger"
                    onClick={(e) => this.eliminaMerce(mc.nome)}
                  >
                    Elimina Merce
                  </IonButton>
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>
                    Non ci sono Merci collegate al tuo Negozio
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
