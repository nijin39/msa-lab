import { AppSyncEvent } from "../interfaces/Events";
import CouponService from "../application/CouponService";
import Coupon from "../domain/Coupon";

class CouponController {
  private static instance: CouponController;
  private couponService: CouponService;

  private constructor() {
    CouponController.instance = this;
    this.couponService = CouponService.getInstance;
  }

  static get getInstance() {
    if (!CouponController.instance) {
      CouponController.instance = new CouponController();
    }
    return this.instance;
  }

  async registeredCoupon(event: AppSyncEvent):Promise<boolean> {
    const couponTargetInfo = event.arguments.target;
    const couponInfo = event.arguments.info;
    return await this.couponService.registeredCoupon(couponTargetInfo, couponInfo);
  }

  async findValidCouponList(event: AppSyncEvent):Promise<Array<Coupon>> {
    const memberNo = event.arguments.memberNo;
    return await this.couponService.findValidCouponList(memberNo);
  }

  async findUsedCouponList(event: AppSyncEvent) {
    const memberNo = event.arguments.memberNo;
    return await this.couponService.findUsedCouponList(memberNo);
  }

  async returnedCoupon(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    return await this.couponService.returnedCoupon(couponId);
  }

  async usedCouponList(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    return await this.couponService.usedCouponList(couponId);
  }

  async findMyCouponList(event: AppSyncEvent) {
    throw new Error("Method not implemented.");
  }

  async findByCouponId(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    return await this.couponService.findByCouponId(couponId);
  }
  
  async activatedCoupon(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    return await this.couponService.activatedCoupon(couponId);
  }

  async deactivatedCoupon(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    return await this.couponService.deactivatedCoupon(couponId);
  }

  async issuedCoupon(event: AppSyncEvent): Promise<Array<Coupon>> {
    const memberNo = event.arguments.issueInfo.memberNo;
    return await this.couponService.issuedCoupon(memberNo);
  }
}

export default CouponController;