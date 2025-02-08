export class Endpoints {
    readonly alerts: string;
    readonly aviation: string;
    readonly glossary: string;

    constructor(){
        this.alerts = '/alerts';
        this.aviation = '/aviation';
        this.glossary = '/glossary';
    }

}