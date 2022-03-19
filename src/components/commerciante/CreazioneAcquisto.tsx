import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonInput,
  IonButton,
  IonCol,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import CommercianteService from "../../services/CommercianteService";
import { Acquisto } from "../../type/Object.type";

export const CreazioneAcquisto: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string>();
  const [dimensione, setDimensione] = useState<string>();
  const [messErrore, setMessErrore] = useState<String>();

  const register = () => {
    if (idCliente) {
      if (dimensione) {
        setMessErrore("");
        const acquisto: Acquisto = {
          idCliente: idCliente,
          dimensione: dimensione,
        };
        CommercianteService.creaAcquisto(acquisto);
      } else setMessErrore("Scegliere una dimensione");
    } else {
      setMessErrore("Inserire l'id Cliente");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Crea Acquisto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Id Cliente</IonLabel>
          <IonInput
            type="text"
            value={idCliente}
            onIonChange={(e) => setIdCliente(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Dimensione</IonLabel>
          <IonSelect
            value={dimensione}
            placeholder="Seleziona"
            onIonChange={(e) => setDimensione(e.detail.value)}
          >
            <IonSelectOption value="PICCOLO">Piccolo</IonSelectOption>
            <IonSelectOption value="MEDIO">Medio</IonSelectOption>
            <IonSelectOption value="GRANDE">Grande</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonRow>
          <IonCol></IonCol>
          <IonButton onClick={register}>Crea</IonButton>
          <IonCol></IonCol>
        </IonRow>

        {messErrore && <IonItem color="warning">{messErrore}</IonItem>}
      </IonContent>
    </IonPage>
  );
};
