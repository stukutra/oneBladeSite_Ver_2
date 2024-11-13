import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  @Input() role: string = '';
  @Output() closeModal = new EventEmitter<void>(); // Evento per chiudere la modale
  questions: Question[] = [];
  displayedQuestions: Question[] = [];
  userAnswers: number[] = [];
  reportGenerated: boolean = false;
  reportContent: string = '';
  currentQuestionIndex: number = 0;
  currentLanguage: string = '';

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    // Ottieni la lingua attualmente in uso o imposta 'it' come predefinito se è undefined
    this.currentLanguage = this.translate.currentLang || 'it';

    // Ascolta eventuali cambi di lingua
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });

    // Carica il questionario nella lingua selezionata o in italiano per default
    this.http.get<Question[]>(`/assets/questions/${this.currentLanguage}/${this.role}.json`).subscribe(data => {
      this.questions = this.shuffle(data); // Mescola le domande
      this.displayedQuestions = this.questions.slice(0, 5); // Mostra solo 5 domande
      this.updateProgress();
    });
  }

  shuffle(array: Question[]): Question[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.displayedQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.updateProgress();
    } else {
      this.onSubmit();
    }
  }

  updateProgress(): void {
    const completedSteps = this.currentQuestionIndex;
    document.documentElement.style.setProperty('--completed-steps', completedSteps.toString());
  }

  isCompleted(index: number): boolean {
    return index < this.currentQuestionIndex || (index === this.currentQuestionIndex && this.reportGenerated);
  }

  onSubmit(): void {
    this.reportGenerated = true;
    this.updateProgress();
    this.generateReport();
  }

  generateReport(): void {
    const reportLines = this.displayedQuestions.map((question, i) => {
      const correct = this.userAnswers[i] === question.correctAnswer;
      return `Domanda: ${question.question}\nRisposta: ${question.options[this.userAnswers[i]]}\nEsito: ${correct ? 'Corretta' : 'Errata'}\n${correct ? 'Motivazione: ' + question.explanation : ''}\n`;
    });
    this.reportContent = reportLines.join('\n\n');
    localStorage.setItem('questionnaireReport', this.reportContent);
  }

  closeAfterMessage(): void {
    this.closeModal.emit(); // Chiudi la modale subito dopo il messaggio di ringraziamento
  }
}