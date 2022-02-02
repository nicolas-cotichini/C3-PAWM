import {
  IonButton,
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

type Props = {};

type State = {
  luoghi: Array<Luogo>;
};

export default class ListaLuoghiConsegna extends Component<Props, State> {
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
      luoghi: await ClienteService.getLuoghiConsegna(),
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
            {!vuota ? (
              luoghi?.map((lg) => (
                <IonCard key={lg.id}>
                  <IonCardHeader>
                    <IonCardTitle>{lg.tipo}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent> {lg.nome}</IonCardContent>
                  <IonCardContent>Posizione : {lg.indirizzo}</IonCardContent>
                  {lg.note !== "" && (
                    <IonCardContent>Info : {lg.note} </IonCardContent>
                  )}
                  {lg.tipo.toString() === "MAGAZZINO" ? (
                    <IonCardContent>
                      orari : {lg.orarioApertura}{" "}
                    </IonCardContent>
                  ) : (
                    <IonCardContent></IonCardContent>
                  )}

                  <IonButton onClick={() => ClienteService.creaOrdine(lg.id)}>
                    Consegna qui
                  </IonButton>
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>
                    Non ci luoghi disponibili alla consegna attualmente
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
