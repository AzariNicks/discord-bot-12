import 'dotenv/config';
import express from 'express';
function  cl  (thingYouWantToLog)  {console.log(thingYouWantToLog)}
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, DiscordRequest, getRandomComplimentLovely } from './utils.js';
const DISCORD_API_BASE_URL = 'https://discord.com/api/v9';
// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));
/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;


  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    const { options } = data
  
   console.log(`Bot Used`)
    let ToUserId = options[0].value
    let fromUser =  req.body.member.user.username
    let toUser = 'Kathleen'
    const response = await fetch(`https://discord.com/api/v9/users/${ToUserId}`, {
      headers: {
        'Authorization': `Bot ${process.env.BOT_TOKEN}`,
      },
    });
    let toUserValid = await response.json();
    if(toUserValid.username != undefined){
      toUser = toUserValid.username
    }
     if (name === 'compliment') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // The data is the thing it sends and i made it to where it sends a random complement
          content: getRandomComplimentLovely(fromUser,toUser),
        },
      });
    }

  }
});



app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

