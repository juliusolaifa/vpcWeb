// commands/commandRegistry.js
import generateRandomDesignMatrices from '../utils/generateRandomDesignMatrices';
import generateRandomInterceptMatrix from '../utils/generateRandomInterceptMatrix';

const commandRegistry = {
  generateRandomInterceptMatrix: async (params) => {
    const ns = params.map(Number);  // Convert string params to numbers
    const result = await generateRandomInterceptMatrix(ns);
    return result;
  },
  
  generateRandomDesignMatrices: async (ns, X) => {
    const nsArray = ns.map(Number);  // Convert ns to numbers
    const XArray = X.map(Number);    // Convert X to numbers (optional)

    const result = await generateRandomDesignMatrices(nsArray, XArray);
    return result;
  },
  // Add more commands as needed
  // customCommand: async (params) => { ... }
};

export default commandRegistry;
