require('dotenv').config();

const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
  partials: [Partials.GuildMember],
});

const TOKEN = process.env.DISCORD_TOKEN;

let timerInterval = null;
let timerStep = 0;

const cuteTimerMessages = [
  "5 นาทีแล้วนะ มายัง~ อิอิ 💬",
  "10 นาทีก็ยังไม่มาหรอ~ นีญ่ารอจนจะหลับแย้วว 💤",
  "15 นาทีผ่านไปไวเหมือนโกหก! แต่เธอก็ยังไม่มา~ 😢",
  "นีญ่าเริ่มหิวแล้วนะ~ 20 นาทีแหน่ะ 🍡",
  "25 นาทีแล้ว แอบไปกินไอติมคนเดียวใช่ม้ายย 🍦",
  "ครึ่งชั่วโมงแล้วน้าาา~ นีญ่าจะร้องไห้แล้วว 😭",
  "35 นาทีผ่านไป... ถ้าไม่มา นีญ่าจะเต้นปลุกนะ 💃",
  "นีญ่าเริ่มเช็ค GPS แล้วนะ ว่าอยู่ไหน~ 📍",
  "45 นาทีแล้ววว~ จะให้หนูโทรหามั้ย~ ☎️",
  "เธอจะให้หนูรอถึงพรุ่งนี้เลยเหรอ~ 😫",
  "55 นาทีแว้ว~ นีญ่าเริ่มหงุดหงิดแบบน่ารัก ๆ แล้วนะ 😠✨",
  "ครบ 1 ชั่วโมงพอดี~ เธอชนะใจนีญ่าแล้วล่ะ... (เพราะหนูรอเธอได้ทุกเวลา) 💘",
];

client.once('ready', () => {
  console.log(`บอท ${client.user.tag} ออนไลน์แล้ว!`);

  const sayings = [
    'วันนี้ทุกคนกินข้าวหรือยังคะ 🍚',
    'ใครคิดถึงนีญ่าบ้างงง~ 💖',
    'นีญ่าพร้อมเต้นแล้วนะ 💃',
    'ใครว่างมาเล่นกับนีญ่าหน่อยจิ~',
    'อย่าลืมพักผ่อนด้วยนะคะ 💤',
    'หนูรักทุกคนเลยน้า~ 🤖💗',
    'ไปดู TikTok หนูยังงง~ https://www.tiktok.com/@niya.bnk48.official',
  ];

  const channelName = 'บ่นกับนีย่าา';

  const sendRandomSaying = () => {
    const guilds = client.guilds.cache;
    guilds.forEach(guild => {
      const channel = guild.channels.cache.find(
        ch => ch.name === channelName && ch.isTextBased?.()
      );
      if (channel) {
        const randomMessage = sayings[Math.floor(Math.random() * sayings.length)];
        channel.send(randomMessage).catch(console.error);
      }
    });
  };

  sendRandomSaying();
  setInterval(sendRandomSaying, 60 * 60 * 1000);
});

// ✅ ต้อนรับสมาชิกใหม่พร้อม Embed
client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'ยินดีจ้อนงัด');
  if (!channel) return;

  const welcomeEmbed = new EmbedBuilder()
    .setColor(0xFFC0CB)
    .setTitle(`ยินดีต้อนรับ ${member.user.username} 🎉`)
    .setDescription(`เธอเข้ามาถึงที่นี่แล้ว! 🥳\nหวังว่าจะสนุกกับที่นี่น้าา~\n\n> อย่าลืมแนะนำตัวกันด้วยนะ 💬`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({ text: 'ด้วยรักจากนีญ่าคนดีคนเดิม 💖' });

  channel.send({
    content: `ยินดีต้อนรับ <@${member.id}> สู่เซิร์ฟเวอร์นะจ๊ะ 🎉✨`,
    embeds: [welcomeEmbed]
  });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!hello') {
    return message.reply('สวัสดีจ้า! นีญ่ามาแย้ววววน๊าาาา ✨');
  }

  if (/^niyo\s*แนะนำตัวหน่อย$/i.test(message.content.trim())) {
    return message.channel.send(
      `หนูชื่อนีญ่า ไม่ใช่ นีโย่ นะ\nhttps://www.instagram.com/niya.bnk48official/\nอันนี้หนูเองนะ`
    );
  }

  if (/^niyo\s*เต้นหน่อย$/i.test(message.content.trim())) {
    return message.channel.send(
      `ได้เลยยยยยย\nhttps://www.tiktok.com/@niya.bnk48.official/video/7361800451056078097\nหนูน่ารักไหม?`
    );
  }

  if (/^อยากรู้จัก\s*niyo\s*มากกว่านี้$/i.test(message.content.trim())) {
    return message.channel.send(
      `Niya\nสุวิภาส์ ลายถมยา\nSuvibha Laithomya\nBNK48 Trainee\n` +
      `Date of birth : 14 February 2009\nHeight : 154 cm\nProvince : กรุงเทพมหานคร\n` +
      `Like : ไดฟุกุ แซลมอนซาชิมิ ข้าวหน้าหมู\nBlood Group : B\nHobby : ฟังเพลง ฟังเรื่องผี`
    );
  }

  // ✅ เริ่มจับเวลา
  if (/^niyo\s*จับเวลา$/i.test(message.content.trim())) {
    if (timerInterval) {
      return message.reply("นีญ่ากำลังจับเวลาอยู่แล้วน้าา~ ⏳");
    }

    timerStep = 0;
    message.channel.send("เริ่มจับเวลาแล้วนะ~ เดี๋ยวมาทวงทุกๆ 5 นาที อิอิ ⏱️");

    timerInterval = setInterval(() => {
      if (timerStep >= cuteTimerMessages.length) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerStep = 0;
        return;
      }

      message.channel.send(cuteTimerMessages[timerStep]);
      timerStep++;
    }, 5 * 60 * 1000);
  }

  // ✅ หยุดจับเวลา
  if (/^niyo\s*หยุดจับเวลา$/i.test(message.content.trim())) {
    if (!timerInterval) {
      return message.reply("ตอนนี้ไม่ได้จับเวลาอยู่น้า~ 🛑");
    }

    clearInterval(timerInterval);
    timerInterval = null;
    timerStep = 0;
    message.channel.send("หยุดจับเวลาแล้วน้าา~ ไว้รอบหน้ามาใหม่นะ! 😴");
  }

  if (message.content.startsWith('!welcome')) {
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('กรุณา @mention สมาชิกที่ต้องการให้บอทต้อนรับ');
    }

    const channel = message.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return message.reply('ไม่เจอช่องชื่อ "welcome" ในเซิร์ฟเวอร์นี้');

    channel.send(`ยินดีต้อนรับ ${member.user.tag} สู่เซิร์ฟเวอร์นะจ๊ะ 🎉✨`);
    message.reply(`ส่งข้อความต้อนรับสำหรับ ${member.user.tag} เรียบร้อยแล้ว`);
  }

  if (message.content === '!online') {
    try {
      await message.guild.members.fetch();

      const onlineMembers = message.guild.members.cache.filter(
        (member) => !member.user.bot && member.presence?.status === 'online'
      );

      if (onlineMembers.size === 0) {
        return message.channel.send('😴 ไม่มีใครออนไลน์อยู่ตอนนี้เลย~');
      }

      const names = onlineMembers.map((member) => member.displayName).join(', ');
      message.channel.send(`🟢 สมาชิกที่ออนไลน์ตอนนี้: ${names}`);
    } catch (error) {
      console.error('❌ Error fetching members:', error);
      message.channel.send('⚠️ เกิดข้อผิดพลาดขณะเช็คสถานะออนไลน์');
    }
  }
});

client.login(TOKEN);
