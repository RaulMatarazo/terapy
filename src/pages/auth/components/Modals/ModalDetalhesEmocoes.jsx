import { CardBody, Typography } from "@material-tailwind/react";
import GetEmocao from "@/lib/GetEmocao";
import GetQualidade from "@/lib/GetQualidade";
import GetDataMask from "@/lib/GetData";
import GetHoraMask from "@/lib/GetHoraMask";
import GetIntensidade from "@/lib/GetIntensidade";
import EmocaoSection from "../EmocaoSection";

export default function ModalDetalhesEmocoes({ open, setOpen, detalhes, emocao }) {
    const handleClose = () => setOpen(false)
    return (
        <div>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={handleClose}
                >
                    <div
                        id="section-home-data-4"
                        className="rounded-2xl bg-white p-8 shadow-lg max-h-[80vh] md:w-auto overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="flex justify-between items-center mb-4">
                            <h1 className="text-lg font-semibold text-gray-800">Emoções</h1>
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                            >
                                X
                            </button>
                        </span>

                        <p className="mt-2 text-sm text-gray-600 mb-4">
                            Visualize todas as emoções do paciente
                        </p>
                        <main className="main-grid-layout">
                            {
                                detalhes && detalhes.map((detalhe) => (
                                    <EmocaoSection detalhe={detalhe} />
                                ))
                            }
                        </main>
                    </div>
                </div>
            )}
        </div>


    )
}
