import React, {useState} from 'react';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import Transport from '@ledgerhq/hw-transport';
import AppEth from '@ledgerhq/hw-app-eth';
import {listen} from '@ledgerhq/logs';
// require("babel-polyfill");
// const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid").default;
// const AppEth = require("@ledgerhq/hw-app-eth").default;
// const { listen } = require("@ledgerhq/logs");

export function Ledger() {
  const [transport, setTransport] = useState<Transport>();
  const [appEth, setAppEth] = useState();
  const [address, setAddress] = useState('');

  const connect = async () => {
    try {
      const _transport = await TransportNodeHid.open('');
      listen(console.log);
      const _appEth = new AppEth(_transport);
      const {address: _address} = await _appEth.getAddress("44'/60'/0'/0/0");

      setTransport(_transport);
      setAppEth(_appEth);
      setAddress(_address);
    } catch (e) {
      console.error(e);
    }
  };

  function renderConnectMessage() {
    if (!!transport) {
      return (
        <div>
          <p>Connect ledger and unlock, and press below button</p>
          <button onClick={connect}>connect</button>
        </div>
      );
    }
    return undefined;
  }

  function renderAddress() {
    if (address !== '') {
      return <p>Your address is {address}</p>;
    }
    return undefined;
  }

  return (
    <>
      {renderConnectMessage()}
      {renderAddress()}
    </>
  );
}
