export default function GetColorIntensidade(intensidade){
    console.log(intensidade);
    if (intensidade == '1') {
        return '#0073ffff'
    } else if (intensidade == '2') {
        return '#0051ffff'
    } else if (intensidade == '3') {
       return '#0051ffff' 
    } else if (intensidade == '4') {
        return '#22ff00ff'
    } else if (intensidade == '5') {
       return '#ff5100ff' 
    } else if (intensidade == '6') {
       return '#ff1900ff'  
    } else if (intensidade == '7') {
        return '#ff1900c5' 
    }
}