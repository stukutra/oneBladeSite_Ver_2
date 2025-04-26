import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productsoneBlade',
  templateUrl: './productsoneBlade.component.html',
  styleUrls: ['./productsoneBlade.component.scss']
})
export class ProductsoneBladeComponent implements OnInit {

  infyBladeSuiteContent =
    `<strong>La tua azienda</strong> merita di più della solita gestione <em>“alla vecchia maniera”</em>. ` +
    `Oggi, una <strong>PMI</strong> che vuole crescere ha bisogno di strumenti <strong>intelligenti</strong>, ` +
    `<strong>flessibili</strong> e <strong>connessi</strong>. <br> <strong>Microsoft Dynamics 365</strong> è molto ` +
    `più di un gestionale: è il <span class='highlight'>cuore digitale</span> della tua impresa.` +
    `<p><small class='smaller-text'><br><em>Siamo partner certificati Microsoft, specializzati ` +
    `nell’implementazione e personalizzazione di soluzioni ERP e CRM come Dynamics 365, per aiutare ` +
    `le aziende a crescere, automatizzare i processi e prendere decisioni strategiche basate sui dati.</em></small></p>`;

  thinkAndBuildContent =
    `<p><strong>oneBlade Think & Build</strong> è il servizio di <strong>consulenza strategica e tecnica</strong> ` +
    `che trasforma la tua <strong>idea digitale</strong> in un <strong>prodotto software completo</strong>, ` +
    `grazie a un team multidisciplinare specializzato in <strong>analisi, design, sviluppo e lancio</strong>.</p>` +
    `<p><strong>📞 Chiedi una consulenza di 1 ora</strong></p>`;

    clickAndTestContent = 
    `<p><strong>Software su misura</strong>: trasformiamo la tua <em>idea</em> in un ` +
    `<strong><u>mockup interattivo</u></strong>, per mostrarti in anteprima il tuo ` +
    `<strong><em>software completo</em></strong>, ancora prima di scrivere una sola riga di codice.</p>` +
    `<p><strong>oneBlade</strong> dà forma concreta alle intuizioni, guidandoti passo dopo passo.</p>`;

  constructor() { }

  ngOnInit() {
  }

}
