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

  // 이름을 포함한 쿠폰을 발행한다.
  async issuedCoupon(event: AppSyncEvent): Promise<Array<Coupon>> {
    const memberNo = event.arguments.issueInfo.memberNo;
    return await this.couponService.issuedCoupon(memberNo);
  }

  //특정 계정에게 할당된 쿠폰을 사용 안함 처리함.
  async returnedCoupon(event: AppSyncEvent) {
    const issuanceId = event.arguments.info.issuanceId;
    return await this.couponService.returnedCoupon(issuanceId);
  }

  //특정 계정에게 할당된 쿠폰을 반환 처리함.
  async usedCoupon(event: AppSyncEvent) {
    const issuanceId = event.arguments.info.issuanceId;
    return await this.couponService.usedCouponList(issuanceId);
  }

  //쿠폰 발행 ID로 쿠폰 조회하기
  async findByIssuanceId(event: AppSyncEvent) {
    const issuanceId = event.arguments.info.issuanceId;
    return await this.couponService.findByIssuanceId(issuanceId);
  }

  async findMyCouponList(event: AppSyncEvent) {
    throw new Error("Method not implemented.");
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
}

export default CouponController;