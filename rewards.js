// Replace this with your actual contract address
const contractAddress = "0xf3E8Cb8f586448Ea55063d98D14b4f8Af59Ca89a";
const contractAddressReal = "0x9C5Df71562afeFa6B4ffa0eF226C9758Dad31e09";
// Minimal ABI just for the two functions you want
const abi = [
    "function totalDistributed() view returns (uint256)",
    "function getUnpaidEarnings(address shareholder) view returns (uint256)",
    {
        name: "shares",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "", type: "address" }],
        outputs: [
            { name: "amount", type: "uint256" },
            { name: "totalExcluded", type: "uint256" },
            { name: "totalRealised", type: "uint256" }
        ]
    }
];

async function fetchTokenPairs() {
    const url = `https://api.dexscreener.com/token-pairs/v1/base/${contractAddressReal}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      try {
        var extracted_data = data[0]
        if(extracted_data.priceUsd){
            console.log(extracted_data.priceUsd)
            document.getElementById("realtimeprice").innerText = Number(extracted_data.priceUsd).toFixed(8);
        }
        if(extracted_data.txns && extracted_data.txns.h24){
            const total_txns = extracted_data.txns.h24.sells + extracted_data.txns.h24.buys
            document.getElementById("realtxns").innerText = Math.round(Number(total_txns)).toLocaleString();
        }realvolume
        if(extracted_data.volume && extracted_data.volume.h24){
            document.getElementById("realvolume").innerText = Math.round(Number(extracted_data.volume.h24)).toLocaleString();
            document.getElementById("estrewards").innerText = Math.round(Number(extracted_data.volume.h24)*0.01).toLocaleString();

        }
      } catch (error) {
        console.log(error)
      }
      return data; // or process it here
    } catch (error) {
      console.error("Failed to fetch token pairs:", error);
      return null;
    }
  }


async function loadData() {
    // Your public RPC endpoint for the network your contract is on
    // Example for Ethereum mainnet using public Infura endpoint (replace YOUR_INFURA_PROJECT_ID)
    const rpcUrl = "https://base-mainnet.public.blastapi.io";
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    // Create contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
        var totalDistributedBN = await contract.totalDistributed();
        const totalDistributedEth = ethers.utils.formatUnits(totalDistributedBN, 6);

        // Update DOM

        console.log("successer", Number(totalDistributedEth).toFixed(2))
        document.getElementById("paidRewardsUSD").innerText = Number(totalDistributedEth).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (error) {
        console.error("problerm", error);

    }
    console.log("hereeeeeeeeeeeeee")
}

function isValidEthereumAddress(address) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return false;

    // If all lowercase or all uppercase, it's valid (no checksum enforced)
    const isAllLower = address === address.toLowerCase();
    const isAllUpper = address === address.toUpperCase();
    if (isAllLower || isAllUpper) return true;

    // Else, validate checksum
    return isChecksumAddress(address);
}

function isChecksumAddress(address) {
    address = address.replace('0x', '');
    const hash = keccak256(address.toLowerCase());

    for (let i = 0; i < 40; i++) {
        const char = address[i];
        const hashChar = parseInt(hash[i], 16);

        if ((hashChar > 7 && char !== char.toUpperCase()) ||
            (hashChar <= 7 && char !== char.toLowerCase())) {
            return false;
        }
    }
    return true;
}

// --- Lightweight keccak256 hash (using js-sha3)
function keccak256(value) {
    return sha3_256(value);
}

document.getElementById('checkButton').addEventListener('click', async function () {
    const address = document.getElementById('public_wallet_address').value;
    console.log("xdd")
    if (true) {
        try {
            console.log("HERE")
            const rpcUrl = "https://base-mainnet.public.blastapi.io";
            const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
            // Create contract instance
            const contract = new ethers.Contract(contractAddress, abi, provider);
            var totalDistributedBN = await contract.shares(address);
            
            const totalDistributedEth = ethers.utils.formatUnits(totalDistributedBN.totalRealised, 6);
            document.getElementById("rupees").innerText = Number(totalDistributedEth).toFixed(2);
        } catch (error) {
            //console.log("ERROR", error)
        }
    }
    // Validate the address here
});

loadData();
fetchTokenPairs();

setInterval(() => {
    loadData();
}, 15000);

// setInterval(() => {
//     fetchTokenPairs();
// }, 2000);