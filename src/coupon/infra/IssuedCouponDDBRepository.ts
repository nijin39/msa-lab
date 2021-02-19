import CouponRepository from "../domain/CouponRepository";
import {CouponInfo, CouponTarget} from "../interfaces/CouponTarget";
import Coupon from "../domain/Coupon";

import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import moment from 'moment';
import {v4 as uuid} from 'uuid';
import IssuedCouponRepository from "../domain/IssuedCouponRepository";
import IssuedCoupon from "../domain/IssuedCoupon";

const serviceConfigOptions: ServiceConfigurationOptions = {
    region: 'ap-northeast-2',
    endpoint: 'http://dynamodb-local:8000',
    accessKeyId: 'ox5c2xh',
    secretAccessKey: 'qpae9v'
};
AWS.config.update(serviceConfigOptions);

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

class IssuedCouponDDBRepository implements IssuedCouponRepository {
    private static instance: IssuedCouponDDBRepository;

    private constructor() {
        IssuedCouponDDBRepository.instance = this;
    }

    static get getInstance() {
        if (!IssuedCouponDDBRepository.instance) {
            IssuedCouponDDBRepository.instance = new IssuedCouponDDBRepository();
        }
        return this.instance;
    }

    async save(issuedCoupon: IssuedCoupon) {
        try {
            const params = {
                TableName: 'Coupon',
                Item: issuedCoupon
            };
            const result = await dynamoDbClient.put(params).promise();
            return result;
        } catch (e) {
            console.error( e.message );
        }
    }

    async findByCouponIdAndMemberNo(memberNo: string, couponId: string): Promise<IssuedCoupon> {
        const params = {
            TableName: 'Coupon',
            Key:{
                'PK': 'MemberNo#'+memberNo,
                'SK': couponId
            }
        };
        const result = await dynamoDbClient.get(params).promise();
        return Promise.resolve( Object.assign( new IssuedCoupon, result.Item) );
    }
}

export default IssuedCouponDDBRepository;