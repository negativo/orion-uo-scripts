var testGumpId = 11001;
var gump;
function main(){
	TestGumpConfig();
}

function GetTestGumpValues() {

	var position = Orion.GetGumpPosition("11001", testGumpId);
	Shared.AddVar("gumpPositionX" + testGumpId, position.X());
	Shared.AddVar("gumpPositionY" + testGumpId, position.Y());
	
	return {
		X: Shared.GetVar("gumpPositionX" + testGumpId, 1700),
		Y: Shared.GetVar("gumpPositionY" + testGumpId, 100),
	};
}



function TestGumpConfig() {
	var width = 200;
	var height = 230;
	gump = Orion.CreateCustomGump(testGumpId);
	var values = GetTestGumpValues();
	
	// gump position
	gump.SetX(values.X);
	gump.SetY(values.Y);
	
	// background & size
	gump.AddResizepic(0, 0, 0xBB8, width, height);
	
	var x = 10;
	var y = 10;
	
    gump.AddText(15,15, "0",'Neck - ' + getLayerDurability('Necklace'));
    gump.AddText(15, 30, "0",'Chest - ' + getLayerDurability('InnerTorso'));
   gump.AddText(15, 45, "0",'Arms - ' + getLayerDurability('Arms'));
    gump.AddText(15, 60, "0",'Glove - ' + getLayerDurability('Gloves'));
    gump.AddText(15, 75, "0",'Pants - ' + getLayerDurability('Pants'));
    gump.AddText(15, 90, "0",'Helmet - ' + getLayerDurability('Helmet'));
    gump.AddText(15, 105, "0",'Left hand - ' + getLayerDurability('LeftHand'));
    gump.AddText(15, 120, "0",'Left Charges - ' + getLayerDurability('LeftHand', true));
    gump.AddText(15, 135, "0",'Right hand - ' + getLayerDurability('RightHand'));
    gump.AddText(15, 150, "0",'AR ' +Player.Armor());
    gump.AddText(15, 165, "0",'HP/STR ' + Player.Hits() +'/'+ Player.Str());
    gump.AddText(15, 180, "0",'STAM/DEX ' + Player.Stam() +'/'+ Player.Dex());
    gump.AddText(15, 195, "0",'MANA/INT ' + Player.Mana() +'/'+ Player.Int());
     
	gump.SetCallback("TestGumpResponse");
	gump.Update();
	Orion.Wait(3000);
	Orion.Wait(100);
	TestGumpConfig();
}



function TestGumpResponse() {
	var response = CustomGumpResponse.ReturnCode();
	if (response == 0) {
		// gump closed
		return;
	}
	
	// save last position
	var position = Orion.GetGumpPosition("custom", testGumpId);
	Shared.AddVar("gumpPositionX" + testGumpId, position.X());
	Shared.AddVar("gumpPositionY" + testGumpId, position.Y());
	
	var btnId = response - testGumpId;
	Orion.Print("Btn: " + btnId);
	
	if (btnId == 1001) {
		var values = GetTestGumpValues();
		var counter = parseInt(values.counter) + 1;
		Shared.AddVar("counter" + testGumpId, counter);
	}
	
	// reopen gump
	Orion.CloseGump("custom", testGumpId);
	Orion.Wait(100);
	TestGumpConfig();
}

function getLayerDurability(layer, checkCharges)
{   // matches[1] is current, matches[2] is maximum 
    var object = Orion.ObjAtLayer(layer);
    if(object){
        var properties = object.Properties();
        var matches =properties.match(/\Durability(.*)$/g);
        if(checkCharges){
        	properties = object.Properties();
        	
        var charges =properties.match(/\Charges:(.*)$/g);
	        var ccc =properties.match(/\Charges:(.*)$/g);
	        
		    var index = properties.indexOf('Charges');
		   	var cc = properties.slice(index + 9, index+9 +4);
	
      		return cc;
        }
        var mm;
        if(matches){
	        matches.forEach(function (m) {
	         mm = m.slice(10, 20); 
	        });
        }
      	return mm;
    }
    return 'Not Equipped';
}