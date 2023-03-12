const qrcode = require('qrcode-terminal')
const fs = require('fs')
const {Client, MessageMedia, LocalAuth, Buttons, GroupChat, Util, List} = require('whatsapp-web.js')
const mime = require('mime-types')
const ffmpeg = require('@ffmpeg-installer/ffmpeg');



const client = new Client({
   //puppeteer:{ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'},
    authStrategy: new LocalAuth(),
    //ffmpeg:"./ffmpeg"
    puppeteer: {
        headless: true,
        //args: wppConfig.puppeteerArgs,
       // executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
       
        executablePath:"/usr/bin/google-chrome-stable"
      },
      ffmpegPath: ffmpeg.path,


});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('message_create', msg => {
    const command = msg.body.split(' ')[0];
    // Cola seu número onde tem o 84848484, sem o 9
    const sender = msg.from.includes("84848484") ? msg.to : msg.from
    if (command === "/st")  generateSticker(msg, sender)
});

client.initialize();

const generateSticker = async(msg)=>{
    try{
        msg.react("🤘")      
    let chat = await msg.getChat();
    const media = await msg.downloadMedia();
    return chat.sendMessage(media, {
      sendMediaAsSticker: true,
      stickerName: "Sticker bot",
      stickerAuthor: "By D3 ",
    }); 
}catch(e){
        msg.reply("❌ Erro ao processar mídia")
}
}


client.on('message_create', async msg => {
if (msg.body === '/btn') {
    let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
    //client.sendMessage(msg.from, button);
    msg.reply(button)
} else if (msg.body === '/list') {
    let sections = [{title:'Vamos faça sua escolha',rows:[{title:'Rock', description: 'Sou do Rock'},{title:'Metal', description:'Sou do Metal'}]}];
    let list = new List('Vamos escolha rápido','Faça aqui sua escolha',sections,'Faça uma escolha','footer');
    //client.sendMessage(msg.from, list);
    msg.reply(list)
} else if (msg.body === '/rc') {
    msg.react('👍');
} else if(msg.body ==='/menu'){
    //let selections=[{ title: 'Bot D3x  aqui está o menu de opções',rows:[{title:'', description: ''},{title:'', description:''}]}];
    //let list1 = new List('','',selections,'','');
    //client.sendMessage(msg.from, list);
    //msg.reply(list1)
msg.reply(`Bot D3
           Aqui estão alguma opções:
            /st cria figurinhas
            /rc faz reação
            /list faz uma lista           
                 `)
}
   else{
    if(msg.mentionedIds){
        for(let mention of msg.mentionedIds){
            if(mention ==='556292484223@c.us'){
                console.log('Mencionou o bot')
                msg.reply('Não estou podendo falar agora, logo entro em contato.')
            }
        }
    }
}



});

/*client.on('message_create', async msg=>{
    if(msg.body==='Avada' ||'avada'){
    const mediaau = MessageMedia.fromFilePath('./audio/avada2.mp3');
    client.sendMessage(msg.from, mediaau);
    }
});*/
    







//let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
