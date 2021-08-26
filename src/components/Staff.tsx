import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Table, Row, Col, Button, Space, Form, Input, Modal, message, TreeSelect } from 'antd';

// import { stringify } from 'querystring';
// import { isNullishCoalesce } from 'typescript';
interface Props { }
interface State {
    data: any,
    getDataEdit: any,
    handleDataEdit: any,
    modalEditData: boolean,
    modalAddData: boolean,
    departmentValue: any,
    dataDepartment: any
}

export default class Staff extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            getDataEdit: [],
            handleDataEdit: [],
            modalEditData: false,
            modalAddData: false,
            departmentValue: undefined,
            dataDepartment: [],
        }
    }
    handleListData = () => {
        var dataLocalStorage = localStorage.getItem("dataStaff");
        var dataSource = JSON.parse(dataLocalStorage!)
        if (!dataLocalStorage) return []
        this.setState({
            data: dataSource
        });
        var dataDepartment = localStorage.getItem("dataDepartment");
        var datadpm = JSON.parse(dataDepartment!)
        if (!dataDepartment) return []
        this.setState({
            dataDepartment: datadpm
        });
    }


    componentDidMount() {
        this.handleListData()
    }


    modalEditData(modalEditData: boolean) {
        this.setState({ modalEditData });
    }
    modalAddData(modalAddData: boolean) {
        this.setState({ modalAddData });
    }
    render() {
        const key = 'updatable';
        const { TreeNode } = TreeSelect;
        const addSuccess = () => {
            message.loading({ content: 'Loading...', key });
            setTimeout(() => {
                message.success({ content: 'Add Success!', key, duration: 2 });
            }, 500);
        };

        const editSuccess = () => {
            message.loading({ content: 'Loading...', key });
            setTimeout(() => {
                message.success({ content: 'Edit Success!', key, duration: 2 });
            }, 500);
        };

        const addFailed = () => {
            message.loading({ content: 'Loading...', key });
            setTimeout(() => {
                message.info({ content: 'Add Failed!', key, duration: 2 });
            }, 500);
        };

        const onAddUserFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        const onAddUser = (values: any) => {

            var item: any = {};
            item.stt = this.state.data.length + 1;
            item.staffCode = values.staffCode;
            item.name = values.name;
            item.dob = values.dob;
            item.position = values.position;
            item.department = values.department;
            var items = this.state.data
            if (items.some((x: any) => x.staffCode === item.staffCode)) {
                addFailed()
            }
            else {
                items.push(item);
                this.setState({ data: items });
                localStorage.setItem("dataStaff", JSON.stringify(this.state.data));
                this.handleListData();
                this.modalAddData(false);
                addSuccess();
            }
        };
        const getDataEdit = (record: any) => {
            this.setState({ getDataEdit: record })
        }
        const onEdit = (value: any) => {
            var dataEdited: any = {};
            dataEdited.staffCode = this.state.getDataEdit.staffCode;
            dataEdited.name = value.name;
            dataEdited.dob = value.dob;
            dataEdited.position = value.position;
            dataEdited.department = value.department;
            this.setState({ handleDataEdit: dataEdited })
            // console.log(this.state.handleDataEdit);
            this.state.data.forEach((item: any) => {
                if (item.staffCode === this.state.handleDataEdit.staffCode) {
                    item.name = dataEdited.name;
                    item.dob = dataEdited.dob;
                    item.position = dataEdited.position;
                    item.department = dataEdited.department;
                }
                this.modalEditData(false)
            })
            editSuccess();
            localStorage.setItem("dataStaff", JSON.stringify(this.state.data));
        }

        const onDetele = (record: any) => {
            if (window.confirm("Do you want to delete?")) {
                var dataAfterDelete: number = this.state.data.findIndex((item: any) => item.staffCode === record.staffCode);
                const newData = [...this.state.data];
                newData.splice(dataAfterDelete, 1);
                this.setState({ data: newData });
                localStorage.setItem("dataStaff", JSON.stringify(newData));
            }
        }



        const columns = [
            {
                title: 'STT',
                dataIndex: 'stt',
                key: 'stt',
            },
            {
                title: 'Staff Code',
                dataIndex: 'staffCode',
                key: 'staffCode',
            },
            {
                title: 'Full name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Date of birth',
                dataIndex: 'dob',
                key: 'dob',
            },
            {
                title: 'Position',
                dataIndex: 'position',
                key: 'position',
            },
            {
                title: 'Department',
                dataIndex: 'department',
                key: 'department',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (text: any, record: any,) => {
                    return (
                        <Space >
                            <>
                                <Button type="primary" style={{ background: "#fa8c16", border: "solid #fa8c16" }} onClick={() => { this.modalEditData(true); getDataEdit(record) }}>
                                    Edit
                                </Button>
                                <Modal
                                    title="Edit User"
                                    centered
                                    visible={this.state.modalEditData}
                                    onOk={() => this.modalEditData(false)}
                                    onCancel={() => this.modalEditData(false)}
                                    footer={null}
                                >
                                    <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onEdit}  >
                                        <Form.Item label="Full name" name="name" rules={[{ required: true, }]}>
                                            <Input placeholder={this.state.getDataEdit.name} />
                                        </Form.Item>
                                        <Form.Item label="Date of birth" name="dob" rules={[{ required: true }]}>
                                            <Input placeholder={this.state.getDataEdit.dob} />
                                        </Form.Item>
                                        <Form.Item label="Position" name="position" rules={[{ required: true }]}>
                                            <Input placeholder={this.state.getDataEdit.position} />
                                        </Form.Item>
                                        <Form.Item label="Department" name="department" rules={[{ required: true }]}>
                                            <TreeSelect
                                                placeholder="Select Department"
                                                allowClear
                                                showSearch
                                                value={this.state.departmentValue}
                                                onChange={onChange}
                                            >
                                                {this.state.dataDepartment.map((value: any) => (
                                                    <TreeNode key={value.departmentCode} value={value.departmentName} title={value.departmentName}></TreeNode>
                                                ))}
                                            </TreeSelect>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 17, span: 5 }}>
                                            <Button style={{ background: "#fa8c16", border: "solid #fa8c16", width: "100%", color: "white" }} htmlType="submit" >
                                                Edit User
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </>
                            <Button type="primary" style={{ background: "#f5222d", border: "solid #f5222d", width: "100%", color: "white" }} onClick={() => onDetele(record)}>Delete</Button>
                        </Space >
                    )
                },
            },
        ];


        const onChange = (value: any) => {
            console.log(value);
            this.setState({ departmentValue: value });

        };
        return (
            <div className="staff-container" >
                <h1 style={{ textAlign: "center" }}>Staff Manager</h1>
                <Row>
                    <Col span={4} offset={20}  >
                        <>
                            <Button className="btn-add-user" type="primary" onClick={() => { this.modalAddData(true) }}>
                                Add User
                            </Button>
                            <Modal
                                title="Add User"
                                centered
                                visible={this.state.modalAddData}
                                onOk={() => this.modalAddData(false)}
                                onCancel={() => this.modalAddData(false)}
                                footer={null}
                            >
                                <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onAddUser} onFinishFailed={onAddUserFailed} >
                                    <Form.Item label="Staff code" name="staffCode" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Full name" name="name" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Date of birth" name="dob" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Position" name="position" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Department" name="department" rules={[{ required: true }]}>
                                        <TreeSelect
                                            placeholder="Select Department"
                                            allowClear
                                            showSearch
                                            value={this.state.departmentValue}
                                            onChange={onChange}
                                        >
                                            {this.state.dataDepartment.map((value: any) => (
                                                <TreeNode key={value.departmentCode} value={value.departmentName} title={value.departmentName}></TreeNode>
                                            ))}
                                        </TreeSelect>
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 17, span: 5 }} >
                                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                            Add User
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table dataSource={this.state.data} columns={columns} />
                    </Col>
                </Row>
            </div>
        )
    }
}
