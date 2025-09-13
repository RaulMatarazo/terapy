import Swal from "sweetalert2";

export function GetMessage(icon, text){
    return Swal.fire({text: text, icon: icon, position: 'top', iconColor: '#1f57cf'})
}