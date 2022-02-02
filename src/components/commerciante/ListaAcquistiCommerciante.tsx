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
} from "@ionic/react";
import { Component } from "react";
import CommercianteService from "../../services/CommercianteService";
import { Acquisto } from "../../type/Object.type";

type Props = {};

type State = {
  acquisti: Array<Acquisto>;
};

export default class ListaAcquistiCommerciante extends Component<Props, State> {
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
      acquisti: await CommercianteService.getAllAcquisti(),
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
                  <IonCardContent>Id Cliente: {ac.idCliente}</IonCardContent>
                  <IonCardContent>registrato il: {ac.data}</IonCardContent>
                  <IonCardContent>dimensione: {ac.dimensione}</IonCardContent>
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>Non hai registrato Acquisti</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}
