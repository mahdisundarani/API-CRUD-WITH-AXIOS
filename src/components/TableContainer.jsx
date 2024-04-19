import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const TableContainer = () => {
  
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode,setModalMode] = useState('add');
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData,setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discount: "",
    rating: "",
    stock: "",
  });
  
  const API = "https://dummyjson.com/products";
  
  const AXIOS = async (url) => {
    try {
      const response = await axios.get(API);
      if(response.data.products.length > 0){
            setDataSource(response.data.products)
          }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(dataSource);

  useEffect(() => {
    AXIOS(API);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (mode,record) => {
    setModalMode(mode);
    if(mode === 'edit'){
      setEditingProductId(record.id);
      setFormData(record);
    }else{
      setFormData({
        // If adding mode, clear the form fields
        title: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
      });
    }

    setIsModalVisible(true);
  };
  
  const handleSubmit = (mode,record) =>{
    console.log(mode)
    // setModalMode(mode);
    if (modalMode === 'add') {
      const newProduct = {
       id: Math.floor(Math.random() * 100),
       ...formData
     }    
     setDataSource([...dataSource,newProduct]);
    }else if(modalMode === 'edit'){
      const updatedDataSource = dataSource.map((item)=> item.id===editingProductId ? {...item,...formData} : item)
      setDataSource(updatedDataSource);
    } 
    setIsModalVisible(false)
  }

  const handleInputChange = (e) =>{
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]:value 
    });
  }

  const onDeleteProduct = (record) =>{
    const updatedDataSource = dataSource.filter((item) => item.id !== record.id);
    setDataSource(updatedDataSource);
  }

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
      title: "Discount",
      dataIndex: "discountPercentage",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Action",
      render:(record) =>{
        return (
          <>
            <DeleteOutlined onClick={() =>{onDeleteProduct(record)}} />
            <EditOutlined onClick={() => {showModal('edit',record)}}/>
          </>
        )
      }
    },
  ];

  return (
    <div>
      <div className="w-fit ml-auto mr-3">
        <Button
          type="primary"
          onClick={() => {showModal("add")}}
        >
          Add Product
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
      />
      <Modal
        title={modalMode==='add' ? "Add Product" : "Edit Product"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <input
            type="text"
            name="title"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
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

        <div>
          <input
            type="number"
            name="discountPercentage"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="discount"
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="rating"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="stock"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </div>

        <Button
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
