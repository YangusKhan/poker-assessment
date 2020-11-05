import { Hand } from './Hand';
import { assert } from 'chai';

describe('Tests', () => {
  it('Test 1', () => {
    const hand2 = '8C,9C,10C,JC,QC'; 
    const hand1 = '6S,7H,8D,9H,10D';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(!result, `${hand2} should win!`);
  });

  it('Test 2', () => {
    const hand1 = '4H,4D,4C,4S,JS'; 
    const hand2 = '6C,6S,KH,AS,AD';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(result, `${hand1} should win!`);
  });

  it('Test 3', () => {
    const hand2 = '5C,3C,10C,KC,7C'; 
    const hand1 = '6C,6D,6H,9C,KD';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(!result, `${hand2} should win!`);
  });

  it('Test 4', () => {
    const hand1 = '4H,4D,4C,KC,KD'; 
    const hand2 = '9D,6S,KH,AS,AD';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(result, `${hand1} should win!`);
  });

  it('Test 5', () => {
    const hand2 = '2C,3C,4S,5S,6S'; 
    const hand1 = '6C,6D,6H,9C,KD';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(!result, `${hand2} should win!`);
  });

  it('Test 6', () => {
    const hand1 = '7C,7D,7S,3H,4D'; 
    const hand2 = '9S,6S,10D,AS,AD';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(result, `${hand1} should win!`);
  });

  it('Test 7', () => {
    const hand2 = '8C,8H,10S,KH,KS'; 
    const hand1 = '2S,2D,JH,7S,AC';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(!result, `${hand2} should win!`);
  });

  it('Test 8', () => {
    const hand1 = 'AC,AH,3C,QH,10C'; 
    const hand2 = '3S,2D,KH,JS,AD';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(result, `${hand1} should win!`);
  });

  it('Test 9', () => {
    const hand2 = '10C,9C,6C,7C,8C'; 
    const hand1 = 'QS,JD,10H,KS,AD';
    const result = new Hand(hand1).winsOver(new Hand(hand2));
    assert(!result, `${hand2} should win!`);
  });
});