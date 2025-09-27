import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GameCard from './GameCard';
import { Coins, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type CoinSide = 'gol' | 'pooch' | null;
type GameResult = 'win' | 'lose' | null;

interface GolPoochProps {
  isWalletConnected: boolean;
  onPlay: (guess: CoinSide) => Promise<{ result: CoinSide; gameResult: GameResult }>;
}

const GolPooch = ({ isWalletConnected, onPlay }: GolPoochProps) => {
  const [selectedGuess, setSelectedGuess] = useState<CoinSide>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastGame, setLastGame] = useState<{
    guess: CoinSide;
    result: CoinSide;
    gameResult: GameResult;
  } | null>(null);
  const { toast } = useToast();

  const choices = [
    { 
      id: 'gol' as CoinSide, 
      icon: Star, 
      label: 'Gol (Flower)', 
      color: 'text-gaming-gold',
      description: 'Bet on flower side'
    },
    { 
      id: 'pooch' as CoinSide, 
      icon: Coins, 
      label: 'Pooch (Empty)', 
      color: 'text-gaming-blue',
      description: 'Bet on empty side'
    },
  ];

  const handlePlay = async () => {
    if (!selectedGuess) return;

    setIsPlaying(true);
    setIsFlipping(true);
    
    // Simulate coin flip animation
    setTimeout(() => setIsFlipping(false), 2000);
    
    try {
      const result = await onPlay(selectedGuess);
      
      setTimeout(() => {
        setLastGame({
          guess: selectedGuess,
          result: result.result,
          gameResult: result.gameResult,
        });

        const resultMessages = {
          win: 'You won! 🎉',
          lose: 'You lost! 😔',
        };

        if (result.gameResult) {
          toast({
            title: resultMessages[result.gameResult],
            description: `You guessed: ${selectedGuess}, Result: ${result.result}`,
          });
        }
      }, 2100);
    } catch (error) {
      setIsFlipping(false);
      toast({
        title: 'Game Error',
        description: 'Failed to play the game. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => {
        setIsPlaying(false);
        setSelectedGuess(null);
      }, 2500);
    }
  };

  const getChoiceIcon = (choice: CoinSide) => {
    const choiceData = choices.find(c => c.id === choice);
    if (!choiceData) return null;
    const Icon = choiceData.icon;
    return <Icon className="h-6 w-6" />;
  };

  const getResultColor = (result: GameResult) => {
    switch (result) {
      case 'win': return 'text-gaming-green';
      case 'lose': return 'text-gaming-red';
      default: return '';
    }
  };

  return (
    <GameCard
      title="Gol ya Pooch"
      description="Traditional Persian coin flip game. Guess the side and win!"
      icon={<Coins className="h-6 w-6" />}
      fee="0.001"
      isEnabled={isWalletConnected}
      onPlay={handlePlay}
    >
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Make your guess:</p>
          
          {/* Coin flip animation area */}
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full border-4 border-gaming-green bg-gradient-gaming flex items-center justify-center ${
              isFlipping ? 'animate-spin' : ''
            }`}>
              {isFlipping ? (
                <Coins className="h-10 w-10 text-primary-foreground" />
              ) : lastGame ? (
                <div className={`${lastGame.result === 'gol' ? 'text-gaming-gold' : 'text-gaming-blue'}`}>
                  {getChoiceIcon(lastGame.result)}
                </div>
              ) : (
                <Coins className="h-10 w-10 text-primary-foreground opacity-50" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {choices.map(({ id, icon: Icon, label, color, description }) => (
              <Button
                key={id}
                variant={selectedGuess === id ? "gaming" : "outline"}
                size="lg"
                className="flex flex-col gap-2 p-4 h-auto"
                onClick={() => setSelectedGuess(id)}
                disabled={isPlaying}
              >
                <Icon className={`h-8 w-8 ${color}`} />
                <div className="text-center">
                  <div className="text-xs font-semibold">{label}</div>
                  <div className="text-xs opacity-70">{description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {lastGame && !isPlaying && (
          <div className="border border-gaming-green/20 rounded-lg p-3 bg-secondary/50">
            <h4 className="text-sm font-semibold mb-2">Last Game Result:</h4>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span>Your Guess:</span>
                {getChoiceIcon(lastGame.guess)}
                <Badge variant="secondary">{lastGame.guess}</Badge>
              </div>
              <div className={`font-bold ${getResultColor(lastGame.gameResult)}`}>
                {lastGame.gameResult?.toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <span>Result:</span>
                {getChoiceIcon(lastGame.result)}
                <Badge variant="secondary">{lastGame.result}</Badge>
              </div>
            </div>
          </div>
        )}

        {selectedGuess && !isPlaying && (
          <div className="text-center">
            <p className="text-sm text-gaming-green">
              Selected: {selectedGuess} {getChoiceIcon(selectedGuess)}
            </p>
          </div>
        )}
      </div>
    </GameCard>
  );
};

export default GolPooch;