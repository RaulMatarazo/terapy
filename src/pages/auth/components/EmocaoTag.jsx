import GetColorIntensidade from "@/lib/GetColorIntensidade";
import GetIntensidade from "@/lib/GetIntensidade";

export default function EmocaoTag({ intensidade }) {
    return (
        <div className="span-circle-color mb-3" style={{backgroundColor: GetColorIntensidade(intensidade)}}></div>
    )
}