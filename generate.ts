import { MnemonicKey } from '@initia/initia.js';
import fs from 'fs';

// Define the type for key data
type KeyData = {
    publicKey: string;
    privateKey: Buffer;
    mnemonic: string;
    YOUR_ADDRESS: string;
};

// Function to generate key objects
function generateKeys(numKeys: number): KeyData[] {
    const keys: KeyData[] = [];
    for (let i = 0; i < numKeys; i++) {
        const key = new MnemonicKey({
            mnemonic: undefined,
            account: 0,
            index: 0,
            coinType: 118
        });

        // Check if publicKey is defined before accessing its toString() method
        const publicKeyString = key.publicKey ? key.publicKey.toString() : '';

        // Extract the necessary information from the key object
        const keyData: KeyData = {
            publicKey: publicKeyString,
            privateKey: key.privateKey,
            mnemonic: key.mnemonic,
            YOUR_ADDRESS: key.accAddress
        };

        keys.push(keyData);
    }
    return keys;
}

// Check command-line arguments
const args = process.argv.slice(2);
if (args.length !== 1 || isNaN(parseInt(args[0]))) {
    console.error('Usage: node generateKeys.js <numKeys>');
    process.exit(1);
}

const numKeys = parseInt(args[0]);
console.log(`Generating ${numKeys} keys...`);

// Generate keys
const keys = generateKeys(numKeys);

// Save keys to a JSON file
const data = JSON.stringify(keys, null, 2);
fs.writeFileSync('keys.json', data);

console.log('Keys generated and saved to keys.json successfully.');
