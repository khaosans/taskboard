'use client';

import React from 'react';
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Web3SignInButton } from '@/components/Web3SignInButton';

const HomeDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-md hidden md:block">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-400">DeFi Chatbot</h1>
        </div>
        <nav className="mt-8">
          <a href="#" className="block py-2 px-4 text-gray-300 bg-gray-700 hover:bg-gray-600">Dashboard</a>
          <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">Agent Chat</a>
          <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">Portfolio</a>
          <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">Transactions</a>
          <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-gray-300 border-gray-600">EVM <ChevronDown className="ml-2 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-700 text-gray-300">
                  <DropdownMenuItem>EVM</DropdownMenuItem>
                  <DropdownMenuItem>Solana</DropdownMenuItem>
                  <DropdownMenuItem>Cosmos</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search" className="pl-8 bg-gray-700 text-gray-300 border-gray-600" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300">
                <Bell className="h-6 w-6" />
              </Button>
              {/* <Web3SignInButton /> */}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-100 text-3xl font-medium">Dashboard</h3>

            <div className="mt-8">
              <Card className="bg-gray-800 text-gray-100">
                <CardHeader>
                  <CardTitle>Portfolio Overview</CardTitle>
                  <CardDescription className="text-gray-400">Your total net worth across all connected chains</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">$12,345.67</div>
                  {/* 
                  <AreaChart
                    className="h-[200px] mt-4"
                    data={[
                      { date: "Jan 22", amount: 2890 },
                      { date: "Feb 22", amount: 1890 },
                      { date: "Mar 22", amount: 3890 },
                      { date: "Apr 22", amount: 2890 },
                      { date: "May 22", amount: 3890 },
                      { date: "Jun 22", amount: 3490 },
                    ]}
                    index="date"
                    categories={["amount"]}
                    colors={["blue"]}
                    valueFormatter={(value: number) => `$${value}`}
                  />
                  */}
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Tabs defaultValue="balances" className="text-gray-100">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="balances">Account Balances</TabsTrigger>
                  <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value="balances">
                  <Card className="bg-gray-800 text-gray-100">
                    <CardHeader>
                      <CardTitle>Account Balances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Ethereum</span>
                          <span className="font-medium text-blue-400">2.5 ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Solana</span>
                          <span className="font-medium text-blue-400">100 SOL</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Cosmos</span>
                          <span className="font-medium text-blue-400">50 ATOM</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="transactions">
                  <Card className="bg-gray-800 text-gray-100">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Swap ETH to USDC</span>
                          <span className="text-green-400">+500 USDC</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Stake ATOM</span>
                          <span className="text-red-400">-10 ATOM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Receive SOL</span>
                          <span className="text-green-400">+5 SOL</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-800 text-gray-100">
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription className="text-gray-400">Recommendations based on your portfolio and market trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          AI
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-100">Move stablecoins to yield farming</p>
                        <p className="text-sm text-gray-400">Potential 4% APY on Aave</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          AI
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-100">Consider hedging ETH position</p>
                        <p className="text-sm text-gray-400">Market volatility expected in the next week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeDashboard;