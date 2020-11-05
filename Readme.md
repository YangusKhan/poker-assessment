###Information

Given a set of 5 playing card identifiers such as 2H, 7C, QS, 10D, 2D determine if this hand is better than some other hand, according to the rules of poker.

Hands will be a string with 5 cards comma separated, each card will have 1-2 digits or JQKA and a suit indicator C,D,S,H (i.e. 10C, KH)

Possible Hand Types Below:
Straight flush
Four of a kind
Full house
Flush
Straight
Three of a kind
Two pair
One pair
High card

### Objective

The goal of this is to compare the hand types and determine which one wins.
To do so, you will need to modify the Hand.ts file.

Feel free to add test cases in test.ts

### Running tests

After running `npm i`, we will run `npm test` on the default test and some more extensive tests we do not expose here.