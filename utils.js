import 'dotenv/config';
import fetch from 'node-fetch';
import { verifyKey } from 'discord-interactions';

export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf, encoding) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
}

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}


export function getRandomComplimentLovely (fromUser = 'Bot ', toUser="Kathleen") {
  let complents = [
    `Your so fucking pretty today ${toUser}`
   ,`Your So smart ${toUser}`,`You look lovely ${toUser}`
   ,`I love you more than anything in the world ${toUser}`
   ,`When i look at you all my problems go away ${toUser}`
   ,`The stars have nothing on the light in ${toUser}'s eyes`
   ,`Heaven doesnt exist if ${toUser} is not in it` 
   ,`I would die for ${toUser}, live for ${toUser}, I would do anything for ${toUser}`
   ,`This one is a secret but i wanna love you kathleen your my everything and you mean so fucking much to me baby like you would never understand how you make me feel when im around you i feel so loved and supported i feel like a king i feel so special around you kathleen, truley all my worrys go away i think the world of you FUCK i feel like my words can never fucking compare to how you make me feel becuz you are amazing you are the best thing thats ever happen to me. the chances of you getting this message is 2% but if you keep typing itll go up i really hope you see this becuz i cant get you outta my mind and i wanna express that to you whenever you want`
   ,`I wanna sex ${toUser}`
   ,`ERROR ERROR thinking about ${toUser} has seemed to make mind go blank`
   ,`I wish I was ${toUser}`
   ,`God wishes they were ${toUser}`
   ,`${toUser}, You make life worth living ` 
   ,`Gonna give you head in the Chat Right now ${toUser}` 
   ,`${toUser} has not recieved as much love as they should` 
   ,`The only future I see is one with ${toUser}` 
   ,`No one could compare to how ${toUser} make me feel`
   ,`Life sucks but im glad I could be with ${toUser}` 
   ,`ALL future past and present pain is worth it if I can spend one second with ${toUser}`
   ,`I have a crush on ${toUser}` 
   ,`You make my day brighter ${toUser}`
   ,`The Sun is not as bright or nearly as hot as ${toUser}`
   ,`I would give anything to be with ${toUser}`
   ,`${toUser} is my life`
   ,`I hear songs about love and think of ${toUser}`
   ,`I understand the expression The things you do for love cuz of you ${toUser}`
   ,`When I wake up to a message from ${toUser} the world feels right`
   ,`I feel like im walking on water when i touch you ${toUser}`
   ,`If you saw you how i saw you, youd be a narcissist and I'd still love you`
   ,`They say your body is a temple but you ${toUser}, yours is like a kingdom of happineess`
   ,`Your so smart and funny ${toUser}`
   ,`Your ass is fat ${toUser}`
   ,`Your face is beatifull ${toUser}`
   ,`The light of 1000 angels and moons can shine on me and I would stare at you ${toUser}`
   ,`If the world ended today, I would wanna spend my last moments with you ${toUser}`
   ,`If i could put time in a bottle i would spend all that time with you ${toUser}`
    , `I wish nothing wrong ever  happen to you ${toUser}`
   ,`You deserve the world , No The GALAXY NO YOUR DESERVE EVERYTHING ${toUser}`
   ,`Your are the light of my life ${toUser} `
   ,`Your Too Sexy for this world ${toUser}`
   ,`I used to think perfection was impoossible but ${toUser} taught me that nothing is impossible`
   ,`I wanna  marry ${toUser}`
   ,`Im gonna marry ${toUser}`
   ,`${toUser} is so hot you can melt the fucking supernova`
   ,`${toUser} taught me what love is, I hope i've done the same for ${toUser}`
   ,`You make think about life diferently you've given me a goal you are the the thing i look foward to when i sleep when i wake when i go to work. ${toUser} you are my motviation`
   ,`I would do anything for your happiness baby even make a silly app on discord ${toUser}`
]
  return   `${fromUser} Says:` + complents[Math.floor(Math.random() * complents.length )];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
