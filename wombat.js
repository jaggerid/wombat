const API_KEY = ""; //2captcha API
var IS_ALERT = true; // ignore below token, channel, etc if IS_ALERT = false
var TOKEN_ID =  "";// your alt, https://pcstrike.com/how-to-get-discord-token/ 
var CHANNEL_ID =  "";// last ID in the URL, when you DM your main account, e.g. 936723814543409173; https://discord.com/channels/936714568137330708/936723814543409173
/////////////////////////////////////////////////
//////// DO NOT CHANGE THE VALUE BELOW //////////
/////////////////////////////////////////////////
var WAM_ADDRESS = '';
var inClan = true;
var is_running = true;
var IN_SEND = false;
var HAS_REQUEST = false;
var paused = false;
var captchaDone = false;
var IS_CANDY = true;
var CANDY_RETRIES = 0;
var WOMBAT_STUCK_CLAIM = 0;
var WOMBAT_RETRIES = 0;
var SUPER_STUCK = 0;
var run_counter = 0;
var captcha_counter = 0;
 

if(API_KEY == '' || (IS_ALERT && TOKEN_ID == '') || (IS_ALERT && CHANNEL_ID == '')) alert("Fill api key/token id/channel id first")
async function manualRun(chest = false){
	let captcha_token;
	while(IN_SEND){
		var send_home = document.querySelector('.btn--secondary');
		var send = document.querySelector('.nfts-hidden__send-wombat-btn');
		var timer = document.querySelector('.in-dungeon__timer-section-timer');
		var claim = document.querySelector('.claim-reward__btn');
		if (IS_CANDY) {
			var candy = document.querySelector('.confirm-send-wombat-with-claimable-candy-modal__btn');
		}
		else {
			var candy = document.querySelector('.confirm-send-wombat-with-claimable-candy-modal__btn--reject');
		}
		SUPER_STUCK = SUPER_STUCK + 1;

		if(SUPER_STUCK > 300){
			await discordMessage(TOKEN_ID, CHANNEL_ID, WAM_ADDRESS + ". Stuck bruh")
			let totalCaptchas = document.querySelectorAll('[title="recaptcha challenge expires in two minutes"]');
			if(totalCaptchas.length > 0){
				totalCaptchas.forEach(value=>{
					value.parentNode.parentNode.remove();
				})
			}
			await checkReward()
			SUPER_STUCK = 0;
			WOMBAT_RETRIES = 0
			captchaDone = false;
		}
		
		if(candy){
			CANDY_RETRIES = CANDY_RETRIES + 1;
			if(CANDY_RETRIES > 5) {
				if(document.querySelector('.popup__overlay')){
					document.querySelector('.popup__overlay').click();	
					await delay(5000);
					CANDY_RETRIES = 0;
				}
			}
			else{
				candy.click();
			}
			// console.log("candy")
		}
		else if(document.querySelector('.popup__container') && document.querySelector('.reward-treasure-popup__no-reward-btn')){ //Grab Points & Packs
			if(document.querySelector('.btn.reward-treasure-popup__no-reward-btn.btn--primary.btn--primary-without-arrow').innerHTML.includes('Grab it!')){
				await discordMessage(TOKEN_ID,CHANNEL_ID)
				console.log(document.querySelector('.reward-treasure-popup__reward-desc').innerText)
				document.querySelector('.reward-treasure-popup__no-reward-btn').click();
				run_counter = run_counter - 1
			}
		} 
		else if(document.querySelector('.error-view__btn')){
			let errorTitle = document.querySelector('.error-view__title');
			let errorDesc = document.querySelector('.error-view__desc');
			console.log("error: " + errorTitle.innerText)
			if(errorTitle && errorTitle.innerText.includes("browser")){
				document.querySelector('.error-view__btn').click()
				document.querySelector('.header__logo').click();
				IN_SEND = false;
				break
			}
			else if(errorDesc && errorDesc.innerText.includes("already claimed")){
				await doTrip(false, '', false)
			}
			else{
				document.querySelector('.error-view__btn').click()
			}
		}
		else if(document.querySelector('.reward-treasure__text') && document.querySelector('.reward-treasure__text').innerHTML.includes('TAP HERE')){ 
			let findReward = true;
			setTimeout(function(){findReward = false}, 60000)
			document.querySelector('.reward-treasure__text').parentElement.click();
			console.log("waiting chest to open")
			while(!document.querySelector('.popup__container') && !document.querySelector('.reward-treasure-popup__no-reward-btn')){
				await delay(100)
				if(!findReward) break
			}
			if(!findReward){
				console.log("fail to locate chest")
				run_counter = run_counter - 1
				await checkReward(false)
			}
			else{
				console.log("chest opened")
				let reward = WAM_ADDRESS + " : " + document.querySelector('.reward-treasure-popup__reward-desc').innerText;
				if(document.querySelector('.reward-treasure-popup__no-reward-btn')){
					await discordMessage(TOKEN_ID, CHANNEL_ID, reward)
					document.querySelector('.reward-treasure-popup__no-reward-btn').click();
					console.log(document.querySelector('.reward-treasure-popup__reward-desc').innerText)
					run_counter = run_counter - 1
					await checkReward(false)
				}
			}
			chest = false
		}
		else if(document.querySelector('.claim-level__btn')){ //claim level
			document.querySelector('.claim-level__btn').click();
			console.log("levelup")
		}
		else if(claim){
			WOMBAT_STUCK_CLAIM = WOMBAT_STUCK_CLAIM +1;
			claim.click();
			if (WOMBAT_STUCK_CLAIM > 3) { //unstuck in claim reward/every mining
				await doTrip(false, '', false)
				WOMBAT_STUCK_CLAIM = 0;
			}
			// console.log("claim")
		}
		else if(timer){
			if (document.querySelectorAll('[title="recaptcha challenge expires in two minutes"]').length > 0){
				document.querySelectorAll('[title="recaptcha challenge expires in two minutes"]')[0].parentNode.parentNode.remove();
			}
			
			SUPER_STUCK = 0;
			WOMBAT_RETRIES = 0
			captchaDone = false;
			document.querySelector('.header__logo').click();
			if(!HAS_REQUEST){
				requestHelp();
			}
			
			IN_SEND = false;
			break
		}
		else if(send && !chest){
			HAS_REQUEST = false;
			if(document.querySelector('.nfts-hidden__send-wombat-btn.btn--disabled')) { // go to homepage
				WOMBAT_RETRIES = WOMBAT_RETRIES + 1;
				if(WOMBAT_RETRIES > 5 && !captchaDone){
					captcha_counter = captcha_counter + 1;
					captcha_token = await solvingCaptcha()
					captchaDone = true;
					WOMBAT_RETRIES = 0;
				}
				else if(WOMBAT_RETRIES > 5 && captchaDone){
					document.querySelector('.header__logo').click();
					// doTrip(true, captcha_token)
					WOMBAT_RETRIES = 0;
				}
			}
			else{
				WOMBAT_STUCK_CLAIM = 0;
				WOMBAT_RETRIES = 0;
				send.click();
				await delay(10000)
			}
		}
		else if(send_home){
			send_home.click()
		}
		else{
			// console.log("?");
		}
		await delay(5000)
	}
	run_counter = run_counter + 1
	console.log("run: " + run_counter)
	console.log("Captcha encounter rate " + captcha_counter + "/" + run_counter + " = " + captcha_counter/run_counter*100 + "%")
}

async function doTrip(captcha = false, token = '', manual = true){
	try{
		let headers = {
			"headers": {
				"content-type": "application/json",
			},
			"credentials": "include",
			"body": "{\"durationMinutes\":5}",
			"method": "POST",
		}
		if(captcha){
			headers.headers["x-gc-token"] = token;
		}
		let trip = await fetch("https://api.dungeon.wombat.app/user/dungeon/trip", headers)
		.then(async res => {
			if(res.status == 200) return res.json()
			if(res.status == 244){
				inClan = true;
				paused = true;
				IN_SEND = true;
				if(manual) await manualRun()
				if(!manual) await solvingCaptcha()
				paused = false;
				return true
			}
			
			if(!res.ok) return false
		})
		
		if(!trip || (trip.code && trip.code != "OK")) return false
		
		return true
	} catch(err){
		console.log(err)
		await delay(5000)
		await doTrip(captcha, token, manual)
	}
}

async function getTrip(){
	let nextTrip = 30000;
	try{
		let lastRun = await fetch("https://api.dungeon.wombat.app/user/dungeon/trip/last", {
			"credentials": "include",
		})
		.then(async res => {
			if(res.status == 200) return res.json()
			
			if(!res.ok) return false
		})
		
		if(!lastRun) return 0
		
		nextTrip = lastRun.endsAt + 10000 - Date.now();
		return nextTrip
	} catch(err){
		console.log(err)
		await delay(5000)
		nextTrip = await getTrip()
		return nextTrip
	}
}

async function delay(ms = 1000) {
    return new Promise((r) => setTimeout(r, ms));
}

async function solvingCaptcha(){
	console.log("solving captcha: " + captcha_counter)
	let response;
	let fail = false;
	let fetchurl = "https://2captcha.com/in.php?key=" +  API_KEY + "&invisible=1&soft_id=3428&json=1&method=userrecaptcha&googlekey=6LdGt4geAAAAAFaiitJYG4E7GPfcVJSQ9vs0QYIb&pageurl=https://dungeon.wombat.app/dungeon&header_acao=1"
	let req = await fetch(fetchurl).then(res=>res.json())
	setTimeout(function(){fail = true}, 180000)
	while(!response){
		var answer = await fetch("https://2captcha.com/res.php?action=get&id=" + req.request + "&key=" +  API_KEY + "&json=1&header_acao=1").then(res=>res.json())
		if(answer.status == !0){
			response = answer.request;
			break
		}
		if(fail) break
		await delay(2500)
	}
	console.log("captcha done")
	if(fail) return
	await doTrip(true, response)
	return response
}

async function begin(){
	console.log("starting")
	while(is_running){
		let date = new Date();
		if(date.getHours() == 7 && date.getMinutes() < 10){
			IN_SEND = true;
			// console.log("finding chest")
			await manualRun(true)
			// console.log("chest claimed")
		}
		else if(!paused){
			let nextTrip = await getTrip()
			if(nextTrip < 0) await delay(30000)
			await delay(nextTrip)
			await doTrip()
			if(inClan) await requestHelp()
		}
		if(document.querySelector('.header__logo')){
			document.querySelector('.header__logo').click();
		}
		if (document.querySelectorAll('[title="recaptcha challenge expires in two minutes"]').length > 0){
			document.querySelectorAll('[title="recaptcha challenge expires in two minutes"]')[0].parentNode.parentNode.remove();
		}
		// console.log("repeat")
	}
	console.log("out")
}

async function discordMessage(token, channel, message) {
    let min = 900000000000000000;
    let max = 999999999999999999;
    let nonce = Math.floor(Math.random() * (max - min) + min);
	
	let MESSAGE_API_URL = "https://discord.com/api/v9/channels/" + channel + "/messages";

    if(!message) message = WAM_ADDRESS + " : " + document.querySelector('.reward-treasure-popup__reward-desc').innerText; //to be cleaned
	
    messagePayload = {
        "content": message,
        "nonce": nonce,
        "tts": false
    }
    
    let headerData = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": token,
    }
	
	let timer = Math.floor(Math.random() * 180000) + 3000;
	setTimeout(function(){
		fetch(MESSAGE_API_URL, {
			method: "POST",
			headers: headerData,
			body: JSON.stringify(messagePayload),
		})
	}, timer)
}

function getAddress(){
	fetch("https://api.dungeon.wombat.app/user/data", {
		"credentials": "include",
	})
	.then(res=>res.json())
	.then(values=>{
		WAM_ADDRESS = values.wax.account;
	})
}

function helpingClan(){
	if(!inClan) return
	
	fetch("https://api.dungeon.wombat.app/clan/help/requests", {
		"credentials": "include",
	})
	.then(res=>res.json())
	.then(values=>{
		if(values.code!=null) return
		values.forEach(value=>{
			fetch("https://api.dungeon.wombat.app/clan/help/respond", {
					"credentials": "include",
					"headers": {
						"content-type": "application/json",
					},
					"body": JSON.stringify({"requesterUserId":value.requesterUserId,"dungeonTripId":value.dungeonTripId}),
					"method": "POST",
				});
		})
	})
}

function requestHelp(){
	if(!inClan) return
	
	let members = [];
	fetch("https://api.dungeon.wombat.app/clan", {
		"credentials": "include",
	})
	.then(res=>res.json())
	.then(values=>{
		if(values.code!=null){
			inClan = false;
			return
		}
		members.push(values.leader)
		values.members.forEach(value=>members.push(value))

		let request = members.filter(value=>value.helpRequestStatus=="CAN_REQUEST")
		request.forEach(value => {
			fetch("https://api.dungeon.wombat.app/clan/help/request", {
				"credentials": "include",
				"headers": {
					"content-type": "application/json",
				},
				"body": JSON.stringify({"targetUserId":value.userId}),
				"method": "POST",
			});
			HAS_REQUEST = true;
		})
	})
}

async function checkReward(claim = true){
	try{
		let lastRun = await fetch("https://api.dungeon.wombat.app/user/dungeon/trip/last", {
			"credentials": "include",
		})
		.then(async res => {
			if(res.status == 200) return res.json()
			
			if(!res.ok) return false
		})
		
		if(claim && lastRun && lastRun.reward && !lastRun.reward.claimed){
			await claimReward()
		}
		else if(!claim && lastRun && lastRun.reward){
			console.log(lastRun.reward)
		}
	} catch(err){
		console.log(err)
		await delay(5000)
		await checkReward(claim)
	}
}

async function claimReward(){
	try{
		var rewards = await fetch("https://api.dungeon.wombat.app/user/dungeon/reward/claim", {
			"credentials": "include",
			"body": "{}",
			"method": "POST",
		})
		.then(res=>res.json())
		let point = rewards.claimedPoints || 0;
		let nfts = ' and ';
		if(rewards.claimedNfts){
			rewards.claimedNfts.forEach((value, index) =>{
				if(index == rewards.claimedNfts.length-1) return nfts = nfts.concat(value.name)
				nfts = nfts.concat(value.name, ", ")
			})
		}
		reward = point + " points" + nfts;
		let message = WAM_ADDRESS + " : " + reward
		if(point !=0){
			discordMessage(TOKEN_ID, CHANNEL_ID, message)
		}
	} catch(err){
		console.log(err)
		await delay(5000)
		await claimReward()
	}
}

await requestHelp();
await getAddress();
let run = setInterval(helpingClan, 15000);
await begin()
