import React, { useEffect, useState } from "react";

// Components
import { Container } from "@mui/material";
import SectionHeading from "../../components/section-heading";
import ToggleSwitch from "../../components/toggle-switch";

// Hocs
import { useUser } from "../../hocs/with-user-provider";

// Services
import { addUser, getAllUsers } from "../../services/user";

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
  const handleToggleAdmin = async (userId: any, member) => {
    try {
      const updatedUsers = users.map((user) => (user.id === userId.id ? { ...user, member: !user.member } : user));
      const update = { ...userId, member: member };
      setUsers(updatedUsers);
      addUser(update);
    } catch (error) {
      console.error("Error updating member status:", error);
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
                <th>User Name</th>
                <th>Name (Optional)</th>
                <th>User ID</th>
                <th>Member</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.name || "- - -"}</td>
                  <td>{user.id || "N/A"}</td>
                  <td>
                    <ToggleSwitch
                      checked={user.member}
                      onChange={() => handleToggleAdmin(user, !user.member)}
                      disabled={user.id === currentUser?.["id"]}
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
