import * as React from 'react';
import { Menu, Button } from 'antd';
import {
    Link
} from "react-router-dom";
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export interface IAppProps { }
export interface IAppState {
    collapsed: boolean,
}
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    public render() {
        const pathname = window.location.pathname;
        console.log(pathname);

        return (

            <div className="nav">
                <div style={{ width: 256 }}>
                    <Button onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                    <Menu
                        defaultSelectedKeys={[pathname]}
                        defaultOpenKeys={['sub1', 'sub2']}
                        mode="inline"
                        // theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="/department" icon={<PieChartOutlined />}>
                            <Link to="/department">  Department</Link>

                        </Menu.Item>
                        <Menu.Item key="/staff" icon={<DesktopOutlined />}>
                            <Link to="/staff">  Staff</Link>
                        </Menu.Item>
                        <Menu.Item key="/" icon={<ContainerOutlined />}>
                            <Link to="/"> Option1</Link>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.Item key="/5">
                                <Link to="/5"> Option2</Link>
                            </Menu.Item>
                            <Menu.Item key="/6">
                                <Link to="/6"> Option3</Link>
                            </Menu.Item>
                            <Menu.Item key="/7">
                                <Link to="/7"> Option4</Link>
                            </Menu.Item>
                            <Menu.Item key="/8">
                                <Link to="/8"> Option5</Link>
                            </Menu.Item>

                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </div>
            </div>

        );
    }
}

