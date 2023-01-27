// ==UserScript==
// @name         click
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
		//クッキー自動クリック
		setInterval(window.Game.ClickCookie,4);

		//ゴールデンクッキー自動クリック
		const shimmer=document.getElementsByClassName('shimmer');
		setInterval(_=>{
			for(let i=0;i<shimmer.length;i++){
				shimmer[0].click();
			}
		},500);

		//砂糖自動クリック
		const lump=document.getElementById("lumps");
		setInterval(_=>{
			if(Date.now()-window.Game.lumpT>=window.Game.lumpRipeAge){
				lump.click();
			}
		},60000);

		//バフが2つ以上ある時Force the Hand of Fateをクリック
		//Game.buffTypesByNameが全バフタイプの一覧
		//const cps_buff_id=[0,1,3,9];
		//const click_buff_id=[6,7];
		const buff_id=[0,1,3,6,7,9];
		const spell=document.getElementById("grimoireSpell1");
		setInterval(_=>{
			let buff_cnt=0;
			for(let i in window.Game.buffs){
				if(buff_id.includes(window.Game.buffs[i].type.id)){
					buff_cnt++;
				}
			}
			if(buff_cnt>=2){
				spell.click();
			}
		},500);
	},10000);
}