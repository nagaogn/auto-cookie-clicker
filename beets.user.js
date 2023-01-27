// ==UserScript==
// @name         beets
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
		const plant_icon=document.getElementsByClassName("gardenTileIcon");
		const row_2=document.getElementById("row2").classList;
		const cps_buff_id=[0,1,3,9];

		//雑草を抜く
		//Queenbeetと,matureじゃないJuicy Queenbeet以外は雑草
		const removeWeeds=_=>{
			for(let y=0;y<6;y++){
				for(let x=0;x<6;x++){
					if(plant_icon[y*6+x].style.display=="block"){
						let plant_icon_y=plant_icon[y*6+x].style.backgroundPositionY;
						let plant_icon_x=plant_icon[y*6+x].style.backgroundPositionX;
						if(!(plant_icon_y==-17*48+"px"||plant_icon_y==-18*48+"px"&&!(plant_icon_x==-4*48+"px"))){
							document.getElementById("gardenTile-"+x+"-"+y).click();
						}
					}
				}
			}
		}

		//CpSバフの数を返す
		const getCpsBuffCnt=_=>{
			let cps_buff_cnt=0;
			for(let i in window.Game.buffs){
				if(cps_buff_id.includes(window.Game.buffs[i].type.id)){
					cps_buff_cnt++;
				}
			}
			return cps_buff_cnt;
		}

		//畑の状態を返す
		//exist:Queenbeetを植える場所にすでに作物が存在するか
		//can_bread:Juicy Queenbeetが作成可能か
		//can_breed_area:Juicy Queenbeetが作成可能な区画[boolean,boolean,boolean,boolean]
		//is_growing_area:matureでないQueenbeetがある区画[boolean,boolean,boolean,boolean]
		const getGardenState=_=>{
			let can_breed=false;
			let exist=false;
			let can_breed_area=new Array(4).fill(false);
			let is_growing_area=new Array(4).fill(false);
			for(let i=0;i<4;i++){
				let center_exist=false;
				let beet_mature_cnt=0;
				for(let y=Math.floor(i/2)*3;y<Math.floor(i/2)*3+3;y++){
					for(let x=i%2*3;x<i%2*3+3;x++){
						if(x!=1&&x!=4||y!=1&&y!=4){
							if(plant_icon[y*6+x].style.display=="block"){
								exist=true;
								let plant_icon_y=plant_icon[y*6+x].style.backgroundPositionY;
								let plant_icon_x=plant_icon[y*6+x].style.backgroundPositionX;
								if(plant_icon_y==-17*48+"px"){
									if(plant_icon_x==-4*48+"px"){
										beet_mature_cnt++;
									}else{
										is_growing_area[i]=true;
									}
								}
							}
						}else{
							if(plant_icon[y*6+x].style.display=="block"){
								center_exist=true;
							}
						}
					}
				}
				if(!center_exist){
					if(beet_mature_cnt==8){
						can_breed=true;
						can_breed_area[i]=true;
					}
				}
			}
			return [exist,can_breed,can_breed_area,is_growing_area];
		}

		//雑草を抜く,Juicy Queenbeetを収穫する,Queenbeetを植える,土を変える
		setInterval(async _=>{
			if(row_2.contains("onMinigame")&&!row_2.contains("muted")){
				removeWeeds();
				await new Promise(resolve=>setTimeout(resolve,1000));
				let [exist,can_breed,,]=getGardenState();
				//規定の場所に作物が無い,且つCpSバフが無い場合Queenbeetを植える
				if(!exist){
					if(getCpsBuffCnt()<=0){
						for(let y=0;y<6;y++){
							for(let x=0;x<6;x++){
								if(x!=1&&x!=4||y!=1&&y!=4){
									document.getElementById("gardenSeed-20").click();
									document.getElementById("gardenTile-"+x+"-"+y).click();
								}
							}
						}
					}
				}
				//Juicy Queenbeetが作成可能な場合は土をWood Chipsに,そうでない場合はFertilizerにする
				if(can_breed){
					document.getElementById("gardenSoil-4").click();
				}else{
					document.getElementById("gardenSoil-1").click();
				}
			}
		},60000);

		//Queenbeetを収穫する
		setInterval(async _=>{
			if(row_2.contains("onMinigame")&&!row_2.contains("muted")){
				let cps_buff_cnt=getCpsBuffCnt();
				//CpSバフが3つ以上ある場合,matureのQueenbeetを全部収穫する
				if(cps_buff_cnt>=3){
					for(let y=0;y<6;y++){
						for(let x=0;x<6;x++){
							if(plant_icon[y*6+x].style.display=="block"){
								let plant_icon_y=plant_icon[y*6+x].style.backgroundPositionY;
								let plant_icon_x=plant_icon[y*6+x].style.backgroundPositionX;
								if(plant_icon_y==-17*48+"px"&&plant_icon_x==-4*48+"px"){
									document.getElementById("gardenTile-"+x+"-"+y).click();
								}
							}
						}
					}
				}
				//CpSバフが2つ以上あり,かつJuicy Queenbeetが作れない場合,matureのQueenbeetを収穫する.これは区画ごとに行う.
				else if(cps_buff_cnt>=2){
					//雑草を抜いてから
					removeWeeds();
					await new Promise(resolve=>setTimeout(resolve,1000));
					let [,,can_breed_area,is_growing_area]=getGardenState();
					for(let i in can_breed_area){
						if(!can_breed_area[i]){
							if(!is_growing_area[i]){
								for(let y=Math.floor(i/2)*3;y<Math.floor(i/2)*3+3;y++){
									for(let x=i%2*3;x<i%2*3+3;x++){
										if(x!=1&&x!=4||y!=1&&y!=4){
											if(plant_icon[y*6+x].style.display=="block"){
												let plant_icon_y=plant_icon[y*6+x].style.backgroundPositionY;
												let plant_icon_x=plant_icon[y*6+x].style.backgroundPositionX;
												if(plant_icon_y==-17*48+"px"&&plant_icon_x==-4*48+"px"){
													document.getElementById("gardenTile-"+x+"-"+y).click();
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},5000);
	},10000);
}