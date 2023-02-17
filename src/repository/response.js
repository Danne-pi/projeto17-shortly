export default class RepositoryResponse {
    constructor() {
        this.byCondition = function () {
            return this.condition ? 
            {
            code: this.errCode,
            message: this.errMessage,
            ...this.info
            } : {
            code: null,
            message: null,
            ...this.info
            }
        }

        ////////////////////////////////////////

        this.direct = function (code, message) {
            return {
            code: code,
            message: message,
            info: this.info
            }
        }

        ////////////////////////////////////////

        this.continue =  {
            code: null,
            message: null,
        }
    }
}