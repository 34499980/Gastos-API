export interface Movement {
    idMovement: number;
    description: string;
    amount: number;
    idType: number;
    idCategory: number;
    //public int IdMes; revisar para que es
    year: number;
    due: number; // revisar
    cant: number; // revisar
    idUser: number;
    createdDate: Date;
}