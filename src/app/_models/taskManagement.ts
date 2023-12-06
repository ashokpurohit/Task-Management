export class TaskManagement {
    id: number | null;
    subject: string | null;
    description: string | null;
    status: number;
    priority: number;
    startDate: Date;
    endDate: Date;
    constructor(id?: number, subject?: string, description?: string, status?: number, priority?: number, startDate?: Date, endDate?: Date, position?: number) {
        this.id = id ? id : 0;
        this.subject = subject ? subject : ''
        this.description = description ? description : '';
        this.status = status ? status : 1;
        this.priority = priority ? priority : 1;
        this.startDate = startDate ? startDate : new Date();
        this.endDate = endDate ? endDate : new Date();
    }
}