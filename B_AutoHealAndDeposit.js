//auto cure
var lastheal = 0;
var lastbandage = 0;
var bettle = '0x001EEB37';
var chars = {
	'Fervus': false,
	'Axias': true,
	'Aotkpta': true,
	'Demerzel': true,
	'Daneel Olivaw': false,
	'Aulin': false,
	'Josh Scogin': false
};

var isTwoHanded = chars[Player.Name()];

function main(){
     Orion.Print(Player.Name());
	 while(true) {
		    healMe();
		    //deposit();
  		    Orion.Wait(1000);
		
    }
}
function armMe(){
	if(isTwoHanded){
 		Orion.Wait(1000);
    	Orion.Dress(Player.Name());
    }
}
function disarmMe(){
	if(isTwoHanded){
        Orion.Disarm();
    	Orion.Wait(300);
	}
}
function healMe(){    
    if(Player.Poisoned()){
       disarmMe();
		Orion.UseType('0x0F07', '0xFFFF');// cure pot
 		armMe();
 		Orion.Wait(500);
	}
    if(Player.Hits() < 60 && lastheal < Date.now() - 10000 ){
       disarmMe();
		Orion.UseType('0x0F0C', '0xFFFF');//heal pot
		lastheal = Date.now();
 		armMe();
	}
	
    if(Player.Hits() < Player.MaxHits() && lastbandage < Date.now() - 4000){
			 Orion.UseType('0x0E21', '0xFFFF');
   		 	 Orion.WaitForTarget(300);
       		 Orion.TargetObject('self'); 
			Orion.Wait(1000);
			Orion.CancelTarget();
			lastbandage = Date.now();
	}	
    if(Player.Stam() < Player.MaxStam() / 3 ){
       disarmMe();
		Orion.UseType('0x0F0B', '0xFFFF');// refresh pot
 		armMe();
	}
}

function deposit(){
	if (Player.Weight() > 340) {
	   	Orion.UseObject('self');
		Orion.Wait(350);
	   	var gold = Orion.FindType('0x0EED', '0xFFFF',backpack); //gold
		Orion.Wait(350);
	    Orion.MoveItem(gold, -1, bettle);
		Orion.Wait(1000);
		Orion.UseObject(bettle);
	}
}