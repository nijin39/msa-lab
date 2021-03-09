import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import Coupon from "./Coupon";

interface CouponRepository {
    registeredCoupon(couponTargetInfo: CouponTarget, couponInfo:CouponInfo): Promise<boolean>;
    findUsedCouponList(memberNo: string): Promise<Array<Coupon>>;
    returnedCoupon(memberNo: string, couponId: string): Promise<boolean>;
    findCouponById(memberNo: string, couponId: string): Promise<Coupon>;
    save(coupon: Coupon);
    findValidCouponList(memberNo: string): Promise<Array<Coupon>>;
}

export default CouponRepository;