import { openDatabaseAsync } from 'expo-sqlite';

const db = openDatabaseAsync('rrmforllm-todos-app.db');

export default db;
