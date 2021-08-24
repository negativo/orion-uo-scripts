var searchDistance = 3;
var isNearTheTarget = false;
var ignoreList = [];

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
        '0x00C9',
    ];

    var animals = ignoreList.lenght > 0 ? toTame.concat(ignoreList) : toTame;
    return animals.join('|');
}

function walkToTarget(target) {
    // Literally walk the Player to the Target.
    var targetDestinationX = target.X();
    var targetDestinationY = target.Y();
    var px = Player.X();
    var py = Player.Y();
    Orion.WalkTo(targetDestinationX, targetDestinationY, 0);
    Orion.Wait(2000);
    while ((px < targetDestinationX - 3 || px > targetDestinationX + 3) && (py < targetDestinationY - 3 || py > targetDestinationY + 3)) {
        px = Player.X();
        py = Player.Y();
        Orion.WalkTo(targetDestinationX, targetDestinationY, 0);
    }
    isNearTheTarget = true;
}

function tameIt(creature) {
    // Tame a creature
    Orion.UseSkill('Animal Taming');
    Orion.WaitTargetObject(creature);
}

function main() {
    var ignore = [];
    while (true) {
        Orion.ClearJournal();
        var target = Orion.FindType(getAnimals(), '-1', ground, 'fast|mobile|live', searchDistance, 'gray|criminal|red');
        
        
        if (target.length) {

            var targetobject = Orion.FindObject(target);

        Orion.Print(targetobject.Name());

            if (targetobject.Name() === 'Aulin') {
                Orion.Print(target);
                Orion.Ignore(target);
                while(!targetobject.Dead()){
                	Orion.Attack(target);
                	Orion.Wait(600);
                }
             //   ignoreList.push('!'+target);
            }
 
            if (targetobject.Name() !== 'Aulin') {

                Orion.Print(target);
                Orion.RemoveObject("target");
                Orion.AddObject("target", target);
                var targetX = Orion.FindObject("target");
                Orion.Print(targetX.X());
            //    while (!isNearTheTarget) {
             //       walkToTarget(targetX);
              //      Orion.Wait(2000);
            //    }
                isNearTheTarget = false;
              //  Orion.Follow(targetX);
                for (var i = 0; i < target.length; i++) {
                    var creature = target[i];
                
                    targetobject = Orion.FindObject(creature);



                    var tamed = false;
                    while (!tamed) {
         
            Orion.UseType('0x0F07', '0xFFFF');
            
        
                        Orion.AddHighlightCharacter(creature, '123');
                        while (targetobject.WarMode()) {
                            Orion.UseSkill('Peacemaking');
                            Orion.WaitTargetObject(creature);
                            Orion.Wait(500);
                        }
                        Orion.Wait(500);
                        tameIt(creature);
                   //     while (!isNearTheTarget) {
                  //          walkToTarget(targetX);
                 //           Orion.Wait(2000);
                  //      }
                  //      isNearTheTarget = false;
                  
                        if (!Orion.InJournal('angry to continue')) {
                        Orion.Wait(13000);
}
                        if (Orion.InJournal('master|challenging')) {
                            Orion.Wait(500);
                            Orion.RenameMount(creature, 'Aulin');
                            Orion.Wait(500);
                            releaseCreature(creature);
                            /*  while(Orion.ObjectExists(creature)){
                                  Orion.WaitForTarget(300);
                                  Orion.Cast('Lightning');
                                  Orion.WaitForTarget(3000);
                                  Orion.WaitTargetObject(creature);
                              }
                              Orion.ClearHighlightCharacters();
                              */
                Orion.Ignore(target);
                            tamed = true;
                        }

                        if (Orion.InJournal('fail to tame')) {

                        } else {
                            Orion.Wait(3000);
                        }

                    }
                }
            }
        } else {
            Orion.Print('not found, increasing search distance');
                // searchDistance += 5;
            Orion.Wait(500);
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