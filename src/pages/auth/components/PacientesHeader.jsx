import InputDef from "./Input";

export default function PacientesHeader(){
    return (
    <header className="flex justify-between">
        <div class="mb-5">
            <InputDef type='text' placeholder='Primeiro nome' />
        </div>
        <div class="mb-5">
            
            <InputDef type='text' placeholder="Sobrenome" />
        </div>
        <div class="mb-5">
            
            <InputDef type='email' placeholder="E-mail" />
        </div>
        <div class="mb-5">
            <InputDef type='phone' placeholder='Telefone' />
        </div>
        <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apenas pacientes inativos</label>
        </div>
    </header>
    )
}