import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import CouponRepository from "../domain/CouponRepository";
import CouponDDBRepository from "../infra/CouponDDBRepository";
import Coupon from "../domain/Coupon";
import CouponManager from "../domain/CouponManager";
import IssuedCouponDDBRepository from "../infra/IssuedCouponDDBRepository";
import IssuedCouponRepository from "../domain/IssuedCouponRepository";
import IssuedCoupon from "../domain/IssuedCoupon";

class CouponService {
    private static instance: CouponService;
    private couponRepository: CouponRepository;
    private issueCouponRepository: IssuedCouponRepository;
    private couponManager: CouponManager;

    private constructor() {
        CouponService.instance = this;
        this.couponManager = new CouponManager();
        this.couponRepository = CouponDDBRepository.getInstance;
        this.issueCouponRepository = IssuedCouponDDBRepository.getInstance;
    }

    static get getInstance() {
        if (!CouponService.instance) {
            CouponService.instance = new CouponService();
        }
        return this.instance;
    }

    async registeredCoupon(couponTargetInfo: CouponTarget, couponInfo:CouponInfo): Promise<boolean> {
        return await this.couponRepository.registeredCoupon(couponTargetInfo, couponInfo);
    }

    async findUsedCouponList(memberNo: string): Promise<Array<Coupon>> {
        return await this.couponRepository.findUsedCouponList(memberNo);
    }

    async returnedCoupon(issuanceId:string): Promise<IssuedCoupon> {
        const issuedCoupons:IssuedCoupon[] = await this.issueCouponRepository.findByIssueCouponId(issuanceId);
        const issuanceCoupon = Object.assign( new IssuedCoupon , issuedCoupons[0] );
        issuanceCoupon.returnedCoupon() ;
        return await this.issueCouponRepository.save(issuanceCoupon);
    }

    async usedCouponList(issuanceId:string): Promise<IssuedCoupon> {
        const issuedCoupons:IssuedCoupon[] = await this.issueCouponRepository.findByIssueCouponId(issuanceId);
        const issuanceCoupon = Object.assign( new IssuedCoupon , issuedCoupons[0] );
        issuanceCoupon.usedCoupon() ;
        return await this.issueCouponRepository.save(issuanceCoupon);
    }

    async findValidCouponList(memberNo: string): Promise<Array<Coupon>> {
        const coupons:Array<Coupon> = await this.couponRepository.findValidCouponList(memberNo);
        console.log("Coupons :", JSON.stringify(coupons));
        const vaildCoupon = coupons.filter(this.filterAllMember(memberNo));
        return vaildCoupon;
    }

    async issuedCoupon(memberNo: string) {
        const coupons:Array<Coupon> = await this.couponRepository.findValidCouponList(memberNo);
        const vaildCoupon = await coupons.filter(this.filterAllMember(memberNo));
        await Promise.all(
            vaildCoupon.map(async (coupon:Coupon) => {
                await this.couponManager.issuedCoupon(coupon, memberNo, this.issueCouponRepository);
            }));
        return vaildCoupon;
    }

    async findByIssuanceId(issuanceId: string) {
        return await this.issueCouponRepository.findByIssuanceId(issuanceId);
    }

    async findMyCouponList(memberNo):Promise<IssuedCoupon[]> {
        return await this.issueCouponRepository.findMyCouponList(memberNo);
    }

    private filterAllMember = memberNo => (coupon:Coupon, index, array) =>
    {
        const createdCoupon = Object.assign( new Coupon, coupon);
        return createdCoupon.checkAllMemberCoupon(memberNo);
    }

    async activatedCoupon(couponId: string) {
        const coupon:Coupon = await this.couponRepository.findCouponById(couponId);
        const foundCoupon = Object.assign( new Coupon, coupon);
        foundCoupon.activateCoupon();
        return await this.couponRepository.save(foundCoupon);
    }

    async deactivatedCoupon(couponId: string) {
        const coupon:Coupon = await this.couponRepository.findCouponById(couponId);
        const foundCoupon = Object.assign( new Coupon, coupon);
        foundCoupon.deactivateCoupon();
        return await this.couponRepository.save(foundCoupon);
    }

    async useCoupon(memberNo:string, couponId: string) {
        const issuedCoupon:IssuedCoupon = await this.issueCouponRepository.findByCouponIdAndMemberNo(memberNo, couponId);
        issuedCoupon.usedCoupon();
        console.log( "Issue :", JSON.stringify(issuedCoupon) );
        return await this.issueCouponRepository.save(issuedCoupon);
    }
}

export default CouponService;