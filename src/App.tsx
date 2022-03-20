import { Route } from "react-router-dom";
import {
  IonApp,
  IonCol,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import ListaOrdini from "./components/cliente/ListaOrdini";
import { home, logIn, person, man } from "ionicons/icons";
import ProfiloDettagli from "./components/ProfiloDettagli";
import LoginPage from "./components/Login";
import ListaAcquisti from "./components/cliente/ListaAquisti";
import ListaLuoghiConsegna from "./components/cliente/ListaLuoghiConsegna";
import ListaAcquistiCommerciante from "./components/commerciante/ListaAcquistiCommerciante";
import { CercaMerce } from "./components/cliente/CercaMerce";
import { CreazioneMerce } from "./components/commerciante/CreazioneMerce";
import { CreazioneAcquisto } from "./components/commerciante/CreazioneAcquisto";
import { RegistraCliente } from "./components/RegistrazioneCliente";
import ListaMerciNegozio from "./components/commerciante/ListaMerciNegozio";
import ListaConsegne from "./components/corriere/ListaConsegne";
import DettagliOrdine from "./components/DettagliOrdine";
import ListaRitiri from "./components/corriere/ListaRitiri";
import ListaMagazzini from "./components/corriere/ListaMagazzini";
import CercaOrdine from "./components/magazziniere/CercaOrdine";
import { RegistrazionePersonale } from "./components/amministratore/RegistrazionePersonale";
import { RegistrazioneLuogo } from "./components/amministratore/RegistrazioneLuogo";
import { EliminazioneLuogo } from "./components/amministratore/EliminazioneLuogo";
import { EliminazionePersonale } from "./components/amministratore/EliminazionePersonale";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  let logged = false;
  if (window.sessionStorage.getItem("user")) logged = true;

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonTitle>C3</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/registrazione" component={RegistraCliente} />
            <Route
              exact
              path="/registrazione-personale"
              component={RegistrazionePersonale}
            />
            <Route
              exact
              path="/eliminazione-personale"
              component={EliminazionePersonale}
            />
            <Route
              exact
              path="/registrazione-luogo"
              component={RegistrazioneLuogo}
            />
            <Route
              exact
              path="/eliminazione-luogo"
              component={EliminazioneLuogo}
            />
            <Route exact path="/crea-acquisto" component={CreazioneAcquisto} />
            <Route exact path="/crea-merce" component={CreazioneMerce} />
            <Route exact path="/cerca-merce" component={CercaMerce} />
            <Route exact path="/cerca-ordine" component={CercaOrdine} />
            <Route exact path="/profilo">
              <ProfiloDettagli />
            </Route>
            <Route exact path="/lista-acquisti">
              <ListaAcquisti />
            </Route>
            <Route exact path="/lista-ritiri">
              <ListaRitiri />
            </Route>
            <Route exact path="/lista-acquisti-commerciante">
              <ListaAcquistiCommerciante />
            </Route>
            <Route exact path="/lista-ordini">
              <ListaOrdini />
            </Route>
            <Route exact path="/lista-consegne">
              <ListaConsegne />
            </Route>
            <Route exact path="/dettagli-ordine">
              <DettagliOrdine />
            </Route>
            <Route exact path="/seleziona-luogo-consegna">
              <ListaLuoghiConsegna />
            </Route>
            <Route exact path="/lista-magazzini">
              <ListaMagazzini />
            </Route>
            <Route exact path="/lista-merci-negozio">
              <ListaMerciNegozio />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            {!logged && (
              <IonTabButton tab="login" href="/login">
                <IonIcon icon={logIn} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
            )}
            {!logged && (
              <IonTabButton tab="register" href="/registrazione">
                <IonIcon icon={man} />
                <IonLabel>Registrati</IonLabel>
              </IonTabButton>
            )}
            {logged && (
              <IonTabButton tab="profile" href="/profilo">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            )}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
