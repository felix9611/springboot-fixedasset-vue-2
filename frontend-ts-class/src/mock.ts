const Mock = require('mockjs')

const Random = Mock.Random

let Result: any = {
    code: 200,
    msg: 'Action Scuessfully',
    data: {}
}

Mock.mock('/captcha', 'get', () => {
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('100x32', 'p7n5w')
    }
    return Result
})

Mock.mock('/login', 'post', () => {

    // Unable to pass data jwt in header

    Result.code = 400
    Result.msg = "Verification code failure"

    return Result
})

Mock.mock('/login', 'post', () => {

    // Unable to pass data jwt in header

    // Result.code = 400
    // Result.msg = "CAPTCHA FAIL"

    return Result
})

Mock.mock('/logout', 'post', () => {

    // Unable to pass data jwt in header

    Result.code = 200
    Result.msg = "Logout"

    return Result
})



Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

    Result.data = {
        "id": 3,
        "statu": 1,
        "parentId": 1,
        "name": "Role Menagement",
        "path": "/sys/roles",
        "perms": "sys:role:list",
        "component": "sys/Role",
        "type": 1,
        "icon": "el-icon-rank",
        "orderNum": 2,
        "children": []
    }

    return Result
})



