export default function InputDef({type, placeholder, idName, onChange}){
    return (
        <input 
                type={type} 
                name={idName}
                id={idName}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                    focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                    transition-all duration-200 ease-in-out
                    dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
                placeholder={placeholder}
                onChange={onChange}
            />
    )
}