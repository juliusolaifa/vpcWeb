// utils/commandHandler.js
import commandRegistry from '../commands/commandRegistry';

export const handleCommandSubmit = async (input) => {
  const match = input.match(/(\w+)\((.*)\)/);  // Match commands like generateRandomDesignMatrices(c(5,3,2), c(1,2,3,4,5))
  
  if (match) {
    const command = match[1];
    const paramsString = match[2];
    const paramGroups = paramsString.split('),').map(group => group.replace(/c\(|\)/g, '').trim());  // Split ns and X

    const ns = paramGroups[0] ? paramGroups[0].split(',').map(param => param.trim()) : [];
    const X = paramGroups[1] ? paramGroups[1].split(',').map(param => param.trim()) : [];

    if (commandRegistry[command]) {
      try {
        const result = await commandRegistry[command](ns, X);  // Pass ns and X to the command
        return result;
      } catch (error) {
        return `Error executing command "${command}": ${error.message}`;
      }
    } else {
      return `Command "${command}" not found.`;
    }
  } else {
    return 'Invalid command format.';
  }
};
