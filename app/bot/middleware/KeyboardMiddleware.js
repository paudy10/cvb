const { MAIN_BUTTONS_TEXT, getlike, productdetail, cmtype, buysProductBtns, inline } = require("../utils/ButtonManager")
const { CATEGORY_LIST_MESSAGE, CRYPTO_LIST_MESSAGE2, caption, getproductDetail, CRYPTO_LIST_MESSAGE, getpricemessage, getlikeDetail, contact, getAccDetail, COMMENT_TYPE_MESSAGE, USER_BUYS_LIST_MESSAGE, CART_EMPTY, FAV_LIST_MESSAGE, FAV_LIST_EMPTY_MESSAGE, cartListMessage, getuserDetail } = require("../utils/MessageHandler");
// const categorylist = require("../data/category.json")
const Category = require("../../model/category")
const Meme = require("../../model/meme")
const User = require("../../model/user")
const Twl = require("../../model/telegrafWatchList")
const Mwl = require("../../model/myWatchList")
const { categoryList } = require("../utils/ButtonManager")
const { getPrice } = require("../function/function");
const request = require('request');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const STATE_LIST = {
    CAT: "category",
    PRODUCT: "product",
    CM: "comment",
    CM_ENTER: "comment enter",
    WATCH: "watch list",
    MEME: "meme",
    ONPRICE: " online price",
    ACCOUNT: "account",
    CONTACT: "contact us"
}

module.exports = (ctx, next) => {
    if (ctx.update.callback_query) {
        const textt = ctx.update.callback_query.data
        if (textt == "PARDAKHT") {
            ctx.session.state = 'PARDAKHT'
            const neww = ctx.update.callback_query.message.caption
            ctx.session.comment = JSON.stringify(neww).substring(52, 61)
        }

    }

    if (!ctx.message)
        return next();
    const text = ctx.message.text;
    if (text) {
        if (Object.values(MAIN_BUTTONS_TEXT).includes(text) && EventListener[text]) {
            return EventListener[text](ctx);
        }

    }

    next();
}

const EventListener = {
    [MAIN_BUTTONS_TEXT.VIP]: async (ctx) => {
        ctx.session.state = STATE_LIST.VIP
        ctx.session.comment = undefined
        const categorylist = await Category.find()
        ctx.reply(CATEGORY_LIST_MESSAGE, categoryList(categorylist))
    },
    [MAIN_BUTTONS_TEXT.MEME]: async (ctx) => {
        ctx.session.state = STATE_LIST.MEME
        ctx.session.comment = undefined
        const memelist = await Meme.find()
        const rand = Math.floor(Math.random() * (memelist.length));
        const link = memelist[rand].photo;
        await ctx.telegram.sendChatAction(ctx.message.from.id, "upload_photo").then().catch((err) => {
            console.log(err)
        })
        ctx.replyWithPhoto(link)
    },
    [MAIN_BUTTONS_TEXT.COMMENT]: (ctx) => {
        ctx.session.state = STATE_LIST.CM
        ctx.reply(COMMENT_TYPE_MESSAGE, cmtype)
    },
    [MAIN_BUTTONS_TEXT.CRYPTO]: async (ctx) => {
        ctx.session.state = STATE_LIST.ONPRICE
        const price = []
        const rank = []
        const name = []
        const volume = []
        ctx.reply(`در حال دریافت اطلاعات ....
لطفا کمی منتظر بمانید !!                    
        `)
        await ctx.telegram.sendChatAction(ctx.message.from.id, "typing").then().catch((err) => {
            console.log(err)
        })
        await ctx.telegram.sendChatAction(ctx.message.from.id, "typing").then().catch((err) => {
            console.log(err)
        })
        for (let i = 1; i < 11; i++) {
            let arz = await getPrice(i)
            rank[i] = arz[0].rank
            name[i] = arz[0].name
            price[i] = arz[0].price
            volume[i] = arz[0].volume
        }
        for (let j = 1; j < 11; j++) {
            name[j] = volume[j].split(" ")[1]
            volume[j] = volume[j].split(" ")[0]
        }
        ctx.reply(CRYPTO_LIST_MESSAGE2(rank, name, price, volume))

    },
    [MAIN_BUTTONS_TEXT.CONTACT]: (ctx) => {
        ctx.session.state = STATE_LIST.CONTACT
        ctx.session.comment = undefined
        ctx.reply(contact)
    },
    [MAIN_BUTTONS_TEXT.ACCOUNT]: async (ctx) => {
        ctx.session.state = STATE_LIST.ACCOUNT
        ctx.session.comment = undefined
        const id = ctx.message.from.id
        const user = await User.findOne({ id: id })
        ctx.reply(getAccDetail(user))

    },
    [MAIN_BUTTONS_TEXT.WATCH]: async (ctx) => {
        ctx.session.comment = undefined
        ctx.session.state = STATE_LIST.WATCH
        const twl = await Twl.find()
        const photo = twl[0].photo
        if (twl) {
            await ctx.telegram.sendChatAction(ctx.message.from.id, "upload_photo").then().catch((err) => {
                console.log(err)
            })
            await ctx.replyWithPhoto(photo, getlike(twl, getlikeDetail(twl[0])))

        }

    },
    [MAIN_BUTTONS_TEXT.WATCH2]: async (ctx) => {
        ctx.session.comment = undefined
        ctx.session.state = STATE_LIST.WATCH
        const mwl = await Mwl.find()
        const photo = mwl[0].photo
        if (mwl) {
            await ctx.telegram.sendChatAction(ctx.message.from.id, "upload_photo").then().catch((err) => {
                console.log(err)
            })
            await ctx.replyWithPhoto(photo, getlike(mwl, getlikeDetail(mwl[0])))

        }

    }


}

module.exports.KeyboardEventListener = EventListener;
