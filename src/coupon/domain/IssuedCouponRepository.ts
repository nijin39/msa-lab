import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import Coupon from "./Coupon";
import IssuedCoupon from "./IssuedCoupon";

interface IssuedCouponRepository {
    save(issuedCoupon: IssuedCoupon);
}

export default IssuedCouponRepository;