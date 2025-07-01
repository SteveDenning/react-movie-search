import React, { useEffect, useState } from "react";

// Components
import { Container } from "@mui/material";
import SectionHeading from "../../components/section-heading";

// Styles
import "./admin.scss";
import { getUsersDoc } from "../../services/user";

interface Props {
  children?: React.ReactNode;
}

const Admin: React.FC<Props> = () => {
  const [users, setUsers] = useState<any[]>([]);

  const getUsers = async () => {
    try {
      const users = await getUsersDoc();
      console.log(users);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    getUsers();
  }, []);

  return (
    <div
      className="admin"
      data-testid="admin"
    >
      <Container>
        <SectionHeading
          heading="Admin"
          backButton
        />
        <div className="admin__content">
          <table className="admin__table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Name (Optional)</th>
                <th>User ID</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.id || "N/A"}</td>
                  <td>{user.admin ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default Admin;
