import React, {useEffect, useState} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import {provider, Providers} from "web3-core";
import "./App.css";
import {loadContract} from "./utils/loadContract";

interface Web3Props {
    provider: Providers;
    web3: provider;
}

function App() {
    const [web3Api, setWeb3Api] = useState<Web3Props | any>({
        provider: null,
        web3: null,
        contract: null
    });
    const setAccountListener = (provider: any) => {
        provider.on("accountsChanged", (x: any) => window.location.reload());
        provider.on("chainChanged", (x: any) => window.location.reload());
    };
    const [balance, setCurrentBalance] = useState()
    const [account, setAccount] = useState<Array<string>>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    useEffect(() => {
        const initialWeb3 = async () => {
            let provider: any = await detectEthereumProvider();

            // debugger
            if (provider) {
                const contract = await loadContract("SCZ", provider)
                setAccountListener(provider);
                setWeb3Api({web3: new Web3(provider), provider, contract});
            } else {
                setErrorMsg("Please install Metamask");
            }
        };
        initialWeb3();
    }, []);
    useEffect(() => {
        const loadAccBalance = async () => {
            const {contract, web3} = web3Api
            const balance = await web3.eth.getBalance(contract.address)
            setCurrentBalance(web3.utils.fromWei(balance, "ether")) // ลองอ่าน util ใน https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#towei
        }
        web3Api.web3 && loadAccBalance()
    }, [web3Api, web3Api.web3])
    useEffect(() => {
        const getAcc = async () => {
            const accounts = await (web3Api as any).web3?.eth.getAccounts();
            setAccount(accounts[0]);
        };
        web3Api.web3 && getAcc();
    }, [web3Api, web3Api.web3]);
    const MetamaskConnect = async () => {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
    };
    return (
        <div className="App">
            <div className="bubble moveup-1"/>
            <div className="bubble moveup-2"/>
            <div className="container">
                <img
                    alt="foxfox"
                    src="https://i.pinimg.com/736x/4a/8f/a6/4a8fa666db768b82c7b74bd21904bbe2.jpg"
                    height="250px"
                />
                {errorMsg && <h3 className="error">{errorMsg}</h3>}
                {account && (
                    <h3>
                        Current Account is <span className="account">{account}</span>
                    </h3>
                )}
                {balance && (<h1>Current Balance: {balance} ETH</h1>)}
                {!!account ? (
                    <p className="success">Connected</p>
                ) : (
                    <button onClick={MetamaskConnect}>Connect Metamask account</button>
                )}

                <button onClick={MetamaskConnect}>Transfer</button>
                <button onClick={MetamaskConnect}>Withdraw</button>
            </div>
        </div>
    );
}

export default App;
