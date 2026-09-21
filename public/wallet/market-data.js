/* Mock catalog boundary. Replace MarketCatalog.list/get with a normalized API adapter later.
   Provider routing and fulfillment belong behind that boundary, never in product UI. */
const marketCategories=['Gift Cards','Streaming','Gaming','Travel','eSIM','Mobile','Software','Poker','Shopping','Lifestyle'];
function brandArtwork(label,bg,fg='#ffffff'){return 'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" rx="14" fill="${bg}"/><text x="160" y="103" text-anchor="middle" fill="${fg}" font-family="Arial,sans-serif" font-weight="700" font-size="33">${label}</text></svg>`)}
const marketRows=[
 ['netflix','Netflix','Netflix Gift Card','Streaming','BR','BRL',100,18.72,'digital_code','Netflix','#171318',['Gift Cards'],'Stream your next favorite series. A digital gift card for a Brazilian account.'],
 ['spotify','Spotify','Spotify Gift Card','Streaming','BR','BRL',50,10,'digital_code','Spotify','#123e2d',['Gift Cards'],'Music and podcasts, paid for with your wallet balance.'],
 ['playstation','PlayStation','PlayStation Gift Card','Gaming','BR','BRL',250,46.20,'digital_code','PlayStation','#172947',['Gift Cards'],'Add credit to your gaming account and explore new worlds.'],
 ['uber','Uber','Uber Gift Card','Lifestyle','BR','BRL',50,10,'digital_code','Uber','#191919',['Gift Cards','Travel'],'Everyday rides and city discoveries with digital credit.'],
 ['airalo','Airalo eSIM','Airalo Global Data','eSIM','GLOBAL','USD',4.50,4.50,'esim','airalo','#f2e8d9',['Travel','Poker'],'A digital data plan for your next destination. Coverage and plans are illustrative.'],
 ['gto','GTO Wizard','GTO Wizard Study Pass','Poker','GLOBAL','USD',49,49,'subscription','GTO Wizard','#222b37',['Software'],'A simulated monthly study pass for your poker routine.'],
 ['apple','Apple','Apple Gift Card','Shopping','BR','BRL',50,10,'digital_code','Apple','#edeaf0',['Gift Cards'],'Digital credit for your Apple account. Region restrictions apply in this demo catalog.'],
 ['steam','Steam','Steam Gift Card','Gaming','BR','BRL',100,20,'digital_code','STEAM','#233345',['Gift Cards'],'Build your library with digital gaming credit.'],
 ['xbox','Xbox','Xbox Gift Card','Gaming','BR','BRL',100,19,'digital_code','Xbox','#194d2a',['Gift Cards'],'A new way to enjoy your gaming balance.'],
 ['google','Google Play','Google Play Gift Card','Shopping','BR','BRL',50,10,'digital_code','Google Play','#e8eff0',['Gift Cards','Mobile'],'Credit for apps, entertainment and digital purchases.'],
 ['amazon','Amazon','Amazon Gift Card','Shopping','BR','BRL',100,20,'digital_code','amazon','#263644',['Gift Cards'],'A gift card for your next discovery. Brazilian catalog example.'],
 ['youtube','YouTube','YouTube Premium Pass','Streaming','GLOBAL','USD',12,12,'subscription','YouTube','#5f1d2a',[],'A fictional one-month premium entertainment pass.'],
 ['mobile','Global Mobile','Brazil Mobile Top-up','Mobile','BR','BRL',50,9.50,'account_credit','mobile+','#2e5960',[],'A simulated mobile credit voucher. No phone number or real top-up is required.'],
 ['vpn','Secure Route','VPN Annual License','Software','GLOBAL','USD',39,39,'license','Secure Route','#33415e',['Poker'],'A fictional annual license for everyday connectivity.'],
 ['analytics','Table Metrics','Poker Analytics License','Poker','GLOBAL','USD',29,29,'license','Table Metrics','#50416a',['Software'],'Review sessions with a fictional poker analytics license.'],
 ['training','Study Club','Poker Training Pass','Poker','GLOBAL','USD',35,35,'subscription','Study Club','#4c3345',['Software'],'A mock membership for a training platform.'],
 ['productivity','Work Suite','Productivity License','Software','GLOBAL','USD',24,24,'license','Work Suite','#485f49',[],'A fictional monthly productivity software license.'],
 ['flights','Global Travel','Flight Credit','Travel','GLOBAL','USD',100,100,'voucher','Flights','#344866',[],'Explore a future flight booking experience. This mock voucher does not create a reservation.'],
 ['hotels','Global Stays','Hotel Stay Voucher','Travel','GLOBAL','USD',150,150,'booking','Hotels','#695646',[],'A fictional stay voucher illustrating a future booking experience. No hotel is reserved.'],
 ['lounges','Global Lounge','Airport Lounge Pass','Travel','GLOBAL','USD',32,32,'voucher','Lounges','#413253',[],'A demo lounge access voucher for a future journey.'],
 ['insurance','Travel Care','Travel Protection Voucher','Travel','GLOBAL','USD',18,18,'voucher','Travel Care','#436261',[],'Visual concept only. This voucher does not issue insurance or provide coverage.'],
 ['miles','Global Rewards','Miles & Rewards Voucher','Travel','GLOBAL','USD',25,25,'voucher','Rewards','#635224',[],'A fictional loyalty voucher. No airline miles are issued.'],
 ['tournament','Global Travel','Tournament Travel Voucher','Poker','GLOBAL','USD',200,200,'booking','Tournament','#384a4a',['Travel'],'A mock travel package for a tournament trip. No tournament entry or reservation is included.'],
 ['wellness','Daily Balance','Wellness Digital Pass','Lifestyle','GLOBAL','USD',15,15,'subscription','Daily Balance','#6a4855',[],'A fictional wellness membership for your daily routine.'],
 ['netflix-us','Netflix','Netflix US Gift Card','Streaming','US','USD',25,25,'digital_code','Netflix','#171318',['Gift Cards'],'A mock gift card for a US account.'],
 ['steam-us','Steam','Steam US Gift Card','Gaming','US','USD',20,20,'digital_code','STEAM','#233345',['Gift Cards'],'Gaming credit for a US account.']
];
const marketProducts=marketRows.map(([id,brand,name,category,country,currency,faceValue,walletPriceUSD,deliveryType,label,color,tags,description])=>({id,name,brand,category,country,currency,faceValue,walletPriceUSD,deliveryType,image:brandArtwork(label,color,['apple','airalo','google'].includes(id)?'#29323b':'#ffffff'),description,status:'available',tags,variants:[{label:currency==='BRL'?`R$ ${faceValue}`:`${deliveryType==='subscription'?'1 month · ':''}US$ ${faceValue}`,faceValue,walletPriceUSD}]}));
marketProducts.find(p=>p.id==='netflix').variants=[50,100,150,200].map(n=>({label:'R$ '+n,faceValue:n,walletPriceUSD:Math.round(n*.1872*100)/100}));
marketProducts.find(p=>p.id==='airalo').variants=[{label:'1 GB · Global · 7 days',faceValue:'1 GB Global',walletPriceUSD:4.50},{label:'5 GB · Global · 30 days',faceValue:'5 GB Global',walletPriceUSD:12},{label:'20 GB · USA · 30 days',faceValue:'20 GB USA',walletPriceUSD:21}];
const MarketCatalog={list:()=>marketProducts,get:id=>marketProducts.find(p=>p.id===id)};
const deliveryNames={digital_code:'Digital code',esim:'eSIM activation',license:'License key',subscription:'Subscription code',voucher:'Digital voucher',booking:'Booking voucher',account_credit:'Top-up voucher'};
const countryNames={BR:'Brazil 🇧🇷',US:'United States 🇺🇸',GLOBAL:'Worldwide 🌐'};
const travelCollections=[['eSIM','Stay connected anywhere','eSIM','globe'],['Flights','Book using your Wallet balance','flights','plane'],['Hotels','Pay directly with Wallet Global','hotels','hotel'],['Airport Lounges','Access lounges worldwide','lounges','lounge'],['Insurance','Travel protection','insurance','shield'],['Miles & Rewards','Airline miles and loyalty products','miles','star']];
