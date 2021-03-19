import CouponController from "./controller/CouponController";
import { AppSyncEvent } from "./interfaces/Events";

const couponController = CouponController.getInstance;

//TODO 받아 줄 SQS 사용하는거랑 / 환원하는 것이 있으면 됨.

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "registeredCoupon":
            return await couponController.registeredCoupon(event);
        case "activatedCoupon":
            return await couponController.activatedCoupon(event);
        case "deactivatedCoupon":
            return await couponController.deactivatedCoupon(event);

        case "issuedCoupon":
            return await couponController.issuedCoupon(event);

        case "usedCoupon":
            return await couponController.usedCoupon(event);
        case "returnedCoupon":
            return await couponController.returnedCoupon(event);

        case "findValidCouponList":
            return await couponController.findValidCouponList(event);
        case "findMyCouponList":
            return await couponController.findMyCouponList(event);
        case "findByIssuanceId":
            return await couponController.findByIssuanceId(event);
        case "findUsedCouponList":
            return await couponController.findUsedCouponList(event);
        default:
            return null;
    }
}