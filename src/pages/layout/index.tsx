import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import Utils from '../../services/utils';
import url_configs from '../../routes/config';

import { Button, Dropdown } from 'rsuite';
import './index.less';

interface iProps extends iReactRoute {
    uname: string;
    isLogin(): boolean;
    check(): void;
}
interface IState {
    active: string;
    layout: boolean;
}

function Menus(item: any, onSelect: any, active: string) {
    if (item.hide) return;
    return (
        <li key={item.name} className={'menu_item' + (active === item.name ? ' active' : '')} onClick={() => onSelect(item.path)}>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
        </li>
    );
}

export default class extends React.Component<iProps, IState> {
    constructor(props: any) {
        super(props);
        const curr = Utils.checkUrl(props.location.pathname);
        this.state = {
            active: curr.name,
            layout: !curr.hideLayout,
        };
        if (curr.title) document.title = curr.title + ' | 后缀';
    }

    render() {
        if (!this.state.layout) return this.props.children;
        return (
            <Fragment>
                <div id="sider">
                    <Link to="/">
                        <div id="logo">
                            <img src="https://img5.daling.com/zin/public/specialTopic/2020/06/20/18/44/22/525400B9EA93HWRJF000008056333.png" alt="" />
                            <span>后台系统</span>
                            <small>v1.0</small>
                        </div>
                    </Link>
                    <div id="menus">
                        <ul className="menu_bg">{url_configs.map((item, index) => Menus(item, this.onSelect, this.state.active))}</ul>
                    </div>
                    <div className="footer">
                        <a href="/">前端技术支持</a>
                    </div>
                </div>
                <div id="main">
                    <div className="top_menus flex-right">
                        {this.props.uname && (
                            <Dropdown
                                trigger="click"
                                onCommand={this.onCommand}
                                menu={
                                    <Dropdown.Menu>
                                        <Dropdown.Item command="/sys">用户中心</Dropdown.Item>
                                        <Dropdown.Item command="/login" divided>
                                            注销
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                }
                            >
                                <span className="el-dropdown-link">
                                    {this.props.uname}
                                    <i className="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                            </Dropdown>
                        )}
                        {!this.props.uname && (
                            <Button appearance="primary" size="xs" onClick={() => this.login()}>
                                登录
                            </Button>
                        )}
                    </div>
                    <div className="height40"></div>
                    <div className="continer">{this.props.children}</div>
                </div>
            </Fragment>
        );
    }

    componentWillReceiveProps(pp: any) {
        const curr = Utils.checkUrl(pp.location.pathname);
        this.setState({
            active: curr.name,
            layout: !curr.hideLayout,
        });
        if (curr.title) document.title = curr.title + ' | 系统';
    }

    onSelect = (index: string) => {
        this.props.history.push(index);
    };
    login = () => {
        this.props.history.push('/login');
    };
    onCommand = (command: string) => {
        if (command === '/login') {
            return this.login();
        }
        this.props.history.push(command);
    };
}
