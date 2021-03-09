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

  // 쿠폰 등록
  // TEST File : registeredCoupon.json
  async registeredCoupon(event: AppSyncEvent):Promise<boolean> {
    const couponTargetInfo = event.arguments.target;
    const couponInfo = event.arguments.info;
    return await this.couponService.registeredCoupon(couponTargetInfo, couponInfo);
  }

  // 전체 구폰 중에 나에게 할당 될 수 있는 쿠폰만을 검색함.
  // TEST File : vaildCoupon
  async findValidCouponList(event: AppSyncEvent):Promise<Array<Coupon>> {
    const memberNo = event.arguments.memberNo;
    return await this.couponService.findValidCouponList(memberNo);
  }

  //해당 ID 기준으로 사용된 쿠폰 검색
  async findUsedCouponList(event: AppSyncEvent) {
    const memberNo = event.arguments.memberNo;
    return await this.couponService.findUsedCouponList(memberNo);
  }

  async issuedCoupon(event: AppSyncEvent): Promise<Array<Coupon>> {
    const memberNo = event.arguments.issueInfo.memberNo;
    return await this.couponService.issuedCoupon(memberNo);
  }

  //특정 계정에게 할당된 쿠폰을 사용 안함 처리함.
  async returnedCoupon(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    const memberNo = event.arguments.memberNo;
    return await this.couponService.returnedCoupon(memberNo, couponId);
  }

  async usedCouponList(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    const memberNo = event.arguments.memberNo;
    return await this.couponService.usedCouponList(memberNo, couponId);
  }

  async findMyCouponList(event: AppSyncEvent) {
    throw new Error("Method not implemented.");
  }

  async findByCouponId(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    const memberNo = event.arguments.memberNo;
    return await this.couponService.findByCouponId(memberNo, couponId);
  }
  
  // async activatedCoupon(event: AppSyncEvent) {
  //   const couponId = event.arguments.info.couponId;
  //   return await this.couponService.activatedCoupon(couponId);
  // }
  //
  // async deactivatedCoupon(event: AppSyncEvent) {
  //   const couponId = event.arguments.info.couponId;
  //   return await this.couponService.deactivatedCoupon(couponId);
  // }

  async useCoupon(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    const memberNo = event.arguments.memberNo;

    return await this.couponService.useCoupon(memberNo, couponId);
  }
}

export default CouponController;