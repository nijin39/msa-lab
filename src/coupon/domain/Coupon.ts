import {CouponTarget} from "../interfaces/CouponTarget";

class Coupon {
    private PK?:string;
    private SK?:string
    private status?:boolean;
    private useDate?:string;
    private couponNo?:string;
    private couponTarget?:CouponTarget;

    public constructor(PK?:string, SK?:string) {
        this.PK = PK;
        this.SK = SK;
    }

    get getPK(): string | undefined {
        return this.PK;
    }

    get getCouponNo(): string | undefined {
        return this.couponNo;
    }

    returnedCoupon() {
        this.status = false;
    }

    useCoupon() {
        this.useDate = '2021/02/16';
        this.status = true;
    }

    checkAllMemberCoupon(memberNo):boolean {
        return this.couponTarget?.memberNo === 'ALL' || this.couponTarget?.memberNo === memberNo;
    }

    activateCoupon() {
        this.status = true;
    }

    deactivateCoupon() {
        this.status = false;
    }
}

export default Coupon;