import LoginLayout from '@/layouts/login';
import loginFormImg from '@/assets/images/login-form.png';
import { Form, Input, Button, Radio, QRCode } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { http } from '@/api/request';

export default function Login() {
  http.get('posts').then((res) => {
    console.log(res);
  });
  const [isAccount, setIAccount] = useState(true);
  return (
    <LoginLayout>
      <img
        src={loginFormImg}
        alt="login-form"
        className="flex-none w-[40vw] max-w-[800px] min-w-[400px] bg-transparent object-contain rounded-[12px]"
      />
      <Form
        name="login"
        className="relative p-[3rem] pt-[5rem] flex-auto max-w-[520px] min-w-[400px] rounded-xl shadow-[2px_3px_7px_#0003]"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Radio.Group
          defaultValue={isAccount}
          onChange={() => setIAccount((isAccount) => !isAccount)}
          className="absolute top-[16px] right-[24px]"
        >
          <Radio.Button value={true}>账号密码登录</Radio.Button>
          <Radio.Button value={false}>扫码登录</Radio.Button>
        </Radio.Group>

        {isAccount ? (
          <>
            <Form.Item>
              <div className="flex justify-around items-center">
                <img src="react.svg" alt="logo" width={64} height={64} />
                <span className="text-2xl font-bold text-nowrap">React Element Admin</span>
              </div>
            </Form.Item>
            <Form.Item label="用户名">
              <Input prefix={<UserOutlined />} placeholder="admin" />
            </Form.Item>
            <Form.Item label="密码">
              <Input prefix={<LockOutlined />} placeholder="admin123" />
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
          </>
        ) : (
          <div className="flex justify-center">
            <QRCode value="admin" />
          </div>
        )}
      </Form>
    </LoginLayout>
  );
}
