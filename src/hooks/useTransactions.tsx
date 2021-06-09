import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string;
    createAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createAt'>

interface TransactionProviderProps {
   children: ReactNode; 
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransaction(response.data.transactions));
    }, []);

    async function createTransaction(transationInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transationInput,
            createAt: new Date(),
        });
        const { transaction } = response.data;

        setTransaction([
            ...transactions, 
            transaction,
        ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}