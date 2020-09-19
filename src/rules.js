import {Nothing, Just} from 'sanctuary';

const common = sexed => n => ({
	"1": {"title":"Waterfall",                 "description":"To perform a waterfall, each player starts drinking their beverage at the same time as the person to their left, starting with the player who drew the card. No player can stop drinking until the player before them stops."},
	"2": {"title":"Two for you / Two is you",  "description":"The player who drew the card gives out two drinks, either both to the same person or one to two different people."},
	"3": {"title":"Three for me / Three is me","description":"The player who drew the card takes a drink.[1]"},
	"4": sexed 
		? {"title":"Four is Whores",            "description":"All women playing take a drink. (In some versions this is under the number 6)"}
		: {"title":"Hit the floor",             "description":"Last person to touch the floor with their hands must take a drink."},
	"5": sexed 
		? {"title":"Five's Guys",               "description":"All men playing take a drink. (In some versions this is under the number 6)"}
		: {"title":"Drive",                     "description":"All players put up their hands as if driving a car. The player who drew the card begins. They say \"vroom\" while tilting their hands to the right or left. The \"driver\" is passed to the player next to them in that direction. Players now have three options as the \"driver\" position is passed to them. They can choose to turn to same direction as the person before them and say \"vroom\", passing it one more person. They can turn their hands in the opposite direction and say \"skert\" (as in the screeching of car wheels) and pass the \"driver\" position back to the person who just sent it to them. Now that is the new direction and all \"drivers\" who turn that way must say \"Vroom\" until a \"driver\" decides to \"skert\" it back again. The last option is to say \"beep\" while mimicking hitting the car horn. This passes the game's position to the player opposite the current driver. The first \"driver\" who speaks or turns the wrong way has to drink."},
	"6": {"title":"Six's chicks (or dicks)",              "description":"All women (or men) playing take a drink. (In some versions this is under the number 4)"},
	"7": {"title":"Heaven / 7th Heaven",       "description":"Last person to raise their hand has to drink."},
	"8": {"title":"Mate",                      "description":"The player who drew the card chooses another player who must drink at the same time as them for the rest of the game."},
	"9": {"title":"Rhyme Time / Nine is Rhyme","description":"The player who drew the card says a word, with players going clockwise saying words that rhyme with the original. The first person to fail to come up with a rhyming word that has not been used must drink."},
	"10":{"title":"Categories",                "description":"The player who drew the card chooses a category, with players going clockwise to name things that fall within the category. The first person to fail to come up with something that has not been said must drink."},
	"11":{"title":"Social",                    "description":"Everyone must take a drink."},
	"12": {"title":"Questions",                "description":"The player who drew the card starts by asking anyone a question. This player then asks anyone else a question. The first player who fails to ask a question must drink. OR The player who drew the card becomes the question master. Whenever they ask a question, other players must also respond with questions or otherwise drink. This continues until another Queen is drawn, at which point that player becomes the question master."},
	"13":{"title":"King's Cup (+ Rules)",      "description":"When each of the first 3 Kings are drawn, the person who drew the card puts some of their drink into the King's Cup at the center of the table. When the 4th King is drawn, the person who drew the 4th King must drink the contents of the King's Cup. In some variations, the first three people to pick a King card can also make a rule that must be followed until the next King is picked. Some common rules include Buffalo, (must always use left hand) Thumbs, (player puts their thumb on the table silently, last person to do so drinks), In bed, (everyone has to say \"in bed\" after every sentence) and Teeth (players can't show their teeth when they laugh)."},
}[n]);

const hardCore = {
	"1": {"title":"Safe",               "description":"Everyone drinks but you."},
	"2": {"title":"Who",                "description":"A round of spin the bottle is played."},
	"3": {"title":"Wanna fight me?",    "description":"A match of arm wrestling is played with the player sitting on the opposite side of the circle, the loser drinks. A slap contest can also be played."},
	"4": {"title":"We're whores",       "description":"Everyone has to take off one piece of clothing as fast as they can, last on to do so has to drink."},
	"5": {"title":"My life",            "description":"You have to take a sip from every player's drink."},
	"6": {"title":"...tynine",          "description":"The player who had sex the most recently drinks, the second time this card is drawn the player who had sex the second most recently drinks and so on..."},
	"7": {"title":"Close to heaven",    "description":"Do a body shot out of the belly button of your left-hand neighbour."},
	"8": {"title":"Mate",               "description":"Choose a person to be your mate and they drink when you drink, and vice versa, for the rest of the game. If one of the mates draws another 8 card they chose another player and now all three have to drink. You can also merge two mated pairs this way. If all players of the game become mated, then all ties are cancelled."},
	"9": {"title":"Time to shine",      "description":"You have to do 20 push ups, if you can't do it you have to drink the amount of sips you were short of 20."},
	"10":{"title":"Witch",              "description":"You have to down the witch's brew. Afterwards the pint is refilled."},
	"11":{"title":"The Jack entertains","description":"You have to do a credible and serious belly dance, for every minute you can pull this off you may choose another player who had to down their drink."},
	"12":{"title":"Mixer",              "description":"Every player has to hand in his drink and you may reassign them to different players."},
	"13":{"title":"Rewind Time",        "description":"You can use your rewind power one time to let someone do their assignment again."},
};

export const ruleSets = {
	common: {
		url: 'https://en.wikipedia.org/wiki/Kings_(game)',
		title: 'Wikipedia\'s Common Set',
	},
	hardCore: {
		url: 'https://en.wikipedia.org/wiki/Kings_(game)',
		title: 'Wikipedia\'s Belgian "Circle of Destruction"',
		setup: 'In the beginning a pint is placed in the middle of the circle and everyone has to pour some of their drink in it, from now on this drink is referred to as "Witch\'s Brew".',
	}
};

const m = x => x ? Just(x) : Nothing;

export const rules = sexed => set => n => 
	set === 'hardCore' ? (n in hardCore ? Just(hardCore[n]) : Nothing)
:	set === 'common'   ? m(common (sexed) (n))
: Nothing;
