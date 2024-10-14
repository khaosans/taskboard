'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, Download, Search } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext';
import Spinner from '@/components/Spinner';

interface Transaction {
  id: string;
  type: string;
  from?: string;
  to?: string;
  asset?: string;
  amount: string;
  value: string;
  fee: string;
  date: string;
  status: string;
}

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { wallet } = useWallet();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!wallet?.address) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/transactions?address=${wallet.address}`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError('Failed to load transactions. Please try again later.');
        console.error(err); // Ensure console is defined in the client context
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [wallet?.address]);

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  // Update the sort function to use a type-safe approach
  const filteredAndSortedTransactions = transactions
    .sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Transaction]; // Type assertion for safe indexing
      const bValue = b[sortConfig.key as keyof Transaction]; // Type assertion for safe indexing

      // Check for undefined values before comparison
      if (aValue === undefined || bValue === undefined) {
        return 0; // or handle undefined values as needed
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  if (loading) return <Spinner size="large" color="#611BBD" />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex-1 w-full md:w-auto">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="swap">Swap</SelectItem>
              <SelectItem value="stake">Stake</SelectItem>
              <SelectItem value="unstake">Unstake</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
              <SelectItem value="receive">Receive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => handleSort('date')}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('type')}>
                  Type
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => handleSort('value')}>
                  Value
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.date}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>
                  {tx.type === 'Swap' ? (
                    `${tx.amount} ${tx.from} → ${tx.to}`
                  ) : tx.type === 'Transfer' ? (
                    `${tx.amount} to ${tx.to}`
                  ) : (
                    `${tx.amount} ${tx.asset}`
                  )}
                </TableCell>
                <TableCell className="text-right">{tx.value}</TableCell>
                <TableCell className="text-right">{tx.fee}</TableCell>
                <TableCell>{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Note: Transaction fees are included for informational purposes. Please consult with a tax professional for advice on tax implications of your transactions.</p>
      </div>
    </div>
  )
}
