function buildClubs(){
	Orion.UseType('0x102A', '0xFFFF');
	if (Orion.WaitForGump(1000)){
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')){
			gump0.Select(Orion.CreateGumpHook(22));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000)){
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (gump1.ID() === '0x38920ABD')){
			gump1.Select(Orion.CreateGumpHook(30));
			Orion.Wait(100);
		}
	}
	Orion.RequestContextMenu('0x000012C1');
	Orion.WaitContextMenuID('0x000012C1', 2);
	var totalLogs = Orion.Count('0x1BDD','0x000',backpack);
	if(totalLogs<6){
		goBank();
	}else{
	    Orion.Wait(2500);
		buildClubs();
	}
}


var bankx = 2500;
var banky = 560;
var vendorx = 2466;
var vendory = 556;

Orion.Print("currently at: "+ Player.X()+" "+Player.Y());


function moveLogs(){
	Orion.UseObject ('0x40A02F51');
  Orion.Wait(2000);
    var gold = Orion.FindType('0x0EED','0x000',backpack);
    Orion.MoveItem(gold, -1, '0x40A02F51');
  Orion.Wait(2000);

	var logs = Orion.FindType('0x1BDD','0x000','0x40A02F51');
    Orion.MoveItem(logs, 2000, backpack);
  Orion.Wait(2000);
}

function goBank(){
	
 var posx = vendorx;
 var posy =vendory;
  Orion.WalkTo(bankx,banky,0);

  var px =Player.X();
  var py =Player.Y();
  while((px < bankx - 1 || px > bankx + 1) && (py < banky - 1 || py > banky + 1 )){

  		px = Player.X();
  		py = Player.Y();
  		Orion.WalkTo(bankx,banky,0);
  }
  Orion.Say("bank");
  Orion.Wait(2000);
  moveLogs();
  Orion.Wait(2000);
  Orion.WalkTo(posx,posy,0);
  px = Player.X();
  py = Player.X();

  while((px < posx - 1 || px > posx + 1) && (py < posy - 1 || py > posy + 1 )){
	  Orion.WalkTo(posx,posy,0);
  }
  Orion.Wait(2000);
  buildClubs();
}

