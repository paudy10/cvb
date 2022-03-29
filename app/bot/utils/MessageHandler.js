module.exports.START_MESSAGE = "سلام , به دستیار معاملاتی کریپتو ومپایر خوش اومدی !";
module.exports.CATEGORY_LIST_MESSAGE = "یکی از موارد زیر را انتخاب کنید";
module.exports.CRYPTO_LIST_MESSAGE = "یکی از ارز های  زیر را انتخاب کنید ! ";
module.exports.PRODUCT_LIST_MESSAGE = "یکی از انواع زیر را انتخاب کنید";
module.exports.PRODUCT_NOT_FOUND_MESSAGE = "محصول مورد نظر پیدا نشد";
module.exports.COMMENT_SUBMIT = "پیام شما ارسال شد";
module.exports.COMMENT_TYPE_MESSAGE = "نوع نظر خود را انتخاب کنید";
module.exports.COMMENT_MESSAGE = "متن نظر خود را تایپ کنید";
module.exports.contact = `
کاربر عزیز
از طریق کانال های ارتباطی زیر میتوانی با ما در ارتباط باشی !

id :  @vampire_support

`;

module.exports.HelpMsg = `راهنمای دستورات

1- /SendDm (ID User) (Text)
2- /SendToAll (Text)
3- /Users
4- /WLT (Image Link) (Caption)
5- /WLC (Image Link) (Caption)
6- /AddMeme (Image Link)
7- /SetVip (X day)
8- /VipList
9- /UserDetail (ID User)
---
`;
module.exports.getpricemessage = (price) => `
${price}
`;
module.exports.getStart = (user) => `سلام ${user} عزیز

برای استفاده از خدمات ابتدا در کانال زیر عضو شده و سپس مجددا  /start بزنید .

id : @crypto_vampire
`;

module.exports.getCryptoDetail = (arz) => `قیمت لحظه ای

رنک : ${arz.rank}
نام :  ${arz.name}
قیمت : ${arz.price}

`;
module.exports.getCryptoDetail2 = (arz, i) => `قیمت لحظه ای

رنک : ${i}
نام :  ${arz.rank}
قیمت : ${arz.name}

`;
module.exports.getAccDetail = (user) => `اطلاعات حساب

نام :  ${user.name}
آیدی : @${user.username}
وضعیت اشتراک : ${user.vip != 0 ? `کاربر ویژه (${user.vip}روز) ✅` : `کاربر معمولی ❌ `} 

`;
module.exports.caption = (twl) => `کپشن

متن :  ${twl.matn}

`;

module.exports.getlikeDetail = (twl) => `
${twl.matn}
`;
module.exports.cartextDetail = (p) => `
آدرس ولت تتر : TAvDuhYZ9YqcLpydrumFFV5DwzvUPvRwNj
مبلغ : ${p.price} $

🔰 برای پرادخت از طریق ارز های دیگر به پشتیبانی پیام دهید . 

`;
module.exports.getproductDetail = (product) => `${product.name}

قیمت : ${product.price} $
وضعیت : ${product.exist ? "موجود ✅" : "ناموجود ❌ "} 
`;
module.exports.getuserDetail = (user) => `کاربر جدید

آیدی عددی : ${user.id} 
نام :  ${user.name}
نام کاربری :  @${user.username}

`;
module.exports.onedaytofinish = (user) => ` ${user.name} عزیز
تنها 1 روز تا پایان اشتراک ویژه شما مانده است !
`;


module.exports.getusers = (user) => {
    return `لیست کاربران
    
    ${user.map((user, index) => `${index + 1}- ${user.id}  |  @${user.username} \n`).join("")}
    `};
module.exports.CRYPTO_LIST_MESSAGE2 = (rank , name , price , volume) => {
    return `نرخ آنلاین ارز 📈
        
    🏅 رنک : ${rank[1]} 
    🔰 نام : ${name[1]}
    💵 قیمت : ${price[1]} 
    💰 حجم : ${volume[1]} 

    ----

    🏅 رنک : ${rank[2]} 
    🔰 نام : ${name[2]}
    💵 قیمت : ${price[2]} 
    💰 حجم : ${volume[2]} 

    ----

    🏅 رنک : ${rank[3]} 
    🔰 نام : ${name[3]}
    💵 قیمت : ${price[3]} 
    💰 حجم : ${volume[3]} 

    ---

    🏅 رنک : ${rank[4]} 
    🔰 نام : ${name[4]}
    💵 قیمت : ${price[4]} 
    💰 حجم : ${volume[4]}
    
    ----

    🏅 رنک : ${rank[5]} 
    🔰 نام : ${name[5]}
    💵 قیمت : ${price[5]} 
    💰 حجم : ${volume[5]}
    
    ----

    🏅 رنک : ${rank[6]} 
    🔰 نام : ${name[6]}
    💵 قیمت : ${price[6]} 
    💰 حجم : ${volume[6]}
    
    ----

    🏅 رنک : ${rank[7]} 
    🔰 نام : ${name[7]}
    💵 قیمت : ${price[7]} 
    💰 حجم : ${volume[7]}
    
    ----

    🏅 رنک : ${rank[8]} 
    🔰 نام : ${name[8]}
    💵 قیمت : ${price[8]} 
    💰 حجم : ${volume[8]}
    
    ----

    🏅 رنک : ${rank[9]} 
    🔰 نام : ${name[9]}
    💵 قیمت : ${price[9]} 
    💰 حجم : ${volume[9]}
    
    ----

    🏅 رنک : ${rank[10]} 
    🔰 نام : ${name[10]}
    💵 قیمت : ${price[10]} 
    💰 حجم : ${volume[10]} 

    ----
    `};

module.exports.getvip = (user) => {
    return `لیست کاربران ویژه
        
        ${user.map((user, index) => `${index + 1}- ${user.vip} روز  |  @${user.username} \n`).join("")}
        `};

module.exports.cm4admin = (comment, user) => `${comment.type === "COMMENT_TYPE_ENTEGHAD" ? "انتقاد جدید" : "پیشنهاد جدید"}

        ${comment.text}
        
        کاربر :  @${user.username}
        ایدی عددی : ${user.id}
        `;
module.exports.cm4admin2 = (data, p, user) => `پرداخت جدید

کاربر :  @${user.username}
ایدی عددی : ${user.id}
${p} $
شماره پرداخت : ${data}

`;