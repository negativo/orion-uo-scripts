function makerecalls(){
	while(true){
		if(Player.Mana()<11){
			Orion.UseSkill('Meditation');
			Orion.Wait(30000);
		}
	var findItems0 = Orion.FindType('0x0F7A', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
    Orion.MoveItem(findItems0, 1, backpack);
	Orion.Wait(800);
	var findItems1 = Orion.FindType('0x0F86', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
 Orion.MoveItem(findItems1, 1, backpack);
	Orion.Wait(800);
	var findItems2 = Orion.FindType('0x0F7B', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
 Orion.MoveItem(findItems2, 1, backpack);
	Orion.Wait(800);
	var findItems3 = Orion.FindType('0x0EF3', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
	 Orion.MoveItem(findItems3, 1, backpack);
	Orion.Wait(1200);

    Orion.UseType('0x0FBF', '0xFFFF');
	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x38920ABD'))
		{
			gump0.Select(Orion.CreateGumpHook(22));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000))
	{
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x38920ABD'))
		{
			gump1.Select(Orion.CreateGumpHook(51));
			Orion.Wait(100);
		}
	}
	Orion.Wait(2000);
	var findItems4 = Orion.FindType('0x1F4C', '0xFFFF', 'backpack', 'item|fast|recurse');
      Orion.MoveItem(findItems4, 1, '0x4262EEAE');
	Orion.Wait(1500);
	}
}
function makeelem(){
	while(true){
		while(Player.Mana()<50){
			Orion.UseSkill('Meditation');
			Orion.Wait(3000);
		}
	var findItems0 = Orion.FindType('0x0F8D', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
    Orion.MoveItem(findItems0, 1, backpack);
	Orion.Wait(800);
	var findItems1 = Orion.FindType('0x0F86', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
 Orion.MoveItem(findItems1, 1, backpack);
	Orion.Wait(800);
	var findItems2 = Orion.FindType('0x0F7B', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
 Orion.MoveItem(findItems2, 1, backpack);
	Orion.Wait(800);
	var findItems3 = Orion.FindType('0x0EF3', '0xFFFF', '0x4262EEAE', 'item|fast|recurse');
	 Orion.MoveItem(findItems3, 1, backpack);
	Orion.Wait(1200);

   Orion.UseType('0x0FBF', '0xFFFF');
	if (Orion.WaitForGump(2000))
	{
		var gump0 = Orion.GetGump('last');
			Orion.Wait(100);
		if ((gump0 !== null)&& (gump0.ID() === '0x38920ABD'))
		{
			gump0.Select(Orion.CreateGumpHook(50));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(2000))
	{
		var gump1 = Orion.GetGump('last');
		Orion.Print(gump1.ID());
		if ((gump1 !== null) && (gump1.ID() === '0x38920ABD'))
		{
			gump1.Select(Orion.CreateGumpHook(51));
			Orion.Wait(100);
		}
	}
	Orion.Wait(2000);
	var findItems4 = Orion.FindType('0x1F6C', '0xFFFF', 'backpack', 'item|fast|recurse');
      Orion.MoveItem(findItems4, 1, '0x4262EEAE');
	Orion.Wait(1500);
	}
}
function makeScroll()
{
    Orion.UseType('0x0FBF', '0xFFFF');
	if (Orion.WaitForGump(2000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (gump0.ID() === '0x38920ABD'))
		{
			gump0.Select(Orion.CreateGumpHook(43));
			Orion.Wait(300);
		}
	}
	if (Orion.WaitForGump(2000))
	{
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (gump1.ID() === '0x38920ABD'))
		{
			gump1.Select(Orion.CreateGumpHook(23));
			Orion.Wait(2500);
			moveScrollToBank();
		}
	}
			moveScrollToBank();
}

function moveScrollToBank(){

	Orion.Wait(100);
	var recall = Orion.FindType('0x1F60', '0xFFFF', backpack);
	Orion.Wait(1000);
    Orion.MoveItem(recall, 1, '0x423FD279');Orion.Wait(2000);

  getReagsAndScroll();
}

function main(){
  getReagsAndScroll();
}

function getReagsAndScroll(){

	Orion.UseObject('0x423FD279');
	Orion.Wait(100);
	var reag1 = Orion.FindType('0x0F7A', '0xFFFF', '0x423FD279');
	Orion.Wait(1000);
	var reag2 = Orion.FindType('0x0F8C', '0xFFFF', '0x423FD279');
	Orion.Wait(1000);
	var reag3 = Orion.FindType('0x0F86', '0xFFFF', '0x423FD279');
	Orion.Wait(1000);
	var scroll = Orion.FindType('0x0EF3', '0xFFFF', '0x423FD279');
	Orion.Wait(1000);

	var pen = Orion.FindType('0x0FBF', '0xFFFF', backpack);
	if(pen === ''){

		Orion.UseObject('0x4014B5C0');
		Orion.Wait(1000);
		pen = Orion.FindType('0x0FBF', '0xFFFF', '0x4014B5C0');Orion.Wait(1000);
    	Orion.MoveItem(pen, 1, backpack);Orion.Wait(1000);
	}
	Orion.Wait(1000);
    Orion.MoveItem(reag1, 1, backpack);Orion.Wait(1000);
    Orion.MoveItem(reag2, 1, backpack);Orion.Wait(1000);
    Orion.MoveItem(reag3, 1, backpack);Orion.Wait(1000);
    Orion.MoveItem(scroll, 1, backpack);Orion.Wait(1000);
    makeScroll();
}