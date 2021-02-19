import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import CouponRepository from "../domain/CouponRepository";
import CouponDDBRepository from "../infra/CouponDDBRepository";
import Coupon from "../domain/Coupon";
import CouponManager from "../domain/CouponManager";
import IssuedCouponDDBRepository from "../infra/IssuedCouponDDBRepository";

class CouponService {
    private static instance: CouponService;
    private couponRepository: CouponRepository;
    private issueCouponRepository: IssuedCouponDDBRepository;
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

    async findByCouponId(couponId: string): Promise<Coupon> {
        return await this.couponRepository.findCouponById(couponId);
    }

    async returnedCoupon(couponId: string): Promise<Coupon> {
        const coupon:Coupon = await this.couponRepository.findCouponById(couponId);
        coupon.returnedCoupon();
        return await this.couponRepository.save(coupon);
    }

    async usedCouponList(couponId: string): Promise<Coupon> {
        const coupon:Coupon = await this.couponRepository.findCouponById(couponId);
        coupon.useCoupon();
        return await this.couponRepository.save(coupon);
    }

    async findValidCouponList(memberNo: string): Promise<Array<Coupon>> {
        const coupons:Array<Coupon> = await this.couponRepository.findValidCouponList(memberNo);
        const vaildCoupon = coupons.filter(this.filterAllMember(memberNo));
        return vaildCoupon;
    }

    async issuedCoupon(memberNo: string) {
        const coupons:Array<Coupon> = await this.couponRepository.findValidCouponList(memberNo);
        const vaildCoupon = await coupons.filter(this.filterAllMember(memberNo));
        await this.couponManager.issuedCoupon(coupons, memberNo, this.issueCouponRepository);
        return vaildCoupon;
    }

    private filterAllMember = memberNo => (coupon:Coupon, index, array) =>
    {
        const createdCoupon = Object.assign( new Coupon, coupon);
        return createdCoupon.checkAllMemberCoupon(memberNo);
    }

    async activatedCoupon(couponId: string) {
        const coupon:Coupon = await this.couponRepository.findCouponById(couponId);
        coupon.activateCoupon();
        await this.couponRepository.save(Object.assign(new Coupon, coupon));
    }

    async deactivatedCoupon(couponId: string) {
        const coupon:Coupon = await this.couponRepository.findCouponById(couponId);
        coupon.deactivateCoupon();
        await this.couponRepository.save(Object.assign(new Coupon, coupon));
    }
}

export default CouponService;