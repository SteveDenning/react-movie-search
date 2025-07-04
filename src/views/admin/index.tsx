import React, { useEffect, useState, useMemo } from "react";

// MUI COmponents
import { Container } from "@mui/material";

// Components
import Error from "../../components/error";
import SectionHeading from "../../components/section-heading";
import ToggleSwitch from "../../components/toggle-switch";

// Services
import { addUser, getAllUsers } from "../../services/user";

// Styles
import "./admin.scss";

interface Props {
  children?: React.ReactNode;
}

const Admin: React.FC<Props> = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a["username"].localeCompare(b["username"]));
  }, [users]);

  const getUsers = async () => {
    getAllUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        setError(true);
        console.error("Error fetching users:", error);
      });
  };

  const handleToggleAdmin = async (userId: any, member) => {
    const updatedUsers = users.map((user) => (user.id === userId.id ? { ...user, member: !user.member } : user));
    const update = { ...userId, member: member };
    setUsers(updatedUsers);
    addUser(update)
      .then()
      .catch((error) => {
        setError(true);
        console.error("Error updating member status:", error);
      });
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
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.name || "- - -"}</td>
                  <td>{user.id || "N/A"}</td>
                  <td>
                    <ToggleSwitch
                      checked={user.member}
                      onChange={() => handleToggleAdmin(user, !user.member)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && (
          <Error
            testId="admin-error"
            content="There was a problem with the admin page - please try again later."
          />
        )}
      </Container>
    </div>
  );
};

export default Admin;
