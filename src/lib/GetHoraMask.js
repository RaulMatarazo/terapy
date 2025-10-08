import { BookTemplateIcon } from "lucide-react";

export default function GetHoraMask(value){
    const tempo = value;
    const hora = tempo.substring(0, 2);
    const minuto = tempo.substring(3, 5);
    return `${hora}h${minuto}min`;
}