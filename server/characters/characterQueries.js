export default {
	getCharactersByUserId: `SELECT c.uuid as id, c.name, c.class, c.level, c.experience, c.strength, c.defense, c.magic, c.max_health, u.uuid as user_id
		FROM characters as c
		LEFT JOIN users as u
		ON c.user_id=u.id
		WHERE c.user_id=$1;`,
	updateCharacterByUuid: `UPDATE characters SET () WHERE uuid=$1;`,
	createCharacter: `INSERT INTO characters(uuid, name, class, level, experience, strength, defense, magic, max_health, user_id) 
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`
}