import Coupon from "./Coupon";
import IssuedCouponRepository from "./IssuedCouponRepository";
import IssuedCoupon from "./IssuedCoupon";

class CouponManager {

    constructor() {
    }

    async issuedCoupon(coupons: Array<Coupon>, memberNo: string, issuedCouponRepository: IssuedCouponRepository) {

        try {
            await Promise.all(
                coupons.map(async (coupon:Coupon) => {
                    const couponItem = Object.assign( new Coupon, coupon );
                    const issuedCoupon:IssuedCoupon = new IssuedCoupon("MemberNo#"+memberNo, couponItem.getCouponNo)
                    issuedCoupon.setTimeStamp();
                    await issuedCouponRepository.save(issuedCoupon);
                })
            );

        } catch (e) {
            console.log( e.message );
        }


    }
}

export default CouponManager;