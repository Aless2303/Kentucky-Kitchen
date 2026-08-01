# Kentucky Kitchen

Rețetarul nostru — rețete cu ingrediente, mod de preparare și valori
nutriționale (kcal + proteină pe 100g și pe porție).

**Site live:** https://aless2303.github.io/Kentucky-Kitchen/

## Cum îl deschizi

- **Online:** de pe orice telefon sau calculator, la linkul de mai sus.
- **Local:** dublu-click pe `index.html`.

## Cum adaugi o rețetă nouă

1. Deschide `retete/_model-reteta.txt` — acolo ai două șabloane (unul simplu
   și unul cu secțiuni, gen blat + cremă) și explicații pas cu pas.
2. Copiezi șablonul într-un fișier nou în folderul `retete/`
   (ex: `retete/sarmale.js`).
3. Completezi titlul, categoria, ingredientele, pașii și valorile
   nutriționale (obligatorii — dacă nu ești sigur de cifre, pui o estimare
   și lași `estimare: true`).
4. Pui poza în folderul `poze/`, cu exact numele scris la câmpul `poza`.
   Folosește `.jpg` — e de ~10 ori mai mic decât `.png` la aceeași calitate.
5. Deschizi `index.html` și adaugi o linie nouă lângă celelalte rețete,
   deasupra comentariului `ADAUGĂ AICI RETETE NOI`:
   ```html
   <script src="retete/sarmale.js"></script>
   ```
6. Salvezi și verifici local (dublu-click pe `index.html`).

## Cum urci modificările pe site

Deschizi PowerShell în folderul proiectului și rulezi:

```powershell
git add -A
git commit -m "Am adaugat reteta de sarmale"
git push
```

În 1-2 minute modificările apar automat pe site-ul live.

## Categorii

Fiecare rețetă are una dintre acestea trei (se scriu exact așa, cu diacritice):

- `Feluri de mâncare` — mâncăruri gătite, care ies în cantitate mare
- `Gustări` — burgeri, tacos, pizza, humus, ovăz
- `Deserturi` — dulciuri, prăjituri, budinci, pancakes

## Structura folderului

```
index.html        -> pagina principală
style.css         -> aspectul site-ului
app.js            -> logica (meniu, căutare, afișarea rețetei)
retete/           -> câte un fișier pentru fiecare rețetă
poze/             -> pozele rețetelor + cele două fundaluri
poze-originale/   -> pozele originale .png (rămân doar local, nu se urcă)
```
