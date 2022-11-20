import CryptobuteFactoryABI from '../abis/CrytobuteFactory.json'
import CryptobuteABI from '../abis/Cryptobute.json'

import Config from '../constractAddress/ContractAddress'

export const CRYPTOBUTE_FACTORY_CONTRACT={
    address:Config.CRYPTOBUTE_FACTORY_CONTRACT_ADDRESS,
    abi:CryptobuteFactoryABI
}

export const CRYPTOBUTE_CONTRACT={
    abi:CryptobuteABI
}