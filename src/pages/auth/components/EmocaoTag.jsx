import GetColorIntensidade from "@/lib/GetColorIntensidade";
import GetIntensidade from "@/lib/GetIntensidade";

export default function EmocaoTag({ intensidade }) {
    return (
        <div style={{color: GetColorIntensidade(intensidade)}}>{GetIntensidade(intensidade)}</div>
    )
}