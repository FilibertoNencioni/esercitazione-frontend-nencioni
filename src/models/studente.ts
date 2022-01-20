export interface Studente{
    cod_fiscale: string,
    nome: string,
    cognome: string,
    data_nascita: Date,
    comune_nascita: string,
    num_tel: string,
    indirizzo_res:string,
    civico_res:string,
    cap_res: number,
    doi?:Date,
    dou?:Date 
}