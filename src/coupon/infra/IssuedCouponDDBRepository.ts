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
    accessKeyId: 'yrvtp',
    secretAccessKey: '2u6jyg'
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

            console.log("ICoupon :", JSON.stringify(params));

            const result = await dynamoDbClient.put(params).promise();
            console.log("Result :", JSON.stringify(result));
            return result;
        } catch (e) {
            console.error( e.message );
        }
    }
}

export default IssuedCouponDDBRepository;