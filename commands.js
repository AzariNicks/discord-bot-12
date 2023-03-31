import 'dotenv/config';

import { InstallGlobalCommands } from './utils.js';

// COMPLIMENT commad
const COMPLIMENT = {
  name :'compliment',
  description: 'compliments a user',
  type:1,
  options :[{
    name :'users',
    description:'person you want to compliment',
    type:6,
    required: true,
    }]

};
const ALL_COMMANDS = [COMPLIMENT];
console.log(`Commands Succsefully installed,refresh the server by clicking off it and click back on it after wards `)

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);