var previousLastTarget;

function getMouse(){
	while(true){
		var mousePos = Orion.GetMousePosition();
		Orion.Print(mousePos.X(), mousePos.Y());
		Orion.SetWorldMapPointerPosition(mousePos.X(), mousePos.Y());
		Orion.Wait(1000);
	}
}
function getGumps() {
    Orion.Print(Orion.GumpCount());
    Orion.Print(Orion.GumpCount());
}

function ScanSign() {
    var houseSignsID = [
        "0xbd2",
        "0xbac",
        "0xbb2"
    ];
    var signs = [].concat.apply([], houseSignsID.map(function(id) {
        return Orion.FindType(id, 'any', ground, '', 25);
    }));

    var allSignsObjects = signs.map(function(sign) {
        return Orion.FindObject(sign);
    });

    allSignsObjects.forEach(printProperties);
}

function printProperties(obj){
	Orion.Print(obj.Properties());
}

function mountDismount() {
    if (!Orion.ObjAtLayer('Mount')) {
        if (!Orion.FindObject('myMount')) {
            AddMount();
            return;
        }
        var mount = Orion.FindObject('myMount');
        while (mount.Distance() > 1) {
            Orion.Say('all follow me');
            Orion.Wait(50);
        }
        Orion.UseObject('myMount');
        return;
    }
    Orion.UseObject('self');
}

function AddMount() {
    Orion.AddObject('myMount');
    Orion.Print('-1', 'Target your mount')
}

function findEnemies() {
    Orion.ClearJournal();
    Orion.Say('I seek my enemies');
    while (!Orion.WaitJournal('presence', Orion.Now(), Orion.Now() + 500, 'sys|my')) {
        Orion.Say('I seek my enemies');

        Orion.Wait(1000);
    }
    Orion.Print('enemy');
    var last = Orion.JournalCount();
    var mess = Orion.JournalLine(last - 3);
    var message = mess ? mess.Text() : '';
    if (message != 'i seek my enemies') {
        Orion.Print(message);
    }
}

function testJournal() {
    var journal = Orion.LastJournalMessage();
    Orion.Print(journal);
}

function bossAlert() {
    var messages = {
        "Flames begin to gather in": function() {
            Orion.CharPrint(Player.Serial(), 33, '**Hands, Demon Fire Boss!** ');
            Orion.SayParty("**Hands, Demon Fire Boss!**");
            Orion.Wait(2500);
        },
        "Blood begins to flow forth from": function() {
            Orion.CharPrint(Player.Serial(), 33, '**Hands, Demon Fire Boss!** ');
            Orion.SayParty("**Mouth, get behind Boss!**");
            Orion.Wait(2500);
        },
        "an ominous looking object begin's falling": function() {
            Orion.CharPrint(Player.Serial(), 33, "**Heavens, move away from Boss!**");
            Orion.SayParty("**Heavens, move away from Boss!**")
            Orion.Wait(2500);
        },
        "Begins casting Crucible": function() {
            Orion.CharPrint(Player.Serial(), 33, "**Crucible, move away from Boss!**");
            Orion.SayParty("**Crucible, move away from Boss!**")
            Orion.Wait(2500);
        },
        "Begins flapping its wings to draw its prey in closer": function() {
            Orion.CharPrint(Player.Serial(), 33, "**Flapping, move 15 tiles away from Boss!**");
            Orion.SayParty("**Flapping, move 15 tiles away from Boss!**")
            Orion.Wait(2500);
        },
        "Flames begin to spew from": function() {
            Orion.CharPrint(Player.Serial(), 33, "**Mouth, Move behind Boss!**");
            Orion.SayParty("**Mouth, Move behind Boss!**")
            Orion.Wait(2500);
        },
    };

    while (true) {
        Object.keys(messages).forEach(function(k) {
            if (Orion.InJournal(k)) {
                messages[k]();
            }
        });

        Orion.ClearJournal();
        Orion.Wait(150);
    }
}


function customLastTarget() {

	var theTargetObject = Orion.FindObject(lasttarget);
	
	if(theTargetObject.Distance() > 12){
    	Orion.CharPrint(Player.Serial(), 61, '** PLAYER IS TOO FAR **');
		return;
	}

	if(isOffensiveSpell()){
		Orion.TargetObject(lasttarget);
		return;
	}

	var currentSpell = Shared.GetVar('currentSpell');

	if(theTargetObject.Poisoned() && currentSpell.indexOf('Heal') !== -1)  {
    	Orion.CharPrint(Player.Serial(), 61, '** PLAYER IS POISONED, INTERRUPTING **');
		Orion.InterruptCast();
		return;
	}

	Orion.TargetObject(lasttarget);
	Shared.AddVar('currentSpell', '');
}

function isOffensiveSpell(){
	var currentSpell = Shared.GetVar('currentSpell');
	if(currentSpell.indexOf('Heal') !== -1 || currentSpell.indexOf('Cure') !== -1){
		return false;
	}

	return true;
}


function eboltpot() {

    var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
    var explosionPotion = explosionPotions[0];
    if (!explosionPotion) {
        return null;
    }
    Orion.UseObject(explosionPotion);
    Orion.Wait(250);
    Orion.CancelTarget();
    while (!Orion.WaitJournal('3', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {

    }
    var isCasting = false;
    if (Player.Mana() > 20) {
        isCasting = true;
        Orion.Cast('Energy Bolt');
    }
    Orion.Wait(200);
    Orion.UseObject(explosionPotion);
    Orion.Wait(1150);
    Orion.TargetObject(lasttarget);
    if (!isCasting) {
        return null;
    }
    while (!Orion.HaveTarget()) {
        Orion.Wait(10);
    }
    Orion.TargetObject(lasttarget);

}

function nightmareKill() {

    Orion.TargetObject(lasttarget);
    Orion.Wait(1);
    Orion.UseObject(self);
    Orion.Wait(30);
    Orion.Say('all kill');
    Orion.Wait(10);
    Orion.Cast('Energy Bolt');
    Orion.Say('all kill');
    Orion.Say('all kill');
    Orion.WaitForTarget(200);
    Orion.TargetObject(lasttarget);
    Orion.Wait(1);
    Orion.Wait(2000);
    Orion.TargetObject(lasttarget);

}

function GetAllStatusBars(){
    Orion.OptionFastRotation(true);
    Orion.Resend();
    Orion.IgnoreReset();
    Orion.ResetIgnoreList();
    Orion.CloseStatusbar('all');

    var isRed = Player.Notoriety() == 6;
    var redsNoto = "gray|criminal|orange|red";
    var bluesNoto = "green|blue"
    var friendsNoto = isRed ? redsNoto : bluesNoto;
    var enemiesNoto = isRed ? bluesNoto : redsNoto;
    var bars = {};
    while (true) {
        var i = 0;
        var startXEnemies = 10;
        var startYEnemies = 20;
        var startXFriends = 1525;
        var startYFriends = 75;
        Orion.IgnoreReset();
        Orion.ResetIgnoreList();
        Object.keys(bars).forEach(function(s) {
            var mob = Orion.FindObject(s);
            if (!mob || mob.Distance() > 12) {
                Orion.CloseStatusbar(s);
            }
        });

        // findFriends
        var toons = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself", 12, friendsNoto);
        while (toons !== '' && toons.length) {
            if (i === 18) {
                startXFriends += 140;
                i = 0;
            }
            if (!bars[toons]) {
                bars[toons] = 1;
            }
            Orion.ShowStatusbar(toons, startXFriends, startYFriends + i * 55);
            i++;
            Orion.Ignore(toons);
            toons = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself", 12, friendsNoto);
        }

        // findEnemies
        var toons = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself", 12, enemiesNoto);
        while (toons !== '' && toons.length) {
            if (i === 18) {
                startXEnemies += 140;
                i = 0;
            }
            if (!bars[toons]) {
                bars[toons] = 1;
            }
            Orion.ShowStatusbar(toons, startXEnemies, startYEnemies + i * 55);
            i++;
            Orion.Ignore(toons);
            toons = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself", 12, enemiesNoto);
        }
        Orion.Wait(1000);
    }
}

function main() {
    Orion.OptionFastRotation(true);
    Orion.Resend();
    GetAllStatusBars();
    checkLife();
}

function checkLife() {
    Orion.CharPrint(Player.Serial(), 61, '** Healing checker STARTED **');
    while (true) {
        var members = Orion.PartyMembers();
        members.forEach(function(member) {
            var m = Orion.FindObject(member);
            if (m && m.Hits() < 18) {
                Orion.CharPrint(member, 61, '** NEED HEALING **');
            }
        });
        Orion.Wait(500);
    }
}

function thegump() {
    var gum = Orion.GetLastGump();
    Orion.Print(gum);
}

var shouldFollowChars = {
    'Axias': true,
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

function equipWeapon() {
    Orion.Print(Player.Name());
    Orion.Dress(Player.Name());
}

function getWandsCharges() {
    var wands = Orion.FindType(any);
    wands.every(function(w) {
        var wa = Orion.FindObject(w);
        if (wa.Name() == 'Wand') {
            //getWandCharges(w,target);
            var props = wa.Properties();
            Orion.Print(props.slice(57));
            //Orion.Print(getItemCharges(wa));
        }
        return true;
    });
}

function teleportCeiling() {
    Orion.Print(Player.X());
    Orion.Print(Player.Y());
    Orion.Print(Player.Z());
    Orion.TargetTile('any', 1458, 1558, 70);
}

function dismountAllKill() {
    Orion.UseObject(self);
    Orion.Say('all kill');

    Orion.Wait(100);

    Orion.TargetObject(lasttarget);
}

function getItemCharges(object) {

    properties = object.Properties();

    var charges = properties.match(/\Charges:(.*)$/g);
    var ccc = properties.match(/\Charges:(.*)$/g);

    var index = properties.indexOf('Charges');
    var cc = properties.slice(index + 9, index + 9 + 4);

    return cc;

}

function castHealOnMe() {
    if (Player.Hits() == Player.MaxHits()) {
        return false;
    }
    if (Player.Poisoned()) {
        Orion.Cast('Cure', self);
        return false;
    }
    if (Player.Hits() < 75) {
        Orion.Cast('Greater Heal', self);
        return false;
    }
    if (Player.Hits() > 75) {
        Orion.Cast('Heal', self);
    }
}

function castHealOnTarget(target) {
    var toHeal = Orion.FindObject(target);
    if (toHeal.Hits() == toHeal.MaxHits()) {
        return false;
    }
    if (Player.Poisoned()) {
        Orion.Cast('Cure', target);
        return false;
    }
    if (Player.Hits() < 75) {
        Orion.Cast('Greater Heal', target);
        return false;
    }
    if (Player.Hits() > 75) {
        Orion.Cast('Heal', target);
    }
}

function useLightWant(wand) {

    Orion.Wait(450);
    Orion.UseObject(wand);
    Orion.WaitForTarget(1050);
    Orion.TargetObject(lasttarget);
}

function superWand() {
    // fireball 1250
    //
    var wand = findAndEquipWand('Magic Arrow');
    //var wand = findAndEquipWand('Harm');

    Orion.Wait(350);
    var pozz = Orion.FindType('0x0F0D', '-1', 'self', true);
    var pozza = pozz[0];
    Orion.Wait(450);
    Orion.UseObject(pozza);
    Orion.Wait(350);
    Orion.CancelTarget();
    Orion.CancelTarget();
    if (wand) {
        useLightWant(wand);
        Orion.CancelTarget();
        Orion.CancelTarget();
    }
    Orion.UseObject(pozza);
    Orion.CancelTarget();
    Orion.CancelTarget();
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {

    }

    Orion.Wait(650);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }

}

function teleportenemy() {
    var ee = Orion.FindObject(lasttarget);
    Orion.Print(ee.X() + 1);
    Orion.Cast('Teleport');
    Orion.WaitForTarget(1500);
    var xx = ee.X() + 1;
    var yy = ee.Y() + 1;
    var zz = Player.Z();
    Orion.Print(xx);
    Orion.Print(yy);
    Orion.Print(zz);
    Orion.TargetTile('any', xx, yy, zz);
}

function teleportaway() {
    var value = 12;
    var empty = 0;

    var offset =
        [
            [empty, -value], //direction = 0
            [value, -value], //direction = 1
            [value, empty], //direction = 2
            [value, value], //direction = 3
            [empty, value], //direction = 4
            [-value, value], //direction = 5
            [-value, empty], //direction = 6
            [-value, -value] //direction = 7
        ];
    var otherTilesRect =
        [
            [
                [1, 3],
                [1, 3]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
            [
                [1, 2],
                [1, 2]
            ], //direction = 0
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
    Orion.TargetTileRelative('any', xx, yy, thez);
}

function wallofstoneback() {
    var value = 2;
    var empty = 0;

    var offset =
        [
            [empty, value], //direction = 4
            [-value, value], //direction = 5
            [-value, empty], //direction = 6
            [-value, -value], //direction = 7
            [empty, -value], //direction = 0
            [value, -value], //direction = 1
            [value, empty], //direction = 2
            [value, value], //direction = 3
        ];

    var xy = offset[Player.Direction() & 7];
    // Orion.WaitTargetTileRelative('0', xy[0], xy[1], Player.Z());
    Orion.Cast('Wall Of Stone');
    Orion.WaitForTarget(1400);
    Orion.TargetTileRelative('any', xy[0], xy[1], Player.Z());

}


function wallofstonefront() {

    Orion.Cast('Wall Of Stone');
    Orion.WaitForTarget(1400);
    var ee = Orion.FindObject(lasttarget);

    var xx = ee.X();
    var yy = ee.Y();
    var zz = Player.Z();
    var value = 5;
    var empty = 1;

    var offset = [
        [empty, -value], //direction = 0
        [value, -value], //direction = 1
        [value, empty], //direction = 2
        [value, value], //direction = 3
        [empty, value], //direction = 4
        [-value, value], //direction = 5
        [-value, empty], //direction = 6
        [-value, -value] //direction = 7
    ];

    var xy = offset[ee.Direction() & 7];

    Orion.TargetTile('any', xx + xy[0], yy + xy[1], zz);

}

function targetNextToEnemy() {

    var ee = Orion.FindObject(lasttarget);

    var xx = ee.X();
    var yy = ee.Y();
    var zz = Player.Z();
    var value = 2;
    var empty = 1;

    var offset = [
        [empty, -value], //direction = 0
        [value, -value], //direction = 1
        [value, empty], //direction = 2
        [value, value], //direction = 3
        [empty, value], //direction = 4
        [-value, value], //direction = 5
        [-value, empty], //direction = 6
        [-value, -value] //direction = 7
    ];

    var xy = offset[ee.Direction() & 7];
    if (Orion.ValidateTargetTile('any', xx + xy[0], yy + xy[1], zz)) {
        Orion.TargetTile('any', xx + xy[0], yy + xy[1], zz);
    }
}

function equipSecondaryWeapon() {
    Orion.Dress(Player.Name() + '_secondary');
}

function equipArmor() {
    Orion.Dress('Axias_armor');
}

function reloadRunebooks() {
    var books = Orion.FindType('0x22C5');
    books.forEach(function(b) {
        var book = Orion.FindObject(b);
        if (doesBookNeedRecharge(book.Properties())) {
            var scrolls = Orion.FindType('0x1F4C');
            Orion.Print(scrolls);
            Orion.MoveItem(scrolls[0], -1, b);
            Orion.Wait(600);
        }
    });
}

function doesBookNeedRecharge(from) {
    var arr = from.match(/\Charges:(.*)$/g) || [""];
    var charges = arr[0].slice(9).split('/');
    Orion.Print('book has ' + arr[0].slice(9).split('/')[0] + ' charges, recharging... ');
    return charges[0] !== charges[1];
}

function getIsTwoHanded() {

    return isTwoHanded();
}

function macroVivify() {
    var wait = 500;
    while (true) {
        wait = 500;
        if (Player.Mana() < 50) {
            Orion.UseSkill('Meditation');
        } else {
            Orion.UseType('0x1F6C', '0xFFFF');
            Orion.Wait(4000);
            var water = Orion.FindType("-1", "-1", ground, "near|live|ignoreself", 3, "green");
            var waterObj = Orion.FindObject(water);
            if (waterObj) {

                if (waterObj.Color() !== '0x0000') {
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
        if (!scrolls.length) {
            GetElementalScrolls();
            Orion.Wait('500');
        }
    }
}

function GetElementalScrolls() {
    while (Player.Mana() < 11) {
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
    if (findItems0.length) {
        Orion.DragItem(findItems0[0], 300);
        Orion.Wait('300');
    }
    Orion.DropDraggedItem('0x443DC4CB', 117, 65);
    Orion.Wait('500');

    while (Player.Mana() < 11) {
        Orion.UseSkill('Meditation');
        Orion.Wait(2000);
    }
    Orion.Cast('32');
    if (Orion.WaitForTarget(3000))
        Orion.TargetObject('0x412335A6');
}

function mindExplo() {
    var pozz = Orion.FindType('0x0F0D', '-1', 'self', true);
    var pozza = pozz[0];
    Orion.UseObject(pozza);
    Orion.Wait(300);
    Orion.CancelTarget();
    Orion.Cast('Mind Blast');
    Orion.WaitForTarget(1950);
    Orion.TargetObject(lasttarget);
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {}
    Orion.UseObject(pozza);
    Orion.Wait(650);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
}

function lightExplo() {
    Orion.TargetObject(lasttarget);
    Orion.Wait(50);
    var pozz = Orion.FindType('0x0F0D', '-1', 'self', true);
    var pozza = pozz[0];
    Orion.UseObject(pozza);
    Orion.Wait(300);
    Orion.CancelTarget();
    Orion.Cast('Lightning');
    Orion.WaitForTarget(1650);
    Orion.TargetObject(lasttarget);
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {}
    Orion.UseObject(pozza);
    Orion.Wait(650);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
}

function spar() {


    while (true) {
        Orion.UseObject('0x402640DE');
        if (Orion.WaitForTarget(1000)) {
            Orion.TargetObject('self');
        }
        Orion.TargetObject('self');
        Orion.TargetObject('self');
        Orion.Wait(10500);
    }

}

function moveReagents() {
    Orion.AddObject('reagToContainer');
    Orion.Print('Select a container to move items to');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var reagToContainer = Orion.FindObject('reagToContainer');
    var reagents = ['bm', 'bp', 'ga', 'gs', 'mr', 'ns', 'sa', 'ss'];
    var howMany = 20;
    for (var i = 0; i < reagents.length; i++) {

        var list = Orion.FindType(reagents[i], '-1', '0x41592675');

        if (!list.length) {
            Orion.CharPrint(self, 33, 'Reagent is not found');
            return
        }
        Orion.CharPrint(self, 33, 'Move reagent ' + reagents[i]);
        Orion.MoveItem(list[0], howMany, reagToContainer.Serial());
        Orion.Wait('moveitemdelay');
    }
}

function getPotionsFromKegs() {

    var CHEST_WITH_KEGS = '0x43F8E11C';
    var heal = 9;
    var refresh = 13;
    var cure = 12;
    var str = 11;
    var agy = 12;
    var explo = 0;

    while (heal > 0 || refresh > 0 || cure > 0 || str > 0 || agy > 0 || explo > 0) {
        var kegs = Orion.FindTypeEx('0x1940', any, CHEST_WITH_KEGS);

        kegs.every(function(k, i) {
            var ser = k.Serial();

            while (Orion.Contains(k.Properties(), 'Keg Of Greater Heal') && heal > 0) {
                Orion.UseObject(ser);
                Orion.Wait(700);
                heal = heal - 1;
            }

            while (Orion.Contains(k.Properties(), 'Keg Of Greater Refresh') && refresh > 0) {
                Orion.UseObject(ser);
                Orion.Wait(700);
                refresh = refresh - 1;
            }

            while (Orion.Contains(k.Properties(), 'Keg Of Greater Cure') && cure > 0) {
                Orion.UseObject(ser);
                Orion.Wait(700);
                cure = cure - 1;
            }

            while (Orion.Contains(k.Properties(), 'Keg Of Greater Stre') && str > 0) {
                Orion.UseObject(ser);
                Orion.Wait(700);
                str = str - 1;
            }

            while (Orion.Contains(k.Properties(), 'Keg Of Greater Agility') && agy > 0) {
                Orion.UseObject(ser);
                Orion.Wait(700);
                agy = agy - 1;
            }

            while (Orion.Contains(k.Properties(), 'Keg Of Greater Explosion') && explo > 0) {
                Orion.UseObject(ser);
                Orion.Wait(700);
                explo = explo - 1;
            }

            if (heal == 0 && refresh == 0 && cure == 0 && explo == 0 && str == 0 && agy == 0) {
                return false;
            } else {
                Orion.Wait(50);
                return true;
            }
        });
    }

}

function recallEscape() {

    if (Player.Mana() >= 11) {
        var runebooks = Orion.FindTypeEx('0x22C5', any, backpack)
        var escapebook = 0
        runebooks.forEach(function(book) {
            if (Orion.Contains(book.Properties(), 'Escape') == true) {
                escapebook = book.Serial();
            }
        });

        if (escapebook == 0) {
            Orion.Print('No book found meeting criteria')
            return
        }
        Orion.UseObject(escapebook);
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x554B87F3')) {
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

function exploNoWait() {
    var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
    var explosionPotion = explosionPotions[0];
    Orion.UseObject(explosionPotion);

    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {
        Orion.Wait(5);
    }

    Orion.Wait(635);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
}

function exploz() {
    Orion.Print('ok');
    var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
    var explosionPotion = explosionPotions[0];
    Orion.UseObject(explosionPotion);
    while (!Orion.HaveTarget()) {
        Orion.Wait(10);
    }
    Orion.CancelTarget();
    while (!Orion.WaitJournal('3', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {
        Orion.Wait(5);
    }
    Orion.Wait(600);
    Orion.UseObject(explosionPotion);
    Orion.Wait(1050);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
}

function explows() {
    var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
    var explosionPotion = explosionPotions[0];
    Orion.UseObject(explosionPotion);
    while (!Orion.WaitJournal('3', Orion.Now(), Orion.Now() + 1100, 'sys|my')) {}
    Orion.Wait(500);
    var wands = Orion.FindType(any);
    wands.every(function(w) {
        var wa = Orion.FindObject(w);
        if (wa.Name() == 'Wand' && wa.Properties().indexOf('Lightning') !== -1) {
            equipAndUseWand(w);

            return false;
        }
        return true;
    });
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {}
    Orion.Wait(350);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }

    while (!Orion.HaveTarget()) {
        Orion.Wait(30);
    }
    Orion.TargetObject(lasttarget);
}

function throwExplo() {
    var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
    var explosionPotion = explosionPotions[0];
    Orion.UseObject(explosionPotion);
    Orion.Wait(500);

    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }


}

function Loot() {
    while (true) {
        var lootList = [
            '0x2AA2', '0x2AA7', '0x14f0', '0x2260', '0x0F21', '0x47E6', '0x1F19'
        ];
        //, '0x0EED'
        for (var i = 0; i < lootList.length; i++) {
            //Orion.Print(lootList[i]);
            var canTakeGold = Player.Weight() < ((Player.MaxWeight() / 100) * 85);
            var item = Orion.FindType(lootList[i], 'any', lastcontainer);
            var isGold = lootList[i] === '0x0EED';
            if (item && !isGold) {
                Orion.MoveItem(item, 0, backpack);
            }

            if (isGold && canTakeGold) {
                Orion.MoveItem(item, 0, backpack);
            }
            Orion.Wait(10);
        }
        Orion.Wait(300);
    }
}

function useExplotionPotion() {
    var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
    Orion.AddObject('exploPot', explosionPotions[0]);
    Orion.UseObject('exploPot');
    while (!Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    Orion.CancelTarget();
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'my')) {}
    Orion.UseObject('exploPot');
    Orion.Wait(630);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
    Orion.RemoveObject('exploPot');
}

function explox() {
    var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
    var explosionPotion = explosionPotions[0];
    Orion.UseObject(explosionPotion);
    Orion.Wait(250);
    Orion.CancelTarget();
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {}
    Orion.Cast('Energy Bolt');
    Orion.UseObject(explosionPotion);
    Orion.Wait(500);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }

    while (!Orion.HaveTarget()) {
        Orion.Wait(30);
    }
    Orion.TargetObject(lasttarget);
}

function exploxx() {
    Orion.Cast('Explosion');
    var pozz = Orion.FindType('0x0F0D', '-1', 'self', true);
    var pozza = pozz[0];
    Orion.UseObject(pozza);
    Orion.Wait(250);
    Orion.CancelTarget();
    Orion.CancelTarget();
    while (!Orion.HaveTarget()) {
        Orion.Wait(30);
    }
    Orion.TargetObject(lasttarget);
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {}
    Orion.UseObject(pozza);
    Orion.Wait(500);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
}

function exploxxx() {
    Orion.Cast('Explosion');
    var pozz = Orion.FindType('0x0F0D', '-1', 'self', true);
    var pozza = pozz[0];
    Orion.Wait(700);
    Orion.UseObject(pozza);
    Orion.Wait(250);
    Orion.CancelTarget();
    Orion.CancelTarget();
    while (!Orion.HaveTarget()) {
        Orion.Wait(30);
    }
    Orion.TargetObject(lasttarget);
    while (!Orion.WaitJournal('2', Orion.Now(), Orion.Now() + 2500, 'sys|my')) {}

    Orion.Cast('Energy Bolt');
    Orion.UseObject(pozza);
    Orion.Wait(600);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
    while (!Orion.HaveTarget()) {
        Orion.Wait(30);
    }
    Orion.TargetObject(lasttarget);
}

function healWand() {
    findAndUseWand('greater heal', 250);
    //findAndUseWand('Heal');
}

function lightWand() {

    findAndUseWand('lightning', lasttarget);
}

function manaDrain() {
    findAndUseWand('Mana Drain', lasttarget);
}

function weakenWand() {
    findAndUseWand('Weaken', lasttarget);
}

function arrowWand() {
    findAndUseWand('Magic Arrow', lasttarget);
}

function findAndUseWand(name, delay) {
    Orion.Say('[equip spellwand ' + name);
    Orion.Wait(delay || 600);
    var wand = Orion.ObjAtLayer('RightHand');
    Orion.Print(wand);
    Orion.UseObject(wand.Serial());
}

function findAndEquipWand(name, target) {

    var wands = Orion.FindWand(name);
    equipWand(wands);

    return wands;
}

function equipAndUseWand(wandObject, target) {
    Orion.Equip(wandObject);
    Orion.Wait(600);
    Orion.UseObject(wandObject);
    if (target) {
        // cast it
        while (!Orion.HaveTarget()) {
            Orion.Wait(40);
        }
        Orion.TargetObject(target);
    }
}

function equipWand(wandObject, target) {
    Orion.Equip(wandObject);
}

function waitForStun() {
    while (!Player.Dead()) {
        var findMsgObj = Orion.WaitJournal("Party Combo ", Orion.Now(), Orion.Now() + 3000);
        if (findMsgObj) {
            if (Orion.Contains(findMsgObj.Text(), "0x")) {
                var targ = findMsgObj.Text().split(" ")[2];
                Orion.Cast('Explosion', targ);
                Orion.Wait(2650);
                Orion.Cast('Energy Bolt', targ);

            }
        }
        Orion.Wait(50);
    }
}

function dropExploBolt() {
    Orion.Cast('Explosion', lastattack);
    Orion.Wait(2650);
    Orion.Cast('Energy Bolt', lastattack);
}

function punch() {
    Orion.ClearJournal();
    Orion.UseWrestlingStun();
    if (Orion.WaitJournal('You get yourself ready', Orion.Now(), Orion.Now() + 200, "sys")) {
        Orion.CharPrint(Player.Serial(), 45, 'Stun ON');
    } else {
        Orion.CharPrint(Player.Serial(), 45, 'Stun OFF');
    }
    while (!Orion.WaitJournal("successfully", Orion.Now(), Orion.Now() + 500, "sys")) {
        //		if(Orion.WaitJournal('You get yourself ready|You decide to not try', Orion.Now(), Orion.Now() + 50, "sys")){
        //	    	break;
        //	    }

        Orion.Wait(50);
    }
    Orion.CharPrint(lastattack, 65, 'Stunned');
    Orion.CharPrint(lastattack, 65, 'Stunned');
    Orion.CharPrint(lastattack, 65, 'Stunned');
    Orion.CharPrint(lastattack, 65, 'Stunned');
    Orion.Wait(650);
    Orion.UseWrestlingStun();
    drinkRefresh();
    return true;
}

function getMortar(){
	Orion.Print('Taking Mortar');
    var mortar = '0x0E9B';
    var mortarSerials = Orion.FindType(mortar, '-1', backpack);
	if(!mortarSerials || !mortarSerials[0]){
		Orion.MoveItemType(mortar, 'any', Shared.GetVar('mortarstorage'), '7', backpack);
		mortarObject = Orion.FindType(mortar, '-1', backpack);
    	Orion.Print(mortarSerials[0]);
    	Orion.Wait(700);
	}
	return mortarSerials[0];
}

function getReags(r){
	Orion.Print('Taking Regs');
	var reagent = getRegs(r);
	var storage = Shared.GetVar('regsstorage');
	Orion.MoveItemType(reagent, 'any', storage, '7', backpack);
    Orion.Wait(700);
}

function getRegPerPotionNumber(type){
	var totals = {
		gs: 7,
		mr: 5,
        sulfur: 10,
        bm: 3,
        bp: 3,
        ga: 3,
        ns: 3,
        ss: 3
	};
	return totals[type];
}

function getPotionCraftGumps(){
	return {
		'gs': [22, 16],
		mr: [22, 16],
        sulfur: [22, 16],
        bm: [22, 16],
        bp: [22, 16],
        ga: [22, 16],
        ns: [22, 16],
        ss: [22, 16],
	}
}

function craftPotion(toCraft){
	Orion.Print('Crafting Potion');
	var g = getPotionCraftGumps()[toCraft];
	if (Orion.WaitForGump(1000)){
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null)){
			gump0.Select(Orion.CreateGumpHook(g[0]));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000)){
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null)){
			gump1.Select(Orion.CreateGumpHook(g[1]));
			Orion.Wait(100);
		}
	}
	Orion.Wait(1000);
}

function moveKegToButler(){
	Orion.Print('Moving Keg to Butler');
	Orion.MoveItem(Shared.GetVar('keg'), '1', Shared.GetVar('butler'));
}

function isKegFull(){
	var keg = Orion.FindObject(Shared.GetVar('keg'));
	var props = keg.Properties();
	return props.indexOf('Completely Full') !== -1;
}

function hasReagsInBackpack(toCraft){
	var r = getRegs(toCraft);
	var reg = Orion.FindType(r, '-1', backpack);
	var regObj = Orion.FindObject(reg[0]);
	if(!regObj){
		return false;
	}
	var regProps = regObj.Properties();
	var totalRegs = parseInt(regProps.slice(0, 2), 10);
	if(!isNaN(totalRegs) && totalRegs >= getRegPerPotionNumber(toCraft)){
		return true;
	}
	return false;
}

function hasReagsInStorage(toCraft){
	var storage = Shared.GetVar('regsstorage');
	var r = getRegs(toCraft);
	var reg = Orion.FindType(r, '-1', storage);
	var regObj = Orion.FindObject(reg[0]);
	if(!regObj){
		return false;
	}
	var regProps = regObj.Properties();
	var totalRegs = parseInt(regProps.slice(0, 6), 10);
	if(!isNaN(totalRegs) && totalRegs >  getRegPerPotionNumber(toCraft)){
		return true;
	}
	return false;
}

function RefillButler(){
	var toCraft = 'gs';
	Shared.AddVar('keg', '0x40803B70');
	Shared.AddVar('butler', '0x00182365');
	Shared.AddVar('regsstorage', '0x4262EEAE');
	Shared.AddVar('mortarstorage', '0x4122BF67');

	while(hasReagsInStorage(toCraft)){

		if(!hasReagsInBackpack(toCraft)){
	    	getReags(toCraft);
		}

	    var mortar = getMortar();
		Orion.UseObject(mortar);
		craftPotion(toCraft);

		if(isKegFull()){
			moveKegToButler();
		}

		Orion.Wait(1000);
	}

	Shared.RemoveVar('keg');
	Shared.RemoveVar('butler');
	Shared.RemoveVar('regsstorage');
	Shared.RemoveVar('mortarstorage');
}

function getRegs(r){
    var regsType = {
        sulfur: 0x0F8C,
        bm: 0x0F7B,
        bp: 0x0F7A,
        ga: 0x0F84,
        gs: 0x0F85,
        mr: 0x0F86,
        ns: 0x0F88,
        ss: 0x0F8D
    }

	if(r){
		return regsType[r];
	}

	return regsType;
}


function getStats() {
    while (true) {
        if (Player.Int() > 40) {
            Orion.Cast('Night Sight', lasttile);
        }
    }
}

function Follower() {
    Orion.AddObject('FollowMe');
    Orion.Print("Who do you want to follow?");
    while (Orion.HaveTarget()) {
        Orion.Wait(100);
    }

    var target = Orion.FindObject('FollowMe');
    while (target.Exists()) {
        Orion.WalkTo(target.X(), target.Y(), target.Z(), 3); //change "3" to distance you want stick to target
        Orion.Wait(100);
    }
}

function MoveItemByType() {
    var delay = 600;
    Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    Orion.AddObject('toContainer');
    Orion.Print('Select a container to move items to');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    Orion.AddObject('item');
    Orion.Print('Select an item to move');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');
    var toContainer = Orion.FindObject('toContainer');
    var item = Orion.FindObject('item');
    var itemType = item.Graphic();
    var itemColor = item.Color();

    while (true) {
        var items = Orion.FindTypeEx(itemType, itemColor, fromContainer.Serial());
        //var items = Orion.FindType('any', 'any', fromContainer.Serial());
        if (items.length) {
            Orion.MoveItem(items[0].Serial(), 0, toContainer.Serial());
            //Orion.MoveItem(items[0], 1, toContainer.Serial());
            Orion.Wait(delay);
        } else
            break;
    }
    Orion.RemoveObject('fromContainer');
    Orion.RemoveObject('toContainer');
    Orion.RemoveObject('item');
}

function lootTMAP() {
    Orion.AddObject('tmapContainer');
    Orion.Print('Select the Tmap container');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('tmapContainer');

    Orion.AddObject('trashContainer');
    Orion.Print('Select a trash container');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var trashContainer = Orion.FindObject('trashContainer');

    Orion.AddObject('goodContainer');
    Orion.Print('Select a container for the good stuff');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var goodContainer = Orion.FindObject('goodContainer');


    var allItems = Orion.FindType(any, -1, fromContainer.Serial());
    Orion.CharPrint(Player.Serial(), 65, '* IDENTIFYING EVERYTHING *');
    Orion.SayParty('* IDENTIFYING EVERYTHING *');
    allItems.forEach(function(g) {
        var toid = Orion.FindObject(g);
        var props = toid.Properties();
        if (props.indexOf('Unidentified') !== -1) {
            Orion.Print('Must Identify', props);
            Orion.UseSkill('Item Identification', g);
            Orion.Wait(3000);
        }
    });
    Orion.CharPrint(Player.Serial(), 65, '* IDENTIFYING DONE *');
    Orion.SayParty('* IDENTIFYING DONE *');
    Orion.Wait(1000);
    allItems = Orion.FindType(any, -1, fromContainer.Serial());


    allItems.forEach(function(g) {

        var item = Orion.FindObject(g);
        if (isGoodItem(item)) {
            Orion.CharPrint(Player.Serial(), 65, '* Good item found *');
            Orion.MoveItemType(item.Graphic(), 'any', fromContainer.Serial(), 0, goodContainer.Serial());
            Orion.Wait(600);
        } else {
            Orion.CharPrint(Player.Serial(), 65, '* Trash item found *');
            Orion.MoveItemType(item.Graphic(), 'any', fromContainer.Serial(), 0, trashContainer.Serial());
            Orion.Wait(600);
        }
        mobileID = Orion.FindType("any", "-1", ground, "near|live|ignoreself|ignorefriends", 7, "gray|criminal");
        if (mobileID.length) {
            Orion.CharPrint(Player.Serial(), 65, '* OH SHIT *');
            Orion.SayParty('* OH SHIT *');
            Orion.PauseScript();
        }
    });

}

function isGoodItem(item) {
    var goodItems = [
        'Vanquishing',
        'Invulnerability',
        'Fragment',
        'Repond',
        'Reptilian',
        'Silver',
        'Mandrake',
        'Ginseng',
        'Spider',
        'Black Pearl',
        'Nightshade',
        'Blood Moss',
        'Garlic',
        'Sulfurous',
        'Gold'
    ];
    var itemProps = item.Properties();
    //var found = false;
    for (i = 0; i < goodItems.length; i++) {
        var prop = goodItems[i];
        if (itemProps.indexOf(prop) !== -1) {
            Orion.CharPrint(Player.Serial(), 65, '* Good item found *');
            Orion.CharPrint(Player.Serial(), 65, itemProps);
            return true;
        }
    }
    return false;
}

function identify() {

    Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');

    var allItems = Orion.FindType(any, -1, fromContainer.Serial());

    allItems.map(function(g) {
        var toid = Orion.FindObject(g);
        var props = toid.Properties();
        if (props.indexOf('Unidentified') !== -1) {
            Orion.Print('Must Identify', props);
            Orion.UseSkill('Item Identification', g);
            Orion.Wait(1000);
        }
    });
}

function VetPet() {
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
    const friendsNearby = mobilesNearby.filter(function(mobile) {
        return isFriend(mobile)
    }).concat([Player]);



    // get the lowest hp friend
    friendsNearby.sort(function(e1, e2) {
        return e1.Hits() - e2.Hits()
    });
    if (friendsNearby.length) {
        const lowestHpFriend = friendsNearby[0];
        if (!lowestHpFriend.IsHuman() && lowestHpFriend.Distance() < 2) {
            healTarget(lowestHpFriend);
        } else {
            if (useVet && !lowestHpFriend.IsHuman() && Orion.GetDistance(lowestHpFriend.Serial()) < 2) {
                healTarget(lowestHpFriend);
            } else {
                if (lowestHpFriend.Poisoned()) {

                    Orion.Cast('Cure', lowestHpFriend.Serial());
                    Orion.Print('Healing ' + lowestHpFriend.Name());
                }
                if (lowestHpFriend.Hits() < lowestHpFriend.MaxHits()) {

                    Orion.Print('Healing ' + lowestHpFriend.Name());
                    Orion.Cast('Greater Heal', lowestHpFriend.Serial());
                }
            }
        }
        // healTarget(lowestHpFriend);
    }

}

function VetAllFriendlyPets() {
    const useVet = true;
    while (true) {
        //Orion.UseSkill('Meditation');
        const mobilesNearby = Orion.FindTypeEx(
            '-1',
            '-1',
            'ground',
            'mobile',
            8,
            'green|blue|innocent|gray|gray|criminal'
        )

        // filter only friends in the list
        const friendsNearby = mobilesNearby.filter(function(mobile) {
            return isFriend(mobile)
        }).concat([Player]);



        // get the lowest hp friend
        friendsNearby.sort(function(e1, e2) {
            return e1.Hits() - e2.Hits()
        });
        if (friendsNearby.length) {
            const lowestHpFriend = friendsNearby[0];
            if (!lowestHpFriend.IsHuman() && lowestHpFriend.Distance() < 2) {
                healTarget(lowestHpFriend);
            } else {
                if (useVet && !lowestHpFriend.IsHuman() && Orion.GetDistance(lowestHpFriend.Serial()) < 2) {
                    healTarget(lowestHpFriend);
                } else {
                    if (lowestHpFriend.Poisoned()) {

                        Orion.Cast('Cure', lowestHpFriend.Serial());
                        Orion.Print('Healing ' + lowestHpFriend.Name());
                    }
                    if (lowestHpFriend.Hits() < lowestHpFriend.MaxHits()) {

                        Orion.Print('Healing ' + lowestHpFriend.Name());
                        Orion.Cast('Greater Heal', lowestHpFriend.Serial());
                    }
                }
            }
            //  healTarget(lowestHpFriend);
        }
        Orion.Wait(2000);
    }
}

function healTarget(lowestHpFriend) {
    Orion.WaitTargetObject(lowestHpFriend.Serial());
    Orion.UseType('0x0E21');
    Orion.Print('Healing Pet: ' + lowestHpFriend.Name());
    Orion.ClearJournal();
    var Timer = Orion.Now() + 2250;
    var Msg = "You finish applying the bandages.";
    while (true) {
        Orion.Wait(100);
        if (Orion.InJournal(Msg) || Orion.Now() > Timer)
            break;
    }
    Orion.ClearJournal(Msg);
    Orion.Print(Orion.Count('0x0E21', any, backpack) + ' Bandages Left.');
}

function isFriend(mobileObj) {
    const friendsList = Orion.GetFriendList()
    if (friendsList.indexOf(mobileObj.Serial()) >= 0 && !mobileObj.Dead()) {
        return true
    }
    return false
}


function armMe() {
    if (isTwoHanded) {
        Orion.Dress(Player.Name());
        if (Orion.InJournal('You must wait')) {
            Orion.Wait(600);
            Orion.Dress(Player.Name());
        }
    }
}

function disarmMe() {
    if (isTwoHandedWeapon()) {
        Orion.Disarm();
    }
}


function isTwoHandedWeapon() {

    var left = Orion.ObjAtLayer('LeftHand');
    var right = Orion.ObjAtLayer('rightHand');
    var weapon = right ? right : left;
    if (!weapon) {
        return false;
    }
    var properties = weapon.Properties();
    var matches = properties.match("Two-handed");

    return matches && !properties.match("bow") ? true : false;
}

function drinkHeal() {
    if (!Player.Poisoned()) {
        disarmMe();
        Orion.UseType('0x0F0C', '0xFFFF'); //heal pot
        armMe();
        Orion.Wait(500);
    }
}

function drinkCure() {
    if (Player.Poisoned() && useCure) {
        disarmMe();
        Orion.UseType('0x0F07', '0xFFFF'); // cure pot
        armMe();
        Orion.Wait(500);
    }
}

function healMe() {
    drinkCure();
    if (Player.Hits() < 60) {
        healPotion();
        if (Player.Name() == 'MilkLizard') {
            while (Orion.HaveTarget()) {
                Orion.CancelTarget();
                Orion.Wait(10);
            }
            Orion.Cast('Greater Heal');
            Orion.WaitForTarget(1650);
            Orion.TargetObject('self');
        }
    }

    if (Player.Hits() < Player.MaxHits() && lastbandage < Date.now() - 10000) {
        if (Player.Name() == 'MilkLizard') {
            while (Orion.HaveTarget()) {
                Orion.CancelTarget();
                Orion.Wait(10);
            }
            if (Player.Poisoned()) {
                Orion.Cast('Cure');
                Orion.WaitForTarget(1000);
                Orion.TargetObject('self');
                Orion.WaitForTarget(100);
            }
            Orion.Cast('Heal');
            Orion.WaitForTarget(1000);
            Orion.TargetObject('self');
        } else {
            bandagetimer();
        }
    }
    if (Player.Stam() < Player.MaxStam() / 3) {
        drinkRefresh();
    }
}

function drinkRefresh() {

    disarmMe();
    Orion.UseType('0x0F0B', '0xFFFF');
    armMe();

}

function AutoHealFriends() {

    while (true) {
        HealFriends();
        Orion.Wait(3000);
    }

}

function exploManual2() {
    if (!Orion.FindObject('exploPotManual2')) {
        var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
        Orion.AddObject('exploPotManual2', explosionPotions[0]);
        Orion.UseObject('exploPotManual2');
        Orion.Wait(250);
        Orion.CancelTarget();
        return;
    }

    Orion.UseObject('exploPotManual2');
    Orion.Wait(620);
    if (Orion.InLOS(lasttarget)) {
        Orion.TargetObject(lasttarget);
    } else {
        Orion.TargetTile('any', Player.X() + 2, Player.Y() + 2, -1);
    }
    Orion.RemoveObject('exploPotManual2');
}

function exploManual() {
    if (!Orion.FindObject('exploPotManual')) {
        var explosionPotions = Orion.FindType('0x0F0D', '-1', 'self', true);
        Orion.AddObject('exploPotManual', explosionPotions[0]);
        Orion.UseObject('exploPotManual');
        Orion.Wait(250);
        Orion.CancelTarget();
        return;
    }

    Orion.UseObject('exploPotManual');
    Orion.Wait(200);
    Orion.RemoveObject('exploPotManual');
}

function TargetLowHealthFriend() {
    Orion.ClearHighlightCharacters([(priorityHighlightList = false)])
    Orion.Ignore('self')

    const mobilesNearby = Orion.PartyMembers();
    const nearBy = Orion.FindTypeEx(
        '-1',
        '-1',
        'ground',
        'mobile',
        8,
        'green|blue|innocent|gray|gray|criminal|red'
    );
    const nearByObjects = nearBy.forEach(function(n) {
        return Orion.FindObject(n);
    });
    // filter only friends in the list only used if PARTY
    const friendsNearby = mobilesNearby.map(function(p) {
        Orion.Print(p);
        return Orion.FindObject(p);
    });

    // get the lowest hp friend
    if (nearBy.length > 1) {
        nearBy.sort(function(e1, e2) {
            return e1.Hits() - e2.Hits();
        });
    }

    if (nearBy.length) {
        const lowestHpFriend = nearBy[0];
        Orion.Print(lowestHpFriend.Hits());
        Orion.Print(lowestHpFriend.Name());
        if (lowestHpFriend.Hits() < 25) {

            if (lowestHpFriend.Distance() < 12 && lowestHpFriend.InLOS()) {
                Orion.CharPrint(lowestHpFriend.Serial(), 65, '* HEALING *');
                Orion.TargetObject(lowestHpFriend.Serial());
            } else {

                Orion.CharPrint(lowestHpFriend.Serial(), 65, '* TOO FAR/ NOT IN LOS *');
            }
        } else {
            Orion.CharPrint(Player.Serial(), 65, '* no friends in need! *')

        }
    } else {
        Orion.CharPrint(Player.Serial(), 65, '* no friends nearby. *')
    }

    return null;
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
    const friendsNearby = mobilesNearby.filter(function(mobile) {
        return isFriend(mobile)
    }).concat([Player]);

    // get the lowest hp friend
    friendsNearby.sort(function(e1, e2) {
        return e1.Hits() - e2.Hits()
    });

    if (friendsNearby.length) {
        const lowestHpFriend = friendsNearby[0]
        if (!checkFriendStatus(lowestHpFriend)) {
            Orion.CharPrint(Player.Serial(), 65, '* no friends in need! *')
        }
    } else {
        Orion.CharPrint(Player.Serial(), 65, '* no friends nearby. *')
    }

    return null;
}

function useMoongate() {
    Orion.UseFromGround("0x0F6C");
}

function dispelMoongate() {
	Orion.Cast('Dispel Field');
	Orion.WaitTargetGround('0x0F6C');
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
            if (!friend.IsHuman() && friend.Distance() < 2) {
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
            if (!friend.IsHuman() && friend.Distance() < 2) {
                healTarget(friend);
                return true;
            }
            if (!friend.IsHuman()) {
                Orion.Cast('Greater Heal', friendSerial);
                return true;
            }
            Orion.Cast('Heal', friendSerial);
            return true;
        }
    }
    return false
}

function setTarget() {
    Sallos.SetTarget();
    while (Orion.HaveTarget()) {
        Orion.Wait(50);
    }
    Orion.Attack(lasttarget);
}

function followLastTarget() {
    Orion.Follow(lasttarget);
}

function TargetAtPosition() {
    Orion.IgnoreReset();
    var nextMobile = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself", 18, "gray|criminal|orange|red|blue|green");
    if (nextMobile == '') {
        Orion.Print('not found');
        return null;
    }
    var availableTargets = [];
    while (nextMobile != '') {
        availableTargets.push(Orion.FindObject(nextMobile));
        Orion.Ignore(nextMobile);
        nextMobile = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself", 18, "gray|criminal|orange|red|blue|green");
    }
    var closestDistance = 100000;
    var closestTarget;
    availableTargets.forEach(function(t) {
        var targetDistance = Math.floor(Math.sqrt(Math.pow(SelectedTile.X() - t.X(), 2) + Math.pow(SelectedTile.Y() - t.Y(), 2)));
        if (targetDistance < closestDistance) {
            closestDistance = targetDistance;
            closestTarget = t;
        }
    });
    Orion.ShowStatusbar(closestTarget.Serial(), 200, 200);
    if (Orion.HaveTarget()) {
        Orion.TargetObject(closestTarget.Serial());
        Orion.CharPrint(closestTarget.Serial(), 33, '*** ' + closestTarget.Name() + ' Targeted  ***');
        Orion.ClientLastTarget(closestTarget.Serial());
        Orion.CharPrint(closestTarget.Serial(), 33, '*** LastTarget Set  ' + closestTarget.Name() + ' *** ');
        return;
    }
    if (closestTarget) {
        Orion.Print(closestTarget.Name());
        Orion.CharPrint(closestTarget.Serial(), 33, '*** LastTarget Set  ' + closestTarget.Name().toUpperCase() + ' ***');
        Orion.ClientLastTarget(closestTarget.Serial());
    }
}

var previousEnemy;
var notorietyColors = {
    2: 60,
    3: 87,
    5: 43,
    6: 33
}

function TargetNext() {
    if (Player.Name() == 'Demerzel' || Player.Name() == 'Daneel Olivaw' || Player.Name() == 'Josh Scogin') {
        mobileID = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself|ignorefriends", 12, "gray|criminal|orange|red|blue");
    } else {

        mobileID = Orion.FindType("-1", "-1", ground, "near|live|ignoreself|ignorefriends", 12, "gray|criminal|orange|red");
        //mobileID = Orion.FindType("0x0190|0x0191", "-1", ground, "near|live|ignoreself|ignorefriends",18, "gray|criminal|orange|red");
    }
    var enemytarget = Orion.FindObject(mobileID);
    //Orion.Print(mobileID);
    if (mobileID.length) {
        var enemyColor = 33;

        Orion.ClearHighlightCharacters();
        Orion.RemoveHighlightCharacter(previousEnemy);
        //Orion.Print( enemytarget.Notoriety());
        Orion.CharPrint(mobileID, enemyColor, '*** Target Found ***');
        if (Player.Name() === 'Aulin') {

            if (!Player.Hidden()) {
                Orion.Say('All Guard Me');
            }
        }

        Orion.ClientLastTarget(mobileID);

        if (shouldFollow) {
            Orion.Follow(mobileID);
        }
        Orion.ShowStatusbar(mobileID, 100, 200);
        Orion.SayParty('Target: ' + enemytarget.Name());
        Orion.CharPrint(Player.Serial(), enemyColor, 'Target: ' + enemytarget.Name());
        Orion.AddHighlightCharacter(mobileID, 15);
        Orion.Ignore(mobileID);
        previousEnemy = mobileID;
        Orion.Wait(50);
        return;
    }

    Orion.IgnoreReset();
    Orion.CharPrint(Player.Serial(), 33, '*** No Enemies Found ***');
}

function AutoAttackChamp() {
    while (!Player.Dead()) {
        //if(bettles[Player.Name()]){
        //	deposit();
        //}
        armMe();
        var mobobj = Orion.FindObject(mobileID);
        if (!mobileID || !Orion.ObjectExists(mobileID) || !mobobj.InLOS() || mobobj.Dead()) {
            if (shouldFollow) {
                Orion.Follow(mobileID);
            }
            TargetNext();
            if (mobobj) Orion.Print(mobobj.Notoriety());
        } else {
            Orion.Resend();
            if (shouldFollow) {
                Orion.Follow(mobileID);
            }
            AttackNext(mobileID);
            Orion.Print(mobobj.Distance());
            Orion.Print(mobobj.Exists());
        }
        if (shouldFollow) {
            Orion.Follow(mobileID);
        }
        Orion.Wait(200);
        //     }
    }
}

function AutoHealPVM() {
    var isTwoHanded = isTwoHandedChar[Player.Name()];

    function runme() {
        Orion.CharPrint(Player.Serial(), 65, '*** AutoHeal started for ' + Player.Name() + ' ***');
        while (!Player.Dead()) {
            healMe();
            Orion.Wait(600);
        }
    }
    runme();
}

function healPotion() {
    var healTime = 10000;
    if (Orion.GetGlobal('lastheal') < Date.now() - Orion.GetGlobal('healTime')) {
        if (Player.Hits() < Player.MaxHits()) {
            disarmMe();
            Orion.UseType('0x0F0C', '0xFFFF'); //heal pot
            var msg = 'some damage';
            if (Orion.InJournal(msg)) {
                Orion.SetTimer('HealPotion', healTime);
                Orion.AddDisplayTimer('HealPotion', healTime, 'AboveChar', 'Circle|Bar', 'Heal Pot', 35, 0, '0000ff ', 0xFFF, '0xFFF00FFE');

                Orion.SetGlobal('healTime', healTime);
                Orion.SetGlobal('lastheal', Date.now());
            }
            armMe();
        } else {
            Orion.CharPrint(Player.Serial(), 45, 'Already full health');
        }
    }
}

function bandagetimer() {
    if (!Orion.GetGlobal('lastbandage') || !Orion.GetGlobal('lasttimebandage') || Orion.GetGlobal('lastbandage') < Date.now() - Orion.GetGlobal('lasttimebandage')) {
        if (Player.Hits() < Player.MaxHits()) {
            if (Player.Dex() < 100) {
                timetobandage = ((14.5 - (Player.Dex() / 20)) * 1000) + 250;
            } else {
                timetobandage = ((13.5 - (Player.Dex() / 20)) * 1000) + 250;
            }
            if (Player.Poisoned()) {
                timetobandage = timetobandage + 2000;
            }
            Orion.Wait(200);
            Orion.BandageSelf();

            if (Orion.WaitJournal('You begin', Orion.Now(), Orion.Now() + 500, 'sys|my')) {
                Orion.SetTimer('bende', timetobandage);
                Orion.CharPrint(Player.Serial(), 65, 'Bandage Started');
                Orion.AddDisplayTimer('bende', timetobandage, 'AboveChar', 'Circle|Bar', 'Bandage', -35, 0, '0xFFFF', 0xFFF, '0xFFFFFFFE');
                Orion.SetGlobal('lasttimebandage', timetobandage);
                Orion.SetGlobal('lastbandage', Date.now());
            }
            drinkCure();
        } else {
            Orion.CharPrint(Player.Serial(), 45, 'Already at Full Health');
        }
    }
}

function testColor() {
    Orion.Print(Player.Direction() & 7)
    Orion.Print(Player.X());
    Orion.Print(Player.Y());
}



function deposit() {
    var bettle = bettles[Player.Name()];
    while(true){
	    if (Player.Weight() > 340 && shouldDeposit) {
	        Orion.UseObject('self');
	        Orion.Wait(550);
	        var gold = Orion.FindType('0x0EED', '0xFFFF', backpack); //gold
	        Orion.Wait(350);
	        Orion.MoveItem(gold, -1, bettle);
	        Orion.Wait(600);
	        Orion.UseObject(bettle);
	    }
    	Orion.Wait(600);
	}
}


function AttackNext(mobileID) {
    var toCast = 'Lightning';
    var toCast = 'Energy Bolt';
    if (shouldFollow) {
        Orion.Follow(mobileID);
    }
    Orion.CharPrint(mobileID, 33, '*** Target Found ***');
    if (Player.Name() !== 'Aulin') {
        Orion.TargetObject(mobileID);
        Orion.ClientLastTarget(mobileID);
    } else {
        if (!Player.Hidden()) {
            Orion.Say('All Guard');
        }
    }
    Orion.Attack(mobileID);
    if (Player.Name() == 'MilkLizard') {
        if (Player.Mana() < 20) {
            Orion.UseSkill('Meditation');
        } else {
            var mob = Orion.FindObject(mobileID);
            if (mob && mob.Distance() < 3) {
                Orion.Print("Distance < 3, running!");
                var px = Player.X() + 5;
                var py = Player.X() + 5;
                Orion.WalkTo(px, py, Player.Z(), 5, 1, 1, 1);
                Orion.Wait(2000);
            }
            if (mob && mob.InLOS()) {
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
                Orion.Cast(toCast);
                Orion.Wait(2000);
                Orion.TargetObject(mobileID);
            }
        }

        Orion.UseSkill('Meditation');
    }

    Orion.Wait(300);
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
        if (Orion.InJournal('Your music succeeds')) {
            Orion.CharPrint(Player.Serial(), 65, 'Provoke Success');
        }
        if (Orion.InJournal('You fail') || Orion.InJournal('You must wait')) {
            Orion.CharPrint(Player.Serial(), 45, 'Provoke Failed');
        }

        Orion.ClearJournal();
    } else {
        Orion.Print("No Mobs within range to provoke");
        Orion.IgnoreReset();
    }
    Orion.CharPrint("self", 1153, "Provocation Completed!");
}


function castExplosion() {
    castOffensiveSpell('Explosion', 1950, true);
}

function castPoison() {
    castOffensiveSpell('Poison', 1170, true);
}

function castEnergyBolt() {
    castOffensiveSpell('Energy Bolt', 2050);
}

function castWeaken() {
    castOffensiveSpell('Weaken', 720, true);
}

function castClumsy() {
    castOffensiveSpell('Clumsy', 720, true);
}

function castLightning() {
    castOffensiveSpell('Lightning', 2500);
}

function castFlame() {
    castOffensiveSpell('Flame Strike', 2400, true);
}

function castMdrain() {
    castOffensiveSpell('Mana Drain');
}

function castFeeblemind() {
    castOffensiveSpell('Feeblemind', 720, true);
}

function castMagicArrow() {
    castOffensiveSpell('Magic Arrow', 720, true);
}

function castMindBlast() {
    castOffensiveSpell('Mind Blast', 1650, true);
}

function moveWands() {
    Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');

    Orion.AddObject('toContainer');
    Orion.Print('Select a container to move items to');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var toContainer = Orion.FindObject('toContainer');
    var gold = Orion.FindType(any, -1, fromContainer.Serial());

    Orion.Print(gold);
    gold.map(function(g) {
        var toid = Orion.FindObject(g);
        if (Orion.Contains(toid.Properties(), 'Mana Drain')) {

            Orion.MoveItem(g, 1, toContainer.Serial());
            Orion.Wait(800);
        }

    });
}

function repairArmors() {
    Orion.AddObject('fromContainer');
    Orion.Print('Select a container to repair items from');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');

    var gold = Orion.FindType(any, -1, fromContainer.Serial());
    var armor_type = 'leather';
    gold.map(function(g) {
        var toid = Orion.FindObject(g);
        if (Orion.Contains(toid.Properties(), armor_type)) {
            // hammer   Orion.UseType('0x13E3', '0xFFFF');
            Orion.UseType('0x0F9D', '0xFFFF'); //leather
            Orion.Wait(1000);

            var gump0 = Orion.GetGump('last');
            gump0.Select(Orion.CreateGumpHook(42));
            Orion.Wait(100);


            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(g);
            }
            //Orion.TargetObject(toid.Serial());
            //Orion.MoveItem(g, 1, toContainer.Serial());
            Orion.Wait(600);
        }

    });
}

function getAllLeather() {
    Orion.AddObject('fromContainer');
    Orion.Print('Select a container to move items from');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var fromContainer = Orion.FindObject('fromContainer');

    Orion.AddObject('toContainer');
    Orion.Print('Select a container to move items to');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var toContainer = Orion.FindObject('toContainer');
    var gold = Orion.FindType(any, -1, fromContainer.Serial());
    var armor_type = 'leather';
    gold.map(function(g) {
        var toid = Orion.FindObject(g);
        if (Orion.Contains(toid.Properties(), armor_type)) {
            Orion.UseObject('0x40B6AD69');
            Orion.Wait(1000);

            var gump0 = Orion.GetGump('last');
            gump0.Select(Orion.CreateGumpHook(42));
            Orion.Wait(100);


            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(g);
            }
            //Orion.TargetObject(toid.Serial());
            //Orion.MoveItem(g, 1, toContainer.Serial());
            Orion.Wait(600);
        }

    });
}

function castHeal(){
	castFriendlySpell('Heal');
}

function castGHeal(){
	castFriendlySpell('Greater Heal');
}

function castCure(){
	castFriendlySpell('Cure');
}

function castFriendlySpell(spell){
    Orion.Cast(spell);
    Shared.AddVar('currentSpell', spell);
}

function castOffensiveSpell(spell, timer, noTarget) {

    if (!Orion.InParty(lasttarget) && !noTarget) {
        Orion.TargetObject(lasttarget);
    }
    
    Orion.Print(Shared.GetVar('currentSpell'));
    Orion.Cast(spell);
    Shared.AddVar('currentSpell', spell);

    if (!noTarget) {
        var foe = Orion.FindObject(lasttarget);
        if (Orion.InParty(lasttarget)) {
            Orion.CharPrint(Player.Serial(), 65, '*** LAST TARGET ON PARTY ***');
            return false;
        }

        if (timer) {
            Orion.Wait(timer);
            if (foe && foe.Distance() < 13 && foe.InLOS()) {
                Orion.TargetObject(lasttarget);
    		    Shared.AddVar('currentSpell', '');
            }
        }
    }
}

function runForrest() {
    Orion.Print('Running...');
    var value = 4;
    var empty = 0;

    var offset = [
        [empty, -value], //direction = 0
        [value, -value], //direction = 1
        [value, empty], //direction = 2
        [value, value], //direction = 3
        [empty, value], //direction = 4
        [-value, value], //direction = 5
        [-value, empty], //direction = 6
        [-value, -value] //direction = 7
    ];
    var xy = offset[Player.Direction() & 7];
	var thePlayerX = Player.X();
    var thePlayerY = Player.Y();
    while (!Player.Dead()) {

		thePlayerX = Player.X();
    	thePlayerY = Player.Y();
        thex = thePlayerX + xy[0];
        they = thePlayerY + xy[1];
        Orion.Print(thex+' '+they);
        Orion.WalkTo(thex, they);
        Orion.Wait(50);
       	if(Player.X() === thePlayerX && Player.Y() === thePlayerY){
       		Orion.Print(thePlayerX+' '+thePlayerY);
       	 	Orion.Print('STUCK');
        }
    	xy = offset[Player.Direction() & 7];
        Orion.Print('----------');
    }
}

function MatrixPrintTest() {
    var posX = Player.X();
    var posY = Player.Y();
    var posZ = Player.Z();
    var radius = 12;
    var index = 1;
    Orion.ClearFakeMapObjects();
    for (var i = -radius; i <= radius; i++) {
        for (var j = -radius; j <= radius; j++) {
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

function trainPets() {
    while (true) {
        Orion.UseSkill('21');
        Orion.UseObject('0x49F6C467');
        Orion.Wait(23000);
        var pet1 = Orion.FindObject('0x000C5C30');
        var pet2 = Orion.FindObject('0x003B4984');
        while (pet1.Hits() < pet1.MaxHits() && pet2.Hits() < pet2.MaxHits()) {
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
            .sort(function(a, b) {
                return Orion.GetDistance(a.Serial()) - Orion.GetDistance(b.Serial());
            });
        if (players.length > 0) {
            const player = players[0];
            Orion.Print("Found player " + player.Name() + " -> " + Orion.GetDistance(player.Serial()));
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

function stealWeapon() {
    Orion.UseWrestlingDisarm();
    Orion.AddObject('weaponToSteal');
    Orion.Print('Select a weapon to steal');
    while (Orion.HaveTarget()) {
        Orion.Wait('50');
    }
    var weaponToSteal = Orion.FindObject('weaponToSteal');
    var theBack = getClosestBackpack();
    Orion.ClearJournal();
    while (!theBack) {
        theBack = getClosestBackpack();
        Orion.Wait(20);
    }

    while (!Orion.InJournal('You successfully disarm')) {
        Orion.Wait(500);
    }
    var weap = Orion.FindObject(weaponToSteal, theBack.Serial());
    Orion.Print('get weap');
    Orion.Print(weap);
    Orion.Print(weaponToSteal);
    Orion.Wait(20);
    Orion.UseSkill('stealing', weaponToSteal.Serial());

    Orion.Print(weap);


}

//relic 0x2AA4


function stealPSrelic() {
    var theBack = getClosestBackpack();
    Orion.ClearJournal();
    while (!theBack) {
        theBack = getClosestBackpack();
        Orion.Wait(50);
    }

    Orion.Wait(20);
    var toSteal = Orion.FindType('0x2AA4', 'any', theBack.Serial());
    Orion.Wait(20);
    Orion.Print(toSteal);
    if (toSteal != '') {
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
    if (toSteal != '') {
        Orion.Wait(20);
        Orion.UseSkill('Stealing', toSteal);
        Orion.Wait(300);
        Orion.UseSkill('hiding');
        return;
    }

    var puches = Orion.FindType('0x0E79', '0xFFFF', theBack.Serial());
    puches.forEach(function(p) {
        var toSteal = Orion.FindType('0x2AA4', 'any', theBack.Serial());
        Orion.Wait(20);
        Orion.Print(toSteal);
        if (toSteal != '') {
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
        if (toSteal != '') {
            Orion.Wait(20);
            Orion.UseSkill('Stealing', toSteal);
            Orion.Wait(300);
            Orion.UseSkill('hiding');
            return;
        }
    });

}

function getcurrentrunebook() {
    for (var i = 0; i < Orion.GumpCount(); i++) {
        runebookgump = Orion.GetGump(i);
        Orion.Print(runebookgump.Serial());
        if (runebookgump != null && runebookgump.ID() == '0x554B87F3') {
            return runebookgump;
        }
    }
}

function getMapCoords() {
    Orion.Print(Orion.GetWorldMapPointerPosition().X());
    Orion.Print(Orion.GetWorldMapPointerPosition().Y());
    Orion.Print(Player.X());
    Orion.Print(Player.Y());
}

function closerunebookgumps() {
    for (var i = 0; i < Orion.GumpCount(); i++) {
        runebookgump = Orion.GetGump(i);
        if (runebookgump != null && runebookgump.ID() == '0x554B87F3') {
            runebookgump.Select(Orion.CreateGumpHook(0));
        }
    }
}

function testSextant() {
    var sextantString = Orion.XYToSextant(1234, 123);
    TextWindow.Open();
    TextWindow.Print(sextantString);
    Orion.Print(Orion.SextantToXY("131o 55'N, 6o 15'W"));
}

function distanceBetweenTwoPoints(p1, p2) {
    var distance = Math.floor(Math.sqrt((Math.pow(p2.x - p1.x, 2)) + (Math.pow(p2.y - p1.y, 2))))
    return distance;
}

function areClosePoints(p1, p2) {
    if (p1.x < p2.x + 100 && p1.x > p2.x - 100 &&
        p1.y < p2.y + 100 && p1.y > p2.y - 100) {
        return true;
    }
    return false;
}

function myPosition() {

    Orion.Print(Player.X());
    Orion.Print(Player.Y());
    Orion.Print(Orion.GetWorldMapPointerPosition().X());
}

function recallByPosition() {
    var cursorPosition = Orion.GetWorldMapPointerPosition();
    closerunebookgumps();
    var input = Orion.NewFile();
    input.Open('./OA/Config/' + Player.Serial() + '.json');
    var runes = JSON.parse(input.ReadAll());
    var found = false;
    runes.every(function(rune) {
        var areTheyClose = areClosePoints({
            x: cursorPosition.X(),
            y: cursorPosition.Y()
        }, {
            x: rune.X,
            y: rune.Y
        });
        var distance = distanceBetweenTwoPoints({
            x: cursorPosition.X(),
            y: cursorPosition.Y()
        }, {
            x: rune.X,
            y: rune.Y
        });
        //TextWindow.Print( rune.X +' ' + rune.Y +' '+ cursorPosition.X() +' ' +  cursorPosition.Y() +' '+ areTheyClose +' '+ distance);
        if (areTheyClose) {
            Orion.Print('found one');
            Orion.Print(rune.RName, rune.RSerial);
            var runebookobj = Orion.FindObject(rune.RSerial);
            if (runebookobj) {
                if (runebookobj.Distance() < 2) {
                    Orion.UseObject(runebookobj.Serial());
                    if (Orion.WaitForGump(1500)) {
                        var currentGump = getcurrentrunebook();
                        currentGump.Select(Orion.CreateGumpHook(rune.RPosition));
                        Orion.CharPrint(self, '55', '- ' + rune.RName + ' -');
                        found = true;

                        return false;
                    }
                } else {
                    Orion.CharPrint(runebookobj.Serial(), '22', 'Runebook is too far away!');
                    return false;
                }
                return true;
            }
            return true;
        }
        return true;
    });

}

function fetchRuneBooks() {
    finalJSON = [];
    var runes = [];
    backpackrunebooks = Orion.FindType('0x22C5', '-1', backpack);
    backpackrunebooks2 = Orion.FindType('0x0EFA', '!0X0000', backpack);
    groundrunebooks = Orion.FindType('0x22C5', '-1', ground, '2');
    groundrunebooks2 = Orion.FindType('0x0EFA', '!0x0000', ground, '2');
    runebooks = backpackrunebooks2.concat(backpackrunebooks, groundrunebooks, groundrunebooks2);
    closerunebookgumps();
    runebooks.forEach(function(runebook, i) {

        currentrunebook = Orion.FindObject(runebook);
        Orion.CharPrint(self, '32', 'Queued: ' + (runebooks.length - i));
        Orion.UseObject(currentrunebook.Serial());
        if (Orion.WaitForGump(550)) {
            var currentGump = getcurrentrunebook();
            if (currentGump != null) {
                runebooktext = currentGump.CommandList();
                button = 5;
                //TextWindow.Open();
                var textList = currentGump.TextList();
                //textList.forEach(function (t, i){
                //TextWindow.Print(i +' ' + t);

                //});
                var parsedElement = parseInt(textList[1]);
                var j = isNaN(parsedElement) ? 1 : 2;
                var toRemove = j;
                // TextWindow.Print(parsedElement +'  '+ isNaN(parsedElement));
                var coordsIndex = 70;
                var coordsIndexIncrease = 10;
                var coordsCommands;
                for (var k = 34; k < 66; k += 2) {
                    TextWindow.Print('--------------');
                    var sextant = null,
                        position = null;
                    var missed = true;
                    gumpcommand = currentGump.Command(k);
                    splittext = gumpcommand.split(/\s+/);
                    var runeName = currentGump.Text(splittext[7]).toLowerCase();

                    if (runeName === 'empty') {
                        break;
                    }
                    var runeX = textList[((textList.length - toRemove) / 3) + j];
                    var runeY = textList[((textList.length - toRemove) / 3) + j + 1];
                    //TextWindow.Print( currentGump.Text(splittext[7]).toLowerCase() +' ' +runeX +' ' +runeY);


                    coordsCommand = currentGump.Command(coordsIndex);
                    coordN = currentGump.Command(coordsIndex).split(/\s+/);
                    coordE = currentGump.Command(coordsIndex + 1).split(/\s+/);

                    coordsNTextIndex = parseInt(coordN[5]);
                    coordsETextIndex = parseInt(coordE[5]);
                    if (coordsNTextIndex + 1 === coordsETextIndex) {
                        sextant = textList[coordsNTextIndex].replace(' ', 'o ').replace('�', '') + ', ' + textList[coordsETextIndex].replace(' ', 'o ').replace('�', '');
                        position = Orion.SextantToXY(sextant);
                        missed = false;
                    }

                    if (runeX && runeY) {
                        sextant = runeX.replace(' ', 'o ').replace('�', '') + ', ' + runeY.replace(' ', 'o ').replace('�', '');
                        position = Orion.SextantToXY(sextant);
                        missed = false;
                    }
                    //rion.InfoGump();
                    var obj = {
                        RSerial: currentrunebook.Serial(),
                        RName: runeName,
                        RPosition: button,
                        X: position ? position.X() : null,
                        Y: position ? position.Y() : null,
                    };
                    runes.push(obj);

                    button = button + 6;
                    coordsIndex += coordsIndexIncrease;
                    coordsIndexIncrease = coordsIndexIncrease === 10 ? 13 : 10;

                    if (missed) {
                        coordsIndex -= 2;
                    }
                    missed = true;

                    j += 2;
                }
            }
        }
        closerunebookgumps();
        Orion.Wait(550);
    });
    Orion.CharPrint(self, '32', 'Finished!');
    closerunebookgumps();
    var output = Orion.NewFile();
    output.Remove('./OA/Config/' + Player.Serial() + '.json');
    output.Open('./OA/Config/' + Player.Serial() + '.json');
    output.Write(JSON.stringify(runes));
    output.Close();
}

function recall(args) {
    closerunebookgumps();
    args = args.toLowerCase();
    var input = Orion.NewFile();
    input.Open('./OA/Config/' + Player.Serial() + '.json');
    var runes = JSON.parse(input.ReadAll());
    var found = false;
    runes.forEach(function(rune) {
        if (rune.RName == args) {
            runebookobj = Orion.FindObject(rune.RSerial);
            Orion.Print(rune.RSerial);
            if (runebookobj) {
                if (runebookobj.Distance() < 2) {
                    Orion.UseObject(runebookobj.Serial());
                    if (Orion.WaitForGump(1500)) {
                        var currentGump = getcurrentrunebook();
                        currentGump.Select(Orion.CreateGumpHook(rune.RPosition));
                        Orion.CharPrint(self, '55', '- ' + rune.RName + ' -');
                        found = true;
                        return;
                    }
                } else {
                    Orion.CharPrint(runebookobj.Serial(), '22', 'Runebook is too far away!');
                    break;
                }
            }
        }
    });

    if (!found) {
        Orion.Print('Rune name is not found (or currently unable to support spaces in rune names).');
    }
}

function gate(args) {
    closerunebookgumps();
    args = args.toLowerCase();
    var input = Orion.NewFile();
    input.Open('./OA/Config/' + Player.Serial() + '.json');
    var runes = JSON.parse(input.ReadAll());
    var found = false;
    runes.forEach(function(rune) {
        if (rune.RName == args) {
            runebookobj = Orion.FindObject(rune.RSerial);
            if (runebookobj) {
                if (runebookobj.Distance() < 2) {
                    Orion.UseObject(runebookobj.Serial());
                    if (Orion.WaitForGump(1500)) {
                        var currentGump = getcurrentrunebook();
                        currentGump.Select(Orion.CreateGumpHook(rune.RPosition + 1));
                        Orion.CharPrint(self, '55', '- ' + rune.RName + ' -');
                        found = true;
                        return;
                    }
                } else {
                    Orion.CharPrint(runebookobj.Serial(), '22', 'Runebook is too far away!');
                    return;
                }
            }
        }
    });
    if (!found) {
        Orion.Print('Rune name is not found (or currently unable to support spaces in rune names).');
    }
}
//--#Sallos Commands
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Sallos commands - Created by aga//////////////////////////////////////////
///////Change command prefix (hotkeys tab) to '. ' for familiar Sallos functionality/////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function potdrop() {
    pottypes = '0x0F0C|0x0F0B|0x0F07|0x0F08|0x0F09|0x0F0D'
    Orion.Print('Target the destination container.');
    Orion.AddObject('container');
    while (Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    pots = Orion.FindTypeEx(pottypes, '0x0000', backpack);
    if (pots.length) {
        for (var i = 0; i < pots.length; i++) {
            Orion.MoveItem(pots[i].Serial(), pots[i].Count(), 'container')
            Orion.Wait(600);
        }
    }
}

function regdrop() {
    regtypes = '0x0F8D|0x0F85|0x0F84|0x0F86|0x0F88|0x0F7B|0x0F8C|0x0F7A'
    Orion.Print('Target the destination container.');
    Orion.AddObject('container');
    while (Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    regs = Orion.FindTypeEx(regtypes, '0x0000', backpack);
    if (regs.length) {
        for (var i = 0; i < regs.length; i++) {
            Orion.MoveItem(regs[i].Serial(), regs[i].Count(), 'container')
            Orion.Wait(600);
        }
    }
}

function move() {
    Orion.AddObject('itemtype');
    Orion.Print('Target one of the items to move.');
    Orion.WaitForAddType('itemtype');
    Orion.Print('Target the destination container.');
    Orion.AddObject('container');
    while (Orion.HaveTarget()) {
        Orion.Wait(20);
    }
    var it = Orion.FindObject('itemtype');
    var types = Orion.FindType(it.Graphic(), 'any', lastcontainer);
    itemstomove = Orion.FindType('itemtype', '-1', lastcontainer);
    if (types.length) {
        for (var i = 0; i < types.length; i++) {

            Orion.MoveItemType(types[i].Graphic(), 'any', lastcontainer, 0, 'container')
            Orion.Wait(600);
        }
    }
}
