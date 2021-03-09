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
                'SK': 'CouponId#'+couponId
            }
        };

        const result = await dynamoDbClient.get(params).promise();
        return Promise.resolve( Object.assign( new IssuedCoupon, result.Item) );
    }

    async findByIssueCouponId(issuanceId: string): Promise<IssuedCoupon[]> {

        const params = {
            TableName: "Coupon",
            IndexName: "IssuedCoupon",
            KeyConditionExpression: "#70970 = :70970",
            ExpressionAttributeValues: {
                ":70970": "3a59675d-b7fb-42ab-ad8d-9e36bec1fb8f"
            },
            ExpressionAttributeNames: {
                "#70970": "issuanceId"
            }
        }

        const result = await dynamoDbClient.query(params).promise();

        return result.Items as IssuedCoupon[]
    }

    async findByIssuanceId(issuanceId: string): Promise<IssuedCoupon> {
        const params = {
            TableName: "Coupon",
            IndexName: "IssuedCoupon",
            KeyConditionExpression: "#70970 = :70970",
            ExpressionAttributeValues: {
                ":70970": "3a59675d-b7fb-42ab-ad8d-9e36bec1fb8f"
            },
            ExpressionAttributeNames: {
                "#70970": "issuanceId"
            }
        }

        const results = await dynamoDbClient.query(params).promise();

        const result = results.Items as IssuedCoupon[]
        return result[0];
    }

    async findMyCouponList(memberNo): Promise<IssuedCoupon[]> {
        const params = {
            TableName: "Coupon",
            ScanIndexForward: false,
            ConsistentRead: false,
            KeyConditionExpression: "#cd420 = :cd420 And begins_with(#cd421, :cd421)",
            ExpressionAttributeValues: {
                ":cd420": "MemberNo#jngkim",
                ":cd421": "CouponId"
            },
            ExpressionAttributeNames: {
                "#cd420": "PK",
                "#cd421": "SK"
            }
        }

        const results = await dynamoDbClient.query(params).promise();

        return results.Items as IssuedCoupon[];
    }
}

export default IssuedCouponDDBRepository;