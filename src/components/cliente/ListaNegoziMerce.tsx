import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { Component } from "react";
import ClienteService from "../../services/ClienteService";
import { Luogo } from "../../type/Object.type";

type Props = {
  merce: string;
};

type State = {
  luoghi: Array<Luogo>;
};

export default class ListaNegoziMerce extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      luoghi: [],
    };
  }

  componentDidMount() {
    this.retriveLuoghi();
  }

  async retriveLuoghi() {
    this.setState({
      luoghi: await ClienteService.getNegoziMerce(this.props.merce),
    });
  }

  render() {
    let { luoghi } = this.state;
    let vuota = true;
    if (luoghi.length !== 0) vuota = false;

    return (
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar></IonToolbar>
          </IonHeader>
          <IonList>
            {!vuota &&
              luoghi?.map((lg) => (
                <IonCard key={lg.id}>
                  <IonCardHeader>
                    <IonCardTitle>{lg.tipo.toString()}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent> {lg.nome}</IonCardContent>
                  <IonCardContent>Posizione : {lg.indirizzo}</IonCardContent>
                  {lg.note !== "" && (
                    <IonCardContent>Info : {lg.note} </IonCardContent>
                  )}
                </IonCard>
              ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}
