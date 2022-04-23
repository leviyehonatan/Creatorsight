import styles from "../styles/CreatorSight.module.css";
import "bulma/css/bulma.css";
import Head from "next/head";
import Web3 from "web3";
import { useState } from "react";

const INFURA_PROJECT_ID = "55b0649bf1d64ee599e4ce3c182f0f6f";
const YOUR_CONTRACT_ABI = "";
const YOUR_CONTRACT_ADDRESS = "";
const CreatorSight = () => {
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState(null);
  const [provider, setProvider] = useState(null);

  const [address, setAddress] = useState(null);
  let web3;

  console.log({ provider, accounts });
  const connectWalletHandler = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      console.log("metamask is installed", window.ethereum);
      try {
        // Request account access
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        web3 = new Web3(window.ethereum);
        setProvider(web3);
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts[0]);
        console.log({ web3, accounts });
      } catch (error) {
        // User denied account access...
        console.error("User denied account access", error.message);
        setError(error.message);
      }
      //

      //   web3 = new Web3(App.web3Provider);
    } else {
      console.log("please install metamask");
    }
  };

  const Web3 = require("web3");

  async function run() {
    const web3 = new Web3("https://mainnet.infura.io/v3/" + INFURA_PROJECT_ID);
    const contract = new web3.eth.Contract(
      YOUR_CONTRACT_ABI,
      YOUR_CONTRACT_ADDRESS
    );
    const retVal = await contract.methods
      .somePureOrViewFunction(arg1, arg2)
      .call();
    const varVal = await contract.methods.somePublicVariable().call();
  }

  run();

  const getContractData = async () => {
    const _address = document.getElementById("address").value;
    setAddress(_address);
    return console.log("Data!", document.getElementById("address").value);
  };
  return (
    <div className={styles.main}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Blockchain vending machine app" />
      </Head>
      <nav className="navbar mt-4 mb-4">
        <div className="container">
          <div className="navbar-brand">
            <img src="pepper.webp" height={40} width={40} className="ml-10" />
            <h1>Chilli Powder</h1>
          </div>
          <div className="navbar-end">
            <button
              className="button is-primary"
              onClick={connectWalletHandler}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>
      <section>
        {/* <div className="container">
          <p>placeholder text</p>
        </div> */}
      </section>
      <section>
        <div className="container">
          <p>{accounts}</p>
        </div>
      </section>
      <section>
        <div className="container has-text-danger">
          <p>{error}</p>
        </div>
      </section>
      <div className="mt-6"></div>
      <div className="mt-6"></div>
      <div className="mt-6"></div>
      <div className="mt-6"></div>
      <section className="m-6">
        <div className="container">
          {/* <p>Smart contract address</p>
          <div className="mb-4"></div> */}
          <div className="columns container">
            <input
              type="text"
              className="input is-primary is-medium mr-2"
              placeholder="Please enter the contract address you want to analysis"
              id="address"
            />
            <br />
            <button
              type="submit"
              className="button is-primary is-medium"
              onClick={getContractData}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <p>{address}</p>
        </div>
      </section>
    </div>
  );
};

export default CreatorSight;
