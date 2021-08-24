var previousLastTarget;
function getGumps(){
 Orion.Print(Orion.GumpCount());
 Orion.Print( Orion.GumpCount());
}
function getRunes(){
	var g = Orion.GetLastGump();
	g.ButtonList().forEach(function(c){
		var b = c.split(' ');
		//Orion.Print(b.split(' '));
		//Orion.Print(Orion.Print(b[0], b[1], b[6]));
		Orion.Print(Orion.Print(c));
		Orion.Print(Orion.Print(b[8]));
		Orion.MouseClick(b[0], b[1], b[8]);
		Orion.Wait(100);
	});
}
function main() {
	Orion.OptionFastRotation(true);
	Orion.Resend();
	Orion.Print(Player.Name());
	Orion.Print(Player.Notoriety());
	var bs = Player.Notoriety() == 6 ? "green|red" : "gree|blue";
	Orion.IgnoreReset();
	var i =0;
	var greytargets = Orion.FindType("-1", "-1", ground, "near|live|ignoreself|ignorefriends",18, "gray|criminal|orange|red");
	while(greytargets.length){
		Orion.ShowStatusbar(greytargets, 100, 200 + i *35);
		Orion.Ignore(greytargets);
		Orion.Wait(50);
		greytargets = Orion.FindType("-1", "-1", ground, "near|live|ignoreself|ignorefriends",18, "gray|criminal|orange|red");
		i++;
	}
	
	var i =0;
	var blues = Orion.FindType("-1", "-1", ground, "near|live",18,bs);
	Orion.Print(blues);
	while(blues.length){
		Orion.ShowStatusbar(blues, 1400, 200 + i *55);
		Orion.Ignore(blues);
		Orion.Wait(50);
		blues = Orion.FindType("-1", "-1", ground, "near|live",18, bs);
		i++;
	}
	Orion.IgnoreReset();
}

function thegump(){
	var gum = Orion.GetLastGump();
	Orion.Print(gum);
}

var shouldFollowChars = {
	'Axias': false,
	'Fervus': true,
	'Demerzel': false,
	'Aotkpta': true
};

var useCure = true;
var shouldDeposit = true;
var shouldFollow = shouldFollowChars[Player.Name()] || false;
var lastheal = 0;
var lastbandage = 0;
var mobileID;
var bettles = {
	'MilkLizard': '0x002D7F15',
	'Axias': '0x001EEB37',
	'Aulin': false,
	'Josh Scogin': '0x000CBAA9',
	'Lord Josh Scogin': '0x000CBAA9'
};

var isTwoHandedChar = {
	'Fervus': false,
	'Axias': true,
	'Aotkpta': true,
	'Demerzel': false,
	'Daneel Olivaw': false,
	'Aulin': false,
	'Josh Scogin': false
};

var isTwoHanded = isTwoHandedChar[Player.Name()];
function equipWeapon(){
  Orion.Print(Player.Name());
  Orion.Dress(Player.Name());
}
function getWandsCharges(){
     var wands = Orion.FindType(any);
     wands.every(function (w){
    var wa = Orion.FindObject(w);
      if(wa.Name() == 'Wand'){
       	 //getWandCharges(w,target);
       	 var props =wa.Properties();
		Orion.Print(props.slice(57));
		//Orion.Print(getItemCharges(wa));
      }
      return true;
   });
}
function dismountAllKill(){
	Orion.UseObject(self);
	Orion.Say('all kill');

		Orion.Wait(100);
	
	Orion.TargetObject(lasttarget);
}
function getItemCharges(object){

     	properties = object.Properties();
     	
     	var charges =properties.match(/\Charges:(.*)$/g);
        var ccc =properties.match(/\Charges:(.*)$/g);
        
	    var index = properties.indexOf('Charges');
	   	var cc = properties.slice(index + 9, index+9 +4);

		return cc;
    
}
function castHealOnMe(){
	if(Player.Hits() == Player.MaxHits()){
		return false;
	}
    if(Player.Poisoned()){
        Orion.Cast('Cure', self);
        return false;
    }
	if(Player.Hits()<75){
		Orion.Cast('Greater Heal', self);
        return false;
	}
	if(Player.Hits()>75){
	    Orion.Cast('Heal', self);
	}
}

function castHealOnTarget(target){
	var toHeal = Orion.FindObject(target);
	if(toHeal.Hits() == toHeal.MaxHits()){
		return false;
	}
    if(Player.Poisoned()){
        Orion.Cast('Cure', target);
        return false;
    }
	if(Player.Hits()<75){
		Orion.Cast('Greater Heal', target);
        return false;
	}
	if(Player.Hits()>75){
	    Orion.Cast('Heal', target);
	}
}
function useLightWant(wand){

          Orion.Wait(450);
          Orion.UseObject(wand);
          Orion.WaitForTarget(1050);
          Orion.TargetObject(lasttarget); 
}
function superWand(){
// fireball 1250
//
       var wand = findAndEquipWand('Magic Arrow');
       //var wand = findAndEquipWand('Harm');

        Orion.Wait(350);
   var pozz =Orion.FindType('0x0F0D', '-1', 'self', true);
    var pozza = pozz[0];
        Orion.Wait(450);
        Orion.UseObject(pozza);
        Orion.Wait(350);
        Orion.CancelTarget();
        Orion.CancelTarget();
       if(wand){
           useLightWant(wand);
        Orion.CancelTarget();
        Orion.CancelTarget();
       }
       Orion.UseObject(pozza);
        Orion.CancelTarget();
        Orion.CancelTarget();
       while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
       
       }
       
       Orion.Wait(650);
       if(Orion.InLOS(lasttarget)){
          Orion.TargetObject(lasttarget);
       }else{
          Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }	
       Orion.Disarm();
}

function teleportenemy(){
    var ee = Orion.FindObject(lasttarget);
    Orion.Print(ee.X()+1);
    Orion.Cast('Teleport');
    Orion.WaitForTarget(1500);
    var xx =ee.X()+1;
    var yy = ee.Y()+1;
    var zz =Player.Z();
    Orion.Print(xx);
    Orion.Print(yy);
    Orion.Print(zz);
    Orion.TargetTile('any',xx,yy,zz);
}

function teleportaway(){
    var value = 12;
    var empty = 0;
 
    var offset =
    [
        [empty, -value],        //direction = 0
        [value, -value],        //direction = 1
        [value, empty],     //direction = 2
        [value, value],     //direction = 3
        [empty, value],     //direction = 4
        [-value, value],        //direction = 5
        [-value, empty],        //direction = 6
        [-value, -value]        //direction = 7
    ];
    var otherTilesRect =
    [
        [[1, 3],[1, 3]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
        [[1, 2],[1, 2]],        //direction = 0
    ];
	 var xy = offset[Player.Direction() & 7];
   // Orion.WaitTargetTileRelative('0', xy[0], xy[1], Player.Z());
    Orion.Cast('Teleport');
    Orion.WaitForTarget(1400);
    var thex = Player.X() + xy[0];
    var they = Player.Y() + xy[1];
    var thez = Player.Z();
    var l = 0;
    var xx = xy[0];
    var yy = xy[1];
  	Orion.TargetTileRelative('any',xx, yy, thez);
 }
 
function wallofstoneback()
{
    var value = 2;
    var empty = 0;
 
    var offset =
    [
        [empty, value],     //direction = 4
        [-value, value],        //direction = 5
        [-value, empty],        //direction = 6
        [-value, -value] ,       //direction = 7
        [empty, -value],        //direction = 0
        [value, -value],        //direction = 1
        [value, empty],     //direction = 2
        [value, value],     //direction = 3
    ];

    var xy = offset[Player.Direction() & 7];
   // Orion.WaitTargetTileRelative('0', xy[0], xy[1], Player.Z());
    Orion.Cast('Wall Of Stone');
    Orion.WaitForTarget(1400);
    Orion.TargetTileRelative('any',xy[0], xy[1],Player.Z());
 
 }
 
 
function wallofstonefront()
{

    Orion.Cast('Wall Of Stone');
    Orion.WaitForTarget(1400);
     var ee = Orion.FindObject(lasttarget);
    
  var xx =ee.X();
    var yy = ee.Y();
    var zz =Player.Z();
       var value = 5;
    var empty =1;
 
    var offset = [
        [empty, -value],        //direction = 0
        [value, -value],        //direction = 1
        [value, empty],     //direction = 2
        [value, value],     //direction = 3
        [empty, value],     //direction = 4
        [-value, value],        //direction = 5
        [-value, empty],        //direction = 6
        [-value, -value]        //direction = 7
    ];

    var xy = offset[ee.Direction() & 7];

    Orion.TargetTile('any',xx+xy[0],yy+xy[1],zz);
 
 }
function targetNextToEnemy(){

    var ee = Orion.FindObject(lasttarget);
    
  var xx =ee.X();
    var yy = ee.Y();
    var zz =Player.Z();
       var value = 2;
    var empty =1;
 
    var offset = [
        [empty, -value],        //direction = 0
        [value, -value],        //direction = 1
        [value, empty],     //direction = 2
        [value, value],     //direction = 3
        [empty, value],     //direction = 4
        [-value, value],        //direction = 5
        [-value, empty],        //direction = 6
        [-value, -value]        //direction = 7
    ];

    var xy = offset[ee.Direction() & 7];
    if(Orion.ValidateTargetTile('any',xx+xy[0],yy+xy[1],zz)){
    	Orion.TargetTile('any',xx+xy[0],yy+xy[1],zz);
    }
}
function equipSecondaryWeapon(){
  Orion.Dress(Player.Name()+'_secondary');
}
function equipArmor(){
  Orion.Dress('Axias_armor');
}
function reloadRunebooks(){
	var books = Orion.FindType('0x22C5');
	books.forEach(function (b){
		var book = Orion.FindObject(b);
		if(doesBookNeedRecharge(book.Properties())){
			var scrolls = Orion.FindType('0x1F4C');
			Orion.Print(scrolls);
            Orion.MoveItem(scrolls[0], -1, b);
            Orion.Wait(1500);
		}
	});
}
function doesBookNeedRecharge(from) {
	var arr = from.match(/\Charges:(.*)$/g) || [""]; 
	var charges = arr[0].slice(9).split('/');
	Orion.Print('book has ' + arr[0].slice(9).split('/')[0] + ' charges, recharging... ');
	return charges[0] !== charges[1];
}
function getIsTwoHanded(){

  return isTwoHanded();
}

function macroVivify(){
 	var wait = 500;
  	while(true){ wait = 500;
  		if(Player.Mana() < 50){
  			Orion.UseSkill('Meditation');
  		}else{
		    Orion.UseType('0x1F6C', '0xFFFF');
		    Orion.Wait(4000);
		     var water = Orion.FindType("-1", "-1", ground, "near|live|ignoreself",3, "green");
		     var waterObj = Orion.FindObject(water);
		    if(waterObj){
		     
		     if(waterObj.Color() !== '0x0000'){
		     	wait = 43000;
  				
		     }	     
			Orion.RequestContextMenu(water);
			Orion.WaitContextMenuID(water, 5);
			}
  			Orion.UseSkill('Meditation');
		Orion.Wait(200);
		}
		Orion.Wait(wait); 
		
		var scrolls = Orion.FindType('0x1F6C', '0xFFFF', backpack);
		if (!scrolls.length){
			GetElementalScrolls();Orion.Wait('500');
		}
	}
}
function GetElementalScrolls()
{
	while(Player.Mana() < 11){
		Orion.UseSkill('Meditation');
		Orion.Wait(2000);
	}
	Orion.Cast('32');
	if (Orion.WaitForTarget(3000))
		Orion.TargetObject('0x4064582A');
	Orion.Wait('700');
	Orion.Say('bank bank');
	Orion.Wait('700');
	var findItems0 = Orion.FindType('0x1F6C', '0xFFFF', Player.BankSerial(), 'item|fast|recurse');
	if (findItems0.length)
	{
		Orion.DragItem(findItems0[0], 300);
		Orion.Wait('300');
	}
	Orion.DropDraggedItem('0x443DC4CB', 117, 65);
	Orion.Wait('500');
	
	while(Player.Mana() < 11){
		Orion.UseSkill('Meditation');
		Orion.Wait(2000);
	}
	Orion.Cast('32');
	if (Orion.WaitForTarget(3000))
		Orion.TargetObject('0x412335A6');
}

function mindExplo(){
	    var pozz =Orion.FindType('0x0F0D', '-1', 'self', true);
		var pozza = pozz[0];
        Orion.UseObject(pozza);
        Orion.Wait(300);
        Orion.CancelTarget();
        Orion.Cast('Mind Blast');
        Orion.WaitForTarget(1950);
        Orion.TargetObject(lasttarget);
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
       }
       Orion.UseObject(pozza);
       Orion.Wait(650);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }
}
function lightExplo(){
	    var pozz =Orion.FindType('0x0F0D', '-1', 'self', true);
		var pozza = pozz[0];
        Orion.UseObject(pozza);
        Orion.Wait(300);
        Orion.CancelTarget();
        Orion.Cast('Lightning');
        Orion.WaitForTarget(1650);
        Orion.TargetObject(lasttarget);
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
       }
       Orion.UseObject(pozza);
       Orion.Wait(650);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }
}
function spar(){


while(true){
	Orion.UseObject('0x402640DE');
	if (Orion.WaitForTarget(1000)){
		Orion.TargetObject('self');
	}
	Orion.TargetObject('self');
	Orion.TargetObject('self');
	Orion.Wait(10500);
}

}

function moveReagents(){
 Orion.AddObject('reagToContainer');
    Orion.Print('Select a container to move items to');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var reagToContainer = Orion.FindObject('reagToContainer');
var reagents = ['bm', 'bp', 'ga', 'gs', 'mr', 'ns', 'sa', 'ss'];
 var howMany = 20;
for (var i = 0; i < reagents.length; i++){

    var list = Orion.FindType(reagents[i], '-1', '0x41592675');
            
            if (!list.length){
                Orion.CharPrint (self, 33, 'Reagent is not found');
                return
            }
            Orion.CharPrint (self, 33, 'Move reagent ' + reagents[i]);
            Orion.MoveItem(list[0], howMany, reagToContainer.Serial());
            Orion.Wait('moveitemdelay');            
            }
}
function getPotionsFromKegs(){
	
	var CHEST_WITH_KEGS =  '0x43F8E11C';
	var heal = 9;
	var refresh = 13;
	var cure = 12;
	var str = 11;
	var agy =12;
	var explo = 0;
	
	while(heal > 0 || refresh > 0 || cure > 0 || str > 0 || agy > 0 || explo > 0){
    var kegs = Orion.FindTypeEx('0x1940', any, CHEST_WITH_KEGS);
    
    kegs.every(function(k, i){
    	var ser = k.Serial();
	
    	while(Orion.Contains(k.Properties(), 'Keg Of Greater Heal') && heal > 0){
    		Orion.UseObject(ser);
    		Orion.Wait(700);
    		heal = heal - 1;
    	}
    	
    	while(Orion.Contains(k.Properties(), 'Keg Of Greater Refresh') && refresh > 0){
    		Orion.UseObject(ser);
    		Orion.Wait(700);
    		refresh = refresh - 1;
    	}
    	
    	while(Orion.Contains(k.Properties(), 'Keg Of Greater Cure') && cure > 0){
    		Orion.UseObject(ser);
    		Orion.Wait(700);
    		cure = cure - 1;
    	}
    	
    	while(Orion.Contains(k.Properties(), 'Keg Of Greater Stre') && str > 0){
    		Orion.UseObject(ser);
    		Orion.Wait(700);
    		str = str - 1;
    	}
    	
    	while(Orion.Contains(k.Properties(), 'Keg Of Greater Agility') && agy > 0){
    		Orion.UseObject(ser);
    		Orion.Wait(700);
    		agy = agy - 1;
    	}
    	
    	while(Orion.Contains(k.Properties(), 'Keg Of Greater Explosion') && explo > 0){
    		Orion.UseObject(ser);
    		Orion.Wait(700);
    		explo = explo - 1;
    	}
    	
    	if(heal == 0 && refresh == 0 && cure == 0 && explo == 0 && str == 0 && agy == 0){
    		return false;
    	}else{
    	Orion.Wait(50);
    		return true;
    	}
    });
    }
	
}
function recallEscape(){
	
	 if(Player.Mana() >= 11){
        var runebooks = Orion.FindTypeEx('0x22C5', any, backpack)
        var escapebook = 0
        runebooks.forEach(function(book){
            if (Orion.Contains(book.Properties(),'Escape') == true){
                escapebook = book.Serial();
            }
        });
        
        if (escapebook == 0){
            Orion.Print('No book found meeting criteria')
            return
        }
        Orion.UseObject(escapebook);
        if (Orion.WaitForGump(1000))
		{
			var gump0 = Orion.GetGump('last');
			if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x554B87F3'))
			{
				gump0.Select(Orion.CreateGumpHook(2));
				Orion.Wait(100);
				return;
			}
		}
        //Orion.Cast('Recall');
        //Orion.WaitForTarget(2000);
        //Orion.TargetObject(escapebook);
    }

}
function exploNoWait(){
    	var explosionPotions =Orion.FindType('0x0F0D', '-1', 'self', true);
		var explosionPotion = explosionPotions[0];
        Orion.UseObject(explosionPotion);
      
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
        	Orion.Wait(5);
       }

       Orion.Wait(635);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }       
}
function explo(){
    	var explosionPotions =Orion.FindType('0x0F0D', '-1', 'self', true);
		var explosionPotion = explosionPotions[0];
        Orion.UseObject(explosionPotion);
        while(!Orion.HaveTarget()){
        	Orion.Wait(10);
        }
        Orion.CancelTarget(); 
        while(!Orion.WaitJournal('3', Orion.Now(), Orion.Now() +2500, 'sys|my')){
        	Orion.Wait(5);
       }
       Orion.Wait(900);
       Orion.UseObject(explosionPotion);
       Orion.Wait(850);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }       
}
function explows(){
    	var explosionPotions =Orion.FindType('0x0F0D', '-1', 'self', true);
		var explosionPotion = explosionPotions[0];
        Orion.UseObject(explosionPotion);
        while(!Orion.WaitJournal('3', Orion.Now(), Orion.Now() +1100, 'sys|my')){
       }
       Orion.Wait(500);
          var wands = Orion.FindType(any);
     wands.every(function (w){
    var wa = Orion.FindObject(w);
      if(wa.Name() == 'Wand' && wa.Properties().indexOf('Lightning') !== -1){
        equipAndUseWand(w);

        return false;
      }
      return true;
   });
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
       }
       Orion.Wait(350);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }       
       
        while(!Orion.HaveTarget()){
        	Orion.Wait(30);
        }
        Orion.TargetObject(lasttarget);
}
function explox(){
    	var explosionPotions =Orion.FindType('0x0F0D', '-1', 'self', true);
		var explosionPotion = explosionPotions[0];
        Orion.UseObject(explosionPotion);
        Orion.Wait(250);    
        Orion.CancelTarget(); 
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
       }
       Orion.Cast('Energy Bolt');
       Orion.UseObject(explosionPotion);
       Orion.Wait(600);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }
       
        while(!Orion.HaveTarget()){
        	Orion.Wait(30);
        }
        Orion.TargetObject(lasttarget);
}
function exploxx(){
    	Orion.Cast('Explosion');
    	var pozz =Orion.FindType('0x0F0D', '-1', 'self', true);
		var pozza = pozz[0];
        Orion.UseObject(pozza);
       Orion.Wait(250);
        Orion.CancelTarget();
        Orion.CancelTarget();
        while(!Orion.HaveTarget()){
        	Orion.Wait(30);
        }
        Orion.TargetObject(lasttarget);
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
       }
        Orion.UseObject(pozza);
       Orion.Wait(500);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }
}

function exploxxx(){
    	Orion.Cast('Explosion');
    	var pozz =Orion.FindType('0x0F0D', '-1', 'self', true);
		var pozza = pozz[0];
    	Orion.Wait(700);
        Orion.UseObject(pozza);
       Orion.Wait(250);
        Orion.CancelTarget();
        Orion.CancelTarget();
        while(!Orion.HaveTarget()){
        	Orion.Wait(30);
        }
        Orion.TargetObject(lasttarget);
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
       }
       
    	Orion.Cast('Energy Bolt');
        Orion.UseObject(pozza);
       Orion.Wait(600);
       if(Orion.InLOS(lasttarget)){
       		Orion.TargetObject(lasttarget);
       }else{
       		Orion.TargetTile('any', Player.X()+2, Player.Y()+2, -1);
       }
        while(!Orion.HaveTarget()){
        	Orion.Wait(30);
        }
       		Orion.TargetObject(lasttarget);
}
function healWand(){
    //findWand('Greater Heal');
     findAndUseWand('Heal');
}
function lightWand(){

     findAndUseWand('Lightning', lasttarget);
}
function manaDrain(){
     findAndUseWand('Mana Drain', lasttarget);
}
function weakenWand(){
     findAndUseWand('Weaken', lasttarget);
}
function arrowWand(){
     findAndUseWand('Magic Arrow', lasttarget);
}
function findAndUseWand(name, target){
     var wands = Orion.FindType(any);
     wands.every(function (w){
    var wa = Orion.FindObject(w);
      if(wa.Name() == 'Wand' && wa.Properties().indexOf(name) !== -1){
        equipAndUseWand(w,target);

        return false;
      }
      return true;
   });
}
function findAndEquipWand(name, target){

   var wands = Orion.FindWand(name);
   equipWand(wands);
   
    return wands;
}
function equipAndUseWand(wandObject,target){
  Orion.Equip(wandObject);
  Orion.Wait(600);
  Orion.UseObject(wandObject);
    if(target){
        // cast it
        while(!Orion.HaveTarget()){ 
            Orion.Wait(40);
        }
        Orion.TargetObject(target);
      }
}
function equipWand(wandObject,target){
  Orion.Equip(wandObject);
}
function waitForStun(){
	while(!Player.Dead()){
			var findMsgObj = Orion.WaitJournal("Party Combo ", Orion.Now(), Orion.Now() + 3000);
            if(findMsgObj){
		        if (Orion.Contains(findMsgObj.Text(), "0x")){
		            var targ = findMsgObj.Text().split(" ")[2];
		          	Orion.Cast('Explosion', targ);
               		Orion.Wait(2650);
               		Orion.Cast('Energy Bolt', targ);
					
	            }
            }
            Orion.Wait(50);
	}
}

function dropExploBolt(){
	Orion.Cast('Explosion', lastattack);
	Orion.Wait(2650);
	Orion.Cast('Energy Bolt', lastattack);
}
function punch(){ 
	Orion.ClearJournal();
    Orion.UseWrestlingStun();
    if(Orion.WaitJournal('You get yourself ready', Orion.Now(), Orion.Now() + 200, "sys")){
    	Orion.CharPrint(Player.Serial(),45,'Stun ON');
    }else{
    	Orion.CharPrint(Player.Serial(),45,'Stun OFF');
    }
	while(!Orion.WaitJournal("successfully", Orion.Now(), Orion.Now() + 500, "sys") ){
//		if(Orion.WaitJournal('You get yourself ready|You decide to not try', Orion.Now(), Orion.Now() + 50, "sys")){
//	    	break;
//	    }
			
		Orion.Wait(50);
	}
	Orion.CharPrint(lastattack,65,'Stunned');
	Orion.CharPrint(lastattack,65,'Stunned');
	Orion.CharPrint(lastattack,65,'Stunned');
	Orion.CharPrint(lastattack,65,'Stunned');
	Orion.Wait(650);
    Orion.UseWrestlingStun();
    drinkRefresh();
	return true;
       		Orion.TargetObject(lastattack);
       		Orion.TargetObject(lastattack);
	//Orion.Say("/ Party Combo " + Orion.GetSerial(lastattack));
    	var pozz =Orion.FindType('0x0F0D', '-1', 'self', true);
		var pozza = pozz[0];
        Orion.UseObject(pozza);
        Orion.WaitForTarget(450);
       		Orion.TargetObject(lastattack);

	Orion.ClearJournal();
}

function getStats(){
	while(true){
		if(Player.Int() > 40){
			Orion.Cast('Night Sight', lasttile);
		}
	}
}
function Follower(){
    Orion.AddObject('FollowMe');
    Orion.Print("Who do you want to follow?");
    while (Orion.HaveTarget()){
        Orion.Wait(100);
    }

    var target = Orion.FindObject('FollowMe');
    while (target.Exists())    {
        Orion.WalkTo(target.X(), target.Y(), target.Z(), 3); //change "3" to distance you want stick to target
        Orion.Wait(100);
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
    var gold = Orion.FindType(any, -1 ,fromContainer.Serial());
    
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
function VetPet(){
	const useVet = true;
        const mobilesNearby = Orion.FindTypeEx(
        '-1',
        '-1',
        'ground',
        'mobile',
        8,
        'green|blue|innocent|gray|gray|criminal'
        )
    
      // filter only friends in the list
        const friendsNearby = mobilesNearby.filter(function (mobile) {
            return isFriend(mobile)
        }).concat([Player]);
        
        
    
      // get the lowest hp friend
          friendsNearby.sort(function (e1, e2) {
            return e1.Hits() - e2.Hits()
          });
        if (friendsNearby.length) {
               const lowestHpFriend = friendsNearby[0];
               if(!lowestHpFriend.IsHuman() && lowestHpFriend.Distance()<2){
               		healTarget(lowestHpFriend);
               }else{
	               if(useVet && !lowestHpFriend.IsHuman() && Orion.GetDistance(lowestHpFriend.Serial()) < 2){
	               		healTarget(lowestHpFriend);
	               }else{
		               if(lowestHpFriend.Poisoned()){
		               	
		               		Orion.Cast('Cure', lowestHpFriend.Serial());
		    				Orion.Print('Healing ' + lowestHpFriend.Name());
		               }
		               if(lowestHpFriend.Hits()<lowestHpFriend.MaxHits()){
		               
		    				Orion.Print('Healing ' + lowestHpFriend.Name());
		               		Orion.Cast('Greater Heal', lowestHpFriend.Serial());
		               	}
	               	}
               	}
               // healTarget(lowestHpFriend);
        }
     
}
function VetAllFriendlyPets(){
	const useVet = true;
    while(true){
    	Orion.UseSkill('Meditation');
        const mobilesNearby = Orion.FindTypeEx(
        '-1',
        '-1',
        'ground',
        'mobile',
        8,
        'green|blue|innocent|gray|gray|criminal'
        )
    
      // filter only friends in the list
        const friendsNearby = mobilesNearby.filter(function (mobile) {
            return isFriend(mobile)
        }).concat([Player]);
        
        
    
      // get the lowest hp friend
          friendsNearby.sort(function (e1, e2) {
            return e1.Hits() - e2.Hits()
          });
        if (friendsNearby.length) {
               const lowestHpFriend = friendsNearby[0];
               if(!lowestHpFriend.IsHuman() && lowestHpFriend.Distance()<2){
               		healTarget(lowestHpFriend);
               }else{
	               if(useVet && !lowestHpFriend.IsHuman() && Orion.GetDistance(lowestHpFriend.Serial()) < 2){
	               		healTarget(lowestHpFriend);
	               }else{
		               if(lowestHpFriend.Poisoned()){
		               	
		               		Orion.Cast('Cure', lowestHpFriend.Serial());
		    				Orion.Print('Healing ' + lowestHpFriend.Name());
		               }
		               if(lowestHpFriend.Hits()<lowestHpFriend.MaxHits()){
		               
		    				Orion.Print('Healing ' + lowestHpFriend.Name());
		               		Orion.Cast('Greater Heal', lowestHpFriend.Serial());
		               	}
	               	}
               	}
               // healTarget(lowestHpFriend);
        }
        Orion.Wait(2000);
    }
}

function healTarget(lowestHpFriend)
{
    Orion.WaitTargetObject(lowestHpFriend.Serial());
    Orion.UseType('0x0E21');
    Orion.Print('Healing Pet: ' + lowestHpFriend.Name());
    Orion.ClearJournal();
    var Timer = Orion.Now()+2250; var Msg = "You finish applying the bandages.";
    while (true) {
        Orion.Wait(100);
        if(Orion.InJournal(Msg) || Orion.Now() > Timer)
            break;
    }
    Orion.ClearJournal(Msg);
    Orion.Print(Orion.Count('0x0E21',any,backpack) + ' Bandages Left.');
}

function isFriend(mobileObj) {
    const friendsList = Orion.GetFriendList()
    if (friendsList.indexOf(mobileObj.Serial()) >= 0 && !mobileObj.Dead()) {
        return true
    }
    return false
}


function armMe(){
	if(isTwoHanded){
		Orion.Dress(Player.Name());
		if(Orion.InJournal('You must wait')){
			Orion.Wait(600);
			Orion.Dress(Player.Name());
		}
	}
}
function disarmMe(){
    if(isTwoHandedWeapon()){
        Orion.Disarm();
    }
}


function isTwoHandedWeapon(){

	var left = Orion.ObjAtLayer('LeftHand');
	var right = Orion.ObjAtLayer('rightHand');
	var weapon = right ? right : left;
	if(!weapon){
		return false;
	}
	var properties = weapon.Properties();
    var matches = properties.match("Two-handed");

    return matches && !properties.match("bow") ? true : false;
}

function drinkHeal(){
  if(!Player.Poisoned()){
       disarmMe();
       Orion.UseType('0x0F0C', '0xFFFF');//heal pot
       armMe();
       Orion.Wait(500);
    }
}
function drinkCure(){
  if(Player.Poisoned() && useCure ){
       disarmMe();
        Orion.UseType('0x0F07', '0xFFFF');// cure pot
        armMe();
        Orion.Wait(500);
    }
}
function healMe(){    
    drinkCure();
	if(Player.Hits() < 60){
		healPotion();
		if(Player.Name() == 'MilkLizard'){
			Orion.CancelTarget();
			Orion.CancelTarget();
			Orion.CancelTarget();
			Orion.CancelTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			Orion.Cast('Greater Heal');
			Orion.WaitForTarget(1650);
			Orion.TargetObject('self'); 
		}
	}
    
	if(Player.Hits() < Player.MaxHits() && lastbandage < Date.now() - 10000){
		if(Player.Name() == 'MilkLizard'){
			Orion.CancelTarget();
			Orion.CancelTarget();
			Orion.CancelTarget();
			Orion.CancelTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			Orion.CancelWaitTarget();
			if(Player.Poisoned()){
				Orion.Cast('Cure');
				Orion.WaitForTarget(1000);
				Orion.TargetObject('self'); 
				Orion.WaitForTarget(100);
			}
			Orion.Cast('Heal');
			Orion.WaitForTarget(1000);
			Orion.TargetObject('self'); 
		}else{
			bandagetimer();
		}
	}   
	if(Player.Stam() < Player.MaxStam() / 3 ){
		drinkRefresh();
	}
}

function drinkRefresh(){
	
		disarmMe();
		Orion.UseType('0x0F0B', '0xFFFF');
		armMe();

}
function AutoHealFriends(){
	
	while(true){
		HealFriends();
		Orion.Wait(3000);
	}
	
}
function HealFriends() {
  Orion.ClearHighlightCharacters([(priorityHighlightList = false)])
  Orion.Ignore('self')

  const mobilesNearby = Orion.FindTypeEx(
    '-1',
    '-1',
    'ground',
    'mobile|ignoreenemies',
    16,
    'gray|green|red|blue|innocent|criminal|enemy'
  )

  // filter only friends in the list
  const friendsNearby = mobilesNearby.filter(function (mobile) {
    return isFriend(mobile)
  }).concat([Player]);

  // get the lowest hp friend
  friendsNearby.sort(function (e1, e2) {
    return e1.Hits() - e2.Hits()
  });

  if (friendsNearby.length) {
    const lowestHpFriend = friendsNearby[0]
    if (!checkFriendStatus(lowestHpFriend) ) {
      Orion.CharPrint(Player.Serial(), 65, '* no friends in need! *')
    }
  } else {
    Orion.CharPrint(Player.Serial(), 65, '* no friends nearby. *')
  }

  return null;
}

function useMoongate(){
	Orion.UseFromGround("0x0F6C");
}

function isFriend(mobileObj) {
  const friendsList = Orion.GetFriendList()
  if (friendsList.indexOf(mobileObj.Serial()) >= 0 && !mobileObj.Dead()) {
    Orion.CharPrint(mobileObj.Serial(), 65, '** Friend **')
    return true
  }
  return false
}
function checkFriendStatus(friend) {
  if (friend) {
    const friendSerial = friend.Serial()
    const friendName = friend.Name()
    if (friend.Frozen() && !friend.IsHuman()) {
      Orion.AddHighlightCharacter(friendSerial, 1159, [
        (priorityHighlightList = false)
      ])
      Orion.CharPrint(Player, 65, 'breaking ' + friendName + 'paralize')
      Orion.PrintFast(friend.Serial(), 65, 1, 'breaking para...')
      Orion.Cast('Feeblemind', friendSerial)
      return true
    } else if (friend.Poisoned()) {
      Orion.AddHighlightCharacter(friendSerial, 1159, [
        (priorityHighlightList = false)
      ])
      Orion.CharPrint(Player.Serial(), 65, 'curing ' + friendName + 'poison')
      Orion.PrintFast(friend.Serial(), 65, 1, 'curing poison...')
      Orion.Cast('Cure', friend.Serial())
      return true
    } else if (friend.Hits() <= friend.MaxHits() * 0.75) {
      Orion.AddHighlightCharacter(friendSerial, 1159, [
        (priorityHighlightList = false)
      ])
		if(!friend.IsHuman() && friend.Distance()<2){
				healTarget(friend); 
		}
      Orion.CharPrint(Player.Serial(), 65, 'healing ' + friendName);
      Orion.PrintFast(friend.Serial(), 65, 1, 'greater healing...');
      Orion.Cast('Greater Heal', friend.Serial());
      return true;
    } else if (friend.Hits() < friend.MaxHits()) {
      Orion.AddHighlightCharacter(friendSerial, 1159, [
        (priorityHighlightList = false)
      ])
      Orion.CharPrint(Player.Serial(), 65, 'healing ' + friendName);
      Orion.PrintFast(friendSerial, 65, 1, 'healing...');
       if(!friend.IsHuman() && friend.Distance()<2){
         		healTarget(friend); return true;
		}
       if(!friend.IsHuman()){
         		 Orion.Cast('Greater Heal', friendSerial); return true;
		}
      Orion.Cast('Heal', friendSerial);
      return true;
    }
  }
  return false
}

function setTarget(){
	Sallos.SetTarget();
	while(Orion.HaveTarget()){
		Orion.Wait(50);
	}
	Orion.Attack(lasttarget);
}

function followLastTarget(){
	Orion.Follow(lasttarget);
}
var previousEnemy;
var notorietyColors = {
  2: 60,
  3: 87,
  5: 43,
  6: 33
}
function TargetNext(){ 
	if(Player.Name() == 'Demerzel' || Player.Name() == 'Daneel Olivaw'  || Player.Name() == 'Josh Scogin'  ){
		mobileID = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself|ignorefriends",12, "gray|criminal|orange|red|blue");
	}else{
	
		mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself|ignorefriends",12, "gray|criminal|orange|red");
		//mobileID = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself|ignorefriends",18, "gray|criminal|orange|red");
	}
		var enemytarget = Orion.FindObject(mobileID);
    //Orion.Print(mobileID);
	if (mobileID.length){
		var enemyColor = 33;
		
		Orion.ClearHighlightCharacters();
		Orion.RemoveHighlightCharacter(previousEnemy);
		//Orion.Print( enemytarget.Notoriety());
		Orion.CharPrint(mobileID,enemyColor , '*** Target Found ***');
		   	if(Player.Name() !== 'Aulin'){
          		 Orion.TargetObject(mobileID);
         
           }else{
           	 if(!Player.Hidden()){
           	  Orion.Say('All Guard Me');
           	  }
           }  
           
           Orion.ClientLastTarget(mobileID);
		
		if(shouldFollow){ Orion.Follow(mobileID); }
		Orion.ShowStatusbar(mobileID, 100, 200);
		Orion.SayParty('Target: '+enemytarget.Name());
		Orion.CharPrint(Player.Serial() , enemyColor, 'Target: '+enemytarget.Name());
		 Orion.AddHighlightCharacter(mobileID, 15);
		Orion.Ignore(mobileID);
		previousEnemy = mobileID;
		Orion.Wait(50);
		return;
	}
	
	Orion.IgnoreReset();
	Orion.CharPrint(Player.Serial() , 33, '*** No Enemies Found ***');
}
 function AutoAttackChamp(){
	while(!Player.Dead()){
		//if(bettles[Player.Name()]){
		//	deposit();
		//}
		armMe();
	//	if(Player.Name()=='Aulin'){
	//		TargetNext();
	//		AttackNext(mobileID);
	// 		Orion.Wait(800);
	//	}else{
		var mobobj = Orion.FindObject(mobileID);
		if(!mobileID || !Orion.ObjectExists(mobileID) || !mobobj.InLOS() || mobobj.Dead() ){
            if(shouldFollow){ Orion.Follow(mobileID); }
			TargetNext();
			if(mobobj) Orion.Print(mobobj.Notoriety());
	//		AttackNext(mobileID);
		}else{
			Orion.Resend();
          	 if(shouldFollow){ Orion.Follow(mobileID); }
			AttackNext(mobileID);
			Orion.Print(mobobj.Distance());
			Orion.Print(mobobj.Exists());
		}
        if(shouldFollow){ Orion.Follow(mobileID); }
        Orion.Wait(200);
   //     }
	}
}
function AutoHealPVM(){
	var isTwoHanded = isTwoHandedChar[Player.Name()];

    function runme(){
         Orion.CharPrint(Player.Serial(), 65, '*** AutoHeal started for '+Player.Name()+' ***');
         while(!Player.Dead()) {
                healMe();
                Orion.Wait(600);
        }
    }
	runme();
}
function healPotion(){  
	var healTime = 10000;
	if(Orion.GetGlobal('lastheal') < Date.now() - Orion.GetGlobal('healTime')){
		if( Player.Hits() < Player.MaxHits() ){
			 disarmMe();
			 Orion.UseType('0x0F0C', '0xFFFF');//heal pot
			 var msg = 'some damage';
			 if(Orion.InJournal(msg)){
			     Orion.SetTimer('HealPotion', healTime);
			     Orion.AddDisplayTimer('HealPotion', healTime, 'AboveChar', 'Circle|Bar', 'Heal Pot',35, 0, '0000ff ', 0xFFF, '0xFFF00FFE');    
			   
				Orion.SetGlobal('healTime',healTime);
				Orion.SetGlobal('lastheal', Date.now());
			}
			armMe();
	  	}else{
	  		Orion.CharPrint(Player.Serial(), 45, 'Already full health');
	  	}
  	}
}
function bandagetimer() {
	if(!Orion.GetGlobal('lastbandage') || !Orion.GetGlobal('lasttimebandage')  || Orion.GetGlobal('lastbandage') < Date.now() - Orion.GetGlobal('lasttimebandage')){
		if (Player.Hits() < Player.MaxHits()) {
			if (Player.Dex() < 100) {
				timetobandage = ((14.5 - (Player.Dex() / 20)) * 1000)+250;
			} else {
				timetobandage = ((13.5 - (Player.Dex() / 20)) * 1000)+250;
			}
			if (Player.Poisoned()) {
				timetobandage = timetobandage + 2000;
			}
			Orion.Wait(200);
			Orion.BandageSelf();
			
			if(Orion.WaitJournal('You begin', Orion.Now(), Orion.Now() +500, 'sys|my')){
				Orion.SetTimer('bende', timetobandage);
				Orion.CharPrint(Player.Serial(), 65, 'Bandage Started');
				Orion.AddDisplayTimer('bende', timetobandage, 'AboveChar', 'Circle|Bar', 'Bandage', -35, 0, '0xFFFF', 0xFFF, '0xFFFFFFFE');  
				Orion.SetGlobal('lasttimebandage',timetobandage);
				Orion.SetGlobal('lastbandage', Date.now());
			}
			drinkCure();
		}else{
			Orion.CharPrint(Player.Serial(), 45, 'Already at Full Health');
		 }
	}
}

function testColor(){
		Orion.Print(Player.Direction() & 7)
		Orion.Print(Player.X());		Orion.Print(Player.Y());
}



function deposit(){
	var bettle = bettles[Player.Name()];
	if (Player.Weight() > 340 && shouldDeposit) {
	   	Orion.UseObject('self');
		Orion.Wait(550);
	   	var gold = Orion.FindType('0x0EED', '0xFFFF',backpack); //gold
		Orion.Wait(350);
	    Orion.MoveItem(gold, -1, bettle);
		Orion.Wait(1000);
		Orion.UseObject(bettle);
	}
}


function AttackNext(){ 
	var toCast = 'Energy Bolt';
//	var toCast = 'Energy Bolt';
    		if(shouldFollow){ Orion.Follow(mobileID); }
            Orion.CharPrint(mobileID, 33, '*** Target Found ***');
          	if(Player.Name() !== 'Aulin'){
           Orion.TargetObject(mobileID);
           Orion.ClientLastTarget(mobileID);
           }else{
           		if(!Player.Hidden()){
           	  		Orion.Say('All Guard');
           	  	}
           }
            Orion.Attack(mobileID);
			Orion.Wait(300);
			if(Player.Name() == 'MilkLizard'){
				if(Player.Mana() < 20){
					Orion.UseSkill('Meditation');
				}else{
						var mob = Orion.FindObject(mobileID);
						 if (mob && mob.Distance() < 3 ) {
						    Orion.Print("Distance < 3, running!");
						    var px = Player.X() + 5;
   						    var py = Player.X() + 5;
						    Orion.WalkTo(px, py, Player.Z(), 5, 1, 1, 1);
						  Orion.Wait(2000);
						  }
					if(mob && mob.InLOS()){
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
						Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
						Orion.CancelTarget();
				    	Orion.CancelTarget();
				    	Orion.CancelTarget();
						Orion.CancelWaitTarget();
						Orion.CancelWaitTarget();
						Orion.CancelWaitTarget();
						Orion.CancelWaitTarget();
						Orion.CancelWaitTarget();
						Orion.Cast(toCast,mobileID);
						Orion.WaitForTarget(2000);
						Orion.TargetObject(mobileID);
					}
				}
				
				Orion.UseSkill('Meditation');
			}
		  Orion.Ignore(mobileID);
		  Orion.Wait(50);
}

function AutoProvoke() {
    var nearest = Orion.FindType('!0x0190|!0x00A4', '0xFFFF', ground, 'near|live|ignoreself|ignorefriends', '18', 'red|gray|criminal');
    if (nearest) {
        Orion.CharPrint(nearest, 1153, 'Inciting ');
        var first = nearest;
        Orion.Wait(100);
        Orion.Ignore(nearest, true);
        Orion.Wait(100);
        nearest = Orion.FindType('!0x0190|!0x00A4', '0xFFFF', ground, 'near|live|ignoreself|ignorefriends', '25', 'red|gray|criminal');
        var second = nearest;
        Orion.CharPrint(nearest, 1153, 'onto');
        Orion.Ignore(nearest, true);
        Orion.Wait(600);
		Orion.IgnoreReset();
        Orion.UseSkill("Provocation");
        Orion.WaitForTarget(600);
        Orion.TargetObject(first);
        Orion.WaitForTarget(600);
        Orion.TargetObject(second);
        //Orion.IgnoreReset();
        if(Orion.InJournal('Your music succeeds')){
        	Orion.CharPrint(Player.Serial(), 65, 'Provoke Success');
        }
        if(Orion.InJournal('You fail') || Orion.InJournal('You must wait')){
        	Orion.CharPrint(Player.Serial(), 45, 'Provoke Failed');
        }
        
		Orion.ClearJournal();
    } else {
        Orion.Print("No Mobs within range to provoke");
        Orion.IgnoreReset();
    }
    Orion.CharPrint("self", 1153, "Provocation Completed!");
}


function castExplosion(){
	castOffensiveSpell('Explosion', 1950);
}

function castPoison(){
	castOffensiveSpell('Poison', 1170);
}

function castEnergyBolt(){
	castOffensiveSpell('Energy Bolt',2050);
}

function castWeaken(){
	castOffensiveSpell('Weaken', 720);
}

function castClumsy(){
	castOffensiveSpell('Clumsy', 720);
}

function castFeeblemind(){
	castOffensiveSpell('Feeblemind',720);
}
function castMagicArrow(){
	castOffensiveSpell('Magic Arrow',720);
}

function castMindBlast(){
	castOffensiveSpell('Mind Blast', 1650);
}

function moveWands(){
	Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');
    
    Orion.AddObject('toContainer');
    Orion.Print('Select a container to move items to');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var toContainer = Orion.FindObject('toContainer');
    var gold = Orion.FindType(any, -1 ,fromContainer.Serial());
    
    Orion.Print(gold);
    gold.map(function(g){
    	var toid = Orion.FindObject(g);
    	if(Orion.Contains(toid.Properties(), 'Mana Drain')){
			
			Orion.MoveItem(g, 1, toContainer.Serial());
    		Orion.Wait(800);
    	}
    
    });
}
function repairArmors(){
	Orion.AddObject('fromContainer');
    Orion.Print('Select a container to repair items from');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');

    var gold = Orion.FindType(any, -1 ,fromContainer.Serial());
    var armor_type = 'Plate';
    gold.map(function(g){
    	var toid = Orion.FindObject(g);
    	if(Orion.Contains(toid.Properties(), armor_type)){
			Orion.UseType('0x13E3', '0xFFFF');
			Orion.Wait(1000);
			
				var gump0 = Orion.GetGump('last');
				gump0.Select(Orion.CreateGumpHook(42));
					Orion.Wait(100);
				
			
			if (Orion.WaitForTarget(1000)){
				Orion.TargetObject(g);
			}
			//Orion.TargetObject(toid.Serial());
            //Orion.MoveItem(g, 1, toContainer.Serial());
    		Orion.Wait(600);
    	}
    
    });
}
function getAllLeather(){
	Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');
    
    Orion.AddObject('toContainer');
    Orion.Print('Select a container to move items to');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var toContainer = Orion.FindObject('toContainer');
    var gold = Orion.FindType(any, -1 ,fromContainer.Serial());
    
    var armor_type = 'leather';
    gold.map(function(g){
    	var toid = Orion.FindObject(g);
    	if(Orion.Contains(toid.Properties(), armor_type)){
			Orion.UseObject('0x40B6AD69');
			Orion.Wait(1000);
			
				var gump0 = Orion.GetGump('last');
				gump0.Select(Orion.CreateGumpHook(42));
					Orion.Wait(100);
				
			
			if (Orion.WaitForTarget(1000)){
				Orion.TargetObject(g);
			}
			//Orion.TargetObject(toid.Serial());
            //Orion.MoveItem(g, 1, toContainer.Serial());
    		Orion.Wait(600);
    	}
    
    });
}
function castOffensiveSpell(spell, timer){
	Orion.TargetObject(lasttarget);
	Orion.Cast(spell);
	if(timer){
		Orion.Wait(timer);
		Orion.TargetObject(lasttarget);
	}
}

function runForrest(){
	    	Orion.Print('Running...');
		var value = 8;
	    var empty = 0;
 
    	var offset =[
	        [empty, -value],        //direction = 0
	        [value, -value],        //direction = 1
	        [value, empty],     //direction = 2
	        [value, value],     //direction = 3
	        [empty, value],     //direction = 4
	        [-value, value],        //direction = 5
	        [-value, empty],        //direction = 6
	        [-value, -value]        //direction = 7
	    ];

	    var xy = offset[Player.Direction() & 7];
 	while(!Player.Dead()){

	    var thex = Player.X() + xy[0];
	    var they = Player.Y() + xy[1];
  		Orion.WalkTo(thex, they);
  		Orion.Wait(5);
  	}
}

function MatrixPrintTest(){
    var posX = Player.X();
    var posY = Player.Y();
    var posZ = Player.Z();
    var radius = 12;
    var index = 1;
	Orion.ClearFakeMapObjects();
    for (var i = -radius; i <= radius; i++){
        for (var j = -radius; j <= radius; j++){
            Orion.AddFakeMapObject((index), '0x1822', 33, posX + i, posY + j, posZ + 1);
            //Orion.Wait(5);
            index++;
        }
    }
}



function tameIt(creature) {
    // Tame a creature
    Orion.UseSkill('Animal Taming');
    Orion.WaitTargetObject(creature);
}

function tamingMacro() {
    var ignore = [];
    var searchDistance = 3;
    var isNearTheTarget = false;
    var ignoreList = [];
    while (true) {
        Orion.ClearJournal();
        var target = Orion.FindType('0x0030', '-1', ground, 'fast|mobile|live', searchDistance, 'gray|criminal|red');
        if (target.length) {

            var targetobject = Orion.FindObject(target);
            Orion.UseSkill('Peacemaking', target);
            Orion.Wait(200);
            Orion.Print(targetobject.Name());

            if (targetobject.Name() === 'Aulin') {
                Orion.Print(target);
              //  while (!targetobject.Dead()) {
                    Orion.Attack(target);
                    Orion.Wait(600);
               // }
                //   ignoreList.push('!'+target);
            }

            if (targetobject.Name() !== 'Aulin') {

                Orion.Print(target);
                Orion.RemoveObject("target");
                Orion.AddObject("target", target);
                var targetX = Orion.FindObject("target");
                
                isNearTheTarget = false;
                for (var i = 0; i < target.length; i++) {
                    var creature = target[i];

                    targetobject = Orion.FindObject(creature);



                    var tamed = false;
                   // while (!tamed) {

                        Orion.UseType('0x0F07', '0xFFFF');


                        Orion.AddHighlightCharacter(creature, '123');
                        while (targetobject.WarMode()) {
                            Orion.UseSkill('Peacemaking');
                            Orion.WaitTargetObject(creature);
                            Orion.Wait(500);
                        }
                        Orion.Wait(500);
                        tameIt(creature);
                        if (!Orion.InJournal('angry to continue')) {
                            Orion.Wait(13000);
                        }
                        if (Orion.InJournal('master|challenging')) {
                            tamed = true;
                            Orion.Wait(500);
                            Orion.RenameMount(creature, 'Aulin');
                            Orion.Wait(500);
                            releaseCreature(creature);
                            while (!targetobject.Dead()) {
			                    Orion.Attack(creature);
			                    Orion.Wait(600);
			                }
                        }

                        if (Orion.InJournal('fail to tame')) {

                        } else {
                            Orion.Wait(1500);
                        }

                    }
                }
        } else {
        	Orion.IgnoreReset();
            Orion.Print('not found, increasing search distance');
            // searchDistance += 5;
            Orion.Wait(500);
        }

    }
}

function trainPets(){
	while(true){
		Orion.UseSkill('21');
		Orion.UseObject('0x49F6C467');
		Orion.Wait(23000);
		var pet1 = Orion.FindObject('0x000C5C30');
		var pet2 = Orion.FindObject('0x003B4984');
		while(pet1.Hits() < pet1.MaxHits() && pet2.Hits() < pet2.MaxHits()){
			VetPet();
			pet1 = Orion.FindObject('0x000C5C30');
			pet2 = Orion.FindObject('0x003B4984');
			Orion.Wait(1000);
		}
	}

}

function releaseCreature(creature) {
    Orion.RequestContextMenu(creature);
    Orion.WaitContextMenuID(creature, 8);
    if (Orion.WaitForGump(2000)) {
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (gump0.ID() === '0x909CC741')) {
            gump0.Select(Orion.CreateGumpHook(2));
            Orion.Wait(100);
        }
    }
}
function findClosestPlayer() {
    const objects = Orion.FindType(
        0xFFFF, 0xFFFF, 
        "ground", 
        "human, near, live, ignorefriends, ignoreself", 18
    );
    if (objects.length > 0) {
        const players = objects
            .map(function(x) {
                return Orion.FindObject(x);
            })
            .filter(function(x) {  
                return !x.IsPlayer() && x.IsHuman();
            })
            .sort(function (a, b) {
                return Orion.GetDistance(a.Serial()) - Orion.GetDistance(b.Serial());
            });
        if (players.length > 0) {
            const player = players[0];
            Orion.Print("Found player "+ player.Name() + " -> " + Orion.GetDistance(player.Serial()));
            return player.Serial();        
        }
    }
    return false;
}

function snoopClosest() {
    const player = findClosestPlayer();
    if (player !== false) {
        if (Orion.GetDistance(player) > 1) {
            Orion.Print("Come closer")
        } else {
            const thebackpack = Orion.ObjAtLayer('21', player);
            if (thebackpack) {
                Orion.OpenContainer(thebackpack.Serial());
            }
        }
    }
}

function getClosestBackpack() {
    const player = findClosestPlayer();
    if (player !== false) {
        if (Orion.GetDistance(player) > 1) {
            Orion.Print("Come closer")
        } else {
            const thebackpack = Orion.ObjAtLayer('21', player);
            if (thebackpack) {
                Orion.OpenContainer(thebackpack.Serial());
                
			    return thebackpack;
            }
        }
    }
    return null;
}
function stealWeapon(){
	Orion.UseWrestlingDisarm();
	Orion.AddObject('weaponToSteal');
    Orion.Print('Select a weapon to steal');
    while(Orion.HaveTarget()){
        Orion.Wait('50');
    }
    var weaponToSteal = Orion.FindObject('weaponToSteal');
    var theBack = getClosestBackpack();
    Orion.ClearJournal();
    while(!theBack){
	    theBack = getClosestBackpack();
    	Orion.Wait(20);
    }
    
     while(!Orion.InJournal('You successfully disarm')) {
          Orion.Wait(500);
      }
   var weap = Orion.FindObject(weaponToSteal, theBack.Serial());
    Orion.Print('get weap');
    Orion.Print(weap);
    Orion.Print(weaponToSteal);
    Orion.Wait(20); 
    Orion.UseSkill('stealing',weaponToSteal.Serial());
  
    Orion.Print(weap);
    
    
}

//relic 0x2AA4


function stealPSrelic(){
    var theBack = getClosestBackpack();
    Orion.ClearJournal();
    while(!theBack){
	    theBack = getClosestBackpack();
    	Orion.Wait(50);
    }
    
    	Orion.Wait(20);
    var toSteal = Orion.FindType('0x2AA4','any', theBack.Serial());
    	Orion.Wait(20);
    	Orion.Print(toSteal);
    if(toSteal!= ''){
    	Orion.Wait(20); 
    	Orion.UseSkill('stealing', toSteal);
    	Orion.Wait(300);
    	Orion.UseSkill('hiding');
    	return;
    }  
    toSteal = Orion.FindType('0x14F0', '0xFFFF', theBack.Serial());
    	Orion.Wait(20);
    	Orion.Print('ps');
    	Orion.Print(toSteal);
    if(toSteal != ''){
    	Orion.Wait(20); 
    	Orion.UseSkill('Stealing', toSteal);
    	Orion.Wait(300);
    	Orion.UseSkill('hiding');
    	return;
    }  
    
    var puches = Orion.FindType('0x0E79', '0xFFFF', theBack.Serial());
    puches.forEach(function(p) {
	      var toSteal = Orion.FindType('0x2AA4','any', theBack.Serial());
	    	Orion.Wait(20);
	    	Orion.Print(toSteal);
	    if(toSteal!= ''){
	    	Orion.Wait(20); 
	    	Orion.UseSkill('stealing', toSteal);
	    	Orion.Wait(300);
	    	Orion.UseSkill('hiding');
	    	return;
	    }  
	    toSteal = Orion.FindType('0x14F0', '0xFFFF', theBack.Serial());
	    	Orion.Wait(20);
	    	Orion.Print('ps');
	    	Orion.Print(toSteal);
	    if(toSteal != ''){
	    	Orion.Wait(20); 
	    	Orion.UseSkill('Stealing', toSteal);
	    	Orion.Wait(300);
	    	Orion.UseSkill('hiding');
	    	return;
	    }  
    });
    
}