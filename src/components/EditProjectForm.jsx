import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const EditProjectForm = ({ visible, onClose, project, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        project_name: project.project_name,
        description: project.description,
        start_date: moment(project.start_date),
        end_date: moment(project.end_date),
      });
    }
  }, [project, form]);

  const handleFinish = async (values) => {
    try {
      const response = await axios.put(`/api/project/${project.id}/`, {
        ...values,
        start_date: values.start_date.format('YYYY-MM-DD'),
        end_date: values.end_date.format('YYYY-MM-DD'),
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  return (
    <Modal visible={visible} title="Edit Project" onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="project_name" label="Project Name" rules={[{ required: true, message: 'Please enter the project name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="start_date" label="Start Date" rules={[{ required: true, message: 'Please select the start date' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="end_date" label="End Date" rules={[{ required: true, message: 'Please select the end date' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Project
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProjectForm;
