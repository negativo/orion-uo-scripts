Orion.ClearJournal();
Orion.UseWrestlingStun();
Orion.Wait('100');
if (Orion.WaitJournal("ready", Orion.Now(), Orion.Now() + 500, "sys")){
Orion.CharPrint(self,  0xFFFF, "ACTIVE");
} else {
Orion.CharPrint(self, Orion.Random(0,255), "INACTIVE");
}
