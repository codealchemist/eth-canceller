# eth-canceller

Simply cancel an ETH transaction.

<img width="455" alt="image" src="https://github.com/codealchemist/eth-canceller/assets/1118293/0e1fc58d-06e8-4c82-94e6-8bb55f660b30">

## Usage

You can either install the app globally first with:

`npm i -g eth-canceller`

And then run it with:

`eth-canceller [file]`

Or, you can just run it without installing:

`npx eth-canceller [file]`

Where `[file]` is a JSON document with all required details to cancel the transaction.

Sample usage:

`eth-canceller details.json`

## Details file

This is the file used to provide all wallet and transaction details
required to cancel the transaction.

Sample file:

```
{
  "apiUrl": "https://mainnet.infura.io/v3/API_KEY",
  "privateKey": "this is your wallet private key",
  "nonce": 1,
  "maxFeePerGas": 90,
  "maxPriorityFeePerGas": 0.15
}
```

If you don't have an `apiUrl` you can get one for free from [Infura](https://app.infura.io/).

The app will confirm the transaction before sending it.

## Concepts

`maxPriorityFeePerGas` is the tip you give to the miner.

`maxFeePerGas` is the max you are willing per gas including: `maxPriorityFeePerGas + baseFeePerGas`.

[Continue reading](https://docs.alchemy.com/docs/maxpriorityfeepergas-vs-maxfeepergas).

## IMPORTANT

Please, keep your private key safe at all times!

Don't execute this app in a non trusted environment / machine.

Delete your private key or the whole fine once you're done.

Your private key gives full access yo your wallet and your funds!
