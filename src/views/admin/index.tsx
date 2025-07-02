import React, { useEffect, useState } from "react";

// Components
import { Container } from "@mui/material";
import SectionHeading from "../../components/section-heading";
import ToggleSwitch from "../../components/toggle-switch";

// Hocs
import { useUser } from "../../hocs/with-user-provider";

// Services
import { getAllUsers } from "../../services/user";

// Styles
import "./admin.scss";

interface Props {
  children?: React.ReactNode;
}

const Admin: React.FC<Props> = () => {
  const [users, setUsers] = useState<any[]>([]);

  const currentUser = useUser();

  const getUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleToggleAdmin = async (userId: string) => {
    try {
      const updatedUsers = users.map((user) => (user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user));
      setUsers(updatedUsers);
      // Here you would typically call an API to update the user's admin status
      // await updateUserAdminStatus(userId, !user.isAdmin);
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  useEffect(() => {
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
                <th>Name (Optional)</th>
                <th>User Name</th>
                <th>User ID</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.username}</td>
                  <td>{user.id || "N/A"}</td>
                  <td>
                    <ToggleSwitch
                      checked={user.isAdmin}
                      onChange={() => handleToggleAdmin(user.id)}
                      disabled={user.id === currentUser?.["id"]} // Assuming 'default' is a non-editable user
                    />
                  </td>
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
