import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonItem,
  IonInput,
  IonButton,
  IonSelect,
  IonList,
  IonSelectOption,
} from "@ionic/react";
import { useState } from "react";
import { LuogoTipo } from "../../type/Object.type";
import ListaLuoghi from "./ListaLuoghi";

export const EliminazioneLuogo: React.FC = () => {
  const [tipo, setTipo] = useState<LuogoTipo>();
  const [idLuogo, setIdLuogo] = useState<string>();
  const [messErrId, setMessErrId] = useState<string>();
  const [messErrTipo, setMessErrTipo] = useState<String>();
  const [trovato, setTrovato] = useState<boolean>(false);

  const StringIsNumber = (value: string) => isNaN(Number(value)) === true;

  const cercaLuogoId = () => {
    if (idLuogo) {
      setTipo(undefined);
      setTrovato(true);
    } else {
      setMessErrTipo("");
      setMessErrId("Inserire Id luogo");
    }
  };

  const cercaLuogoTipo = () => {
    if (tipo) {
      setIdLuogo(undefined);
      setTrovato(true);
    } else {
      setMessErrId("");
      setMessErrTipo("Inserire tipologia luogo");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCol></IonCol>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  type="text"
                  placeholder="Id Luogo"
                  value={idLuogo}
                  onIonChange={(e) => setIdLuogo(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={cercaLuogoId}>Cerca per Id</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {messErrId && <IonItem color="warning">{messErrId}</IonItem>}
          <IonRow>
            <IonCol />
            <IonCol size="8">
              <IonItem>
                <IonSelect
                  value={tipo}
                  placeholder="Seleziona Tipo"
                  onIonChange={(e) => setTipo(e.detail.value)}
                >
                  <IonList>
                    {Object.keys(LuogoTipo)
                      .filter(StringIsNumber)
                      .map((x) => (
                        <IonSelectOption key={x} value={x}>
                          {x}
                        </IonSelectOption>
                      ))}
                  </IonList>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol />
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={cercaLuogoTipo}>
                Cerca per Tipologia
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {messErrTipo && <IonItem color="warning">{messErrTipo}</IonItem>}
        </IonGrid>
      </IonContent>
      {trovato && <ListaLuoghi id={idLuogo!} tipo={tipo!} />}
    </IonPage>
  );
};
