import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faTriangleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { UseContact } from "../Context/ContactContext";
import { nanoid } from "nanoid";

export const UpdateContacts = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const {
    showEditPage,
    setShowEditPage,
    darkMode,
    editingContactId,
    stopEditingContact,
    updateContact,
    contactInfos,
    setSuccessMessage,
  } = UseContact();
  useEffect(() => {
    // Fetch the contact details based on editingContactId and set them to state
    if (editingContactId) {
      const editingContact = contactInfos.find(
        (contact) => contact.id === editingContactId
      );
      if (editingContact) {
        setName(editingContact.name);
        setPhone(editingContact.phone);
        setEmail(editingContact.email);
      }
    }
  }, [editingContactId]);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      setMessage("Empty Fields");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Invalid Email");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    if (!validatePhone(phone)) {
      setMessage("Invalid Number");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    const updateedContact = {
      id: editingContactId || nanoid(),
      name,
      phone,
      email,
    };
    updateContact(updateedContact); // Use updateContact to update the contact

    setShowEditPage(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSuccessMessage(
      <span>
        {" "}
        <FontAwesomeIcon icon={faCheckCircle} /> Contact Updated Successfully!!
      </span>
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  function handleClose() {
    stopEditingContact();
  }

  return (
    <div className={`overlay-edit-page ${showEditPage ? "show" : ""}`}>
      <div className={`form ${darkMode ? "" : "light"}`}>
        <div className="top">
          <h1>Update Contact</h1>
          <button className="close" onClick={handleClose}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        {message && (
          <div className="message">
            <FontAwesomeIcon icon={faTriangleExclamation} /> {message}
          </div>
        )}

        <div className="bottom">
          <div className="inputGroup">
            <input
              type="text"
              required
              autoComplete="off"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="inputGroup">
            <input
              type="number"
              required
              autoComplete="off"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone No</label>
          </div>
          <div className="inputGroup">
            <input
              type="email"
              required
              autoComplete="off"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <button className="add-contacts" onClick={handleSubmit}>
          Update Contact
        </button>
      </div>
    </div>
  );
};