import { Auditory } from "./AuditoryModel";

export interface Movement extends Auditory{
    key: number;
    description: string;
    amount: number;
    typeKey: number;
    categoryKey: number;
    month: number;
    year: number;
    dueKey: number; // revisar   
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
}