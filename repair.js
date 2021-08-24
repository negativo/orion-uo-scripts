// Paste your code here :)

// repair cloth
function identify(){

    Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');
    
    Orion.AddObject('wa');
    Orion.Print('Select a container to move items from');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var wa = Orion.FindObject('wa');
    var gold = Orion.FindType(any, -1 ,fromContainer.Serial());
    
    Orion.Print(gold);
    gold.map(function(g){
    	var toid = Orion.FindObject(g);
    	if(Orion.Contains(toid.Properties(), 'Unidentified')){
    		Orion.Print(toid.Properties());
	    	Orion.UseObject(wa.Serial());
	    	Orion.WaitForTarget(1000);
	    	Orion.TargetObject(g);
    		Orion.Wait(1300);
    	}
    	
        //Orion.UseSkill('Item Identification', g);
    
    });
 

}