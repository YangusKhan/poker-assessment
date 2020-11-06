type cardColor = 'H' | 'C' | 'S' | 'D';
type cardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
type handName = 'Straight flush' | 'Four of a kind' | 'Full house' | 'Flush' | 'Straight' | 'Three of a kind' | 'Two pair' | 'One pair' | 'High card';

export class Hand {

  readonly handName: handName;
  readonly handScore: number;
  readonly extraScore: number;
  readonly cards: Array<[cardValue, cardColor]>;

  constructor(input: string) {
    // Default member variables
    this.handName = "High card";
    this.handScore = 0;
    this.extraScore = 0;
    this.cards = [];

    // Parse input string and place into cards tuple array
    const inputCards = input.split(",");
    for (const card of inputCards) {
      const value = card.slice(0, -1) as cardValue;
      const color = card.slice(-1) as cardColor;
      this.cards.push([value, color]);
    }

    const valueMap = this.mapValues();
    const isStraight = this.isStraight();
    const isFlush = this.isFlush();

    if (isStraight || isFlush) {
      this.handScore = sumCardValues(Array.from(valueMap.keys()))
      this.handName = isStraight && isFlush ? "Straight flush" : isStraight ? "Straight" : "Flush";
      return;
    }

    const cardValues = new Set(valueMap.keys());
    /** We now have a mapping of card values to colors, and the number of same values
     * determines what kind of hand it is, so for each case of same-values, we separately sum the values
     * of the cards relevant to the hand type and all extra cards (for tie-breaking) */
    switch(cardValues.size) {
      case 2:
        for (const card of cardValues) {
          const colors = valueMap.get(card);
          const colorCount = colors?.length;

          if (colorCount === 4) {
            this.handName = "Four of a kind";
            this.handScore += colorCount * valueOfCard(card);
          } else if (colorCount === 3 || colorCount === 2) {
            this.handName = "Full house";
            this.handScore += colorCount * valueOfCard(card);
          } else {
            this.extraScore += valueOfCard(card);
          }
        }
        break;

      case 3:
        for (const card of cardValues) {
          const colors = valueMap.get(card);
          const colorCount = colors?.length;
          if (colorCount === 3) {
            this.handName = "Three of a kind";
            this.handScore += colorCount * valueOfCard(card);
          } else if (colorCount === 2) {
            this.handName = "Two pair";
            this.handScore += colorCount * valueOfCard(card);
          } else {
            this.extraScore += valueOfCard(card);
          }
        }
        break;

      case 4:
        this.handName = "One pair";

        for (const card of cardValues) {
          const colors = valueMap.get(card);
          const colorCount = colors?.length;
          if (colorCount === 2) {
            this.handScore = colorCount * valueOfCard(card);
          } else {
            this.extraScore += valueOfCard(card);
          }
        }
        break;

      case 5:
      default:
        this.handName = "High card";
        const descendingCards = Array.from(cardValues).map((cardVal) => { return valueOfCard(cardVal)}).sort((a, b) => b - a);
        this.handScore = descendingCards[0];
        this.extraScore = descendingCards.slice(1).reduce((sum, value) => sum + value, 0);
        break;
    }
  }

  winsOver(otherHand: Hand): boolean {
    const myHandValue = valueOfHand(this.handName);
    const otherHandValue = valueOfHand(otherHand.handName);

    if (myHandValue > otherHandValue) {
      return true;
    } else if (myHandValue < otherHandValue) {
      return false;
    } else {
      if (this.handScore === otherHand.handScore) {
        return this.extraScore > otherHand.extraScore;
      }
      return this.handScore > otherHand.handScore;
    }
  }

  isStraight(): boolean {
    const values = this.cards.map((card) => valueOfCard(card[0]));
    const sortedValues = values.sort((a, b) => a - b);

    for (let i = sortedValues.length - 1; i > 1; i--) {
      const current = sortedValues[i];
      const prev = sortedValues[i - 1];
      const difference = current - prev;
      if (difference !== 1) {
        return false;
      }
    }
    return true;
  }

  isFlush(): boolean {
    const colorMap = this.mapColors();
    return new Set(colorMap.keys()).size === 1;
  }

  protected mapValues(): Map<cardValue, cardColor[]> {
    const valueMap = new Map<cardValue, cardColor[]>();
    for (const card of this.cards) {
      const value = card[0];
      const cardValues = valueMap.get(value) || [];
      valueMap.set(value, cardValues.concat(card[1]));
    }
    return valueMap;
  }

  protected mapColors(): Map<cardColor, cardValue[]> {
    const colorMap = new Map<cardColor, cardValue[]>();
    for (const card of this.cards) {
      const color = card[1];
      const cardValues = colorMap.get(color) || [];
      colorMap.set(color, cardValues.concat(card[0]));
    }
    return colorMap;
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

function sumCardValues(cardValues?: cardValue[]) {
  if (!cardValues) return 0;
  return cardValues.reduce((sum, value) => { return sum + valueOfCard(value)}, 0);
}
