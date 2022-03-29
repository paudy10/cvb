const { MAIN_BUTTONS_TEXT,getlike2, productdetail, commentTypeButtons, buysProductBtns } = require("../utils/ButtonManager")
const { CATEGORY_LIST_MESSAGE,cartextDetail, getCryptoDetail, getCryptoDetail2, getproductDetail, PRODUCT_LIST_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE, COMMENT_TYPE_MESSAGE, USER_BUYS_LIST_MESSAGE, CART_EMPTY, FAV_LIST_MESSAGE, FAV_LIST_EMPTY_MESSAGE, cartListMessage } = require("../utils/MessageHandler");
// const categorylist = require("../data/category.json")
// const productlist = require("../data/product.json")
const { categoryList } = require("../utils/ButtonManager")
const { productList } = require("../utils/ButtonManager")
const { KeyboardEventListener } = require("./KeyboardMiddleware")
const { STATE_LIST } = require("./SessionMiddleware")
const Product = require("../../model/product")
const { getPrice } = require("../function/function");
const { session } = require("telegraf");



const ActionMap = {
    CAT: /^CAT_\w+/,
    PRODUCT: /^PRODUCT_\w+/,
    BACK: /^BACK_\W+/,
    SEARCH: /^SEARCH/,
    BTC: /^BTC/,
    TRX: /^TRX/,
    ETH: /^ETH/,
    LTC: /^LTC/,
    CART: /^CART_\w+/,
    PARDAKHT: /^PARDAKHT/
}



module.exports = (ctx, next) => {
    if (!ctx.update.callback_query)
        return next();
    const callback_data = ctx.update.callback_query.data;
    if (callback_data) {
        const actionValues = Object.values(ActionMap)
        for (let i = 0; i < actionValues.length; i++) {
            const ismMatch = callback_data.match(actionValues[i])
            if (ismMatch && EventListener[Object.keys(ActionMap)[i]]) {
                EventListener[Object.keys(ActionMap)[i]](ctx, ismMatch);
            }
        }
    }
    next();
}

const EventListener = {
    CAT: async (ctx, matches) => {
        const Cat = matches[0].split("_")[1];
        const products = await Product.find({ cat: Cat });
        ctx.reply(PRODUCT_LIST_MESSAGE, productList(products))
    },
    PRODUCT: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const data = await Product.findById(productId);
        if (data) {
            ctx.reply(getproductDetail(data), productdetail(data))
        } else {
            ctx.reply(PRODUCT_NOT_FOUND_MESSAGE)
        }
    },
    CART: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const data = await Product.findById(productId);
        const amont = data.price
        const photo = 'AgACAgQAAxkBAAIKDmI7ztoIHiYprVBN7N55t7lyARmOAAKquTEb4bLgUXVB7RRU_ZzaAQADAgADcwADIwQ'
        ctx.replyWithPhoto(photo,getlike2(data,cartextDetail(data)))
    },
    BTC: async (ctx) => {
        let i = 1
        const price = await getPrice(i)
        if (price[0].price) {
            ctx.reply(getCryptoDetail(price[0]))
        }
        else {
            ctx.reply(getCryptoDetail2(price[0], i))
        }
    },
    ETH: async (ctx) => {
        let i = 2
        const price = await getPrice(i)
        if (price[0].price) {
            ctx.reply(getCryptoDetail(price[0]))
        }
        else {
            ctx.reply(getCryptoDetail2(price[0], i))
        }
    },
    TRX: async (ctx) => {
        let i = 24
        const price = await getPrice(i)
        if (price[0].price) {
            ctx.reply(getCryptoDetail(price[0]))
        }
        else {
            ctx.reply(getCryptoDetail2(price[0], i))
        }
    },
    LTC: async (ctx) => {
        let i = 21
        const price = await getPrice(i)
        if (price[0].price) {
            ctx.reply(getCryptoDetail(price[0]))
        }
        else {
            ctx.reply(getCryptoDetail2(price[0], i))
        }
    },


}

module.exports.ActionEventListener = EventListener;
