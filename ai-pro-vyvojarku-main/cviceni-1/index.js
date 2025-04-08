// Ukázkové pole studentů
const students = [
  { name: 'Charlie', score: 85 },
  { name: 'Bob', score: 95 },
  { name: 'Dave', score: 90 },
  { name: null, score: 100 },
  { name: 'Alice', score: 85 },
  { name: 'Eve' },
]

// Funkce, která seřadí studenty podle více kritérií:
// 1. Seřadí podle skóre v sestupném pořadí. (100, 99, ...)
// 2. Pokud mají dva studenti stejné skóre, seřadí podle jména v abecedním pořadí. (Adam, Bert, ...)
function sortStudents(students) {
  // Logika pro seřazení studentů
  return students
}

// Volání funkce a zobrazení výsledků
console.log(sortStudents(students))
