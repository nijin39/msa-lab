import CouponRepository from "../domain/CouponRepository";
import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import Coupon from "../domain/Coupon";

import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import moment from 'moment';
import {v4 as uuid} from 'uuid';

const serviceConfigOptions: ServiceConfigurationOptions = {
    region: 'ap-northeast-2',
    endpoint: 'http://dynamodb-local:8000',
    accessKeyId: 'yrvtp',
    secretAccessKey: '2u6jyg'
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

    findUsedCouponList(memberNo: string): Promise<Array<Coupon>> {
        return Promise.resolve(new Array<Coupon>());
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
            TableName: 'Coupon',
            Key:{
                'PK': couponId,
                'SK': 'COUPONINFO'
            }
        };
        const result = await dynamoDbClient.get(params).promise();
        return Promise.resolve( Object.assign( new Coupon(), result.Item) );
    }

    async save(coupon: Coupon) {
        const params = {
            TableName: 'Coupon',
            Item: coupon
        };

        return await dynamoDbClient.put(params).promise();
    }
}

export default CouponDDBRepository;