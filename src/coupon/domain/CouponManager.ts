import Coupon from "./Coupon";
import IssuedCouponRepository from "./IssuedCouponRepository";
import IssuedCoupon from "./IssuedCoupon";
import {v4 as uuid} from 'uuid';

class CouponManager {

    constructor() {
    }

    async issuedCoupon(coupons: Array<Coupon>, memberNo: string, issuedCouponRepository: IssuedCouponRepository) {

        try {
            await Promise.all(
                coupons.map(async (coupon:Coupon) => {
                    const couponItem = Object.assign( new Coupon, coupon );

                    const isIssued:IssuedCoupon = await issuedCouponRepository.findByCouponIdAndMemberNo(memberNo, <string>couponItem.getCouponNo)

                    // 기존에 발행된 쿠폰이 없을 때.
                    if( isIssued.getPK === undefined || isIssued.getPK === null ) {
                        const issuedCoupon:IssuedCoupon = new IssuedCoupon("MemberNo#"+memberNo, "CouponId#"+couponItem.getCouponNo, uuid())
                        issuedCoupon.setTimeStamp();
                        await issuedCouponRepository.save(issuedCoupon);
                    } else {
                        console.log("Already Issued coupon");
                    }
                })
            );

        } catch (e) {
            console.log( e.message );
        }


    }
}

export default CouponManager;