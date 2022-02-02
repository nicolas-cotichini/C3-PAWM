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
import AmministratoreService from "../../services/AmministratoreService";
import { PersonaleTipo, Profilo } from "../../type/Object.type";

type Props = {
  id: string;
  tipo: PersonaleTipo;
};

type State = {
  personale: Array<Profilo>;
};

export default class ListaPersonale extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      personale: [],
    };
  }

  componentDidMount() {
    this.retrivePersonale();
  }

  async retrivePersonale() {
    if (this.props.id)
      this.setState({
        personale: await AmministratoreService.getPersonaleById(this.props.id),
      });
    else if (this.props.tipo)
      this.setState({
        personale: await AmministratoreService.getPersonaleByTipo(
          this.props.tipo.toString().toLowerCase()
        ),
      });
  }

  eliminaPersonale(idPersonale: number) {
    let ask = window.confirm(
      "Vuoi davvero eliminare il luogo con id:" + idPersonale + "?"
    );
    if (ask) AmministratoreService.eliminaPersonale(idPersonale);
  }

  render() {
    let { personale } = this.state;
    let vuota = true;
    if (personale.length !== 0) vuota = false;

    return (
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar></IonToolbar>
          </IonHeader>
          <IonList>
            {!vuota ? (
              personale?.map((ps) => (
                <IonCard key={ps.id}>
                  <IonCardHeader>
                    <IonCardTitle>{ps.ruolo}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent> {ps.nome}</IonCardContent>
                  <IonCardContent>{ps.cognome}</IonCardContent>
                  <IonCardContent> {ps.email}</IonCardContent>

                  <IonButton
                    color="danger"
                    onClick={() => this.eliminaPersonale(ps.id)}
                  >
                    Elimina
                  </IonButton>
                </IonCard>
              ))
            ) : (
              <IonCard color="warning">
                <IonCardHeader>
                  <IonCardTitle>
                    Non ci sono luoghi che rispettino i parametri
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
