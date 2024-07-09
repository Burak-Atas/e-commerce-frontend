export class User {
    constructor(
        public email: string,
        public first_name: string,
        public last_name: string,
        
        private _token: string,
    ) { }

    get token() {
        
        return this._token;
    }
}

