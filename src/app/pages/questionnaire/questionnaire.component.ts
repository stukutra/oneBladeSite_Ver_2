import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  questions: Question[] = [];
  displayedQuestions: Question[] = [];
  userAnswers: number[] = [];
  reportGenerated: boolean = false;
  reportContent: string = '';
  userEmail: string = '';
  currentQuestionIndex: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Question[]>('/assets/questions.json').subscribe(data => {
      this.questions = this.shuffle(data);
      this.displayedQuestions = this.questions.slice(0, 5);
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
  }

  sendReport(): void {
    alert(`Report inviato a ${this.userEmail}`);
  }
}



