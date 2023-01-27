// ==UserScript==
// @name         fortune
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
		const fortune=document.getElementsByClassName('fortune');
		const ticker=document.getElementById("commentsText1");
		setInterval(_=>{
			if(fortune.length>0){
				ticker.click();
			}
		},500);
	},10000);
}