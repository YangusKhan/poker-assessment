type cardColor = 'H' | 'C' | 'S' | 'D';
type cardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
type handName = 'Straight flush' | 'Four of a kind' | 'Full house' | 'Flush' | 'Straight' | 'Three of a kind' | 'Two pair' | 'One pair' | 'High card';

export class Hand {

  constructor(input: string) {
    // YOUR CODE HERE
    
  }

  winsOver(otherHand: Hand): boolean {
    // YOUR CODE HERE
    return true;
  }
}

function valueOfHand(name: handName) : number{
  switch(name){
    case "High card":       return 0;
    case "One pair":        return 1;
    case "Two pair":        return 2;
    case "Three of a kind": return 3;
    case "Straight":        return 4;
    case "Flush":           return 5;
    case "Full house":      return 6;
    case "Four of a kind":  return 7;
    case "Straight flush":  return 8;
    default:                return 0;
  }
}

function valueOfCard(name: cardValue) : number{
  switch(name){
    case "2": return 0;
    case "3": return 1;
    case "4": return 2;
    case "5": return 3;
    case "6": return 4;
    case "7": return 5;
    case "8": return 6;
    case "9": return 7;
    case "10":return 8;
    case "J": return 9;
    case "Q": return 10;
    case "K": return 11;
    case "A": return 12;
    default:  return 0;
  }
}