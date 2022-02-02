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
import { Luogo, LuogoTipo } from "../../type/Object.type";
import { RegistraInterfacciaLocker } from "./RegistraProfiloInterfaccia";

type Props = {
  id: string;
  tipo: LuogoTipo;
};

type State = {
  luoghi: Array<Luogo>;
  creaInterfaccia: boolean;
  idLocker: number;
};

export default class ListaLuoghi extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      luoghi: [],
      creaInterfaccia: false,
      idLocker: 0,
    };
  }

  componentDidMount() {
    this.retriveLuoghi();
  }

  async retriveLuoghi() {
    if (this.props.id)
      this.setState({
        luoghi: await AmministratoreService.getLuogoById(this.props.id),
      });
    else if (this.props.tipo)
      this.setState({
        luoghi: await AmministratoreService.getLuoghiByTipo(
          this.props.tipo.toString().toLowerCase()
        ),
      });
  }

  creaInterfacciaLocker(idLock: number) {
    this.setState({
      creaInterfaccia: true,
      idLocker: idLock,
    });
  }

  eliminaLuogo(idLuogo: number) {
    let ask = window.confirm(
      "Vuoi davvero eliminare il luogo con id:" + idLuogo + "?"
    );
    if (ask) AmministratoreService.eliminaLuogo(idLuogo);
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
                  {lg.tipo.toString() === "LOCKER" && !lg.interfaccia ? (
                    <IonButton
                      color="warning"
                      onClick={() => this.creaInterfacciaLocker(lg.id)}
                    >
                      Aggiungi profilo interfaccia
                    </IonButton>
                  ) : (
                    <IonCardContent></IonCardContent>
                  )}
                  <IonButton
                    color="danger"
                    onClick={() => this.eliminaLuogo(lg.id)}
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
          {this.state.creaInterfaccia && (
            <RegistraInterfacciaLocker id={this.state.idLocker} />
          )}
        </IonContent>
      </IonPage>
    );
  }
}
