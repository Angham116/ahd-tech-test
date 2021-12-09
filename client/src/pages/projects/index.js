import React, { useEffect, useState } from 'react';
import { Table, Form, Input, InputNumber, Typography, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

import { Search, PrimaryButton } from '../../common-components';
import './style.css';

const savedProjects = ['0x004322', '0x004323'];
const acquiredProjects = ['0x004321'];
const myProjects = ['0x004324'];

const allProjects = [
   {
    id: '0x004321',
    name: 'information system',
    status: 'in review',
    resources: 10,
    price: 550,
    provider: '',
    complicity: 0,
    startDate: new Date(),
    deadline: new Date(),
    offers: 0,
   },
   {
    id: '0x004322',
    name: 'accounting system',
    status: 'in review',
    resources: 37,
    price: 300,
    provider: '',
    complicity: 30,
    startDate: new Date(),
    deadline: new Date(),
    offers: 75,
   },
   {
    id: '0x004323',
    name: 'banking software',
    status: 'in progress',
    resources: 8,
    price: 220,
    provider: '',
    complicity: 100,
    startDate: new Date(),
    deadline: new Date(),
    offers: 88,
   },
   {
    id: '0x004324',
    name: 'automation factory',
    status: 'design',
    resources: 15,
    price: 190,
    provider: '',
    complicity: 0,
    startDate: new Date(),
    deadline: new Date(),
    offers: 20,
   },
];

const sortedProjects = {
  saved: savedProjects,
  acquired: acquiredProjects,
  my: myProjects,
};


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function Projects() {

  const [searchProjectName, setSearchProjectName] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [recordFields, setRecordFields] = useState([]);
  const [form] = Form.useForm();
  const [columns, setColumns] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;

  useEffect(() => {
    setProjects(allProjects);
    setFilteredProjects(allProjects);
    if (allProjects.length) {
      const keys = Object.keys(allProjects[0]);
      setRecordFields(keys);
      let cols = [];
      keys.map((key) => {
        cols.push({
          title: key,
          dataIndex: key,
          width: '25%',
          editable: true,
        });
      });
      cols.push({
        title: '',
        dataIndex: 'actions',
        title: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                // onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
              Edit
            </Typography.Link>
            <Typography.Link disabled={editingKey !== ''} onClick={() => handleDeleteProject(record)}>
              Delete
            </Typography.Link>
            </>
          );
        },
      })
      setColumns(cols);
    }
  }, [])

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  const onSearchByProjectName = () => {
    // search by project name
    console.log('searchProjectName', searchProjectName)
  }

  const onSearchByProjectStatus = (status) => {
    // search by project status
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
      console.log('prevProjects', prevProjects, record)
      return prevProjects.filter(project => project.id !== record.id);
    });
  }

  const cancel = () => {
    setEditingKey('');
  };
 
  return (
    <div className="container">
      <div className="header-filters">
        <div className="header-filters-search filters">
          <Search
            prefix={<SearchOutlined />}
            btnText="Search"
            onSearch={onSearchByProjectName}
            handleSearchChange={({ target: { value }}) => setSearchProjectName(value)}
          />
        </div>

        <div className="header-filters-btns filters">
          <PrimaryButton btnText="All" key="all" onClick={() => setFilteredProjects(projects)}/>
          <PrimaryButton btnText="My" key="my" onClick={() => onSearchByProjectStatus('my')}/>
          <PrimaryButton btnText="Acquired" key="acquired" onClick={() => onSearchByProjectStatus('acquired')}/>
          <PrimaryButton btnText="Saved" key="saved" onClick={() => onSearchByProjectStatus('saved')}/>
        </div>

      </div>

      {/* Projects Table */}

      <div>
        <div>
          <div className="projects-table-title">
            <span>Projects</span>
          </div>
          <div className="projects-table-btn">
            <PrimaryButton btnText="create project" />
          </div>
        </div>

        {
          filteredProjects.length
          ?
            <div>
              <Form form={form} component={false}>
                <Table
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
