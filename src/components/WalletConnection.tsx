import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, WifiOff, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  balance: string;
  address: string;
}

const WalletConnection = ({ 
  isConnected, 
  onConnect, 
  onDisconnect, 
  balance, 
  address 
}: WalletConnectionProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await onConnect();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to ZenChain Testnet",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <Card className="border-gaming-green/20 bg-gradient-dark">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-gaming-green">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Connect your wallet to start playing games on ZenChain Testnet
          </p>
          <Button 
            variant="gaming" 
            size="lg" 
            className="w-full"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </Button>
          <div className="text-xs text-center text-muted-foreground space-y-1">
            <p>Network: ZenChain Testnet</p>
            <p>Chain ID: 8408</p>
            <a 
              href="https://faucet.zenchain.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gaming-green hover:text-gaming-green-glow transition-colors"
            >
              Get ZTC from Faucet →
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gaming-green/20 bg-gradient-dark">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gaming-green">
            <CheckCircle className="h-5 w-5" />
            Wallet Connected
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDisconnect}
            className="border-gaming-red text-gaming-red hover:bg-gaming-red/10"
          >
            <WifiOff className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Address:</span>
            <Badge variant="secondary" className="font-mono">
              {truncateAddress(address)}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Balance:</span>
            <Badge variant="outline" className="border-gaming-green text-gaming-green font-bold">
              {balance} ZTC
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Network:</span>
            <Badge variant="secondary">ZenChain Testnet</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnection;