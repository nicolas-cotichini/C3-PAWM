import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { Component } from "react";
import CommercianteService from "../../services/CommercianteService";
import { Luogo, LuogoTipo } from "../../type/Object.type";

type Props = {};

type StateProfilo = {
  negozio: Luogo;
};

export default class Negozio extends Component<Props, StateProfilo> {
  constructor(pros: Props) {
    super(pros);
    this.state = {
      negozio: {
        id: 0,
        nome: "",
        orarioApertura: "",
        indirizzo: "",
        tipo: LuogoTipo.NEGOZIO,
        note: "",
      },
    };
  }
  componentDidMount() {
    this.retriveNegozio();
  }

  async retriveNegozio() {
    this.setState({
      negozio: await CommercianteService.getNegozio(),
    });
  }

  render() {
    let { negozio } = this.state;
    let vuota = true;
    if (negozio.id !== 0) vuota = false;
    return (
      <IonCard>
        {!vuota ? (
          <>
            <IonCardHeader>
              <IonCardTitle>{negozio.nome}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Orari: {negozio.orarioApertura}</IonCardContent>
            <IonCardContent>Posizione: {negozio.indirizzo}</IonCardContent>
            {negozio.note !== "" && (
              <IonCardContent>Info : {negozio.note} </IonCardContent>
            )}
          </>
        ) : (
          <IonCard color="warning">
            <IonCardHeader>
              <IonCardTitle>
                Nessun Negozio collegato al tuo profilo
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        )}
      </IonCard>
    );
  }
}
