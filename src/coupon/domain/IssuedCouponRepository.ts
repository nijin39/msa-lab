import IssuedCoupon from "./IssuedCoupon";

interface IssuedCouponRepository {
    save(issuedCoupon: IssuedCoupon);
    findByCouponIdAndMemberNo(memberNo: string, couponId: string): Promise<IssuedCoupon>;
    findByIssueCouponId(issuanceId: string): Promise<IssuedCoupon[]>;
    findByIssuanceId(issuanceId: string): Promise<IssuedCoupon>;
    findMyCouponList(memberNo): Promise<IssuedCoupon[]>;
}

export default IssuedCouponRepository;