screenLog.init(); // affiche le log de la console
// Cliquez sur la flèche de rafraichissement dans la fenêtre de droite, juste à gauche de l'url pour relancer.

import { Observable, interval } from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';

// Création de streams
function createStream(name: string, iterations: number, intervalle: number): Observable<any> {
  return interval(intervalle).pipe(
    take(iterations),
    tap(val => console.log(`[ Stream ${name} ] : ${val}`))
  )
}

const streamA = createStream('A', 5, 100);
const streamB = createStream('B', 5, 200);
const streamC = createStream('C', 5, 50);

streamA.pipe(withLatestFrom(streamB, streamC, (a, b, c) => a + b + c))
                    .pipe(tap(val => console.log(`WITH_LATEST_FROM : ${val}`)))
                    .subscribe();

// Ici, nous passons une fonction de projection qui permet d'effectuer des actions avec les valeurs retournées par withLatestFrom (valeur émise par A et dernière valeur émise par B).
