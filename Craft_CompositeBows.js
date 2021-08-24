//Craft Bows
   Orion.AddObject('slayerContainer');
    Orion.Print('Select a bag to move slayer bows to');
    while(Orion.HaveTarget()){
        Orion.Wait(50);
    }
    var slayerContainer = Orion.FindObject('slayerContainer');
        Orion.Wait(150);
       Orion.AddObject('normalContainer');
    Orion.Print('Select a bag to move normal bows to');
    while(Orion.HaveTarget()){
        Orion.Wait(50);
    }
    var normalContainer = Orion.FindObject('normalContainer');
while(true){
	Orion.UseType('0x1022', '0xFFFF');
	
	if (Orion.WaitForGump(800)){
			Orion.Print('Selecting Composite Bow');
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')){
			gump0.Select(Orion.CreateGumpHook(15));
			Orion.Wait(800);
		}
	}
	
	var text = 'slayer|material';
	var msg;
	if (Orion.WaitForGump(500)){
			Orion.Print('Creating Composite Bow ');
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (gump1.ID() === '0x38920ABD')){
			gump1.Select(Orion.CreateGumpHook(16));
				msg = Orion.WaitJournal(text, Orion.Now(), Orion.Now() +1500, 'sys|my');
			Orion.Wait(200);
		}
	}

		if(msg != null){	
			//move bow to save
			Orion.Print('Slayer Composite moving ');
         var bow = Orion.FindType('0x26C2','0x04AA|0x047F|0x04A9|0x07DA|0x04A7|0x0000|0x04A8',backpack);
			Orion.Wait(500);
			var theBow = Orion.FindObject(bow[0]);
			if(theBow){
				if(Orion.Contains(theBow.Properties(), 'Unidentified')){
	         		Orion.MoveItem(theBow.Serial(), -1, slayerContainer.Serial());
	         	}
         	
         	Orion.Wait(400);
         	}
		}else{
			//trash it
    		Orion.Print('Normal Bow moving ');
        	 var bow = Orion.FindType('0x26C2', '0x04AA|0x047F|0x04A9|0x07DA|0x04A7|0x04A8', backpack);
			Orion.Wait(500);
			
			var theBow = Orion.FindObject(bow[0]);
			if(theBow){
				if(!Orion.Contains(theBow.Properties(), 'Unidentified')){
	         		Orion.MoveItem(theBow.Serial(), -1, normalContainer.Serial());
	         	}
         		Orion.Wait(300);
         	}
		}
 }
 