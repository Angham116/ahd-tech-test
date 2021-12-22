import React, { useEffect, useState } from 'react';
import { Table, Form, Typography, Popconfirm, Button, Popover, Row, Col } from 'antd';
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons'

import { Search, PrimaryButton } from '../../common-components';

import {
  sortedProjects,
  allProjects,
  myProjects,
} from '../../constants';

import './style.css';

import EditableCell from '../../common-components/table/editable-cell';

export default function Projects() {

  const [searchProjectName, setSearchProjectName] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [recordFields, setRecordFields] = useState([]);
  const [form] = Form.useForm();
  const [columns, setColumns] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey && myProjects.includes(editingKey);

  useEffect(() => {
    setProjects(allProjects);
    setFilteredProjects(allProjects);
  }, [])

  useEffect(() => {
    if (allProjects.length) {
      const keys = Object.keys(allProjects[0]);
      let cols = [];
      keys.map((key) => {
        return cols.push({
          title: key,
          dataIndex: key,
          width: '25%',
          editable: true,
        });
      });
      cols.push({
        dataIndex: 'actions',
        title: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span key={record.id}>
              <Typography.Link
                // onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
                >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <p>Cancel</p>
              </Popconfirm>
            </span>
          ) : (
            <React.Fragment key={record.id}>
              {myProjects.length && myProjects.includes(record.id) &&
                <Popover placement="bottomRight" content={
                <>
                  <p disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
                    Edit
                  </p>
                  <p disabled={editingKey !== ''} onClick={() => handleDeleteProject(record)}>
                    Delete
                  </p>
                  <p onClick={() => {
                    setEditingKey('');
                  }}>
                    Cancel
                  </p>
                </>
              } trigger="hover">
                <Button
                  disabled={!(myProjects.length && myProjects.includes(record.id))}
                  >
                  <EllipsisOutlined />
                </Button>
              </Popover>
               }
            </React.Fragment>
          );
        },
      })
      setColumns(cols);
      setRecordFields(keys);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [false])

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  const onSearchByProjectName = () => {
    const res = allProjects.filter(item => item.name.includes(searchProjectName));
    setFilteredProjects(res);
  }

  const onSearchByProjectStatus = (status) => {
    // search by project status (My, Acquired, Saved)
    const projectsByStatus = sortedProjects[status];
    const res = allProjects.filter(item => projectsByStatus.includes(item.id));
    setFilteredProjects(res);
  }

  const handleEdit = (record) => {
    let recordObj = {};
    if (recordFields.length) {
      recordFields.map((field) => recordObj[field] = '');
    }
    form.setFieldsValue({
      ...recordObj,
      ...record,
    });
    setEditingKey(record.id);
  }

  const handleDeleteProject = (record) => {
    setFilteredProjects(prevProjects => {
      return prevProjects.filter(project => project.id !== record.id);
    });
  }

  const cancel = () => {
    setEditingKey('');
  };
 
  return (
    <div className="projects-container">
      <Row className="header-filters">
        <Col lg={12} md={12} s={23} xs={23} className="header-filters-search filters">
          <Search
            prefix={<SearchOutlined />}
            btnText="Search"
            onSearch={onSearchByProjectName}
            handleSearchChange={({ target: { value }}) => {
              if (value) {
                setSearchProjectName(value);
                onSearchByProjectName();
              } else {
                setFilteredProjects(allProjects);
              }
            }}
          />
        </Col>

        <Col lg={12} md={12} s={23} xs={23} className="header-filters-btns filters">
          <Row>
            <Col>
              <PrimaryButton
                className="secondary-btn"
                btnText="All"
                key="all"
                onClick={() => setFilteredProjects(projects)}
              />
            </Col>
            <Col>
              <PrimaryButton
                className="secondary-btn"
                btnText="My"
                key="my"
                onClick={() => onSearchByProjectStatus('my')}
                circleColor="red"
              />
            </Col>
            <Col>
              <PrimaryButton
                className="secondary-btn"
                btnText="Acquired"
                key="acquired"
                onClick={() => onSearchByProjectStatus('acquired')}
                circleColor="blue"
              />
            </Col>
            <Col>
              <PrimaryButton
                className="secondary-btn"
                btnText="Saved"
                key="saved"
                onClick={() => onSearchByProjectStatus('saved')}
                circleColor="gray"
              />
            </Col>
          </Row>
        </Col>

      </Row>

      {/* Projects Table */}

      <div>
        <Row className="projects-sub-header">
          <Col span={12} className="projects-table-title">
            <h3>Projects</h3>
          </Col>
          <Col span={12} className="projects-table-btn">
            <PrimaryButton btnText="create project" className="primary-btn" />
          </Col>
        </Row>

        {
          filteredProjects.length && columns.length && recordFields.length
          ?
            <div>
              <Form form={form} component={false}>
                <Table
                  className="projects-table"
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={filteredProjects}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                />
              </Form>

            </div>
          :
          <span>There is no projects</span>
        }

      </div>
    </div>
  )
}
