
var searchDistance = 20;
function main(){
	
	while(true){
			
        Orion.ClearJournal();
		var target = Orion.FindType(getAnimals(), '-1', ground, 'fast|mobile|live', searchDistance, 'gray|criminal|red');
		Orion.Print(target);
		var creature = Orion.FindObject(target);
		
       Orion.AddHighlightCharacter(target, '123');
		Orion.Print(creature);
        provokeIt(target);
        Orion.Wait(10000);
       
	}

}
Orion.Target

function getAnimals() {
    // Set Animal types and return a string with all the animals.
    var animals = [
      '0x009B','0x0038','0x0003'
    ]; 
    animals = [
      '0x009B'
    ]; 
    return animals.join('|');
}
var text = 'instrument';
function provokeIt(creature) {
    // Tame a creature
    Orion.UseSkill('Provocation');
    var msg = Orion.WaitJournal('instrument', Orion.Now(), Orion.Now() +1000, 'sys|my');
  // if (Orion.InJournal('instrument')) {
     if (msg) {
     			Orion.Print('get instrument');
   		   var target = Orion.FindType('0x0E9C', '0xFFFF', backpack);

     			Orion.Print(target);
   		   Orion.Wait(100);
	    		Orion.TargetObject(target);
	    		Orion.Wait(2000);
    }
    Orion.Wait(1000);
     Orion.Print('targeting creature');
    Orion.TargetObject(creature);
    Orion.Wait(1000);
     Orion.Print('targeting self');
    Orion.TargetObject('self');
}