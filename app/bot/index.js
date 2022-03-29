const { Telegraf } = require("telegraf");
const LocalSession = require('telegraf-session-local')
const SessionMiddleware = require("./middleware/SessionMiddleware")
const { mainButtons } = require("./utils/ButtonManager")
const { START_MESSAGE, getStart, getuserDetail,onedaytofinish } = require("./utils/MessageHandler")
const KeyboardMiddleware = require("./middleware/KeyboardMiddleware")
const ActionMiddleware = require("./middleware/ActionMiddleware")
const AdminMiddleware = require("./middleware/AdminMiddleware");
const User = require("../model/user");
const config = require("config")
var cron = require('node-cron');
const CronVip = require('./function/function')

let bot;

async function startBot() {
    bot = new Telegraf(process.env.BOT_TOKEN)
    await bot.launch();

    bot.use(async (ctx,next) => {
            // if(ctx.message.photo){
            //     ctx.telegram.sendChatAction(config.get("gpLog"),"upload_photo")
            //     await ctx.telegram.sendPhoto(config.get("gpLog"), ctx.message.photo[0].file_id)
            //     ctx.telegram.sendMessage(config.get("gpLog"),ctx.message.photo[0].file_id)
            // }
            // if(ctx.message.document){
            //     ctx.telegram.sendChatAction(config.get("gpLog"),"upload_photo")
            //     await ctx.telegram.sendDocument(config.get("gpLog"), ctx.message.document.file_id)
            //     ctx.telegram.sendMessage(config.get("gpLog"),ctx.message.document.file_id)
            // }
            next()
    })
    bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
        return answerInlineQuery({
            type: 'article',
            id: 'someID',
            title: 'someTitle',
            description: 'someDesc',
            thumb_url: 'img_url',
            url: 'url'
        })
    });
    bot.use(new LocalSession({ database: "session.json" }))
    bot.use(AdminMiddleware)
    bot.use(KeyboardMiddleware)
    bot.use(SessionMiddleware)
    bot.use(ActionMiddleware)
    bot.start(async ctx => {
        const chat = await ctx.telegram.getChatMember("@crypto_vampire", ctx.message.from.id);
        const userTel = ctx.message.from;
        let user = await User.findOne({ id: userTel.id })
        if (!user) {
            user = new User({
                id: userTel.id,
                name: userTel.first_name,
                username: userTel.username,
                vip: 0
            })
            user.save()
            ctx.telegram.sendMessage(config.get("gpLog"), getuserDetail(user))
        }

        if (chat.status == "member" || chat.status == "creator" || chat.status == "administrator") {
            ctx.reply(START_MESSAGE, mainButtons)
        }
        else {
            ctx.reply(getStart(ctx.message.from.username))
        }
    })
    cron.schedule('0 0 * * *', async () => {
        const user = await User.find()
        for (let k = 0; k < user.length; k++) {
            const X = user[k].vip
            if (X > 0) {
                user[k].vip = X - 1;
                await user[k].save();
                if(X==1){
                    ctx.telegram.sendMessage(user[k].id,onedaytofinish(user[k]))
                }
                
            }
            if(X==0){
                await ctx.telegram.kickChatMember(config.get("vip"), user[k].id).then(()=>{}).catch(err =>{
                    console.log(err)
                })
                await ctx.telegram.unbanChatMember(config.get("vip"), user[k].id).then(()=>{}).catch(err =>{
                    console.log(err)
                })
            }
        }
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
}


module.exports.startBot = startBot;
