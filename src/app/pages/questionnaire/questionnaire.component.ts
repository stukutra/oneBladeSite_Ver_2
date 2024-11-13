import { Component, Input, OnDestroy, OnInit } from '@angular/core';

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
export class QuestionnaireComponent implements OnInit, OnDestroy {
  @Input() role: string = '';
  questions: Question[] = [];
  displayedQuestions: Question[] = [];
  userAnswers: number[] = [];
  reportGenerated: boolean = false;
  reportContent: string = '';
  userEmail: string = '';
  currentQuestionIndex: number = 0;
  currentLanguage: string = '';

  // Timer variables
  startTime: number = 0;
  elapsedTime: number = 0;
  formattedTime: string = '00:00';
  timerInterval: any;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    // Imposta lingua
    this.currentLanguage = this.translate.currentLang || 'it';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });

    // Carica domande
    this.http.get<Question[]>(`/assets/questions/${this.currentLanguage}/${this.role}.json`).subscribe(data => {
      this.questions = this.shuffle(data);
      this.displayedQuestions = this.questions.slice(0, 5);
      this.updateProgress();
    });

    // Avvia timer
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  // Funzioni del timer
  startTimer(): void {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.formattedTime = this.formatTime(this.elapsedTime);
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
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
    this.stopTimer(); // Ferma il timer
  }

  generateReport(): void {
    const reportLines = this.displayedQuestions.map((question, i) => {
      const correct = this.userAnswers[i] === question.correctAnswer;
      return `Domanda: ${question.question}\nRisposta: ${question.options[this.userAnswers[i]]}\nEsito: ${correct ? 'Corretta' : 'Errata'}\n${correct ? 'Motivazione: ' + question.explanation : ''}\n`;
    });
    this.reportContent = reportLines.join('\n\n');
  }
}