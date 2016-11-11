export default {
	getUserByUsername: `SELECT * FROM users WHERE username=$1;`,
	getUserBySteamId: `SELECT * FROM users WHERE steam_id=$1;`,
	createUser: `INSERT INTO users(username, salt, hashed_password, steam_id, uuid) VALUES($1, $2, $3, $4, $5);`
}