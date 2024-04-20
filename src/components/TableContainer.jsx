import { Button, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TableContainer = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
  });

  const API = "https://dummyjson.com/products";

  const AXIOS = async (url) => {
    try {
      const response = await axios.get(API);
      if (response.data.products.length > 0) {
        setDataSource(response.data.products);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  console.log(dataSource);

  useEffect(() => {
    AXIOS(API);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (mode, record) => {
    setModalMode(mode);
    if (mode === "edit") {
      setEditingProductId(record.id);
      setFormData(record);
    } else {
      setFormData({
        // If adding mode, clear the form fields
        title: "",
        description: "",
        brand: "",
        category: "",
        price: "",
      });
    }

    setIsModalVisible(true);
  };

  const handleSubmit = (mode, record) => {
    console.log(mode);
    // setModalMode(mode);
    if (modalMode === "add") {
      const newProduct = {
        id: Math.floor(Math.random() * 100),
        ...formData,
      };
      setDataSource([...dataSource, newProduct]);
      message.success("Product Added Successfully");
    } else if (modalMode === "edit") {
      const updatedDataSource = dataSource.map((item) =>
        item.id === editingProductId ? { ...item, ...formData } : item
      );
      setDataSource(updatedDataSource);
      message.success("Product Edited Successfully");
    }
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onDeleteProduct = (record) => {
    const updatedDataSource = dataSource.filter(
      (item) => item.id !== record.id
    );
    setDataSource(updatedDataSource);
    message.success("Product Deleted Successfully");
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <>
            <div className="flex">
              <Button
                className="mx-2"
                size="small"
                onClick={() => {
                  showModal("edit", record);
                }}
              >
                Edit
              </Button>
              <Button
                className=""
                size="small"
                onClick={() => {
                  onDeleteProduct(record);
                }}
              >
                Delete
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="w-fit ml-auto mr-3">
        <Button
          type="primary"
          onClick={() => {
            showModal("add");
          }}
        >
          Add Product
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
      />
      <Modal
        title={modalMode === "add" ? "Add Product" : "Edit Product"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <input
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="description"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="brand"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="category"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="price"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <Button
          className="mx-2"
          key="cancel"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default TableContainer;
