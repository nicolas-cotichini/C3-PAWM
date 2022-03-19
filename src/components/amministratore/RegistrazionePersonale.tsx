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
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { logIn } from "ionicons/icons";
import { useState } from "react";
import AmministratoreService from "../../services/AmministratoreService";
import Validatore from "../../services/ValidatoreSignIn";
import { Personale, PersonaleTipo } from "../../type/Object.type";

export const RegistrazionePersonale: React.FC = () => {
  const [nome, setNome] = useState<string>();
  const [cognome, setCognome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [emailErr, setEmailErr] = useState<String>();
  const [password, setPassword] = useState<string>();
  const [passErr, setPassErr] = useState<String>();
  const [confermaPass, setConfPass] = useState<string>();
  const [tipo, setTipo] = useState<PersonaleTipo>();
  const [iva, setIva] = useState<string>();
  const [messErrore, setMessErrore] = useState<String>();

  const StringIsNumber = (value: string) => isNaN(Number(value)) === true;

  const register = () => {
    if (password && email && nome && cognome) {
      setMessErrore("");
      if (validateEmail()) {
        if (validatePassword()) {
          if (tipo) {
            const personale: Personale = {
              nome: nome,
              cognome: cognome,
              email: email!,
              password: password!,
              ruolo: tipo!,
              iva: iva,
            };
            if (
              personale.ruolo?.toString() !== "COMMERCIANTE" ||
              iva !== undefined
            )
              AmministratoreService.registraPersonale(personale);
            else setMessErrore("Riempi tutti i campi!");
          } else setMessErrore("Seleziona una Ruolo per il personale");
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
          <IonTitle color="primary">Registra Personale</IonTitle>
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
          {tipo?.toString() === "COMMERCIANTE" && (
            <IonRow>
              <IonCol></IonCol>
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    type="text"
                    placeholder="Partita Iva"
                    value={iva}
                    onIonChange={(e) => setIva(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          )}
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
