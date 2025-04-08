# Cvičení 1

Implementujte funkci `sortStudents()` v souboru `index.js`.

## Spuštění skriptu

Pro ověření spusťte skript z příkazové řádky (terminálu) příkazem:

```shell
node cviceni-1/index.js
```

Pokud terminál otevřete přímo ze složky `cviceni-1`, spouštěcí příkaz je jen: `node index.js`.

## Očekávaný výstup

```JavaScript
[
  { name: null, score: 100 },
  { name: 'Bob', score: 95 },
  { name: 'Dave', score: 90 },
  { name: 'Alice', score: 85 },
  { name: 'Charlie', score: 85 },
  { name: 'Eve' },
]
```

Poslední záznam (*Eve*) může být i na prvním místě – chování funkce `sortSudents()` není pro tento případ v zadání definované.
