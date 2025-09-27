import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Clock, Trophy, X, Minus } from 'lucide-react';

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

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'win': return <Trophy className="h-4 w-4 text-gaming-green" />;
      case 'lose': return <X className="h-4 w-4 text-gaming-red" />;
      case 'draw': return <Minus className="h-4 w-4 text-gaming-gold" />;
      default: return null;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'text-gaming-green border-gaming-green/20';
      case 'lose': return 'text-gaming-red border-gaming-red/20';
      case 'draw': return 'text-gaming-gold border-gaming-gold/20';
      default: return '';
    }
  };

  const formatGameType = (type: string) => {
    return type === 'rps' ? 'Rock Paper Scissors' : 'Gol ya Pooch';
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  if (transactions.length === 0) {
    return (
      <Card className="border-gaming-green/20 bg-gradient-dark">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gaming-green">
            <Clock className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No games played yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start playing to see your transaction history
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gaming-green/20 bg-gradient-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gaming-green">
          <Clock className="h-5 w-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="border border-gaming-green/10 rounded-lg p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getResultIcon(tx.result)}
                    <div>
                      <div className="font-medium text-sm">
                        {formatGameType(tx.type)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {tx.timestamp}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getResultColor(tx.result)}>
                    {tx.result.toUpperCase()}
                  </Badge>
                </div>
                
                {tx.playerMove && tx.computerMove && (
                  <div className="text-xs text-muted-foreground mb-2">
                    You: {tx.playerMove} vs Computer: {tx.computerMove}
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span>Fee: {tx.amount} ZTC</span>
                    <a
                      href={`https://explorer.zenchain.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gaming-green hover:text-gaming-green-glow transition-colors"
                    >
                      {truncateHash(tx.txHash)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;