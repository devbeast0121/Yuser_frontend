import React, { useState } from "react";
import {
  WalletContainer,
  TopPart,
  BottomPart,
  Inner,
  Text,
  TxtBalance,
  TxtContainer,
  TxtBottom,
  AddressContainer,
  Title,
  Address,
  Select,
  Option,
  DropDawnAmount,
  TxtSmall
} from "./Wallet.elements";
import Diamond from "../../public/icons/diamond.svg";
import Gem from "../../public/icons/gem-pink.svg";
import Icon from ".././Icon/Icon";
import { useRouter } from "next/router";
import Movr from "../../public/icons/moonriver_logo3.svg";
import OnboardingButton from ".././MetamaskOnboarding/MetamaskOnboarding";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useStore } from "../../stores/RootStore";
import { inject, observer } from "mobx-react";
import Numeral from "react-numeral";
import { useSession } from "next-auth/client";
import { ethers } from "ethers";

export default inject("store")(
  observer(function Wallet(props) {
    const [buttonVisible, setButtonVisible] = useState(false);
    const [currency, setCurrency] = useState("MOVR");
    const currencyOptions = ["MOVR", "WMOVR"];
    const router = useRouter();
    const wallet = props.walletType;
    const [movrBalance, setMovrBalance] = useState(0)
    const [wmovrBalance, setWMovrBalance] = useState(0)
    const [stoneBalance, setStoneBalance] = useState(0)
    const rootstore = useStore();
    const [session, loading] = useSession();
    const walletIcon =
      props.walletType === "rocks"
        ? Gem
        : props.walletType === "stones"
          ? Diamond
          : props.walletType === "metaMask"
            ? Movr
            : null;

    const walletText =
      props.walletType === "rocks" ?
        "GEMS"
        : props.walletType === "stones" ?
          "DIAMONDS"
          : "MOONRIVER";


    const walletAddress = props.walletAddress;
    const walletBalance = props.walletType === "stones" ? stoneBalance : props.walletBalance;
    const loadLogin = async () => {
      router.push("/signin", null, { shallow: true });
    };
    React.useEffect(() => {
      if (typeof window !== "undefined" && MetaMaskOnboarding.isMetaMaskInstalled()) {
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        ethersProvider.listAccounts().then(function (accounts, err) {
          if (err != null) console.error("An error occurred: " + err);
          else if (accounts.length === 0) setButtonVisible(true);
          else setButtonVisible(false);
        });
      }
    }, [buttonVisible]);

    React.useEffect(() => {
      async function doEffect() {
        if (session) {
          if (session.user && session.user.gems) {
            setStoneBalance(session.user.gems);
          }
          const user = await rootstore.getAuthUser()
          if (user) {
            setStoneBalance(user.gems)
          }
        }
        if (typeof window !== "undefined" && window.ethereum) {
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

          ethersProvider.listAccounts().then(async function (accounts, err) {

            if (err != null) console.error("An error occurred: " + err);
            else if (accounts.length === 0) {
            } else {
              //To set MOVR balance
              const balance = await ethersProvider.getBalance(accounts[0]);
              const wei_balance = await ethers.utils.formatEther(balance);

              setMovrBalance(wei_balance);
              //To get the WMOVR balance
              const wmovrBalance = await rootstore.GetWMOVRBalance(accounts[0]);
              setWMovrBalance(wmovrBalance);
            }
          });
        }
      }
      doEffect();
    }, [movrBalance]);

    React.useEffect(async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.on("accountsChanged", async (accounts) => {
          const newAddress = accounts[0];
          const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
          let bnBalance = await metamaskProvider.getBalance(newAddress);
          let parsedBalance = ethers.utils.formatEther(bnBalance);
          setMovrBalance(parsedBalance);
          const wmovrBalance = await rootstore.GetWMOVRBalance(newAddress);
          setWMovrBalance(wmovrBalance);
        });
      }


    }, [])

    // To chnage the wallet from MOVR TO WMOVR and vice versa
    function handleChange(event) {
      setCurrency(event.target.value);
    }
    //Function to check WMOVR balance

    if (props.walletType === "stones" || props.walletType === "rocks") {
      return (
        <WalletContainer wallet={wallet}>
          <TopPart>
            <Inner>
              <Icon
                height="35px"
                width="35px"
                name={walletIcon}
              />
              {session?.user ?
                <Text>
                  <Numeral
                    className="walletBalance"
                    value={walletBalance}
                    format={"0,0"}
                  />
                </Text>
                :
                <Text>0.000000</Text>
              }

            </Inner>
          </TopPart>
          {props.walletType === "stones" &&
            <TxtSmall>EST.EARNINGS</TxtSmall>
          }
          <BottomPart>
            <TxtContainer wallet={wallet}>
              <TxtBottom wallet={wallet}>{walletText}</TxtBottom>
            </TxtContainer>
          </BottomPart>
        </WalletContainer>
      );
    } else if (props.walletType === "metaMask") {
      return (
        <WalletContainer wallet={"metaMask"}>
          <TopPart>
            <Inner>
              <Icon
                strokeWidth="3"
                height="35px"
                width="35px"
                name={Movr}
              />
              <Text>
                <Numeral
                  className="walletBalance"
                  value={
                    /// doyle about to change
                    (() => {
                      const val = currency === "MOVR" && movrBalance > 0.000000 ? movrBalance : currency === "WMOVR" && wmovrBalance > 0.000000 ? wmovrBalance : '0';
                      //console.log(`val is ${val}`);
                      //return val; // uncomment to see gross NaN
                      const BASICALLY_ZERO = 0.00001; // it might make sense to tweek this value
                      if (val < BASICALLY_ZERO)
                        return "0.0";
                      return val;
                    })()
                    /// doyle about to change -- end of code block
                  }
                  format={"0,0.000000"}
                />
              </Text>
              <DropDawnAmount onChange={handleChange}>
                <Select>
                  {currencyOptions.map((element, index) => (
                    <Option key={index}>{element}</Option>
                  ))}
                </Select>
              </DropDawnAmount>
            </Inner>
          </TopPart>
          <BottomPart>
            <AddressContainer>
              <TxtBalance>{"Address:"}</TxtBalance>
              <Title>{walletAddress}</Title>
              <Address></Address>
            </AddressContainer>
            <TxtContainer wallet={Movr}>
              <TxtBottom wallet={Movr}>MOONRIVER</TxtBottom>
            </TxtContainer>
          </BottomPart>
        </WalletContainer>
      )
    } else if (props.walletType === "dummy") {
      return (
        <div style={{ position: 'relative' }}>
          <WalletContainer
            wallet={'metaMask'}
            style={{ opacity: 1 }}
          >
            <TopPart>
              <Inner>
                <Icon
                  strokeWidth="3"
                  height="35px"
                  width="35px"
                  name={Movr}
                />
                <Text>
                  <Numeral
                    className="walletBalance"
                    value={0.000}
                    format={"0,0.000000"}
                  />
                </Text>
              </Inner>
            </TopPart>
            <BottomPart>
              <AddressContainer>
                <TxtBalance>{"Address:"}</TxtBalance>
                <Title></Title>
                <Address></Address>
              </AddressContainer>
              <TxtContainer wallet={Movr}>
                <TxtBottom wallet={Movr}></TxtBottom>
              </TxtContainer>
            </BottomPart>
          </WalletContainer>
          <div
            style={{
              zIndex: 99,
              flex: 1,
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <OnboardingButton setShow={setButtonVisible} />
          </div>
        </div>
      )
    }
  }
  ));