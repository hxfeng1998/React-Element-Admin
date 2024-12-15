// 仅为了实现扫码登录 扫码后手机跳到此页面
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Form name="login" className="p-[3rem] pt-[5rem]">
      <Form.Item>
        <div className="flex justify-around items-center">
          <img src="react.svg" alt="logo" width={64} height={64} />
          <span className="text-2xl font-bold text-nowrap">React Element Admin</span>
        </div>
      </Form.Item>
      <Form.Item label="用户名">
        <Input prefix={<UserOutlined />} placeholder="admin" showCount maxLength={16} />
      </Form.Item>
      <Form.Item label="密码">
        <Input prefix={<LockOutlined />} placeholder="admin123" showCount maxLength={16} />
      </Form.Item>
      <Form.Item label={null}>
        <div className="flex justify-around items-center">
          <Button type="default" size="large">
            重置
          </Button>
          <Button type="primary" size="large" htmlType="submit">
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  </StrictMode>
);
