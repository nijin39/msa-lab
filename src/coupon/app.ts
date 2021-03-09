import CouponController from "./controller/CouponController";
import { AppSyncEvent } from "./interfaces/Events";

const couponController = CouponController.getInstance;

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "issuedCoupon":
            return await couponController.issuedCoupon(event);
        case "registeredCoupon":
            return await couponController.registeredCoupon(event);
        case "findValidCouponList":
            return await couponController.findValidCouponList(event);
        case "findMyCouponList":
            return await couponController.findMyCouponList(event);
        case "findByCouponId":
            return await couponController.findByCouponId(event);
        case "usedCouponList":
            return await couponController.usedCouponList(event);
        case "usedCoupon":
            return await couponController.useCoupon(event);
        case "returnedCoupon":
            return await couponController.returnedCoupon(event);
        case "findUsedCouponList":
            return await couponController.findUsedCouponList(event);
        // case "activatedCoupon":
        //     return await couponController.activatedCoupon(event);
        // case "deactivatedCoupon":
        //     return await couponController.deactivatedCoupon(event);
        default:
            return null;
    }
}