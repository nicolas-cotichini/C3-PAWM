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
} from "@ionic/react";

import { useState } from "react";
import ListaNegoziMerce from "./ListaNegoziMerce";

export const CercaMerce: React.FC = () => {
  const [merce, setMerce] = useState<string>();
  const [messErr, setMessErr] = useState<String>();
  const [trovato, setTrovato] = useState<boolean>(false);

  const cercaMerce = () => {
    if (merce) {
      setTrovato(true);
    } else setMessErr("Inserire nome merce");
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
                  placeholder="Cosa stai cercando?"
                  value={merce}
                  onIonChange={(e) => setMerce(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={cercaMerce}>Cerca</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {messErr && <IonItem color="warning">{messErr}</IonItem>}
        </IonGrid>
      </IonContent>
      {trovato && <ListaNegoziMerce merce={merce!} />}
    </IonPage>
  );
};
