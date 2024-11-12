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
      this.questions = data;
      this.displayedQuestions = this.questions.slice(0, 5);  // Limita a 5 domande
    });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.displayedQuestions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.onSubmit();  // Quando arriviamo alla fine, invia il questionario
    }
  }

  onSubmit(): void {
    this.reportGenerated = true;
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
