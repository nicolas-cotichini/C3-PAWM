import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonButton,
  IonIcon,
  IonCol,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import CommercianteService from "../../services/CommercianteService";
import { Merce } from "../../type/Object.type";

export const CreazioneMerce: React.FC = () => {
  const [nomeMerce, setNomeMerce] = useState<string>();
  const [messErrore, setMessErrore] = useState<String>();

  const StringIsNumber = (value: string) => isNaN(Number(value)) === true;

  const register = () => {
    if (nomeMerce) {
      const merce: Merce = {
        nome: nomeMerce,
      };
      CommercianteService.creaMerce(merce);
    } else {
      setMessErrore("Inserire un nome Merce");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Crea Merce</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nome Merce</IonLabel>
          <IonInput
            type="text"
            value={nomeMerce}
            onIonChange={(e) => setNomeMerce(e.detail.value!)}
          ></IonInput>
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
