import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";

const Demo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    termsAccepted: false,
  });
  const [userList, setUserList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission (Add/Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing record
      const updatedList = userList.map((user, index) =>
        index === currentIndex ? formData : user
      );
      setUserList(updatedList);
      setIsEditing(false);
    } else {
      // Add new record
      setUserList([...userList, formData]);
    }
    // Reset form and state
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "Male",
      termsAccepted: false,
    });
    setCurrentIndex(null);
  };

  // Handle edit action
  const handleEdit = (index) => {
    setFormData(userList[index]);
    setCurrentIndex(index);
    setIsEditing(true);
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedList = userList.filter((_, i) => i !== index);
    setUserList(updatedList);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Form</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup tag="fieldset">
          <Label>Gender</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            Accept Terms and Conditions
          </Label>
        </FormGroup>

        <Button type="submit" color="primary" className="mt-3">
          {isEditing ? "Update" : "Submit"}
        </Button>
      </Form>

      <h3 className="mt-5">User Data</h3>
      <Table bordered className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Terms Accepted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.gender}</td>
                <td>{user.termsAccepted ? "Yes" : "No"}</td>
                <td>
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => handleEdit(index)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Demo;
