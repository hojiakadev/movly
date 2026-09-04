import { Button, Flex, Typography } from 'antd';

const { Title } = Typography;

function App() {
  return (
    <div>
      <Title>Hi I'm Movly</Title>
      <Title>h1. Ant Design</Title>
      <Title level={2}>h2. Ant Design</Title>
      <Title level={3}>h3. Ant Design</Title>
      <Title level={4}>h4. Ant Design</Title>
      <Title level={5}>h5. Ant Design</Title>

      <Flex gap="middle">
        <Button>Button</Button>
        <Button type="primary">Primary Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
    </div>
  );
}

export default App;
