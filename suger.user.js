// ==UserScript==
// @name         suger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://orteil.dashnet.org/cookieclicker/
// @icon         https://orteil.dashnet.org/cookieclicker/img/favicon.ico
// @grant        none
// ==/UserScript==

{
	'use strict';
	setTimeout(_=>{
		//バフが3つ以上ある場合ゲージを回復
		const buff_id=[0,1,3,6,7,9];
		const lumps_amount=document.getElementById("lumpsAmount");
		const refill=document.getElementById("grimoireLumpRefill");
		const anchor=document.getElementById("promptAnchor");
		setInterval(async _=>{
			let buff_cnt=0;
			for(let i in window.Game.buffs){
				if(buff_id.includes(window.Game.buffs[i].type.id)){
					buff_cnt++;
				}
			}
			if(buff_cnt>=3){
				if(lumps_amount.textContent>100){
					refill.click();
					await new Promise(resolve=>setTimeout(resolve,1000));
					if(anchor.style.display=="block"){
						document.getElementById("promptOption0").click();
					}
				}
			}
		},1500);
	},10000);
}