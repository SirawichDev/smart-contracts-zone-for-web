import {Providers} from "web3-core";

const contract = require("@truffle/contract");
export const loadContract = async (name: string, provider: Providers) => {
    const res = await fetch(`/contracts/${name}.json`)
    // console.log('---get all smart contract data---', await res.json())
    const Artifact = await res.json()
    const _temp = contract(Artifact)
    _temp.setProvider(provider)
    let deployedContract = null
    try {
        deployedContract = await _temp.deployed()
    } catch {
        console.error("You are connected to the wrong network")
    }

    return deployedContract
}
