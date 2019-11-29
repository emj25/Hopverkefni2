# Upplýsingar um hvernig keyra skuli verkefnið:
1. Clone-a verkefnið niður af github (eða sækja það hvernig sem þú vilt)
2. Install NodeJS ef þú er ekki með það. NodeJS má sækja hér: https://nodejs.org/en/
3. Keyra NPM INSTALL í möppunni með verkefninu
4. Keyra NPM RUN ROLLUP til að búa til script.js í dist
5. Keyra NPM RUN SASS til að búa til styles.css í dist
6. Keyra NPM RUN DEV til að keyra verkefnið (Athuga að þetta ætti að gera skref 4 og 5 sjálfkrafa)
7. Vista eitthvað *.scss skjal til þýða scss skrár í css skrá til að keyra rollup babel og sass ef það gerist ekki sjálfkrafa og þú slepptir skrefum 4 og 5

# Lýsing á uppsetningu verkefnis og skipulag CSS:
Allar síður eru í rót þ.m.t. index.html sem stýrir forsíðunni.

Öllu útliti á síðunum er stýrt með scss-skrám. Sumar eiga við eina html-síðu en aðrar eru notaðar víðar.  Styles.scss sækir upplýsingar í þessar skrár með import-skipun.  Loks er sú skrá þýdd yfir í styles.css skrána með sass. Í styles.css sem er geymd í dist sækja html-skrárnar allar upplýsingar um útlit. 
Aðal skriptann index.js er geymd í src. Aðrar Skriptur eru geymdar í src/lib. Skriptur eru þýddar með rollup og transpile-aðar með babel í bundle.js sem er geymd í dist. 
	
# Skipulag á möppum og skrám
Mappa [src]
- Mappa [lib]
  - Inniheldur .js skrár
  - Mappa [styles] 
    - scss skrár sem eru notaðar til að búa til styles css með sass keyrslu

Mappa [img]
- inniheldur myndefni fyrir síður

Mappa [dist]
- inniheldur bundle.js og styles.css sem eru búnar til með rollup og babel, og sass

index.html
- forsíða heimasíðu

fyrirlestur.html
- síða fyrir einstaka fyrirlestra

styles.css
- css skrá sem verður til þýðingu á styles.scss

styles.scss
- safn allra skilgreininga í öðrum scss skrám

package-lock.json
- inniheldur upplýsingar fyrir NodyJS til að setja upp öll JavaScript modules sem við notum til hagræðingar við vinnslu verkefnisins.

package.json
- "lint-css": lintar css skjalið
- "lint-scss": linta scss skjöl (athugar bara skjöl sem styles.scss improtar)
- "dev":  Keyrir Browser Sync og Sass,
- "browser-sync": Fylgist með breytingum á css og html skrám svo ekki þurfi að refresha broser
- "sass": fylgist með breytingum á scss skrám og uppfærir css skjál þegar þær eru gerðar (og scss skrár vistaðar.



# Þeir sum unnu verkefnið eru:
Bóas Guðjónsson
Dæmahópur: 3
kt: 070392-2839
bog26@hi.is

Einar Már Júlíusson
Dæmahópur:  2
kt: 271066-8649
emj25@hi.is

Ósvaldur Knudsen
Dæmahópur: 1
kt: 030174-3999
okk3@hi.is 


> Útgáfa 0.1