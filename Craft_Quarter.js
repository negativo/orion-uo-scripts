//Craft Bows
function craft(){
   Orion.AddObject('slayerContainer');
    Orion.Print('Select an item to move');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var slayerContainer = Orion.FindObject('slayerContainer');
       Orion.AddObject('normalContainer');
    Orion.Print('Select an item to move');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var normalContainer = Orion.FindObject('normalContainer');

while(true){
Orion.UseType('0x1034', '0xFFFF');
	
	if (Orion.WaitForGump(800)){
			Orion.Print('gump1 ');
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')){
			gump0.Select(Orion.CreateGumpHook(22));
			Orion.Wait(800);
		}
	}
	
	var text = 'slayer|material';
	var msg;
	if (Orion.WaitForGump(800)){
			Orion.Print('gump2 ');
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (gump1.ID() === '0x38920ABD')){
			gump1.Select(Orion.CreateGumpHook(9));
				msg = Orion.WaitJournal(text, Orion.Now(), Orion.Now() +3500, 'sys|my');
			Orion.Wait(800);
		}
	}

		if(msg != null){	
			//move bow to save
			Orion.Print('Slayer moving ');
         var bow = Orion.FindType('0x0E89','0x04AA|0x047F|0x04A9|0x07DA|0x04A7|0x0000|0x04A8',backpack);
			Orion.Wait(500);
       var theBow = Orion.FindObject(bow[0]);
			if(theBow){
				if(Orion.Contains(theBow.Properties(), 'Unidentified')){
	         		Orion.MoveItem(theBow.Serial(), -1, slayerContainer.Serial());
	         	}
	         	}
         	Orion.Wait(400);
		}else{
			//trash it
			Orion.Print(' moving ');
         var bow = Orion.FindType('0x0E89', '0x04AA|0x047F|0x04A9|0x07DA|0x04A7|0x04A8', backpack);
			Orion.Wait(500);
         Orion.MoveItem(bow[0], -1, normalContainer.Serial());
         	Orion.Wait(300);
		}
	
 }
 }
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
   // var wa = Orion.FindObject('wa');
    while( gold = Orion.FindType(any, -1 ,fromContainer.Serial())){
    
    Orion.Print(gold);
    gold.map(function(g){
    	var toid = Orion.FindObject(g);
        Orion.UseSkill('Item Identification', g);
	    	Orion.WaitForTarget(1000);
    	if(Orion.Contains(toid.Properties(), 'Unidentified')){
    		
        //Orion.UseSkill('Item Identification', wa.Serial());
	    	//rion.UseObject(wa.Serial());
	    	Orion.WaitForTarget(1000);
	  //  	Orion.TargetObject(g);
    //		Orion.Wait(1300); 
  //  		toid = Orion.FindObject(g);
//    		Orion.Print(toid.Properties());
    	}
    	
        //Orion.UseSkill('Item Identification', g);
    
    });
 
}
}

function MoveItemByType()
{
    var delay = 600;
    Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    Orion.AddObject('toContainer');
    Orion.Print('Select a container to move items to');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    Orion.AddObject('item');
    Orion.Print('Select an item to move');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');
    var toContainer = Orion.FindObject('toContainer');
    var item = Orion.FindObject('item');
    var itemType = item.Graphic();
    var itemColor = item.Color();
    
    while(true){
        var items = Orion.FindTypeEx(itemType, itemColor, fromContainer.Serial());
        //var items = Orion.FindType('any', 'any', fromContainer.Serial());
        if(items.length){
            Orion.MoveItem(items[0].Serial(), 0, toContainer.Serial());
            //Orion.MoveItem(items[0], 1, toContainer.Serial());
            Orion.Wait(delay);    
        }
        else
            break;
    }
    Orion.RemoveObject('fromContainer');
    Orion.RemoveObject('toContainer');
    Orion.RemoveObject('item');    
}
