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
  IonSelect,
  IonList,
  IonSelectOption,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { logIn } from "ionicons/icons";
import { useState } from "react";
import AmministratoreService from "../../services/AmministratoreService";
import { Luogo, LuogoTipo } from "../../type/Object.type";

export const RegistrazioneLuogo: React.FC = () => {
  const [nome, setNome] = useState<string>();
  const [indirizzo, setIndirizzo] = useState<string>();
  const [tipo, setTipo] = useState<LuogoTipo>();
  const [note, setNote] = useState<string>();
  const [orarioApertura, setOrarioApertura] = useState<string>();
  const [idCommerciante, setIdCommerciante] = useState<string>();
  const [messErrore, setMessErrore] = useState<String>();
  const StringIsNumber = (value: string) => isNaN(Number(value)) === true;

  const register = () => {
    if (nome && indirizzo) {
      if (tipo) {
        setMessErrore("");
        const luogo: Luogo = {
          nome: nome,
          indirizzo: indirizzo,
          tipo: tipo,
          orarioApertura: orarioApertura,
          idCommerciante: idCommerciante,
          id: 0,
        };
        if (luogo.tipo.toString() !== "NEGOZIO" || idCommerciante !== undefined)
          AmministratoreService.registraLuogo(luogo);
        else setMessErrore("Riempi tutti i campi!");
      } else setMessErrore("Seleziona una Tipologia");
    } else setMessErrore("Riempi tutti i campi!");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="primary">Registra Luogo</IonTitle>
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
                  placeholder="Indirizzo"
                  value={indirizzo}
                  onIonChange={(e) => setIndirizzo(e.detail.value!)}
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
                    {Object.keys(LuogoTipo)
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
          {tipo?.toString() === "MAGAZZINO" && (
            <IonRow>
              <IonCol></IonCol>
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    type="text"
                    placeholder="Orario Apertura"
                    value={orarioApertura}
                    onIonChange={(e) => setOrarioApertura(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          )}
          {tipo?.toString() === "NEGOZIO" && (
            <>
              <IonRow>
                <IonCol></IonCol>
                <IonCol size="8">
                  <IonItem>
                    <IonInput
                      type="text"
                      placeholder="Orario Apertura"
                      value={orarioApertura}
                      onIonChange={(e) => setOrarioApertura(e.detail.value!)}
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
                      placeholder="Id Commerciante"
                      value={idCommerciante}
                      onIonChange={(e) => setIdCommerciante(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </>
          )}
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  type="text"
                  placeholder="Note"
                  value={note}
                  onIonChange={(e) => setNote(e.detail.value!)}
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
