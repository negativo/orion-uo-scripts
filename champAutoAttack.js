var mobileID;
var lastexplo = 0;
var bettles = {
	'MilkLizard': '0x002D7F15',
	'Axias': false,
	'Aulin': false,
	'Josh Scogin': '0x000CBAA9',
	'Lord Josh Scogin': '0x000CBAA9'
};
var chars = {
	'Fervus': false,
	'Axias': true,
	'Aotkpta': true,
	'Demerzel': false,
	'Daneel Olivaw': false,
	'Aulin': false,
	'Josh Scogin': false
};
var isTwoHanded = chars[Player.Name()];
 function main(){
	while(true){
		Orion.Print(Player.Name());
	//var target = Orion.FindType('any', '-1', ground, 'fast|mobile|live', 10, 'red|grey|gray');
	//Orion.Attack(target);
		if(bettles[Player.Name()]){
			deposit();
		}
		
		armMe();
		healMe();
		if(!mobileID || !Orion.ObjectExists(mobileID)){
			TargetNext();
		}else{
			Orion.Follow(mobileID);
			//TargetNext();
			AttackNext(mobileID);
			//Orion.Attack(mobileID);
			//Orion.Wait(300);
			//shouldThrowPotion();
		}
		Orion.Follow(mobileID);
			
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
Orion.Resend();
    if(Player.Poisoned()){
       disarmMe();
		Orion.UseType('0x0F07', '0xFFFF');// cure pot
 		armMe();
 		Orion.Wait(500);
	}
    if(Player.Hits() < 60){
    	if(Player.Name() == 'MilkLizard'){
    	Orion.CancelTarget();
    	Orion.CancelTarget();
    	Orion.CancelTarget();
    	Orion.CancelTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
				Orion.Cast('Greater Heal');
				Orion.WaitForTarget(1650);
	       		 Orion.TargetObject('self'); 
				
			}
       disarmMe();
		Orion.UseType('0x0F0C', '0xFFFF');//heal pot
 		armMe();
 		
	}
	
    if(Player.Hits() < Player.MaxHits()){
    
			if(Player.Name() == 'MilkLizard'){
    	Orion.CancelTarget();
    	Orion.CancelTarget();
    	Orion.CancelTarget();
    	Orion.CancelTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
				Orion.Cast('Heal');
				Orion.WaitForTarget(1000);
	       		 Orion.TargetObject('self'); 
			}else{
				 Orion.UseType('0x0E21', '0xFFFF');
	   		 	 Orion.WaitForTarget(300);
	       		 Orion.TargetObject('self'); 
				Orion.Wait(1000);
			}
	}	
    if(Player.Stam() < Player.MaxStam() / 2  ){
       disarmMe();
		Orion.UseType('0x0F0B', '0xFFFF');// refresh pot
 		armMe();
	}
}


function deposit(){
	var bettle = bettles[Player.Name()];
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
    			Orion.Resend();
    
        Orion.IgnoreReset();
        //mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself", 8, "gray|criminal|orange");
        mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself|ignorefriends", 15, "gray|criminal|orange|red");
       // mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself|ignorefriends", 12, "red");
        if (mobileID.length){
        	
						var mob = Orion.FindObject(mobileID);
						
					
           // Orion.Follow(mobileID);
            Orion.CharPrint(mobileID, 33, '*** Target Found ***');
           Orion.TargetObject(mobileID);
           Orion.ClientLastTarget(mobileID);
            Orion.Attack(mobileID);
			Orion.Wait(300);
			if(Player.Name() == 'MilkLizard'){
				if(Player.Mana() < 20){
					Orion.UseSkill('Meditation');
				}else{
						 if (mob.Distance() < 3 ) {
						    Orion.Print("Distance < 3, running!");
						    var px = Player.X() + 5;
   						    var py = Player.X() + 5;
						    Orion.WalkTo(px, py, Player.Z(), 5, 1, 1, 1);
						    Orion.Wait(2000);
						  }
					if(mob.InLOS()){
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
						Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
						Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
						Orion.Cast('Energy Bolt',mobileID);
						Orion.WaitForTarget(2000);
						Orion.TargetObject(mobileID);
					}
				}
				
					Orion.UseSkill('Meditation');
			}
			  Orion.Ignore(mobileID);
		  Orion.Wait(50);
          return;
        }
   
    	 Orion.IgnoreReset();
   
    
    Orion.Print("No enemies");
}
function AttackNext(){ 
    			Orion.Resend();
           // Orion.Follow(mobileID);
            Orion.CharPrint(mobileID, 33, '*** Target Found ***');
           Orion.TargetObject(mobileID);
           Orion.ClientLastTarget(mobileID);
            Orion.Attack(mobileID);
			Orion.Wait(300);
			if(Player.Name() == 'MilkLizard'){
				if(Player.Mana() < 20){
					Orion.UseSkill('Meditation');
				}else{
						var mob = Orion.FindObject(mobileID);
						 if (mob && mob.Distance() < 3 ) {
						    Orion.Print("Distance < 3, running!");
						    var px = Player.X() + 5;
   						    var py = Player.X() + 5;
						    Orion.WalkTo(px, py, Player.Z(), 5, 1, 1, 1);
						  Orion.Wait(2000);
						  }
					if(mob && mob.InLOS()){
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
						Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
						Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
Orion.CancelWaitTarget();
						Orion.Cast('Energy Bolt',mobileID);
						Orion.WaitForTarget(2000);
						Orion.TargetObject(mobileID);
					}
				}
				
					Orion.UseSkill('Meditation');
			}
			
			  Orion.Ignore(mobileID);
		  Orion.Wait(50);
       
}