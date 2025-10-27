import Cookies from "js-cookie";

export function removerCookies(){
    Object.keys(Cookies.get()).forEach(function(cookieName) {
      //  if (cookieName !== 'empresa' && cookieName !== 'servidor' && cookieName !== 'updates1.12.0' && cookieName !== 'treinamento') {
            Cookies.remove(cookieName);   
       // }
    });
}
