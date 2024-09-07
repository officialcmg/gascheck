import { JsonRpcProvider } from 'ethers';

const apiKey = import.meta.env.VITE_API_KEY;

// Initialize the provider
const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`);

// Function to get the latest block
async function getLatestBlock() {
    try {
        const block = await provider.getBlock("latest");
        return block;
    } catch (error) {
        console.error("Error fetching block:", error);
        throw error;
    } finally {
    console.log(provider)
    }
};

// Function to get the current gas price
async function getGasPrice() {
    try {
        const block = await getLatestBlock();
        // baseFeePerGas is in wei, convert to gwei
        const baseFeePerGas = block.baseFeePerGas;
        const gasPriceInGwei = Number(baseFeePerGas) / 1e9;
        return gasPriceInGwei.toFixed(2); // Format to 2 decimal places
    } catch (error) {
        console.error("Error fetching gas price:", error);
        throw error;
    }
};

export { getLatestBlock, getGasPrice }