# Rețetele mele

Un site simplu, local, pentru rețetele tale — carduri cu poză, iar la click
se deschide rețeta completă (ingrediente + mod de preparare).

## Cum îl deschizi

Dublu-click pe `index.html` — se deschide direct în browser, nu ai nevoie
de nimic instalat.

## Cum adaugi o rețetă nouă

1. Deschide `retete/_model-reteta.txt` — acolo ai două șabloane (simplu și
   cu secțiuni, gen blat + cremă) și explicații pas cu pas.
2. Copiezi șablonul într-un fișier nou în folderul `retete/`
   (ex: `retete/sarmale.js`).
3. Completezi titlul, ingredientele, pașii și valorile nutriționale
   (calorii/proteină la 100g și cât e o porție, ca gramaj) — nutriția e
   obligatorie la fiecare rețetă; dacă nu ești sigur(ă) de cifre, pui o
   estimare și lași `estimare: true`.
4. Pui poza rețetei în folderul `poze/`, cu același nume pe care l-ai scris
   la câmpul `poza` din fișier.
5. Deschizi `index.html` și adaugi o linie nouă (lângă celelalte rețete,
   deasupra comentariului `ADAUGĂ AICI RETETE NOI`):
   ```html
   <script src="retete/sarmale.js"></script>
   ```
6. Salvezi și reîmprospătezi pagina în browser.

## Structura folderului

```
index.html      -> pagina principală
style.css       -> aspectul site-ului
app.js          -> logica (afișare carduri, căutare, fereastra cu rețeta)
retete/         -> câte un fișier pentru fiecare rețetă
poze/           -> pozele rețetelor
```
