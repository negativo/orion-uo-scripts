// Paste your code here :)
var word = 'F';
var a, b, c, d = 0;
function main(){
var allLetters = Orion.FindType(any, -1 ,'0x42049049');
Orion.Print(allLetters);
allLetters.forEach(function(letter){
	var l = Orion.FindObject(letter);

	var from = l.Properties();
	//Orion.Print(from.slice(0,11).slice(8);
	var theletter = from.slice(0,10).slice(8).trim();
	Orion.Print('.'+theletter+'.');
	//Orion.Print('.'+word[0]+'.');
		Orion.Wait(100);
	if(theletter === word ){
		Orion.MoveItem(l.Serial(), 1, '0x4466E9B0' );
    Orion.Print('found');
		a++;
		Orion.Wait(500);
	}

		Orion.Ignore(letter);
	Orion.Wait(50);
});
}