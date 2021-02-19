import moment from "moment";

class IssuedCoupon {
    private PK?:string;
    private SK?:string;
    private registDate?:string;

    public constructor(PK?:string, SK?:string) {
        this.PK = PK;
        this.SK = SK;
    }

    public setTimeStamp() {
        this.registDate =  moment().toISOString();
    }
}

export default IssuedCoupon;