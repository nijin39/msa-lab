import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import Coupon from "./Coupon";

interface CouponRepository {
    registeredCoupon(couponTargetInfo: CouponTarget, couponInfo:CouponInfo): Promise<boolean>;
    save(coupon: Coupon);
    findUsedCouponList(memberNo: string): Promise<Array<Coupon>>;
    findCouponById(couponId: string): Promise<Coupon>;
    findValidCouponList(memberNo: string): Promise<Array<Coupon>>;
}

export default CouponRepository;