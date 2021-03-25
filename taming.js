var mobileID;
var bettle = '0x001EEB37';
var lastexplo = 0;
var chars = {
	'Fervus': false,
	'Axias': false,
	'Aotkpta': true,
	'Demerzel': false,
	'Daneel Olivaw': false,
	'Aulin': false,
	'Josh Scogin': false
};

var isTwoHanded = chars[Player.Name()];
 function main(){
	while(true){
	
	//var target = Orion.FindType('any', '-1', ground, 'fast|mobile|live', 10, 'red|grey|gray');
	//Orion.Attack(target);
	
			//deposit();
		
		armMe();
		healMe();
		if(!mobileID || !Orion.ObjectExists(mobileID)){
			TargetNext();
		}else{
			//Orion.Follow(mobileID);
			Orion.Attack(mobileID);
			Orion.Wait(300);
			//shouldThrowPotion();
		}
		Orion.Wait(200);
		healMe();
		
		Orion.Wait(200);
	
	}
}

function shouldThrowPotion(){
    if(lastexplo < Date.now() - 5000){
		var ene = Orion.FindObject(mobileID);
		Orion.Print(ene.Hits());
		if( ene.Hits()*4 < 100){
			
			explo();
			lastexplo = Date.now();
		}
	}
}

function explo(){

	var allPotions=Orion.FindType('0x0F0D', '-1', 'self', true);
	var potion = allPotions[0];
     Orion.Wait(150);
     Orion.UseObject(potion);

     while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +3300, 'sys|my')){
      
    }
    Orion.Wait(650);
    Orion.TargetObject(lasttarget);
    Orion.Wait(250);
}

function armMe(){
	if(isTwoHanded){
 		Orion.Wait(1000);
    	Orion.Dress(Player.Name());
    	
        if(Player.Name() == 'Demerzel'){
        	Orion.Wait(400);
        }
    }
}
function disarmMe(){
	if(isTwoHanded){
        Orion.Disarm();
        if(Player.Name() == 'Demerzel'){
        	Orion.Wait(400);
        }
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
    if(Player.Hits() < 60){
       disarmMe();
		Orion.UseType('0x0F0C', '0xFFFF');//heal pot
 		armMe();
	}
	
    if(Player.Hits() < Player.MaxHits()){
			 Orion.UseType('0x0E21', '0xFFFF');
   		 	 Orion.WaitForTarget(300);
       		 Orion.TargetObject('self'); 
			Orion.Wait(1000);
	}	
    if(Player.Stam() < Player.MaxStam() / 2  ){
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
function TargetNext(){ 
    
        Orion.IgnoreReset();
        //mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself", 8, "gray|criminal|orange|red|green");
        mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself|ignorefriends", 8, "gray|criminal|orange|red");
        if (mobileID.length){
           // Orion.Follow(mobileID);
            Orion.CharPrint(mobileID, 65, 'Target Found');
           Orion.TargetObject(mobileID);
           Orion.ClientLastTarget(mobileID);
            Orion.Attack(mobileID);
			Orion.Wait(300);
			//shouldThrowPotion();
           // Orion.Ignore(mobileID);
            return;
        }
   
    
    Orion.Print("No enemies");
}