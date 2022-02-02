import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Component } from "react";
import CorriereService from "../../services/CorriereService";
import { Luogo } from "../../type/Object.type";

type Props = {};

type State = {
  luoghi: Array<Luogo>;
};

export default class ListaMagazzini extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      luoghi: [],
    };
  }

  componentDidMount() {
    this.retriveMagazzini();
  }

  async retriveMagazzini() {
    this.setState({
      luoghi: await CorriereService.getAllMagazzini(),
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
                  <IonCardContent>orari : {lg.orarioApertura} </IonCardContent>

                  <IonButton
                    onClick={() => CorriereService.modificaLuogoConsegna(lg.id)}
                  >
                    Consegna qui
                  </IonButton>
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>
                    Non ci magazzini disponibili alla consegna attualmente
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
