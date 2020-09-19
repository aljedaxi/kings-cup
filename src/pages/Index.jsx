import React , {useState} from 'react';
import { Set, Map } from 'immutable';
import { 
	compose,
	Just,
	Nothing,
	maybe,
	prop,
} from 'sanctuary';

const r = max => Math.floor(Math.random() * (max - 1) + 1);

const generateCard = () => Map({suit: r(5), number: r(14)});

const useDeck = () => {
	const [drawnCards, setDrawnCards] = useState(Set());
	const drawCard = () => {
		const card = generateCard();
		if (drawnCards.size === 52) {
			return Nothing;
		} else if (drawnCards.has(card)) {
			return drawCard();
		} else {
			setDrawnCards(drawnCards.add(card));
			return Just(card);
		}
	};

	return {
		drawCard, drawnCards
	};
}

const s = i => ({ 1: 'spades', 2: 'clubs', 3: 'hearts', 4: 'diamonds' }[i]);
const n = i =>
	i === 1 ? 'ace'
: i === 11 ? 'jack'
: i === 12 ? 'queen'
: i === 13 ? 'king'
: i;

const Card = card => 
	<div>
		{n(card.get('number'))} of {s(card.get('suit'))}
	</div>

const Empty = ({size}) =>
	size
		? <div>end of the deck</div>
		: <div>draw a card</div>

export const MaybeCard = ({maybeCard, size}) => maybe (<Empty size={size}/>) (Card) (maybeCard);

export const Index = props => {
	const {drawCard, drawnCards} = useDeck();
	const [mostRecentCard, setMostRecentCard] = useState(Nothing);

	const handleCardDraw = _ => {
		setMostRecentCard(drawCard());
	};

	return (
		<div>
			<div>
				<MaybeCard maybeCard={mostRecentCard} size={drawnCards.size}/>
			</div>
			<button onClick={handleCardDraw}>draw card</button>
		</div>
	);
};
