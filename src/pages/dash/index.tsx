/**
 * 首页
 */
import React from 'react';
import './index.less';
import { Table, Button, Alert } from 'rsuite';
import request from '../../services/request';
import UserModel from '../../models/user';
import Utils from '../../services/utils';

interface iState {}

export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="dash">
                <div>
                    <Button className="btn_add" type="primary">
                        新增大菜单
                    </Button>
                </div>
                <div className="foot"></div>
            </div>
        );
    }

    //设置数据
    onChange(key: string, value: number | string) {
        // this.state.form[key] = value;
        this.forceUpdate();
    }

    async del(id: number) {
        try {
            Alert.success('已删除');
        } catch (error) {
            console.log(error.message);
            Alert.error('删除失败');
        }
    }

    goDetail() {
        this.props.history.push('/login');
    }
}
