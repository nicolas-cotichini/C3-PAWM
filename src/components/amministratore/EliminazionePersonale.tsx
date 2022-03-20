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
import { PersonaleTipo } from "../../type/Object.type";
import ListaPersonale from "./ListaPersonale";

export const EliminazionePersonale: React.FC = () => {
  const [tipo, setTipo] = useState<PersonaleTipo>();
  const [idPersonale, setIdPersonale] = useState<string>();
  const [messErrId, setMessErrId] = useState<string>();
  const [messErrTipo, setMessErrTipo] = useState<String>();
  const [trovato, setTrovato] = useState<boolean>(false);

  const StringIsNumber = (value: string) => isNaN(Number(value)) === true;

  const cercaPersonaleId = () => {
    if (idPersonale) {
      setTipo(undefined);
      setTrovato(true);
    } else {
      setMessErrTipo("");
      setMessErrId("Inserire Id");
    }
  };

  const cercaPersonaleTipo = () => {
    if (tipo) {
      setIdPersonale(undefined);
      setTrovato(true);
    } else {
      setMessErrId("");
      setMessErrTipo("Inserire tipologia personale");
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
                  placeholder="Id"
                  value={idPersonale}
                  onIonChange={(e) => setIdPersonale(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={cercaPersonaleId}>Cerca per Id</IonButton>
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
                    {Object.keys(PersonaleTipo)
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
              <IonButton onClick={cercaPersonaleTipo}>
                Cerca per Tipologia
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {messErrTipo && <IonItem color="warning">{messErrTipo}</IonItem>}
        </IonGrid>
      </IonContent>
      {trovato && <ListaPersonale id={idPersonale!} tipo={tipo!} />}
    </IonPage>
  );
};
