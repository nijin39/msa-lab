import { AppSyncEvent } from "../interfaces/Events";
import CouponService from "../application/CouponService";
import Coupon from "../domain/Coupon";
import IssuedCoupon from "../domain/IssuedCoupon";

// 번역기 WEB??
// Anti CL 외부 || 내부의 데이터
// HTTP / Ggrp / MQTT >>> ACL >>> 내부
// httpRequest -> service.a(httpReqeust)

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

  // 해당 ID 기준으로 사용된 쿠폰 검색
  async findUsedCouponList(event: AppSyncEvent) {
    const memberNo = event.arguments.memberNo;
    return await this.couponService.findUsedCouponList(memberNo);
  }

  // 이름을 포함한 쿠폰을 발행한다.
  async issuedCoupon(event: AppSyncEvent): Promise<Array<Coupon>> {
    const memberNo = event.arguments.issueInfo.memberNo;
    return await this.couponService.issuedCoupon(memberNo);
  }

  // 특정 계정에게 할당된 쿠폰을 사용 안함 처리함.
  async returnedCoupon(event: AppSyncEvent) {
    // TODO memberNo을 받아서 기존의 쿠폰 발행정보와 비교해서 유효성을 확인하고 사용처리한다.
    const issuanceId = event.arguments.info.issuanceId;
    return await this.couponService.returnedCoupon(issuanceId);
  }

  // 특정 계정에게 할당된 쿠폰을 반환 처리함.
  async usedCoupon(event: AppSyncEvent) {
    // TODO memberNo/금액을 받아서 기존의 쿠폰 발행정보와 비교해서 유효성을 확인하고 사용처리한다.
    const issuanceId = event.arguments.info.issuanceId;
    return await this.couponService.usedCouponList(issuanceId);
  }

  // 쿠폰 발행 ID로 쿠폰 조회하기
  async findByIssuanceId(event: AppSyncEvent) {
    const issuanceId = event.arguments.info.issuanceId;
    return await this.couponService.findByIssuanceId(issuanceId);
  }

  // 나에게 할당된 쿠폰 리스트
  async findMyCouponList(event: AppSyncEvent):Promise<IssuedCoupon[]> {
    const memberNo = event.arguments.memberNo;
    return this.couponService.findMyCouponList(memberNo);
  }

  // 쿠폰 활성화
  async activatedCoupon(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    return await this.couponService.activatedCoupon(couponId);
  }

  // 쿠폰 비활성
  async deactivatedCoupon(event: AppSyncEvent) {
    const couponId = event.arguments.info.couponId;
    return await this.couponService.deactivatedCoupon(couponId);
  }
}

export default CouponController;