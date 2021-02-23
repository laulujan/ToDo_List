const generateUniqueId = require('generate-unique-id');

const Project = (title) => {
    const id = generateUniqueId();
    return {
      title,
      id,
      todos: [],
    };
  };
  
export default Project;