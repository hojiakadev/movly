import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

export const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.darkAlgorithm,
        token: {
          colorPrimary: '#0965dc'
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};
