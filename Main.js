
function Game(level){
	this.level=level;
	this.relationship=[];
	player=new Player(this.level*this.level,level-1,level-1);
	for(i=0;i<=this.level;i++){
		this.relationship.push([])
	}
	rand=[];
	Nodup={};
	while(rand.length<this.level*this.level-1){
		n=parseInt(Math.random()*this.level*this.level)
		if(n in Nodup || n==0)
			continue;
		rand.push(n);
		Nodup[n]=n;
	}
	control=0;
	for(i=0;i<this.level;i++){
		for(j=0;j<this.level;j++){
			this.relationship[i][j]=rand[control];
			control++;
		}
	}
	this.relationship[level-1][level-1]=player;
	
}


Game.prototype.checkWin=function(){
		counter=0;
		for(i=0;i<this.level;i++){
			for (j=0;j<this.level;j++){
				counter++;
				if(i==this.level-1 && j==this.level-1)
					continue
				if (this.relationship[i][j]!=counter)
					return false
			}
		}
		return true;
}

Game.prototype.play=function(first,second){
	temp=this.relationship[first[0]][first[1]];
	temp2=second.pos;
	second.pos=[first[0],first[1]];
	this.relationship[first[0]][first[1]]=second;
	this.relationship[temp2[0]][temp2[1]]=temp;
	//print(second.pos,temp.pos,first,second)
	
}

function Player(n,x,y){
	this.val=n;
	this.pos=[x,y];
	this.type="Player";
}

function Elem(name,id,className){
	neww = document.createElement(name);
	if (id){neww.id=id}
	if(className){neww.className=className}
	return neww;
}

function DrawBackground(){
	if (background && background.parentNode)
		document.body.removeChild(background);
	allParent=Elem('table','background','background');
	allParent.style.width=game.level*100 +"px";
	allParent.style.height=game.level*100 +"px";
	for(i=0;i<this.game.level;i++){
		row=Elem("tr",i.toString(),i.toString())
		for (j=0;j<game.level;j++){
			if (typeof game.relationship[i][j] !=typeof 1){
				cell=Elem("div",null,"allDiv")
				cell.style.color="white"
				col=Elem("th","unique");
				col.style.height=50 +"px";
				col.appendChild(cell);
				current=[i,j];
				row.appendChild(col);
				continue
			}
			cell=Elem("div",null,'allDiv')
			cell.innerHTML=game.relationship[i][j];
			col=Elem("th");
			col.style.height=50 +"px";
			col.appendChild(cell);
			row.appendChild(col);
		}
		allParent.appendChild(row)
	}
	background=allParent;
	document.body.appendChild(background)
}



addEventListener("keydown",function(event){
	ok=false;
	if (event.keyCode==37){
		if(current[1]-1>=0){
		game.play([current[0],current[1]-1],game.relationship[current[0]][current[1]])
		document.body.removeChild(background);
		ok=true;
		}else{
			alert("Wrong direction")
		}
	}else if(event.keyCode==38){
		if(current[0]-1>=0){
		game.play([current[0]-1,current[1]],game.relationship[current[0]][current[1]])
		document.body.removeChild(background);
		ok=true;
		}else{
			alert("Wrong direction")
		}
	}else if(event.keyCode==39){
		if (current[1]+1<game.level){
		game.play([current[0],current[1]+1],game.relationship[current[0]][current[1]])
		document.body.removeChild(background);
		ok=true;
		}else{
			alert("Wrong direction")
		}
	}else if(event.keyCode==40){
		if(current[0]+1<game.level){
		game.play([current[0]+1,current[1]],game.relationship[current[0]][current[1]])
		document.body.removeChild(background);
		ok=true;
		}else{
			alert("wrong direction")
		}
	}
	if(ok){
		statusOfGame=game.checkWin();
		RunGame(game.level,statusOfGame,time)
		timeNode=document.getElementById('time');
		timeNode.innerHTML=Time();
	}
});
refresh=document.getElementById('refresh')
refresh.addEventListener("click",function(){
	document.body.removeChild(background);
	time=curTime;
	init(game.level);
})
function RunGame(n,statuss,time){
	if (n==15){
		alert("You have completed this game")
		time=50;
		curTime=time;
		init(4);
	}else if(statuss==true){
		alert("proceed to the next level")
		time=curTime+300;
		curTime=time;
		init(n+1);
	}else if (statuss==false){
		DrawBackground();
	}
}

function init(n){
	clearInterval(clock);//recursion; should clear any prevously setinterval
	time=curTime;
	game=new Game(n);
	h=game.relationship[n-1][n-1]
	current=null;
	background=null;
	DrawBackground();
	timeInterval()
}

function printer(arg){
	//debuger
	counter=0;
	for(i=0;i<3;i++)
		print(game,counter++)
}

function Time(){
	var minutes,seconds;
	minutes=parseInt(time/60);
	seconds=time%60;
	if (minutes==0 && seconds==0)
		return false
	return minutes.toString()+" : "+seconds.toString();
}

function timeInterval(){
		var timeStat
	    clock=setInterval(function(){
		time--;
		timeNode=document.getElementById('time');
		timeStat=Time();
		if(!timeStat){
			clearInterval(clock);
			time=curTime;
			document.body.removeChild(background);
			alert("Time up ::restart")
			time=curTime;
			init(game.level);
		}
		if(timeStat){
			timeNode.innerHTML=timeStat
		}else{
			timeNode.innerHTML="00:00";
		}	
	},1500);
}
function paused(){
	alert("paused")
}
document.getElementById("pause").addEventListener("click",function(){
	paused();
});
// initial declaration
time=50;
game=new Game(2);
current=null;
background=null;
DrawBackground();
curTime=time;
timeInterval();
