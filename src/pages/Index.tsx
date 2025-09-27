import { useState, useEffect } from 'react';
import WalletConnection from '@/components/WalletConnection';
import RockPaperScissors from '@/components/RockPaperScissors';
import GolPooch from '@/components/GolPooch';
import TransactionHistory from '@/components/TransactionHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, TrendingUp, Users, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'rps' | 'golpooch';
  result: 'win' | 'lose' | 'draw';
  amount: string;
  timestamp: string;
  txHash: string;
  playerMove?: string;
  computerMove?: string;
}

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0.000');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  // Mock wallet connection
  const handleWalletConnect = async () => {
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsWalletConnected(true);
    setWalletAddress('0x1234...5678');
    setBalance('2.450');
    
    // Add some mock transaction history
    setTransactions([
      {
        id: '1',
        type: 'rps',
        result: 'win',
        amount: '0.001',
        timestamp: '2 minutes ago',
        txHash: '0xabc123def456',
        playerMove: 'rock',
        computerMove: 'scissors'
      },
      {
        id: '2',
        type: 'golpooch',
        result: 'lose',
        amount: '0.001',
        timestamp: '5 minutes ago',
        txHash: '0x789xyz321',
        playerMove: 'gol',
        computerMove: 'pooch'
      },
    ]);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    setBalance('0.000');
    setTransactions([]);
  };

  // Mock game play functions
  const handleRPSPlay = async (move: 'rock' | 'paper' | 'scissors' | null) => {
    if (!move) return { computerMove: null, result: null };
    
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const moves = ['rock', 'paper', 'scissors'] as const;
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    
    let result: 'win' | 'lose' | 'draw';
    if (move === computerMove) {
      result = 'draw';
    } else if (
      (move === 'rock' && computerMove === 'scissors') ||
      (move === 'paper' && computerMove === 'rock') ||
      (move === 'scissors' && computerMove === 'paper')
    ) {
      result = 'win';
    } else {
      result = 'lose';
    }

    // Update balance (subtract fee)
    const currentBalance = parseFloat(balance);
    setBalance((currentBalance - 0.001).toFixed(3));

    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'rps',
      result,
      amount: '0.001',
      timestamp: 'Just now',
      txHash: `0x${Math.random().toString(16).substr(2, 8)}`,
      playerMove: move,
      computerMove
    };
    setTransactions(prev => [newTransaction, ...prev]);

    return { computerMove, result };
  };

  const handleGolPoochPlay = async (guess: 'gol' | 'pooch' | null) => {
    if (!guess) return { result: null, gameResult: null };
    
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const sides = ['gol', 'pooch'] as const;
    const result = sides[Math.floor(Math.random() * sides.length)];
    const gameResult: 'win' | 'lose' = guess === result ? 'win' : 'lose';

    // Update balance (subtract fee)
    const currentBalance = parseFloat(balance);
    setBalance((currentBalance - 0.001).toFixed(3));

    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'golpooch',
      result: gameResult,
      amount: '0.001',
      timestamp: 'Just now',
      txHash: `0x${Math.random().toString(16).substr(2, 8)}`
    };
    setTransactions(prev => [newTransaction, ...prev]);

    return { result, gameResult };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gaming-green/20 bg-gradient-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-gaming flex items-center justify-center glow-green">
                <Gamepad2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gaming-green">ZenChain Games</h1>
                <p className="text-sm text-muted-foreground">Blockchain Gaming on ZenChain Testnet</p>
              </div>
            </div>
            <Badge variant="outline" className="border-gaming-green text-gaming-green">
              Chain ID: 8408
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-gaming bg-clip-text text-transparent">
            Play. Win. Earn ZTC.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience classic games with cryptocurrency rewards on ZenChain Testnet. 
            Connect your wallet and start playing Rock Paper Scissors and Gol ya Pooch!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-gaming-green/20 bg-gradient-dark text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-gaming-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-green">0.001 ZTC</div>
              <div className="text-sm text-muted-foreground">Game Fee</div>
            </CardContent>
          </Card>
          <Card className="border-gaming-green/20 bg-gradient-dark text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-gaming-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-gold">2</div>
              <div className="text-sm text-muted-foreground">Games Available</div>
            </CardContent>
          </Card>
          <Card className="border-gaming-green/20 bg-gradient-dark text-center">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-gaming-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gaming-blue">Instant</div>
              <div className="text-sm text-muted-foreground">Blockchain Results</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet */}
          <div className="space-y-6">
            <WalletConnection
              isConnected={isWalletConnected}
              onConnect={handleWalletConnect}
              onDisconnect={handleWalletDisconnect}
              balance={balance}
              address={walletAddress}
            />
          </div>

          {/* Middle Column - Games */}
          <div className="space-y-6">
            <RockPaperScissors
              isWalletConnected={isWalletConnected}
              onPlay={handleRPSPlay}
            />
            <GolPooch
              isWalletConnected={isWalletConnected}
              onPlay={handleGolPoochPlay}
            />
          </div>

          {/* Right Column - Transaction History */}
          <div>
            <TransactionHistory transactions={transactions} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gaming-green/20">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-sm">
              <a 
                href="https://faucet.zenchain.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gaming-green hover:text-gaming-green-glow transition-colors"
              >
                Get Test ZTC →
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="https://explorer.zenchain.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gaming-green hover:text-gaming-green-glow transition-colors"
              >
                Block Explorer →
              </a>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">ZenChain Testnet</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for ZenChain Testnet • Play responsibly
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;