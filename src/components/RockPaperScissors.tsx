import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GameCard from './GameCard';
import { Scissors, Hand, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Move = 'rock' | 'paper' | 'scissors' | null;
type GameResult = 'win' | 'lose' | 'draw' | null;

interface RockPaperScissorsProps {
  isWalletConnected: boolean;
  onPlay: (move: Move) => Promise<{ computerMove: Move; result: GameResult }>;
}

const RockPaperScissors = ({ isWalletConnected, onPlay }: RockPaperScissorsProps) => {
  const [selectedMove, setSelectedMove] = useState<Move>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastGame, setLastGame] = useState<{
    playerMove: Move;
    computerMove: Move;
    result: GameResult;
  } | null>(null);
  const { toast } = useToast();

  const moves = [
    { id: 'rock' as Move, icon: Hand, label: 'Rock', rotation: 'rotate-90' },
    { id: 'paper' as Move, icon: Square, label: 'Paper', rotation: '' },
    { id: 'scissors' as Move, icon: Scissors, label: 'Scissors', rotation: '' },
  ];

  const handlePlay = async () => {
    if (!selectedMove) return;

    setIsPlaying(true);
    try {
      const result = await onPlay(selectedMove);
      setLastGame({
        playerMove: selectedMove,
        computerMove: result.computerMove,
        result: result.result,
      });

      const resultMessages = {
        win: 'You won! 🎉',
        lose: 'You lost! 😔',
        draw: "It's a draw! 🤝",
      };

      if (result.result) {
        toast({
          title: resultMessages[result.result],
          description: `You: ${selectedMove}, Computer: ${result.computerMove}`,
        });
      }
    } catch (error) {
      toast({
        title: 'Game Error',
        description: 'Failed to play the game. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPlaying(false);
      setSelectedMove(null);
    }
  };

  const getMoveIcon = (move: Move) => {
    const moveData = moves.find(m => m.id === move);
    if (!moveData) return null;
    const Icon = moveData.icon;
    return <Icon className={`h-6 w-6 ${moveData.rotation}`} />;
  };

  const getResultColor = (result: GameResult) => {
    switch (result) {
      case 'win': return 'text-gaming-green';
      case 'lose': return 'text-gaming-red';
      case 'draw': return 'text-gaming-gold';
      default: return '';
    }
  };

  return (
    <GameCard
      title="Rock Paper Scissors"
      description="Classic game of chance. Choose your move and try your luck!"
      icon={<Scissors className="h-6 w-6" />}
      fee="0.001"
      isEnabled={isWalletConnected}
      onPlay={handlePlay}
    >
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Choose your move:</p>
          <div className="grid grid-cols-3 gap-3">
            {moves.map(({ id, icon: Icon, label, rotation }) => (
              <Button
                key={id}
                variant={selectedMove === id ? "gaming" : "outline"}
                size="lg"
                className="flex flex-col gap-2 p-4 h-auto"
                onClick={() => setSelectedMove(id)}
                disabled={isPlaying}
              >
                <Icon className={`h-8 w-8 ${rotation}`} />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {lastGame && (
          <div className="border border-gaming-green/20 rounded-lg p-3 bg-secondary/50">
            <h4 className="text-sm font-semibold mb-2">Last Game Result:</h4>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span>You:</span>
                {getMoveIcon(lastGame.playerMove)}
                <Badge variant="secondary">{lastGame.playerMove}</Badge>
              </div>
              <div className={`font-bold ${getResultColor(lastGame.result)}`}>
                {lastGame.result?.toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <span>Computer:</span>
                {getMoveIcon(lastGame.computerMove)}
                <Badge variant="secondary">{lastGame.computerMove}</Badge>
              </div>
            </div>
          </div>
        )}

        {selectedMove && (
          <div className="text-center">
            <p className="text-sm text-gaming-green">
              Selected: {selectedMove} {getMoveIcon(selectedMove)}
            </p>
          </div>
        )}
      </div>
    </GameCard>
  );
};

export default RockPaperScissors;