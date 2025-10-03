export default function GetLastMonth() {
    const hoje = new Date();
    // cria uma cópia da data atual
    const data = new Date(hoje);

    // define para o mês anterior
    data.setMonth(data.getMonth() - 1);

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // +1 pq começa em 0
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}
