import React, { useState } from "react";
import InputCidades from "../components/InputCidades";
import InputEstados from "../components/InputEstados";

export default function() {
    const [uf, setUf] = useState("")
    const [bairro, setBairro] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [cidade, setCidade] = useState("")

    async function getCep (ev: React.KeyboardEvent<HTMLInputElement>) {
        setCep(ev.currentTarget.value)
        if (cep.length != 8) {
            
            return
        }
        ev.preventDefault()
            ev.stopPropagation()
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const json = await response.json()
        setUf(json["uf"])
        setCidade(json["localidade"])
        setBairro(json["bairro"])
        setRua(json["logradouro"])
    }

    return <>
        <h1>Cadastro: Dados de Endereço</h1>
        <input placeholder="Cep" type="text" onKeyUp={getCep}/>
        <InputEstados uf={uf} setUf={setUf} />
        <InputCidades uf={uf} setCidade={setCidade} cidade={cidade}/>
        <input placeholder="Bairro" type="text" value={bairro} onChange={(ev) => setBairro(ev.currentTarget.value)} />
        <input placeholder="Rua" type="text" value={rua} onChange={(ev) => setRua(ev.currentTarget.value)}/>
    </>
}