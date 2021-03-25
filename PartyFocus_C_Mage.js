// party mage
function main(){
    while (true) {
	   //deposit();
	   //curePet();
       Orion.Follow( '0x002ECE55' ,true);
       Orion.UseSkill('Meditation');
       var findMsgObj = Orion.WaitJournal("Party Target", Orion.Now(), 0);
       Orion.Wait(50);
       if (Orion.Contains(findMsgObj.Text(), "0x")){
            var targ = findMsgObj.Text().split(" ")[2];
           	while(Orion.ObjectExists(targ)){
        		Orion.Cast("Energy Bolt",  targ);
				Orion.Wait(2650);
			}
        }
    }
}

function curePet(){
pets.forEach(function(pet){
		     var p = Orion.FindObject(pet);
		      if(!p){ return false; }
		      
            if (p.Poisoned()) {
                cure(pet);
                Orion.Wait(3500);
            }
            
            if (p.Hits() < p.MaxHits()) {
           	
           		 while(p.Hits() < ((p.MaxHits()/10)*7)) {
           		    if (p.Poisoned()) {
		                cure(pet);
		                Orion.Wait(2800);
		            }
                   grHeal(pet);
                  	Orion.Wait(2800);
                }
                
            }
        });

}


function deposit(){
  if (Player.Weight() > 340) {
 	Orion.UseObject('self');
	Orion.Wait(350);
   	var gold = Orion.FindType('0x0EED', '0xFFFF',backpack);
	Orion.Wait(350);
    Orion.MoveItem(gold, -1, '0x001EEB37');
	Orion.Wait(1000);
	Orion.UseObject('0x002D7F15');
  }
}

function grHeal(target){
    Orion.Cast('Greater Heal');
   Orion.WaitTargetObject(target);
    if (Orion.WaitForTarget(2500))
	    Orion.WaitTargetObject(target);
   Orion.WaitTargetObject(target);

}

function cure(target){
    Orion.Cast('Cure');
   Orion.WaitTargetObject(target);
    if (Orion.WaitForTarget(2500))
	    Orion.WaitTargetObject(target);
   Orion.WaitTargetObject(target);

}