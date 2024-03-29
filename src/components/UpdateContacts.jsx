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
  const {
    showEditPage,

    darkMode,
    editingContactId,
    stopEditingContact,
    updateContact,
    contactInfos,

    message,
    setMessage,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    image,
    setImage,
    handleImageChange,
  } = UseContact();
  useEffect(() => {
    if (editingContactId) {
      const editingContact = contactInfos.find(
        (contact) => contact.id === editingContactId
      );
      if (editingContact) {
        setName(editingContact.name);
        setPhone(editingContact.phone);
        setEmail(editingContact.email);
        setImage(editingContact.image);
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
      image,
    };
    updateContact(updateedContact);
  };

  function handleClose() {
    stopEditingContact();
    setName("");
    setEmail("");
    setPhone("");
    setImage(null);
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
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
              onKeyPress={(event) => handleKeyPress(event)}
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
              onKeyPress={(event) => handleKeyPress(event)}
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
              onKeyPress={(event) => handleKeyPress(event)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputGroup images">
            <input
              type="file"
              accept="image/*"
              autoComplete="off"
              id="image"
              onChange={handleImageChange}
              onKeyPress={(event) => handleKeyPress(event)}
            />

            <label htmlFor="image">Picture</label>
            <span className="image-container">
              {image && <img src={image} alt="Preview" className="image" />}
            </span>
          </div>
        </div>
        <button
          className="add-contacts"
          onClick={handleSubmit}
          onKeyPress={(event) => handleKeyPress(event)}
        >
          Update Contact
        </button>
      </div>
    </div>
  );
};
