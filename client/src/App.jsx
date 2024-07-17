import { useState, useCallback, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import TableComponent from "./components/table";
import FormComponent from "./components/form";
import { getProductList } from "./redux/features/product/productSlice";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  gnerateInvoice,
  updateState,
} from "./redux/features/invoice/invoiceSlice";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState("");
  const [formData, setFormData] = useState({
    product: "",
    rate: "",
    unit: "",
    quantity: "",
    discount: 0,
    netAmount: "",
    totalAmount: "",
    productName: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const status = useSelector((state) => state.invoice.status);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "product") {
        let product;
        if (value !== "") {
          product = products.find((prod) => value === prod.value);
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            productName: product.label,
            unit: product?.unit || "",
            rate: product?.rate || "",
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            unit: "",
            rate: "",
          }));
        }
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    },
    [products]
  );

  function calculateAmounts(rate, quantity = 1, discount = 0) {
    rate = parseFloat(rate);
    quantity = parseFloat(quantity);
    discount = parseFloat(discount);
    if (!isNaN(rate) && !isNaN(quantity)) {
      const grossAmount = rate * quantity;
      const netAmount = grossAmount - grossAmount * (discount / 100);
      const totalAmount = netAmount;
      return {
        netAmount: netAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      };
    }
    return { netAmount: "", totalAmount: "" };
  }

  useEffect(() => {
    dispatch(getProductList());
  }, []);
  useEffect(() => {
    if (status === "succeeded") {
      dispatch(updateState());
      setCustomerName("");
      setItems([]);
    }
  }, [dispatch, status]);

  useEffect(() => {
    const { rate, quantity, discount } = formData;
    const result = calculateAmounts(rate, quantity, discount || 0);
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: result.totalAmount,
      netAmount: result.netAmount,
    }));
  }, [formData.rate, formData.quantity, formData.discount]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!customerName) newErrors.customerName = "Customer Name is required";
    if (!formData.product) newErrors.product = "Product is required";
    if (!formData.quantity || isNaN(formData.quantity))
      newErrors.quantity = "Valid Quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const addItem = useCallback(() => {
    if (validateForm()) {
      if (selectedIndex > -1) {
        items[selectedIndex] = formData;
        setItems([...items]);
        setSelectedIndex(-1);
      } else {
        setItems((prevItems) => [...prevItems, formData]);
      }
      setFormData({
        product: "",
        rate: "",
        unit: "",
        quantity: "",
        discount: "",
        netAmount: "",
        totalAmount: "",
      });
      setErrors({});
    }
  }, [validateForm, selectedIndex, items, formData]);

  const removeItem = useCallback((index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const editItem = useCallback(
    (index) => {
      setSelectedIndex(index);
      setFormData({ ...items[index] });
    },
    [items]
  );

  const formProps = useMemo(
    () => ({
      formData,
      errors,
      handleChange,
      addItem,
      selectedIndex,
      products,
      customerName,
      setCustomerName,
      items,
    }),
    [
      formData,
      errors,
      handleChange,
      addItem,
      selectedIndex,
      products,
      customerName,
      setCustomerName,
      items,
    ]
  );

  const tableProps = useMemo(
    () => ({ items, removeItem, editItem }),
    [items, removeItem, editItem]
  );

  const handleSubmit = () => {
    let data = items.map((item) => {
      return {
        product: item.product,
        rate: item.rate,
        unit: item.unit,
        quantity: Number(item.quantity),
        discount: Number(item.discount).toFixed(2),
        netAmount: Number(item.netAmount).toFixed(2),
        totalAmount: Number(item.totalAmount).toFixed(2),
      };
    });
    dispatch(gnerateInvoice({ invoices: data, customerName }));
  };

  return (
    <>
      <Container className="mb-5">
        <h1 className="mt-5">Create Invoice</h1>
        <FormComponent {...formProps} />
        <TableComponent {...tableProps} />
        <Row className="justify-content-end ">
          <Col sm={3} className="text-end h-50 p-0">
            <Button
              variant="primary"
              disabled={items.length === 0}
              onClick={handleSubmit}
              className="padded-button mt-3 w-100 btn-lg btn-block bordered-input btn btn-primary"
            >
              SUBMIT
            </Button>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
