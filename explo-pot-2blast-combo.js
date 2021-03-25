
	var pozz =Orion.FindType('0x0F0D', '-1', 'self', true);
			var pozza = pozz[0];
        Orion.Wait(150);
     	Orion.Cast("Explosion");
        Orion.Wait(100);
   
       
        Orion.UseObject(pozza);
        Orion.CancelTarget();
        
        Orion.WaitForTarget(1000);
          Orion.TargetObject( lasttarget);
        while(!Orion.WaitJournal('2', Orion.Now(), Orion.Now() +2500, 'sys|my')){
        
       }
        Orion.UseObject(pozza);
        Orion.WaitForTarget();
          Orion.TargetObject( lasttarget);
          Orion.TargetObject( lasttarget);

