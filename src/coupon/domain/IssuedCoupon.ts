import moment from "moment";

class IssuedCoupon {
    private PK?:string;
    private SK?:string;
    private registDate?:string;
    private useCoupon:boolean;

    public constructor(PK?:string, SK?:string) {
        this.PK = PK;
        this.SK = SK;
        this.useCoupon = false;
    }

    public setTimeStamp() {
        this.registDate =  moment().toISOString();
    }

    public usedCoupon() {
        this.useCoupon = true;
    }
}

export default IssuedCoupon;