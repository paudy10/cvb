const { MAIN_BUTTONS_TEXT, productdetail, commentTypeButtons, buysProductBtns } = require("../utils/ButtonManager")
const { CATEGORY_LIST_MESSAGE, cm4admin,cm4admin2, COMMENT_MESSAGE, getproductDetail, PRODUCT_LIST_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE, COMMENT_TYPE_MESSAGE, USER_BUYS_LIST_MESSAGE, CART_EMPTY, FAV_LIST_MESSAGE, FAV_LIST_EMPTY_MESSAGE, cartListMessage, COMMENT_SUBMIT } = require("../utils/MessageHandler");
const categorylist = require("../data/category.json")
// const productlist = require("../data/product.json")
const { categoryList } = require("../utils/ButtonManager")
const { productList } = require("../utils/ButtonManager")
const { KeyboardEventListener } = require("./KeyboardMiddleware")
const config = require("config")


const STATE_LIST = {
    CAT: "category",
    PRODUCT: "product",
    CM: "comment",
    CM_ENTER: "comment enter",
    WATCH: "watch list",
    MEME: "meme",
    ONPRICE: " online price",
    CONTACT: "contact us",
    ACCOUNT: "account",
    SENDPIC: "send picture",
    SENDPIC2: "send picture2",
    PARDAKHT: "PARDAKHT",
    PARDAKHT2: "PARDAKHT2"

}



module.exports = (ctx, next) => {
    if (!ctx.session.state)
        return next();
    const state = ctx.session.state;
    const Values = Object.values(STATE_LIST)
    if (Values.includes(state) && EventListener[state]) {
        return EventListener[state](ctx)
    }
    next();
}

const EventListener = {
    [STATE_LIST.CM]: (ctx, next) => {
        ctx.session.STATE_LIST = undefined;
        if (ctx.update.callback_query) {
            const data = ctx.update.callback_query.data;
            ctx.session.state = STATE_LIST.CM_ENTER;
            ctx.session.comment = { commentType: data }
            //send4admin
            ctx.reply(COMMENT_MESSAGE)
        }
    },
    [STATE_LIST.CM_ENTER]: (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message) {
            ctx.reply(COMMENT_SUBMIT)
            const data = ctx.message.text;
            ctx.telegram.sendMessage(config.get("gpLog"), cm4admin({ type: ctx.session.comment.commentType, text: data }, ctx.message.from))
            ctx.session.comment = undefined
        } else next();
    },
    [STATE_LIST.PARDAKHT]: (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.update.callback_query) {
            ctx.reply("شماره Txid واریز خود را وارد کنید !")
            ctx.session.state = STATE_LIST.PARDAKHT2
        }
    },
    [STATE_LIST.PARDAKHT2]: (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message) {
            ctx.reply('پیام شما با موفقیت ارسال شد')
            ctx.reply('در حال بررسی توسط پشتیبانی ...')
            const data = ctx.message.text;
            const cast = ctx.session.comment
            ctx.telegram.sendMessage(config.get("gpLog"), cm4admin2(data , cast, ctx.message.from))
            ctx.telegram.sendMessage(config.get("admin"), cm4admin2(data , cast, ctx.message.from))
            
            ctx.session.comment = undefined
        } else next();
    }


}

module.exports.STATE_LIST = STATE_LIST;
