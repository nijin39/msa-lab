export type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        target : {
            memberNo:string|Array<string>
            classId:string|Array<string>
            categoryId:string|Array<string>
        },
        info: {
            couponId: string
            couponName: string,
            couponStartDate: string,
            couponEndDate: string
        },
        "issueInfo" : {
            "memberNo": "jngkim"
        },
        "memberNo":"jngkim"
    }
}