import { useContext, useEffect, useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "../css/Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = user?._id || user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(`/profile/${userId}`);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = user?._id || user?.id;

    if (!userId) {
      toast.error("User session not found.");
      return;
    }

    try {
      setSaving(true);
      await API.put(`/profile/${userId}`, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error?.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  return (
    <main className="profile-page">
      <section className="profile-card">
        <header className="profile-header">
          <div className="profile-avatar"><FaUser /></div>
          <div><h1>My Profile</h1><p>Manage your personal information</p></div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="profile-field">
            <label htmlFor="profile-name">Full Name</label>
            <div className="profile-input"><FaUser /><input id="profile-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required /></div>
          </div>
          <div className="profile-field">
            <label htmlFor="profile-email">Email Address</label>
            <div className="profile-input disabled"><FaEnvelope /><input id="profile-email" type="email" value={formData.email} disabled /></div>
            <small>Email cannot be changed.</small>
          </div>
          <div className="profile-field">
            <label htmlFor="profile-phone">Phone Number</label>
            <div className="profile-input"><FaPhone /><input id="profile-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" /></div>
          </div>
          <div className="profile-field">
            <label htmlFor="profile-address">Address</label>
            <div className="profile-input textarea"><FaMapMarkerAlt /><textarea id="profile-address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" /></div>
          </div>
          <button className="save-profile-btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
        </form>
      </section>
    </main>
  );
}

export default Profile;
