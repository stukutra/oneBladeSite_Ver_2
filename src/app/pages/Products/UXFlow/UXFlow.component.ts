import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-UXFlow',
  templateUrl: './UXFlow.component.html',
  styleUrls: ['./UXFlow.component.scss']
})
export class UXFlowComponent implements OnInit {
  modalTitle: string = '';
  modalContent: string = '';

  phases = [
    {
      title: 'Analisi dei bisogni degli utenti',
      content: `<p><strong>Questa fase</strong> consiste nell’identificare e comprendere le <em>esigenze</em>, i <em>desideri</em> e le <em>problematiche</em> degli utenti finali.</p>
              <p>Si utilizzano metodi quali <strong>interviste</strong>, <strong>sondaggi</strong> e <strong>osservazioni</strong> per raccogliere dati qualitativi e quantitativi.</p>
              <p>L’obiettivo è ottenere una visione chiara di cosa gli utenti si aspettano e necessitano dal prodotto o servizio.</p>`
    },
    {
      title: 'Mappatura dei percorsi (User Journey Mapping)',
      content: `<p>La <strong>mappatura dei percorsi utente</strong>, o <em>User Journey Mapping</em>, è una tecnica che consente di rappresentare visivamente 
              l’esperienza dell’utente attraverso le varie fasi di interazione con un prodotto o servizio.</p>
              <p>Questa mappa aiuta a identificare i <strong>punti di contatto</strong>, le <em>emozioni</em>, le <em>motivazioni</em> e le <em>possibili frustrazioni</em> che l’utente può incontrare, 
              permettendo di ottimizzare l’esperienza complessiva.</p>`
    },
    {
      title: 'Definizione delle Personas',
      content: `<p>Le <strong>personas</strong> sono rappresentazioni fittizie di utenti ideali, create sulla base dei dati raccolti durante l’analisi.</p>
              <p>Ogni persona include dettagli come <em>età</em>, <em>professione</em>, <em>obiettivi</em>, <em>comportamenti</em> e <em>sfide</em>.</p>
              <p>Questi profili aiutano il team di progettazione a mantenere un <strong>focus costante</strong> sugli utenti reali durante lo sviluppo del prodotto, 
              assicurando che le soluzioni siano allineate alle loro esigenze.</p>`
    },
    {
      title: 'Accessibilità & Inclusività',
      content: `<p><strong>Verifichiamo</strong> che il prodotto digitale sia <em>accessibile</em> a tutte le persone, comprese quelle con disabilità, applicando i principali standard internazionali di accessibilità (<strong>WCAG</strong> – Web Content Accessibility Guidelines).</p>
              <p>Analizziamo il <strong>design</strong>, i <strong>flussi</strong> e i <strong>contenuti</strong> per individuare criticità che possano ostacolare l’accesso o l’usabilità e forniamo <em>suggerimenti pratici</em> per rendere l’esperienza più inclusiva e fruibile da chiunque.</p>
              <p>Questo intervento migliora non solo l’<strong>accessibilità</strong>, ma anche l’<em>immagine aziendale</em>, ampliando il pubblico potenziale.</p>`
    },
    {
      title: 'Workshop Collaborativo Online',
      content: `<p>Organizziamo una <strong>sessione interattiva</strong> di circa 2 ore in cui il nostro team lavora a stretto contatto con il cliente per progettare, validare o migliorare percorsi <em>UX/UI</em>.</p>
              <p>Durante il workshop utilizziamo tecniche collaborative (come <strong>brainstorming strutturati</strong>, <strong>mappe di priorità</strong>, <strong>sketching rapido</strong>) per raccogliere <em>feedback in tempo reale</em> e prendere decisioni condivise, ottimizzando tempi e risultati.</p>
              <p>È il modo ideale per <strong>accelerare la progettazione</strong> e ottenere un prodotto più aderente agli obiettivi e ai bisogni reali degli utenti.</p>`
    },
    {
      title: 'Report Completo + Prototipo Interattivo',
      content: `<p>Al termine del processo, consegniamo un <strong>report dettagliato</strong> che documenta tutte le <em>analisi svolte</em>, le <strong>soluzioni UX/UI proposte</strong> e le <em>raccomandazioni strategiche</em>.</p>
              <p>Insieme al report forniamo un <strong>prototipo interattivo navigabile</strong>, realizzato con strumenti professionali (ad esempio <em>Figma</em> o <em>Adobe XD</em>), che consente di simulare l’esperienza d’uso finale senza necessità di sviluppo.</p>
              <p>Questo materiale può essere utilizzato direttamente dal team di sviluppo per realizzare il prodotto in modo <strong>rapido</strong> e <strong>fedele</strong>, riducendo errori e tempi di rilavorazione.</p>`
    }
  ];

  constructor() { }

  ngOnInit() { }

  openModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
  }
}
