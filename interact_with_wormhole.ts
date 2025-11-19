import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { PublicKey, Keypair, Connection, ComputeBudgetProgram, TransactionInstruction,VersionedMessage, VersionedTransaction, TransactionMessage, SystemProgram } from "@solana/web3.js";
import * as dotenv from "dotenv"
import { getAssociatedTokenAddress, getAccount, TYPE_SIZE, getAssociatedTokenAddressSync, createAssociatedTokenAccount, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { Wormhole } from "./TokenBridge";
import Wormholeidl from "./token_bridge.json";
import { JsonRpcProvider } from "ethers";

dotenv.config();
const secret_key: number[] = JSON.parse(process.env.SECRET_KEY!);
const program_id = new PublicKey("B6RHG3mfcckmrYN1UhmJzyS1XX3fZKbkeUcpJe9Sy3FE");
const signedKeyPair = Keypair.fromSecretKey(Uint8Array.from(secret_key));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const wallet = new Wallet(signedKeyPair)
const provider =  new AnchorProvider(connection, wallet, {commitment: "confirmed"})
const my_public_key = wallet.publicKey.toBase58()
console.log(my_public_key);

const wormhole: Program<Wormhole> = new Program(Wormholeidl as any, provider);
const usdcAddr = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");



async function main() {

}

