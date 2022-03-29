const { MAIN_BUTTONS_TEXT,getlike ,productdetail, commentTypeButtons, buysProductBtns } = require("../utils/ButtonManager")
const {getuserDetail,getusers,getvip ,HelpMsg , getAccDetail,getlikeDetail, CATEGORY_LIST_MESSAGE,getproductDetail,PRODUCT_LIST_MESSAGE,PRODUCT_NOT_FOUND_MESSAGE, COMMENT_TYPE_MESSAGE, USER_BUYS_LIST_MESSAGE, CART_EMPTY, FAV_LIST_MESSAGE, FAV_LIST_EMPTY_MESSAGE, cartListMessage } = require("../utils/MessageHandler");
// const categorylist = require("../data/category.json")
// const productlist = require("../data/product.json")
const { categoryList } = require("../utils/ButtonManager")
const { productList } = require("../utils/ButtonManager")
const {KeyboardEventListener} = require("./KeyboardMiddleware")
const {STATE_LIST} = require("./SessionMiddleware")
const Product = require("../../model/product")
const User = require("../../model/user")
const Meme = require("../../model/meme")
const config = require("config")

const Twl = require("../../model/telegrafWatchList")
const Mwl = require("../../model/myWatchList");
const user = require("../../model/user");


const AdminCommand = {
    SendDm : "/SendDm",
    CreateUser :"/start",
    Users:"/Users",
    SendToAll:"/SendToAll",
    SendPic:"/SendPic",
    WLT:"/WLT",
    WLC:"/WLC",
    ADDMEME:"/AddMeme",
    SETVIP:"/SetVip",
    UserDetail:"/UserDetail",
    VipList : "/VipList",
    Admin:"/Admin",
    HELP:"/help"
}



module.exports = (ctx, next) => {
    
    if (!ctx.message)
        return next();
    const data = ctx.message.text;
    const chatId = ctx.message.chat.id
    
    if (data && chatId == config.get("gpLog")) {
        const adminval = Object.values(AdminCommand)
        for (let i = 0; i < adminval.length; i++) {
            const ismMatch = data.match(adminval[i])
            if (ismMatch && EventListener[Object.keys(AdminCommand)[i]]) {
                EventListener[Object.keys(AdminCommand)[i]](ctx,data);
            }
        }
    }
    next();
}



const EventListener = {
    SendDm:(ctx,data)=>{
        const data1 = data.split(" ")[1];
        const text= [];
        const data2 = " "
        for ( let i = 0; i < (data.length)/3 ; i++){
            text[i] = data.split(" ")[i+2];
        }
        if(data.length > 8){
            ctx.telegram.sendMessage(data1,text.join(" ")).then(()=>{}).catch(err =>{
                console.log(err)
            })
        }
    },
    SETVIP:async (ctx,data)=>{
        const ID = data.split(" ")[1];
        
        const VIP = data.split(" ")[2];  
        const user = await User.findOne({id:ID})
        if(user)
        {user.vip = VIP
        await user.save()
        ctx.reply(`اشتراک ${user.name} به ${user.vip} تغییر یافت !`)}
    },
    CreateUser: async (ctx)=>{
        const userTel = ctx.message.from;
        let user = await User.findOne({id:userTel.id})
        if(!user){
            user = new User({
                id:userTel.id,
                name:userTel.first_name,
                username:userTel.username,
                vip: 0 
            })
            user.save()
            ctx.telegram.sendMessage(config.get("gpLog"),getuserDetail(user))
        }

    },
    Users: async (ctx)=>{
        const user = await User.find()
        ctx.telegram.sendMessage(config.get("gpLog"),getusers(user))
    },
    // Admin: async (ctx)=>{
    //     const admin = ctx.telegram.getChat(config.get("gpLog")).then().catch()
    //     // ctx.telegram.sendMessage(config.get("gpLog"),getusers(user))
    //    console.log(admin)
    // },
    // SendPic:async (ctx)=>{
    //     ctx.session.state = STATE_LIST.SENDPIC
    // },

    SendToAll: async (ctx,data)=>{
        const user = await User.find()
        // for(let k = 0 ; k < user.length ; k++){
        //     const x= await ctx.telegram.getChatMember(user[k].id,user[k].id)
        // }

        const text= [];
        const data2 = " "
        for ( let i = 0; i < (data.length)/3 ; i++){
            text[i] = data.split(" ")[i+1];
        }
        for(let j = 0 ; j < user.length ; j++){
            ctx.telegram.sendMessage(user[j].id,text.join(" ")).then(()=>{}).catch(err =>{
                console.log(err)
            })

        }
    },
    WLT: async (ctx,data)=>{
        const twl = await Twl.find()
        const text= [];
        const data2 = " "
        for ( let i = 0; i < (data.length)/3 ; i++){
            text[i] = data.split(" ")[i+2];
        }
        const matn = text.join(" ")
        const photo = data.split(" ")[1];
        
        if(photo && matn){
            twl[0].matn = matn
            twl[0].photo = photo
            await twl[0].save()
            await ctx.replyWithPhoto(photo, getlike(twl, getlikeDetail(twl[0])))
            ctx.reply("با موفقیت آپدیت شد")

        }

    }
    ,
    WLC: async (ctx,data)=>{
        const mwl = await Mwl.find()
        const text= [];
        const data2 = " "
        for ( let i = 0; i < (data.length)/3 ; i++){
            text[i] = data.split(" ")[i+2];
        }
        const matn = text.join(" ")
        const photo = data.split(" ")[1];
        
        if(photo && matn){
            mwl[0].matn = matn
            mwl[0].photo = photo
            await mwl[0].save()
            await ctx.replyWithPhoto(photo, getlike(mwl, getlikeDetail(mwl[0])))
            ctx.reply("با موفقیت آپدیت شد")
        }

    },
    ADDMEME: async (ctx,data)=>{
        const photo = data.split(" ")[1];
        if(photo){
        const meme = new Meme({
            photo : photo
        })
        await meme.save()
        ctx.reply("با موفقیت افزوده شد")}
    },
    UserDetail: async (ctx,data)=>{
        const ID = data.split(" ")[1];
        let user = await User.findOne({id:ID})
        ctx.reply(getAccDetail(user))
        // ctx.reply(ID)
    },
    VipList:async (ctx)=>{
        const user = await User.find()
        const Vip = []
        
        for(let i = 0 ; i < user.length ; i++){
            if(user[i].vip > 0){
                let index=Vip.length
                Vip[index+1] = user[i]
            }
        }
        if(Vip)
            ctx.telegram.sendMessage(config.get("gpLog"),getvip(Vip))
    },
    HELP:(ctx)=>{
        ctx.reply(HelpMsg)
    }
}

module.exports.AdminEventListener = EventListener;
