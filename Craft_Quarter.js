//Craft Bows
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
			Orion.Wait(800);
         Orion.MoveItem(bow[0], -1, slayerContainer.Serial());
         	Orion.Wait(700);
		}else{
			//trash it
			Orion.Print(' moving ');
         var bow = Orion.FindType('0x0E89', '0x04AA|0x047F|0x04A9|0x07DA|0x04A7|0x04A8|0x0000', backpack);
			Orion.Wait(800);
         Orion.MoveItem(bow[0], -1, normalContainer.Serial());
         	Orion.Wait(700);
		}
	
 }