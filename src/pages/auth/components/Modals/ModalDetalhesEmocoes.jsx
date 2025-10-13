import InputMask from "react-input-mask";
import { useState } from "react";
import InputDef from "../InputDef";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GetMessage } from "@/lib/GetMessage";
import { CardBody, Typography } from "@material-tailwind/react";
import GetEmocao from "@/lib/GetEmocao";
import GetQualidade from "@/lib/GetQualidade";
import GetDataMask from "@/lib/GetData";
import GetHoraMask from "@/lib/GetHoraMask";
import GetIntensidade from "@/lib/GetIntensidade";

export default function ModalDetalhesEmocoes({ open, setOpen, detalhes }) {

    return (
        <div>
            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center p-4 justify-center bg-black/50">
                    <div className="w-full rounded-2xl bg-white p-8 shadow-lg">
                        <h1 className="text-lg font-semibold text-gray-800">
                            Cadastrar paciente
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 mb-2">Preencha todos os campos para cadastrar o paciente</p>
                        <CardBody className="px-4 pt-2 pb-2">
                            <table className="bg-white">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-50 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Emoção
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Qualidade
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                O que aconteceu?
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                O que ele fez?
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Data
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Hora
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Intensidade
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalhes.length > 0 ? (
                                        detalhes.map((detalhe) => (
                                            <tr className="border-b border-blue-gray-50 hover:cursor-pointer hover:bg-gray-200">
                                                <td className="py-3 px-5">
                                                    <div className="flex items-center">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {GetEmocao(detalhe.idEmocao)}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <div className="flex items-center">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {GetQualidade(detalhe.qualidade)}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <div className="flex items-center">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {detalhe.descricao}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {detalhe.atividade}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <div className="flex items-center">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {GetDataMask(detalhe.data)}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <div className="flex items-center gap-4">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {GetHoraMask(detalhe.hora)}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5">
                                                    <div className="flex items-center gap-4">
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {GetIntensidade(detalhe.idIntensidade)}
                                                        </Typography>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center py-3 text-gray-500">
                                                Nenhum detalhe encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </CardBody>


                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button

                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
