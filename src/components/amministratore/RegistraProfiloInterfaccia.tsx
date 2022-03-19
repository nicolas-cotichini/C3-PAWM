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
import Validatore from "../../services/ValidatoreSignIn";
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
    if (password && email) {
      setMessErrore("");
      if (validateEmail()) {
        if (validatePassword()) {
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
      }
    } else setMessErrore("Riempi tutti i campi!");
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
