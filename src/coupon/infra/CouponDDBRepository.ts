import CouponRepository from "../domain/CouponRepository";
import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import Coupon from "../domain/Coupon";

import * as AWS from 'aws-sdk';
import {ServiceConfigurationOptions} from 'aws-sdk/lib/service';
import moment from 'moment';
import {v4 as uuid} from 'uuid';

const serviceConfigOptions: ServiceConfigurationOptions = {
    region: 'ap-northeast-2',
    endpoint: 'http://dynamodb-local:8000',
    accessKeyId: 'ox5c2xh',
    secretAccessKey: 'qpae9v'
};
AWS.config.update(serviceConfigOptions);

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

class CouponDDBRepository implements CouponRepository {
    private static instance: CouponDDBRepository;

    private constructor() {
        CouponDDBRepository.instance = this;
    }


    static get getInstance() {
        if (!CouponDDBRepository.instance) {
            CouponDDBRepository.instance = new CouponDDBRepository();
        }
        return this.instance;
    }

    async registeredCoupon(couponTargetInfo: CouponTarget, couponInfo: CouponInfo): Promise<boolean> {
        console.log("Target :", couponTargetInfo);
        const couponNo = uuid();
        const params = {
            TableName: 'Coupon',
            Item: {
                PK: 'COUPON#' + couponNo,
                SK: 'COUPONINFO',
                registDate: moment().toISOString(),
                couponName: couponInfo.couponName,
                couponNo: couponNo,
                couponTarget: couponTargetInfo
            }
        };

        const result = await dynamoDbClient.put(params).promise();
        return Promise.resolve(true);
    }

    async findUsedCouponList(memberNo: string): Promise<Array<Coupon>> {
        const params = {
            TableName: "Coupon",
            KeyConditionExpression: "#74f00 = :74f00",
            FilterExpression: "#74f01 = :74f01",
            ExpressionAttributeValues: {
                ":74f00": "MemberNo#jngkim",
                ":74f01": true
            },
            ExpressionAttributeNames: {
                "#74f00": "PK",
                "#74f01": "useCoupon"
            }
        }

        const result = await dynamoDbClient.query(params).promise();

        return result.Items as Coupon[];
    }

    async findValidCouponList(memberNo: string): Promise<Coupon[]> {

        const params = {
            TableName: 'Coupon',
            IndexName: 'CouponInfo',
            KeyConditionExpression: 'SK = :sk',
            ExpressionAttributeValues: {
                ':sk': 'COUPONINFO'
            }
        };

        const result = await dynamoDbClient.query(params).promise();

        return result.Items as Coupon[];
    }

    returnedCoupon(couponId: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    async findCouponById(couponId: string): Promise<Coupon> {

        const params = {
            TableName: "Coupon",
            KeyConditionExpression: "#cd420 = :cd420 And #cd421 = :cd421",
            ExpressionAttributeValues: {
                ":cd420": "COUPON#"+couponId,
                ":cd421": "COUPONINFO"
            },
            ExpressionAttributeNames: {
                "#cd420": "PK",
                "#cd421": "SK"
            }
        }

        const result = await dynamoDbClient.query(params).promise();

        const results = result.Items as Coupon[];
        return results[0];
    }

    async save(coupon: Coupon) {
        const params = {
            TableName: 'Coupon',
            Item: coupon
        };

        const result = await dynamoDbClient.put(params).promise();
        return result;
    }
}

export default CouponDDBRepository;