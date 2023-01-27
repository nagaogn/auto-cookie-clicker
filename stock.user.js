// ==UserScript==
// @name         stock
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
		const bankNum=17;
		// const buyMaxPrice=[5,5,5,5,5,5,10,10,10,10,10,10,20,20,20,50,100];
		const buyMaxPrice=Array(17).fill(5);
		const sellAllPrice=[130,130,130,140,140,140,160,160,160,170,170,170,180,180,180,190,200];
		const row_5=document.getElementById("row5").classList;
		setInterval(_=>{
			if(row_5.contains("onMinigame")&&!row_5.contains("muted")){
				for(let i=0;i<bankNum;i++){
					let price=document.getElementById('bankGood-'+i+'-val').textContent.slice(1);
					if(price<buyMaxPrice[i]){
						document.getElementById('bankGood-'+i+'_Max').click();
					}else if(price>sellAllPrice[i]){
						document.getElementById('bankGood-'+i+'_-All').click();
					}
				}
			}
		},60000);
	},10000);
}