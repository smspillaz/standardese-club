/*!
 * Tumblr grammars for Baba
 *
 * Author: Kim Silkebækken
 *
 * https://github.com/Lokaltog/baba
 */

(function (global, module, define) {
	function split(str, delimiter) {
		// Pre-split strings to improve performance
		return str.split(delimiter || '|')
	}

	function init(Baba) {
		var common = new Baba.Grammar('tumblr-common', ['{', '}'], ['[', ']'])
		common.require('common')
		common.addGrammar({
			'emoji': ['(◕﹏◕✿)', '（　｀ー´）', '(•﹏•)', '└(｀0´)┘', 'ᕙ(⇀‸↼‶)ᕗ', 'ᕦ(ò_óˇ)ᕤ', '(⋋▂⋌)', '(¬_¬)', '٩(×̯×)۶', '(╯°□°)╯︵ ┻━┻', '(⊙﹏⊙✿)', '(ﾉ◕ヮ◕)ﾉ*: ･ﾟ✧', '(⊙_◎)'],
			'alignment': {
				'pre': {
					'sexual': split('andro|anthro|demi|gender|gray|gyne|pomo|skolio|tulpa'),
					'personal': split('a|bi|demi|inter|multi|non|omni|pan|para|poly|trans'),
				},
				'post': {
					'sexual': split('amorous|romantic|platonic|sensual|sexual'),
					'personal': split('ethnic|gender|queer|racial|romantic|sensual|sexual'),
				},
				'sexual': '{alignment.pre.sexual}{alignment.post.sexual}',
				'personal': '{alignment.pre.personal}{alignment.post.personal}',
			},
			'adjective': {
				'good': split('attractive|neutral|natural|integral|intersectional|equal|feminine|invisible|fat|deathfat|confident|proud|differently abled'),
				'bad': split('masculine|white|able-bodied|binary|smallfat|thin|antediluvian|awful|body-shaming|chauvinistic|ciscentric|close-minded|deluded|entitled|heteropatriarchal|patriarchal|ignorant|inconsiderate|insensitive|intolerant|judgmental|misogynistic|nphopic|oppressive|pathetic|racist|rape culture-supporting|worthless|butthurt'),
				'ist': split('cyber|gay|lesbian|liberal|radical|sex-positive|male|intersectional'),
				'sn': {
					'bad': split('bad|terrible|awful|problematic'),
					'good': split('good|great|awesome'),
					'important': split('important|crucial'),
				},
				'phobic': function (variables, grammar) {
					return grammar['phobia-pre'].map(function (el) {
						return el + 'phobic'
					})
				},
				'politics': split('anti-SJW|conservative|democrat|dyke|freedom fighter|freegan|liberal|libertarian|misanthrope|pro-choice|pro-life|republican|zapatista'),
			},
			'adverb': {
				'sexual': '{pre.sexual}{post.sexual}',
				'personal': '{pre.personal}{post.personal}',
				'sn': {
					'now': split('now|right {fucking} now|right away'),
					'really': split('really|seriously'),
					'fucking': split('fucking|damn|goddamn'),
				},
			},
			'verb': {
				// Must work in any verb.tense: "you {stare-raped} that CAFAB", "{dehumanizing} species is bad"
				'good': split('abolish|self-diagnose|love'),
				'bad': split('abuse|attack|criticize|dehumanize|deny|desexualize|discriminate|erase|exotify|exploit|fetishize|harass|hypersexualize|ignore|kinkshame|label|marginalize|misgender|objectify|oppress|reject|sexualize|shame|stare-rape|stigmatize|internalize|institutionalize|colonize|appropriate|erode|censor|blame|condemn|denounce|hate|dominate|glorify|rape'),
				'auxiliary': {
					'should': split('should|must|need to|can'),
				},

				'explain': '[thins|reddits|whites|ex]plain',
				'check': split('check|acknowledge'),
				'swear': split('screw|fuck|damn'),
				'stop': split('stop|quit'),
			},
			'noun': {
				'subject': {
					// Example: "you fucking {basement dweller}", "all {male}s must die"
					// Must be pluralizable
					'good': split('CAFAB|CAMAB|PoC|QTPOC|WoC|ace|agnostic|ally|amputee|cross-dresser|fatty|female|furry|headmate|ladytype|little person|minority|native american|princex|radfem|survivor|transman|transnormative|transwoman|vegan|vegetarian|victim|womyn|food addict|girl'),
					'bad': split('male|cishet|cisgender|hetero|smallfat|uterus-bearer|white womyn|MRA|TERF|asshole|basement dweller|bigot|brogrammer|cracker|creep|dudebro|feminazi|femscum|hitler|twat|loser|lowlife|mouthbreather|nazi|neckbeard|oppressor|pedophile|piece of shit|radscum|rapist|redditor|scum|shit stain|subhuman|troll|truscum|virgin|dick|dickwad|guy|boy|man'),
					'aligned': [
						'{noun.kin}',
						'{noun.subject.good}',
						'{noun.subject.good}-{alignment-verb} {noun.personality}',
						'{alignment.sexual}-{alignment-verb} {noun.personality}',
						'{alignment.personal}-{alignment-verb} {noun.personality}',
					],
				},
				'concept': {
					// Example: "fuck [white womyn] {standards}"
					'good': split('rights|opinions|supremacy'),
					'bad': split('body images|gender roles|standards'),
				},
				'action': {
					// Example: "species {entitlement} is bad"
					// Basically converted verbs from verb.bad, i.e. dehumanize -> dehumanization
					// There are no consistent rules for converting a verb to a noun with a suffix like -ion
					'good': split('abolishing|self-diagnosing|love'),
					'bad': split('abuse|attacking|criticism|dehumanization|denial|desexualizing|discrimination|erasure|exotification|exploitation|fetishization|harassment|hypersexualization|ignoring|kinkshaming|labeling|marginalization|misgendering|objectification|oppression|rejection|sexualization|shaming|stare-raping|stigmatization|internalization|institutionalization|colonization|appropriation|erosion|censoring|blaming|condemnation|denouncement|hate|domination|glorification' +
					             // extras not in verb.bad
					             '|entitlement|privilege|culture|domination'),
				},
				'abstract': {
					// Example: "{misandry} is good", "{weight} is good", "{misogyny} is bad"
					// Will not be pluralized
					'good': split('misandry|femininity|integrity|equality|intersectionality|multiplicity|ethnicity' +
					              '|appearance|height|weight|race|womyn|hair|body hair|body|fandom|species|fat|fatty|female|food|stretchmark|color|kinship'),
					'bad': split('masculinity|kyriarchy|patriarcy|superiority|misogyny' +
					             '|ideals'),
				},
				'ism-pre': {
					// Must be able to be suffixed with -ism and -ist
					'good-base': split('misandr|femin|equal|intersectional|activ|separat|commun|egalitarian|fandom|fat|lesbian|freegan|social|vegan|vegetarian|athe|food|liberation|ideal'),
					'bad-base': split('TERF|patriarch|kyriarch|masculin|misogyn|rac|fasc|able|age|binar|assimilation|chauvin|carn|cissex|class|essential|rape-apolog|singlet|traditional|transmisogyn'),
					'good': ['{noun.ism-pre.good-base}', 'anti-{noun.ism-pre.bad-base}'],
					'bad': ['{noun.ism-pre.bad-base}', 'anti-{noun.ism-pre.good-base}'],
				},
				'ism': {
					'good': '{noun.ism-pre.good}ism',
					'bad': '{noun.ism-pre.bad}ism',
				},
				'ist': {
					'good': '{noun.ism-pre.good}ist',
					'bad': '{noun.ism-pre.bad}ist',
				},
				'kin-type': split('cat|demon|dog|dolphin|dragon|fox|goat|other|poly|bunny|wolf|vampire'),
				'kin': '{noun.kin-type}kin',
				'personality': split('individual|personality|person|spirit|entity|identity'),
				'trigger': '{noun.good} {noun.concept.bad}',
				'explain': '[thins|reddits|whites|ex]planation',
			},
			'pronoun': {
				// Actually map kins to proper pronouns
				'random': function (parser, $subject) {
					// Thanks for the help, askanonbinary
					// http://askanonbinary.tumblr.com/creature
					var kinPronounMap = {
						cat: 'purr/purrs/purrself',
						demon: 'mon/mons/monself',
						dog: 'pup/pups/pupself',
						dolphin: 'squeak/squeaks/squeakself',
						dragon: 'drago/dragons/dragonself',
						fox: 'fluff/fluffs/fluffself',
						goat: 'hoof/hooves/hooveself',
						bunny: 'bun/buns/bunself',
						wolf: 'wer/weres/wereself',
						vampire: 'vam/vamps/vampself',
					}
					var realPronouns = [
						'*e/h*s/h*self',
						'ae/aers/aerself',
						'ce/cirs/cirself',
						'e/eir/emself',
						'fey/fers/ferself',
						'fir/firs/firself',
						'he/his/himself',
						'hir/hirs/hirself',
						'hen/henom/hens',
						'jhey/jheir/jheirself',
						'per/pers/perself',
						'lee/lis/limself',
						'she/hers/herself',
						'thon/thons/thonself',
						've/virs/virself',
						'xe/xer/xerself',
						'zhe/zhim/zherself',
					]
					$subject = (parser.getVariable($subject) || '').replace(/kin$/, '')
					if (kinPronounMap.hasOwnProperty($subject)) {
						return kinPronounMap[$subject]
					}
					return realPronouns[Math.floor(Math.random() * realPronouns.length)]
				},
				'second-person': ['all', 'you', '[y\'|you ]all'],
			},
			'concept': {
				'good': [
					// e.g. ladytype standards, basement dweller rights
					'{noun.subject.good} {noun.concept.good}',
					'{noun.subject.bad} {noun.concept.bad}',
					'{noun.abstract.bad} {noun.action.bad}',
				].concat(
					split('bodily integrity|diversity|food addiction|multiple systems|social justice|female self esteem')
				).concat([
					'[self-diagnosed] [racial|gender|species] dysphoria',
					'fat[ty] love',
					'[gender|species|race][ abolition| neutrality|-neutral pronouns]',
					'[colored|non-white|non-western] culture',
				]).concat(
					split('anti-porn|body positivity|environmental|fat rights|gay rights|gay|lesbian|social justice|trans*|animal rights|non-white rights').map(function (el) { return el + ' {noun.ism.good}' })
				),
				'bad': [
					// e.g. ladytype standards, basement dweller rights
					'{noun.subject.good} {noun.concept.bad}',
					'{noun.subject.bad} {noun.concept.good}',
					'{noun.abstract.good} {noun.action.bad}',
					// institutions, e.g. "institutionalized racism"
					'[institutionalized|internalized] [gender roles|masculinity|misogyny|patriarchy|racism]',
					// supremacies/cultures, e.g. "cishet domination"
					'{noun.subject.bad} [culture|domination|entitlement|feminism|kyriarchy|opinions|privilege|rights|superiority|supremacy]',
				].concat(
					split('bindi wearing|hypermasculinity|men\'s rights|patriarchal beauty standards|thin privilege|thin culture')
				),
				'phobia': function (variables, grammar) {
					return grammar['phobia-pre'].map(function (el) {
						return el + 'phobia'
					})
				},
			},
			'alignment-verb': split('aligned|associating|identifying|type|supporting'),
			'fuck': '{verb.swear}',
			'fuck-off': {
				'universal': [
					// Must work in sentences like "you can {fuck off}", "seriously, {screw you}"
					'[burn in|go to|rot in] hell',
					'go die in a [ditch|fire]',
					'drink [bleach|piss]',
					'fuck off',
					'shut [the fuck ]up',
					'{verb.check} your [fucking ]{noun.subject.bad} privilege',
				],
				'standalone': [
					// Must be full sentence statements
					'drop dead',
					'[fuck|screw] you',
					'get [bent|fucked with a cactus]',
					'go [kill yourself|fuck yourself|play in traffic|to hell|light yourself on fire]',
					'go drown in [bleach|your own piss]',
					'make love to yourself in a furnace',
				],
			},
			'phobia-pre': split('bi|curvy|deathfat|ethno|fat|femme|furry|hetero|homo|lesbo|male|kin|phallo|poly|queer|trans*|womyn'),
			'tw-concept': '{noun.oppressed} {noun.concept.bad}',
			'tw': [
				'trigger warning: {tw-concept}, {tw-concept}, {tw-concept}',
				'trigger warning: {tw-concept} and {tw-concept}',
			],
			'interjection': split('goddamn it|ffs|for fucks sake'),
			'conjunction': {
				'and-or': split('and|or|and/or'),
				'conditional': split('if|when|whenever'),
				'conclusion': split('as|because|and|but|so'),
			},
			'statement': {
				'toucan': [
					'[do not|never] reblog my posts [ever ]again',
					'[like ][fucking ]seriously, [just ]{fuck-off.universal}',
					'[now ]go [the fuck ]away',
					'[oh my god|omg]',
					'[please ]leave me [the fuck ]alone',
					'feel free to unfollow {conjunction.and-or} block/ignore me',
					'for the love of god',
					'fucking {adjective.bad} [people|folk]',
					'fucking {noun.subject.good}-{verb.bad|tense.present-participle} {noun.subject.bad|plural}',
					'i [don|can]\'t even',
					'i am [literally ]100% done',
					'i am [literally ]not [fucking ]speaking to you anymore',
					'i do not [fucking ]care anymore',
					'i do not give a [shit|fuck]',
					'just[...] stop',
					'no. just no',
					'seriously',
					'this. is. not. okay',
					'try again, [fucking ][{adjective.bad} ]{noun.subject.bad}',
					'unfollow me right [fucking ]now',
					'wow. just. wow',
					'you did not just [fucking ]say that',
					'you guys are [fucking ]impossible',
					'you know what? [fuck|screw] it',
				],
				'condescending': [
					'[girl|sweetie], please',
					'oh, [honey|sweetie]',
					'yeah, no',
					'you [look|are] [cute|adorable|hot|sexy] when you are [angry|pissed off]',
					'i [literally ]could not care less[ about you| what you think|]',
				],
				'conditional': [
					'if you {verb.bad} {noun.subject.good|plural}',
				],
			},
			'introduction': {
				'unbelievable': [
					'how [can it be|is it] so [fucking ]difficult to[ just]',
					'how [fucking ]difficult is it to[ just]',
					'how [fucking ]often do I have to tell you to[ just]',
					'i have [already ][repeatedly ]told you to[ just]',
					'[how ]is it so [fucking ]difficult to[ just]',
					'why can\'t you[ just]',
					'why is it so [fucking ]hard for you to[ just]',
					'you should[ really][ just]',
				],
				'conditional': [
				],
			},
		})

		var angry = new Baba.Grammar('tumblr-angry', ['{', '}'], ['[', ']'])
		angry.require('tumblr-common')
		angry.addGrammar({
			'alignment': {
				'angry': '[{alignment.pre.sexual}|{alignment.pre.personal}] fucking [{alignment.post.sexual}|{alignment.post.personal}]',
			},
			'statement': {
				'universal': [
					'{pronoun.second-person} [fucking ]{noun.subject.good}-{verb.bad|tense.present-participle} {noun.ist.bad|plural} [can|should] {fuck-off.universal}',
					'{introduction.unbelievable} [learn|use] [my|the correct] [fucking ]pronouns you [fucking ]{adjective.bad} {noun.subject.bad}, I am {adjective.good|prepend-an}[, {adjective.good}] {noun.subject.aligned->subject} and my pronouns are {pronoun.random("$subject")}',
					'{statement.conditional|uppercase-first} you [fucking ]{adjective.bad} {noun.subject.bad|plural} [can|should] {fuck-off.universal}',
				],
			},
			'conclusion': [
				'i hope you {fuck-off.universal}',
				'never [fucking ][reblog|mention] [any of ]my posts [ever ]again',
			],
			'sentence': [
				'[{statement.toucan|uppercase-first}. |{statement.condescending|uppercase-first}. ]{statement.universal|uppercase-first}! [{emoji}]',
			],
		})

		var calm = new Baba.Grammar('tumblr-calm', ['{', '}'], ['[', ']'])
		calm.require('tumblr-common')
		calm.addGrammar({
			'statement': [
				'it is {adjective.sn.important} that you[ all] [are aware|realize] that {noun.ist.good} {noun.action.bad} [and {noun.action.bad} of {noun.subject.aligned|plural} ]is {adverb.sn.really} {adjective.sn.bad}',
			],
			'sentence': [
				'{statement|uppercase-first}.',
			],
		})

		// TODO add tumblrized grammar transforms
	}

	// Export as either CommonJS or AMD module
	if (typeof module === 'object' && module.exports) {
		module.exports = init
	}
	else if (typeof define === 'function' && define.amd) {
		define(function () {
			return init
		})
	}
	else {
		// Initialize from global object, e.g. if running in browser
		init(global.Baba)
	}
})(this,
   (typeof module !== 'undefined' ? module : false),
   (typeof define !== 'undefined' ? define : false))
