// party archer

   
function main(){
	 while(true) {
		    healMe();
		    deposit();
  		    Orion.Wait(200);
			if(Orion.ObjectExists('0x002ECE55')){
            	Orion.Follow( '0x002ECE55' ,true);
            }
	        var findMsgObj = Orion.WaitJournal("Party Target", Orion.Now(), 500);
	        Orion.Wait(50);
	  	 	if(Player.Weight() > Player.MaxWeight() - 20 ){
	  			Orion.Say("/ Party MAX WEIGHT AXIAS ");
	  		}
	  		if(findMsgObj){
		        if (Orion.Contains(findMsgObj.Text(), "0x")){
		            var targ = findMsgObj.Text().split(" ")[2];
		              while(Orion.ObjectExists(targ)){
		               		Orion.Attack(targ);
							Orion.Wait(1650);
					 }   
	            }
            }
    }
}

function healMe(){    
    if(Player.Hits() < Player.MaxHits()){
			 Orion.UseType('0x0E21', '0xFFFF');
   		 	 Orion.WaitForTarget(300);
       		 Orion.TargetObject('self'); 
        
	}
	
    if(Player.Hits() < 50){
		Orion.Wait(500);
		Orion.UseType('0x0F0C', '0xFFFF');
	}
    if(Player.Stam() == 0){
		Orion.Wait(500);
		Orion.UseType('0x0F0B', '0xFFFF');
	}
	
    if(Player.Poisoned()){
       Orion.Wait(500);
		Orion.UseType('0x0F07', '0xFFFF');
	}
	
   Orion.Wait(300);
}

function deposit(){
	if (Player.Weight() > 340) {
	   	Orion.UseObject('self');
		Orion.Wait(350);
	   	var gold = Orion.FindType('0x0EED', '0xFFFF',backpack);
		Orion.Wait(350);
	    Orion.MoveItem(gold, -1, '0x001EEB37');
		Orion.Wait(1000);
		Orion.UseObject('0x001EEB37');
	}
}