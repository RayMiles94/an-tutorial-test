export class UserModel {

    constructor(public email:string,
                public id: string,
                private _token: string,
                private _tokenExpirationDate: Date) {}

    get Token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

}
