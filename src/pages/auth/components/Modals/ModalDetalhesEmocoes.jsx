import { CardBody, Typography } from "@material-tailwind/react";
import GetEmocao from "@/lib/GetEmocao";
import GetQualidade from "@/lib/GetQualidade";
import GetDataMask from "@/lib/GetData";
import GetHoraMask from "@/lib/GetHoraMask";
import GetIntensidade from "@/lib/GetIntensidade";

export default function ModalDetalhesEmocoes({ open, setOpen, detalhes, emocao }) {

    return (
        <div>
            {open && (
                <div
                    style={{ overflowY: "auto" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                >
                    <div
                        className="rounded-2xl bg-white p-8 shadow-lg max-h-[80vh] w-[90%] md:w-auto overflow-y-auto"
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

                        {/* Tabela scrollável se for muito grande */}
                        <div className="overflow-x-auto">
                            <table className="bg-white mt-4 min-w-full">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-50 text-left p-2">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                Emoção
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left p-2">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                Qualidade
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left p-2">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                O que aconteceu?
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left p-2">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                O que ele fez?
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left p-2">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                Data
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left p-2">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                Hora
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left p-2">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                Intensidade
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalhes.length > 0 ? (
                                        detalhes.map((detalhe) => (
                                            <tr
                                                key={detalhe.id}
                                                className="border-b border-blue-gray-50 hover:cursor-pointer hover:bg-gray-200"
                                            >
                                                <td className="py-3 px-5">
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {GetEmocao(detalhe.idEmocao)}
                                                    </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {GetQualidade(detalhe.qualidade)}
                                                    </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {detalhe.descricao}
                                                    </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {detalhe.atividade}
                                                    </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {GetDataMask(detalhe.data)}
                                                    </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {GetHoraMask(detalhe.hora)}
                                                    </Typography>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {GetIntensidade(detalhe.idIntensidade)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-center py-3 text-gray-500">
                                                Nenhum detalhe encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}
