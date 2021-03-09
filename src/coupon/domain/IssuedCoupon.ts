import moment from "moment";

class IssuedCoupon {
    private PK?:string;
    private SK?:string;
    private registDate?:string;
    private issuanceId?:string;
    private useCoupon:boolean;

    public constructor(PK?:string, SK?:string, issuanceId?:string) {
        this.PK = PK;
        this.SK = SK;
        this.issuanceId = issuanceId;
        this.useCoupon = false;
    };

    get getPK(): string | undefined {
        return this.PK;
    };

    public setTimeStamp() {
        this.registDate =  moment().toISOString();
    };

    usedCoupon() {
        this.useCoupon = true;
    }

    returnedCoupon() {
        this.useCoupon = false;
    }
}

export default IssuedCoupon;