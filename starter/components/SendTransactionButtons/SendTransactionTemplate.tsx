import React, { FC, useCallback, useState } from 'react';
import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import type { Keypair, TransactionSignature } from '@solana/web3.js';
import { getExplorerUrl, shortenHash, confirmTransaction } from '@/utils/utils';
import { Toaster, toast } from 'sonner';
import { cluster } from '@/utils/constants';

type SendTransactionTemplateProps = {
    transactionInstructions: TransactionInstruction[];
    buttonLabel: string;
    extraSigners?: Keypair[];
    invisible?: boolean;
    width?: number;
    onSuccess?: () => void;
};

export const SendTransactionTemplate: FC<SendTransactionTemplateProps> = ({ transactionInstructions, buttonLabel, extraSigners, width, invisible = false, onSuccess }) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = useCallback(async () => {
        // Add code here

    }, [publicKey, connection, sendTransaction, transactionInstructions, extraSigners, onSuccess]);

    return (
        <div className={`${invisible ? 'w-full h-full': ''} flex items-center justify-center w-full h-full`}>
            <Toaster richColors />
            <button
                onClick={onClick}
                disabled={!publicKey || isLoading}
                className={invisible
                    ? `w-full h-full bg-transparent border-none focus:outline-none z-10 text-opacity-0 hover:text-opacity-40 text-white`
                    : `w-${width ?? 80} inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out transform active:scale-95 m-5 ${isLoading ? 'opacity-75' : ''}`
                }

            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <SpinnerIcon />
                    </div>
                ) : (
                    buttonLabel
                )}
            </button>

        </div>
    );

};

const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
    </svg>
);
