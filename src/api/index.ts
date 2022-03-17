import useAxiosApi from '@/utils/useAxiosApi';
import useFetchApi from '@/utils/useFetchApi';

/**
 * 接口
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return useAxiosApi(`/api/login`, {
    method: 'POST',
    data: { name: '123' }
  });
}

export function sendSMS(params: any) {
  return useAxiosApi(`/api/common-serve/sms/sendCodeR`, {
    method: 'POST',
    params: params
  });
}

export function loginByPhone(params: any) {
  return useAxiosApi(`/api/weighing-room-biz/wechat/loginByPhone`, {
    method: 'POST',
    params: params
  });
}

export function listPlanForGroup(params: any) {
  return useAxiosApi(`/api/weighing-room-biz/wechat/listPlanForGroup`, {
    method: 'get',
    params: params
  });
}

export function listTruck(params: any) {
  return useAxiosApi(`/api/weighing-room-biz/wechat/listTruck`, {
    method: 'get',
    params: params
  });
}

/*派车*/
export function dispatchCar(data: any) {
  return useAxiosApi(`/api/weighing-room-biz/wechat/dispatch`, {
    method: 'POST',
    data
  });
}

/*取消派车*/
export function unDispatchCar(data: any) {
  return useAxiosApi(`/api/weighing-room-biz/wechat/unDispatch`, {
    method: 'POST',
    data
  });
}

/*完成作业/wechat/workDone*/
export function workDone(params: any) {
  return useAxiosApi(`/api/weighing-room-biz/wechat/workDone`, {
    method: 'POST',
    params: params
  });
}

//wechat/dispatch
export function apPage(params: any) {
  return useAxiosApi(`/api/visitor/manage/apPage`, {
    method: 'get',
    params: params
  });
}

export function getSafetyNotice() {
  return useAxiosApi('/api/visitor/wx/getSafetyNotice', {
    method: 'get'
  });
}

export function loginSystem(params: any) {
  return useAxiosApi('/api/blade-auth/oauth/token?_allow_anonymous=true', {
    method: 'POST',
    params: params,
    headers: {
      Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
      'Tenant-Id': '000000'
    }
  });
}

export function getName() {
  return useAxiosApi(`/api/books`, {
    method: 'get'
  });
}

export function loginSystems(params: any) {
  return useFetchApi(
    '/api/blade-auth/oauth/token?_allow_anonymous=true&grant_type=password&tenantId=000000' + '&username=' + params.username + '&password=' + params.password
  ).post();
}
