import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { logIn } from "ionicons/icons";
import { useState } from "react";
import AmministratoreService from "../../services/AmministratoreService";
import { Personale } from "../../type/Object.type";

type Props = {
  id: number;
};

export const RegistraInterfacciaLocker: React.FC<Props> = (props) => {
  const [email, setEmail] = useState<string>();
  const [emailErr, setEmailErr] = useState<String>();
  const [password, setPassword] = useState<string>();
  const [passErr, setPassErr] = useState<String>();
  const [confermaPass, setConfPass] = useState<string>();
  const [messErrore, setMessErrore] = useState<String>();

  const register = () => {
    if (validateEmail()) {
      if (validatePassword()) {
        setMessErrore("");
        const interfaccia: Personale = {
          nome: "Interfaccia",
          cognome: "Locker",
          email: email!,
          password: password!,
          idLocker: props.id,
        };
        console.log(interfaccia.idLocker);
        AmministratoreService.registraInterfaccia(interfaccia);
      }
    } else setMessErrore("Riempi tutti i campi!");
  };

  const validateEmail = () => {
    if (email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailTest = re.test(String(email).toLowerCase());
      if (emailTest !== true) {
        setEmailErr("Inserire una email valida");
        return false;
      } else {
        setEmailErr("");
        return true;
      }
    } else return false;
  };

  const validatePassword = () => {
    if (password) {
      if (password === confermaPass) {
        if (password.length > 12 || password.length < 8)
          setPassErr("La Password deve essere compresa tra 8 e 12 caratteri");
        else {
          setPassErr("");
          return true;
        }
      } else {
        setPassErr("Le Password non coincidono!");
        return false;
      }
    }
    return false;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol />
            <IonTitle color="primary">Registra Interfaccia Locker</IonTitle>
            <IonCol />
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
                Registra
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
