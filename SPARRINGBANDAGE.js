

while(true){
//	var weapon = Orion.FindType('0x13E3', '0xFFFF');
//   Orion.Equip(weapon[0]);
//   Orion.Attack('0x0008AEDD');
	Orion.CancelTarget();
	Orion.Wait(2000);
	Orion.UseType('0x0E21', '0xFFFF');
	if (Orion.WaitForTarget(1000)){
		Orion.TargetObject('self');	
	}
}

Orion.Attack('0x0008AEDD');
	Orion.Wait(1000);
	Orion.UseType('0x0E21', '0xFFFF');
	if (Orion.WaitForTarget(1000)){
		Orion.TargetObject('self');	
	}
	
	Orion.Wait(1000);
	Orion.UseType('0x0E21', '0xFFFF');
	if (Orion.WaitForTarget(1000)){
		Orion.TargetObject('0x0008AEDD');	
	}
	Orion.Wait(3000);
