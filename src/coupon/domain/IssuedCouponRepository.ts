import IssuedCoupon from "./IssuedCoupon";

interface IssuedCouponRepository {
    save(issuedCoupon: IssuedCoupon);
    findByCouponIdAndMemberNo(memberNo: string, couponId: string): Promise<IssuedCoupon>;
}

export default IssuedCouponRepository;