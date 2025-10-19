import GetEmocao from "@/lib/GetEmocao";
import EmocaoTag from "./EmocaoTag";

export default function EmocaoSection({ detalhe }) {
    return (
        <section className="section-emotion-list-item">
            <main className="main-emotion">
                <section className="flex items-center justify-between">
                    <h1 className="text-[20px] mb-3">{GetEmocao(detalhe.idEmocao)}</h1>
                    <EmocaoTag intensidade={detalhe.idIntensidade} />
                </section>
                <h3 className="text-lg">Acontecimento</h3>
                <p className="mb-3">{detalhe.descricao.trim()}</p>
                <h3 className="text-lg">Atividade</h3>
                <p className="mb-3">{detalhe.atividade.trim()}</p>
            </main>
        </section>
    )
}