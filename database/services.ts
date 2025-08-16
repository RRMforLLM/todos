import db from '@/database/db';

// FETCHING DATA
export const getTodos = async () => {
  const database = await db;
  const query = 'SELECT * FROM TODOS';
  try {
    const result = await database.getAllAsync(query);
    return result;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const getDones = async () => {
  const database = await db;
  const query = `
    SELECT 
      DONES.id as doneId,
      TODOS.id as todoId,
      TODOS.subject,
      TODOS.details,
      TODOS.deadline
    FROM DONES
    JOIN TODOS ON DONES.todo = TODOS.id
  `;
  try {
    const result = await database.getAllAsync(query);
    return result.map((row: any) => ({
      id: row.doneId,
      todo: {
        id: row.todoId,
        subject: row.subject,
        details: row.details,
        deadline: row.deadline,
      }
    }));
  } catch (error) {
    console.error('Error fetching dones:', error);
    throw error;
  }
};

// INSERTING DATA
export const insertTodo = async ({
  subject,
  details,
  deadline,
}: {
  subject: string;
  details: string | null;
  deadline: string;
}): Promise<number> => {
  const database = await db;
  const query = 'INSERT INTO TODOS (subject, details, deadline) VALUES (?, ?, ?)';
  try {
    const result = await database.runAsync(query, [subject, details, deadline]);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting todo:', error);
    throw error;
  }
};

export const insertDone = async ({
  todo,
}: {
  todo: number;
}): Promise<number> => {
  const database = await db;
  const query = 'INSERT INTO DONES (todo) VALUES (?)';
  try {
    const result = await database.runAsync(query, [todo]);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting done:', error);
    throw error;
    }
};

// DELETING DATA
export const deleteTodo = async ({
  id,
}: {
  id: number;
}): Promise<void> => {
  const database = await db;
  const query = 'DELETE FROM TODOS WHERE id = ?';
  try {
    await database.runAsync(query, [id]);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const deleteDone = async ({
  id,
}: {
  id: number;
}): Promise<void> => {
  const database = await db;
  const query = 'DELETE FROM DONES WHERE id = ?';
  try {
    await database.runAsync(query, [id]);
  } catch (error) {
    console.error('Error deleting done:', error);
    throw error;
  }
};
