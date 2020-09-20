import { coord } from './declarations';

export class Subject {
	private observers: Observer[] = []

  attach(o: Observer): void {
		this.observers.push(o);
	};
	
  detach(o: Observer): void {
		const i = this.observers.indexOf(o);
		this.observers.splice(i, 1);
	};

  notify<T>(value: T): void {
		for (let o of this.observers) {
			o.update(value)
		}
	}
}

export class Observer {
  fun: Function;

  constructor(f: Function) {
    this.fun = f;
  }

  update<T>(value: T) {
    this.fun(value);
  }
}
