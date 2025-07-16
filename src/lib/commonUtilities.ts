// Общий модуль различных утилит

// Асинхронная задержка на заданное кол-во ms
export function sleepAsync (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

