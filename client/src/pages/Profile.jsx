import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateProfile } from "../services/profileService";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile(user._id);

        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (user?._id) {
      loadProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(user._id, {
        name: form.name,
        phone: form.phone,
        address: form.address,
      });

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>My Profile</h1>

      <br />

      <label>Name</label>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <label>Email</label>

      <input
        value={form.email}
        disabled
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <label>Phone</label>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <label>Address</label>

      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        rows="4"
        style={{ width: "100%", padding: "10px" }}
      />

      <br />
      <br />

      <button onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}

export default Profile;