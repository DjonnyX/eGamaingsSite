export class Debounse {

    private _timer: any;

    private _execute = () => {
        this._fn();
    }

    constructor(private _fn: Function, private _delay: number) {}

    call() {
        this.reset();
    }

    private reset() {
        clearTimeout(this._timer);
        this._timer = setTimeout(this._execute, this._delay);
    }

    dispose() {
        clearTimeout(this._timer);
        this._fn = null;
    }
}