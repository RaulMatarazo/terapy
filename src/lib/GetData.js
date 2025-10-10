export default function GetDataMask(value) {
    const data = value;
    const ano = data.substring(0, 4);
    const mes = data.substring(5, 7);
    const dia = data.substring(8, 10);
    return `${dia}/${mes}/${ano}`;
}