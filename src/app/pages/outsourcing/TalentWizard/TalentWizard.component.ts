import { Category, Talent } from '../../../models/talent.model';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Step } from './step.enum'; // Import the Step enum
import { TalentService } from '../../../service/talent.service';

@Component({
    selector: 'app-talent-wizard',
    templateUrl: './TalentWizard.component.html',
    styleUrls: ['./TalentWizard.component.scss']
})
export class TalentWizardComponent implements OnInit {
    categories: Category[] = [];
    selectedCategory: Category | null = null;
    selectedTalent: Talent | null = null;
    step: Step = Step.Step1; // Use the enum for the step
    Step = Step; // Make the enum available in the template

    frameworkLinks: { [key: string]: string } = {
        'React Native': 'https://reactnative.dev/',
        'Ionic v4/React.js': 'https://ionicframework.com/',
        'Strapi Headless CMS': 'https://strapi.io/',
        'Angular Material': 'https://material.angular.io/',
        'NgRx': 'https://ngrx.io/',
        'Bootstrap': 'https://getbootstrap.com/',
        'Alamofire': 'https://github.com/Alamofire/Alamofire',
        'RxSwift': 'https://github.com/ReactiveX/RxSwift',
        'Realm': 'https://realm.io/',
        'Dagger': 'https://dagger.dev/',
        'RxJava': 'https://github.com/ReactiveX/RxJava',
        'Retrofit': 'https://square.github.io/retrofit/',
        'React Navigation': 'https://reactnavigation.org/',
        'Redux': 'https://redux.js.org/',
        'Axios': 'https://axios-http.com/',
        'Terraform': 'https://www.terraform.io/',
        'Ansible': 'https://www.ansible.com/',
        'Docker': 'https://www.docker.com/',
        'Hadoop': 'https://hadoop.apache.org/',
        'Spark': 'https://spark.apache.org/',
        'Kafka': 'https://kafka.apache.org/',
        'Informatica': 'https://www.informatica.com/',
        'Talend': 'https://www.talend.com/',
        'TensorFlow': 'https://www.tensorflow.org/',
        'Keras': 'https://keras.io/',
        'Scikit-Learn': 'https://scikit-learn.org/',
        'Tableau': 'https://www.tableau.com/',
        'Power BI': 'https://powerbi.microsoft.com/',
        'Selenium': 'https://www.selenium.dev/',
        'JUnit': 'https://junit.org/junit5/',
        'TestNG': 'https://testng.org/',
        'Sketch': 'https://www.sketch.com/',
        'Figma': 'https://www.figma.com/',
        'Adobe XD': 'https://www.adobe.com/products/xd.html',
        'Express.js': 'https://expressjs.com/',
        'NestJS': 'https://nestjs.com/',
        'Socket.io': 'https://socket.io/',
        'ASP.NET Core': 'https://docs.microsoft.com/en-us/aspnet/core/',
        'Blazor': 'https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor',
        'SignalR': 'https://dotnet.microsoft.com/apps/aspnet/signalr',
        'Spring Boot': 'https://spring.io/projects/spring-boot',
        'Spring Cloud': 'https://spring.io/projects/spring-cloud',
        'Apache Kafka': 'https://kafka.apache.org/',
        'Django': 'https://www.djangoproject.com/',
        'Flask': 'https://flask.palletsprojects.com/',
        'FastAPI': 'https://fastapi.tiangolo.com/',
        // Add more frameworks and their corresponding links here
    };

    constructor(private talentService: TalentService, private http: HttpClient) { }

    ngOnInit() {
        this.talentService.getTalents().subscribe(data => {
            this.categories = data.categories.map(category => ({
                ...category,
                talents: category.talents.map(talent => ({
                    ...talent,
                    expanded: false,
                    expandedSkills: false,
                    expandedFrameworks: false,
                    expandedTools: false,
                    expandedLanguages: false,
                    selectedRateIndex: 1
                }))
            }));
        });
    }

    selectCategory(category: Category) {
        this.selectedCategory = category;
        this.step = Step.Step2; // Use the enum for the step
    }

    selectTalent(talent: Talent) {
        this.selectedTalent = talent;
        this.step = Step.Step3; // Use the enum for the step
    }

    changeRate(talent: Talent, rate: string) {
        talent.selectedRate = rate;
    }

    updateRate(talent: Talent) {
        switch (talent.selectedRateIndex) {
            case 1:
                talent.selectedRate = '1_month';
                break;
            case 2:
                talent.selectedRate = '3_months';
                break;
            case 3:
                talent.selectedRate = '6_months';
                break;
        }
    }

    handleEmailSent(success: boolean) {
        if (success) {
            this.step = Step.Step4; // Use the enum for the step
        }
    }

    goToStep(step: Step) {
        if (step === Step.Step1 || (step === Step.Step2 && this.selectedCategory) || (step === Step.Step3 && this.selectedTalent)) {
            this.step = step;
        }
    }

    getLanguages(languages: { [language: string]: string } | undefined): string[] {
        return languages ? Object.keys(languages) : [];
    }

    getLanguagesString(languages: { [language: string]: string } | undefined): string {
        return languages ? Object.keys(languages).map(lang => `${lang}: ${languages[lang]}`).join(', ') : '';
    }

    getFrameworkLink(framework: string): string {
        return this.frameworkLinks[framework] || '#';
    }
}