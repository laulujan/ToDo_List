const generateUniqueId = require('generate-unique-id');

const Todo = (title, description, due, priority) => {
    const id = generateUniqueId();
  
    return {
      title,
      id,
      description,
      due,
      priority,
    };
  };
  
export default Todo;