# C3-PAWM

---

Il progetto si rivolge ai centri abitati medi della provincia italiana dove le attività commerciali del centro soffrono la concorrenza di grossi centri commerciali situati nelle periferie.L’idea di fondo è considerare il trasporto della merce una volta acquistata una delle scomodità principali degli acquisti in centro oltre alla più difficile collocazione dei punti vendita in relazione a specifiche categorie merceologiche.
Il progetto si pone dunque come obiettivo quello di fornire un supporto per rendere l’esperienza degli acquisti in centro più facile e interessante.

---

## Tecnologie & Sviluppo:

C3-PAWM è una Progressive Web App sviluppata principalmente per l'uso da mobile, mutuando funzionalità dei siti web ed app native sfruttando il frameword Ionic.

Lo sviluppo del sistema si basa sull'implementazione del pattern architetturare [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

Il fronten è stato realizzato con Typescript, React ed il frameword Ionic.

Il [backend e relativi microservizi](https://github.com/nicolas-cotichini/C3) sono stati realizzati in Java tramite la suite di tecnologie e framework configurate tramite SpringBoot.

Il dialogo tra frontend e backend avviene mediante chiamate Rest, la cui sicurezza è affidata all'uso di JSON Web Token.

La gestione delle password è stata affidata alla funzione di hashing BCrypt con "forza" 10.

Il [database](https://github.com/nicolas-cotichini/C3/tree/main/Database) è stato realizzato con MySQL.

---

## Funzionalità

Il sistema permette la registrazione di nuovi clienti e la gestione delle attività di vari profili:

- **Amministratore**: può gestire Personale e Luoghi già presenti o crearne di nuovi.

- **Cliente**: può controllare acquisti ed ordini effettuati, visionare dove sono stati consegnati ed eventuali password necessarie al ritiro, selezionare dove far consegnare i propri ordini e cercare quali negozi hanno la merce desiderata.

- **Commerciante**: può gestire le merci correlate al suo negozio, la registrazione di nuovi acquisti e la visione dei dati del negozio.

- **Corriere**: può visionare gli ordini e relativi acquisti da ritirare per effettuare la consegna e dati utili allo svolgimento del processo, può inoltre cambiare lo stato di operatività.

- **Magazziniere**: può controllare quali ordini sono presenti in magazzino e visionare le informazioni correlate ad esso.

Ogni utente può visionare i dati relativi al proprio profilo.

Maggiori dettagli sulle funzionalità riguardanti le varie tipologie di user sono presenti [qui](https://github.com/nicolas-cotichini/C3).

---
