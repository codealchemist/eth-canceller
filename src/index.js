#!/usr/bin/env node
import { ethers } from 'ethers'
import inquirer from 'inquirer'
import loadJson from './util/load-json.js'
import pkgBanner from 'pkg-banner'

function log () {
  console.log('[ ETH-CANCELLER ]', ...arguments)
}

const args = process.argv.slice(2)
pkgBanner(import.meta.url, '../')

const [jsonFile] = args
if (!jsonFile) {
  log('Usage: eth-cancel-transaction [file]')
  process.exit()
}

// Receive data from JSON file and create provider.
const { apiUrl, privateKey, nonce, maxFeePerGas, maxPriorityFeePerGas } =
  loadJson(jsonFile)
const customHttpProvider = new ethers.JsonRpcProvider(apiUrl)

// Create wallet object.
const wallet = new ethers.Wallet(privateKey, customHttpProvider)

/**
 * Cancel transaction with given data.
 * @return {Promise}
 */
async function cancel () {
  // Create transaction.
  const { chainId } = await customHttpProvider.getNetwork()
  const tx = {
    to: wallet.address,
    value: 0,
    chainId,
    nonce,
    maxFeePerGas: ethers.parseUnits(maxFeePerGas.toString(), 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits(
      maxPriorityFeePerGas.toString(),
      'gwei'
    )
  }
  const gasLimit = await customHttpProvider.estimateGas(tx)
  tx.gasLimit = gasLimit
  tx.gasPrice = null

  // Confirm.
  log('TX', tx)
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to send this transaction?',
      default: false
    }
  ])
  if (confirm !== true) {
    log('Aborted')
    return
  }

  // Send.
  const res = await wallet.sendTransaction(tx)
  log('DONE', res)
}

cancel()
