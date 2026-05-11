Az frontend indítása:

1. Navigálás a projektbe:
   cd projekt-neve

2. Függőségek letöltése:
   npm install

3. App indítása:
   npx ng serve


A frontend a http://localhost:4200 cı́men érhető el.
Legalább Node 20.19.0 szükséges.

Az alkalmazás Angular 21-es verzióval készült.



Észrevételek:

-Az open-api leíróban a response lehetne JSON, ha azzal dolgozunk és akkor nem kell a blob-ot parse-olni minden request-nél.

-Lapozás biztosítása státuszonként/prioritásonként stb:
Hasznos lenne egy request amit lehetne paraméterezni, hogy melyik mező alapján adja vissza group-olva a task-okat és hozzá a lapozási adatokat. Így be lehetne tölteni csoportosítva (drag & drop-os rész) a task-okat egyetlen kéréssel, ha nagy számú adat van.

-Címre és leírásra külön lekérdezés lehetősége a kereséshez.

-Felelősök/user-ek lekérezésének lehetősége ne csak id, hanem a beírt szöveg alapján a nevére match-elve.

-Sort API-hoz objektum megadása, pl.:
{direction: '', active: ''}
ne csak vesszővel elválasztott string

-státusz és property sorrendezett lekéréshez jó lenne egy logikai változat is az ABC sorrend mellé:
TODO, IN_REVIEW, IN_PROGRESS, DONE => TODO, IN_PROGRESS, IN_REVIEW, DONE





