import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  fee: string;
  isEnabled: boolean;
  onPlay: () => void;
  children: ReactNode;
}

const GameCard = ({ 
  title, 
  description, 
  icon, 
  fee, 
  isEnabled, 
  onPlay, 
  children 
}: GameCardProps) => {
  return (
    <Card className={`border-gaming-green/20 bg-gradient-dark transition-all duration-300 ${
      isEnabled ? 'hover:border-gaming-green/40 hover:shadow-lg hover:shadow-gaming-green/10' : 'opacity-60'
    }`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-gaming-green">
          {icon}
          {title}
          <Badge variant="outline" className="ml-auto border-gaming-gold text-gaming-gold">
            {fee} ZTC
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <Button 
          variant="gaming" 
          size="lg" 
          className="w-full"
          onClick={onPlay}
          disabled={!isEnabled}
        >
          {isEnabled ? `Play ${title}` : 'Connect Wallet to Play'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;