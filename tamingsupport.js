var searchDistance = 3;
var isNearTheTarget = false;
var bow = '0x403FA729';
var ignoreList = [];
var toKill = [
        '0x004A'
    ];
function main() {
    while (true) {
    
     
            Orion.UseType('0x0F07', '0xFFFF');
            
        Orion.Wait(500);
        healHim();
        Orion.Wait(2000);
        healHim();
        Orion.Wait(2000);
         healMe();
        Orion.Wait(2000);
        
        
        var target = Orion.FindType(getAnimals(), '-1', ground, 'fast|mobile|live', searchDistance);
        if (target.length) {
            var targetobject = Orion.FindObject(target);
            if (targetobject.Name() === 'Aulin') {
                Orion.Print(target);
                while(Orion.ObjectExists(target)){
                
            Orion.Equip(bow);
                    Orion.Attack(target);
                }
                Orion.Disarm();
                Orion.Disarm();
            }
              
                Orion.Disarm();
        }
                Orion.Disarm();
       
    }
}

function getAnimals() {
    // Set Animal types and return a string with all the animals.
    var toTame = [
        '0x00D9',
        '0x00D3',
        '0x003F',
        '0x00D6',
        '0x00D4',
        '0x00E1',
        '0x0058',
        '0x00E7',
        '0x00E4',
        '0x00A7',
        '0x122A',
        '0x0122',
        '0x00D1',
        '0x00CF',
        '0x00D8',
        '0x00DF',
        '0x0019'
    ]; toTame = [
        '0x0030',
        '0x00C9','0x00CE','0x004A'
    ]; 

    var animals = ignoreList.lenght > 0 ? toTame.concat(ignoreList) : toTame;
    return animals.join('|');
}
function healHim()
{
Orion.UseType('0x0E21', '0xFFFF');

        Orion.TargetObject('0x002ECE55');
    if (Orion.WaitForTarget(1500))
        Orion.TargetObject('0x002ECE55');
       
    
    Orion.TargetObject('0x002ECE55');
    Orion.TargetObject('0x002ECE55');
}
function healMe()
{
Orion.UseType('0x0E21', '0xFFFF');
    if (Orion.WaitForTarget(1500))
        Orion.TargetObject('self');
}

