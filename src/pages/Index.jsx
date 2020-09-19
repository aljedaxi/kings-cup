import React , {useState} from 'react';
import { Set, Map } from 'immutable';
import { 
	prop,
	chain,
	Just,
	Nothing,
	maybe,
} from 'sanctuary';
import {createUseStyles} from 'react-jss';
import {ruleSets, rules} from '../rules';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

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

const s = i => ({ 1: 'Spades', 2: 'Clubs', 3: 'Hearts', 4: 'Diamonds' }[i]);
const n = i =>
	i === 1  ? 'Ace'
: i === 11 ? 'Jack'
: i === 12 ? 'Queen'
: i === 13 ? 'King'
: i;

const Card = ({card, ...props}) => 
	<div {...props}>
		{n(card.get('number'))} of {s(card.get('suit'))}
	</div>

const bigText = { fontSize: '1.5em', };
const topTextStyles = { color: 'white', ...bigText };

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
	bigText,
	unStyledButton: {
		borderStyle: 'none',
		background: 'white',
	},
	borgar: {
		borderStyle: 'none',
		cursor: 'help',
		background: 'black'
	},
	ruleText: {...bigText, cursor: 'help', color: '#bbb', background: 'black', border: 'none'
	},
});

export const Borgar = props =>
	<button {...props}>
		<svg height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px"><path style={{fill: 'white'}} d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
	</button>

export const RuleSelector = ({setRuleSet, name, url, title, setup, unStyledButton}) => {
	//TODO clicky
	const handleClick = _ => setRuleSet(name);
	return (
		<div> 
			<button onClick={handleClick} className={unStyledButton}>
				<h4>
					{title}
				</h4>
			</button>
			<div>click <a href={url}>here</a> for more info</div>
			{setup && <div>{setup}</div>}
		</div>
	);
};

export const Rule = ({rule, ...props}) => <button {...props}>{rule.title}</button>;

export const Index = props => {
	const {drawCard, drawnCards} = useDeck();
	const [mostRecentCard, setMostRecentCard] = useState(Nothing);
	const [showDialog, setShowDialog] = useState(false);
	const [showDescription, setShowDescription] = useState(false);
	const [ruleSet, setRuleSet] = useState();
	const [sexed, setSexed] = useState(false);
	const {page, card, container, unStyledButton, ruleText, bigText, borgar} = useStyles();

	const first = drawnCards.size === 0;
	const toggleSexed = _ => setSexed(!sexed);
	const getRule = rules(sexed)(ruleSet);
	const button = [unStyledButton, bigText].join(' ');

	const rule = chain (c => getRule(c.get('number'))) (mostRecentCard);

	const handleCardDraw = _ => setMostRecentCard(drawCard());
	const openDialog = _ => setShowDialog(true);
	const closeDialog = _ => setShowDialog(false);
	const openDescription = _ => setShowDescription(true);
	const closeDescription = _ => setShowDescription(false);
	const ruleStuff = Object.entries(ruleSets).map(([name, otherStuff]) => ({name, ...otherStuff}));
	const rulyrulyruly = r => <Rule className={ruleText} onClick={openDescription} rule={r}/>;

	return (
		<div className={page}>
			<div className={container}>
				<MaybeCard className={card} maybeCard={mostRecentCard} size={drawnCards.size}/>
				{
					first 
						? <Borgar className={borgar} onClick={openDialog}/>
						: maybe (<></>) (rulyrulyruly) (rule)
				}
				<Dialog isOpen={showDialog} onDismiss={closeDialog} aria-label='Settings'> 
					<h3>RuleSet</h3>
					<div>selected = {ruleSet ?? 'none'}</div>
					{ruleStuff.map(props => <RuleSelector {...{...props, setRuleSet, key: props.name, unStyledButton}}/>)}
					<h3>Are you cool with calling women whores?</h3>
					<button className={unStyledButton} onClick={toggleSexed}>{sexed ? 'yes' : 'no'}</button>
				</Dialog>
				<Dialog isOpen={showDescription} onDismiss={closeDescription} aria-label={maybe ('') (({title}) => `description for ${title}`) (rule)}>
					<h3> {maybe ('') (prop('title')) (rule)} </h3>
					<h4> {maybe ('') (prop('description')) (rule)} </h4>
				</Dialog>
				<button className={button} onClick={handleCardDraw}>draw card</button>
			</div>
		</div>
	);
};
