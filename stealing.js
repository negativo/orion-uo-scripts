var testGumpId = 11001;

function GetTestGumpValues() {

	return {
		X: Shared.GetVar("gumpPositionX" + testGumpId, 0),
		Y: Shared.GetVar("gumpPositionY" + testGumpId, 0),
		counter: Shared.GetVar("counter" + testGumpId, 0)
	};
}



function TestGumpConfig() {
	var width = 200;
	var height = 160;
	var gump = Orion.CreateCustomGump(testGumpId);
	var values = GetTestGumpValues();
	
	// gump position
	gump.SetX(values.X);
	gump.SetY(values.Y);
	
	// background & size
	gump.AddResizepic(0, 0, 0xBB8, width, height);
	
	var x = 10;
	var y = 10;
	
	gump.AddButton(testGumpId + 1001, 10, 10, '0x846', '0x846', '0x845', '87');
	
    gump.AddText(30,15, "0",'Neck      - ' + get_layer_durability('Necklace'));
    gump.AddText(30, 30, "0",'Chest     - ' + get_layer_durability('InnerTorso'));
   gump.AddText(30, 45, "0",'Arms     - ' + get_layer_durability('Arms'));
    gump.AddText(30, 60, "0",'Glove     - ' + get_layer_durability('Gloves'));
    gump.AddText(30, 75, "0",'Pants     - ' + get_layer_durability('Pants'));
    gump.AddText(30, 90, "0",'Helmet     - ' + get_layer_durability('Helmet'));
	gump.SetCallback("TestGumpResponse");
	gump.Update();
	Orion.Wait(5000);
	Orion.CloseGump("custom", testGumpId);
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

function get_layer_durability(layer)
{   // matches[1] is current, matches[2] is maximum 
    var object = Orion.ObjAtLayer(layer);
    if(object){
        var properties = object.Properties();
        var matches =properties.match(/\Durability(.*)$/g);
        var mm;
        matches.forEach(function (m) {
         Orion.Print(m); 
         mm = m.slice(10, 20); 
        });
      	return mm;
    }
}
function check_equipment()
{
    TextWindow.Open();
    TextWindow.Print('Ring      - ' + get_layer_durability('Ring'));
    TextWindow.Print('Bracelet - ' + get_layer_durability('Bracelet'));
    TextWindow.Print('Neck      - ' + get_layer_durability('Necklace'));
    TextWindow.Print('Chest     - ' + get_layer_durability('InnerTorso'));
    TextWindow.Print('Arms     - ' + get_layer_durability('Arms'));
    TextWindow.Print('Glove     - ' + get_layer_durability('Gloves'));
    TextWindow.Print('Pants     - ' + get_layer_durability('Pants'));
    TextWindow.Print('Cloak     - ' + get_layer_durability('Cloak'));
}