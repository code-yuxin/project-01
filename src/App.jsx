import {
  Avatar,
  Space,
  Grid,
  Image,
  Tag,
  TabBar,
  Badge,
  NavBar,
  SearchBar,
  Button,
  Toast
} from 'antd-mobile';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const back = () =>
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'todo',
      title: '我的待办',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: 'message',
      title: '我的消息',
      icon: (active) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '个人中心',
      icon: <UserOutline />,
    },
  ]

  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://huruqing.cn:3006/house/scene').then(res => {
      setList(res.data.result)
    })
  }, []);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get('http://huruqing.cn:3006/house/city').then(res => {
      setLists(res.data.result)
    })
  }, []);

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    axios.get('http://huruqing.cn:3006/house/list').then(res => {
      console.log(res.data.result);
      console.log(res);
      setImgs(res.data.result)
    })
  }, []);



  return (
    <div className="App">
      <div className='tabs'>
        <NavBar backArrow={false} onBack={back}><img className='img' src='http://static.huruqing.cn/villa/logo.png' /></NavBar>
        <SearchBar className='sou' style={{ '--border-radius': '10px' }} placeholder='请输入关键字' />
      </div>
      <img className='AppTop' src="http://static.huruqing.cn/villa/391-14747552.jpg" />
      <div className='AppOne'>
        <h4 className='biaoQian'>热门标签</h4>
        <div className='AppOneIcon'>
          <Space block wrap>
            {
              list.map((item, id) => {
                return (
                  <ul key={id}>
                    <Avatar className='AppOneIcons' src={item.icon} style={{ '--size': '80px', '--border-radius': '50%' }} />
                    <span className='iconWidth'>{item.name}</span>
                  </ul>
                )
              })
            }
          </Space>
        </div>
      </div>
      <div className="AppTwo">
        <hr />
        <h4 className='biaoQian'>热门城市</h4>
        <div className='AppTwoBiao'>
          <Space block wrap>
            {
              lists.map((item, id) => {
                return (
                  <ul className='itemClass' key={id}>
                    <Grid columns={1} gap={3} style={{ '--gap': '10px' }}>
                      <Grid.Item>
                        <div className='itemClassTwo' >{item.name}</div>
                      </Grid.Item>
                    </Grid>
                  </ul>
                )
              })
            }
          </Space>
        </div>
      </div>
      <div className="AppThree" >
        <hr />
        <h4 className='biaoQian' className='flex'>目的地推荐</h4>
        {
          imgs.map((item, id) => {
            return (
              <ul key={id}>
                <Image src={item.imageUrl} />
                <div className='reds'>
                  <div className='imges'>￥{item.showMinPrice}</div>
                  <h4 className='positions'>{item.name}</h4>
                  <div className='positions lefts' >{item.description}</div>
                  <Tag className='tops lefts' round color='#82c8a0'>
                    {item.city}○{item.area}
                  </Tag>
                </div>
              </ul>
            )
          })
        }
      </div>
      <hr />
      <div className='topTabs'></div>
      <div className='topTab'>
        <TabBar>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div >
  );
}

export default App;
