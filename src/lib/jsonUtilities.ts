// JSON-утилиты

// Загружает JSON-файл по сети или из локального файла
export async function loadJSON(path: string) {
  try {
    const response = await fetch(path);
    if (!response.ok)
      throw new Error('Сетевой ответ при загрузке JSON некорректен');
    return await response.json();
  } catch (error) {
    throw new Error('Ошибка при загрузке JSON: '+ (error as Error).message, );
  }
}


/**
 * Динамический импорт JSON-файла
 * @param importPath - путь к JSON-файлу или каталогу, внутри к-го есть index.js/index.ts (c export'ом соотв. JSON-файла/файлов)
 *                     Примеры: 'src/data/file.json', 'src/data'
 * Проблемы: если для сборки исп-ются некоторые bundler'ы (Webpack, Vite), то в run-time может выдавать ошибку 
 * "Cannot find module %importPath%", хотя прямой Динамический импорт работает норм: const data = await import('some/import/path/file.json');
 * Причина: bundler при сборке использует статический анализ import path, т.е. для импорта нужна стат. строка, а не переменная.
 * Решения: 
 *   1. Исп-ть прямой дин. импорт, вместо исп-я данной ф-ии
 *   2. Исп-ть dynamicImportFixedJSON (см. ниже)
 *   3. Также возможны альтернативные решения: google search "typescript dynamic import with variable path error"
 */
/*
export async function dynamicImportJSON(importPath: string) {
  return await import(importPath);
  // return await import(importPath, { assert: { type: "json" }});  // dynamic import json, error need "importAssertions": true ???
}
*/

/*
// Map для динамических импортов статических файлов
// !!! Все статические файлы/папки должны существовать при разработке !!!
const mapModules = new Map([
  ['src/__data__', () => import('src/__data__')]
  // ['moduleB', () => import('./moduleB.js')],
]);

export async function dynamicImportFixedJSON(importPath: string) {
  // Получаем ф-ю со стат. путем для дин. импорта файла по пути importPath
  const fnImport = mapModules.get(importPath);
  if (typeof fnImport === 'function')
    return await fnImport();
}
*/
