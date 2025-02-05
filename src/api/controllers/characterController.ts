import { Request, Response } from 'express';
import * as characterService from '../services/characterService';

export const dealDamage = (req: Request, res: Response) => {
	const { damage, type } = req.body;
	const character = characterService.getCharacter();

	const defense = character.defenses.find(d => d.type === type);
	let finalDamage = damage;

	if (defense) {
		if (defense.defense === 'immunity') {
			finalDamage = 0;
		} else if (defense.defense === 'resistance') {
			finalDamage = Math.floor(damage / 2);
		}
	}

	character.hitPoints -= finalDamage;
	characterService.updateCharacter(character);

	res.json({ message: `Dealt ${finalDamage} damage`, character });
};

export const heal = (req: Request, res: Response) => {
	const { amount } = req.body;
	const character = characterService.getCharacter();

	// Not sure if we need to check if Character is dead ? hp<=0 ?
	character.hitPoints += amount;
	characterService.updateCharacter(character);

	res.json({ message: `Healed ${amount} HP`, character });
};

export const addTemporaryHitPoints = (req: Request, res: Response) => {
	const { amount } = req.body;
	const character = characterService.getCharacter();

	if (!character.temporaryHitPoints || amount > character.temporaryHitPoints) {
		character.temporaryHitPoints = amount;
		characterService.updateCharacter(character);
	}

	res.json({ message: `Added ${amount} temporary HP`, character });
};
