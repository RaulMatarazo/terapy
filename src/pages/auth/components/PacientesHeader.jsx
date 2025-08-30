import { Button } from "@material-tailwind/react";
import InputDef from "./InputDef";
import { useState } from "react";
import ModalCadastrarPaciente from "./Modals/ModalCadastrarPaciente";

export default function PacientesHeader({ filters, setFilters }){
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleChange(e){
        const {name, value} = e.target;
        setFilters({...filters, [name]: value});
    }

    function handleClick(){
        setIsModalOpen(true);
    }

    return (
    <header className="flex justify-between items-center">
        <section>
            <Button onClick={handleClick} variant="text" color="white" className="hover:bg-gray-900 active:bg-gray-900  items-center gap-1 px-4 xl:flex bg-gray-900">
              Novo Paciente
            </Button>
        </section>
        <section className="flex justify-between items-center">
            <div className="mb-5 mr-3">
                <InputDef type='text' placeholder='Primeiro nome' idName={'primeiroNome'} onChange={handleChange} />
            </div>
            <div className="mb-5">
                <InputDef type='text' placeholder="Sobrenome" idName={'sobrenome'} onChange={handleChange} />
            </div>
        </section>
        {/* modais */}
        <ModalCadastrarPaciente open={isModalOpen} setOpen={setIsModalOpen} />
    </header>
    )
}