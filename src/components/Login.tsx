import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { key, logIn, mail } from "ionicons/icons";
import React, { useState } from "react";
import AuthService from "../auth/AuthService";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [messErr, setMessErr] = useState<String>();

  const login = () => {
    if (email && password) AuthService.login(email, password);
    else setMessErr("Inserire Email e Password");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCol></IonCol>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonIcon icon={mail} />
                <IonInput
                  type="email"
                  placeholder="  Email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonIcon icon={key} />
                <IonInput
                  type="password"
                  placeholder="  Password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={login}>
                Login
                <IonIcon icon={logIn} />
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {messErr && <IonItem color="warning">{messErr}</IonItem>}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
