import useAxiosApi from '@/utils/useAxiosApi';
import useFetchApi from '@/utils/useFetchApi';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return useAxiosApi(`/api/login`, {
    method: 'POST',
    data: { name: '123' }
  });
}

export function apPage() {
  return useAxiosApi(`/api/visitor/manage/apPage`, {
    method: 'get'
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
