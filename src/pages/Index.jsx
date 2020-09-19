import React , {useState} from 'react';
import { Set, Map } from 'immutable';
import { 
	compose,
	Just,
	Nothing,
	maybe,
	prop,
} from 'sanctuary';
import {createUseStyles} from 'react-jss';

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

const Card = ({card, ...props}) => 
	<div {...props}>
		{n(card.get('number'))} of {s(card.get('suit'))}
	</div>

const topTextStyles = { color: 'white', fontSize: '1.5em' };

const Empty = ({size}) =>
	size
		? <div style={topTextStyles}>end of the deck</div>
		: <div style={topTextStyles}>draw a card</div>

export const MaybeCard = ({maybeCard, size, ...props}) => maybe (<Empty size={size}/>) (card => <Card {...{card, ...props}}/>) (maybeCard);

const useStyles = createUseStyles({
	page: {
		height: '100%',
		display: 'grid',
		gridTemplateRows: '1fr 1fr 1fr',
		gridTemplateColumns: '1fr 1fr 1fr'
	},
	container: {
		background: 'black',
		gridColumnStart: 2,
		gridColumnEnd: 3,
		gridRowStart: 2,
		gridRowEnd: 3,
		display: 'grid',
		alignItems: 'center',
		justifyItems: 'center',
	},
	card: topTextStyles,
	drawCard: {
		borderStyle: 'none',
		background: 'white',
		fontSize: '1.5em',
	},
});

export const Index = props => {
	const {drawCard, drawnCards} = useDeck();
	const [mostRecentCard, setMostRecentCard] = useState(Nothing);
	const {page, card, container, drawCard: button} = useStyles();

	const handleCardDraw = _ => {
		setMostRecentCard(drawCard());
	};

	return (
		<div className={page}>
			<div className={container}>
				<MaybeCard className={card} maybeCard={mostRecentCard} size={drawnCards.size}/>
				<button className={button} onClick={handleCardDraw}>draw card</button>
			</div>
		</div>
	);
};
