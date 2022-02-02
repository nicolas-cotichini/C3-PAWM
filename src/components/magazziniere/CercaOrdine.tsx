import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { cube } from "ionicons/icons";
import { useState } from "react";
import DettagliOrdineMagazzino from "./DettagliOrdineMagazzino";

const CercaOrdine: React.FC = () => {
  const [idOrdine, setIdOrdine] = useState<string>();
  const [messErr, setMessErr] = useState<String>();
  const [trovato, setTrovato] = useState<boolean>(false);

  const trovaOrdine = () => {
    if (idOrdine) {
      setTrovato(true);
    } else setMessErr("Inserire id Ordine");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Cerca Ordine</IonTitle>
        </IonToolbar>
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
                  placeholder="Id Ordine"
                  value={idOrdine}
                  onIonChange={(e) => setIdOrdine(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={trovaOrdine}>
                Trova
                <IonIcon icon={cube} />
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {messErr && <IonItem color="warning">{messErr}</IonItem>}
        </IonGrid>
      </IonContent>
      {trovato && <DettagliOrdineMagazzino idOrdine={idOrdine!} />}
    </IonPage>
  );
};

export default CercaOrdine;
