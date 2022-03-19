import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  IonCol,
  IonGrid,
  IonRow,
  IonPage,
} from "@ionic/react";
import { logIn } from "ionicons/icons";
import React, { useState } from "react";
import ClienteService from "../services/ClienteService";
import Validatore from "../services/ValidatoreSignIn";
import { Cliente } from "../type/Object.type";

export const RegistraCliente: React.FC = () => {
  const [nome, setNome] = useState<string>();
  const [cognome, setCognome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [emailErr, setEmailErr] = useState<String>();
  const [password, setPassword] = useState<string>();
  const [passErr, setPassErr] = useState<String>();
  const [confermaPass, setConfPass] = useState<string>();
  const [messErrore, setMessErrore] = useState<String>();

  const register = () => {
    if (password && email && nome && cognome) {
      setMessErrore("");
      if (validateEmail()) {
        if (validatePassword()) {
          const cliente: Cliente = {
            nome: nome,
            cognome: cognome,
            email: email!,
            password: password!,
          };
          ClienteService.registraCliente(cliente);
        }
      }
    } else {
      setMessErrore("Riempi tutti i campi!");
    }
  };

  const validateEmail = () => {
    if (Validatore.validateEmail(email!)) {
      setEmailErr("");
      return true;
    } else {
      setEmailErr("Inserire una email valida");
      return false;
    }
  };

  const validatePassword = () => {
    let forzaPassword = Validatore.validatePassword(password!, confermaPass!);
    if (forzaPassword === 0) {
      setPassErr("La Password deve essere compresa tra 8 e 12 caratteri!");
    } else if (forzaPassword === 1) {
      setPassErr("Le Password non coincidono!");
    } else if (forzaPassword < 5) {
      setPassErr(
        "La password deve contenere almeno una lettera minuscola, una maiuscola, un numero ed un carattere speciale!"
      );
    } else {
      setPassErr("");
      return true;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Registrati</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onIonChange={(e) => setNome(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  type="text"
                  placeholder="Cognome"
                  value={cognome}
                  onIonChange={(e) => setCognome(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {emailErr && <IonItem color="warning">{emailErr}</IonItem>}
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {passErr && <IonItem color="warning">{passErr}</IonItem>}
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  type="password"
                  placeholder="Conferma Password"
                  value={confermaPass}
                  onIonChange={(e) => setConfPass(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <IonButton onClick={register}>
                Registrati
                <IonIcon icon={logIn} />
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          {messErrore && <IonItem color="warning">{messErrore}</IonItem>}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
