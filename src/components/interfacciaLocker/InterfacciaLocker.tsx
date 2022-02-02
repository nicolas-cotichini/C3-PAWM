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
} from "@ionic/react";
import { useState } from "react";
import InterfacciaLockerService from "../../services/InterfacciaLockerService";

export const InterfacciaLocker: React.FC = () => {
  const [password, setPassword] = useState<string>();
  const [mess, setMess] = useState<String>();
  const [messErr, setMessErr] = useState<String>();

  const apriCella = async () => {
    if (password) {
      setMessErr("");
      setMess(await InterfacciaLockerService.apriCella(password));
    } else {
      setMess("");
      setMessErr("Inserire password valida");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonTitle>Benvenuto</IonTitle>
            </IonCol>
          </IonRow>
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
                  placeholder="Password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {mess && <IonItem color="success">{mess}</IonItem>}
          {messErr && <IonItem color="warning">{mess}</IonItem>}
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={apriCella}>Cerca</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
