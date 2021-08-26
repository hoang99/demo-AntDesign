import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Table, Row, Col, Button, Space, Form, Input, Modal, message } from 'antd';

interface Props { }
interface State {
    data: any,
    getDataEdit: any,
    handleDataEdit: any,
    modalEditData: boolean,
    modalAddData: boolean,
}

export default class Department extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            getDataEdit: [],
            handleDataEdit: [],
            modalEditData: false,
            modalAddData: false,
        }
    }
    handleListData = () => {
        var dataLocalStorage = localStorage.getItem("dataDepartment");
        var dataSource = JSON.parse(dataLocalStorage!)
        if (!dataLocalStorage) return []
        this.setState({
            data: dataSource
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

        const onAddDepartFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        const onAddDepart = (values: any) => {
            var item: any = {};
            item.stt = this.state.data.length + 1;
            item.departmentCode = values.departmentCode;
            item.departmentName = values.departmentName;
            item.founding = values.founding;
            var items = this.state.data
            if (items.some((x: any) => x.departmentCode === item.departmentCode)) {
                addFailed()
            }
            else {
                items.push(item);
                this.setState({ data: items });
                localStorage.setItem("dataDepartment", JSON.stringify(this.state.data));
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
            dataEdited.departmentCode = this.state.getDataEdit.departmentCode;
            dataEdited.departmentName = value.departmentName;
            dataEdited.founding = value.founding;
            this.setState({ handleDataEdit: dataEdited })
            // console.log(this.state.handleDataEdit);
            this.state.data.forEach((item: any) => {
                if (item.departmentCode === this.state.handleDataEdit.departmentCode) {
                    item.departmentName = dataEdited.departmentName;
                    item.founding = dataEdited.founding;
                }
                this.modalEditData(false)
            })
            editSuccess();
            localStorage.setItem("dataDepartment", JSON.stringify(this.state.data));
        }

        const onDetele = (record: any) => {
            if (window.confirm("Do you want to delete?")) {
                var dataAfterDelete: number = this.state.data.findIndex((item: any) => item.departmentCode === record.departmentCode);
                const newData = [...this.state.data];
                newData.splice(dataAfterDelete, 1);
                this.setState({ data: newData });
                localStorage.setItem("dataDepartment", JSON.stringify(newData));
            }
        }

        const columns = [
            {
                title: 'STT',
                dataIndex: 'stt',
                key: 'stt',
            },
            {
                title: 'Department Code',
                dataIndex: 'departmentCode',
                key: 'departmentCode',
            },
            {
                title: 'Department name',
                dataIndex: 'departmentName',
                key: 'departmentName',
            },
            {
                title: 'Founding',
                dataIndex: 'founding',
                key: 'founding',
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
                                    title="Edit Department"
                                    centered
                                    visible={this.state.modalEditData}
                                    onOk={() => this.modalEditData(false)}
                                    onCancel={() => this.modalEditData(false)}
                                    footer={null}
                                >
                                    <Form name="basic" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} onFinish={onEdit}  >
                                        <Form.Item label="Department name" name="departmentName" rules={[{ required: true, }]}>
                                            <Input placeholder={this.state.getDataEdit.name} />
                                        </Form.Item>
                                        <Form.Item label="Founding" name="founding" rules={[{ required: true }]}>
                                            <Input placeholder={this.state.getDataEdit.dob} />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 16, span: 7 }}>
                                            <Button style={{ background: "#fa8c16", border: "solid #fa8c16", width: "100%", color: "white" }} htmlType="submit" >
                                                Edit Department
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

        return (
            <div className="staff-container" >
                <h1 style={{ textAlign: "center" }}>Department Manager</h1>
                <Row>
                    <Col span={4} offset={20}  >
                        <>
                            <Button className="btn-add-user" type="primary" onClick={() => { this.modalAddData(true) }}>
                                Add Department
                            </Button>
                            <Modal
                                title="Add Department"
                                centered
                                visible={this.state.modalAddData}
                                onOk={() => this.modalAddData(false)}
                                onCancel={() => this.modalAddData(false)}
                                footer={null}
                            >
                                <Form name="basic" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} onFinish={onAddDepart} onFinishFailed={onAddDepartFailed} >
                                    <Form.Item label="Department code" name="departmentCode" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Department name" name="departmentName" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Founding" name="founding" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 16, span: 7 }} >
                                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                            Add Department
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
