import { Dispatch, SetStateAction, useEffect, useState } from "react"

type props = {
    uf: string
    cidade: string
    setCidade: Dispatch<SetStateAction<string>>
}

export default function ({ uf, setCidade, cidade }: props) {
    const [cidades, setCidades] = useState([])
    const [loading, setLoading] = useState(true)

    async function buscarCidades() {
        setLoading(true)
        if (!uf) return
        const requestCidades = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        const cidades = await requestCidades.json()
        setLoading(false)
        setCidades(cidades)
    }

    useEffect(() => {
        buscarCidades()
    }, [uf])

    return <>
        {loading
            ? "loading cidades"
            : <select value={cidade} onChange={(ev) => setCidade(ev.currentTarget.value)}>{cidades.map(({ nome }, idx) => <option key={idx}>{nome}</option>)}</select>
        }
    </>
}