import GetDataMask from "@/lib/GetData";
import GetEmocao from "@/lib/GetEmocao";
import GetHoraMask from "@/lib/GetHoraMask";
import GetIntensidade from "@/lib/GetIntensidade";
import EmocaoTag from "./EmocaoTag";

export default function EmocaoSection({ detalhe }) {
    return (
        <section className="section-emotion-list-item">
            <main className="main-emotion">
                <EmocaoTag intensidade={detalhe.idIntensidade}/>
                <h3 className="text-lg mb-3">{GetEmocao(detalhe.idEmocao)}</h3>
                <h3 className="text-lg">Acontecimento</h3>
                <p className="mb-3">{detalhe.descricao.trim()}</p>
                <h3 className="text-lg">Atividade</h3>
                <p className="mb-3">{detalhe.atividade.trim()}</p>
                <footer className="flex justify-end">
                    <p>{GetDataMask(detalhe.data)} - {GetHoraMask(detalhe.hora)}</p>
                </footer>
            </main>
        </section>
    )
}