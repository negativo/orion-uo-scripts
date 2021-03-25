var mobileID;
 function main(){
	while(true){
	
	//var target = Orion.FindType('any', '-1', ground, 'fast|mobile|live', 10, 'red|grey|gray');
	//Orion.Attack(target);
	
//			deposit();
		
		if(!mobileID || !Orion.ObjectExists(mobileID)){
			TargetNext();
		}else{
			//Orion.Follow(mobileID);
			Att();
			//shouldThrowPotion();
		}
		
	
	}
}

function Att(){
   var demerzel =Orion.FindObject(mobileID);
	if(demerzel.Hits()*4 > 50){
		
  		 var bows =Orion.FindType('0x13B2', '0xFFFF');
  		 Orion.Equip(bows[0]);
		Orion.Attack(mobileID);
		Orion.Wait(300);
	}else{
		Orion.Disarm();
	}
}

function TargetNext(){ 
    
        Orion.IgnoreReset();
        //mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself", 8, "gray|criminal|orange|red|green");
        mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself", 8, "gray|criminal|orange|red");
        if (mobileID.length){
           // Orion.Follow(mobileID);
        Att();
			//shouldThrowPotion();
           // Orion.Ignore(mobileID);
            return;
        }
   
    
    Orion.Print("No enemies");
}