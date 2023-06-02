import { Auditory } from "./AuditoryModel";

export interface User extends Auditory {
    id: number;
    name: string;
    mail: string;    
    password: string;

}