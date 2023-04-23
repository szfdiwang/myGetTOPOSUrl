import request from './request'

// 验签 http://47.241.216.139:30025/sgs/verifySign'
export const placeOrder = (body: any, headers: any) => {
  console.log('body', body)
  console.log('header', headers)

  return request.post('/sgs/api/echo', body, { headers })
}
