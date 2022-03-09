// 本地环境配置
export const x = () => {
  return {
    title: '外来人员',
    baseUrl: 'http://localhost:8080', // 项目地址
    baseApi: '/api', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
    APPID: 'xxx',
    APPSECRET: 'xxx',
    $cdn: 'https://www.sunniejs.cn/static'
  };
};
