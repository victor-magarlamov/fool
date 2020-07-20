# FOOL
a JavaScript implementation of the popular card game. [**PLAY!**](https://victor-magarlamov.github.io/fool/)

![FOOL](https://github.com/victor-magarlamov/fool/blob/master/packages/app/public/fool.png)

## Technologies
Project is created with:
* Lerna - for monorepo packages management
* CSS - for animation
* JS - for logic
* ReactJS - for visualization
* Emoji - for fun )

![FOOL](https://github.com/victor-magarlamov/fool/blob/master/packages/app/public/card-table.png)
## About the game
The rules are simple: there are 36 cards in the deck, one suit is trump, the first attacker is the one with the smallest trump card. In the begining the attacker can discard any card form his hand. In order to beat the defender must discard a card of the same suit, but of a higher rank or trump. The attacker can continue the attack. He can discard the next card, which must be of the same rank as one of the face up cards.

This game has one funny feature. There is no winner. Only a loser.

In my implementation, there are only two players: a human and a robot. Who will lose?

[**PLAY WITH 🤖**](https://victor-magarlamov.github.io/fool/)
