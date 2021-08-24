var greg ='0x0054BD79';
var ben = '0x0054D23C';
var nightmare = '0x00550312';
var lemon = '0x000DB0CB';
var pluto = '0x000DB0CB';
var liam = '0x0027531C';
var dbeattle ='0x000195EA';
var wwyrmgiada = '0x001029A5';
var meta = '0x0007AF3B';
var woody = '0x0043AA3C';
var metaaronne = '0x0003BA05';
var bianco = '0x0018C0A4';

var pets = [liam, ben, wwyrmgiada, dbeattle];
pets = [dbeattle, ben];
function main(){
    while(true){
    	//Orion.Say("/ Party Target " + Orion.GetSerial(lastattack));
		
	      pets.forEach(function(pet){
		     var p = Orion.FindObject(pet);
		      if(!p){ return false; }
		      
            if (p.Poisoned()) {
                cure(pet);
                Orion.Wait(3500);
            }
            
            if (p.Hits() < p.MaxHits()) {
               Orion.Print(pet);
                heal(pet);
           		 if(p.Hits() < ((p.MaxHits()/10)*7)) {
                		Orion.Wait(500);
					}else{
					 		Orion.Wait(4000);
					
					}
           		 //while(p.Hits() < ((p.MaxHits()/10)*7)) {
           		    if (p.Poisoned()) {
		                cure(pet);
		                Orion.Wait(2800);
		            }
                //		grHeal(pet);
                  	Orion.Wait(2800);
               // }
                
            }
        });
    }
}

function heal(target){
    Orion.UseType('0x0E21', '0xFFFF');
    Orion.TargetObject(target);
    if (Orion.WaitForTarget(2500))
        Orion.TargetObject(target);
    Orion.TargetObject(target);
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