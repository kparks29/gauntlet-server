export default {
	getCharactersByUserId: `SELECT c.uuid AS id, c.character_name, c.character_class, c.level, c.experience, c.strength, c.defense, c.magic, c.max_health, u.uuid AS user_id
		FROM characters AS c
		LEFT JOIN users AS u
		ON c.user_id=u.id
		WHERE c.user_id=$1;`,
	updateCharacterByUuid: `UPDATE characters SET () WHERE uuid=$1;`,
	createCharacter: `WITH created AS (
			INSERT INTO characters(uuid, character_name, character_class, level, experience, strength, defense, magic, max_health, user_id)
			VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
		)
		SELECT c.uuid, c.character_name, c.character_class, c.level, c.experience, c.strength, c.defense, c.magic, c.max_health, u.uuid AS user_id 
		FROM created AS c
		LEFT JOIN users AS u
		ON c.user_id=u.id;`
}