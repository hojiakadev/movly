const config = {
  app: {
    confirmTime: 60000
  },
  language: {
    key: 'language',
    initial: 'en',
    list: ['en']
  },
  list: {
    perPage: 20
  },
  services: {
    user: 'api/user/v1',
    file: 'api/file/v1'
  } as const,
  support: {
    gmail: 'xojiakbarisroilov1001@gmail.com'
  }
};

type Keys = keyof typeof config.services;
export type ServiceType = (typeof config.services)[Keys];

export default config;
