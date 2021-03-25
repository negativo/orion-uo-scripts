 var WorldLocations = new Array();

    var maxSearchDistance = 5;
    for (i = (Player.X() - maxSearchDistance); i < (Player.X() + maxSearchDistance + 1); i++) {
        for (j = (Player.Y() - maxSearchDistance); j < (Player.Y() + maxSearchDistance + 0); j++) {
            if (Orion.ValidateTargetTile('mine', i, j)) {
                var coords = i+','+j;
                WorldLocations.push(coords);
            }
        }
    }



    var axe = '0x40B74273';
var lumbArea = 5;
var bankx = 2500;
var banky = 560;
Orion.Print("currently at: "+ Player.X()+" "+Player.Y());
var treeWorldLocation;
var emptyTrees = [];
treeWorldLocation = FindTreesInSurrArea();
function CutTreeByWorldLoc()
{
	Orion.ClearJournal();
	for(i=0;i<treeWorldLocation.length;i++){
		
		Orion.WalkTo(treeWorldLocation[i][0],treeWorldLocation[i][1],0);
		Orion.Wait(1000);
		mineAgain(treeWorldLocation[i][0],treeWorldLocation[i][1], i);
		
		if(Player.Weight() >=  Player.MaxWeight()){
			goBank();
			break;
		}
	}
	if(Player.Weight() >=  Player.MaxWeight()){
			goBank();
		
	}else{
		while(treeWorldLocation.length === 0){
			treeWorldLocation = FindTreesInSurrArea();
		    if(treeWorldLocation.length === 0){
				lumbArea += 5;
			}else{
				lumbArea = 5;
			}
		}
		CutTreeByWorldLoc();
	}
}

function isNotEmptyTree(i,j){
	if(emptyTrees.length === 0){
		return true;
	}

	for(var k=0; k < emptyTrees.length; k++){
		var curr = emptyTrees[k];
		if(curr[0] === i && curr[1] === j){
			return false;
		}
	}

	return true;
}

function moveLogs(){
	
   var log1 = Orion.FindType('0x1BDD','0x04A9',backpack);
 var log2 = Orion.FindType('0x1BDD','0x047F',backpack);
 var log3 = Orion.FindType('0x1BDD','0x0000',backpack);
 
    Orion.MoveItem(log1, -1, '0x40A02F51');
    Orion.MoveItem(log2, -1, '0x40A02F51');
    Orion.MoveItem(log3, -1, '0x40A02F51');

}
function goBank(){
	
 var posx = Player.X();
 var posy = Player.Y();
  Orion.WalkTo(bankx,banky,0);

  var px = Player.X();
  var py = Player.Y();
  while((px < bankx - 1 || px > bankx + 1) && (py < banky - 1 || py > banky + 1 )){

  		px = Player.X();
  		py = Player.Y();
  		Orion.WalkTo(bankx,banky,0);
  }
  Orion.Say("bank");
  Orion.Wait(2000);
  moveLogs();
  Orion.Wait(2000);
  Orion.WalkTo(posx,posy,0);
  px = Player.X();
  py = Player.X();

  	  while((px < posx - 1 || px > posx + 1) && (py < posy - 1 || py > posy + 1 )){

  }
  CutTreeByWorldLoc();
}


function FindTreesInSurrArea()
{	
	var maxSearchDistance=lumbArea;
	var treeWorldLocations=createArr(50,50);
	var trueWorldLocCounter=0;
	
	for(i=(Player.X()-maxSearchDistance);i<(Player.X()+maxSearchDistance+1);i++){
		for(j=(Player.Y()-maxSearchDistance);j<(Player.Y()+maxSearchDistance+1);j++){
			//Orion.Print("Searching X= " + i + "and Y= " + j + " location");
			if(Orion.ValidateTargetTile('mine', i, j) && isNotEmptyTree(i, j)){
				Orion.Print("Found a tree, location is saved as " + (trueWorldLocCounter+1));
				treeWorldLocations[trueWorldLocCounter]=[];
				treeWorldLocations[trueWorldLocCounter][0]=i;
				treeWorldLocations[trueWorldLocCounter][1]=j;
				trueWorldLocCounter++;
			}	
		}
	}
	treeWorldLocations.length=trueWorldLocCounter;
	return treeWorldLocations;
}

function createArr(x, y) {
    var arr = new Array(x);

    for (var i = 0; i < x; i++) {
        arr[i] = new Array(y);
    }

    return arr;
}

function mineAgain(x,y,i){
	var text = 'there is no metal|not enough wood|That is too far away|no line of sight|place any wood into|cannot be seen';
	while(Player.Hits()<100){
		if(Player.Poisoned()){
			Orion.Disarm();
			Orion.UseType('0x0F07', '0xFFFF');
			Orion.Equip('0x40FE7288');
		}
				Orion.Equip('0x40FE7288');
		Orion.UseType('0x0E21', '0xFFFF');
		if (Orion.WaitForTarget(1000)){
			Orion.TargetObject('self');	
		}
		Orion.Wait(4000);
	}
	while (!Player.Dead()){
		while(Player.Hits()<100){
			if(Player.Poisoned()){
				Orion.Disarm();
				Orion.UseType('0x0F07', '0xFFFF');
				Orion.Equip('0x40FE7288');
			}Orion.Equip('0x40FE7288');
			Orion.UseType('0x0E21', '0xFFFF');
				
			if (Orion.WaitForTarget(1000)){
				Orion.TargetObject('self');	
			}
			Orion.Wait(4000);
		}
		Orion.UseType('0x0E86', '0xFFFF');
		Orion.WaitTargetTile('mine',x,y,0);
		var msg = Orion.WaitJournal(text, Orion.Now(), Orion.Now() + 5000, 'sys|my');
		if(msg !=null){	
			Orion.Print("Removing tree " + treeWorldLocation.length);
			emptyTrees.push([x,y]);
			treeWorldLocation.splice(i, 1);
			Orion.Print("Tree removed " + treeWorldLocation.length);
			break;
		}
		Orion.Wait(3500);
	}
	Orion.ClearJournal();
}