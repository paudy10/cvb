const { convertArrayToNColumn } = require("./DataUtil");

const MAIN_BUTTONS_TEXT = {
    VIP: "خرید اشتراک | ⚜️",
    ACCOUNT: "حساب من | 🧛🏼",
    CRYPTO: "نرخ ارز | 📈",
    COMMENT: "نظرات | 💌",
    CONTACT: "ارتباط با ما | 📞",
    WATCH: "واچ لیست کوین تلگراف | 🌍",
    WATCH2: "واچ لیست روزانه | ⭐️",
    MEME: "کریپتو میم | 👻"
}

const crypto = {
    BTC: "بیتکوین",
    ETH: "اتریوم",
    TRX: "ترون",
    LTC: "لایت کوین"
}

const mainButtons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                { text: MAIN_BUTTONS_TEXT.WATCH }
            ],
            [
                { text: MAIN_BUTTONS_TEXT.WATCH2 },
                { text: MAIN_BUTTONS_TEXT.VIP }
            ], [

                { text: MAIN_BUTTONS_TEXT.COMMENT },
                { text: MAIN_BUTTONS_TEXT.CRYPTO },
                { text: MAIN_BUTTONS_TEXT.ACCOUNT }
            ], [
                { text: MAIN_BUTTONS_TEXT.CONTACT },
                { text: MAIN_BUTTONS_TEXT.MEME }
            ]
        ]
    }
}
const categoryList = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.title,
                callback_data: `CAT_${item._id}`
            }))),
        }
    }
}
const productList = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.name,
                callback_data: `PRODUCT_${item._id}`
            })))
                // , [{text:"بازگشت",callback_data:"BACK_CAT"}]
            ],
        }
    }
}

const inline = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [[{
            text: crypto.BTC,
            callback_data: `BTC`
        }, {
            text: crypto.ETH,
            callback_data: `ETH`
        }], [{
            text: crypto.TRX,
            callback_data: `TRX`
        }, {
            text: crypto.LTC,
            callback_data: `LTC`
        }]
        ],
    },
}
const productdetail = (product) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [[{
                text: "خرید",
                callback_data: `CART_${product._id}`
            }],
                // [{
                //     text:"بازگشت",
                //     callback_data:`BACK_PRODUCT_${product.cat}`
                // }]
            ],
        },
    }
}

const getlike = (Wl, caption) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                // [{
                //     text: "لایک",
                //     callback_data: `like_${Wl.id}`
                // }],
                // [{
                //     text:"بازگشت",
                //     callback_data:`BACK_PRODUCT_${product.cat}`
                // }]
            ],
        }, caption
    }
}
const getlike2 = (p, caption) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                [{
                    text: "پرداخت کردم ✅",
                    callback_data: `PARDAKHT`
                }]
            ],
        }, caption
    }
}




const cmtype = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [[{
            text: "انتقاد",
            callback_data: `COMMENT_TYPE_ENTEGHAD`
        }], [{
            text: "پیشنهاد",
            callback_data: `COMMENT_TYPE_PISHNAHAD`
        }],
        ],
    },
}

module.exports = {
    MAIN_BUTTONS_TEXT,
    mainButtons,
    categoryList,
    productList,
    productdetail,
    cmtype,
    inline,
    getlike,
    getlike2
}
